/// <reference path="../../.ref/js/santedb.js"/>

// Load available transforms
SanteDB.resources.matchConfiguration.invokeOperationAsync(null, "transforms").then((o) => {
    SanteDB.configuration._globalMatchTransforms =  o;
});

angular.module('santedb').controller('MpiConfigurationDetailController', ["$scope", "$rootScope", "$state", "$stateParams", "$timeout", "$interval", function ($scope, $rootScope, $state, $stateParams, $timeout, $interval) {

    // Initialize the view
    async function initializeView() {

        var configId = $stateParams.id;

        try {

            
            var matchConfiguration = {
                meta: {
                    version: 1,
                    status: "Inactive",
                    tags: [
                        { key: "$mdm.auto-link", value: "false" }
                    ]
                },
                blocking: [],
                scoring: [],
                nonMatchThreshold: 0.0,
                matchThreshold: 0.0,
                target: [
                    {
                        "resource": "Patient"
                    }
                ]
            };
            if (configId != '$new') {
                matchConfiguration = await SanteDB.resources.matchConfiguration.getAsync(configId);

                // Initialize the uuids on all statements
                if(matchConfiguration.blocking) {
                    matchConfiguration.blocking.forEach((b) =>
                    {
                        b._id = `blk${SanteDB.application.newGuid().replace('-','')}`;
                        b.filter.forEach((f) => {
                            f._id = `flt${SanteDB.application.newGuid().replace('-','')}`;
                        });
                    });
                }
                if(matchConfiguration.scoring) {
                    matchConfiguration.scoring.forEach((s) =>
                    {
                        s._id = `scr${SanteDB.application.newGuid().replace('-','')}`;
                        if(s.transform) {
                            s.transform.forEach((t) => {
                                t._id = `blk${SanteDB.application.newGuid().replace('-','')}`;
                            });
                        }
                    });
                }
            }

            $timeout(_ => {
                console.info("Calling refresh of diagrams");
                refreshDiagrams(matchConfiguration)
            }, 1000);
            // Angular timeout to wait for the element
            $timeout(_ => {
                $scope.matchConfiguration = matchConfiguration;
            });
        }
        catch (e) {
            $rootScope.errorHandler(e);
        }

    }

    initializeView();


    // Watch for changes in scores to update the min and max scores
    $scope.$watch('matchConfiguration.scoring', function (n, o) {
        if ($scope.matchConfiguration) {
            if (n != o && n && n.length > 0) {
                if(n.length < 2) {
                    $scope.matchConfiguration.minScore = n[0].nonMatchWeight;
                    $scope.matchConfiguration.maxScore = n[0].matchWeight;
                }
                else {
                    $scope.matchConfiguration.minScore = n.reduce((a, b) => (a.nonMatchWeight || a) + b.nonMatchWeight);
                    $scope.matchConfiguration.maxScore = n.reduce((a, b) => (a.matchWeight || a) + b.matchWeight);
                }
            }
            else {
                $scope.matchConfiguration.maxScore = $scope.matchConfiguration.minScore = 0;
            }
        }
    });

    // Download
    $scope.download = _ => window.open(`/ami/MatchConfiguration/${$scope.matchConfiguration.id}/html`);


    // Update the configuration
    async function updateConfiguration(id, state) {
        try {
            var result = await SanteDB.resources.matchConfiguration.invokeOperationAsync(id, "state", { state: state });
            $timeout(_ => $scope.matchConfiguration = result);
        }
        catch (e) {
            $rootScope.errorHandler(e);
        }
    }

    // Enable the specified configuration
    $scope.enable = async function () {
        if (confirm(SanteDB.locale.getString("ui.mpi.matches.config.enable.confirm", { id: $scope.matchConfiguration.id }))) {
            try {
                SanteDB.display.buttonWait(`#btnEnable`, true);
                await updateConfiguration($scope.matchConfiguration.id, true);
                toastr.success(SanteDB.locale.getString("ui.mpi.matches.config.enable.success", { id: $scope.matchConfiguration.id }));
            }
            catch (e) {
                toastr.error(SanteDB.locale.getString("ui.mpi.matches.config.enable.error", { id: $scope.matchConfiguration.id, e: e.message }));
            }
            finally {
                SanteDB.display.buttonWait(`#btnEnable`, false);
            }
        }
    }

    // Disable the specified configuration
    $scope.disable = async function () {
        if (confirm(SanteDB.locale.getString("ui.mpi.matches.config.disable.confirm", { id: $scope.matchConfiguration.id }))) {
            try {
                SanteDB.display.buttonWait(`#btnDisable`, true);
                await updateConfiguration($scope.matchConfiguration.id, false);
                toastr.success(SanteDB.locale.getString("ui.mpi.matches.config.disable.success", { id: $scope.matchConfiguration.id }));
            }
            catch (e) {
                toastr.error(SanteDB.locale.getString("ui.mpi.matches.config.disable.error", { id: $scope.matchConfiguration.id, e: e.message }));
            }
            finally {
                SanteDB.display.buttonWait(`#btnDisable`, false);
            }
        }
    }
}]).controller('MpiConfigurationEditController', ["$scope", "$rootScope", "$state", "$timeout", function ($scope, $rootScope, $state, $timeout) {


    $scope.transformAlgorithms = SanteDB.configuration._globalMatchTransforms ;
    
    var noRender = false, needsRender = false;

    $scope.$watch('panel.view', function(n,e) {
        if(n != e) {
            refreshDiagrams($scope.scopedObject);
        }
    });

    // Add a blocking instruction
    $scope.addBlock = function() {
        if(!$scope.scopedObject.blocking)
        {
            $scope.scopedObject.blocking = [];
        }

        $scope.scopedObject.blocking.push({
            maxResults : 10,
            op: 'AndAlso',
            filter: [
                {
                    _id: `flt${SanteDB.application.newGuid().replace('-','')}`,
                    expression: "",
                    when: []
                }
            ]
            
            
        });
        refreshDiagrams($scope.scopedObject);

    }

     // Add a blocking instruction
     $scope.addScore = function() {
        if(!$scope.scopedObject.scoring)
        {
            $scope.scopedObject.scoring = [];
        }

        var scoreId = `scr${SanteDB.application.newGuid().replace('-','')}`;

        $scope.scopedObject.scoring.push({
            _id: scoreId,
            assert : {
                transform: [],
                assert: [],
                op: "Equal"
            },
            when: [],
            property: [ 'id' ],
            whenNull: "None"
        });

        var i = $scope.scopedObject.scoring.length - 1;
        $timeout(o=> {
            $(`#scoreEdit${i}`).collapse('show');
            renderScoringSummary($scope.scopedObject, i);
        }, 500);


    }


    // Add a filter expression
    $scope.addFilter = function(block) {
        block.filter.push({   
            _id: `flt${SanteDB.application.newGuid().replace('-','')}`,
            expression: "", 
            when: [] });
        refreshDiagrams($scope.scopedObject);

    }

    // Add a tag
    $scope.addTag = function (tag) {
        $scope.scopedObject.meta = $scope.scopedObject.meta || {};
        $scope.scopedObject.meta.tags = $scope.scopedObject.meta.tags || [];
        var existing = $scope.scopedObject.meta.tags.find(o => o.key == tag.key);
        if (existing) {
            existing.value = tag.value;
        }
        else {
            $scope.scopedObject.meta.tags.push(angular.copy(tag));
        }

        tag.key = '';
        tag.value = '';
    }

    // Remove tag
    $scope.removeTag = function (tagKey) {
        $scope.scopedObject.meta = $scope.scopedObject.meta || {};
        $scope.scopedObject.meta.tags = $scope.scopedObject.meta.tags || [];
        var existing = $scope.scopedObject.meta.tags.findIndex(o => o.key == tagKey);
        if (existing > -1) {
            $scope.scopedObject.meta.tags.splice(existing, 1);
        }


    }

    // Save configuration
    $scope.save = async function (form) {
        if (!form.$valid) {
            return;
        }

        try {

            $scope.scopedObject.$type = 'MatchConfiguration';

            if (!$scope.scopedObject.uuid) {
                // Duplicate check
                try {
                    var existing = await SanteDB.resources.matchConfiguration.getAsync($scope.scopedObject.id);
                    if (confirm(SanteDB.locale.getString("ui.mpi.matches.config.save.overwrite", { id: existing.id, author: existing.meta.createdBy }))) {
                        $scope.scopedObject = await SanteDB.resources.matchConfiguration.updateAsync($scope.scopedObject.id, $scope.scopedObject, true);
                    }
                    else {
                        $timeout(_ => $scope.panel.view = 'Edit');
                        return;
                    }
                }
                catch (e) {
                    $scope.scopedObject = await SanteDB.resources.matchConfiguration.insertAsync($scope.scopedObject, true);
                }

                $state.transitionTo("santedb-admin.mpi.config.view", { id: $scope.scopedObject.id });
            }
            else {
                var result = await SanteDB.resources.matchConfiguration.updateAsync($scope.scopedObject.id, $scope.scopedObject, true);
                $timeout(_ => {
                    $scope.scopedObject.meta = result.meta;
                    refreshDiagrams($scope.scopedObject);
                });
            }
            toastr.success(SanteDB.locale.getString("ui.mpi.matches.config.save.success", { id: $scope.scopedObject.id }));

        }
        catch (e) {
            toastr.error(SanteDB.locale.getString("ui.mpi.matches.config.save.error", { id: $scope.scopedObject.id }));
            $rootScope.errorHandler(e);
        }
    }


    // Update a score's weight
    $scope.recalcScore = function(score) {

        score.matchWeight = Math.log2(score.m / score.u) / Math.log2(2.0);
        score.nonMatchWeight = Math.log2((1 - score.m) / (1- score.u)) / Math.log2(2.0);

        if($scope.scopedObject.scoring.length < 2) {
            $scope.scopedObject.minScore = $scope.scopedObject.scoring[0].nonMatchWeight;
            $scope.scopedObject.maxScore = $scope.scopedObject.scoring[0].matchWeight;
        }
        else {
            $scope.scopedObject.minScore = $scope.scopedObject.scoring.reduce((a, b) => (a.nonMatchWeight || a) + b.nonMatchWeight);
            $scope.scopedObject.maxScore = $scope.scopedObject.scoring.reduce((a, b) => (a.matchWeight || a) + b.matchWeight);
        }

        var index = $scope.scopedObject.scoring.findIndex((o) => o._id == score._id);

        if(!noRender) {
            noRender = true;
            renderScoringSummary($scope.scopedObject, index);
            $timeout(() => {
                noRender = false;
                if(needsRender) {
                    renderScoringSummary($scope.scopedObject, index);
                    needsRender = false;
                }
            }, 1000);
        }
        else {
            needsRender = true;
        }
    }

    // Update the transform
    $scope.updateTransform = function(score, txCollection, tx) {

        var txDef = SanteDB.configuration._globalMatchTransforms.find(o=>o.name == tx.name);
        tx._meta = txDef.arguments;

        if(tx.args.length != txDef.arguments.length) {
            tx.args = txDef.arguments.map(o => "");
        }

        // Is there any unary txfs?
        var index = $scope.scopedObject.scoring.findIndex((o) => o._id == score._id);

        if(!noRender) {
            noRender = true;
            renderScoringSummary($scope.scopedObject, index);
            $timeout(() => {
                noRender = false;
                if(needsRender) {
                    renderScoringSummary($scope.scopedObject, index);
                    needsRender = false;
                }
            }, 1000);
        }
        else {
            needsRender = true;
        }
        

        var retVal = false;
        txCollection.forEach((b)=> {
            var def = SanteDB.configuration._globalMatchTransforms.find(d=>d.name == b.name);
            retVal |= def.type == "Binary";
        });
        return retVal;
    }

    // Run the test
    $scope.runTest = async function(testForm) {
        if(!testForm.$valid) { return; }

        console.info($scope.scopedObject._test.input);
        try {
            SanteDB.display.buttonWait("#runTest", true);
            $("#runTest").html(`<i class='fas fa-circle-notch fa-spin'></i> ${SanteDB.locale.getString("ui.mpi.matches.config.test.runningMatch")}`);


            var test = await SanteDB.resources.matchConfiguration.invokeOperationAsync($scope.scopedObject.id, "test", {
                "input" : $scope.scopedObject._test.input,
                "targets": $scope.scopedObject._test.knownDuplicates.map(o=>o.id)
            }, true);

           
            $timeout(() => {
                var scores = test.results.map(o=>o.score);
                scores = scores.sort((a,b) => a - b);

                var stats = { count: scores.length, NonMatch: 0, Match: 0, Probable: 0,  min: scores[0], max: scores[scores.length - 1], avg: scores.reduce((a,b) => a+b) / scores.length, median: scores[Math.trunc(scores.length / 2)] };

                test.results.forEach((c) => {
                    if(!stats[c.classification]) stats[c.classification] = 0;
                    stats[c.classification]++;
                });
                $scope.scopedObject._test.stats = stats;
                $scope.scopedObject._test.results = [];

                $scope.scopedObject._test.analysis = [];

                // Recommendations
                if(stats.count > 20) {
                    $scope.scopedObject._test.analysis.push("wideBlocking");
                }
                if(stats.NonMatch / stats.count > 0.2 || stats.Probable / stats.count > 0.6) {
                    $scope.scopedObject._test.analysis.push("poorBlocking");
                }
                if(stats.count == 0) {
                    $scope.scopedObject._test.analysis.push("strictBlocking");
                }
                if(stats.avg < stats.median) {
                    $scope.scopedObject._test.analysis.push("poorScoring");
                }
            });

            
            $("#runTest").html(`<i class='fas fa-circle-notch fa-spin'></i> ${SanteDB.locale.getString("ui.mpi.matches.config.test.gatheringResults")}`);

            if($scope.dtInit) {
                $scope.dtInit.destroy();
                $scope.dtInit = null;
            }
            
            var resultCollection = [];
            var maxResults = test.results.length;
            if(maxResults > 100) {
                maxResults = 100; // only allow for fetching of 50 details
            }
            test.results = test.results.sort((a,b)=> b.strength - a.strength);

            for(var i = 0; i < maxResults; i+=10) {

                var resultSlice = test.results.slice(i, i + 10);
                var resultBatch = await SanteDB.resources.patient.findAsync({ "_id" : resultSlice.map(o=>o.record) });
                resultSlice.forEach((r) => {
                    var patientDetail = resultBatch.resource.find(o=>o.id == r.record);
                    patientDetail._match = r;
                    resultCollection.push(patientDetail);
                });
            }

            $timeout(() => {
                $scope.scopedObject._test.results = resultCollection.sort((a,b) => b.tag["$match.strength"] - a.tag["$match.strength"]);
                
                $timeout(() => 
                    $scope.dtInit = $("#resultTable").DataTable(), 500);
           });

            
            // Draw the diagram 
            await renderActualSummary($scope.scopedObject, test);

        }
        catch(e) {
            $rootScope.errorHandler(e);
        }
        finally {
            SanteDB.display.buttonWait("#runTest", false);

        }

    }

    
     // Show match detail
     $scope.matchDetail = async function (id) {
        try {
            $timeout(() => {
                delete($scope.scopedObject.candidateObject);
                $("#candidateDetailModal").modal('show');
            });
            
            var matchReport = await SanteDB.resources.patient.getAssociatedAsync(id, "mdm-candidate", $scope.scopedObject._test.input, { _configuration: $scope.scopedObject.id , _upstream: true });

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

}]);