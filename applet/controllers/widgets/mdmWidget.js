/// <reference path="../../.ref/js/santedb.js"/>
angular.module('santedb').controller('MasterDataManagementController', ['$scope', '$rootScope',  '$timeout', function ($scope, $rootScope, $timeout) {
    
    // Strength
    $scope.renderStrength = function(entityRelationship) {
        return `${Math.round(entityRelationship.strength * 100)}%`;
    }

    // Render entity information
    $scope.renderEntityInfo = function(entityRelationship) {
        
        var entity = entityRelationship.holderModel;
        return renderPatientAsString(entity);
        
    }
  
    // Render entity information
    $scope.renderCreatedBy = function(entityRelationship) {
        var entity = entityRelationship.holderModel;
        return `<provenance provenance-id="'${entity.createdBy}'"  provenance-time="'${entity.creationTime}'"></provenance>`;
    }

    // Show match detail
    $scope.matchDetail = async function(id) { 
        try {
            $("#candidateDetailModal").modal('show');
            delete($scope.candidateObject);
            var candidate = await SanteDB.resources.entityRelationship.getAsync(id, "smpi.reverseRelationship");
            candidate.holderModel = candidate.holderModel || await SanteDB.resources.patient.getAsync(candidate.holder, "mdm");
            var matchReport = await SanteDB.resources.patient.getAssociatedAsync($scope.scopedObject.id, "mdm-candidate", candidate.holder, { _upstream: true});
            candidate.results = matchReport.results;
            $timeout(_ =>  {
                $scope.candidateObject = candidate;
            });

        }
        catch(e) {
            $rootScope.errorHandler(e);
        }
    }

    /**
     * Submit an "ignore" request for the specified relationship
     */
     $scope.ignore = async function(candidateId, m) {
        try {

            SanteDB.display.buttonWait(`#Patientignore${m}`, true);
            var candidate = await SanteDB.resources.entityRelationship.getAsync(candidateId, "min", null, true);
            await ignoreCandidateAsync(candidate.holder, candidate.target);
            $("div[type=EntityRelationship] table").DataTable().ajax.reload()
        }
        catch(e) {
            $rootScope.errorHandler(e);
        }
        finally {
            SanteDB.display.buttonWait(`#Patientignore${m}`, false);
        }
    }

    /**
     * Submit a RESOLVE 
     */
    $scope.resolve = async function(candidateId, m) {
        try {

            SanteDB.display.buttonWait(`#Patientmerge${m}`, true);
            var candidate = await SanteDB.resources.entityRelationship.getAsync(candidateId, "min", null, true);
            await attachCandidateAsync(candidate.holder, candidate.target);
            $("div[type=EntityRelationship] table").DataTable().ajax.reload()
        }
        catch(e) {
            $rootScope.errorHandler(e);
        }
        finally {
            SanteDB.display.buttonWait(`#Patientmerge${m}`, false);
        }
    }
}]);