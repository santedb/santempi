/// <reference path="../../.ref/js/SanteDB.js" />
angular.module("santedb").controller("MpiIdCardWidgetController", ["$scope", "$rootScope", "$timeout", function ($scope, $rootScope, $timeout) {

    
    $scope.$watch("scopedObject", async function (n, o) {
        if(n) {
            var preferred = $rootScope.system.config.application.setting['aa.preferred'];

            if(preferred && n.identifier) {
                var barcode = n.identifier[preferred];
                if(barcode) { 
                    if(Array.isArray(barcode))
                        barcode = barcode[0];
                    n.barcodeUrl = `/hdsi/Patient/${n.id}/_code/${barcode.authority.id}?_sessionId=${window.sessionStorage.getItem("token")}`;
                    n.barcodeId = barcode;
                }
            } 
            else {
                    n.barcodeUrl = `/hdsi/Patient/${n.id}/_code/all`;
              }
        }
    });

    $scope.closeFull = function() {
        $(".id-card-print").removeClass("id-card-fade id-card-fadeIn").addClass("id-card-fade id-card-fadeOut").removeClass("d-block");
        $timeout(function() { $(".id-card-print").addClass("d-none") }, 500);
    }

    $scope.showFull = function() {
        $(".id-card-print").removeClass("d-none id-card-fade id-card-fadeOut").addClass("id-card-fade id-card-fadeIn").addClass("d-block");
    }


    $scope.print = function() {
        SanteDB.application.printView();
    }
}]);