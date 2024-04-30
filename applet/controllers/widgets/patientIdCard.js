/// <reference path="../../.ref/js/SanteDB.js" />
angular.module("santedb").controller("MpiIdCardWidgetController", ["$scope", "$rootScope", "$timeout", function ($scope, $rootScope, $timeout) {


    $scope.$watch("scopedObject", async function (n, o) {
        if (n && n.id) {
            var barcodeUrl = `/hdsi/Patient/${n.id}/_code?_format=santedb-vrp`;
            $("#printBarcodeUrl").attr("src", barcodeUrl);
            $("#displayBarcodeUrl").attr("src", barcodeUrl);
        }
    });

    $scope.closeFull = function () {
        $(".id-card-print").removeClass("id-card-fade id-card-fadeIn").addClass("id-card-fade id-card-fadeOut").removeClass("d-block");
        $timeout(function () { $(".id-card-print").addClass("d-none") }, 500);
    }

    $scope.showFull = function () {
        $(".id-card-print").removeClass("d-none id-card-fade id-card-fadeOut").addClass("id-card-fade id-card-fadeIn").addClass("d-block");
    }

    $scope.print = function () {
        SanteDB.application.printView();
    }
}]);