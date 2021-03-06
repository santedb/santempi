/// <reference path="../../.ref/js/santedb.js"/>
/// <reference path="../../.ref/js/santedb-model.js"/>
/// <reference path="../../lib/mermaid.min.js"/>

/*
 * Portions Copyright 2015-2019 Mohawk College of Applied Arts and Technology
 * Portions Copyright 2019-2019 SanteSuite Contributors (See NOTICE)
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you 
 * may not use this file except in compliance with the License. You may 
 * obtain a copy of the License at 
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the 
 * License for the specific language governing permissions and limitations under 
 * the License.
 * 
 * User: Justin Fyfe
 * Date: 2019-9-27
 */
angular.module('santedb').controller('EntityRelationshipDiagramController', ["$scope", "$rootScope", "$timeout", function ($scope, $rootScope, $timeout) {

    
    mermaid.mermaidAPI.initialize({
        "theme": "default",
        flowchart:{
            useMaxWidth:true,
            htmlLabels: true
        },
        securityLevel: 'loose'
      });

    var relationshipDrawn = false;
    var relationshipCount = 0;
    // Render a relationship
    async function renderRelationship(entity, entityRelationship, fallbackRelationship, reverse) {
        try {
            if(entityRelationship.source && entityRelationship.source != entity.id && entityRelationship.target == entity.id)
                reverse = true;
            var entity = entityRelationship.targetModel;

            if(reverse) {
                entity = await SanteDB.resources.entity.getAsync(entityRelationship.holder || entityRelationship.source);
            }
            else if(!entity || !entity.$ref && !entity.name)
                entity = entityRelationship.targetModel = await SanteDB.resources.patient.getAsync(entityRelationship.target);

            var retVal = "";
            if(entity) {

                // Is this a patient? Then provide a link
                var resolver = SanteDB.display.get
                if(entity.$type == "Patient") {
                    if(entity.name)
                        retVal += `\nrel${entity.id.substr(0,8)}["<a class='mr-2' href='#!/mpi/patient/${entity.id}'>${SanteDB.display.renderEntityName(entity.name)}</a>"]`;
                    else if(entity.identifier)
                        retVal += `\nrel${entity.id.substr(0,8)}["<a class='mr-2' href='#!/mpi/patient/${entity.id}'>${SanteDB.display.renderIdentifier(entity.identifier)}</a>"]`;
                }
                else {
                    if(entity.name)
                        retVal += `\nrel${entity.id.substr(0,8)}["<span class='mr-2'>${SanteDB.display.renderEntityName(entity.name)}</span>"]`;
                    else if(entity.identifier)
                        retVal += `\nrel${entity.id.substr(0,8)}[<span class='mr-2'>${entity.$type} ${SanteDB.display.renderIdentifier(entity.identifier)}</span>]`;
                }
                if(reverse)
                    retVal += `\nrel${entity.id.substr(0,8)}-- <span class='mr-2'>${SanteDB.display.renderConcept(entityRelationship.relationshipTypeModel || fallbackRelationship)}</span> -->root`;
                else if(!entity.$ref)
                    retVal += `\nroot-- <span class='mr-2'>${SanteDB.display.renderConcept(entityRelationship.relationshipTypeModel || fallbackRelationship)}</span> -->rel${entity.id.substr(0,8)}`;
            }
            
            if(reverse)
                retVal += `\nstyle rel${entity.id.substr(0,8)} fill:#ccf,stroke:#cc0,stroke-width:1px,stroke-dasharray: 5, 5`;
            return retVal;
        }
        catch(e) {
            console.error(e);
            return `\n??-- ${SanteDB.display.renderConcept(entityRelationship.relationshipTypeModel || fallbackRelationship)} ---root`;
        }
    }

    $scope.$watch("scopedObject", async function(n, o) {
        if(n && !relationshipDrawn) {
            try {
                var graphDefinition = `graph LR\nroot(("<span class='mr-2'>${SanteDB.display.renderEntityName(n.name)}</span>"))\nstyle root fill:#afa,stroke:#0c0,stroke-width:2px`;

                // Root is scoped object
                if(n.relationship) {
                    var promises = Object.keys(n.relationship).map(function(k) {
                        var retVal = [];
                        if(Array.isArray(n.relationship[k]))
                            retVal = n.relationship[k].map(function(r) {
                                return renderRelationship(n, r, k);
                            });
                        else 
                            retVal = renderRelationship(n, n.relationship[k], k) ;
                        return retVal;
                    }).flat();
                    var results = await Promise.all(promises);
                    results.forEach((r)=>graphDefinition += r);
                }

                // reverse relationships
                var reverseRelationships = await SanteDB.resources.entityRelationship.findAsync({ target: n.id, _viewModel: 'smpi.reverseRelationship' });
                if(reverseRelationships.resource)
                {
                    var promises = reverseRelationships.resource.map(function(r) {
                        return renderRelationship(n, r, 'UNK', true) ;
                    }).flat();
                    var results = await Promise.all(promises);
                    results.forEach((r)=>graphDefinition += r);
                }

                mermaid.mermaidAPI.render('entityNetworkDiagram', graphDefinition, (svg)=> $("#renderSvg").html(svg));
                relationshipDrawn = true;
            }
            catch (e) {
                $rootScope.errorHandler(e);
            }

        }
    });
}]);