/// <reference path="../../.ref/js/santedb.js"/>
angular.module('santedb').controller('MasterDataManagementController', ['$scope', '$rootScope',  '$timeout', function ($scope, $rootScope, $timeout) {
    
    // Strength
    $scope.renderStrength = function(entityRelationship) {
        return `${Math.round(entityRelationship.strength * 100)}%`;
    }

    // Render entity information
    $scope.renderEntityInfo = function(entityRelationship) {
        
        var entity = entityRelationship.holderModel;

        var retVal = "";
        if(entity.name) {
            var key = Object.keys(entity.name)[0];
            retVal += `<strong>${SanteDB.display.renderEntityName(entity.name[key])}</strong>`;
        }

        retVal += "<span class='badge badge-secondary'>";

        var preferredDomain = $rootScope.system.config.application.setting['aa.preferred'];
        if(entity.identifier) {
            if(preferredDomain && entity.identifier[preferredDomain])
                retVal += `<i class="fas fa-id-card"></i> ${SanteDB.display.renderIdentifier(entity.identifier, preferredDomain)}`;
            else {
                var key = Object.keys(entity.identifier)[0];
                retVal += `<i class="far fa-id-card"></i> ${SanteDB.display.renderIdentifier(entity.identifier, key)}`;
            }
        }
        
        retVal += "</span>";

        if(entity.dateOfBirth)
            retVal += `<br/><i class='fas fa-birthday-cake'></i> ${SanteDB.display.renderDate(entity.dateOfBirth, entity.dateOfBirthPrecision)} `;

        // Deceased?
        if(entity.deceasedDate)
            retVal += `<span class='badge badge-dark'>${SanteDB.locale.getString("ui.model.patient.deceasedIndicator")}</span>`;

        // Gender
        switch(entity.genderConceptModel.mnemonic) {
            case 'Male':
                retVal += `<i class='fas fa-male' title="${SanteDB.display.renderConcept(entity.genderConceptModel)}"></i> ${SanteDB.display.renderConcept(entity.genderConceptModel)}`;
                break;
            case 'Female':
                retVal += `<i class='fas fa-female' title="${SanteDB.display.renderConcept(entity.genderConceptModel)}"></i> ${SanteDB.display.renderConcept(entity.genderConceptModel)}`;
                break;
            default:
                retVal += `<i class='fas fa-restroom' title="${SanteDB.display.renderConcept(entity.genderConceptModel)}"></i> ${SanteDB.display.renderConcept(entity.genderConceptModel)}`;
                break;
        }
        
        if($scope.scopedObject.relationship["MDM-RecordOfTruth"] &&
            $scope.scopedObject.relationship["MDM-RecordOfTruth"][0].target == entity.id) {
                retVal += `<span class='badge badge-success'><i class='fas fa-gavel'></i> ${SanteDB.locale.getString("ui.mdm.type.T")} </span>`
            }
        return retVal;
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
}]);