/// <reference path="./santedb-model.js"/>
/*
 * Copyright 2015-2019 Mohawk College of Applied Arts and Technology
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
 * User: Justin Fyfe
 * Date: 2019-8-8
 */

// Interactive SHIM between host environment and browser
var __SanteDBAppService = window.SanteDBAppService || {};

// Backing of execution environment
var ExecutionEnvironment = {
    Unknown: 0,
    Server: 1,
    Mobile: 2,
    Other: 3,
    Test: 4,
    Gateway: 5
};

/**
* @class
* @constructor
* @summary SanteDB HDSI implementation that uses HTTP (note, other implementations may provide alternates)
* @param {any} _config The configuration of the service
* @param {string} _config.base The base URL for the service
* @param {boolean} _config.idByQuery When true, indicates the wrapper wants to pass IDs by query
*/
function APIWrapper(_config) {


    /**
     * @method
     * @summary Gets the base url
     * @memberof APIWrapper
     */
    this.getUrl = function () {
        return _config.base;
    };

    /**
        * @method
        * @summary Reconfigures this instance of the API wrapper
        * @memberof APIWrapper
        * @param {any} config The configuration of the service
        * @param {string} config.base The base URL for the service
        * @param {boolean} config.idByQuery When true, indicates the wrapper wants to pass IDs by query
        */
    this.configure = function (config) {
        _config = config;
    };

    /**
        * @method postAsync
        * @memberof APIWrapper
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
                data: configuration.data && configuration.contentType.indexOf('application/json') == 0 ? JSON.stringify(SanteDB._reorderProperties(configuration.data)) : configuration.data,
                dataType: configuration.dataType || 'json',
                contentType: configuration.contentType || 'application/json',
                headers: configuration.headers,
                async: !configuration.sync,
                success: function (xhr, status, response) {
                    try {
                        if (xhr && response.getResponseHeader("etag"))
                            xhr.etag = response.getResponseHeader("etag");
                        if (fulfill) fulfill(xhr, configuration.state);
                    }
                    catch (e) {
                        if (reject) reject(e.responseJSON || e, configuration.state);
                    }
                },
                error: function (e, data, setting) {
                    if (SanteDB._globalErrorHandler(e, data, setting))
                        return;
                    var error = e.responseJSON;

                    if (reject) {
                        if (error && error.error !== undefined) // oauth2
                            reject(new Exception(error.type, error.error, error.error_description, error.caused_by, null, null, null, null, error), configuration.state);
                        else if (error && (error.$type === "Exception" || error.$type))
                            reject(new Exception(error.$type, error.message, error.detail, error.cause, error.stack, error.policyId, error.policyOutcome, error.rules, error.data || error), configuration.state);
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
        * @method putAsync
        * @memberof APIWrapper
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
                data: configuration.contentType.indexOf('application/json') == 0 ? JSON.stringify(SanteDB._reorderProperties(configuration.data)) : configuration.data,
                dataType: configuration.dataType || 'json',
                contentType: configuration.contentType || 'application/json',
                headers: configuration.headers,
                async: !configuration.sync,
                success: function (xhr, status, response) {
                    try {
                        if (xhr && response.getResponseHeader("etag"))
                            xhr.etag = response.getResponseHeader("etag");
                        if (fulfill) fulfill(xhr, configuration.state);
                    }
                    catch (e) {
                        if (reject) reject(e.responseJSON || e, configuration.state);
                    }
                },
                error: function (e, data, setting) {
                    if (SanteDB._globalErrorHandler(e, data, setting))
                        return;
                    var error = e.responseJSON;

                    if (reject) {
                        if (error && error.error !== undefined) // oauth2
                            reject(new Exception(error.type, error.error, error.error_description, error.caused_by, null, null, null, null, error), configuration.state);
                        else if (error && (error.$type === "Exception" || error.$type))
                            reject(new Exception(error.$type, error.message, error.detail, error.cause, error.stack, error.policyId, error.policyOutcome, error.rules, error.data || error), configuration.state);
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
    * @method searchAsync
    * @memberof APIWrapper
    * @summary Performs an HTTP SEARCH operation with the payload being a long query string
    * @param {any} configuration The configuration object
    * @param {string} configuration.resource The resource that is to be searched
    * @param {any} configuration.query The query to be posted 
    * @param {any} configuration.state A piece of state data which is passed back to the caller for state tracking
    * @param {boolean} configuration.sync When true, executes the request in synchronous mode
    * @returns {Promise} The promise for the operation
    */
    this.searchAsync = function (configuration) {
        return new Promise(function (fulfill, reject) {
            $.ajax({
                method: 'SEARCH',
                url: _config.base + configuration.resource,
                data: configuration.query,
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded',
                headers: configuration.headers,
                async: !configuration.sync,
                success: function (xhr, status, response) {
                    try {
                        if (xhr && response.getResponseHeader("etag"))
                            xhr.etag = response.getResponseHeader("etag");
                        if (fulfill) fulfill(xhr, configuration.state);
                    }
                    catch (e) {
                        if (reject) reject(e.responseJSON || e, configuration.state);
                    }
                },
                error: function (e, data, setting) {
                    if (SanteDB._globalErrorHandler(e, data, setting))
                        return;
                    var error = e.responseJSON;

                    if (reject) {
                        if (error && error.error !== undefined) // oauth2
                            reject(new Exception(error.type, error.error, error.error_description, error.caused_by), configuration.state);
                        else if (error && (error.$type === "Exception" || error.$type))
                            reject(new Exception(error.$type, error.message, error.detail, error.cause, error.stack, error.policyId, error.policyOutcome, error.rules, error.data || error), configuration.state);
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
        * @method patchAsync
        * @memberof APIWrapper
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
                data: configuration.contentType.indexOf('application/json') == 0 ? JSON.stringify(SanteDB._reorderProperties(configuration.data)) : configuration.data,
                dataType: configuration.dataType || 'json',
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
                    if (SanteDB._globalErrorHandler(e, data, setting))
                        return;
                    var error = e.responseJSON;

                    if (reject) {
                        if (error && error.error !== undefined) // oauth2
                            reject(new Exception(error.type, error.error, error.error_description, error.caused_by), configuration.state);
                        else if (error && (error.$type === "Exception" || error.$type))
                            reject(new Exception(error.$type, error.message, error.detail, error.cause, error.stack, error.policyId, error.policyOutcome, error.rules, error.data || error), configuration.state);
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
        * @method getAsync
        * @memberof APIWrapper
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
                dataType: configuration.dataType || 'json',
                headers: configuration.headers,
                async: !configuration.sync,
                success: function (xhr, status, response) {
                    try {
                        if (xhr && response.getResponseHeader("etag"))
                            xhr.etag = response.getResponseHeader("etag");
                        if (fulfill) fulfill(xhr, configuration.state);
                    }
                    catch (e) {
                        if (reject) reject(e.responseJSON || e, configuration.state);
                    }
                },
                error: function (e, data, setting) {
                    if (SanteDB._globalErrorHandler(e, data, setting))
                        return;
                    var error = {};
                    if (e.responseJSON)
                        error = e.responseJSON;
                    else if (e.responseText)
                        try { error = JSON.parse(e.responseText); }
                        catch (e) { };

                    if (reject) {
                        if (error && error.error !== undefined) // oauth2
                            reject(new Exception(error.type, error.error, error.error_description, error.caused_by), configuration.state);
                        else if (error && (error.$type === "Exception" || error.$type))
                            reject(new Exception(error.$type, error.message, error.detail, error.cause, error.stack, error.policyId, error.policyOutcome, error.rules), configuration.state);
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
        * @method copyAsync
        * @memberof APIWrapper
        * @summary Performs a COPY operation against the specified object
        * @param {any} configuration The configuration object
        * @param {string} configuration.resource The resource that is to be fetched
        * @param {any} configuration.state A piece of state data which is passed back to the caller for state tracking
        * @param {boolean} configuration.sync When true, executes the request in synchronous mode
        * @param {any} configuration.id The id of the resource to copy to the server
        * @returns {Promise} The promise for the operation
        */
    this.copyAsync = function (configuration) {
        return new Promise(function (fulfill, reject) {
            $.ajax({
                method: 'COPY',
                url: _config.base + configuration.resource + (configuration.id ? (_config.idByQuery ? "?_id=" + configuration.id : "/" + configuration.id) : ""),
                dataType: configuration.dataType || 'json',
                contentType: configuration.contentType || 'application/json',
                async: !configuration.sync,
                success: function (xhr, status, response) {
                    try {
                        if (xhr && response.getResponseHeader("etag"))
                            xhr.etag = response.getResponseHeader("etag");
                        if (fulfill) fulfill(xhr, configuration.state);
                    }
                    catch (e) {
                        if (reject) reject(e.responseJSON || e, configuration.state);
                    }
                },
                error: function (e, data, setting) {
                    if (SanteDB._globalErrorHandler(e, data, setting))
                        return;
                    var error = {};
                    if (e.responseJSON)
                        error = e.responseJSON;
                    else if (e.responseText)
                        try { error = JSON.parse(e.responseText); }
                        catch (e) { };

                    if (reject) {
                        if (error && error.error !== undefined) // oauth2
                            reject(new Exception(error.type, error.error, error.error_description, error.caused_by), configuration.state);
                        else if (error && (error.$type === "Exception" || error.$type))
                            reject(new Exception(error.$type, error.message, error.detail, error.cause, error.stack, error.policyId, error.policyOutcome, error.rules), configuration.state);
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
        * @method deleteAsync
        * @memberof APIWrapper
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
                data: configuration.contentType == 'application/json' && configuration.data ? JSON.stringify(SanteDB._reorderProperties(configuration.data)) : configuration.data,
                headers: hdr,
                dataType: configuration.dataType || 'json',
                contentType: configuration.contentType || 'application/json',
                async: !configuration.sync,
                success: function (xhr, status, response) {
                    try {
                        if (xhr && response.getResponseHeader("etag"))
                            xhr.etag = response.getResponseHeader("etag");
                        if (fulfill) fulfill(xhr, configuration.state);
                    }
                    catch (e) {
                        if (reject) reject(e.responseJSON || e, configuration.state);
                    }
                },
                error: function (e, data, setting) {
                    if (SanteDB._globalErrorHandler(e, data, setting))
                        return;
                    var error = e.responseJSON;

                    if (reject) {
                        if (error && error.error !== undefined) // oauth2
                            reject(new Exception(error.type, error.error, error.error_description, error.caused_by), configuration.state);
                        else if (error && (error.$type === "Exception" || error.$type))
                            reject(new Exception(error.$type, error.message, error.detail, error.cause, error.stack, error.policyId, error.policyOutcome, error.rules), configuration.state);
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
        * @method lockAsync
        * @memberof APIWrapper
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
                        if (xhr && response.getResponseHeader("etag"))
                            xhr.etag = response.getResponseHeader("etag");
                        if (fulfill) fulfill(xhr, configuration.state);
                    }
                    catch (e) {
                        if (reject) reject(e.responseJSON || e, configuration.state);
                    }
                },
                error: function (e, data, setting) {
                    if (SanteDB._globalErrorHandler(e, data, setting))
                        return;
                    var error = e.responseJSON;

                    if (reject) {
                        if (error && error.error !== undefined) // oauth2
                            reject(new Exception(error.type, error.error, error.error_description, error.caused_by), configuration.state);
                        else if (error && (error.$type === "Exception" || error.$type))
                            reject(new Exception(error.$type, error.message, error.detail, error.cause, error.stack, error.policyId, error.policyOutcome, error.rules), configuration.state);
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
        * @method unLockAsync
        * @memberof APIWrapper
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
                        if (xhr)
                            xhr.etag = response.getResponseHeader("etag");
                        if (fulfill) fulfill(xhr, configuration.state);
                    }
                    catch (e) {
                        if (reject) reject(e.responseJSON || e, configuration.state);
                    }
                },
                error: function (e, data, setting) {
                    if (SanteDB._globalErrorHandler(e, data, setting))
                        return;
                    var error = e.responseJSON;

                    if (reject) {
                        if (error && error.error !== undefined) // oauth2
                            reject(new Exception(error.type, error.error, error.error_description, error.caused_by), configuration.state);
                        else if (error && (error.$type === "Exception" || error.$type))
                            reject(new Exception(error.$type, error.message, error.detail, error.cause, error.stack, error.policyId, error.policyOutcome, error.rules), configuration.state);
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
        * @method touchAsync
        * @memberof APIWrapper
        * @summary Performs a TOUCH on an existing item on the instance
        * @param {any} configuration The configuration object
        * @param {string} configuration.resource The resource that is to be locked
        * @param {any} configuration.state A piece of state data which is passed back to the caller for state tracking
        * @param {boolean} configuration.sync When true, executes the request in synchronous mode
        * @param {any} configuration.id The object that is to be locked on the server
        * @param {any} configuration.data The additional data that should be sent for the delete command
        * @param {string} configuration.contentType Identifies the content type of the data
        * @returns {Promise} The promise for the operation
        */
    this.touchAsync = function (configuration) {
        return new Promise(function (fulfill, reject) {
            $.ajax({
                method: 'TOUCH',
                url: _config.base + configuration.resource + (configuration.id ? (_config.idByQuery ? "?_id=" + configuration.id : "/" + configuration.id) : ""),
                headers: configuration.headers,
                async: !configuration.sync,
                success: function (xhr, status, response) {
                    try {
                        if (xhr && response.getResponseHeader("etag"))
                            xhr.etag = response.getResponseHeader("etag");
                        if (fulfill) fulfill(xhr, configuration.state);
                    }
                    catch (e) {
                        if (reject) reject(e.responseJSON || e, configuration.state);
                    }
                },
                error: function (e, data, setting) {
                    if (SanteDB._globalErrorHandler(e, data, setting))
                        return;
                    var error = e.responseJSON;

                    if (reject) {
                        if (error && error.error !== undefined) // oauth2
                            reject(new Exception(error.type, error.error, error.error_description, error.caused_by), configuration.state);
                        else if (error && (error.$type === "Exception" || error.$type))
                            reject(new Exception(error.$type, error.message, error.detail, error.cause, error.stack, error.policyId, error.policyOutcome, error.rules), configuration.state);
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
* @class
* @constructor
* @summary Represents a wrapper for a SanteDB resource
* @param {any} _config The configuration object
* @param {string} _config.resource The resource that is being wrapped
* @param {APIWrapper} _config.api The API to use for this resource
*/
function ResourceWrapper(_config) {

    /**
     * @method getUrl
     * @summary Gets the URL to this resource base
     * @memberof ResourceWrapper
     */
    this.getUrl = function () {
        return `${_config.api.getUrl()}${_config.resource}`;
    };

    /**
        * @method getAsync
        * @memberof ResourceWrapper
        * @summary Retrieves a specific instance of the resource this wrapper wraps
        * @param {string} id The unique identifier of the resource to retrieve
        * @param {string} viewModel A unique state object which is passed back to the caller
        * @param {any} parms Extra parameters to pass to the get function
        * @param {any} state A unique state object which is passed back to the caller
        * @returns {Promise} The promise for the operation
        */
    this.getAsync = function (id, viewModel, query, state) {

        // Prepare query
        var url = null;
        if (id) {
            if (id.id)
                url = `${_config.resource}/${id.id}`;
            else
                url = `${_config.resource}/${id}`;

            if (id.version)
                url += `/history/${id.version}`;
        }
        else
            url = _config.resource;

        if (id && id._upstream)
            url += "?_upstream=true";

        var headers = {
            Accept: _config.accept
        };

        if (viewModel)
            headers["X-SanteDB-ViewModel"] = viewModel;
        else if (_config.viewModel)
            headers["X-SanteDB-ViewModel"] = _config.viewModel;
        else if (id && id.viewModel)
            headers["X-SanteDB-ViewModel"] = id.viewModel;

        return _config.api.getAsync({
            headers: headers,
            state: state,
            resource: url,
            query: query
        });
    };

    /**
        * @method findAsync
        * @memberof ResourceWrapper
        * @summary Queries for instances of the resource this wrapper wraps
        * @param {any} query The HDSI query to filter on
        * @param {any} viewModel The view model definition to use when loading
        * @param {any} state A unique state object which is passed back to the caller
        * @returns {Promise} The promise for the operation
        */
    this.findAsync = function (query, viewModel, state) {

        var headers = {
            Accept: _config.accept
        };

        if (viewModel)
            headers["X-SanteDB-ViewModel"] = viewModel;
        else if (_config.viewModel)
            headers["X-SanteDB-ViewModel"] = _config.viewModel;

        return _config.api.getAsync({
            headers: headers,
            query: query,
            state: state,
            resource: _config.resource
        });
    };

    /**
     * @method find
     * @memberof ResourceWrapper
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
        * @method insertAsync
        * @memberof ResourceWrapper
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
        if (data.id)
            resource += "/" + data.id;

        if (data.createdBy)
            delete (data.createdBy);
        if (data.creationTime)
            delete (data.creationTime);

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
     * @method patchAsync
     * @memberof ResourceWrapper
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

        var headers = {};
        if (etag)
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
        * @method updateAsync
        * @memberof ResourceWrapper
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

        if (data.updatedBy)
            delete (data.updatedBy);
        if (data.updatedTime)
            delete (data.updatedTime);

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
    * @method deleteAsync
    * @memberof ResourceWrapper
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
    * @method lockAsync
    * @memberof ResourceWrapper
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
    * @method unLockAsync
    * @memberof ResourceWrapper
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
    * @method touchAsync
    * @memberof ResourceWrapper
    * @summary Performs a TOUCH operation on the specified resource (updating it's creation time)
    * @param {string} id The unique identifier for the object on which the invokation is to be called
    * @param {any} state A unique state object which is passed back to the caller
    * @returns {Promise} The promise for the operation
    */
    this.touchAsync = function (id, state) {

        var headers = {
            Accept: _config.accept
        };
        if (_config.viewModel)
            headers["X-SanteDB-ViewModel"] = _config.viewModel;

        return _config.api.touchAsync({
            headers: headers,
            id: id,
            state: state,
            resource: _config.resource
        });
    };

    /**
   * @method copyAsync
   * @memberof ResourceWrapper
   * @summary Performs a COPY operation on the specified resource (creating a copy from remote)
   * @param {string} id The unique identifier for the object on which the invokation is to be called
   * @param {any} state A unique state object which is passed back to the caller
   * @returns {Promise} The promise for the operation
   */
    this.copyAsync = function (id, state) {

        var headers = {
            Accept: _config.accept
        };
        if (_config.viewModel)
            headers["X-SanteDB-ViewModel"] = _config.viewModel;

        return _config.api.copyAsync({
            headers: headers,
            id: id,
            state: state,
            resource: _config.resource
        });
    };

    /**
        * @method nullifyAsync
        * @memberof ResourceWrapper
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
        * @method cancelAsync
        * @memberof ResourceWrapper
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
     * @method findAssociatedAsync
     * @memberof ResourceWrapper
     * @summary Performs a find operation on an association
     * @description Some resources allow you to chain queries which automatically scopes the results to the container
     * @param {string} id The identifier of the object whose children you want query 
     * @param {string} property The property path you would like to filter on 
     * @param {any} query The query you want to execute
     * @returns {Promise} A promise for when the request completes
     */
    this.findAssociatedAsync = function (id, property, query, state) {

        if (!property)
            throw new Exception("ArgumentNullException", "Missing scoping property");

        var headers = {
            Accept: _config.accept
        };
        if (_config.viewModel)
            headers["X-SanteDB-ViewModel"] = _config.viewModel;

        // Prepare query
        var url = null;
        if (!id)
            url = `${_config.resource}/${property}`;
        else if (id.id)
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
     * @method addAssociatedAsync
     * @memberof ResourceWrapper
     * @summary Adds a new association to the specified parent object
     * @param {string} id The identifier of the container
     * @param {string} property The associative property you want to add the value to
     * @param {any} data The data to be added as an associative object (note: Most resources require that this object already exist)
     * @param {any} state A stateful object for callback correlation
     * @returns {Promise} A promise which is fulfilled when the request is complete
     */
    this.addAssociatedAsync = function (id, property, data, state) {

        if (!property)
            throw new Exception("ArgumentNullException", "Missing scoping property");

        var headers = {
            Accept: _config.accept
        };
        if (_config.viewModel)
            headers["X-SanteDB-ViewModel"] = _config.viewModel;

        // Prepare path
        var url = null;
        if (!id)
            url = `${_config.resource}/${property}`;
        else if (id.id)
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
     * @method removeAssociatedAsync
     * @memberof ResourceWrapper
     * @summary Removes an existing associated object from the specified scoper
     * @param {string} id The identifier of the container object
     * @param {string} property The property path from which the object is to be removed
     * @param {string} associatedId The identifier of the sub-object to be removed
     * @param {any} state A state for correlating multiple requests
     * @returns {Promise} A promise which is fulfilled when the request comletes
     */
    this.removeAssociatedAsync = function (id, property, associatedId, state) {
        if (!property)
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
        if (!id)
            url = `${_config.resource}/${property}`;
        else if (id.id)
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

    /**
     * @method getAssociatedAsync
     * @memberof ResourceWrapper
     * @summary Retrieves an existing associated object from the specified scoper
     * @param {string} id The identifier of the container object
     * @param {string} property The property path from which the object is to be retrieved
     * @param {string} associatedId The identifier of the sub-object to be retrieved
     * @param {any} state A state for correlating multiple requests
     * @returns {Promise} A promise which is fulfilled when the request comletes
     */
    this.getAssociatedAsync = function (id, property, associatedId, state) {
        if (!id)
            throw new Exception("ArgumentNullException", "Missing scoping identifier");
        else if (!property)
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

        return _config.api.getAsync({
            headers: headers,
            id: associatedId,
            state: state,
            resource: url,
            contentType: _config.accept
        });
    }
};

//if (!SanteDB) 
/**
 * @class
 * @static
 * @constructor
 * @summary SanteDB Binding Class
 * @description This class exists as a simple interface which is implemented by host implementations of the SanteDB hostable core. This interface remains the same even though the 
 *              implementations of this file on each platform (Admin, BRE, Client, etc.) are different.
 * @property {SanteDBWrapper.ApplicationApi} application Functions for accessing the core application API
 * @property {SanteDBWrapper.ResourceApi} resources Functions for accessing resource APIs
 * @property {SanteDBWrapper.ConfigurationApi} configuration Functions for accessing application configuration
 * @property {SanteDBWrapper.AuthenticationApi} authentication Functions for authentication 
 * @property {SanteDBWrapper.LocalizationApi} localization Functions related to localization
    * @property {*} api Provides direct access to API instances
    * @property {SanteDBWrapper.APIWrapper} api.hdsi Reference to the configured Health Data Service Interface helper
    * @property {SanteDBWrapper.APIWrapper} api.ami Reference to the configured Administration Management Interface helper
 */
function SanteDBWrapper() {
    "use strict";

    var _viewModelJsonMime = "application/json+sdb-viewModel";

    // Get the version of this API Wrapper
    this.getVersion = function () {
        return "2.0.36.0";
    }

    /**
     * @private
     * @summary Global error handler
     * @param {xhr} e The Errored request
     * @param {*} data 
     * @param {*} setting 
     * @param {*} err 
     */
    var _globalErrorHandler = function (data, setting, err) {
        if (data.status == 401 && data.getResponseHeader("WWW-Authenticate")) {
            if (_session && _session.exp > Date.now() // User has a session that is valid, but is still 401 hmm... elevation!!!
                && _elevator
                && !_elevator.getToken() ||
                _session == null && _elevator) {

                // Was the response a security policy exception where the back end is asking for elevation on the same user account?
                if (data.responseJSON &&
                    data.responseJSON.$type == "PolicyViolationException" &&
                    data.getResponseHeader("WWW-Authenticate").indexOf("insufficient_scope") > -1)
                    _elevator.elevate(angular.copy(_session), [data.responseJSON.policyId]);
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
     * @private
     * @summary Re-orders the JSON object properties so that $type appears as the first property
     * @param {any} object The object whose properites should be reordered
     * @returns {any} The appropriately ordered object
     */
    var _reorderProperties = function (object) {

        // Object has $type and $type is not the first property
        if (object.$type) {
            var retVal = { $type: object.$type };
            Object.keys(object).filter(function (d) { return d != "$type" })
                .forEach(function (k) {
                    retVal[k] = object[k];
                    if (!retVal[k] || k.startsWith("_"));
                    else if (retVal[k].$type) // reorder k
                        retVal[k] = _reorderProperties(retVal[k]);
                    else if (Array.isArray(retVal[k]))
                        for (var i in retVal[k])
                            if (retVal[k][i].$type)
                                retVal[k][i] = _reorderProperties(retVal[k][i]);
                })
            return retVal;
        }
        return object;
    };

    this._reorderProperties = _reorderProperties;
    this._globalErrorHandler = _globalErrorHandler;

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

    /**
     * @class
     * @constructor
     * @memberof SanteDBWrapper
     * @summary Common functions for accessing SanteDB application processes
     */
    function ApplicationApi() {

        var _idGenerators = {};
        var _resourceStates = {};
        var _idParsers = {};
        var _idClassifiers = {};
        var _templateView  ={};
        var _templateForm = {};
        
        // JWS Pattern
        var jwsDataPattern = /^(.*?)\.(.*?)\.(.*?)$/;

        /**
        * @summary Wraps native printing functionality for the host operating system
        */
        this.printView = function () {
            __SanteDBAppService.Print();
        }

        /**
         * @summary Fetches sub-templates 
         * @param {*} collection The participation or relationship property to be fetched
         * @param {*} parms The parameters to fill the template with
         * @description In some templates, sub objects will have no $type, and just a reference to a template mnemonic
         */
        async function getSubTemplates(collection, parms) {
            var promises = Object.keys(collection).map(function (key) {
                try {
                    var relationships = collection[key];

                    if (!Array.isArray(relationships))
                        collection[key] = relationships = [relationships];

                    // Actually fill out model
                    return relationships.map(async function (rel) {
                        try {

                            var targetProperty = rel.playerModel || rel.targetModel;

                            if (targetProperty && !targetProperty.classConcept && targetProperty.templateModel) {
                                var object = await _resources.template.getAsync(targetProperty.templateModel.mnemonic, "full", parms);

                                // Initialize the template 
                                if (object.tag) {
                                    Object.keys(object.tag).filter(o => o.indexOf("$copy") == 0).forEach(function (k) {
                                        var target = k.substring(6);
                                        var source = object.tag[k];

                                        // Analyze
                                        var scopedValue = object;
                                        source.split('.').forEach(function (s) { if (scopedValue) scopedValue = scopedValue[s]; });

                                        object[target] = copyObject(scopedValue, true);

                                    })
                                }

                                if (object.relationship)
                                    object.relationship = await getSubTemplates(object.relationship, parms);

                                if (rel.playerModel) {
                                    rel.playerModel = object;
                                    Object.keys(targetProperty).forEach(subKey => rel.playerModel[subKey] = rel.playerModel[subKey] || targetProperty[subKey]);
                                }
                                else {
                                    rel.targetModel = object;
                                    Object.keys(targetProperty).forEach(subKey => rel.targetModel[subKey] = rel.targetModel[subKey] || targetProperty[subKey]);
                                }

                                return true;
                            }
                            return false;
                        }
                        catch (e) {
                            console.error(`Error filling ${rel}`);
                        }
                    });
                }
                catch (e) {
                    console.error(`Error filling ${key}`);
                }
            }).flat();
            await Promise.all(promises);
            return collection;
        }

        /**
         * @method scanIdentifierAsync
         * @summary Scans a barcode using @see scanBarcodeAsync however interprets the identifier rather than returning the raw data
         * @returns {string} The interpreted barcode identifier information
         */
        this.scanIdentifierAsync = async function() {
            var data = await SanteDB.application.scanBarcodeAsync();

            if(jwsDataPattern.test(data))
            {
                var match = jwsDataPattern.exec(data);
                var idData = JSON.parse(atob(match[2]));
                return idData.id[0].value;
            }
            else 
            {
                var idDomain = SanteDB.application.classifyIdentifier(data);
                if(idDomain.length == 1)
                {
                    var parser = SanteDB.application.getIdentifierParser(idDomain[0]);
                    if(parser) data = parser(data);
                }
                return data;
            }
        }

        /**
         * @method searchByBarcodeAsync
         * @summary Performs a search using barcode data
         * @memberof SanteDBWrapper.ApplicationApi
         * @param {*} qrCodeData The QR Code data already scanned
         * @param {*} noValidate True if the barcode should not be validated
         * @param {*} upstream True if search upstream
         */
        this.searchByBarcodeAsync = async function(qrCodeData, noValidate, upstream) {
            try {
                if (!qrCodeData)
                    qrCodeData = await SanteDB.application.scanBarcodeAsync();
        
                // QR Code is a signed code
                if (jwsDataPattern.test(qrCodeData)) {
                    var result = await SanteDB.application.ptrSearchAsync(qrCodeData, !noValidate, upstream || false);
                    result.$novalidate = noValidate;
                    result.$upstream = upstream;
                    return result;
                }
                else {
        
                    var idDomain = SanteDB.application.classifyIdentifier(qrCodeData);
                    if(idDomain.length == 1)
                    {
                        var parser = SanteDB.application.getIdentifierParser(idDomain[0]);
                        if(parser) qrCodeData = parser(qrCodeData);
                    }
                    var result = await SanteDB.resources.entity.findAsync({ "identifier.value" : qrCodeData});
                    result.$search = qrCodeData;
                    return result;
                }
            }
            catch (e) {
                if(!e) // No error
                    return null;
                // Error was with validating the code
                else if (e.rules && e.rules.length > 0 && e.rules.filter(o => o.id == "jws.verification" || o.id == "jws.app" || o.id == "jws.key").length == e.rules.length) {
                    return await SanteDB.application.searchByBarcodeAsync(qrCodeData, true, upstream);
                }
                else if(!upstream && (e.$type == "KeyNotFoundException" || e.cause && e.cause.$type == "KeyNotFoundException")  && confirm(SanteDB.locale.getString("ui.emr.search.online"))) {
                    // Ask the user if they want to search upstream, only if they are allowed
                    var session = await SanteDB.authentication.getSessionInfoAsync();
        
                    if(session.method == "LOCAL") // Local session so elevate to use the principal elevator
                    {
                        var elevator = new ApplicationPrincipalElevator();
                        await elevator.elevate(session);
                        SanteDB.authentication.setElevator(elevator);
                    }
                    return await SanteDB.application.searchByBarcodeAsync(qrCodeData, true, true);
                }
                throw e;
            }
            finally {
                SanteDB.authentication.setElevator(null);
            }
        }

        /**
         * @method addResourceViewer
         * @summary Adds a new resource state to let other apps know where to go to view a resource
         * @memberof SanteDBWrapper.ApplicationApi
         * @param {string} resourceType The type of resource being viewed
         * @param {function} redirectCallback A function that directs to the appropriate state. Shoudl return true
         * @example
         * SanteDB.app.addResourceViewer("Patient", function(parms) { $state.transitionTo("my-view.patient". parms); return true; });
         */
        this.addResourceViewer = function (resourceType, redirectCallback) {
            if (!_resourceStates[resourceType])
                _resourceStates[resourceType] = [];
            _resourceStates[resourceType].push(redirectCallback);
        }

        /**
         * @method getIdentifierGenerator
         * @summary Gets a generator if one is registered for the specified domain
         * @memberof SanteDBWrapper.ApplicationApi
         * @param {string} resourceType The domain to get the generator for
         */
        this.getResourceViewer = function (resourceType) {
            return _resourceStates[resourceType];
        }

        /**
         * @summary Call the resource viewers
         * @param {*} resourceType The type of resource
         * @param {*} parms The parameters to pass
         */
        this.callResourceViewer = function (resourceType, parms) {
            var callList = _resourceStates[resourceType];
            if (callList) {
                for (var c in callList)
                    if (callList[c](parms)) return true;
            }
            return false;
        }

        /**
         * @method addIdentifierClassifier
         * @summary Adds a new classification map to the identifier 
         * @param {string} domain The domain which is being classified
         * @param {RegExp} regexClassification The classification regex
         */
        this.addIdentifierClassifier = function(domain, regexClassification) {
            _idClassifiers[domain] = regexClassification;

            if(!_idParsers[domain]) // We can implement a parser by returning the first capture group of the regex
                _idParsers[domain] = function(value) {
                    var matchData = regexClassification.exec(value);
                    if(matchData)
                    {
                        if(matchData.length > 1)
                            return matchData[1];
                        return matchData[0];
                    }
                    return value;
                }
        }

        /**
         * @method classifyIdentifier
         * @summary Attempts to guess the identifier domains to which an identifier belongs based on its format
         * @description This method is useful when you're scanning an identifier and need to know which identity domain it may belong to
         * @param {string} value The value of the identifier
         * @returns {Array} An array of potential identity domains which the value could belong to
         */
        this.classifyIdentifier = function(value) {
            return Object.keys(_idClassifiers).filter(o=>_idClassifiers[o].test(value));
        }

        /**
         * @method addIdentifierParser
         * @summary Adds a new identifier parser
         * @param {string} domain The domain to which the parser belongs
         * @param {function} parserCallback The callback function 
         * @example
         *  SanteDB.application.addIdentifierParser("DLN", function(dln, context) { 
         *      return dln.subString(0, 10);
         *  });
         */
        this.addIdentifierParser = function(domain, parserCallback) {
            _idParsers[domain] = parserCallback;
        }

        /**
         * @method getIdentifierParser
         * @summary Retrieve identifier parser for the specified domain
         * @param {string} domain The domain to which the parser belongs
         * @returns {function} The parser function
         */
        this.getIdentifierParser = function(domain) {
            return _idParsers[domain];
        }

        /**
         * @method addIdentifierGenerator
         * @summary Adds a new identifier generator 
         * @memberof SanteDBWrapper.ApplicationApi
         * @param {string} domain The domain which the generator will create identifiers for
         * @param {function} generatorCallback A function for the generator which returns the new identifier and (optionally) takes the entity for which the identifier is being generated
         */
        this.addIdentifierGenerator = function (domain, generatorCallback) {
            _idGenerators[domain] = generatorCallback;
        }

        /**
         * @method getIdentifierGenerator
         * @summary Gets a generator if one is registered for the specified domain
         * @memberof SanteDBWrapper.ApplicationApi
         * @param {string} domain The domain to get the generator for
         */
        this.getIdentifierGenerator = function (domain) {
            return _idGenerators[domain];
        }

        /**
         * @method parseException
         * @summary Parses an exception string into a local object
         * @memberof SanteDBWrapper.ApplicationApi
         * @param {string} exceptionString The exception string to be parsed
         */
        this.parseException = function (exceptionString) {
            var retVal = new Exception();
            try {
                // Server Exceptions
                var exceptionRegex = new RegExp("--SERVER\\sFAULT--(.*?)--END SERVER FAULT--", "gs");
                var result = exceptionRegex.exec(exceptionString);

                if (result) {
                    return JSON.parse(result[1]);
                }
                else {
                    exceptionRegex = new RegExp("(\\w*?Exception)\\:(.*)", "gs");
                    var result = exceptionRegex.exec(exceptionString);
                    return new Exception(result[1], result[2]);
                }
            }
            catch (e) {
                return new Exception("JavaScript", e);
            }
        }
        /**
         * @method getAppletAssetAsync
         * @summary Gets an applet object 
         * @param {string} appletId The identifier of the applet from which you want to fetch something
         * @param {string} assetPath The path within that asset to the content
         * @memberof SanteDBWrapper.ApplicationApi
         * @returns {Promise} A promise representing the fetch operation
         */
        this.getAppletAssetAsync = function (appletId, assetPath, state) {
            return new Promise(function (fulfill, reject) {
                $.ajax({
                    method: 'GET',
                    url: `/${appletId}/${assetPath}`,
                    dataType: 'text',
                    success: function (xhr, status, response) {
                        try {
                            fulfill(xhr, state);
                        }
                        catch (e) {
                            if (reject) reject(e);
                        }
                    },
                    error: function (e, data, setting) {
                        if (_globalErrorHandler(e, data, setting))
                            return;
                        reject(e);
                    }
                });
            });
        }
        /**
         * @summary Calculates the strength of the supplied password
         * @param {*} password The password
         * @memberof SanteDBWrapper.ApplicationApi
         * @returns {number} The strength of the password between 0 and 5
         * @method calculatePasswordStrength
         */
        this.calculatePasswordStrength = function (password) {
            var strength = 0;
            if (password.length >= 6) {
                strength++;
                if (password.length > 10)
                    strength++;
                if (/(?=.*[a-z])(?=.*[A-Z])/.test(password))
                    strength++;
                if (/(?:[^A-Za-z0-9]{1,})/.test(password))
                    strength++;
                if (/(?:[0-9]{1,})/.test(password))
                    strength++;
            }
            return strength;
        }
        /**
         * @summary Get the specified widgets
         * @param context The context to fetch widgets for
         * @memberof SanteDBWrapper.ApplicationApi
         * @method getWidgetsAsync
         */
        this.getWidgetsAsync = function (context, type) {
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
        }
        /**
         * @summary Gets solutions that can be installed on this appliccation
         * @method getAppSolutionsAsync
         * @memberof SanteDBWrapper.ApplicationApi
         */
        this.getAppSolutionsAsync = function () {
            return _ami.getAsync({
                resource: "AppletSolution",
                query: "_upstream=true"
            });
        }
        /**
         * @summary Closes the application or restarts it in the case of the mobile
         * @method close
         * @memberof SanteDBWrapper.ApplicationApi
         */
        this.close = function () {
            __SanteDBAppService.Close();
        }
        /**
         * @summary Instructs the back end service to perform a system upgrade
         * @returns {Promise} A promise representing the fulfillment or rejection of update
         * @method doUpdateAsync
         * @memberof SanteDBWrapper.ApplicationApi
         */
        this.doUpdateAsync = function () {
            return _app.postAsync({
                resource: "Update",
                contentType: 'application/json'
            });
        }
        /**
         * @summary Instructs the back end service to perform a compact
         * @param {boolean} takeBackup When true, instructs the back end to take a backup of data
         * @returns {Promise} A promise representing the fulfillment or rejection of update
         * @method compactAsync
         * @memberof SanteDBWrapper.ApplicationApi
         */
        this.compactAsync = function (takeBackup) {
            return _app.post({
                resource: "Data",
                data: { backup: takeBackup },
                contentType: 'application/x-www-form-urlencoded'
            });
        }
        /**
         * @summary Instructs the back end service to perform a purge of all data
         * @param {boolean} takeBackup True if the back-end should take a backup before purge
         * @returns {Promise} The promise representing the fulfillment or rejection
         * @method purgeAsync
         * @memberof SanteDBWrapper.ApplicationApi
         */
        this.purgeAsync = function (takeBackup) {
            return _app.deleteAsync({
                resource: "Data",
                data: { backup: takeBackup },
                contentType: 'application/x-www-form-urlencoded'
            });
        }
        /**
         * @summary Instructs the backend to restore the data from a backup
         * @returns {Promise} The promise representing the fulfillment or rejection
         * @method restoreAsync
         * @memberof SanteDBWrapper.ApplicationApi
         */
        this.restoreAsync = function () {
            return _app.postAsync({
                resource: "Data/Restore"
            });
        }
        /**
         * @summary Create a backup of current assets
         * @returns {Promise}
         * @param {boolean} makePublic Make the backup public 
         * @method createBackupAsync
         * @memberof SanteDBWrapper.ApplicationApi
         */
        this.createBackupAsync = function (makePublic) {
            return _app.postAsync({
                resource: "Data/Backup",
                data: { makePublic: makePublic },
                contentType: 'application/x-www-form-urlencoded'
            });
        }
        /**
         * @summary Get all backups and backup information
         * @method getBackupAsync
         * @memberof SanteDBWrapper.ApplicationApi
         * @returns {Promise} The promise representing the fulfillment or rejection
         */
        this.getBackupAsync = function () {
            return _app.getAsync({
                resource: "Data/Backup",
            });
        }
        /**
         * @summary Load a data asset from an applet's Data/ directory
         * @method loadDataAsset
         * @memberof SanteDBWrapper.ApplicationApi
         * @param {string} dataId The identifier of the data asset to load
         * @returns {string} The data asset
         */
        this.loadDataAsset = function (dataId) {
            return atob(__SanteDBAppService.GetDataAsset(dataId));
        }
        /**
         * @summary Submits a user entered bug report 
         * @method submitBugReportAsync
         * @memberof SanteDBWrapper.ApplicationApi
         * @param {any} bugReport The structured bug report to be submitted
         * @returns {Promise} The promise to fulfill or reject the request
         */
        this.submitBugReportAsync = function (bugReport) {
            return _ami.postAsync({
                contentType: "application/json",
                resource: "Sherlock",
                data: bugReport
            });
        }
        /**
         * @summary Gets a list of all logs and their information from the server
         * @method getLogInfoAsync
         * @memberof SanteDBWrapper.ApplicationApi
         * @param {string} _id The id of the log file to fetch contents of
         * @param {any} query The query filters to use / apply
         * @returns {Promise} The promise representing the async request
         */
        this.getLogInfoAsync = function (_id, query) {
            var resource = "Log";
            if (_id)
                resource += "/" + _id;

            return _ami.getAsync({
                resource: resource,
                query: query
            });
        }
        /**
         * @summary Generates a new random password
         * @method generatePassword
         * @memberof SanteDBWrapper.ApplicationApi
         * @returns {string} A new random password
         */
        this.generatePassword = function () {
            var specChars = ['@', '_', '-', '~', '!', '#', '$'];
            var secret = SanteDB.application.newGuid().replace(/-/g, function () {
                return specChars[Math.trunc(Math.random() * specChars.length)];
            });

            var repl = "";
            for (var i = 0; i < secret.length; i++)
                if (secret[i] >= 'a' && secret[i] <= 'f')
                    repl += String.fromCharCode(97 + Math.trunc(Math.random() * 24));
                else if (i % 2 == 1)
                    repl += String.fromCharCode(65 + Math.trunc(Math.random() * 24));
                else
                    repl += secret[i];

            return repl;
        }
        /**
         * @summary Create a new UUID
         * @method newGuid
         * @memberof SanteDBWrapper.ApplicationApi
         * @returns {string} A new unique UUID
         */
        this.newGuid = function () {
            return __SanteDBAppService.NewGuid();
        }
        /**
         * @summary Get application version information 
         * @method getAppInfoAsync
         * @memberof SanteDBWrapper.ApplicationApi
         * @returns {Promise} The promise from the async representation
         * @param {any} settings The settings to use for the server diagnostic report
         * @param {boolean} settings.updates When true check for updates
         * @param {boolean} settings.remote When true check the remote server
         */
        this.getAppInfoAsync = function (settings) {
            return _ami.getAsync({
                resource: "Sherlock",
                query: { _includeUpdates: (settings || {}).updates, _upstream: (settings || {}).remote }
            });
        }
        /**
         * @summary Get the online status of the application
         * @method getOnlineState
         * @memberof SanteDBWrapper.ApplicationApi
         * @returns {boolean} True if the application is online
         */
        this.getOnlineState = function () {
            return __SanteDBAppService.GetOnlineState();
        }
        /**
         * @summary Indicates whether the server's AMI is available
         * @description This command actually sends a lightweight PING function to the AMI server
         * @method isAdminAvailable
         * @memberof SanteDBWrapper.ApplicationApi
         * @returns {boolean} True if the AMI is available
         */
        this.isAdminAvailable = function () {
            return __SanteDBAppService.IsAdminAvailable();
        }
        /**
         * @summary Indicates whether the HDSI is available
         * @description This command actually sends a lightweight PING function to the HDSI server
         * @method isClinicalAvailable
         * @memberof SanteDBWrapper.ApplicationApi
         * @returns {boolean} True if the HDSI is available
         */
        this.isClinicalAvailable = function () {
            return __SanteDBAppService.IsClinicalAvailable
        }
        /**
         * @summary Resolves the HTML input form for the specified template
         * @method resolveTemplateForm
         * @memberof SanteDBWrapper.ApplicationApi
         * @returns {string} The HTML content of the input form for the specified template
         * @param {string} templateId The id of the template for which HTML input should be gathered
         */
        this.resolveTemplateForm = function (templateId) {
            return _resources.template.getAssociatedAsync(templateId, "ui", "form.html");
        }
        /**
         * @summary Resolves the HTML view for the specified template
         * @method resolveTemplateView
         * @memberof SanteDBWrapper.ApplicationApi
         * @returns {string} The HTML content of the view for the specified template
         * @param {string} templateId The id of the template for which HTML view should be gathered
         */
        this.resolveTemplateView = function (templateId) {
            return _resources.template.getAssociatedAsync(templateId, "ui", "view.html");
        }
        /**
         * @summary Get a list of all installed template definitions
         * @method getTemplateDefinitionsAsync
         * @memberof SanteDBWrapper.ApplicationApi
         * @param {any} query The filter to apply to templates
         * @returns {Array<string>} The list of template definitions
         */
        this.getTemplateDefinitionsAsync = async function (query) {
            return _resources.template.findAsync(query);
        }
        /**
         * @summary Get a list of all installed template definitions
         * @method getTemplateContentAsync
         * @memberof SanteDBWrapper.ApplicationApi
         * @param {string} templateId The ID of the template to fetch
         * @param {any} parms The parameters to pass to the template
         * @returns {any} The templated object
         */
        this.getTemplateContentAsync = async function (templateId, parms) {
            var template = await _resources.template.getAsync(templateId, "full", parms);
            if (template.relationship) { // Find relationship templates
                template.relationship = await getSubTemplates(template.relationship, parms);
            }
            if (template.participation) {
                template.participation = await getSubTemplates(template.participation, parms);
            }
            return template;
        }
        /**
         * @summary Get the version of the application host
         * @method getVersion
         * @memberof SanteDBWrapper.ApplicationApi
         * @returns {string} The version of the host this applet is running in
         */
        this.getVersion = function () {
            return __SanteDBAppService.GetVersion();
        }
        /**
         * @summary Get all available user interface menus for the current user
         * @method getMenusAsync
         * @memberof SanteDBWrapper.ApplicationApi
         * @param {string} contextName The name of the context to retrieve
         * @returns {any} A structure of menus the user is allowed to access
         */
        this.getMenusAsync = function (contextName) {
            return _app.getAsync({
                resource: "Menu",
                query: { context: contextName }
            });
        }
        /**
         * @summary Launches the camera on the device to take a picture of a barcode
         * @method scanBarcode
         * @memberof SanteDBWrapper.ApplicationApi
         * @returns {string} The scanned barcode
         */
        this.scanBarcodeAsync = function () {
            try {
                var value = __SanteDBAppService.BarcodeScan();
                if (value instanceof Promise)
                    return value;
                else
                    return new Promise(function (resolve, error) {
                        resolve(value);
                    });
            }
            catch (e) {
                console.error(e);
                throw new Exception("Exception", "error.general", e);
            }
        }
        /**
         * @method
         * @memberof SanteDBWrapper.ApplicationApi
         * @summary Show a toast to the user
         * @param {string} text The text of the toast
         */
        this.showToast = function(text) {
            try {
                __SanteDBAppService.ShowToast(text);
            }
            catch(e) {
            }
        }
        /**
         * @method
         * @memberof SanteDBWrapper.ApplicationApi
         * @summary Perform a search operation on a signed codified search. 
         * @description This search operation uses signed parameter information (acquired from barcode, message, etc.) to perform a retrieve operation if the signature has not been tampered.
         * @param {*} jwsData The JSON Web Signature data to search
         * @param {boolean} validateSignature True if the service should validate the data
         * @param {boolean} upstream True if the search should be performed against the upstream server
         */
        this.ptrSearchAsync = function (jwsData, validateSignature, upstream) {
            try {
                var configuration = {
                    resource: "_ptr",
                    query: { code: jwsData, validate: validateSignature, _upstream: upstream }
                };
                return _hdsi.searchAsync(configuration);
            }
            catch (e) {
                console.error(e);
                throw new Exception("Exception", "error.codeSearch", e);
            }
        }



    }

    /**
     * @class
     * @constructor
     * @memberof SanteDBWrapper
     * @summary Represents a wrapper for various resources on the SanteDB API
     * @property {ResourceWrapper} bundle Functions for interacting with {@link Bundle}
     * @property {ResourceWrapper} act Functions for interacting with {@link Act}
     * @property {ResourceWrapper} applicationEntity Functions for interacting with  {@link ApplicationEntity}
     * @property {ResourceWrapper} assigningAuthority Functions for interacting with {@link AssigningAuthority}
     * @property {ResourceWrapper} carePlan Functions for interacting with {@link CarePlan} 
     * @property {ResourceWrapper} codeSystem Functions for interacting with {@link CodeSystem}
     * @property {ResourceWrapper} concept Functions for interacting with {@link Concept}
     * @property {ResourceWrapper} conceptSet Functions for interacting with {@link ConceptSet}
     * @property {ResourceWrapper} configuration Functions for interacting with {@link Configuration}
     * @property {ResourceWrapper} deviceEntity Functions for interacting with {@link DeviceEntity}
     * @property {ResourceWrapper} entityRelationship Functions for interacting with {@link EntityRelationship}
     * @property {ResourceWrapper} locale Functions for interacting with {@link Locale}
     * @property {ResourceWrapper} mail Functions for interacting with {@link Mail}
     * @property {ResourceWrapper} manufacturedMaterial Functions for interacting with {@link ManufacturedMaterial}
     * @property {ResourceWrapper} material Functions for interacting with {@link Material}
     * @property {ResourceWrapper} observation Functions for interacting with {@link Observation}
     * @property {ResourceWrapper} organization Functions for interacting with {@link Organization}
     * @property {ResourceWrapper} patient Functions for interacting with {@link Patient}
     * @property {ResourceWrapper} place Functions for interacting with {@link Place}
     * @property {ResourceWrapper} provider Functions for interacting with {@link Provider}
     * @property {ResourceWrapper} queue Functions for interacting with {@link Queue}
     * @property {ResourceWrapper} referenceTerm Functions for interacting with {@link ReferenceTerm}
     * @property {ResourceWrapper} substanceAdministration Functions for interacting with {@link SubstanceAdministration}
     * @property {ResourceWrapper} task Functions for interacting with {@link Task}
     * @property {ResourceWrapper} tickle Functions for interacting with {@link Tickle}
     * @property {ResourceWrapper} userEntity Functions for interacting with {@link UserEntity}
     */
    function ResourceApi() {
        /**
        * @type {ResourceWrapper}
        * @memberof SanteDBWrapper.ResourceApi
        * @summary Represents a resource wrapper that persists bundles
        */
        this.bundle = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "Bundle",
            api: _hdsi
        });
        /**
            * @type {ResourceWrapper}
            * @memberof SanteDBWrapper.ResourceApi
            * @summary Represents an resource wrapper that interoperates with the care planner
            */
        this.carePlan = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "CarePlan",
            api: _hdsi
        });
        /**
            * @type {ResourceWrapper}
            * @memberof SanteDBWrapper.ResourceApi
            * @summary Represents the Patient Resource
            */
        this.patient = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "Patient",
            api: _hdsi
        });
        /**
            * @type {ResourceWrapper}
            * @memberof SanteDBWrapper.ResourceApi
            * @summary Represents the SubstanceAdministration Resource
            */
        this.substanceAdministration = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "SubstanceAdministration",
            api: _hdsi
        });
        /**
            * @type {ResourceWrapper}
            * @memberof SanteDBWrapper.ResourceApi
            * @summary Represents the Act Resource
            */
        this.act = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "Act",
            api: _hdsi
        });
        /**
            * @type {ResourceWrapper}
            * @summary Represents the entity resource
            * @memberof SanteDBWrapper.ResourceApi
            */
        this.entity = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "Entity",
            api: _hdsi
        });
        /**
         * @type {ResourceWrapper}
         * @summary A resource wrapper for Assigning Authorities
         * @memberof SanteDBWrapper.ResourceApi
         */
        this.assigningAuthority = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "AssigningAuthority",
            api: _ami
        });
        /**
            * @type {ResourceWrapper}
            * @summary Represents the entity relationship resource
            * @memberof SanteDBWrapper.ResourceApi
            */
        this.entityRelationship = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "EntityRelationship",
            api: _hdsi
        });
        /**
            * @type {ResourceWrapper}
            * @memberof SanteDBWrapper.ResourceApi
            * @summary Represents the Observation Resource
            */
        this.observation = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "Observation",
            api: _hdsi
        });
        /**
            * @type {ResourceWrapper}
            * @memberof SanteDBWrapper.ResourceApi
            * @summary Represents the Place Resource
            */
        this.place = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "Place",
            api: _hdsi
        });
        /**
            * @type {ResourceWrapper}
            * @memberof SanteDBWrapper.ResourceApi
            * @summary Represents the Provider Resource
            */
        this.provider = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "Provider",
            api: _hdsi
        });
        /**
            * @type {ResourceWrapper}
            * @memberof SanteDBWrapper.ResourceApi
            * @summary Represents the UserEntity Resource
            */
        this.userEntity = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "UserEntity",
            api: _hdsi
        });
        /**
            * @type {ResourceWrapper}
            * @memberof SanteDBWrapper.ResourceApi
            * @summary Represents the Organization Resource
            */
        this.organization = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "Organization",
            api: _hdsi
        });
        /**
            * @type {ResourceWrapper}
            * @memberof SanteDBWrapper.ResourceApi
            * @summary Represents the Material Resource
            */
        this.material = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "Material",
            api: _hdsi
        });
        /**
            * @type {ResourceWrapper}
            * @memberof SanteDBWrapper.ResourceApi
            * @summary Represents the ManufacturedMaterial Resource
            */
        this.manufacturedMaterial = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "ManufacturedMaterial",
            api: _hdsi
        });
        /**
            * @type {ResourceWrapper}
            * @memberof SanteDBWrapper.ResourceApi
            * @summary Represents the ManufacturedMaterial Resource
            */
        this.concept = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "Concept",
            api: _hdsi
        });
        /**
            * @type {ResourceWrapper}
            * @memberof SanteDBWrapper.ResourceApi
            * @summary Represents the ConceptSet Resource
            */
        this.conceptSet = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "ConceptSet",
            api: _hdsi
        });
        /**
            * @type {ResourceWrapper}
            * @memberof SanteDBWrapper.ResourceApi
            * @summary Represents the ReferenceTerm Resource
            */
        this.referenceTerm = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "ReferenceTerm",
            api: _hdsi
        });
        /**
            * @type {ResourceWrapper}
            * @memberof SanteDBWrapper.ResourceApi
            * @summary Represents the CodeSystem Resource
            */
        this.codeSystem = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "CodeSystem",
            api: _hdsi
        });
        /**
            * @type {ResourceWrapper}
            * @memberof SanteDBWrapper.ResourceApi
            * @summary Represents the DeviceEntity Resource
            */
        this.deviceEntity = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "DeviceEntity",
            api: _hdsi
        });
        /**
           * @type {ResourceWrapper}
           * @memberof SanteDBWrapper.ResourceApi
           * @summary Represents the UserEntity Resource
           */
        this.userEntity = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "UserEntity",
            api: _hdsi
        });
        /**
         * @type {ResourceWrapper}
         * @memberof SanteDBWrapper.ResourceApi
         * @summary Represents the Person Resource
         */
        this.person = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "Person",
            api: _hdsi
        });
        /**
            * @type {ResourceWrapper}
            * @memberof SanteDBWrapper.ResourceApi
            * @summary Represents the ApplicationEntity Resource
            */
        this.applicationEntity = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "ApplicationEntity",
            api: _hdsi
        });
        /**
            * @type {ResourceWrapper}
            * @memberof SanteDBWrapper.ResourceApi
            * @summary Gets the configuration resource
            */
        this.configuration = new ResourceWrapper({
            accept: "application/json",
            resource: "Configuration",
            api: _app
        });
        /**
            * @type {ResourceWrapper}
            * @memberof SanteDBWrapper.ResourceApi
            * @summary Gets the queue control resource
            */
        this.queue = new ResourceWrapper({
            accept: "application/json",
            resource: "Queue",
            api: _app
        });
        /**
            * @type {ResourceWrapper}
            * @memberof SanteDBWrapper.ResourceApi
            * @summary Resource wrapper which interacts with the administrative task scheduler
            */
        this.task = new ResourceWrapper({
            accept: "application/json",
            resource: "Task",
            api: _ami
        });
        /**
            * @type {ResourceWrapper}
            * @memberof SanteDBWrapper.ResourceApi
            * @summary A resource wrapper for alerts which are messages between users
            */
        this.mail = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "MailMessage",
            api: _ami
        });
        /**
            * @type {ResourceWrapper}
            * @memberof SanteDBWrapper.ResourceApi
            * @summary A wrapper which is used for fetching user notifications
            **/
        this.tickle = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "Tickle",
            api: _app
        });
        /**
            * @type {ResourceWrapper}
            * @memberof SanteDBWrapper.ResourceApi
            * @summary A wrapper for locale information which comes from the server
            */
        this.locale = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "Locale",
            api: _app
        });
        /**
         * @type {ResourceWrapper}
         * @memberOf SanteDBWrapper.resources
         * @summary Wrapper for Security USers
         */
        this.securityUser = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "SecurityUser",
            api: _ami
        });
        /**
         * @type {ResourceWrapper}
         * @memberOf SanteDBWrapper.resources
         * @summary Wrapper for Security Roles
         */
        this.securityRole = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "SecurityRole",
            api: _ami
        });
        /**
        * @type {ResourceWrapper}
        * @memberOf SanteDBWrapper.resources
        * @summary Wrapper for session information
        */
        this.sessionInfo = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "SessionInfo",
            api: _ami
        });
        /**
         * @type {ResourceWrapper}
         * @memberOf SanteDBWrapper.resources
         * @summary Wrapper for Security Devices
         */
        this.securityDevice = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "SecurityDevice",
            api: _ami
        });
        /**
         * @type {ResourceWrapper}
         * @memberOf SanteDBWrapper.resources
         * @summary Wrapper for Security Applications
         */
        this.securityApplication = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "SecurityApplication",
            api: _ami
        });
        /**
         * @type {ResourceWrapper}
         * @memberOf SanteDBWrapper.resources
         * @summary Wrapper for Security Policies
         */
        this.securityPolicy = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "SecurityPolicy",
            api: _ami
        });
        /**
         * @type {ResourceWrapper}
         * @memberOf SanteDBWrapper.resources
         * @summary Wrapper for Security Challenges
         */
        this.securityChallenge = new ResourceWrapper({
            accept: _viewModelJsonMime,
            resource: "SecurityChallenge",
            api: _ami
        });
        /**
         * @type {ResourceWrapper}
         * @memberOf SanteDBWrapper.resources
         * @summary Wrapper for provenance
         */
        this.securityProvenance = new ResourceWrapper({
            resource: "SecurityProvenance",
            api: _ami,
            accept: _viewModelJsonMime,
            viewModel: 'base'
        });
        /**
         * @type {ResourceWrapper}
         * @memberOf SanteDBWrapper.resources
         * @summary Wrapper for audit API
         */
        this.audit = new ResourceWrapper({
            resource: "Audit",
            accept: "application/json",
            api: _ami
        });
        /**
         * @type {ResourceWrapper}
         * @memberOf SanteDBWrapper.resources
         * @summary Wrapper for probe API
         */
        this.probe = new ResourceWrapper({
            resource: "Probe",
            accept: _viewModelJsonMime,
            api: _ami
        });
        /**
         * @type {ResourceWrapper}
         * @memberOf SanteDBWrapper.resources
         * @summary Wrapper for sync log API
         */
        this.sync = new ResourceWrapper({
            resource: "Sync",
            accept: _viewModelJsonMime,
            api: _app
        });
        /**
         * @type {ResourceWrapper}
         * @memberOf SanteDBWrapper.resources
         * @summary Wrapper for subscription definition API
         */
        this.subscriptionDefinition = new ResourceWrapper({
            resource: "SubscriptionDefinition",
            accept: "application/json",
            api: _ami
        });
        /**
         * @type {ResourceWrapper}
         * @memberOf SanteDBWrapper.resources
         * @summary Wrapper for subscription definition API
         */
        this.jobInfo = new ResourceWrapper({
            resource: "JobInfo",
            accept: "application/json",
            api: _ami
        });
        /**
        * @type {ResourceWrapper}
        * @memberOf SanteDBWrapper.resources
        * @summary Wrapper for templates definition API
        */
        this.template = new ResourceWrapper({
            resource: "Template",
            accept: _viewModelJsonMime,
            api: _app
        });
    };

    // HACK: Wrapper pointer facility = place
    var _resources = new ResourceApi();
    _resources.facility = _resources.place;

    // master configuration closure
    var _masterConfig = null;

    /**
     * @class
     * @constructor
     * @summary API For interacting with configuration
     * @memberof SanteDBWrapper
     */
    function ConfigurationApi() {
        /**
         * @method getDataProvidersAsync
         * @memberof SanteDBWrapper.ConfigurationApi
         * @return {Promise} The data providers
         * @summary Gets a list of data providers available on this offline provider mode
         */
        this.getDataProvidersAsync = function () {
            return _app.getAsync({
                resource: "DataProviders"
            });
        }
        /**
            * @method getAsync
         * @memberof SanteDBWrapper.ConfigurationApi
            * @summary Get the configuration, nb: this caches the configuration
            * @returns {Promise} The configuration
            */
        this.getAsync = function () {
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
        }

        /**
            * @method getAppSetting
            * @memberof SanteDBWrapper.ConfigurationApi
            * @summary Get the specified configuration key
            * @returns {string} The application key setting
            * @param {string} key The key of the setting to find
            */
        this.getAppSetting = function (key) {
            try {
                if (!_masterConfig) throw new Exception("Exception", "error.invalidOperation", "You need to call configuration.getAsync() before calling getAppSetting()");
                var _setting = _masterConfig.application.setting[key];
                if (_setting)
                    return _setting;
                else
                    return null;
            }
            catch (e) {
                if (!e.$type)
                    throw new Exception("Exception", "error.unknown", e.detail, e);
                else
                    throw e;
            }
        }

        /**
         * @method getAppSettingAsync
         * @summary Retrieve the specified application setting directly from the configuration API
         * @param {string} key The key of the setting to retrieve
         * @returns {String} The value of the setting
         */
        this.getAppSettingAsync = function(key) {
            return _resources.configuration.getAssociatedAsync("global", "setting", key)[0];
        }

        /**
         * @method getAppSettingAsync
         * @summary Retrieve the specified application setting directly from the configuration API
         * @param {string} key The key of the setting to retrieve
         * @returns {String} The value of the setting
         */
        this.setAppSettingAsync = function(key, value) {
            return _resources.configuration.addAssociatedAsync("global","setting", [{ key: key, value: value }]);
        }

        /**
            * @method  setAppSetting
            * @memberof SanteDBWrapper.ConfigurationApi
            * @summary Sets the specified application setting
            * @param {string} key The key of the setting to set
            * @param {string} value The value of the application setting
            * @see SanteDB.configuration.save To save the updated configuration
            */
        this.setAppSetting = function (key, value) {
            try {
                if (!_masterConfig) throw new Exception("Exception", "error.invalidOperation", "You need to call configuration.getAsync() before calling getAppSetting()");
                _masterConfig.application.setting[key] = value;
            }
            catch (e) {
                if (!e.$type)
                    throw new Exception("Exception", "error.unknown", e.detail, e);
                else
                    throw e;
            }
        }

        /**
            * @method getRealm
         * @memberof SanteDBWrapper.ConfigurationApi
            * @summary Gets the currently configured realm
            * @returns {string} The name of the security realm
            */
        this.getRealm = function () {
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
        }

        /**
            * @method getSection
         * @memberof SanteDBWrapper.ConfigurationApi
            * @summary Gets the specified section name
            * @param {any} name The name of the configuration section
            * @returns {any} A JSON object representing the configuration setting section
            */
        this.getSection = function (name) {
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
        }

        /**
            * @method joinRealmAsync
            * @summary Instructs the current system to join a realm
         * @memberof SanteDBWrapper.ConfigurationApi
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
        this.joinRealmAsync = function (configData, overwrite) {
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
        }
        /**
            * @method leaveRealmAsync
         * @memberof SanteDBWrapper.ConfigurationApi
            * @summary Instructs the application to remove realm configuration
            * @returns {Promise} A promise that is fulfilled when the leave operation succeeds
            */
        this.leaveRealmAsync = function () {
            return _app.deleteAsync({
                resource: "Configuration/Realm"
            });
        }
        /**
            * @method saveAsync
         * @memberof SanteDBWrapper.ConfigurationApi
            * @summary Save the configuration object
            * @param {any} configuration The configuration object to save
            * @returns {Promise} A promise object indicating whether the save was successful
            */
        this.saveAsync = function (configuration) {
            return _resources.configuration.insertAsync(configuration || _masterConfig);
        }
        /**
            * @method getUserPreferencesAsync
            * @memberof SanteDBWrapper.ConfigurationApi
            * @summary Gets the user specific preferences
            * @returns {Promise} A promise representing the retrieval of the user settings
            */
        this.getUserSettingsAsync = async function () {
            return _resources.configuration.getAssociatedAsync("user", "settings", ".*");
        }
        /**
            * @method saveUserPreferencesAsync
         * @memberof SanteDBWrapper.ConfigurationApi
            * @summary Saves the user preferences
            * @param {any} preferences A dictionary of preferences to be saved
            * @returns {Promise} A promise which indicates when preferences were saved
            * @example Save user preference for color
            * SanteDB.configuration.saveUserPreferences([
            *  { key: "color", value: "red" }
            * ]);
            */
        this.saveUserSettingsAsync = function (preferences) {
            return _resources.configuration.addAssociatedAsync("user", "settings", preferences);
        }
    };

    // Session and auth data
    var _oauthSession = null;
    var _session = null;
    var _elevator = null;

    var _authentication = new AuthenticationApi();

    /**
     * @class
     * @memberof SanteDBWrapper
     * @constructor
     * @summary Authentication API 
     */
    function AuthenticationApi() {

        // Process oauth response session data
        var _afterAuthenticate = function (oauthResponse, fulfill, reject) {
            _oauthSession = oauthResponse;
            if (oauthResponse.access_token) window.sessionStorage.setItem('token', oauthResponse.access_token || oauthResponse.token);
            if (oauthResponse.refresh_token) window.sessionStorage.setItem('refresh_token', oauthResponse.refresh_token);
            if (oauthResponse.id_token)
                try {
                    var tokenData = JSON.parse(atob(oauthResponse.id_token.split('.')[1]));
                    // Set the locale
                    if (tokenData.lang)
                        __SanteDBAppService.SetLocale(tokenData.lang);
                    else if (tokenData['http://santedb.org/claims/language'])
                        __SanteDBAppService.SetLocale(tokenData['http://santedb.org/claims/language']);

                }
                catch (e) {
                }
            _authentication.getSessionInfoAsync().then(fulfill).catch(reject);
        }

        /**
         * @summary SID for SYSTEM USER
         * @constant
         * @memberof SanteDBWrapper.AuthenticationApi
         */
        SYSTEM_USER: "fadca076-3690-4a6e-af9e-f1cd68e8c7e8";
        /**
         * @summary SID for ANONYMOUS user
         * @constant
         * @memberof SanteDBWrapper.AuthenticationApi
         */
        this.ANONYMOUS_USER = "c96859f0-043c-4480-8dab-f69d6e86696c";
        /** 
         * @enum {numeric} PolicyDecision
         * @static 
         * @memberof SanteDBWrapper.AuthenticationApi
         * @summary Policy decision structure
         */
        this.PolicyDecision = {
            Deny: 0,
            Elevate: 1,
            Grant: 2
        };
        /**
         * @method demandAsync
         * @memberof SanteDBWrapper.AuthenticationApi
         * @summary Demand permission for the specified policy
         * @param {string} policy The policy which is being demanded
         * @returns {Promise} A promise representing the fulfillment or rejection of the demand
         */
        this.demandAsync = function (policy) {
            return new Promise(function (fulfill, reject) {
                try {
                    _auth.getAsync({
                        resource: `pdp/${policy}`
                    })
                        .then(function () { fulfill(_authentication.PolicyDecision.Grant); }) // fulfillment for the PDP means grant success
                        .catch(function (e) {
                            if (e.policyOutcome)
                                fulfill(_authentication.PolicyDecision[e.policyOutcome]);
                            else
                                reject(e);
                        });
                }
                catch (e) {
                    reject(e);
                }
            });
        }
        /**
         * @method setElevator
         * @summary Sets the elevator function
         * @param {any} elevator An elevation implementation
         * @param {function():String} elevator.getToken A function to get the current token
         * @param {function(boolean):void} elevator.elevate A function to perform elevation
         * @memberof SanteDBWrapper.AuthenticationApi
         */
        this.setElevator = function (elevator) {
            _elevator = elevator;
        }
        /**
            * @method getSessionInfoAsync
            * @memberof SanteDBWrapper.AuthenticationApi
            * @returns {Promise} A promise representing the fulfillment or rejection of the get request
            * @param {boolean} forceServer When true (or supplied) instructs the function to force a server fetch of the session
            * @summary Gets the extended session information
            */
        this.getSessionInfoAsync = function (forceServer) {
            return new Promise(function (fulfill, reject) {
                if (_session && !forceServer)
                    fulfill(angular.copy(_session));
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
        }
        /**
            * @method sendTfaSecretAsync
            * @memberof SanteDBWrapper.AuthenticationApi
            * @summary Requests a two-factor authentication secret to be sent
            * @param {string} mode The mode of two-factor authentication (email, sms, etc.)
            * @returns {Promise} A promise representing the outcome of the TFA secret send
            */
        this.sendTfaSecretAsync = function (mode) {
            return _ami.postAsync({
                resource: "Tfa",
                data: { mode: mode }
            })
        }
        /**
            * @method getTfaModeAsync
            * @memberof SanteDBWrapper.AuthenticationApi
            * @summary Retrieves information about the two-factor authentication modes supported by the server
            * @returns {Promise} The promise representing the fulfillment or rejection of the get request
            */
        this.getTfaModeAsync = function () {
            return _ami.getAsync({
                resource: "Tfa"
            });
        }
        /**
        * @method challengeLoginAsync
        * @memberof SanteDBWrapper.AuthenticationApi
        * @summary Performs an extended login for the purpose of password reset (using a challenge and response)
        * @param {string} userName The name of the user which is logging in
        * @param {string} challenge The selected user challenge which is being answered
        * @param {string} response The user's response to the challenge offerred
        * @param {string} tfaSecret The two-factor secret if provided
        * @returns {Promise} A promise representing the login request
        * @description This type of grant is an extension of the oauth grants. The resulting session is only valid for changing the user's own password. No other functions will work with this token
        */
        this.challengeLoginAsync = function (userName, challenge, response, tfaSecret) {
            return new Promise(function (fulfill, reject) {
                try {
                    var headers = {};
                    if (tfaSecret)
                        headers["X-SanteDB-TfaSecret"] = tfaSecret;

                    _auth.postAsync({
                        resource: "oauth2_token",
                        data: {
                            username: userName,
                            challenge: challenge,
                            response: response,
                            grant_type: 'x_challenge',
                            scope: '*'
                        },
                        headers: headers,
                        contentType: 'application/x-www-form-urlencoded'
                    })
                        .then(function (d) {
                            fulfill(d);
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
        /**
            * @method passwordLoginAsync
            * @memberof SanteDBWrapper.AuthenticationApi
            * @summary Performs a OAUTH password login
            * @param {string} userName The name of the user which is logging in
            * @param {string} password The password of the user
            * @param {string} tfaSecret The two-factor secret if provided
            * @param {string} scope When true indicates that there should not be a persistent session (i.e. one time authentication)
            * @param {boolean} uacPrompt True if the authentication is part of a UAC prompt and no perminant session is to be 
            * @param {String} purposeOfUse The identifier of the purpose of use for the access
            * @returns {Promise} A promise representing the login request
            */
        this.passwordLoginAsync = function (userName, password, tfaSecret, uacPrompt, purposeOfUse, scope) {
            return new Promise(function (fulfill, reject) {
                try {
                    var headers = {};
                    if (tfaSecret)
                        headers["X-SanteDB-TfaSecret"] = tfaSecret;
                    if (uacPrompt && purposeOfUse)
                        headers["X-SanteDBClient-Claim"] =
                            btoa("urn:santedb:org:override=true;" +
                                "urn:oasis:names:tc:xacml:2.0:action:purpose=" + purposeOfUse)

                    _auth.postAsync({
                        resource: "oauth2_token",
                        data: {
                            username: userName,
                            password: password,
                            grant_type: 'password',
                            scope: (scope || ["*"]).join(" ")
                        },
                        headers: headers,
                        contentType: 'application/x-www-form-urlencoded'
                    })
                        .then(function (d) {
                            if (!uacPrompt) {
                                _afterAuthenticate(d, fulfill, reject);
                            }
                            else if (fulfill) fulfill(d);
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
        /**
            * @method pinLoginAsync
            * @memberof SanteDBWrapper.AuthenticationApi
            * @summary Performs a local pin login
            * @param {string} userName The name of the user which is logging in
            * @param {string} password The password of the user
            * @param {string} tfaSecret The two-factor secret if provided
            * @param {boolean} noSession When true indicates that there should not be a persistent session (i.e. one time authentication)
            * @param {String} purposeOfUse The reason the authentication is happening
            * @param {Array} scope The requested scope of the session
            * @returns {Promise} A promise representing the login request
            */
        this.pinLoginAsync = function (userName, pin, uacPrompt, purposeOfUse, tfaSecret, scope) {
            return new Promise(function (fulfill, reject) {
                try {
                    _auth.postAsync({
                        resource: "oauth2_token",
                        data: {
                            username: userName,
                            pin: pin,
                            grant_type: 'pin',
                            scope: (scope || ["*"]).join(" ")
                        },
                        headers: {
                            "X-SanteDB-TfaSecret": tfaSecret,
                            "X-SanteDBClient-Claim":
                                btoa("urn:santedb:org:override=true;" +
                                    "urn:oasis:names:tc:xacml:2.0:action:purpose=" + purposeOfUse)
                        },
                        contentType: 'application/x-www-form-urlencoded'
                    })
                        .then(function (d) {
                            if (!uacPrompt) {
                                _afterAuthenticate(d, fulfill, reject);
                            }
                            else if (fulfill) fulfill(d);
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
        /**
            * @method clientCredentialLoginAsync
            * @memberof SanteDBWrapper.AuthenticationApi
            * @summary Performs an OAUTH client credentials login
            * @description A client credentials login is a login principal which only has an application principal. This is useful for password resets, etc.
            * @returns {Promise} A promise representing the login request
            * @param {boolean} noSession When true, indicates that a session should not be replaced that the request is a one time use token
            * @param {Array} scope The list of scopes for this session
            */
        this.clientCredentialLoginAsync = function (noSession, scope) {
            return new Promise(function (fulfill, reject) {
                try {
                    _auth.postAsync({
                        resource: "oauth2_token",
                        data: {
                            grant_type: 'client_credentials',
                            scope: (scope || ["*"]).join(" ")
                        },
                        contentType: 'application/x-www-form-urlencoded'
                    })
                        .then(function (d) {
                            if (!noSession) {
                                _afterAuthenticate(d, fulfill, reject);
                            }
                            else if (fulfill) fulfill(d);
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
        /**
            * @method authorizationCodeLoginAsync
            * @memberof SanteDBWrapper.AuthenticationApi
            * @summary Performs an OAUTH authorization code grant
            * @description This function should be called *after* the authorization code has been obtained from the authorization server
            * @param {boolean} noSession When true, indicates that there should not be a persistent session created
            * @returns {Promise} A promise representing the session request
            */
        this.authorizationCodeLoginAsync = function (code, redirect_uri, noSession) {
            return new Promise(function (fulfill, reject) {
                try {
                    _auth.postAsync({
                        resource: "oauth2_token",
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
                                _oauthSession = d;
                                if (d.access_token) window.sessionStorage.setItem('token', d.access_token || d.token);
                                if (d.refresh_token) window.sessionStorage.setItem('refresh_token', d.refresh_token);
                                _authentication.getSessionInfoAsync().then(fulfill).catch(reject);
                            }
                            else if (fulfill) fulfill(d);
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
        /**
            * @method refreshLoginAsync
            * @memberof SanteDBWrapper.AuthenticationApi
            * @summary Performs a refresh token grant
            * @param {boolean} noSession True if no session should be setup
            * @returns {Promise} A promise representing the session refresh request
            */
        this.refreshLoginAsync = function () {
            return new Promise(function (fulfill, reject, noSession) {
                try {

                    var refreshToken = window.sessionStorage.getItem("refresh_token");
                    if (refreshToken) {
                        _auth.postAsync({
                            resource: "oauth2_token",
                            data: {
                                grant_type: 'refresh_token',
                                refresh_token: refreshToken,
                                scope: "*"
                            },
                            contentType: 'application/x-www-form-urlencoded'
                        })
                            .then(function (d) {
                                if (!noSession) {
                                    _oauthSession = d;
                                    _session = null;
                                    if (d.access_token) window.sessionStorage.setItem('token', d.access_token || d.token);
                                    if (d.refresh_token) window.sessionStorage.setItem('refresh_token', d.refresh_token);
                                    _authentication.getSessionInfoAsync().then(fulfill).catch(reject);
                                }
                                else if (fulfill) fulfill(d);
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
        }
        /**
            * @method setPasswordAsync
            * @memberof SanteDBWrapper.AuthenticationApi
            * @summary Sets the password of the specified user
            * @param {string} sid The security identifier of the user which is being updated
            * @param {string} userName The name of the user to set the password to
            * @param {string} passwd The password to set the currently logged in user to
            * @returns {Promise} The promise representing the fulfillment or rejection of the password change
            */
        this.setPasswordAsync = function (sid, userName, passwd) {
            if (!_session && !(_elevator && _elevator.getToken()))
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
        }
        /**
            * @method logoutAsync
            * @memberof SanteDBWrapper.AuthenticationApi
            * @summary Abandons the current SanteDB session
            * @returns {Promise} The promise representing the fulfillment or rejection of the logout request
            */
        this.logoutAsync = function () {
            return new Promise(function (fulfill, reject) {
                try {
                    _auth.deleteAsync({
                        resource: "session"
                    })
                        .then(function (d) {
                            _oauthSession = _session = null;
                            window.sessionStorage.removeItem('token');
                            window.sessionStorage.removeItem('refresh_token');
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
    /**
     * @class
     * @constructor
     * @protected
     * @memberof SanteDBWrapper
     * @summary Functions related to the localization of santedb
     */
    function LocalizationApi() {
        /**
         * @summary Default date formats
         * @property {string} year The format of year precision dates
         * @property {string} month The format of month precision dates
         * @property {string} day The format of day precision dates
         * @property {string} hour The format of hour precision dates
         * @property {string} minute The format of minute precision dates
         * @property {string} second The format of second precision dates
         */
        this.dateFormats = {
            year: 'YYYY',
            month: 'YYYY-MM',
            day: 'YYYY-MM-DD',
            hour: 'YYYY-MM-DD HH',
            minute: 'YYYY-MM-DD HH:mm',
            second: 'YYYY-MM-DD HH:mm:ss'
        };


        /**
            * @summary Gets a string from the current user interface localization
            * @memberof SanteDBWrapper.LocalizationApi
            * @method getString
            * @param {string} stringId The id of the localization string to get
            * @returns {string} The localized string
            */
        this.getString = function (stringId) {
            try {
                var retVal = __SanteDBAppService.GetString(stringId);
                return retVal || stringId;
            }
            catch (e) {
                console.error(e);
                return stringId;
            }
        }
        /**
            * @summary Get the currently configured locale
            * @memberof SanteDBWrapper.LocalizationApi
            * @method getLocale
            * @return {string} The ISO language code and country code of the application
            */
        this.getLocale = function () {
            var retVal = __SanteDBAppService.GetLocale();
            return retVal;
        }
        /**
            * @summary Get the currently configured language
            * @memberof SanteDBWrapper.LocalizationApi
            * @method getLanguage
            * @return {string} The ISO language code
            */
        this.getLanguage = function () {
            return __SanteDBAppService.GetLocale().substr(0, 2);
        };
        /**
            * @summary Get the currently configured country code
            * @memberof SanteDBWrapper.LocalizationApi
            * @method getCountry
            * @return {string} The 2 digit ISO country code
            */
        this.getCountry = function () {
            return __SanteDBAppService.GetLocale().substr(4, 2);
        };
        /**
            * @summary Set the current locale of the application
            * @memberof SanteDBWrapper.LocalizationApi
            * @method setLocale
            * @param {string} locale The ISO locale (i.e. en-US, en-CA, sw-TZ to set)
            */
        this.setLocale = function (locale) {
            return __SanteDBAppService.SetLocale(locale);
        }
        /**
            * @summary Get localization format information for the specified locale
            * @memberof SanteDBWrapper.LocalizationApi
            * @method getFormatInformationAsync
            * @param {string} locale The locale for which the format information should be retrieved
            * @returns {Promise} The promise representing the operation to fetch locale
            * @description The localization information contains formatting for currency, formatting for dates, and formatting for numbers
            */
        this.getFormatInformationAsync = function (locale) {
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
        };

    }

    // Public bindings
    /**
     * @member api
     * @property {SanteDBWrapper.APIWrapper} hdsi Reference to the configured Health Data Service Interface helper
     * @property {SanteDBWrapper.APIWrapper} ami Reference to the configured Administration Management Interface helper
     */
    this.api = {
        /**
        * @type {APIWrapper}
        * @summary Represents a property which wraps the HDSI interface
        */
        hdsi: _hdsi,
        /**
        * @type {APIWrapper}
        * @summary Represents a property which communicates with the AMI
        */
        ami: _ami,
        /**
            * @type {APIWrapper}
            * @summary Represents a property which communicates with the AUTH service
            */
        auth: _auth,
        /**
            * @type {APIWrapper}
            * @summary Represents a property which communicates with the application service
         */
        app: _app
    };

    /**
     * @memberof SanteDBWrapper
     * @summary Provide access to localization data
     * @type {LocalizationApi}
     */
    this.locale = new LocalizationApi();
    /**
        * @type {ResourceApi}
        * @memberof SanteDBWrapper
        * @summary Provides access to resource handlers
        */
    this.resources = _resources;
    /**
        * @summary Configuration routines for SanteDB
        * @memberof SanteDBWrapper
        * @type {ConfigurationApi}
        */
    this.configuration = new ConfigurationApi();
    /**
        * @summary Authentication functions for SanteDB
        * @memberof SanteDBWrapper
        * @type {AuthenticationApi}
        */
    this.authentication = _authentication;

    /**
     * @type {ApplicationApi}
     */
    this.application = new ApplicationApi();

    // Application magic 
    var _magic = null;

    // Setup JQuery to send up authentication and cookies!
    $.ajaxSetup({
        cache: false,
        beforeSend: function (data, settings) {

            if (!settings.noAuth) {
                var elevatorToken = _elevator ? _elevator.getToken() : null;
                if (elevatorToken) {
                    data.setRequestHeader("Authorization", "BEARER " +
                        elevatorToken);
                }
                else if (window.sessionStorage.getItem('token'))
                    data.setRequestHeader("Authorization", "BEARER " +
                        window.sessionStorage.getItem("token"));
                if (!_magic)
                    _magic = __SanteDBAppService.GetMagic();
                
            }
            data.setRequestHeader("X-SdbLanguage", SanteDB.locale.getLocale()); // Set the UI locale
            data.setRequestHeader("X-SdbMagic", _magic);
        },
        converters: {
            "text json": function (data) {
                return $.parseJSON(data, true);
            }
        }
    });

};

/**
 * @type {SanteDBWrapper}
 * @global
 */
var SanteDB = new SanteDBWrapper();



/**
 * @summary Represents an elevator implementation that authenticates as the device principal
 * @constructor
 * @class
 */
function ApplicationPrincipalElevator(multiuse) {

    var _token = null;
    var _consumed = false;
    /**
     * @method
     * @returns {String} The current elevation token
     * @summary Gets the elevation token
     */
    this.getToken = function () {
        if (!multiuse && _consumed) return null;
        else {
            _consumed = true;
            return _token;
        }
    }

    /**
     * @method
     * @summary Shows the elevation dialog and then performs the continueWith
     * @param {any} useSession The current session, passed when and if a pou is required and not a change of login
     */
    this.elevate = function (sessionToUse) {
        if (!sessionToUse)
            throw new Exception("SecurityException", "err.nosession");

        // The application credential can only be used when we already have a session
        return SanteDB.authentication.clientCredentialLoginAsync(true)
            .then(function (session) {
                _token = session.access_token || session.token;
            });
    }
}