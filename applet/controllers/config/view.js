/// <reference path="../../.ref/js/santedb.js"/>
angular.module('santedb').controller('MpiConfigurationDetailController', ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", function ($scope, $rootScope, $state, $stateParams, $timeout) {

    // Initialize the view
    async function initializeView() {

        var configId = $stateParams.id;

        try {
            var matchConfiguration = {
                id: configId
            };
            if (configId != '$new') {
                matchConfiguration = await SanteDB.resources.matchConfiguration.getAsync(configId);
            }
            $timeout(_ => $scope.matchConfiguration = matchConfiguration);
        }
        catch (e) {
            $rootScope.errorHandler(e);
        }

    }

    initializeView();

}]);