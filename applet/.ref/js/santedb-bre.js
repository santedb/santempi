/*
 * Copyright 2015-2018 Mohawk College of Applied Arts and Technology
 * 
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
 * User: justin
 * Date: 2018-7-23
 */
if(!SanteDBBre)
    var SanteDBBre =
        /**
         * @class 
         * @constructor
         * @summary Environment for executing SanteDB business rules in JavaScript
         * @description The BRE functions in this class are normally provided by the JINT JavaScript engine via C# classes. This wrapper is used by non 
         * JINT server environments to provide local execution support for business rules.
         */
        new function () {

        
            // Issue priority
            var IssuePriority = {
                /**
                 * @summary The issue raised is an error, processing cannot continue
                 */
                Error: 1,
                /**
                 * @summary The issue raised is a warning, processing can continue however subsequent errors may occur
                 */
                Warning: 2,
                /**
                 * @summary The issue raised can be ignored and is simply raised for information
                 */
                Information: 3
            };

            // Detected issue
            var DetectedIssue = function (text, priority) {
                /**
                 * @property {string}
                 * @memberof SanteDBBre.DetectedIssue
                 * @summary The textual information of the issue
                 */
                this.text = text;
                /**
                 * @property {SanteDBBre.IssuePriority}
                 * @memberof SanteDBBre.DetectedIssue
                 * @summary The priority / severity of the issue
                 */
                this.priority = priority;
            };

            /**
             * @property {SanteDBBre.ExecutionEnvironment}
             * @memberof SanteDBBre
             * @summary Indicates whether the business rules are running in the front-end or server side
             */
            this.Environment = __SanteDBAppService.ExecutionEnvironment;

            /**
             * @method
             * @private
             * @summary Evaluates the guard instance
             * @param {any} guard The guard which is being validated
             * @param {any} instance The instance of the guard
             * @returns {bool} True if the guard condition evaluated to true
             */
            function _guardEval(guard, instance) {
                var retVal = true;
                for(gk in guard)
                {
                    if (gk.indexOf(".") > -1 || gk.indexOf("[") > -1)
                        throw new Exception("BusinessRuleException", "error.businessRule", "Rule guards can only be simple property paths");

                    var subCond = false;
                    for(gv in guard[gk])
                        subCond |= instance[gk] === guard[gk][gv];
                    retVal &= subCond;
                }
                return retVal;
            }

            // Reference sets loaded
            var _refs = {};
            // Reference set urls
            var _refsBase = [];
            // Triggers loaded
            var _triggers = [];
            // Validators loaded
            var _validators = [];

            /**
             * @class
             * @constructor
             * @summary Represents an issue that has been detected from the BRE with data
             * @description Detected issues are typically caught by the business rules engine and returned as part of a 422 or other error process
             * @memberof SanteDBBre
             * @param {string} text The textual information for the detected issue
             * @param {SanteDBBre.IssuePriority} priority The priority of the issue raised
             */
            this.DetectedIssue = DetectedIssue;
            /**
             * @enum
             * @summary Represents issue priority
             * @memberof SanteDBBre
             */
            this.IssuePriority = IssuePriority;

            /**
             * @enum
             * @summary Represents execution environments
             * @memberof SanteDBBre
             */
            this.ExecutionEnvironment = ExecutionEnvironment;

            /**
             * @method
             * @memberof SanteDBBre
             * @summary Converts object to view model
             * @param {any} object The object to convert
             * @returns {any} The converted object
             * @wrapper
             */
            this.ToViewModel = function (object) { return object; };

            /**
             * @method
             * @memberof SanteDBBre
             * @summary Converts an object from view model
             * @param {any} object The object to convert
             * @returns {any} The converted object
             * @wrapper
             */
            this.FromViewModel = function (object) { return object; };

            /**
             * @method
             * @memberof SanteDBBre
             * @summary Adds a business rule to the business rule engine
             * @description This method will add a business rule to the engine. A business rule can be executed before, after insert, update, delete or query. The business rules
             * engine also allows for the passing of a guard condition which guards execution of the method only if the inbound object matches the provided guard. 
             * @param {string} type The type of object the trigger is being assigned to
             * @param {string} trigger The trigger for the object
             * @param {any} guard The guard condition for the trigger. Note that these can only be simple property evaluations of property=value
             * @param {function(any):void} callback The callback
             * @example
             * // Before an observation is inserted add a tag that sets reviewStatus if the obs is a weight and quantity observation
             * SanteDBBre.AddBusinessRule("QuantityObservation", "BeforeInsert", { "typeConcept" : "a261f8cd-69b0-49aa-91f4-e6d3e5c612ed" }, function(obs) {
             *      // Have we already tagged?
             *      obs.tag = obs.tag || {};
             *      if(!obs.tag["reviewStatus"])
             *          obs.tag["reviewStatus"] = "NeedsApproval";
             *      return obs;
             * });
             */
            this.AddBusinessRule = function (type, trigger, guard, callback) {
                _triggers.push({
                    type: type,
                    trigger: trigger,
                    guard: guard,
                    callback: callback
                });
            };

            /**
             * @method
             * @memberof SanteDBBre
             * @summary Adds a validator to the current execution context
             * @description This method will add a validator to the current execution context. A validator is run prior to persistence
             * and is even run in the user interface before submitting the object to do a sanity check on the object. 
             * @param {string} type The type of object being registered
             * @param {function} callback The callback function for validation, this function should return an array of DetectedIssue 
             * @see SanteDBBre.DetectedIssue
             * @example 
             * // Add validator to make sure a completed act doesn't occur in the future
             * SantEDBBre.AddValidator("Act", function(act) {
             *      var issues = [];
             *      if(act.statusCocnept == OpenIZModel.StatusKeys.Complete &&
             *          act.actTime > new Date())
             *          issues.push(new OpenIZBre.DetectedIssue("locale.error.actInTheFuture", OpenIZBre.IssuePriority.Error));
             *      return issues;
             *  });
             * });
             */
            this.AddValidator = function (type, callback) {
                _validators.push({
                    type: type,
                    callback: callback
                });
            };
            /** 
             * @method
             * @memberof SanteDBBre
             * @summary Simulates the rule being executed
             * @description This function can be used by callers to execute the specified trigger for the specified instance. The instance
             * is expected to be a valid class from OpenIZModel namespace
             * @see SanteDBModel
             * @param {string} trigger The trigger execute
             * @param {any} instance The instance to execute the trigger on
             * @returns {any} The object that has been modified after the rule executed
             * @example
             * // In my user interface I want to call beforeInsert to get the interpretation of the observation
             * if(myObservation) {
             *      var beforeInsert = SanteDBBre.ExecuteRule("BeforeInsert", myObservation);
             *      alert("Observation was interpreted as " + myObservation.interpretationConcept);
             * }
             */
            this.ExecuteRule = function (trigger, instance) {
                // Execute the rule
                var retVal = instance;
                for (var t in this._triggers)
                    if (_triggers[t].type === instance.$type && _triggers[t].trigger === trigger
                    && _guardEval(_triggers[t].guard, instance)) {
                        var triggerResult = this._triggers[t].callback(retVal);
                        retVal = triggerResult || retVal;
                    }
                return retVal;
            };

            /** 
             * @method
             * @memberof SanteDBBre
             * @summary Performs the validation function on the specified instance
             * @description Calling this method will invoke all registered validators on the specified instance and will return a 
             * collection of DetectedIssues.
             * @see SanteDBBre.DetectedIssue
             * @param {any} instance The instance to be validated.
             * @returns {SanteDBBre.DetectedIssue} The detected issues with the instances
             * @example
             * if(myObservation) {
             *      var issues = OpenIZBre.Validate(myObservation);
             *      alert("There are " + issues.length + " issues with this observation");
             * }
             */
            this.Validate = function (instance) {

                // Execute the rule
                var retVal = [];
                for (var t in this._validators)
                    if (_validators[t].type === instance.$type) {
                        var issues = _validators[t].callback(instance);
                        for (var i in issues)
                            retVal.push(issues[i]);
                    }
                return retVal;

            };
        }();
