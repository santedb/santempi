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
angular.module('santedb').controller('MatchConfigurationDiagramController', ["$scope", "$rootScope", "$timeout", function ($scope, $rootScope, $timeout) {


    mermaid.mermaidAPI.initialize({
        "theme": "default",
        flowchartConfig: {
            width: '100%',
            htmlLabels: true,
            curve: 'linear'
        },
        securityLevel: 'loose'
    });



    // Render blocking subgraph
    async function renderBlockingSubgraph(configuration, actuals) {
        var targetResource = configuration.target[0].resource.toCamelCase();
        var retVal = `subgraph Blocking\ndirection TB\n`;
        
        for (var i in configuration.blocking) {

            var block = configuration.blocking[i];

            if (i == 0) {
                retVal += 'DB[("<i class=\'fas fa-database\'"></i> main)]==>';
            }
            else {
                retVal += 'DB==>';
            }

            if (actuals) {
                // TODO: Call Filter 
                retVal += `|? records| `;
            }


            if (block.filter.length == 1) {
                retVal += `B${i}F0["<i class='fas fa-filter'></i> ${block.filter[0].expression.split('=')[0]}"]\n`;
                retVal += `B${i}F${block.filter.length - 1}-->`;

            }
            else {
                retVal += `Block${i}\nsubgraph Block${i}\ndirection TB\n`;
                for (var f = 0; f < block.filter.length - 1;) {
                    var filter = block.filter[f];
                    retVal += `B${i}F${f}["<i class='fas fa-filter'></i> ${filter.expression.split('=')[0]}"]-->`;

                    // Not the first so we are going to point to another record
                    if (actuals) {
                        retVal += `|? records| `;
                    }
                    else {
                        retVal += `|intersect| `;
                    }

                    retVal += `B${i}F${++f}`;
                    if (f == block.filter.length - 1) // last?
                    {
                        filter = block.filter[f];
                        retVal += `["<i class='fas fa-filter'></i> ${filter.expression.split('=')[0]}"]\n`
                    }
                    else {
                        retVal += '\n';
                    }
                }
                retVal += `end\nBlock${i}-->`;

            }

            if (actuals) {
                retVal += '|? records| ';
            }
            else {
                retVal += `|${block.op == 'AndAlso' ? 'intersect' : 'union'}| `;
            }

            retVal += 'BJOIN';
            if (i == 0) {
                retVal += '["<i class=\'fas fa-code-branch\'></i> Collect Blocked Records"]\n';
            }
            else {
                retVal += '\n';
            }

        }


        retVal += 'end\n';

        return retVal;
    }

    // Render an assertion block
    async function renderAssertionBlock(fromNode, prefix, assertion, actuals) {

        var retVal = "";

        // Op codes
        var opCode = "==";
        switch (assertion.op) {
            case "LessThan":
                opCode = "<";
                break;
            case "LessThanOrEqual":
                opCode = "<=";
                break;
            case "GreaterThan":
                opCode = ">";
                break;
            case "GreaterThanOrEqual":
                opCode = ">";
                break;
            case "NotEqual":
                opCode = "!=";
                break;
                case "AndAlso":
                opCode = "&&";
                break;
                case "OrElse":
                opCode = "||";
                break;
        }

        // Indicate transforms
        for(var t in assertion.transform) {
            var transform = assertion.transform[t];

            var nameString = `${transform.name}(${transform.args.join(',')})`;

            retVal += `${fromNode}-->${prefix}T${t}[["${nameString}"]]\n`;
            fromNode = `${prefix}T${t}`;
        }

        if (assertion.assert.length == 0) {
            if(assertion.value) {
                retVal += `${fromNode}-->${prefix}OUT{${opCode} ${assertion.value}}\n`;
            }
            else {
                retVal += `${fromNode}-->${prefix}OUT{${opCode}}\n`;
            }
        }
        else {
            for(var a in assertion.assert) {
                 var subAssertion = assertion.assert[a];
                 retVal += await renderAssertionBlock(fromNode, `${prefix}A${a}`, subAssertion);
                 retVal += `${prefix}A${a}OUT-->|true| ${prefix}OUT{${opCode}}\n`;
            }
          
        }

       
        return retVal;

    }

    // Render scoring 
    async function renderScoringSubgraph(configuration, actuals, simple) {
        var targetResource = configuration.target[0].resource.toCamelCase();
        var retVal = `subgraph Scoring\n`;
        for (var s in configuration.scoring) {

            var score = configuration.scoring[s];


            if(simple)  {
                retVal += `BJOIN==>`;

                if(actuals) {
                    retVal += '|? records|';
                }
                retVal += `score_${score.id ?? s}[["<i class='fas fa-star-half-alt'></i> ${score.property[0]}"]]\n`

            }
            else {
                retVal += `BJOIN==>`;
                if (actuals) {
                    retVal += `|? records| `;
                }
                retVal += `score_${score.id ?? s}\nsubgraph score_${score.id ?? s}\ndirection LR\n`;
                

                retVal += await renderAssertionBlock(`PARM${s}[/"${score.property[0]}"/]`, `S${s}`, score.assert, actuals);

                // Assign output 
                retVal += `S${s}OUT-->|true| S${s}SCORE[/score += ${score.matchWeight.toPrecision(2)}/]\n`
                retVal += `S${s}OUT-->|false| S${s}NSCORE[/score += ${score.nonMatchWeight.toPrecision(2)}/]\n`

                if(score.partialWeight) {
                    retVal += `S${s}SCORE-->S${s}END(["${score.partialWeight.name}(${score.partialWeight.args.join(",")})"])\n`;
                }
                else {
                    retVal += `S${s}SCORE-->S${s}END(["score"])\n`;
                }
                retVal += `S${s}NSCORE-->S${s}END\n`;
                
                retVal += 'end\n';
                retVal += `style score_${score.id ?? s} fill:#fff,stroke:#000\n`
            }
        }

        retVal += 'end\n';

        return retVal;
    }

    // Render classification
    function renderClassificationSubgraph(configuration, actuals) {
        var targetResource = configuration.target[0].resource.toCamelCase();
        var retVal = `subgraph Classification\n`;

        for (var s in configuration.scoring) {
            var score = configuration.scoring[s];

            retVal += `score_${score.id ?? s}-->`;
            if(actuals) {
                retVal += '|? records|';
            }
            else {
                retVal += `|"${score.matchWeight.toPrecision(2)} / ${score.nonMatchWeight.toPrecision(2)}"|`;
            }
            retVal += `CLASS{"<i class='fas fa-brain'></i> Classify"}\n`//[["<i class='fas fa-calculator'></i> sum()"]]\n`;
        }

       // retVal += 'SUMCLS-->CLASS{Classify}\n';
        if(actuals) {
            retVal += `CLASS-->|? records| NON["<i class='fas fa-times'></i> Non Match"]\n`;
            retVal += `CLASS-->|? records| PROB["<i class='fas fa-question'></i> Probable Match"]\n`;
            retVal += `CLASS-->|? records| MATCH["<i class='fas fa-check'></i> Match"]\n`;

        }
        else {
            retVal += `CLASS-->|"< ${configuration.nonmatchThreshold}"| NON["<i class='fas fa-times'></i> Non Match"]\n`;
            retVal += `CLASS-->|"< ${configuration.matchThreshold}"| PROB["<i class='fas fa-question'></i> Probable Match"]\n`;
            retVal += `CLASS-->|"> ${configuration.matchThreshold}"| MATCH["<i class='fas fa-check'></i> Match"]\n`;
        }
        retVal += 'style NON fill:#f99,stroke:#900\n';
        retVal += 'style PROB fill:#ff9,stroke:#990\n';
        retVal += 'style MATCH fill:#9f9,stroke:#090\n';
        retVal += 'end\n';
        return retVal;
    }

    // Render match configuration for the object
    $scope.renderMatchConfiguration = async function (configuration, targetName) {
        if (!configuration._matchConfigDrawn) {

            configuration._matchConfigDrawn = true;

            var graphData = `flowchart LR\n`;
            graphData += await renderBlockingSubgraph(configuration);
            graphData += await renderScoringSubgraph(configuration, false, true);
            graphData += await renderClassificationSubgraph(configuration);
            graphData += 'style Scoring fill:#eff,stroke:#0ff\n';
            graphData += 'style Blocking fill:#efe,stroke:#0f0\n';
            graphData += 'style Classification fill:#fef,stroke:#f0f\n';
            mermaid.mermaidAPI.render(`${targetName}Div`, graphData, (svg) => $(`#${targetName}Svg`).html(svg));

        }
    }
}]);