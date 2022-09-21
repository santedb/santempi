/**
 * @method
 * @summary Renders a subgraph (for Mermaid) which represents the blocking instruction subgraph
 * @param {MatchConfiguration} configuration The configuration object to render actuals
 * @param {object} showActuals When not null, the method will query the HDSI and fetch actual results matching each blocking instruction
 * @param {number} instructionIndex The index of the blocking instruction from {link:@configuration} which should be rendered
 * @param {boolean} detailOutput When true, instructs the system to emit a detailed diagram
* @returns {string} The MermaidJS graph
 */
async function renderBlockingSubgraph(configuration, showActuals, detailOutput, instructionIndex) {
    var retVal = `subgraph Blocking["<i class='fas fa-database'></i> Blocking"]\ndirection ${detailOutput ? 'LR' : 'TB'}\n`;


    var actualBlockingCounts = null;
    if (showActuals && showActuals.diagnostics) {
        actualBlockingCounts = showActuals.diagnostics.stages.find(o => o.name == "blocking");
    }
    var totalDatabaseCount = 0;
    if (showActuals) {
        totalDatabaseCount = await SanteDB.resources[configuration.target[0].resource.toCamelCase()].findAsync({ _count: 0 });
    }

    for (var i in configuration.blocking) {

        // Don't show this instruction
        if (instructionIndex !== undefined && instructionIndex !== i) {
            continue;
        }

        var block = configuration.blocking[i];

        if (i == 0 || instructionIndex !== undefined) {
            retVal += `DB[("${configuration.target.map(o => o.resource).join('|')}")]==>`;
        }
        else {
            retVal += 'DB==>';
        }

        
        if (showActuals) {
            retVal += `|${totalDatabaseCount.totalResults} ${configuration.target[0].resource} records|`;
        }
        else {
            retVal += ' ';
        }


        var queryBlock = {};
        if (block.filter.length == 1) {

            if (detailOutput && block.filter[0].when && block.filter[0].when != "") {
                retVal += `B${i}W0{{"<i class='fas fa-question'></i> $input.${block.filter[0].when}"}}\nB${i}W0-->|"[null]"|BJOIN\nB${i}W0-->|"[not null]"| `;
            }
            retVal += `B${i}F0["<i class='fas fa-filter'></i> ${block.filter[0].expression.split('=')[0]}"]\n`;
            retVal += `B${i}F${block.filter.length - 1}-->`;
        }
        else {
            retVal += `Block${i}\nsubgraph Block${i}\ndirection TB\n`;
            // dose the block has a note?
            if (block.description) {
                var w = 0;
                var descriptionText = block.description.split(' ').reduce((a, b) => ++w % 6 == 0 ? `${a}\r\n${b}` : `${a} ${b}`);
                retVal += `NOTE${i}["<i class='fas fa-sticky-note'></i> ${descriptionText}"]\nstyle NOTE${i} fill:#ffa,stroke:#aaf\n`
            }
            for (var f = 0; f < block.filter.length; f++) {

                var filter = block.filter[f];

                if (detailOutput && block.filter[f].when && block.filter[f].when != "") {
                    retVal += `B${i}W${f}{{"<i class='fas fa-question'></i> $input.${block.filter[f].when}"}}\n`;
                    if (f < block.filter.length - 1) {
                        retVal += `B${i}W${f}-->|"[null]"|B${i}W${f + 1}\n`;
                    }
                    else {
                        retVal += `B${i}W${f}-->|"[null]"|B${i}RET(("results"))\n`;
                    }
                    retVal += `B${i}W${f}-->|"[not null]"| `;
                }

                retVal += `B${i}F${f}["<i class='fas fa-filter'></i> ${filter.expression.split('=')[0]}"]`;

                if (f == block.filter.length - 1) {
                    retVal += '\n';
                    if (detailOutput) {
                        retVal += `B${i}F${f}-->B${i}RET\n`;
                    }

                }

                if (f < block.filter.length - 1) {
                    retVal += '-->';

                    retVal += `|"intersect"| `;


                    if (f < block.filter.length - 2) {
                        if (detailOutput) // handle IF
                        {
                            retVal += `B${i}${block.filter[f + 1].when && block.filter[f + 1].when != "" ? 'W' : 'F'}${f + 1}\n`;
                        }
                        else {
                            retVal += `B${i}F${f + 1}\n`;
                        }
                    }
                }
                /*if (f == block.filter.length - 1) // last?
                    {
                        filter = block.filter[f];
                        retVal += `["<i class='fas fa-filter'></i> ${filter.expression.split('=')[0]}"]\n`;
                    }
                    else {
                        retVal += '\n';
                    }*/
            }
            retVal += `end\nBlock${i}-->`;

        }

        if (showActuals && actualBlockingCounts) {

            var blockingStage = actualBlockingCounts.actions.find(a => a.type == "blocking-instruction" && a.id.every(i => block.filter.find(f => f.expression == i)));
            if (blockingStage) {
                retVal += `|${blockingStage.data.length == 0 ? 0 : blockingStage.data[blockingStage.data.length - 1].value} records| `;
            }
            else {
                retVal += '|? records| ';
            }
        }
        else {
            retVal += `|${block.op == 'AndAlso' ? 'intersect' : 'union'}| `;
        }

        if (!block.useLowerLayer) {
            if (retVal.indexOf("MDM") == -1) {
                retVal += `MDM\r\nMDM[["<i class='fas fa-list'></i> MDM Gather"]]==>BJOIN`;
            } else {
                retVal += "MDM"
            }
        }
        else {
            retVal += 'BJOIN';
        }
        if (i == 0) {
            retVal += '(["<i class=\'fas fa-code-branch\'></i> Collect Blocked Records"])\n';
        }
        else {
            retVal += '\n';
        }

    }


    retVal += 'end\n';

    return retVal;
}

// Render opcode
function renderOpCode(opCode) {
    switch (opCode) {
        case "LessThan":
            return "<";
        case "LessThanOrEqual":
            return "<=";
        case "GreaterThan":
            return ">";
        case "GreaterThanOrEqual":
            return ">";
        case "NotEqual":
            return "!=";
        case "Equal":
            return "==";
        case "AndAlso":
            return "&&";
        case "OrElse":
            return "||";
    }
}
/**
 * @method
 * @summary Render a single assertion instruction block with transforms
 * @param {string} fromNode The node reference in the mermaid graph where the source of the instruction is
 * @param {string} prefix The prefix to affix to all mermaid graph identifiers
 * @param {Assertion} assertion The match assertion which should be rendered
* @returns {string} The MermaidJS graph
 */
async function renderAssertionBlock(fromNode, prefix, assertion) {

    var retVal = "";


    // Indicate transforms
    for (var t in assertion.transform) {
        var transform = assertion.transform[t];

        var nameString = `${transform.name}(${transform.args.join(',')})`;

        retVal += `${fromNode}-->${prefix}T${t}[["<i class='fas fa-code'></i> ${nameString}"]]\n`;
        fromNode = `${prefix}T${t}`;
    }

    if (assertion.assert.length == 0) {
        if (assertion.value) {
            retVal += `${fromNode}-->${prefix}OUT{{"<i class='fas fa-question'></i> ${renderOpCode(assertion.op)} ${assertion.value}"}}\n`;
        }
        else {
            retVal += `${fromNode}-->${prefix}OUT{{"<i class='fas fa-question'></i> ${renderOpCode(assertion.op)}"}}\n`;
        }
    }
    else {
        for (var a in assertion.assert) {
            var subAssertion = assertion.assert[a];
            retVal += await renderAssertionBlock(fromNode, `${prefix}A${a}`, subAssertion);
            retVal += `${prefix}A${a}OUT-->|"[true]"| ${prefix}OUT{{"<i class='fas fa-question'></i> ${renderOpCode(assertion.op)}"}}\n`;
        }

    }


    return retVal;

}

/**
 * @method
 * @summary Render the scoring instructions as a single subgraph
 * @param {MatchConfiguration} configuration The match configuration which should be rendered
 * @param {object} actuals When not-null, show the actual results (counts) on the output
 * @param {boolean} detailOutput When true, don't show the contents of the scoring instruction
 * @param {number} instructionIndex When provided, only render the specified instruction
 * @returns {string} The MermaidJS graph
 */
async function renderScoringSubgraph(configuration, actuals, detailOutput, instructionIndex) {
    var targetResource = configuration.target[0].resource.toCamelCase();
    var retVal = `subgraph Scoring["<i class='fas fa-star-half-alt'></i> Scoring"]\ndirection LR\n`;
    for (var s in configuration.scoring) {

        var score = configuration.scoring[s];

        // Don't show this instruction
        if (instructionIndex !== undefined && instructionIndex != s) {
            continue;
        }


        if (!detailOutput) {
            retVal += `Blocking==>`;

            if (actuals) {
                retVal += `|${actuals.results.length} records|`;
            }
            retVal += `Attribute${s}[["<i class='fas fa-star-half-alt'></i> ${score.property[0]}"]]\n`;
            retVal += `Attribute${s}`;

            if (actuals) {
                var mrecs = actuals.results.map(o => o.vectors).flat().filter(o => (o.name == score.id || o.name == score.property[0]) && o.evaluated && o.score > 0).length;
                retVal += `-->|${mrecs} records| `;
            }
            else {
                retVal += '-->';
            }
            retVal += 'SCORE(["<i class=\'fas fa-calculator\'> Sum"])\n';
        }
        else {
            retVal += `Blocking==>`;
            if (actuals) {
                retVal += `|${actuals.results.length} records| `;
            }
            retVal += `Attribute${s}\nsubgraph Attribute${s}["<i class='fas fa-star-half-alt'></i> ${score.id || `Attribute${s}`}"]\ndirection LR\n`;

            // dose the block has a note?
            if (score.description) {
                var w = 0;
                var descriptionText = score.description.split(' ').reduce((a, b) => ++w % 6 == 0 ? `${a}\r\n${b}` : `${a} ${b}`);
                retVal += `NOTE_S${s}["<i class='fas fa-sticky-note'></i> ${descriptionText}"]\nstyle NOTE_S${s} fill:#ffa,stroke:#aaf\n`
            }

            var rootNode = `PARM${s}`;

            if (score.when) {
                for (var w in score.when) {
                    var when = score.when[w];

                    var refIdx = configuration.scoring.findIndex(o => o.id == when.ref);

                    retVal += `PARM${s}W${w}{{"<button data-toggle='collapse' class='btn btn-link' data-target='#score${refIdx}'><i class='fas fa-star-half-alt'></i> ${when.ref}</button>"}}`;

                    if (w < score.when.length - 1) {
                        retVal += `-->|"[true]"| PARM${s}W${w + 1}\n`;
                    }
                    else {
                        retVal += `-->|"[true]"| ${rootNode}\n`;
                    }
                    retVal += `PARM${s}W${w}-->|"[false]"| `;

                    switch (score.whenNull) {
                        case 'Zero':
                        case 'Disqualify':
                        case 'Ignore':
                            retVal += `PARMWHENNULL${s}\n`;
                            break;
                        case 'NonMatch':
                            retVal += `S${s}NSCORE\n`;
                            break;
                        case 'Match':
                            retVal += `S${s}SCORE\n`;
                            break;
                        default:
                            retVal += `${rootNode}\n`;
                            break;
                    }
                }
            }

            // Null score
            switch (score.whenNull) {
                case 'Zero':
                    retVal += `${rootNode}[/"${score.property[0]}"/]-->|"[null]"| PARMWHENNULL${s}(["0.0"])\n`;
                    break;
                case 'Match':
                    retVal += `${rootNode}[/"${score.property[0]}"/]-->|"[null]"| S${s}SCORE\n`;
                    break;
                case 'NonMatch':
                    retVal += `${rootNode}[/"${score.property[0]}"/]-->|"[null]"| S${s}NSCORE\n`;
                    break;
                case 'Disqualify':
                    retVal += `${rootNode}[/"${score.property[0]}"/]-->|"[null]"| PARMWHENNULL${s}[["<i class='fas fa-exclamation'></i> disqualify()"]]\n`;
                    break;
                case 'Ignore':
                    retVal += `${rootNode}[/"${score.property[0]}"/]-->|"[null]"| PARMWHENNULL${s}(["null"])\n`;
                    break;
                default:
                    rootNode = `${rootNode}[/"${score.property[0]}"/]`;
                    break;
            }

            retVal += await renderAssertionBlock(rootNode, `S${s}`, score.assert, actuals);

            // Assign output 

            if (score.partialWeight) {
                retVal += `S${s}OUT-->|"[true]"| S${s}SCORE(["${score.matchWeight.toPrecision(2)} * ${score.partialWeight.name}(${score.partialWeight.args.join(",")})"])\n`;
            }
            else {
                retVal += `S${s}OUT-->|"[true]"| S${s}SCORE(["${score.matchWeight.toPrecision(2)}"])\n`;
            }
            retVal += `S${s}OUT-->|"[false]"| S${s}NSCORE([${score.nonMatchWeight.toPrecision(2)}])\n`;


            retVal += 'end\n';
            retVal += `style Attribute${s} fill:#fff,stroke:#000\n`;
        }
    }

    retVal += 'end\n';

    return retVal;
}

/**
 * @method
 * @summary Render the classification instructions from the configuration
 * @param {MatchConfiguration} configuration The matching configuration to emit the classification instructions from
 * @param {object} actuals When not-null, emit the counts from the actual variable (this is the result of the $test operation)
 * @returns {string} The MermaidJS graph
 */
async function renderClassificationSubgraph(configuration, actuals) {
    var targetResource = configuration.target[0].resource.toCamelCase();
    var retVal = `subgraph Classification["<i class='fas fa-shapes'></i> Classification"]\ndirection LR\n`;

    // for (var s in configuration.scoring) {
    //     var score = configuration.scoring[s];

    //     retVal += `score_${score.id ?? s}-->`;
    //     if (actuals) {
    //         retVal += '|? records|';
    //     }
    //     else {
    //         retVal += `|"${score.matchWeight.toPrecision(2)} / ${score.nonMatchWeight.toPrecision(2)}"|`;
    //     }
    //     retVal += `CLASS{"<i class='fas fa-brain'></i> Classify"}\n`//[["<i class='fas fa-calculator'></i> sum()"]]\n`;
    // }

    retVal += "Scoring==>CLASS{{\"<i class='fas fa-shapes'></i> Classify\"}}\n";
    // retVal += 'SUMCLS-->CLASS{Classify}\n';
    if (actuals) {
        var grps = {};
        var groupedResults = actuals.results.forEach(o => {
            if (!grps[o.classification]) grps[o.classification] = 0;
            grps[o.classification]++;
        })
        retVal += `CLASS-->|${grps.NonMatch || 0} records| NON["<i class='fas fa-times'></i> Non Match"]\n`;
        retVal += `CLASS-->|${grps.Probable || 0} records| PROB["<i class='fas fa-question'></i> Probable Match"]\n`;
        retVal += `CLASS-->|${grps.Match || 0} records| MATCH["<i class='fas fa-check'></i> Match"]\n`;

    }
    else {
        retVal += `CLASS-->|"[< ${configuration.nonmatchThreshold}]"| NON["<i class='fas fa-times'></i> Non Match"]\n`;
        retVal += `CLASS-->|"[< ${configuration.matchThreshold}]"| PROB["<i class='fas fa-question'></i> Probable Match"]\n`;
        retVal += `CLASS-->|"[> ${configuration.matchThreshold}]"| MATCH["<i class='fas fa-check'></i> Match"]\n`;
    }
    retVal += 'style NON fill:#f99,stroke:#900\n';
    retVal += 'style PROB fill:#ff9,stroke:#990\n';
    retVal += 'style MATCH fill:#9f9,stroke:#090\n';
    retVal += 'end\n';
    return retVal;
}



// Render blocking summary
function renderBlockingSummary(n) {
    return new Promise(function (fulfill, reject) {
        var graphData = `flowchart LR\n`;
        renderBlockingSubgraph(n, false, true).then(
            function (g) {
                graphData += g;
                graphData += 'Blocking-->Scoring[["<i class=\'fas fa-star-half-alt\'></i> Scoring"]]\n';
                graphData += 'style Scoring fill:#eff,stroke:#0ff\n';
                graphData += 'style Blocking fill:#efe,stroke:#0f0\n';
                mermaid.mermaidAPI.render('blockingConfigurationDiv', graphData, (svg) => {
                    $('#blockingConfigurationSvg').html(svg.replaceAll('flowchart-pointEnd', 'blocking-pointEnd'));
                    fulfill(true);
                });
            }
        )
    });
}

// Render overall summary
function renderOverallSummary(n) {
    return new Promise(function (fulfill, reject) {
        var graphData = `flowchart LR\n`;
        renderBlockingSubgraph(n, false, false).then(
            function (g1) {
                graphData += g1;
                renderScoringSubgraph(n, false, false).then(
                    function (g2) {
                        graphData += g2;
                        renderClassificationSubgraph(n).then(
                            function (g3) {
                                graphData += g3;
                                graphData += 'style Scoring fill:#eff,stroke:#0ff\n';
                                graphData += 'style Blocking fill:#efe,stroke:#0f0\n';
                                graphData += 'style Classification fill:#fef,stroke:#f0f\n';
                                mermaid.mermaidAPI.render('matchConfigurationDiv', graphData, (svg) => {
                                    $('#matchConfigurationSvg').html(svg.replaceAll('flowchart-pointEnd', 'summary-pointEnd'));
                                    fulfill(true);
                                });
                            }
                        )

                    }
                )
            }
        )
    });
}

// Render scoring summary
function renderScoringSummary(n, i) {
    return new Promise(function (fulfill, reject) {
        var graphData = `flowchart LR\n`;
        renderScoringSubgraph(n, false, true, i).then(
            function (g) {
                graphData += g;
                graphData += 'Blocking[["<i class=\'fas fa-database\'></i> Blocking"]]-->Scoring\nScoring-->Classification[["<i class=\'fas fa-shapes\'></i> Classification"]]\n';
                graphData += 'style Scoring fill:#eff,stroke:#0ff\n';
                graphData += 'style Blocking fill:#efe,stroke:#0f0\n';
                graphData += 'style Classification fill:#fef,stroke:#f0f\n';

                mermaid.mermaidAPI.render(`scoringConfigurationDiv${i}`, graphData, (svg) => {

                    $(`#scoringConfigurationSvg${i}`).html(svg.replaceAll('flowchart-pointEnd', `score${i}-pointEnd`));
                    fulfill(true);
                });
            }
        )
    });
}

// HACK: Use an interval to spread apart the mermaid JS stuff
async function refreshDiagrams(configuration) {
    await renderOverallSummary(configuration);
    await renderBlockingSummary(configuration);
    await renderScoringSummary(configuration);
    await Promise.all($(".scoreDiagramSvg").map((i, e) => {
        //var idx = $(e).attr('id').substr(4);
        renderScoringSummary(configuration, i);
    }));
}

// Render actual summary of the data
async function renderActualSummary(configuration, actuals) {

    var graphData = `flowchart LR\n`;
    graphData += await renderBlockingSubgraph(configuration, actuals, false);
    graphData += await renderScoringSubgraph(configuration, actuals, false);
    graphData += await renderClassificationSubgraph(configuration, actuals);
    graphData += 'style Scoring fill:#eff,stroke:#0ff\n';
    graphData += 'style Blocking fill:#efe,stroke:#0f0\n';
    graphData += 'style Classification fill:#fef,stroke:#f0f\n';
    mermaid.mermaidAPI.render('scoringRunAnalysis', graphData, (svg) => {
        $('#scoringRunAnalysisSvg').html(svg.replaceAll('flowchart-pointEnd', 'actual-pointEnd'));
    });

}

