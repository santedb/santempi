
/// <reference path="../../.ref/js/santedb.js"/>
angular.module('santedb').controller('MpiConfigurationDashboardController', ["$scope", "$rootScope", "$state", "$templateCache", "$stateParams", "$timeout", function ($scope, $rootScope, $state, $templateCache, $stateParams, $timeout) {


    // Render holder patient
    $scope.renderModifiedOn = (r) => SanteDB.display.renderDate(r.meta.updatedTime || r.meta.creationTime);

    // Render status
    $scope.renderState = (r) => `<i class="text-${r.meta.status == "Active" ? 'success' : 'danger' } fas fa-fw fa-circle"></i> ${r.meta.status}`;

    // Download
    $scope.download = (r) => 
        window.open(`/ami/MatchConfiguration/${r}/html`);
    

    // Initialize the view
    async function initializeView() {
        try {
            var jobStatus = await SanteDB.resources.jobInfo.findAsync({ name: "Background Matching Job" });
            var currentMatchJob = jobStatus.resource.find(o=>o.state == "Running");
            $timeout(_=> {
                $scope.currentMatching = currentMatchJob;
            })
        }
        catch(e) {

        }
    }

    initializeView();
}])