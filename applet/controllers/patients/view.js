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
angular.module('santedb').controller('MpiPatientViewController', ["$scope", "$rootScope", "$state", "$templateCache", "$stateParams", "$timeout", function ($scope, $rootScope, $state, $templateCache, $stateParams, $timeout) {


    // Loads the specified patient
    async function loadPatient(id) {
        try {
            var patient = await SanteDB.resources.patient.getAsync(id, "full");
            $timeout(() => $scope.patient = patient);

            // Detected issues
            var issues = await SanteDB.resources.patient.invokeOperationAsync(id, "validate", {});
            if(issues.length > 0) {
                $timeout(() => $scope.patient._issues = issues);
            }
        }
        catch (e) {
            // Remote patient perhaps?
            if (e.$type == "FileNotFoundException" || e.cause && e.cause.$type == "FileNotFoundException") {
                try {

                    // Is this a local session? If so, we need to use the application elevator
                    var session = await SanteDB.authentication.getSessionInfoAsync();
                    if (session.method == "LOCAL") // Local session so elevate to use the principal elevator
                    {
                        var elevator = new ApplicationPrincipalElevator(true);
                        await elevator.elevate(session);
                        SanteDB.authentication.setElevator(elevator);
                    }

                    $scope.patient = await SanteDB.resources.patient.getAsync({ id: id, _upstream: true }, "full");
                    $scope.patient._upstream = true;
                    if ($scope.patient.tag) {
                        delete $scope.patient.tag["$mdm.type"];
                        delete $scope.patient.tag["$altkeys"];
                        delete $scope.patient.tag["$generated"];
                    }

                    $scope.$apply();
                    return;
                }
                catch (e) {
                    $rootScope.errorHandler(e);
                }
            }
            $rootScope.errorHandler(e);
        }
    }
    loadPatient($stateParams.id);

    // Download the specified record by touching it
    $scope.downloadRecord = async function () {
        try {
            toastr.info(SanteDB.locale.getString("ui.model.downloading"));
            var localPatient = await SanteDB.resources.patient.copyAsync($stateParams.id);
            localPatient = await SanteDB.resources.patient.getAsync($stateParams.id);
            await SanteDB.resources.patient.updateAsync($stateParams.id, localPatient);
            toastr.info(SanteDB.locale.getString("ui.model.patient.saveSuccess"));
            $state.reload();

        }
        catch (e) {
            $rootScope.errorHandler(e);
        }
    }

    // Set the active state
    $scope.setState = async function (status) {
        try {

            SanteDB.display.buttonWait("#btnSetState", true);
            await setEntityState($scope.patient.id, $scope.patient.etag, status);
            toastr.info(SanteDB.locale.getString("ui.model.patient.saveSuccess"));
            $state.reload();

        }
        catch (e) {
            $rootScope.errorHandler(e);
        }
        finally {
            SanteDB.display.buttonWait("#btnSetState", false);
        }
    }

    
    // Set the active state
    $scope.setTag = async function (tagName, tagValue) {
        try {
            SanteDB.display.buttonWait("#btnClearTag", true);
            await setEntityTag($stateParams.id, tagName, tagValue);
            toastr.info(SanteDB.locale.getString("ui.model.patient.saveSuccess"));
            $state.reload();
        }
        catch (e) {
            $rootScope.errorHandler(e);
        }
        finally {
            SanteDB.display.buttonWait("#btnClearTag", false);
        }
    }

}]);
