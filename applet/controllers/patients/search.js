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



    var defaultSearch = {
        advanced: {
            name: [ new EntityName() ],
            address: [ new EntityAddress() ],
            dateOfBirth: {
                from : null,
                to: null
            },
            genderConcept: null
        },
        val: $stateParams.q,
        custom: [ {} ]
    }


    // Convert value to a search clause
    function makeSearchClause(value) {
        if(value == "") {
            return null;
        }
        else if(value[0] == '~') // sound
        {
            return `:(approx|'${value.substring(1)}')`;
        }
        else if(value.indexOf("*") > -1) // fuzzy
        {
            return `~${value}`;
        }
        else 
        {
            return value;
        }
    }   

    // Validate the advanced search 
    // At least 3 fuzzy fields must be filled OR an identifier
    $scope.validateAdvancedSearch = function() {
        if(!$scope.search._advanced) return false;

        var fields = 0, advanced = $scope.search.advanced;
        var address= (advanced.address.$other[0].component || {});
        var name = (advanced.name.$other[0].component || {});
        if(name.Given || name.Family) fields++;
        if(advanced.identifier) fields += 3; // identifier= pass
        if(address.City || address.State || address.StreetAddressLine || address.County) fields++;
        if(advanced.genderConcept) fields++;
        if(advanced.dateofBirth && (advanced.dateOfBirth.from || advanced.dateOfBirth.to)) fields++;

        return fields >= 1;
    }

    $scope.renderDemographics = renderPatientAsString;
    // Search MPI
    $scope.searchMpi = async function (formData, custom) {
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

            var queryObject = {
                "_e": Math.random(),
                "_orderBy": "creationTime:desc",
                "_upstream": $scope.search._upstream
            };

            if(custom) { // Custom HDSI search
                $scope.search.custom.forEach((o) => {

                    var operator = "";
                    switch(o.op) {
                        case "not-equal":
                            operator = "!";
                            break;
                        case "less-than":
                            operator = "<";
                            break;
                        case "less-than-equal":
                            operator = "<=";
                            break;
                        case "greater-than":
                            operator = ">";
                            break;
                        case "greater-than-equal":
                            operator = ">=";
                            break;
                        case "approx":
                            operator = "~";
                            break;
                        case "equal":
                        default:
                            operator = "";
                    }

                    var value = o.value;
                    if(value instanceof Date) {
                        value = value.toISOString(); 
                    }
                    var filterValue = `${operator}${value}`;
                    if(queryObject[o.filter.expression])
                    {
                        queryObject[o.filter.expression].push(filterValue);
                    }
                    else {
                        queryObject[o.filter.expression] = [ filterValue ];
                    }
                });
            }
            else if ($scope.search._advanced) {

                var advanced = $scope.search.advanced;
               
                // Query 
                if(advanced.name.$other[0].component){
                    if(advanced.name.$other[0].component.Given)
                        queryObject["name.component[Given].value"] = makeSearchClause(advanced.name.$other[0].component.Given);
                    if(advanced.name.$other[0].component.Family)
                        queryObject["name.component[Family].value"] =  makeSearchClause(advanced.name.$other[0].component.Family);
                }
                if(advanced.address.$other[0].component)
                {
                    if(advanced.address.$other[0].component.City)
                        queryObject["address.component[City].value"] = makeSearchClause(advanced.address.$other[0].component.City);
                    if(advanced.address.$other[0].component.County)
                        queryObject["address.component[County].value"] = makeSearchClause(advanced.address.$other[0].component.County);
                    if(advanced.address.$other[0].component.State)
                        queryObject["address.component[State].value"] = makeSearchClause(advanced.address.$other[0].component.State);
                    if(advanced.address.$other[0].component.Country)
                        queryObject["address.component[Country].value"] = makeSearchClause(advanced.address.$other[0].component.Country);
                    if(advanced.address.$other[0].component.StreetAddressLine)
                        queryObject["address.component[StreetAddressLine].value"] = makeSearchClause(advanced.address.$other[0].component.StreetAddressLine);
                }
                if(advanced.identifier)
                    queryObject["identifier.value"] = makeSearchClause(advanced.identifier);
                if(advanced.dateOfBirth.from)
                    queryObject["dateOfBirth"] = `>=${moment(advanced.dateOfBirth.from).format('YYYY-MM-DD')}`;
                if(advanced.dateOfBirth.to)
                    queryObject["dateOfBirth"] = `<=${moment(advanced.dateOfBirth.to).format('YYYY-MM-DD')}`;
                if(advanced.genderConcept)
                    queryObject["genderConcept"] = advanced.genderConcept;

            }
            else {
                // Build query and bind query to the search table
                queryObject["_any"] = $scope.search.val;
            }
            $scope.$parent.lastSearch = {
                search: $scope.search
            };
            $scope.$parent.lastSearch.filter = $scope.filter = queryObject;


            try {
                $scope.$apply();
            } catch (e) { }
        }
        finally {
            SanteDB.display.buttonWait("#btnSearchSubmit", false);

        }
    }

    // Research search
    $scope.resetSearch = function() {
        $scope.search = angular.copy(defaultSearch);
    }


    // Scan identifier but don't search
    $scope.scanIdentifier = async function() {
        
        SanteDB.display.buttonWait("#btnScanSecondary", true);
        try {
            $scope.search.advanced.identifier = await SanteDB.application.scanIdentifierAsync();
            try { $scope.$apply(); }
            catch(e) {}
        }
        catch(e) {
            $rootScope.errorHandler(e);
        }
        finally {
            SanteDB.display.buttonWait("#btnScanSecondary", false);
        }
    }

    // Scan 
    $scope.scanSearch = async function () {
        try {

            SanteDB.display.buttonWait("#btnScan", true);

            var result = await SanteDB.application.searchByBarcodeAsync();
            if (!result)
                return;
            else if (result.$type == "Bundle") {
                $scope.search.val = result.$search; 
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

    // Search if needed
    if ($scope.$parent.lastSearch) {
        $scope.filter = $scope.$parent.lastSearch.filter;
        defaultSearch = $scope.search = $scope.$parent.lastSearch.search;

        if($scope.search._advanced)
            $('#searchCarousel').carousel(1);
    }
    else {
        // Current search 
        $scope.search = defaultSearch;

        $scope.resetSearch();
        $scope.search._advanced = false;

        if ($stateParams.q)
            $scope.searchMpi();
    }


    $('#searchCarousel').on('slide.bs.carousel', function () {
        $scope.search._advanced = !$scope.search._advanced;
        //delete($scope.search.advanced);

        try {
            $scope.$apply();
        } catch (e) { }
    });

}]);