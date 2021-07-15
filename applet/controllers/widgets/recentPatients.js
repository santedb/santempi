/// <reference path="../../.ref/js/santedb.js" />

angular.module('santedb').controller('recentPatientsController', ["$scope", "$rootScope", "$state", "$templateCache", "$interval", function ($scope, $rootScope, $state, $templateCache, $interval) {

    $scope.recentPatientQuery = {
        "modifiedOn" : `>${moment(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1)).format('YYYY-MM-DD')}`,
        "_orderBy" : "creationTime:desc",
        "obsoletionTime": "null"
    }

    registerAssetsViewers($state);

    // Render the names
    $scope.renderName = function(patient) {
    
        var retVal = "";
        if(patient.name)
            Object.keys(patient.name).forEach(function(n) 
            {
                retVal += `${SanteDB.display.renderEntityName(patient.name[n])} <span class="badge badge-info">${n}</span> ,`;
            });
        else 
            retVal = "N/A ";
        return retVal.substr(0, retVal.length - 1);
    }

    $scope.renderDob = function(patient) {
        if(patient.dateOfBirth)
            return SanteDB.display.renderDate(patient.dateOfBirth, patient.dateOfBirthPrecision);
        else
            return "N/A";
    }

    $scope.renderGender = function(patient) {
        var retVal = "";
        if(patient.genderConcept)
            switch(patient.genderConcept) {
                case "f4e3a6bb-612e-46b2-9f77-ff844d971198":
                    retVal += '<i class="fas fa-male"></i> ';
                    break;
                case "094941e9-a3db-48b5-862c-bc289bd7f86c":
                    retVal += '<i class="fas fa-female"></i> ';
                    break;
                default:
                    retVal += '<i class="fas fa-question-circle"></i> ';
            }

        if(patient.genderConceptModel && patient.genderConceptModel.mnemonic) {
            retVal += SanteDB.display.renderConcept(patient.genderConceptModel);
        }
        return retVal;
    }

    $scope.renderIdentifier = function(patient) {

        var preferred = $rootScope.system.config.application.setting['aa.preferred'];

        var retVal = "";
        if(patient.identifier) {
            Object.keys(patient.identifier).forEach(function(id) {
                if(preferred && id == preferred || !preferred)
                    retVal += `${patient.identifier[id][0].value} <span class="badge badge-dark">${ patient.identifier[id][0].authority ? patient.identifier[id][0].authority.name : id }</span> ,`;
            });
        }
        else retVal += "N/A ";
        return retVal.substring(0, retVal.length - 1);
    }
}]);
