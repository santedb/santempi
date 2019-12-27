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

    // Current search 
    $scope.search = [
        {
            parm: "_any",
            op: "eq",
            val: $stateParams.q,
            data: { type:  'string' }
        }
    ];

    // Get datatype of the parameter
    function setMetadata(parameter) {
        switch (parameter.parm) {
            case "name.component[Family].value":
            case "name.component[Given].value":
            case "address.component.value":
            case "address.component[State].value":
            case "identifier.value":
                parameter.data =  { type: "string" };
                break;
            case "_any":
                parameter.data = { type: "string" , _fts: true }
                break;
            case "address":
                parameter.data = { type: "entity", entity: "Place", filter: { classConcept: `!${EntityClassKeys.ServiceDeliveryLocation}` }, search: 'name.component.value' };
                break;
            case "genderConcept":
                parameter.data =  { type: "list" };
                SanteDB.resources.concept.findAsync({ conceptSet : "e9eecd3c-7b80-47f9-9cb6-55c8d3110fb0" }).then((r) => {
                    parameter.data.list = r.item;
                    $scope.$apply();
                }).catch((e) => {
                    console.error(e);
                })
                break;
            case "dateOfBirth":
            case "dateOfDeath":
                parameter.data =  { type: "date", max: moment().format("YYY-MM-DD") }
                break;

        }
    }
    // Watch the search length
    $scope.$watch((s) => s.search.map((o) => o.parm).reduce((e, i) => e + i), function (n, o) {
        if (n) for (var i in $scope.search) {
            setMetadata($scope.search[i]);
        }
    });

    
    // Render the names
    $scope.renderName = function(patient) {
        
        var retVal = "";
        if(patient.name)
            Object.keys(patient.name).forEach(function(n) 
            {
                retVal += `${SanteDB.display.renderEntityName(patient.name[n])} <span class="badge badge-info">${n}</span> ,`;
            });
        else 
            retVal = "N/A ";
        return retVal.substr(0, retVal.length - 1);
    }

    // Render DOB
    $scope.renderDob = function(patient) {
        if(patient.dateOfBirth)
            return SanteDB.display.renderDate(patient.dateOfBirth, patient.dateOfBirthPrecision);
        else
            return "N/A";
    }

    // Render the patient's gender
    $scope.renderGender = function(patient) {
        var retVal = "";
        switch(patient.genderConcept) {
            case "f4e3a6bb-612e-46b2-9f77-ff844d971198":
                retVal += '<i class="fas fa-male"></i> ';
                break;
            case "094941e9-a3db-48b5-862c-bc289bd7f86c":
                retVal += '<i class="fas fa-female"></i> ';
                break;
            default:
                retVal += '<i class="fas fa-question-circle"></i> ';
        }

        if(patient.genderConceptModel.mnemonic) {
            retVal += SanteDB.display.renderConcept(patient.genderConceptModel);
        }
        return retVal;
    }

    // Render identifiers
    $scope.renderIdentifier = function(patient) {
        var retVal = "";
        if(patient.identifier) {
            Object.keys(patient.identifier).forEach(function(id) {
                retVal += `${patient.identifier[id].value} <span class="badge badge-dark">${ patient.identifier[id].authority ? patient.identifier[id].authority.name : id }</span> ,`;
            });
        }
        else retVal += "N/A ";
        return retVal.substring(0, retVal.length - 1);
    }

    // Search MPI
    $scope.searchMpi = function(formData) {
        if(formData.$invalid)
            return;
        
        // Build query and bind query to the search table
        var queryObject = {
        };

        $scope.search.forEach(function(f) {
            var sval = f.val;
            switch(f.op) {
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
            }
            queryObject[f.parm] = sval;
        });

        $scope.filter = queryObject;
    }
}]);