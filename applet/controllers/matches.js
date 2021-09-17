angular.module('santedb').controller('MpiMatchDashboardController', ["$scope", "$rootScope", "$state", "$templateCache", "$stateParams", function ($scope, $rootScope, $state, $templateCache, $stateParams) {



    /**
     * Submit an "ignore" request for the specified relationship
     */
    $scope.ignore = async function(relationshipId) {
        try {

            SanteDB.display.buttonWait(`#ignore_${relationshipId}`, true);
            // Confirm the action
            if(!confirm(SanteDB.locale.getString("ui.mpi.matches.ignore.confirm")))
                return;

            // Retrieve the relationship
            var relationship = new EntityRelationship(await SanteDB.resources.entityRelationship.getAsync(relationshipId));
            if(relationship == null) {
                toastr.error(SanteDB.locale.getString("ui.mpi.matches.ignore.notFound"));
                return;
            }
            
            // Send the MDM-ignore post
            var ignoreResult = await SanteDB.resources.patient.removeAssociatedAsync(relationship.holder, "mdm-ignore", relationship.target);
            toastr.success(SanteDB.locale.getString("ui.mpi.matches.ignore.success"));
            
        }
        catch(e) {
            $rootScope.handleError(e);
        }
        finally {
            SanteDB.display.buttonWait(`#ignore_${relationshipId}`, false);
        }
    }

}]);