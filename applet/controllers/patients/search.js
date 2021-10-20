/// <reference path="../../.ref/js/santedb.js"/>
/// <reference path="../../.ref/js/santedb-model.js"/>
/*
 * Portions Copyright 2015-2019 Mohawk College of Applied Arts and Technology
 * Portions Copyright 2019-2019 SanteSuite Contributors (See NOTICE)
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you 
 * may not use this file except in compliance with the License. You may 
 * obtain a copy of the License at 
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the 
 * License for the specific language governing permissions and limitations under 
 * the License.
 * 
 * User: Justin Fyfe
 * Date: 2019-9-27
 */
angular.module('santedb').controller('MpiPatientSearchController', ["$scope", "$rootScope", "$state", "$templateCache", "$stateParams", function ($scope, $rootScope, $state, $templateCache, $stateParams) {

    registerAssetsViewers($state);
    // Get datatype of the parameter
    function setMetadata(parameter) {
        switch (parameter.parm) {
            case "name.component[Family].value":
            case "name.component[Given].value":
            case "address.component.value":
            case "address.component[State].value":
            case "identifier.value":
                parameter.data = { type: "string" };
                break;
            case "_any":
                parameter.data = { type: "string", _fts: true }
                break;
            case "relationship[ServiceDeliveryLocation].target":
                parameter.data = { type: "entity", entity: "Place", filter: { classConcept: `${EntityClassKeys.ServiceDeliveryLocation}` }, search: 'name.component.value' };
                break;
            case "address":
                parameter.data = { type: "entity", entity: "Place", filter: { classConcept: `!${EntityClassKeys.ServiceDeliveryLocation}` }, search: 'name.component.value' };
                break;
            case "genderConcept":
                parameter.data = { type: "list" };
                SanteDB.resources.concept.findAsync({ conceptSet: "e9eecd3c-7b80-47f9-9cb6-55c8d3110fb0" }).then((r) => {
                    parameter.data.list = r.resource;
                    $scope.$apply();
                }).catch((e) => {
                    console.error(e);
                })
                break;
            case "dateOfBirth":
            case "dateOfDeath":
                parameter.data = { type: "date", max: moment().format("YYY-MM-DD") }
                break;

        }
    }

    // Render address
    $scope.renderAddress = function (patient) {

        var retVal = "";
        if (patient.address)
            Object.keys(patient.address).forEach(function (n) {
                retVal += `${SanteDB.display.renderEntityAddress(patient.address[n])} <span class="badge badge-info">${n}</span> ,`;
            });
        else
            retVal = "N/A ";
        return retVal.substr(0, retVal.length - 1);
    }

    // Render the names
    $scope.renderName = function (patient) {

        var retVal = "";
        if (patient.name)
            Object.keys(patient.name).forEach(function (n) {
                retVal += `${SanteDB.display.renderEntityName(patient.name[n])}  ,`;
            });
        else
            retVal = "N/A ";

        retVal = retVal.substr(0, retVal.length - 1);
        if (patient.tag && patient.tag["$upstream"] == "true") {
            retVal += `<span class='badge badge-info'><i class='fas fa-cloud'></i> ${SanteDB.locale.getString("ui.search.onlineResult")} </span>`;
        }

        return retVal.substr(0, retVal.length - 1);
    }

    // Render DOB
    $scope.renderDob = function (patient) {
        if (patient.dateOfBirth)
            return SanteDB.display.renderDate(patient.dateOfBirth, patient.dateOfBirthPrecision);
        else
            return "N/A";
    }

    // Render the patient's gender
    $scope.renderGender = function (patient) {
        var retVal = "";
        switch (patient.genderConcept) {
            case "f4e3a6bb-612e-46b2-9f77-ff844d971198":
                retVal += '<i class="fas fa-male"></i> ';
                break;
            case "094941e9-a3db-48b5-862c-bc289bd7f86c":
                retVal += '<i class="fas fa-female"></i> ';
                break;
            default:
                retVal += '<i class="fas fa-question-circle"></i> ';
        }

        if (patient.genderConceptModel.mnemonic) {
            retVal += SanteDB.display.renderConcept(patient.genderConceptModel);
        }
        return retVal;
    }

    // Render identifiers
    $scope.renderIdentifier = function (patient) {

        var preferred = $rootScope.system.config.application.setting['aa.preferred'];

        var retVal = "";
        if (patient.identifier) {
            Object.keys(patient.identifier).forEach(function (id) {
                if (preferred && id == preferred || !preferred) {
                    if (Array.isArray(patient.identifier[id]))
                        retVal += `${patient.identifier[id].map(function (d) { return d.value }).join(' or ')} <span class="badge badge-dark">${patient.identifier[id].authority ? patient.identifier[id].authority.name : id}</span> ,`;
                    else
                        retVal += `${patient.identifier[id].value} <span class="badge badge-dark">${patient.identifier[id].authority ? patient.identifier[id].authority.name : id}</span> ,`;
                }
            });
        }

        else retVal += "N/A ";
        return retVal.substring(0, retVal.length - 1);
    }

    // Search MPI
    $scope.searchMpi = async function (formData) {

        if (formData != null && formData.$invalid)
            return;

        try {
            SanteDB.display.buttonWait("#btnSearchSubmit", true);
            // Ask the user if they want to search upstream, only if they are allowed
            var session = await SanteDB.authentication.getSessionInfoAsync();

            if (session.method == "LOCAL" && $scope.search._upstream) // Local session so elevate to use the principal elevator
            {
                var elevator = new ApplicationPrincipalElevator(true);
                await elevator.elevate(session);
                SanteDB.authentication.setElevator(elevator);
            }

            // Build query and bind query to the search table
            var queryObject = {
                "_e": Math.random(),
                "_orderBy": "creationTime:desc",
                "_upstream": $scope.search._upstream
            };

            $scope.search.forEach(function (f) {
                var sval = f.val;
                switch (f.op) {
                    case "ne":
                        sval = "!" + sval;
                        break;
                    case "similar":
                        sval = "~" + sval;
                        break;
                    case "le":
                        sval = "<" + sval;
                        break;
                    case "ge":
                        sval = ">" + sval;
                        break;
                    case "lte":
                        sval = "<=" + sval;
                        break;
                    case "gte":
                        sval = ">=" + sval;
                        break;
                    case "soundslike":
                        sval = `:(soundslike|"${sval}")`;
                        break;
                    case "approx":
                        sval = `:(approx|"${sval}")`;
                        break;
                }

                if (f.data.type == "date")
                    sval = moment(sval).format("YYYY-MM-DD");
                queryObject[f.parm] = sval;
            });

            $scope.$parent.lastSearch = {
                search: $scope.search
            };
            $scope.$parent.lastSearch.filter = $scope.filter = queryObject;

            try {
                $scope.$apply();
            }
            catch(e) {}
        }
        catch(e) {
            $rootScope.errorHandler(e);
        }
        finally {
            SanteDB.display.buttonWait("#btnSearchSubmit", false);

        }
    }

    // Search if needed
    if ($scope.$parent.lastSearch) {
        $scope.filter = $scope.$parent.lastSearch.filter;
        $scope.search = $scope.$parent.lastSearch.search;
    }
    else {
        // Current search 
        $scope.search = [
            {
                parm: $rootScope.system.config.sync ? "_any" : "identifier.value",
                op: $rootScope.system.config.sync ? "eq" : "similar",
                val: $stateParams.q,
                data: { type: 'string' }
            }
        ];

        if ($stateParams.q)
            $scope.searchMpi();
    }

    // Watch the search length
    $scope.$watch((s) => s.search.map((o) => o.parm).reduce((e, i) => e + i), function (n, o) {
        if (n) for (var i in $scope.search) {
            setMetadata($scope.search[i]);
        }
    });

    // Scan 
    $scope.scanSearch = async function () {
        try {

            SanteDB.display.buttonWait("#btnScan", true);

            var result = await SanteDB.application.searchByBarcodeAsync();
            if (!result)
                return;
            else if (result.$type == "Bundle") {
                $scope.search = [ { parm: 'identifier.value', val: result.$search, op: 'eq', data : { type: 'string' } }];
                $scope.searchMpi();
            }
            else {
                // now we want to redirect the state change
                // TODO: Have this change redirection based on type of the data
                if (SanteDB.application.callResourceViewer(result.$type, { id: result.id })) {
                    if (result.$novalidate)
                        toastr.warning(SanteDB.locale.getString(`ui.model.${result.$type}._code.validation`), null, {
                            preventDuplicates: true,
                            positionClass: "toast-bottom-center",
                            showDuration: 500,
                            hideDuration: 500,
                            timeout: "0",
                            extendedTimeout: "0"
                        });
                }
                else
                    throw new Exception("Exception", `Cannot determine how to display ${result.$type}`);
            }

        }
        catch (e) {
            $rootScope.errorHandler(e);
        }
        finally {
            SanteDB.display.buttonWait("#btnScan", false);
        }
    }
}]);