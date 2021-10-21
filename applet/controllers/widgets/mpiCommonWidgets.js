angular.module('santedb').controller('MpiCommonWidgetController', ['$scope', '$rootScope',  '$state', function ($scope, $rootScope, $state) {

    // Render demogrpahics function
    $scope.renderDemographics = renderPatientAsString;

    // Scanner search
    $scope.scanSearch = async function () {
        try {

            SanteDB.display.buttonWait("#btnScan", true);

            var result = await SanteDB.application.searchByBarcodeAsync();
            if (!result)
                return;
            else if (result.$type == "Bundle") {
                $state.transitionTo("santedb-admin.mpi.patients.search", {q: result.$search });
            }
            else {
                // now we want to redirect the state change
                // TODO: Have this change redirection based on type of the data
                if (SanteDB.application.callResourceViewer(result.$type, $state, { id: result.id })) {
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
