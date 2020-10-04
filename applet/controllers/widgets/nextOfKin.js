/// <reference path="../../.ref/js/santedb.js" />

angular.module('santedb').controller('MpiPatientNextOfKinController', ["$scope", "$rootScope", "$state", "$templateCache", "$interval", function ($scope, $rootScope, $state, $templateCache, $interval) {

    $scope.synchronizeAge = synchronizeAge;
    $scope.tabHasError = tabHasError;
    $scope.copyFields = copyFields;

    // Copy fields
    function copyFields(relationshipTarget) {
        if ($scope.scopedObject.relationship &&
            $scope.scopedObject.relationship[relationshipTarget] &&
            $scope.scopedObject.relationship[relationshipTarget].targetModel) {
            $scope.scopedObject.relationship[relationshipTarget].targetModel.address = angular.copy($scope.scopedObject.address);
        }
    }
    // Determine if tab has error
    function tabHasError(tabInputPrefix) {
        if (!$scope.panel.editForm) return false;

        return Object.keys($scope.panel.editForm.$error).findIndex(function (errorKey) {
            var errorArray = $scope.panel.editForm.$error[errorKey];
            return errorArray.findIndex(function (error) { return error.$name.indexOf(tabInputPrefix) == 0; }) != -1;
        }) != -1;
    }

    // Synchronize ages of object
    function synchronizeAge(modelObject, fromDate) {

        if (modelObject.dateOfBirth && fromDate)
            modelObject.age = moment().diff(modelObject.dateOfBirth, 'years', false);
        else {
            modelObject.dateOfBirth = moment().subtract({ years: modelObject.age }).toDate();
            modelObject.dateOfBirthPrecision = 1;
        }
    }


    // Update the specified objects
    $scope.update = async function (form) {
        if (!form.$valid) return;

        try {
            // Now we want to update our patient object
            var patient = $scope.scopedObject;
            var relationships = angular.copy($scope.relationships);

            if(!relationships)
                relationships = [];
                
            if ($scope.newRelationship._active)
                relationships.push(angular.copy($scope.newRelationship));
            var submissionBundle = new Bundle({ resource: [patient] });

            // Process relationships
            relationships.forEach(function (rel) {

                var existing = patient.relationship[rel.relationshipTypeModel.mnemonic];
                if (existing && !Array.isArray(existing))
                    existing = [existing];

                // Is the relationship active or scheduled for deletion?
                if (!rel._active) {
                    // Find this relationship and remove it
                    var others = existing.filter(o => o.id != rel.id);
                    if (others.length > 0) // more left
                        patient.relationship[rel.relationshipTypeModel.mnemonic] = others;
                    else  // none left, remove relationship
                        delete (patient.relationship[rel.relationshipTypeModel.mnemonic]);
                }
                else {
                    if (!existing) // new relationship type
                        existing = patient.relationship[rel.relationshipTypeModel.mnemonic] = [];

                    var instance = existing.filter(o => o.id == rel.id);
                    if (instance.length == 0) // none currently
                        existing.push(rel);
                    else {
                        var others = existing.filter(o => o.id != rel.id);
                        others.push(rel);
                        patient.relationship[rel.relationshipTypeModel.mnemonic] = others;
                    }

                    // Erase target model and replace with identifier
                    rel.target = rel.targetModel.id;
                    submissionBundle.resource.push(rel.targetModel);
                    rel.holder = patient.id;
                    delete (rel.targetModel);
                }
            });

            await Promise.all(submissionBundle.resource.map(o => correctEntityInformation(o))); // Correct entity information

            await SanteDB.resources.bundle.insertAsync(submissionBundle);

            var pscope = $scope;
            while (pscope.$parent.scopedObject)
                pscope = pscope.$parent;
            pscope.scopedObject = await SanteDB.resources.patient.getAsync($scope.scopedObject.id, "full"); // re-fetch the patient
            pscope.editObject = angular.copy(pscope.scopedObject);
            toastr.success(SanteDB.locale.getString("ui.model.patient.saveSuccess"));
            form.$valid = true;

            try {
                pscope.$apply();
            }
            catch (e) { }
        }
        catch (e) {
            $rootScope.errorHandler(e);
        }
    }

    // Scoped object
    $scope.$watch("scopedObject", async function (n, o) {

        if (n) {
            try {

                if (n.relationship) {
                    var rels = (await SanteDB.resources.concept.findAsync({ "conceptSet.mnemonic": "FamilyMember", "mnemonic": Object.keys(n.relationship) }));
                    if (rels.resource) {
                        $scope.familyMemberRelationships = rels.resource.map(o => o.mnemonic);

                        if (n.id) // existing patient => we are in edit mode
                            $scope.relationships = Object.keys(n.relationship).filter(o => $scope.familyMemberRelationships.indexOf(o) > -1).map(o => angular.copy(n.relationship[o])).flat();
                        else  // new patient => registration mode
                            $scope.relationships = Object.keys(n.relationship).filter(o => $scope.familyMemberRelationships.indexOf(o) > -1).map(o => n.relationship[o]).flat();

                        var promises = $scope.relationships.map(async function (rel) {

                            if (rel.id)
                                rel._active = true;
                            else
                                rel.id = SanteDB.application.newGuid();

                            if (rel.source && rel.source != n.id || rel.holder && !rel.holder == n.id) {
                                rel.sourceModel = await SanteDB.resources.entity.getAsync(rel.source || rel.holder, "full");
                                rel.inverse = true;
                            }
                            else if (!rel.targetModel && rel.target) {
                                rel.targetModel = await SanteDB.resources.entity.getAsync(rel.target, "full");
                                rel.targetModel.relationship = rel.targetModel.relationship || {};
                            }
                            if (!rel.relationshipTypeModel)
                                rel.relationshipTypeModel = await SanteDB.resources.concept.getAsync(rel.relationshipType);
                        });

                        await Promise.all(promises);
                    }
                }


                $scope.newRelationship = new EntityRelationship({ id: SanteDB.application.newGuid(), targetModel: new Person({ id: SanteDB.application.newGuid() }) });

                try {
                    $scope.$apply();
                }
                catch (e) { }
            }
            catch (e) {
                console.error(`Cannot load family members: ${e}`)
            }
        }
    });
}]);
