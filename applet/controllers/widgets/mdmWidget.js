/// <reference path="../../.ref/js/santedb.js"/>
angular.module('santedb').controller('MasterDataManagementController', ['$scope', '$rootScope', '$timeout', function ($scope, $rootScope, $timeout) {

    // Strength
    $scope.renderStrength = function (entity) {
        return entity.tag["$match.score"] ? entity.tag["$match.score"][0] : "?";
    }

    // Render entity information
    $scope.renderEntityInfo = function (entity) {

        return renderPatientAsString(entity, $rootScope.system.config.application.setting['aa.preferred']);

    }

    // Render entity information
    $scope.renderCreatedBy = function (entity) {
        return `<provenance provenance-id="'${entity.createdBy}'"  provenance-time="'${entity.creationTime}'"></provenance>`;
    }

    // Render classification concept
    $scope.renderClassificationConcept = function(entity) {
        if(entity.tag && entity.tag["$mdm.relationship.class"]) {
            switch(entity.tag["$mdm.relationship.class"][0]) {
                case "Auto":
                    return "<i class='fas fa-magic'></i> Auto";
                case "System":
                    return "<i class='fas fa-cogs'></i> System";
                case "Verified":
                    return "<i class='fas fa-check-circle'></i> Verified";
            }
        }
        else {
            return "<i class='fas fa-question-circle'></i>";
        }
    }

    // Show match detail
    $scope.matchDetail = async function (id) {
        try {
            $timeout(() => {
                delete($scope.scopedObject.candidateObject);
                $("#candidateDetailModal").modal('show');
            });
            delete ($scope.candidateObject);
            var matchReport = await SanteDB.resources.patient.getAssociatedAsync($scope.scopedObject.id, "mdm-candidate", id, { _upstream: true });

            $timeout(_ => {
                $scope.scopedObject.candidateObject = {
                    results: matchReport.results
                };
            });

        }
        catch (e) {
            $rootScope.errorHandler(e);
        }
    }

    /**
     * Submit an "ignore" request for the specified relationship
     */
    $scope.ignore = async function (id, m) {
        try {

            SanteDB.display.buttonWait(`#Patientignore${m}`, true);
            await ignoreCandidateAsync(id, $scope.scopedObject.id);
            $("div[type=Patient] table").DataTable().ajax.reload()
        }
        catch (e) {
            $rootScope.errorHandler(e);
        }
        finally {
            SanteDB.display.buttonWait(`#Patientignore${m}`, false);
        }
    }

    /**
     * Submit an "un-ignore" request for the specified relationship
     */
     $scope.ignore = async function (id, m) {
        try {

            SanteDB.display.buttonWait(`#Patientignore${m}`, true);
            await ignoreCandidateAsync(id, $scope.scopedObject.id);
            $("div[type=Patient] table").DataTable().ajax.reload()
        }
        catch (e) {
            $rootScope.errorHandler(e);
        }
        finally {
            SanteDB.display.buttonWait(`#Patientignore${m}`, false);
        }
    }

    /**
     * Submit a RESOLVE 
     */
    $scope.resolve = async function (id, m) {
        try {

            SanteDB.display.buttonWait(`#Patientresolve${m}`, true);
            await attachCandidateAsync($scope.scopedObject.id, id);
            $("div[type=Patient] table").DataTable().ajax.reload()
        }
        catch (e) {
            $rootScope.errorHandler(e);
        }
        finally {
            SanteDB.display.buttonWait(`#Patientesolve${m}`, false);
        }
    }

    /**
     * Detatch the record
     */
    $scope.detach = async function (id, m) {
        try {

            SanteDB.display.buttonWait(`#Patientunlink${m}`, true);
            await detachLocalAsync($scope.scopedObject.id, id);
            $("div[type=Patient] table").DataTable().ajax.reload()
        }
        catch (e) {
            $rootScope.errorHandler(e);
        }
        finally {
            SanteDB.display.buttonWait(`#Patientunlink${m}`, false);
        }
    }

    /**
     * Re-match a record
     */
    $scope.rematch = async function () {
        try {
            SanteDB.display.buttonWait('#Patientrematch', true);

            if (!confirm(SanteDB.locale.getString("ui.mpi.matches.rematch.confirm"))) {
                return;
            }

            var result = await SanteDB.resources.patient.invokeOperationAsync($scope.scopedObject.id, "mdm-rematch", { clear: true }, true);

            $("div[type=Patient] table").DataTable().ajax.reload()

        }
        catch (e) {
            $rootScope.errorHandler(e);
        }
        finally {
            SanteDB.display.buttonWait('#Patientrematch', false);
        }
    }

    /**
     * Submit an "un-ignore" request for the specified relationship
     */
     $scope.unIgnore = async function (id, m) {
        try {

            SanteDB.display.buttonWait(`#Patientunignore${m}`, true);
            await unIgnoreCandidateAsync(id, $scope.scopedObject.id);
            $("div[type=Patient] table").DataTable().ajax.reload()
        }
        catch (e) {
            $rootScope.errorHandler(e);
        }
        finally {
            SanteDB.display.buttonWait(`#Patientunignore${m}`, false);
        }
    }
}]);