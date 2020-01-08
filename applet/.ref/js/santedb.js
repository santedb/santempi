/// <reference path="./santedb-model.js"/>
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

// Interactive SHIM between host environment and browser
var __SanteDBAppService = window.SanteDBAppService || {};

// Backing of execution environment
var ExecutionEnvironment = {
    Unknown: 0,
    Server: 1,
    Mobile: 2,
    UserInterface: 3
};

if (!SanteDBWrapper)
    /**
     * @class
     * @constructor
     * @summary SanteDB Binding Class
     * @description This class exists as a simple interface which is implemented by host implementations of the SanteDB hostable core. This interface remains the same even though the 
     *              implementations of this file on each platform (Admin, BRE, Client, etc.) are different.
     */
    function SanteDBWrapper() {
        "use strict";

        var _viewModelJsonMime = "application/json+sdb-viewModel";

        /**
         * @summary Re-orders the JSON object properties so that $type appears as the first property
         * @param {any} object The object whose properites should be reordered
         * @returns {any} The appropriately ordered object
         */
        var _reorderProperties = function(object) {

            // Object has $type and $type is not the first property
            if(object.$type) {
                var retVal = { $type: object.$type };
                Object.keys(object).filter(function(d) { return d != "$type" })
                    .forEach(function(k) { 
                        retVal[k] = object[k]; 
                        if(!retVal[k]) ;
                        else if(retVal[k].$type) // reorder k
                            retVal[k] = _reorderProperties(retVal[k]);
                        else if(Array.isArray(retVal[k]))
                            for(var i in retVal[k])
                                if(retVal[k][i].$type)
                                    retVal[k][i] = _reorderProperties(retVal[k][i]);
                    })
                return retVal;
            }
            return object;
        };

        /**
         * @summary Global error handler
         * @param {xhr} e The Errored request
         * @param {*} data 
         * @param {*} setting 
         * @param {*} err 
         */
        var _globalErrorHandler = function (data, setting, err) {
            if (data.status == 401 && data.getResponseHeader("WWW-Authenticate")) {
                if (_session && _session.exp > Date.now // User has a session that is valid, but is still 401 hmm... elevation!!!
                    && _elevator
                    && !_elevator.getToken() ||
                    _session == null && _elevator) {

                    // Was the response a security policy exception where the back end is asking for elevation on the same user account?
                    if (data.responseJSON &&
                        data.responseJSON.type == "SecurityPolicyException" &&
                        data.responseJSON.message == "error.elevate")
                        _elevator.elevate(_session);
                    else
                        _elevator.elevate(null);
                    return true;
                }
            }
            else
                console.warn(new Exception("Exception", "error.general", err, null));
            return false;
        };

        /**
            * @class APIWrapper
            * @constructor
            * @memberof SanteDBWrapper
            * @summary SanteDB HDSI implementation that uses HTTP (note, other implementations may provide alternates)
            * @param {any} _config The configuration of the service
            * @param {string} _config.base The base URL for the service
            * @param {boolean} _config.idByQuery When true, indicates the wrapper wants to pass IDs by query
            */
        function APIWrapper(_config) {

            /**
                * @method
                * @summary Reconfigures this instance of the API wrapper
                * @memberof SanteDBWrapper.APIWrapper
                * @param {any} config The configuration of the service
                * @param {string} config.base The base URL for the service
                * @param {boolean} config.idByQuery When true, indicates the wrapper wants to pass IDs by query
                */
            this.configure = function (config) {
                _config = config;
            };

            /**
                * @method
                * @memberof SanteDBWrapper.APIWrapper
                * @summary Creates a new item on the instance
                * @param {any} configuration The configuration object
                * @param {string} configuration.resource The resource that is to be posted
                * @param {any} configuration.data The data that is to be posted
                * @param {any} configuration.state A piece of state data which is passed back to the caller for state tracking
                * @param {boolean} configuration.sync When true, executes the request in synchronous mode
                * @param {string} configuration.contentType Identifies the content type of the data
                * @returns {Promise} The promise for the operation
                */
            this.postAsync = function (configuration) {
                return new Promise(function (fulfill, reject) {
                    $.ajax({
                        method: 'POST',
                        url: _config.base + configuration.resource,
                        data: configuration.contentType.indexOf('application/json') == 0 ? JSON.stringify(_reorderProperties(configuration.data)) : configuration.data,
                        dataType: configuration.dataType || 'json',
                        contentType: configuration.contentType || 'application/json',
                        headers: configuration.headers,
                        async: !configuration.sync,
                        success: function (xhr, status, response) {
                            try {
                                if(xhr && response.getResponseHeader("etag"))
                                    xhr.etag = response.getResponseHeader("etag");
                                if (fulfill) fulfill(xhr, configuration.state);
                            }
                            catch (e) {
                                if (reject) reject(e.responseJSON || e, configuration.state);
                            }
                        },
                        error: function (e, data, setting) {
                            if (_globalErrorHandler(e, data, setting))
                                return;
                            var error = e.responseJSON;

                            if (reject) {
                                if (error && error.error !== undefined) // oauth2
                                    reject(new Exception(error.type, error.error, error.error_description, error.caused_by), configuration.state);
                                else if (error && (error.$type === "Exception" || error.$type))
                                    reject(new Exception(error.$type, error.message, error.detail, error.cause, error.stack, error.policy, error.rules, error.data), configuration.state);
                                else
                                    reject(new Exception("HttpException", "error.http." + e.status, e, null), configuration.state);
                            }
                            else
                                console.error("UNHANDLED PROMISE REJECT: " + JSON.stringify(e));
                        }
                    });
                });
            };

            /**
                * @method
                * @memberof SanteDBWrapper.APIWrapper
                * @summary Updates an existing item on the instance
                * @param {any} configuration The configuration object
                * @param {string} configuration.resource The resource that is to be posted
                * @param {any} configuration.data The data that is to be posted
                * @param {any} configuration.state A piece of state data which is passed back to the caller for state tracking
                * @param {boolean} configuration.sync When true, executes the request in synchronous mode
                * @param {string} configuration.id The identifier of the object on the interface to update
                * @param {string} configuration.contentType Identifies the content type of the data
                * @returns {Promise} The promise for the operation
                */
            this.putAsync = function (configuration) {
                return new Promise(function (fulfill, reject) {
                    $.ajax({
                        method: 'PUT',
                        url: _config.base + configuration.resource + (_config.idByQuery ? "?_id=" + configuration.id : "/" + configuration.id),
                        data: configuration.contentType.indexOf('application/json') == 0 ? JSON.stringify(_reorderProperties(configuration.data)) : configuration.data,
                        dataType: configuration.dataType ||'json',
                        contentType: configuration.contentType || 'application/json',
                        headers: configuration.headers,
                        async: !configuration.sync,
                        success: function (xhr, status, response) {
                            try {
                                if(xhr && response.getResponseHeader("etag"))
                                    xhr.etag = response.getResponseHeader("etag");
                                if (fulfill) fulfill(xhr, configuration.state);
                            }
                            catch (e) {
                                if (reject) reject(e.responseJSON || e, configuration.state);
                            }
                        },
                        error: function (e, data, setting) {
                            if (_globalErrorHandler(e, data, setting))
                                return;
                            var error = e.responseJSON;

                            if (reject) {
                                if (error && error.error !== undefined) // oauth2
                                    reject(new Exception(error.type, error.error, error.error_description, error.caused_by), configuration.state);
                                else if (error && (error.$type === "Exception" || error.$type))
                                    reject(new Exception(error.$type, error.message, error.detail, error.cause, error.stack, error.policy, error.rules), configuration.state);
                                else
                                    reject(new Exception("HttpException", "error.http." + e.status, e, null), configuration.state);
                            }
                            else
                                console.error("UNHANDLED PROMISE REJECT: " + JSON.stringify(e));
                        }
                    });
                });
            };


            /**
                * @method
                * @memberof SanteDBWrapper.APIWrapper
                * @summary Patches an existing item on the instance
                * @param {any} configuration The configuration object
                * @param {string} configuration.resource The resource that is to be posted
                * @param {any} configuration.data The data that is to be posted
                * @param {any} configuration.state A piece of state data which is passed back to the caller for state tracking
                * @param {boolean} configuration.sync When true, executes the request in synchronous mode
                * @param {string} configuration.id The identifier of the object on the interface to update
                * @param {string} configuration.contentType Identifies the content type of the data
                * @returns {Promise} The promise for the operation
                */
               this.patchAsync = function (configuration) {
                return new Promise(function (fulfill, reject) {
                    $.ajax({
                        method: 'PATCH',
                        url: _config.base + configuration.resource + (_config.idByQuery ? "?_id=" + configuration.id : "/" + configuration.id),
                        data: configuration.contentType.indexOf('application/json') == 0 ? JSON.stringify(_reorderProperties(configuration.data)) : configuration.data,
                        dataType: configuration.dataType ||'json',
                        contentType: configuration.contentType || 'application/json',
                        headers: configuration.headers,
                        async: !configuration.sync,
                        success: function (xhr, status, response) {
                            try {
                                if (fulfill) fulfill(xhr, configuration.state);
                            }
                            catch (e) {
                                if (reject) reject(e.responseJSON || e, configuration.state);
                            }
                        },
                        error: function (e, data, setting) {
                            if (_globalErrorHandler(e, data, setting))
                                return;
                            var error = e.responseJSON;

                            if (reject) {
                                if (error && error.error !== undefined) // oauth2
                                    reject(new Exception(error.type, error.error, error.error_description, error.caused_by), configuration.state);
                                else if (error && (error.$type === "Exception" || error.$type))
                                    reject(new Exception(error.$type, error.message, error.detail, error.cause, error.stack, error.policy, error.rules), configuration.state);
                                else
                                    reject(new Exception("HttpException", "error.http." + e.status, e, null), configuration.state);
                            }
                            else
                                console.error("UNHANDLED PROMISE REJECT: " + JSON.stringify(e));
                        }
                    });
                });
            };

            /**
                * @method
                * @memberof SanteDBWrapper.APIWrapper
                * @summary Performs a GET on an existing item on the instance
                * @param {any} configuration The configuration object
                * @param {string} configuration.resource The resource that is to be fetched
                * @param {any} configuration.state A piece of state data which is passed back to the caller for state tracking
                * @param {boolean} configuration.sync When true, executes the request in synchronous mode
                * @param {any} configuration.query The query to be applied to the get
                * @returns {Promise} The promise for the operation
                */
            this.getAsync = function (configuration) {
                return new Promise(function (fulfill, reject) {
                    $.ajax({
                        method: 'GET',
                        url: _config.base + configuration.resource,
                        data: configuration.query,
                        dataType: configuration.dataType ||'json',
                        headers: configuration.headers,
                        async: !configuration.sync,
                        success: function (xhr, status, response) {
                            try {
                                if(xhr && response.getResponseHeader("etag"))
                                    xhr.etag = response.getResponseHeader("etag");
                                if (fulfill) fulfill(xhr, configuration.state);
                            }
                            catch (e) {
                                if (reject) reject(e.responseJSON || e, configuration.state);
                            }
                        },
                        error: function (e, data, setting) {
                            if (_globalErrorHandler(e, data, setting))
                                return;
                            var error = {};
                            if(e.responseJSON)
                                error = e.responseJSON;
                            else if(e.responseText)
                                try { error = JSON.parse(e.responseText); }
                                catch {};
                                
                            if (reject) {
                                if (error && error.error !== undefined) // oauth2
                                    reject(new Exception(error.type, error.error, error.error_description, error.caused_by), configuration.state);
                                else if (error && (error.$type === "Exception" || error.$type))
                                    reject(new Exception(error.$type, error.message, error.detail, error.cause, error.stack, error.policy, error.rules), configuration.state);
                                else
                                    reject(new Exception("HttpException", "error.http." + e.status, e, null), configuration.state);
                            }
                            else
                                console.error("UNHANDLED PROMISE REJECT: " + JSON.stringify(e));
                        }
                    });
                });
            };

            /**
                * @method
                * @memberof SanteDBWrapper.APIWrapper
                * @summary Performs a DELETE on an existing item on the instance
                * @param {any} configuration The configuration object
                * @param {string} configuration.resource The resource that is to be deleted
                * @param {any} configuration.state A piece of state data which is passed back to the caller for state tracking
                * @param {boolean} configuration.sync When true, executes the request in synchronous mode
                * @param {any} configuration.id The object that is to be deleted on the server
                * @param {any} configuration.data The additional data that should be sent for the delete command
                * @param {string} configuration.mode The mode in which the delete should occur. Can be NULLIFY, CANCEL or OBSOLETE (default)
                * @param {string} configuration.contentType Identifies the content type of the data
                * @returns {Promise} The promise for the operation
                */
            this.deleteAsync = function (configuration) {
                return new Promise(function (fulfill, reject) {

                    var hdr = configuration.headers || {};
                    hdr["X-Delete-Mode"] = configuration.mode || "OBSOLETE";
                    $.ajax({
                        method: 'DELETE',
                        url: _config.base + configuration.resource + (configuration.id ? (_config.idByQuery ? "?_id=" + configuration.id : "/" + configuration.id) : ""),
                        data: configuration.contentType == 'application/json' ? JSON.stringify(_reorderProperties(configuration.data)) : configuration.data,
                        headers: hdr,
                        dataType: configuration.dataType ||'json',
                        async: !configuration.sync,
                        success: function (xhr, status, response) {
                            try {
                                if(xhr && response.getResponseHeader("etag"))
                                    xhr.etag = response.getResponseHeader("etag");
                                if (fulfill) fulfill(xhr, configuration.state);
                            }
                            catch (e) {
                                if (reject) reject(e.responseJSON || e, configuration.state);
                            }
                        },
                        error: function (e, data, setting) {
                            if (_globalErrorHandler(e, data, setting))
                                return;
                            var error = e.responseJSON;

                            if (reject) {
                                if (error && error.error !== undefined) // oauth2
                                    reject(new Exception(error.type, error.error, error.error_description, error.caused_by), configuration.state);
                                else if (error && (error.$type === "Exception" || error.$type))
                                    reject(new Exception(error.$type, error.message, error.detail, error.cause, error.stack, error.policy, error.rules), configuration.state);
                                else
                                    reject(new Exception("HttpException", "error.http." + e.status, e, null), configuration.state);
                            }
                            else
                                console.error("UNHANDLED PROMISE REJECT: " + JSON.stringify(e));
                        }
                    });
                });
            };

            /**
                * @method
                * @memberof SanteDBWrapper.APIWrapper
                * @summary Performs a LOCK on an existing item on the instance
                * @param {any} configuration The configuration object
                * @param {string} configuration.resource The resource that is to be locked
                * @param {any} configuration.state A piece of state data which is passed back to the caller for state tracking
                * @param {boolean} configuration.sync When true, executes the request in synchronous mode
                * @param {any} configuration.id The object that is to be locked on the server
                * @param {any} configuration.data The additional data that should be sent for the delete command
                * @param {string} configuration.contentType Identifies the content type of the data
                * @returns {Promise} The promise for the operation
                */
            this.lockAsync = function (configuration) {
                return new Promise(function (fulfill, reject) {
                    $.ajax({
                        method: 'LOCK',
                        url: _config.base + configuration.resource + (configuration.id ? (_config.idByQuery ? "?_id=" + configuration.id : "/" + configuration.id) : ""),
                        headers: configuration.headers,
                        async: !configuration.sync,
                        success: function (xhr, status, response) {
                            try {
                                if(xhr && response.getResponseHeader("etag"))
                                    xhr.etag = response.getResponseHeader("etag");
                                if (fulfill) fulfill(xhr, configuration.state);
                            }
                            catch (e) {
                                if (reject) reject(e.responseJSON || e, configuration.state);
                            }
                        },
                        error: function (e, data, setting) {
                            if (_globalErrorHandler(e, data, setting))
                                return;
                            var error = e.responseJSON;

                            if (reject) {
                                if (error && error.error !== undefined) // oauth2
                                    reject(new Exception(error.type, error.error, error.error_description, error.caused_by), configuration.state);
                                else if (error && (error.$type === "Exception" || error.$type))
                                    reject(new Exception(error.$type, error.message, error.detail, error.cause, error.stack, error.policy, error.rules), configuration.state);
                                else
                                    reject(new Exception("HttpException", "error.http." + e.status, e, null), configuration.state);
                            }
                            else
                                console.error("UNHANDLED PROMISE REJECT: " + JSON.stringify(e));
                        }
                    });
                });
            };

            /**
                * @method
                * @memberof SanteDBWrapper.APIWrapper
                * @summary Performs a UNLOCK on an existing item on the instance
                * @param {any} configuration The configuration object
                * @param {string} configuration.resource The resource that is to be locked
                * @param {any} configuration.state A piece of state data which is passed back to the caller for state tracking
                * @param {boolean} configuration.sync When true, executes the request in synchronous mode
                * @param {any} configuration.id The object that is to be locked on the server
                * @param {any} configuration.data The additional data that should be sent for the delete command
                * @param {string} configuration.contentType Identifies the content type of the data
                * @returns {Promise} The promise for the operation
                */
            this.unLockAsync = function (configuration) {
                return new Promise(function (fulfill, reject) {
                    $.ajax({
                        method: 'UNLOCK',
                        url: _config.base + configuration.resource + (configuration.id ? (_config.idByQuery ? "?_id=" + configuration.id : "/" + configuration.id) : ""),
                        headers: configuration.headers,
                        async: !configuration.sync,
                        success: function (xhr, status, response) {
                            try {
                                if(xhr)
                                    xhr.etag = response.getResponseHeader("etag");
                                if (fulfill) fulfill(xhr, configuration.state);
                            }
                            catch (e) {
                                if (reject) reject(e.responseJSON || e, configuration.state);
                            }
                        },
                        error: function (e, data, setting) {
                            if (_globalErrorHandler(e, data, setting))
                                return;
                            var error = e.responseJSON;

                            if (reject) {
                                if (error && error.error !== undefined) // oauth2
                                    reject(new Exception(error.type, error.error, error.error_description, error.caused_by), configuration.state);
                                else if (error && (error.$type === "Exception" || error.$type))
                                    reject(new Exception(error.$type, error.message, error.detail, error.cause, error.stack, error.policy, error.rules), configuration.state);
                                else
                                    reject(new Exception("HttpException", "error.http." + e.status, e, null), configuration.state);
                            }
                            else
                                console.error("UNHANDLED PROMISE REJECT: " + JSON.stringify(e));
                        }
                    });
                });
            };
        };

        /**
            * @class ResourceWrapper
            * @memberof SanteDBWrapper
            * @constructor
            * @summary Represents a wrapper for a SanteDB resource
            * @param {any} _config The configuration object
            * @param {string} _config.resource The resource that is being wrapped
            * @param {APIWrapper} _config.api The API to use for this resource
            */
        function ResourceWrapper(_config) {

            /**
                * @method
                * @memberof SanteDBWrapper.ResourceWrapper
                * @summary Retrieves a specific instance of the resource this wrapper wraps
                * @param {string} id The unique identifier of the resource to retrieve
                * @param {any} state A unique state object which is passed back to the caller
                * @returns {Promise} The promise for the operation
                */
            this.getAsync = function (id, viewModel, state) {

                // Prepare query
                var url = null;
                if (id) {
                    if (id.id)
                        url = `${_config.resource}/${id.id}`;
                    else
                        url = `${_config.resource}/${id}`;

                    if(id.version)
                        url += `/history/${id.version}`;
                }
                else
                    url = _config.resource;

                var headers = {
                    Accept: _config.accept
                };
                if (_config.viewModel)
                    headers["X-SanteDB-ViewModel"] = _config.viewModel;
                else if (id && id.viewModel)
                    headers["X-SanteDB-ViewModel"] = id.viewModel;

                return _config.api.getAsync({
                    headers: headers,
                    state: state,
                    resource: url
                });
            };

            /**
                * @method
                * @memberof SanteDBWrapper.ResourceWrapper
                * @summary Queries for instances of the resource this wrapper wraps
                * @param {any} query The HDSI query to filter on
                * @param {any} state A unique state object which is passed back to the caller
                * @returns {Promise} The promise for the operation
                */
            this.findAsync = function (query, state) {

                var headers = {
                    Accept: _config.accept
                };
                if (_config.viewModel)
                    headers["X-SanteDB-ViewModel"] = _config.viewModel;

                return _config.api.getAsync({
                    headers: headers,
                    query: query,
                    state: state,
                    resource: _config.resource
                });
            };

            /**
             * @method
             * @memberof SanteDBWrapper.ResourceWrapper
             * @param {any} query The query for the object that you are looking for
             * @summary Queries for instances of the resource this wrapper wraps in a synchronous fashion
             * @see {SanteDBWrapper.findAsync} For asynchronous method
             * @return {Promise} A promise which is blocked and not executed until the operation is complete
             */
            this.find = function (query) {

                var headers = {
                    Accept: _config.accept
                };
                if (_config.viewModel)
                    headers["X-SanteDB-ViewModel"] = _config.viewModel;

                return _config.api.getAsync({
                    headers: headers,
                    sync: true,
                    resource: _config.resource,
                    query: query
                });
            }

            /**
                * @method
                * @memberof SanteDBWrapper.ResourceWrapper
                * @summary Inserts a specific instance of the wrapped resource
                * @param {any} data The data / resource which is to be created
                * @param {any} state A unique state object which is passed back to the caller
                * @returns {Promise} The promise for the operation
                */
            this.insertAsync = function (data, state) {

                if (data.$type !== _config.resource && data.$type !== `${_config.resource}Info`)
                    throw new Exception("ArgumentException", "error.invalidType", `Invalid type, resource wrapper expects ${_config.resource} however ${data.$type} specified`);

                var headers = {
                    Accept: _config.accept
                };
                if (_config.viewModel)
                    headers["X-SanteDB-ViewModel"] = _config.viewModel;

                var resource = _config.resource;
                // Does the resource have an ID? If so then do CreateOrUpdate
                if(data.id)
                    resource += "/" + data.id;
                    
                if(data.createdBy)
                    delete(data.createdBy);
                if(data.creationTime)
                    delete(data.creationTime);

                // Perform post
                return _config.api.postAsync({
                    headers: headers,
                    data: data,
                    state: state,
                    contentType: _config.accept,
                    resource: resource
                });
            };

            /**
             * @method
             * @memberof SantedBWrapper.ResourceWrapper
             * @summary Sends a patch to the service
             * @param {string} id The identifier of the object to patch
             * @param {string} etag The e-tag to assert
             * @param {Patch} patch The patch to be applied
             * @param {any} state A unique state object which is passed back to the caller
             * @returns {Promise} The promise for the operation
             */
            this.patchAsync = function (id, etag, patch, state) {
                if (patch.$type !== "Patch")
                    throw new Exception("ArgumentException", "error.invalidType", `Invalid type, resource wrapper expects ${_config.resource} however ${data.$type} specified`);

                var headers  = {};
                if(etag)
                    headers['If-Match'] = etag;

                // Send PUT
                return _config.api.patchAsync({
                    headers: headers,
                    data: patch,
                    id: id,
                    state: state,
                    contentType: "application/json+sdb-patch",
                    resource: _config.resource
                });
            }

            /**
                * @method
                * @memberof SanteDBWrapper.ResourceWrapper
                * @summary Updates the identified instance of the wrapped resource
                * @param {string} id The unique identifier for the object to be updated
                * @param {any} data The data / resource which is to be updated
                * @param {any} state A unique state object which is passed back to the caller
                * @returns {Promise} The promise for the operation
                */
            this.updateAsync = function (id, data, state) {

                if (data.$type !== _config.resource && data.$type !== `${_config.resource}Info`)
                    throw new Exception("ArgumentException", "error.invalidType", `Invalid type, resource wrapper expects ${_config.resource} however ${data.$type} specified`);
                else if (data.id && data.id !== id)
                    throw new Exception("ArgumentException", "error.invalidValue", `Identifier mismatch, PUT identifier  ${id} doesn't match ${data.id}`);

                if(data.updatedBy)
                    delete(data.updatedBy);
                if(data.updatedTime)
                    delete(data.updatedTime);

                var headers = {
                    Accept: _config.accept
                };
                if (_config.viewModel)
                    headers["X-SanteDB-ViewModel"] = _config.viewModel;

                // Send PUT
                return _config.api.putAsync({
                    headers: headers,
                    data: data,
                    id: id,
                    state: state,
                    contentType: _config.accept,
                    resource: _config.resource
                });
            };

            /**
            * @method
            * @memberof SanteDBWrapper.ResourceWrapper
            * @summary Performs an obsolete (delete) operation on the server
            * @param {string} id The unique identifier for the object to be deleted
            * @param {any} state A unique state object which is passed back to the caller
            * @returns {Promise} The promise for the operation
            */
            this.deleteAsync = function (id, state) {

                var headers = {
                    Accept: _config.accept
                };
                if (_config.viewModel)
                    headers["X-SanteDB-ViewModel"] = _config.viewModel;

                return _config.api.deleteAsync({
                    headers: headers,
                    id: id,
                    state: state,
                    contentType: _config.accept,
                    resource: _config.resource
                });
            };

            /**
            * @method
            * @memberof SanteDBWrapper.ResourceWrapper
            * @summary Performs the specified LOCK operation on the server
            * @param {string} id The unique identifier for the object on which the invokation is to be called
            * @param {any} state A unique state object which is passed back to the caller
            * @returns {Promise} The promise for the operation
            */
            this.lockAsync = function (id, state) {

                var headers = {
                    Accept: _config.accept
                };
                if (_config.viewModel)
                    headers["X-SanteDB-ViewModel"] = _config.viewModel;

                return _config.api.lockAsync({
                    headers: headers,
                    id: id,
                    state: state,
                    resource: _config.resource
                });
            };

            /**
            * @method
            * @memberof SanteDBWrapper.ResourceWrapper
            * @summary Performs the specified UNLOCK operation on the server
            * @param {string} id The unique identifier for the object on which the invokation is to be called
            * @param {any} state A unique state object which is passed back to the caller
            * @returns {Promise} The promise for the operation
            */
            this.unLockAsync = function (id, state) {

                var headers = {
                    Accept: _config.accept
                };
                if (_config.viewModel)
                    headers["X-SanteDB-ViewModel"] = _config.viewModel;

                return _config.api.unLockAsync({
                    headers: headers,
                    id: id,
                    state: state,
                    resource: _config.resource
                });
            };

            /**
                * @method
                * @memberof SanteDBWrapper.ResourceWrapper
                * @summary Performs a nullify on the specified object
                * @description A nullify differs from a delete in that a nullify marks an object as "never existed"
                * @param {string} id The unique identifier for the object to be nullified
                * @param {any} state A unique state object which is passed back to the caller
                * @returns {Promise} The promise for the operation
                */
            this.nullifyAsync = function (id, state) {

                var headers = {
                    Accept: _config.accept
                };
                if (_config.viewModel)
                    headers["X-SanteDB-ViewModel"] = _config.viewModel;

                return _config.api.deleteAsync({
                    headers: headers,
                    id: id,
                    mode: "NULLIFY",
                    state: state,
                    resource: _config.resource
                });
            };

            /**
                * @method
                * @memberof SanteDBWrapper.ResourceWrapper
                * @summary Performs a cancel on the specified object
                * @description A cancel differs from a delete in that a cancel triggers a state change from NORMAL>CANCELLED
                * @param {string} id The unique identifier for the object to be cancelled
                * @param {any} state A unique state object which is passed back to the caller
                * @returns {Promise} The promise for the operation
                */
            this.cancelAsync = function (id, state) {
                var headers = {
                    Accept: _config.accept
                };
                if (_config.viewModel)
                    headers["X-SanteDB-ViewModel"] = _config.viewModel;

                return _config.api.deleteAsync({
                    headers: headers,
                    id: id,
                    mode: "CANCEL",
                    state: state,
                    resource: _config.resource
                });
            };

            /**
             * @method
             * @memberof SanteDBWrapper.ResourceWrapper
             * @summary Performs a find operation on an association
             * @description Some resources allow you to chain queries which automatically scopes the results to the container
             * @param {string} id The identifier of the object whose children you want query 
             * @param {string} property The property path you would like to filter on 
             * @param {any} query The query you want to execute
             * @returns {Promise} A promise for when the request completes
             */
            this.findAssociatedAsync = function(id, property, query, state) {

                if(!id)
                    throw new Exception("ArgumentNullException", "Missing scoping identifier");
                else if(!property)
                    throw new Exception("ArgumentNullException", "Missing scoping property");

                var headers = {
                    Accept: _config.accept
                };
                if(_config.viewModel)
                    headers["X-SanteDB-ViewModel"] = _config.viewModel;
                
                // Prepare query
                var url = null;
                if (id.id)
                    url = `${_config.resource}/${id.id}/${property}`;
                else
                    url = `${_config.resource}/${id}/${property}`;

                return _config.api.getAsync({
                    headers: headers,
                    query: query,
                    state: state,
                    resource: url
                });
            };

            /**
             * @method
             * @memberof SanteDBWrapper.ResourceWrapper
             * @summary Adds a new association to the specified parent object
             * @param {string} id The identifier of the container
             * @param {string} property The associative property you want to add the value to
             * @param {any} data The data to be added as an associative object (note: Most resources require that this object already exist)
             * @param {any} state A stateful object for callback correlation
             * @returns {Promise} A promise which is fulfilled when the request is complete
             */
            this.addAssociatedAsync = function(id, property, data, state) {

                if(!id)
                    throw new Exception("ArgumentNullException", "Missing scoping identifier");
                else if(!property)
                    throw new Exception("ArgumentNullException", "Missing scoping property");

                var headers = {
                    Accept: _config.accept
                };
                if (_config.viewModel)
                    headers["X-SanteDB-ViewModel"] = _config.viewModel;

                // Prepare path
                var url = null;
                if (id.id)
                    url = `${_config.resource}/${id.id}/${property}`;
                else
                    url = `${_config.resource}/${id}/${property}`;

                return _config.api.postAsync({
                    headers: headers,
                    data: data,
                    state: state,
                    resource: url,
                    contentType: _config.accept
                });
            };

            /**
             * @method 
             * @memberof SanteDBWrapper.ResourceWrapper
             * @summary Removes an existing associated object from the specified scoper
             * @param {string} id The identifier of the container object
             * @param {string} property The property path from which the object is to be removed
             * @param {string} associatedId The identifier of the sub-object to be removed
             * @param {any} state A state for correlating multiple requests
             * @returns {Promise} A promise which is fulfilled when the request comletes
             */
            this.removeAssociatedAsync = function(id, property, associatedId, state) {
                if(!id)
                throw new Exception("ArgumentNullException", "Missing scoping identifier");
            else if(!property)
                throw new Exception("ArgumentNullException", "Missing scoping property");
            else if (!associatedId)
                throw new Exception("ArgumentNullException", "Missing associated object id");

            var headers = {
                Accept: _config.accept
            };
            if (_config.viewModel)
                headers["X-SanteDB-ViewModel"] = _config.viewModel;

            // Prepare path
            var url = null;
            if (id.id)
                url = `${_config.resource}/${id.id}/${property}`;
            else
                url = `${_config.resource}/${id}/${property}`;

            return _config.api.deleteAsync({
                headers: headers,
                id: associatedId,
                state: state,
                resource: url,
                contentType: _config.accept
            });   
            }
        };

        // Public exposeing
        this.APIWrapper = APIWrapper;
        this.ResourceWrapper = ResourceWrapper;

        // hdsi internal
        var _hdsi = new APIWrapper({
            idByQuery: false,
            base: "/hdsi/"
        });
        // ami internal
        var _ami = new APIWrapper({
            idByQuery: false,
            base: "/ami/"
        });
        // auth internal
        var _auth = new APIWrapper({
            idByQuery: false,
            base: "/auth/"
        });
        // Backing data for app API
        var _app = new APIWrapper({
            base: "/app/",
            idByQuery: false
        });

        // App controller internal
        var _application = {
            /**
             * @summary Calculates the strength of the supplied password
             * @param {*} password The password
             * @returns {number} The strength of the password between 0 and 5
             */
            calculatePasswordStrength: function(password) {
                var strength = 0;
                if (password.length >= 6) {
                    strength++;
                    if(password.length > 10)
                        strength++;
                    if (/(?=.*[a-z])(?=.*[A-Z])/.test(password))
                        strength++;
                    if (/(?:[^A-Za-z0-9]{1,})/.test(password))
                        strength++;
                    if (/(?:[0-9]{1,})/.test(password))
                        strength++;
                }
                return strength;
            },
            /**
             * Get the specified widgets
             * @param context The context to fetch widgets for
             */
            getWidgetsAsync: function (context, type) {
                return new Promise(function (fulfill, reject) {
                    _app.getAsync({
                        resource: "Widgets",
                        query: {
                            context: context,
                            type: type
                        }
                    }).then(function (widgets) {
                        widgets.forEach(function (w) {
                            w.htmlId = w.name.replace(/\./g, "_");
                        });
                        fulfill(widgets);
                    }).catch(function (e) { reject(e); });
                });
            },
            /**
             * @summary Gets solutions that can be installed on this appliccation
             * @method
             * @memberof SnateDBWrapper.app
             */
            getAppSolutionsAsync: function () {
                return _ami.getAsync({
                    resource: "AppletSolution",
                    query: "_upstream=true"
                });
            },
            /**
             * @summary Closes the application or restarts it in the case of the mobile
             * @method
             * @memberof SanteDBWrapper.app
             */
            close: function () {
                __SanteDBAppService.Close();
            },
            /**
             * @summary Instructs the back end service to perform a system upgrade
             * @param {string} appId The id of the applet which should be updated
             * @returns {Promise} A promise representing the fulfillment or rejection of update
             * @method
             * @memberof SanteDBWrapper.app
             */
            doUpdateAsync: function (appId) {
                return _app.postAsync({
                    resource: "/Update"
                });
            },
            /**
             * @summary Instructs the back end service to perform a compact
             * @param {boolean} takeBackup When true, instructs the back end to take a backup of data
             * @returns {Promise} A promise representing the fulfillment or rejection of update
             * @method
             * @memberof SanteDBWrapper.app
             */
            compactAsync: function (takeBackup) {
                return _app.post({
                    resource: "Data",
                    data: { backup: takeBackup },
                    contentType: 'application/x-www-form-urlencoded'
                });
            },
            /**
             * @summary Instructs the back end service to perform a purge of all data
             * @param {boolean} takeBackup True if the back-end should take a backup before purge
             * @returns {Promise} The promise representing the fulfillment or rejection
             * @method
             * @memberof SanteDBWrapper.app
             */
            purgeAsync: function (takeBackup) {
                return _app.deleteAsync({
                    resource: "Data",
                    data: { backup: takeBackup },
                    contentType: 'application/x-www-form-urlencoded'
                });
            },
            /**
             * @summary Instructs the backend to restore the data from a backup
             * @returns {Promise} The promise representing the fulfillment or rejection
             * @method
             * @memberof SanteDBWrapper.app
             */
            restoreAsync: function () {
                return _app.postAsync({
                    resource: "Data/Restore"
                });
            },
            /**
             * @summary Create a backup of current assets
             * @returns {Promise}
             * @param {boolean} makePublic Make the backup public 
             * @method
             * @memberof SanteDBWrapper.app
             */
            createBackupAsync: function (makePublic) {
                return _app.postAsync({
                    resource: "Data/Backup",
                    data: { makePublic: makePublic },
                    contentType: 'application/x-www-form-urlencoded'
                });
            },
            /**
             * @summary Get all backups and backup information
             * @method
             * @memberof SanteDBWrapper.app
             * @returns {Promise} The promise representing the fulfillment or rejection
             */
            getBackupAsync: function () {
                return _app.getAsync({
                    resource: "Data/Backup",
                });
            },
            /**
             * @summary Load a data asset from an applet's Data/ directory
             * @method
             * @memberof SanteDBWrapper.app
             * @param {string} dataId The identifier of the data asset to load
             * @returns {string} The data asset
             */
            loadDataAsset: function (dataId) {
                return atob(__SanteDBAppService.GetDataAsset(dataId));
            },
            /**
             * @summary Submits a user entered bug report 
             * @method
             * @memberof SanteDBWrapper.app
             * @param {any} bugReport The structured bug report to be submitted
             * @returns {Promise} The promise to fulfill or reject the request
             */
            submitBugReportAsync: function (bugReport) {
                return _ami.postAsync({
                    resource: "Sherlock",
                    data: bugReport
                });
            },
            /**
             * @summary Gets a list of all logs and their information from the server
             * @method
             * @memberof SanteDBWrapper.app
             * @param {string} _id The id of the log file to fetch contents of
             * @param {any} query The query filters to use / apply
             * @returns {Promise} The promise representing the async request
             */
            getLogInfoAsync: function (_id, query) {
                var resource = "Log";
                if (_id)
                    resource += "/" + _id;

                return _ami.getAsync({
                    resource: resource,
                    query: query
                });
            },
            /**
             * @summary Generates a new random password
             * @method
             * @memberof SanteDBWrapper.app
             * @returns {string} A new random password
             */
            generatePassword: function() {
                var specChars = [ '@','_','-','~','!','#','$'];
                var secret = SanteDB.application.newGuid().replace(/-/g, function() {
                    return specChars[Math.trunc(Math.random() * specChars.length)];
                });
        
                var repl = "";
                for(var i = 0; i < secret.length; i++)
                    if(secret[i] >= 'a' && secret[i] <= 'f')
                        repl += String.fromCharCode(97 + Math.trunc(Math.random() * 24));
                    else if(i % 2 == 1)
                        repl += String.fromCharCode(65 + Math.trunc(Math.random() * 24));
                    else
                        repl += secret[i];
                
                return repl;
            },
            /**
             * @summary Create a new UUID
             * @method
             * @memberof SanteDBWrapper.app
             * @returns {string} A new unique UUID
             */
            newGuid: function () {
                return __SanteDBAppService.NewGuid();
            },
            /**
             * @summary Get application version information 
             * @method
             * @memberof SanteDBWrapper.app
             * @returns {Promise} The promise from the async representation
             * @param {any} settings The settings to use for the server diagnostic report
             * @param {boolean} settings.updates When true check for updates
             * @param {boolean} settings.remote When true check the remote server
             */
            getAppInfoAsync: function (settings) {
                return _ami.getAsync({
                    resource: "Sherlock",
                    query: { _includeUpdates: (settings || {}).updates, _upstream: (settings || {}).remote  }
                });
            },
            /**
             * @summary Get the online status of the application
             * @method
             * @memberof SanteDBWrapper.app
             * @returns {boolean} True if the application is online
             */
            getOnlineState: function () {
                return __SanteDBAppService.GetOnlineState();
            },
            /**
             * @summary Indicates whether the server's AMI is available
             * @description This command actually sends a lightweight PING function to the AMI server
             * @method
             * @memberof SanteDBWrapper.app
             * @returns {boolean} True if the AMI is available
             */
            isAdminAvailable: function () {
                return __SanteDBAppService.IsAdminAvailable();
            },
            /**
             * @summary Indicates whether the HDSI is available
             * @description This command actually sends a lightweight PING function to the HDSI server
             * @method
             * @memberof SanteDBWrapper.app
             * @returns {boolean} True if the HDSI is available
             */
            isClinicalAvailable: function () {
                return __SanteDBAppService.IsClinicalAvailable
            },
            /**
             * @summary Resolves the HTML input form for the specified template
             * @method
             * @memberof SanteDBWrapper.app
             * @returns {string} The HTML content of the input form for the specified template
             * @param {string} templateId The id of the template for which HTML input should be gathered
             */
            resolveTemplateForm: function (templateId) {
                return __SanteDBAppService.GetTemplateForm(templateId);
            },
            /**
             * @summary Resolves the HTML view for the specified template
             * @method
             * @memberof SanteDBWrapper.app
             * @returns {string} The HTML content of the view for the specified template
             * @param {string} templateId The id of the template for which HTML view should be gathered
             */
            resolveTemplateView: function (templateId) {
                return __SanteDBAppService.GetTemplateView(templateId);
            },
            /**
             * @summary Get a list of all installed template definitions
             * @method
             * @memberof SanteDBWrapper.app
             * @returns {Array<string>} The list of template definitions
             */
            getTemplateDefinitions: function () {
                return JSON.parse(__SanteDBAppService.GetTemplates());
            },
            /**
             * @summary Get the version of the application host
             * @method
             * @memberof SanteDBWrapper.app
             * @returns {string} The version of the host this applet is running in
             */
            getVersion: function () {
                return __SanteDBAppService.GetVersion();
            },
            /**
             * @summary Get all available user interface menus for the current user
             * @method
             * @memberof SanteDBWrapper.app
             * @param {string} contextName The name of the context to retrieve
             * @returns {any} A structure of menus the user is allowed to access
             */
            getMenusAsync: function (contextName) {
                return _app.getAsync({
                    resource: "Menu",
                    query: { context: contextName }
                });
            },
            /**
             * @summary Indicates whether the application host can scan barcodes
             * @method
             * @memberof SanteDBWrapper.app
             * @returns {boolean} True if the application supports a camera
             */
            canScanBarcode: function () {
                return __SanteDBAppService.HasCamera();
            },
            /**
             * @summary Launches the camera on the device to take a picture of a barcode
             * @method
             * @memberof SanteDBWrapper.app
             * @returns {string} The scanned barcode
             */
            scanBarcode: function () {
                try {
                    var value = __SanteDBAppService.ScanBarcode();
                    return value;
                }
                catch (e) {
                    console.error(e);
                    throw new Exception("Exception", "error.general", e);
                }
            }
        }

        // Resources internal
        var _resources = {
            /**
                * @property {SanteDBWrapper.ResourceWrapper} bundle The bundle resource handler
                * @memberof SanteDBWrapper.resources
                * @summary Represents a resource wrapper that persists bundles
                */
            bundle: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "Bundle",
                api: _hdsi
            }),
            /**
                * @property {SanteDB.ResourceWrapper}
                * @memberof SanteDBWrapper.resources
                * @summary Represents an resource wrapper that interoperates with the care planner
                */
            carePlan: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "CarePlan",
                api: _hdsi
            }),
            /**
                * @property {SanteDB.ResourceWrapper} 
                * @memberof SanteDBWrapper.resources
                * @summary Represents the Patient Resource
                */
            patient: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "Patient",
                api: _hdsi
            }),
            /**
                * @property {SanteDB.ResourceWrapper} 
                * @memberof SanteDBWrapper.resources
                * @summary Represents the SubstanceAdministration Resource
                */
            substanceAdministration: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "SubstanceAdministration",
                api: _hdsi
            }),
            /**
                * @property {SanteDB.ResourceWrapper}
                * @memberof SanteDBWrapper.resources
                * @summary Represents the Act Resource
                */
            act: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "Act",
                api: _hdsi
            }),
            /**
                * @property {SanteDB.ResourceWrapper} 
                * @summary Represents the entity resource
                * @memberof SanteDBWrapper.resources
                */
            entity: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "Entity",
                api: _hdsi
            }),
            /**
             * @property {SanteDB.ResourceWrapper}
             * @summary A resource wrapper for Assigning Authorities
             * @memberof SanteDBWrapper.resources
             */
            assigningAuthority: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "AssigningAuthority",
                api: _hdsi
            }),
            /**
                * @property {SanteDB.ResourceWrapper} 
                * @summary Represents the entity relationship resource
                * @memberof SanteDBWrapper.resources
                */
            entityRelationship: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "EntityRelationship",
                api: _hdsi
            }),
            /**
                * @property {SanteDB.ResourceWrapper} 
                * @memberof SanteDBWrapper.resources
                * @summary Represents the Observation Resource
                */
            observation: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "Observation",
                api: _hdsi
            }),
            /**
                * @property {SanteDB.ResourceWrapper} 
                * @memberof SanteDBWrapper.resources
                * @summary Represents the Place Resource
                */
            place: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "Place",
                api: _hdsi
            }),
            /**
                * @property {SanteDB.ResourceWrapper} 
                * @memberof SanteDBWrapper.resources
                * @summary Represents the Provider Resource
                */
            provider: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "Provider",
                api: _hdsi
            }),
            /**
                * @property {SanteDB.ResourceWrapper} 
                * @memberof SanteDBWrapper.resources
                * @summary Represents the UserEntity Resource
                */
            userEntity: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "UserEntity",
                api: _hdsi
            }),
            /**
                * @property {SanteDB.ResourceWrapper} 
                * @memberof SanteDBWrapper.resources
                * @summary Represents the Organization Resource
                */
            organization: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "Organization",
                api: _hdsi
            }),
            /**
                * @property {SanteDB.ResourceWrapper} 
                * @memberof SanteDBWrapper.resources
                * @summary Represents the Material Resource
                */
            material: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "Material",
                api: _hdsi
            }),
            /**
                * @property {SanteDB.ResourceWrapper} 
                * @memberof SanteDBWrapper.resources
                * @summary Represents the ManufacturedMaterial Resource
                */
            manufacturedMaterial: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "ManufacturedMaterial",
                api: _hdsi
            }),
            /**
                * @property {SanteDB.ResourceWrapper} 
                * @memberof SanteDBWrapper.resources
                * @summary Represents the ManufacturedMaterial Resource
                */
            concept: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "Concept",
                api: _ami
            }),
            /**
                * @property {SanteDB.ResourceWrapper} 
                * @memberof SanteDBWrapper.resources
                * @summary Represents the ConceptSet Resource
                */
            conceptSet: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "ConceptSet",
                api: _ami
            }),
            /**
                * @property {SanteDB.ResourceWrapper} 
                * @memberof SanteDBWrapper.resources
                * @summary Represents the ReferenceTerm Resource
                */
            referenceTerm: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "ReferenceTerm",
                api: _ami
            }),
            /**
                * @property {SanteDB.ResourceWrapper} 
                * @memberof SanteDBWrapper.resources
                * @summary Represents the CodeSystem Resource
                */
            codeSystem: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "CodeSystem",
                api: _ami
            }),
            /**
                * @property {SanteDB.ResourceWrapper} 
                * @memberof SanteDBWrapper.resources
                * @summary Represents the DeviceEntity Resource
                */
            deviceEntity: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "DeviceEntity",
                api: _hdsi
            }),
            /**
                * @property {SanteDB.ResourceWrapper} 
                * @memberof SanteDBWrapper.resources
                * @summary Represents the ApplicationEntity Resource
                */
            applicationEntity: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "ApplicationEntity",
                api: _hdsi
            }),
            /**
                * @property {SanteDB.ResourceWrapper} 
                * @memberof SanteDBWrapper.resources
                * @summary Gets the configuration resource
                */
            configuration: new ResourceWrapper({
                accept: "application/json",
                resource: "Configuration",
                api: _app
            }),
            /**
                * @property {SanteDB.ResourceWrapper}
                * @memberof SanteDBWrapper.resources
                * @summary Gets the queue control resource
                */
            queue: new ResourceWrapper({
                accept: "application/json",
                resource: "Queue",
                api: _app
            }),
            /**
                * @property {SanteDB.ResourceWrapper}
                * @memberof SanteDBWrapper.resources
                * @summary Resource wrapper which interacts with the administrative task scheduler
                */
            task: new ResourceWrapper({
                accept: "application/json",
                resource: "Task",
                api: _ami
            }),
            /**
                * @property {SanteDB.ResourceWrapper}
                * @memberof SanteDBWrapper.resources
                * @summary A resource wrapper for alerts which are messages between users
                */
            mail: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "MailMessage",
                api: _ami
            }),
            /**
                * @property {SanteDB.ResourceWrapper}
                * @memberof SanteDBWrapper.resources
                * @summary A wrapper which is used for fetching user notifications
                **/
            tickle: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "Tickle",
                api: _app
            }),
            /**
                * @property {SanteDB.ResourceWrapper}
                * @memberof SanteDBWrapper.resources
                * @summary A wrapper for locale information which comes from the server
                */
            locale: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "Locale",
                api: _app
            }),
            /**
             * @property {SanteDB.ResourceWrapper}
             * @memberOf SanteDBWrapper.resources
             * @summary Wrapper for Security USers
             */
            securityUser: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "SecurityUser",
                api: _ami
            }),
            /**
             * @property {SanteDB.ResourceWrapper}
             * @memberOf SanteDBWrapper.resources
             * @summary Wrapper for Security Roles
             */
            securityRole: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "SecurityRole",
                api: _ami
            }),
             /**
             * @property {SanteDB.ResourceWrapper}
             * @memberOf SanteDBWrapper.resources
             * @summary Wrapper for session information
             */
            sessionInfo: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "SessionInfo",
                api: _ami
            }),
            /**
             * @property {SanteDB.ResourceWrapper}
             * @memberOf SanteDBWrapper.resources
             * @summary Wrapper for Security Devices
             */
            securityDevice: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "SecurityDevice",
                api: _ami
            }),
            /**
             * @property {SanteDB.ResourceWrapper}
             * @memberOf SanteDBWrapper.resources
             * @summary Wrapper for Security Applications
             */
            securityApplication: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "SecurityApplication",
                api: _ami
            }),
            /**
             * @property {SanteDB.ResourceWrapper}
             * @memberOf SanteDBWrapper.resources
             * @summary Wrapper for Security Policies
             */
            securityPolicy: new ResourceWrapper({
                accept: _viewModelJsonMime,
                resource: "SecurityPolicy",
                api: _ami
            }),
            /**
             * @property {SanteDB.ResourceWrapper}
             * @memberOf SanteDBWrapper.resources
             * @summary Wrapper for provenance
             */
            securityProvenance: new ResourceWrapper({
                resource: "SecurityProvenance",
                api: _ami,
                accept: _viewModelJsonMime,
                viewModel: 'base'
            }),
            /**
             * @property {SanteDB.ResourceWrapper}
             * @memberOf SanteDBWrapper.resources
             * @summary Wrapper for audit API
             */
            audit: new ResourceWrapper({
                resource: "Audit",
                accept: "application/json",
                api: _ami
            }),
            /**
             * @property {SanteDB.ResourceWrapper}
             * @memberOf SanteDBWrapper.resources
             * @summary Wrapper for probe API
             */
            probe: new ResourceWrapper({
                resource: "Probe",
                accept: _viewModelJsonMime,
                api: _ami
            }),
            /**
             * @property {SanteDB.ResourceWrapper}
             * @memberOf SanteDBWrapper.resources
             * @summary Wrapper for sync log API
             */
            sync: new ResourceWrapper({
                resource: "Sync",
                accept: _viewModelJsonMime,
                api: _app
            }),
            /**
             * @property {SanteDB.ResourceWrapper}
             * @memberOf SanteDBWrapper.resources
             * @summary Wrapper for subscription definition API
             */
            subscriptionDefinition : new ResourceWrapper({
                resource: "SubscriptionDefinition",
                api: _ami
            })
        };

        // HACK: Wrapper pointer facility = place
        _resources.facility = _resources.place;

        // master configuration closure
        var _masterConfig = null;
        var _configuration = {
            /**
             * @method
             * @memberof SanteDBWrapper.configuration
             * @return {Promise} The data providers
             * @summary Gets a list of data providers available on this offline provider mode
             */
            getDataProvidersAsync: function () {
                return _app.getAsync({
                    resource: "DataProviders"
                });
            },
            /**
                * @method
                * @memberof SanteDBWrapper.configuration
                * @summary Get the configuration, nb: this caches the configuration
                * @returns {Promise} The configuration
                */
            getAsync: function () {
                return new Promise(function (fulfill, reject) {
                    try {
                        if (_masterConfig)
                            fulfill(_masterConfig);
                        else {
                            _resources.configuration.getAsync()
                                .then(function (d) {
                                    _masterConfig = d;
                                    if (fulfill) fulfill(_masterConfig);
                                })
                                .catch(function (e) {
                                    if (reject) reject(e.responseJSON || e);
                                });
                        }
                    }
                    catch (e) {
                        if (reject) reject(e.responseJSON || e);
                    }
                });
            },

            /**
                * @method
                * @memberof SanteDBWrapper.configuration
                * @summary Get the specified configuration key
                * @returns {string} The application key setting
                * @param {string} key The key of the setting to find
                */
            getAppSetting: function (key) {
                try {
                    if (!_masterConfig) throw new Exception("Exception", "error.invalidOperation", "You need to call configuration.getAsync() before calling getAppSetting()");
                    var _setting = _masterConfig.application.setting.find((k) => k.key === key);
                    if (_setting)
                        return _setting.value;
                    else
                        return null;
                }
                catch (e) {
                    if (!e.$type)
                        throw new Exception("Exception", "error.unknown", e.detail, e);
                    else
                        throw e;
                }
            },

            /**
                * @method 
                * @memberof SanteDBWrapper.configuration
                * @summary Sets the specified application setting
                * @param {string} key The key of the setting to set
                * @param {string} value The value of the application setting
                * @see SanteDB.configuration.save To save the updated configuration
                */
            setAppSetting: function (key, value) {
                try {
                    if (!_masterConfig) throw new Exception("Exception", "error.invalidOperation", "You need to call configuration.getAsync() before calling getAppSetting()");
                    var _setting = _masterConfig.application.setting.find((k) => k.key === key);
                    if (_setting)
                        _setting.value = value;
                    else
                        _masterConfig.application.setting.push({ key: key, value: value });
                }
                catch (e) {
                    if (!e.$type)
                        throw new Exception("Exception", "error.unknown", e.detail, e);
                    else
                        throw e;
                }
            },

            /**
                * @method
                * @memberof SanteDBWrapper.configuration
                * @summary Gets the currently configured realm
                * @returns {string} The name of the security realm
                */
            getRealm: function () {
                try {
                    if (!_masterConfig) throw new Exception("Exception", "error.invalidOperation", "You need to call configuration.getAsync() before calling getAppSetting()");
                    return _masterConfig.realmName;
                }
                catch (e) {
                    if (!e.$type)
                        throw new Exception("Exception", "error.unknown", e.detail, e);
                    else
                        throw e;
                }
            },

            /**
                * @method 
                * @summary Gets the specified section name
                * @memberof SanteDBWrapper.configuration
                * @param {any} name The name of the configuration section
                * @returns {any} A JSON object representing the configuration setting section
                */
            getSection: function (name) {
                try {
                    if (!_masterConfig) throw new Exception("Exception", "error.invalidOperation", "You need to call configuration.getAsync() before calling getAppSetting()");
                    return _masterConfig[name];
                }
                catch (e) {
                    if (!e.$type)
                        throw new Exception("Exception", "error.unknown", e.detail, e);
                    else
                        throw e;
                }
            },

            /**
                * @method
                * @summary Instructs the current system to join a realm
                * @memberof SanteDBWrapper.configuration
                * @returns {Promise} The configuration file after joining the realm
                * @param {any} configData The configuration data for the realm
                * @param {string} configData.domain The domain to which the application is to be joined
                * @param {string} configData.deviceName The name of the device to join as
                * @param {boolean} configData.replaceExisting When true, instructs the application to replace an existing registration
                * @param {boolean} configData.enableTrace When true, enables log file tracing of requests
                * @param {boolean} configData.enableSSL When true, enables HTTPS
                * @param {boolean} configData.noTimeout When true, removes all timeouts from the configuration
                * @param {number} configData.port The port number to connect to the realm on
                * @param {boolean} overwrite Overwrites the existing configuration if needed
                */
            joinRealmAsync: function (configData, overwrite) {
                return new Promise(function (fulfill, reject) {
                    try {
                        _app.postAsync({
                            resource: "Configuration/Realm",
                            contentType: 'application/json',
                            data: {
                                realmUri: configData.domain,
                                deviceName: configData.deviceName,
                                enableTrace: configData.enableTrace || false,
                                enableSSL: configData.enableSSL || false,
                                port: configData.port,
                                noTimeout: false,
                                replaceExisting: overwrite || false,
                                client_secret: configData.client_secret,
                                domainSecurity: configData.domainSecurity
                            }
                        }).then(function (d) {
                            _masterConfig = d;
                            if (fulfill) fulfill(d);
                        }).catch(function (e) {
                            console.error(`Error joining realm: ${e}`);
                            if (reject) reject(e.responseJSON || e);
                        });
                    }
                    catch (e) {
                        var ex = e.responseJSON || e;
                        if (!ex.$type)
                            ex = new Exception("Exception", "error.general", e);
                        if (reject) reject(ex);
                    }
                });
            },
            /**
                * @method
                * @memberof SanteDBWrapper.configuration
                * @summary Instructs the application to remove realm configuration
                * @returns {Promise} A promise that is fulfilled when the leave operation succeeds
                */
            leaveRealmAsync: function () {
                return _app.deleteAsync({
                    resource: "Configuration/Realm"
                });
            },
            /**
                * @method
                * @memberof SanteDBWrapper.configuration
                * @summary Save the configuration object
                * @param {any} configuration The configuration object to save
                * @returns {Promise} A promise object indicating whether the save was successful
                */
            saveAsync: function (configuration) {
                return _resources.configuration.insertAsync(configuration);
            },
            /**
                * @method
                * @memberof SanteDBWrapper.configuration
                * @summary Gets the user specific preferences
                * @returns {Promise} A promise representing the retrieval of the user settings
                */
            getUserPreferencesAsync: function () {
                return _app.getAsync({
                    resource: "Configuration/User"
                });
            },
            /**
                * @method
                * @memberof SanteDBWrapper.configuration
                * @summary Saves the user preferences
                * @param {any} preferences A dictionary of preferences to be saved
                * @returns {Promise} A promise which indicates when preferences were saved
                * @example Save user preference for color
                * SanteDB.configuration.saveUserPreferences([
                *  { key: "color", value: "red" }
                * ]);
                */
            saveUserPreferencesAsync: function (preferences) {
                return _app.postAsync({
                    resource: "Configuration/User",
                    data: preferences
                });
            }
        };

        // Session and auth data
        var _session = null;
        var _elevator = null;
        var _authentication = {
            /**
             * SID for SYSTEM USER
             */
            SYSTEM_USER: "fadca076-3690-4a6e-af9e-f1cd68e8c7e8",
            /**
             * SID for ANONYMOUS user
             */
            ANONYMOUS_USER: "c96859f0-043c-4480-8dab-f69d6e86696c",
            /**
             * @method 
             * @summary Sets the elevator function
             * @param {any} elevator An elevation implementation
             * @param {function():String} elevator.getToken A function to get the current token
             * @param {function(boolean):void} elevator.elevate A function to perform elevation
             * @memberof SanteDBWrapper.authentication
             */
            setElevator: function (elevator) {
                _elevator = elevator;
            },
            /**
                * @method
                * @memberof SanteDBWrapper.authentication
                * @returns {any} The oauth session response with an access token, etc.
                * @summary Gets the current session 
                */
            getSession: function () {
                return _session ? {
                    access_token: _session.access_token,
                    expires_in: _session.expires_in
                } : null;
            },
            /**
                * @method
                * @memberof SanteDBWrapper.authentication
                * @returns {Promise} A promise representing the fulfillment or rejection of the get request
                * @summary Gets the extended session information
                */
            getSessionInfoAsync: function () {
                return new Promise(function (fulfill, reject) {
                    if (_session)
                        fulfill(_session);
                    else
                        try {
                            _auth.getAsync({
                                resource: "session"
                            })
                                .then(function (s) {
                                    _session = s;
                                    if (fulfill) fulfill(s);
                                })
                                .catch(function (e) {

                                    if (e.detail.status <= 204) {
                                        _session = null;
                                        fulfill(null);
                                    }
                                    else if (reject) reject(e.responseJSON || e);

                                });
                        }
                        catch (e) {
                            var ex = e.responseJSON || e;
                            if (!ex.$type)
                                ex = new Exception("Exception", "error.general", e);
                            if (reject) reject(ex);
                        }
                });
            },
            /**
                * @method
                * @memberof SanteDBWrapper.authentication
                * @summary Requests a two-factor authentication secret to be sent
                * @param {string} mode The mode of two-factor authentication (email, sms, etc.)
                * @returns {Promise} A promise representing the outcome of the TFA secret send
                */
            sendTfaSecretAsync: function (mode) {
                return _ami.postAsync({
                    resource: "Tfa",
                    data: { mode: mode }
                })
            },
            /**
                * @method
                * @memberof SanteDBWrapper.authentication
                * @summary Retrieves information about the two-factor authentication modes supported by the server
                * @returns {Promise} The promise representing the fulfillment or rejection of the get request
                */
            getTfaModeAsync: function () {
                return _ami.getAsync({
                    resource: "Tfa"
                });
            },
            /**
                * @method 
                * @memberof SanteDBWrapper.authentication
                * @summary Performs a OAUTH password login
                * @param {string} userName The name of the user which is logging in
                * @param {string} password The password of the user
                * @param {string} tfaSecret The two-factor secret if provided
                * @param {string} scope When true indicates that there should not be a persistent session (i.e. one time authentication)
                * @param {boolean} uacPrompt True if the authentication is part of a UAC prompt and no perminant session is to be 
                * @param {String} purposeOfUse The identifier of the purpose of use for the access
                * @returns {Promise} A promise representing the login request
                */
            passwordLoginAsync: function (userName, password, tfaSecret, uacPrompt, purposeOfUse, scope) {
                return new Promise(function (fulfill, reject) {
                    try {
                        _auth.postAsync({
                            resource: "session",
                            data: {
                                username: userName,
                                password: password,
                                grant_type: 'password',
                                scope: (scope || ["*"]).join(",")
                            },
                            headers: {
                                "X-SanteDB-TfaSecret": tfaSecret,
                                "X-SanteDBClient-UserAccessControl": uacPrompt,
                                "X-SanteDBClient-Claim":
                                    `${btoa(`http://santedb.org/claims/override=${uacPrompt && (purposeOfUse || false)}`)},${btoa(`urn:oasis:names:tc:xacml:2.0:action:purpose=${purposeOfUse || null}`)}`
                            },
                            contentType: 'application/x-www-form-urlencoded'
                        })
                            .then(function (d) {
                                if (!uacPrompt) {
                                    _session = d;
                                }
                                if (fulfill) fulfill(d);
                            })
                            .catch(reject);
                    }
                    catch (e) {
                        var ex = e.responseJSON || e;
                        if (!ex.$type)
                            ex = new Exception("Exception", "error.general", e);
                        if (reject) reject(ex);
                    }
                });
            },
            /**
                * @method 
                * @memberof SanteDBWrapper.authentication
                * @summary Performs a local pin login
                * @param {string} userName The name of the user which is logging in
                * @param {string} password The password of the user
                * @param {string} tfaSecret The two-factor secret if provided
                * @param {boolean} noSession When true indicates that there should not be a persistent session (i.e. one time authentication)
                * @param {String} purposeOfUse The reason the authentication is happening
                * @param {Array} scope The requested scope of the session
                * @returns {Promise} A promise representing the login request
                */
            pinLoginAsync: function (userName, pin, uacPrompt, purposeOfUse, tfaSecret, scope) {
                return new Promise(function (fulfill, reject) {
                    try {
                        _auth.postAsync({
                            resource: "session",
                            data: {
                                username: userName,
                                pin: pin,
                                grant_type: 'pin',
                                scope: (scope || ["*"]).join(",")
                            },
                            headers: {
                                "X-SanteDB-TfaSecret": tfaSecret,
                                "X-SanteDBClient-Sessionless": uacPrompt,
                                "X-SanteDBClient-Claim":
                                    `${btoa(`http://santedb.org/claims/override=${uacPrompt && (purposeOfUse || false)}`)},${btoa(`urn:oasis:names:tc:xacml:2.0:action:purpose=${purposeOfUse || null}`)}`
                            },
                            contentType: 'application/x-www-form-urlencoded'
                        })
                            .then(function (d) {
                                if (!uacPrompt) {
                                    _session = d;
                                }
                                if (fulfill) fulfill(d);
                            })
                            .catch(reject);
                    }
                    catch (e) {
                        var ex = e.responseJSON || e;
                        if (!ex.$type)
                            ex = new Exception("Exception", "error.general", e);
                        if (reject) reject(ex);
                    }
                });
            },
            /**
                * @method
                * @memberof SanteDBWrapper.authentication
                * @summary Performs an OAUTH client credentials login
                * @description A client credentials login is a login principal which only has an application principal. This is useful for password resets, etc.
                * @returns {Promise} A promise representing the login request
                * @param {boolean} noSession When true, indicates that a session should not be replaced that the request is a one time use token
                */
            clientCredentialLoginAsync: function (noSession) {
                return new Promise(function (fulfill, reject) {
                    try {
                        _auth.postAsync({
                            resource: "session",
                            data: {
                                grant_type: 'client_credentials',
                                scope: "*"
                            },
                            contentType: 'application/x-www-form-urlencoded'
                        })
                            .then(function (d) {
                                if (!noSession) {
                                    _session = d;
                                }
                                if (fulfill) fulfill(d);
                            })
                            .catch(reject);
                    }
                    catch (e) {
                        var ex = e.responseJSON || e;
                        if (!ex.$type)
                            ex = new Exception("Exception", "error.general", e);
                        if (reject) reject(ex);
                    }
                });
            },
            /**
                * @method
                * @memberof SanteDBWrapper.authentication
                * @summary Performs an OAUTH authorization code grant
                * @description This function should be called *after* the authorization code has been obtained from the authorization server
                * @param {boolean} noSession When true, indicates that there should not be a persistent session created
                * @returns {Promise} A promise representing the session request
                */
            authorizationCodeLoginAsync: function (code, redirect_uri, noSession) {
                return new Promise(function (fulfill, reject) {
                    try {
                        _auth.postAsync({
                            resource: "session",
                            data: {
                                grant_type: 'authorization_code',
                                code: code,
                                redirect_uri: redirect_uri,
                                scope: "*"
                            },
                            contentType: 'application/x-www-form-urlencoded'
                        })
                            .then(function (d) {
                                if (!noSession) {
                                    _session = d;
                                }
                                if (fulfill) fulfill(d);
                            })
                            .catch(reject);
                    }
                    catch (e) {
                        var ex = e.responseJSON || e;
                        if (!ex.$type)
                            ex = new Exception("Exception", "error.general", e);
                        if (reject) reject(ex);
                    }
                });
            },
            /**
                * @method
                * @memberof SanteDBWrapper.authentication
                * @summary Performs a refresh token grant
                * @returns {Promise} A promise representing the session refresh request
                */
            refreshLoginAsync: function () {
                return new Promise(function (fullfill, reject) {
                    try {

                        if (_session) {
                            _auth.postAsync({
                                resource: "session",
                                data: {
                                    grant_type: 'refresh_token',
                                    refresh_token: _session.refresh_token,
                                    scope: "*"
                                },
                                contentType: 'application/x-www-form-urlencoded'
                            })
                                .then(function (d) {
                                    if (!noSession) {
                                        _session = d;
                                        _authentication.getSessionInfoAsync().then(fulfill).catch(reject);
                                    }
                                    if (fulfill) fulfill(d);
                                })
                                .catch(reject);
                        }
                        else {
                            if (reject) reject(new Exception("SecurityException", "error.security", "Cannot refresh a null session"));
                        }
                    }
                    catch (e) {
                        var ex = e.responseJSON || e;
                        if (!ex.$type)
                            ex = new Exception("Exception", "error.general", e);
                        if (reject) reject(ex);
                    }
                });
            },
            /**
                * @method
                * @memberof SanteDBWrapper.authentication
                * @summary Sets the password of the specified user
                * @param {string} sid The security identifier of the user which is being updated
                * @param {string} userName The name of the user to set the password to
                * @param {string} passwd The password to set the currently logged in user to
                * @returns {Promise} The promise representing the fulfillment or rejection of the password change
                */
            setPasswordAsync: function (sid, userName, passwd) {
                if (!_session || !_session)
                    throw new Exception("SecurityException", "error.security", "Can only set password with active session");
                return _ami.putAsync({
                    id: sid,
                    resource: "SecurityUser",
                    contentType: _viewModelJsonMime,
                    data: {
                        $type: "SecurityUserInfo",
                        passwordOnly: true,
                        entity: new SecurityUser({
                            userName: userName,
                            password: passwd
                        })
                    }
                });
            },
            /**
                * @method
                * @memberof SanteDBWrapper.authentication
                * @summary Abandons the current SanteDB session
                * @returns {Promise} The promise representing the fulfillment or rejection of the logout request
                */
            logoutAsync: function () {
                return new Promise(function (fulfill, reject) {
                    if (!_session) {
                        if (reject) reject(new Exception("SecurityException", "error.security", "Cannot logout of non-existant session"));
                    }
                    try {
                        _auth.deleteAsync({
                            resource: "session"
                        })
                            .then(function (d) {
                                _session = null;
                                window.sessionStorage.removeItem('token');
                                if (fulfill) fulfill(d);
                            })
                            .catch(reject);
                    }
                    catch (e) {
                        var ex = e.responseJSON || e;
                        if (!ex.$type)
                            ex = new Exception("Exception", "error.general", e);
                        if (reject) reject(ex);
                    }
                });
            }
        };

        // Provides localization support functions
        var _localeCache = {};
        var _localization = {
            /**
                * @summary Gets a string from the current user interface localization
                * @memberof SanteDBWrapper.localiztion
                * @method
                * @param {string} stringId The id of the localization string to get
                * @returns {string} The localized string
                */
            getString: function (stringId) {
                try {
                    var retVal = __SanteDBAppService.GetString(stringId);
                    return retVal || stringId;
                }
                catch (e) {
                    console.error(e);
                    return stringId;
                }
            },
            /**
                * @summary Get the currently configured locale
                * @memberof SanteDBWrapper.localization
                * @method
                * @return {string} The ISO language code and country code of the application
                */
            getLocale: function () {
                var retVal = __SanteDBAppService.GetLocale();
                return retVal;
            },
            /**
                * @summary Get the currently configured language
                * @memberof SanteDBWrapper.localization
                * @method
                * @return {string} The ISO language code
                */
            getLanguage: function () {
                return __SanteDBAppService.GetLocale().substr(0, 2);
            },
            /**
                * @summary Get the currently configured country code
                * @memberof SanteDBWrapper.localization
                * @method
                * @return {string} The 2 digit ISO country code
                */
            getCountry: function () {
                return __SanteDBAppService.GetLocale().substr(4, 2);
            },
            /**
                * @summary Set the current locale of the application
                * @memberof SanteDBWrapper.localization
                * @method
                * @param {string} locale The ISO locale (i.e. en-US, en-CA, sw-TZ to set)
                */
            setLocale: function (locale) {
                return __SanteDBAppService.SetLocale(locale);
            },
            /**
                * @summary Get localization format information for the specified locale
                * @memberof SanteDBWrapper.localization
                * @method
                * @param {string} locale The locale for which the format information should be retrieved
                * @returns {Promise} The promise representing the operation to fetch locale
                * @description The localization information contains formatting for currency, formatting for dates, and formatting for numbers
                */
            getFormatInformationAsync: function (locale) {
                return new Promise(function (fulfill, reject) {
                    try {
                        if (_localeCache[locale])
                            fulfill(_localeCache[locale]);
                        else {
                            _resources.locale.getAsync(locale)
                                .then(function (d) {
                                    _localeCache[locale] = d;
                                    if (fulfill) fulfill(d);
                                })
                                .catch(reject);
                        }
                    }
                    catch (e) {
                        var ex = e.responseJSON || e;
                        if (!ex.$type)
                            ex = new Exception("LocalizationException", "error.general", e);
                        if (reject) reject(ex);
                    }
                });
            },

        }

        // Public bindings
        this.api = {
            /**
            * @type {APIWrapper}
            * @summary Represents a property which wraps the HDSI interface
            * @memberof SanteDBWrapper
            */
            hdsi: _hdsi,
            /**
            * @type {APIWrapper}
            * @memberof SanteDBWrapper
            * @summary Represents a property which communicates with the AMI
            */
            ami: _ami,
            /**
                * @type {APIWrapper}
                * @memberof SanteDBWrapper
                * @summary Represents a property which communicates with the AUTH service
                */
            auth: _auth
        };

        /**
         * @property 
         * @memberof SanteDBWrapper
         * @summary Provide access to localization data
         */
        this.locale = _localization;
        /**
            * @property
            * @memberof SanteDBWrapper
            * @summary Provides access to resource handlers
            */
        this.resources = _resources;
        /**
            * @summary Configuration routines for SanteDB
            * @class
            * @static
            * @memberof SanteDBWrapper
            */
        this.configuration = _configuration;
        /**
            * @summary Authentication functions for SanteDB
            * @class
            * @static
            * @memberof SanteDBWrapper
            */
        this.authentication = _authentication;

        /**
         * @summary Application functions for SanteDB
         * @class
         * @static
         * @memberof SanteDBWrapper
         */
        this.application = _application;

        // Application magic 
        var _magic = null;

        // Setup JQuery to send up authentication and cookies!
        $.ajaxSetup({
            cache: false,
            beforeSend: function (data, settings) {
                if (_elevator && _elevator.getToken()) {
                    data.setRequestHeader("Authorization", "BEARER " +
                        _elevator.getToken());
                }
                else if (window.sessionStorage.getItem('token'))
                    data.setRequestHeader("Authorization", "BEARER " +
                        window.sessionStorage.getItem("token"));
                if (!_magic)
                    _magic = __SanteDBAppService.GetMagic();
                data.setRequestHeader("X-SdbMagic", _magic);
            },
            converters: {
                "text json": function (data) {
                    return $.parseJSON(data, true);
                }
            }
        });

    };

if (!SanteDB)
    var SanteDB = new SanteDBWrapper();

/**
 * Return the string as a camel case
 * @param {String} str The String
 */
String.prototype.toCamelCase = function () {
    return this
        .replace(/\s(.)/g, function ($1) { return $1.toUpperCase(); })
        .replace(/\s/g, '')
        .replace(/^(.)/, function ($1) { return $1.toLowerCase(); });
}


/**
 * Pad the specified string
 * @param {String} str The String
 */
String.prototype.pad = function (len) {
    var pad = "0".repeat(len);
    return (pad + this).slice(-len);
}