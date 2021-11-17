/// <reference path="../../.ref/js/santedb.js"/>
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


    mermaid.mermaidAPI.initialize({
        "theme": "default",
        flowchartConfig: {
            width: '100%',
            htmlLabels: true,
            curve: 'linear'
        },
        securityLevel: 'loose'
    });


    // Watch for changes in scores to update the min and max scores
    $scope.$watch('matchConfiguration.scoring', function (n, o) {
        if ($scope.matchConfiguration) {
            if (n != o && n && n.length > 0) {
                $scope.matchConfiguration.minScore = n.reduce((a, b) => (a.nonMatchWeight || a) + b.nonMatchWeight);
                $scope.matchConfiguration.maxScore = n.reduce((a, b) => (a.matchWeight || a) + b.matchWeight);
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
                    expression: "",
                    when: []
                }
            ]
            
            
        });
        refreshDiagrams($scope.scopedObject);

    }

    // Add a filter expression
    $scope.addFilter = function(block) {
        block.filter.push({   expression: "", when: [] });
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



}]);