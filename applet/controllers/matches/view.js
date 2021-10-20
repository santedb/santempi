/// <reference path="../../.ref/js/santedb.js"/>
angular.module('santedb').controller('MpiMatchViewController', ["$scope", "$rootScope", "$state", "$templateCache", "$stateParams", "$timeout", function ($scope, $rootScope, $state, $templateCache, $stateParams, $timeout) {


    // Load related entity
    async function populateTarget(rel, reverse) {
        try {
            console.info(rel);
            // REL > OTHER
            if(!reverse) {
                if(!rel.targetModel || rel.targetModel.$type != 'Patient') {
                    rel.refModel = await SanteDB.resources.ensureTypeAsync(rel.targetModel || await SanteDB.resources.patient.getAsync(rel.target), 'Patient');
                } 
                else {
                    rel.refModel = rel.targetModel;
                }
            }
            // REL < OTHER
            else {
                if(!rel.holderModel || rel.holderModel.$type != 'Patient') {                
                    rel.refModel = await SanteDB.resources.ensureTypeAsync(rel.holderModel || await SanteDB.resources.patient.getAsync(rel.holder), 'Patient');
                }
                else {
                    rel.refModel = rel.holderModel; 
                }
            }
            return rel;
        }
        catch(e) {
            // No need for errors here
        }
        finally {
            // no finally clauses needed
        }
    }

    // Load other candidates
    async function loadOtherCandidiates(patient, excludeId) {
        try {
            var retVal = [];
            if(patient.tag && patient.tag['$generated'] [0]=== 'true') {
                // MDM
                var otherDuplicates = await SanteDB.resources.entityRelationship.find({ 'id' : `!${excludeId}`, 'relationshipType' : '56cfb115-8207-4f89-b52e-d20dbad8f8cc', 'target' : patient.id, "_viewModel" : "reverseRelationship" });
                await Promise.all(otherDuplicates.resource.map(async (o)=> retVal.push(await populateTarget(o, true))));
            }
            else if(patient.relationship && patient.relationship['MDM-Duplicate']) {
                await Promise.all( patient.relationship['MDM-Duplicate'].map(async (o)=>retVal.push(await populateTarget(o))));
            }
            return retVal;
        }
        catch(e) {

        }
    }

    // Function to iniitalize the view
    async function initializeView() {
        try {
            var recordA = null, recordB = null, candidate = null;
            if($stateParams.id) {
                candidate = await SanteDB.resources.entityRelationship.getAsync($stateParams.id, "smpi.reverseRelationship");
                recordA = await SanteDB.resources.ensureTypeAsync(candidate.holderModel || await SanteDB.resources.patient.getAsync(candidate.holder, "mdm"), "Patient");
                recordB = await SanteDB.resources.ensureTypeAsync(candidate.targetModel || await SanteDB.resources.patient.getAsync(candidate.target, "mdm"), "Patient");
            }
            else if($stateParams.sourceId && $stateParams.targetId) {
                candidate = {};
                recordA = await SanteDB.resources.patient.getAsync($stateParams.sourceId, "mdm");
                recordB = await SanteDB.resources.patient.getAsync($stateParams.targetId, "mdm");
            }
            else {
                throw new Exception("ArgumentException", "ui.mpi.error.match.missingArguments");
            }
            // Load other matches for the screen
            recordA.relationship['MDM-Duplicate'] = await loadOtherCandidiates(recordA, candidate.id);
            recordB.relationship['MDM-Duplicate'] = await loadOtherCandidiates(recordB, candidate.id);

            // Get the match report for the specified objects A<>B
            var matchReport = await SanteDB.resources.patient.getAssociatedAsync(recordA.id, "mdm-candidate", recordB.id, null, true);
            matchReport.recordA = recordA;
            matchReport.recordB = recordB;
            matchReport.candidate = candidate;

            // Set the best match
            matchReport.results = matchReport.results.sort((a,b) => b.strength - a.strength);
            matchReport._isConfigurationIssue = candidate.relationshipType == '56cfb115-8207-4f89-b52e-d20dbad8f8cc' && matchReport.results[0].classification == 2;

            // Apply 
            $timeout(_=> 
            {
                $scope.matchReport = matchReport;
            });
        }
        catch(e) {
            $rootScope.errorHandler(e);
        }
    }

     /**
     * Submit an "ignore" request for the specified relationship
     */
      $scope.ignore = async function() {
        try {

            SanteDB.display.buttonWait(`#btnIgnore`, true);
            await ignoreCandidateAsync($scope.matchReport.recordA.id, $scope.matchReport.recordB.id);
            // Go back 
            $state.transitionTo('santedb-admin.mpi.matches.index');
        }
        catch(e) {
            $rootScope.errorHandler(e);
        }
        finally {
            SanteDB.display.buttonWait(`#btnIgnore`, false);
        }
    }

    /**
     * Submit a RESOLVE 
     */
    $scope.resolve = async function() {
        try {

            SanteDB.display.buttonWait(`#btnResolve`, true);
            await attachCandidateAsync($scope.matchReport.recordA.id, $scope.matchReport.recordB.id);
            // Go back 
            $state.transitionTo('santedb-admin.mpi.matches.index');
        }
        catch(e) {
            $rootScope.errorHandler(e);
        }
        finally {
            SanteDB.display.buttonWait(`#btnResolve`, false);
        }
    }
    initializeView();
}]);