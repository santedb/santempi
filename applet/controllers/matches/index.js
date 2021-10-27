angular.module('santedb').controller('MpiMatchDashboardController', ["$scope", "$rootScope", "$state", "$templateCache", "$stateParams", function ($scope, $rootScope, $state, $templateCache, $stateParams) {


    // Render holder patient
    $scope.renderHolder = function(rowData) {
        return renderPatientAsString(rowData.holderModel, $rootScope.system.config.application.setting['aa.preferred']); // in mpi.js
    }

    // Render target patient
    $scope.renderTarget = function(rowData) {
        return renderPatientAsString(rowData.targetModel, $rootScope.system.config.application.setting['aa.preferred']); // in mpi.js
    }

    // Render strength column
    $scope.renderStrength = function(rowData) {
        return `${Math.round(rowData.strength * 100)}%`;
    }

    /**
     * Submit an "ignore" request for the specified relationship
     */
     $scope.ignore = async function(candidateId, m) {
        try {

            SanteDB.display.buttonWait(`#Patientignore${m}`, true);
            var candidate = await SanteDB.resources.entityRelationship.getAsync(candidateId, "min", null, true);
            await ignoreCandidateAsync(candidate.holder, candidate.target);
            $("#duplicatesTable table").DataTable().ajax.reload();
        }
        catch(e) {
            $rootScope.errorHandler(e);
        }
        finally {
            SanteDB.display.buttonWait(`#Patientignore${m}`, false);
        }
    }

    /**
     * Submit a RESOLVE 
     */
    $scope.resolve = async function(candidateId, m) {
        try {

            SanteDB.display.buttonWait(`#Patientesolve${m}`, true);
            var candidate = await SanteDB.resources.entityRelationship.getAsync(candidateId, "min", null, true);
            await attachCandidateAsync(candidate.holder, candidate.target);
            $("#duplicatesTable table").DataTable().ajax.reload();
        }
        catch(e) {
            $rootScope.errorHandler(e);
        }
        finally {
            SanteDB.display.buttonWait(`#Patientesolve${m}`, false);
        }
    }

}]);