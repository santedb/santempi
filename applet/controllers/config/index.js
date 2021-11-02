
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

    // Update the configuration
    async function updateConfiguration(id, state) {
        try {
            await SanteDB.resources.matchConfiguration.invokeOperationAsync(id, "state", {  state: state  });
            $("div[type=MatchConfiguration] table").DataTable().ajax.reload()
        }
        catch (e) {
            $rootScope.errorHandler(e);
        }
    }

    // Enable the specified configuration
    $scope.enable = async function(id, m) {
        if(confirm(SanteDB.locale.getString("ui.mpi.match.config.enable.confirm"))) {
            try {
                SanteDB.display.buttonWait(`#MatchConfigurationenable${m}`, true);
                await updateConfiguration(id, true);
                toastr.success(SanteDB.locale.getString("ui.mpi.match.conig.enable.success"));
            }
            catch(e) {
                toastr.error(SanteDB.locale.getString("ui.mpi.match.conig.enable.error"));
            }
            finally {
                SanteDB.display.buttonWait(`#MatchConfigurationenable${m}`, false);
            }
        }
    }

    // Disable the specified configuration
    $scope.disable = async function(id, m) {
        if(confirm(SanteDB.locale.getString("ui.mpi.match.config.disable.confirm")))
        {
            try {
                SanteDB.display.buttonWait(`#MatchConfigurationdisable${m}`, true);
                await updateConfiguration(id, false);
                toastr.success(SanteDB.locale.getString("ui.mpi.match.conig.enable.success"));
            }
            catch(e) {
                toastr.error(SanteDB.locale.getString("ui.mpi.match.conig.enable.error"));
            }
            finally {
                SanteDB.display.buttonWait(`#MatchConfigurationdisable${m}`, false);
            }
        }
    }
}])