
/// <reference path="../../.ref/js/santedb.js"/>
angular.module('santedb').controller('MpiConfigurationDashboardController', ["$scope", "$rootScope", "$state", "$templateCache", "$stateParams", function ($scope, $rootScope, $state, $templateCache, $stateParams) {


    // Render holder patient
    $scope.renderModifiedOn = (r) => SanteDB.display.renderDate(r.meta.updatedTime || r.meta.creationTime);

    // Render status
    $scope.renderState = (r) => `<i class="text-${r.meta.status == "Active" ? 'success' : 'danger' } fas fa-fw fa-circle"></i> ${r.meta.status}`;
}])