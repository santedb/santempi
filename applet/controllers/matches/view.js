angular.module('santedb').controller('MpiMatchViewController', ["$scope", "$rootScope", "$state", "$templateCache", "$stateParams", function ($scope, $rootScope, $state, $templateCache, $stateParams) {


    // Function to iniitalize the view
    async function initializeView() {
        try {
            if($stateParams.candidateId) {
                var candidate = await SanteDB.resources.entityRelationship.getAsync($stateParams.candidateId, "reverseRelationship");
                $scope.patientA = await SanteDB.resources.patient.getAsync(candidate.holder, "min");
                $scope.patientB = await SanteDB.resources.patient.getAsync(candidate.target, "min");
            }
            else if($stateParams.sourceId && $stateParams.targetId) {
                $scope.patientA = await SanteDB.resources.patient.getAsync($stateParams.sourceId, "min");
                $scope.patientB = await SanteDB.resources.patient.getAsync($stateParams.targetId, "min");
            }
            else {
                throw new Exception("ArgumentException", "ui.mpi.error.match.missingArguments");
            }
            // Get the match report for the specified objects A<>B
            $scope.matchReport = await SanteDB.resources.patient.getAssociatedAsync($scope.patientA.id, "mdm-candidate", $scope.patientB.id, { _upstream: true});
        }
        catch(e) {
            $rootScope.errorHandler(e);
        }
    }

    initializeView();
}]);