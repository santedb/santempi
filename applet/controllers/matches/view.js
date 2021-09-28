angular.module('santedb').controller('MpiMatchViewController', ["$scope", "$rootScope", "$state", "$templateCache", "$stateParams", function ($scope, $rootScope, $state, $templateCache, $stateParams) {


    // Load related entity
    async function populateTarget(rel, reverse) {
        try {
            console.info(rel);
            // REL > OTHER
            if(!reverse) {
                if(!rel.targetModel || rel.targetModel.$type != 'Patient') {
                    rel.refModel = await SanteDB.resources.patient.getAsync(rel.target);
                } 
                else {
                    rel.refModel = rel.targetModel;
                }
            }
            // REL < OTHER
            else {
                if(!rel.holderModel || rel.holderModel.$type != 'Patient') {                
                    rel.refModel = await SanteDB.resources.patient.getAsync(rel.holder);
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
            if($stateParams.candidateId) {
                candidate = await SanteDB.resources.entityRelationship.getAsync($stateParams.candidateId, "reverseRelationship");
                recordA = await SanteDB.resources.patient.getAsync(candidate.holder, "mdm");
                recordB = await SanteDB.resources.patient.getAsync(candidate.target, "mdm");
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
            $scope.matchReport = await SanteDB.resources.patient.getAssociatedAsync(recordA.id, "mdm-candidate", recordB.id, { _upstream: true});
            $scope.matchReport.recordA = recordA;
            $scope.matchReport.recordB = recordB;
            $scope.matchReport.candidate = candidate;

            // Set the best match
            $scope.matchReport.results = $scope.matchReport.results.sort((a,b) => b.strength - a.strength);
            $scope.matchReport._isConfigurationIssue = candidate.relationshipType == '56cfb115-8207-4f89-b52e-d20dbad8f8cc' && $scope.matchReport.results[0].classification == 2;
        }
        catch(e) {
            $rootScope.errorHandler(e);
        }
        finally {
            $scope.$applyAsync();
        }
    }

     /**
     * Submit an "ignore" request for the specified relationship
     */
      $scope.ignore = async function(relationshipId) {
        try {

            SanteDB.display.buttonWait(`#btnIgnore`, true);
            // Confirm the action
            if(!confirm(SanteDB.locale.getString("ui.mpi.matches.ignore.confirm")))
                return;

            // Send the MDM-ignore post
            var ignoreResult = await SanteDB.resources.patient.removeAssociatedAsync(relationship.holder, "mdm-ignore", relationship.target);
            toastr.success(SanteDB.locale.getString("ui.mpi.matches.ignore.success"));
            
        }
        catch(e) {
            $rootScope.errorHandler(e);
        }
        finally {
            SanteDB.display.buttonWait(`#btnIgnore`, false);
        }
    }

    initializeView();
}]);