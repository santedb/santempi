/// <reference path="../../.ref/js/SanteDB.js" />
/// <reference path="../../.ref/js/santedb-model.js" />
angular.module('santedb').controller('MpiRegistrationEventController', ['$scope', '$rootScope',  '$state', '$timeout', function($scope, $rootScope, $state, $timeout) {

    async function initializeView(patient) {

        try {

            var altKeys = [ patient.id ];
            if(patient.tag && patient.tag['$alt.keys']) {
                altKeys = patient.tag['$alt.keys'][0].split(',');
                altKeys.push(patient.id);
            }
            var events = await SanteDB.resources.act.findAsync({ 'participation[RecordTarget].player' : altKeys, 'classConcept' : [ActClassKeys.Registration, ActClassKeys.ControlAct ] }, "full");
            $timeout(_ => $scope.events = events.resource || []);
        }
        catch(e) {
            $rootScope.errorHandler(e);
        }
    }

    $scope.$watch("scopedObject", async function (n, o) {
        if(n) {
            await initializeView(n);
        }
    })
}]);