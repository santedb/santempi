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

// SanteDB.Core.Model.NonVersionedEntityData, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!NonVersionedEntityData)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Updateable entity data which is not versioned            
 * @property {Date} updatedTime            Gets or sets the creation time in XML format            
 * @property {Date} modifiedOn            Gets the time this item was modified            
 * @property {string} updatedBy            Gets or sets the created by identifier            
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {NonVersionedEntityData} copyData Copy constructor (if present)
 */
function NonVersionedEntityData (copyData) { 
	this.$type = 'NonVersionedEntityData';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {string} */
	this.updatedBy = copyData.updatedBy;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {Date} */
	this.updatedTime = copyData.updatedTime;
	}
}  // NonVersionedEntityData 
// SanteDB.Core.Model.Warehouse.DatamartDefinition, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!DatamartDefinition)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents a datamart definition which contains the definition of fields for a datamart            
 * @property {string} id            Gets or sets the identifier of the data mart            
 * @property {string} name            Gets or sets the name of the data mart            
 * @property {Date} creationTime            Gets or sets the time that the data mart was created            
 * @property {DatamartSchema} schema            Gets or sets the datamart schema            
 * @param {DatamartDefinition} copyData Copy constructor (if present)
 */
function DatamartDefinition (copyData) { 
	this.$type = 'DatamartDefinition';
	if(copyData) {
	/** @type {DatamartSchema} */
	this.schema = copyData.schema;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {string} */
	this.name = copyData.name;
	/** @type {string} */
	this.id = copyData.id;
	}
}  // DatamartDefinition 
// SanteDB.Core.Model.Warehouse.DatamartSchema, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!DatamartSchema)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents a datamart schema which gives hints to the properties to be stored from             a dynamic object            
 * @property {string} id            Gets or sets the unique identifier for the schema itself            
 * @property {string} name            Gets or sets the name of the element in the database            
 * @property {DatamartSchemaProperty} property            Gets or sets the property names for the schema element            
 * @property {DatamartStoredQuery} sqp            Gets or sets the query associated with the schema            
 * @param {DatamartSchema} copyData Copy constructor (if present)
 */
function DatamartSchema (copyData) { 
	this.$type = 'DatamartSchema';
	if(copyData) {
	/** @type {DatamartStoredQuery} */
	this.sqp = copyData.sqp;
	/** @type {DatamartSchemaProperty} */
	this.property = copyData.property;
	/** @type {string} */
	this.name = copyData.name;
	/** @type {string} */
	this.id = copyData.id;
	}
}  // DatamartSchema 
// SanteDB.Core.Model.Warehouse.DatamartSchemaProperty, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!DatamartSchemaProperty)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents a single property on the data mart schema            
 * @property {string} id            Gets or sets the identifier of the warehouse property            
 * @property {string} name            Gets or sets the name of the property            
 * @property {SchemaPropertyType} type            Gets or sets the type of property            (see: {@link SchemaPropertyType} for values)
 * @property {SchemaPropertyAttributes} attributes            Gets or sets the attributes associated with the property            (see: {@link SchemaPropertyAttributes} for values)
 * @property {DatamartSchemaProperty} property            Gets or sets the sub-properties of this property            
 * @param {DatamartSchemaProperty} copyData Copy constructor (if present)
 */
function DatamartSchemaProperty (copyData) { 
	this.$type = 'DatamartSchemaProperty';
	if(copyData) {
	/** @type {DatamartSchemaProperty} */
	this.property = copyData.property;
	/** @type {SchemaPropertyAttributes} */
	this.attributes = copyData.attributes;
	/** @type {SchemaPropertyType} */
	this.type = copyData.type;
	/** @type {string} */
	this.name = copyData.name;
	/** @type {string} */
	this.id = copyData.id;
	}
}  // DatamartSchemaProperty 
// SanteDB.Core.Model.Warehouse.DatamartStoredQuery, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!DatamartStoredQuery)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents a stored query creation statement            
 * @property {string} connection            Attachments            
 * @property {string} id            Gets or sets the provider identifier            
 * @property {string} name            Definition of the query            
 * @property {DatamartSchemaProperty} property            Gets or sets the property names for the schema element            
 * @property {DatamartStoredQueryDefinition} select            Definition of the query            
 * @param {DatamartStoredQuery} copyData Copy constructor (if present)
 */
function DatamartStoredQuery (copyData) { 
	this.$type = 'DatamartStoredQuery';
	if(copyData) {
	/** @type {DatamartStoredQueryDefinition} */
	this.select = copyData.select;
	/** @type {DatamartSchemaProperty} */
	this.property = copyData.property;
	/** @type {string} */
	this.name = copyData.name;
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.connection = copyData.connection;
	}
}  // DatamartStoredQuery 
// SanteDB.Core.Model.Warehouse.DatamartStoredQueryDefinition, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!DatamartStoredQueryDefinition)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents the SQL for an actual query            
 * @property {string} provider            Provider identifier            
 * @property {string} sql            The SQL             
 * @param {DatamartStoredQueryDefinition} copyData Copy constructor (if present)
 */
function DatamartStoredQueryDefinition (copyData) { 
	this.$type = 'DatamartStoredQueryDefinition';
	if(copyData) {
	/** @type {string} */
	this.sql = copyData.sql;
	/** @type {string} */
	this.provider = copyData.provider;
	}
}  // DatamartStoredQueryDefinition 
// SanteDB.Core.Model.Warehouse.DataWarehouseObjectPropertyValue, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!DataWarehouseObjectPropertyValue)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Warehouse object property value            
 * @param {DataWarehouseObjectPropertyValue} copyData Copy constructor (if present)
 */
function DataWarehouseObjectPropertyValue (copyData) { 
	this.$type = 'DataWarehouseObjectPropertyValue';
	if(copyData) {
	}
}  // DataWarehouseObjectPropertyValue 
// SanteDB.Core.Model.Warehouse.DataWarehouseObject, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!DataWarehouseObject)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Data warehousing object wrapper             
 * @property {DataWarehouseObjectPropertyValue} p            Gets or sets the properties            
 * @param {DataWarehouseObject} copyData Copy constructor (if present)
 */
function DataWarehouseObject (copyData) { 
	this.$type = 'DataWarehouseObject';
	if(copyData) {
	/** @type {DataWarehouseObjectPropertyValue} */
	this.p = copyData.p;
	}
}  // DataWarehouseObject 
// SanteDB.Core.Model.Security.SecurityApplication, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!SecurityApplication)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends SecurityEntity
 * @summary             Represents a security application            
 * @property {string} applicationSecret            Gets or sets the application secret used for authenticating the application            
 * @property {string} name            Gets or sets the name of the security device/user/role/device.            
 * @property {Date} updatedTime            Gets or sets the creation time in XML format            
 * @property {Date} modifiedOn            Gets the time this item was modified            
 * @property {string} updatedBy            Gets or sets the created by identifier            
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {SecurityApplication} copyData Copy constructor (if present)
 */
function SecurityApplication (copyData) { 
	this.$type = 'SecurityApplication';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {string} */
	this.updatedBy = copyData.updatedBy;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {Date} */
	this.updatedTime = copyData.updatedTime;
	/** @type {string} */
	this.name = copyData.name;
	/** @type {string} */
	this.applicationSecret = copyData.applicationSecret;
	}
}  // SecurityApplication 
// SanteDB.Core.Model.Security.SecurityDevice, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!SecurityDevice)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends SecurityEntity
 * @summary             Represents a security device            
 * @property {string} deviceSecret            Gets or sets the device secret            
 * @property {string} name            Gets or sets the name of the security device/user/role/devie            
 * @property {Date} updatedTime            Gets or sets the creation time in XML format            
 * @property {Date} modifiedOn            Gets the time this item was modified            
 * @property {string} updatedBy            Gets or sets the created by identifier            
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {SecurityDevice} copyData Copy constructor (if present)
 */
function SecurityDevice (copyData) { 
	this.$type = 'SecurityDevice';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {string} */
	this.updatedBy = copyData.updatedBy;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {Date} */
	this.updatedTime = copyData.updatedTime;
	/** @type {string} */
	this.name = copyData.name;
	/** @type {string} */
	this.deviceSecret = copyData.deviceSecret;
	}
}  // SecurityDevice 
// SanteDB.Core.Model.Security.SecurityEntity, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!SecurityEntity)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends NonVersionedEntityData
 * @summary             Security Entity base class            
 * @property {Date} updatedTime            Gets or sets the creation time in XML format            
 * @property {Date} modifiedOn            Gets the time this item was modified            
 * @property {string} updatedBy            Gets or sets the created by identifier            
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {SecurityEntity} copyData Copy constructor (if present)
 */
function SecurityEntity (copyData) { 
	this.$type = 'SecurityEntity';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {string} */
	this.updatedBy = copyData.updatedBy;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {Date} */
	this.updatedTime = copyData.updatedTime;
	}
}  // SecurityEntity 
// SanteDB.Core.Model.Security.SecurityPolicy, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!SecurityPolicy)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents a simply security policy            
 * @property {string} handler            Gets or sets the handler which may handle this policy            
 * @property {string} name            Gets or sets the name of the policy            
 * @property {string} oid            Gets or sets the universal ID            
 * @property {boolean} isPublic            Whether the property is public            
 * @property {boolean} canOverride            Whether the policy can be elevated over            
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {SecurityPolicy} copyData Copy constructor (if present)
 */
function SecurityPolicy (copyData) { 
	this.$type = 'SecurityPolicy';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {boolean} */
	this.canOverride = copyData.canOverride;
	/** @type {boolean} */
	this.isPublic = copyData.isPublic;
	/** @type {string} */
	this.oid = copyData.oid;
	/** @type {string} */
	this.name = copyData.name;
	/** @type {string} */
	this.handler = copyData.handler;
	}
}  // SecurityPolicy 
// SanteDB.Core.Model.Security.SecurityPolicyInstance, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!SecurityPolicyInstance)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents a security policy instance            
 * @property {Date} modifiedOn
 * @property {string} source
 * @property {SecurityEntity} sourceModel [Delay loaded from source], 
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {SecurityPolicyInstance} copyData Copy constructor (if present)
 */
function SecurityPolicyInstance (copyData) { 
	this.$type = 'SecurityPolicyInstance';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {SecurityEntity} */
	this.sourceModel = copyData.sourceModel;
	/** @type {string} */
	this.source = copyData.source;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	}
}  // SecurityPolicyInstance 
// SanteDB.Core.Model.Security.SecurityRole, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!SecurityRole)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends SecurityEntity
 * @summary             Security role            
 * @property {string} name            Gets or sets the name of the security role            
 * @property {string} description            Description of the role            
 * @property {Date} updatedTime            Gets or sets the creation time in XML format            
 * @property {Date} modifiedOn            Gets the time this item was modified            
 * @property {string} updatedBy            Gets or sets the created by identifier            
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {SecurityRole} copyData Copy constructor (if present)
 */
function SecurityRole (copyData) { 
	this.$type = 'SecurityRole';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {string} */
	this.updatedBy = copyData.updatedBy;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {Date} */
	this.updatedTime = copyData.updatedTime;
	/** @type {string} */
	this.description = copyData.description;
	/** @type {string} */
	this.name = copyData.name;
	}
}  // SecurityRole 
// SanteDB.Core.Model.Security.SecurityUser, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!SecurityUser)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends SecurityEntity
 * @summary             Security user represents a user for the purpose of security             
 * @property {string} email            Gets or sets the email address of the user            
 * @property {boolean} emailConfirmed            Gets or sets whether the email address is confirmed            
 * @property {number} invalidLoginAttempts            Gets or sets the number of invalid login attempts by the user            
 * @property {string} lockout            Gets or sets the creation time in XML format            
 * @property {string} password            Gets or sets whether the password hash is enabled            
 * @property {string} securityStamp            Gets or sets whether the security has is enabled            
 * @property {boolean} twoFactorEnabled            Gets or sets whether two factor authentication is required            
 * @property {string} userName            Gets or sets the logical user name ofthe user            
 * @property {Array<byte>} photo            Gets or sets the binary representation of the user's photo            
 * @property {Date} lastLoginTime            Gets or sets the creation time in XML format            
 * @property {string} phoneNumber            Gets or sets the patient's phone number            
 * @property {boolean} phoneNumberConfirmed            Gets or sets whether the phone number was confirmed            
 * @property {string} userClass            Gets or sets the user class key            (see: {@link UserClassKeys} for values)
 * @property {Date} updatedTime            Gets or sets the creation time in XML format            
 * @property {Date} modifiedOn            Gets the time this item was modified            
 * @property {string} updatedBy            Gets or sets the created by identifier            
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {SecurityUser} copyData Copy constructor (if present)
 */
function SecurityUser (copyData) { 
	this.$type = 'SecurityUser';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {string} */
	this.updatedBy = copyData.updatedBy;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {Date} */
	this.updatedTime = copyData.updatedTime;
	/** @type {string} */
	this.userClass = copyData.userClass;
	/** @type {boolean} */
	this.phoneNumberConfirmed = copyData.phoneNumberConfirmed;
	/** @type {string} */
	this.phoneNumber = copyData.phoneNumber;
	/** @type {Date} */
	this.lastLoginTime = copyData.lastLoginTime;
	/** @type {Array<byte>} */
	this.photo = copyData.photo;
	/** @type {string} */
	this.userName = copyData.userName;
	/** @type {boolean} */
	this.twoFactorEnabled = copyData.twoFactorEnabled;
	/** @type {string} */
	this.securityStamp = copyData.securityStamp;
	/** @type {string} */
	this.password = copyData.password;
	/** @type {string} */
	this.lockout = copyData.lockout;
	/** @type {number} */
	this.invalidLoginAttempts = copyData.invalidLoginAttempts;
	/** @type {boolean} */
	this.emailConfirmed = copyData.emailConfirmed;
	/** @type {string} */
	this.email = copyData.email;
	}
}  // SecurityUser 
// SanteDB.Core.Model.Roles.Patient, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!Patient)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends Person
 * @summary             Represents an entity which is a patient            
 * @property {Date} deceasedDate            Deceased date XML            
 * @property {DatePrecision} deceasedDatePrecision            Gets or sets the precision of the date of deceased            (see: {@link DatePrecision} for values)
 * @property {number} multipleBirthOrder            Gets or sets the multiple birth order of the patient             
 * @property {string} genderConcept            Gets or sets the gender concept key            
 * @property {Concept} genderConceptModel [Delay loaded from genderConcept],             Gets or sets the gender concept            
 * @property {DatePrecision} dateOfBirthPrecision            Gets or sets the precision ofthe date of birth            (see: {@link DatePrecision} for values)
 * @property {string} dateOfBirth            Gets the date of birth as XML            
 * @property {PersonLanguageCommunication} language            Gets the person's languages of communication            
 * @property {object} address            Gets a list of all addresses associated with the entity            
 * @property {EntityAddress} address.Alphabetic             Represents an alphabetic address used for matching             
 * @property {EntityAddress} address.BadAddress             Represents a bad address, i.e. an address which is old or invalid.            
 * @property {EntityAddress} address.Direct             Represents a workplace address that reaches the person directly without intermediaries.            
 * @property {EntityAddress} address.HomeAddress             The home address            
 * @property {EntityAddress} address.Ideographic             Represents an address expressed in an ideographic manner (example: Kanji)            
 * @property {EntityAddress} address.Phonetic             Represents an address expressed as a phonetic spelling of an ideographic address            
 * @property {EntityAddress} address.PhysicalVisit             The address is a physical place where visits should occur            
 * @property {EntityAddress} address.PostalAddress             The address is a postal address used for the delivery of mail and materials            
 * @property {EntityAddress} address.PrimaryHome             Represents a primary address to reach a contact after business hours.            
 * @property {EntityAddress} address.Public             Represents an address that is a standard address that may be subject to a switchboard or operator prior to reaching the intended entity.            
 * @property {EntityAddress} address.Soundex             Represents an address used for soundex matching purposes.            
 * @property {EntityAddress} address.Syllabic             Represents a syllabic address.            
 * @property {EntityAddress} address.TemporaryAddress             Represents a temporary address that may be good for visiting or mailing.            
 * @property {EntityAddress} address.VacationHome             Represents a vacation home to reach a person while on vacation.            
 * @property {EntityAddress} address.WorkPlace             Represents an office address, should be used for business communications            
 * @property {EntityAddress} address.$other Unclassified
 * @property {Concept} classConceptModel [Delay loaded from classConcept],             Class concept datal load property            
 * @property {string} classConcept            Class concept            (see: {@link EntityClassKeys} for values)
 * @property {Act} creationActModel [Delay loaded from creationAct],             Creation act reference            
 * @property {string} creationAct            Creation act reference            
 * @property {Concept} determinerConceptModel [Delay loaded from determinerConcept],             Determiner concept            
 * @property {string} determinerConcept            Determiner concept            (see: {@link DeterminerKeys} for values)
 * @property {object} extension            Gets a list of all extensions associated with the entity            
 * @property {string} extension.classifier  where classifier is from {@link Extension} extensionType
 * @property {object} identifier            Gets the identifiers associated with this entity            
 * @property {EntityIdentifier} identifier.classifier  where classifier is from {@link IdentifierBase} authority
 * @property {object} name            Gets a list of all names associated with the entity            
 * @property {EntityName} name.Alphabetic             The name used is an alphabetic representation of the name (ex: romaji in Japanese)            
 * @property {EntityName} name.Anonymous             The name is an anonymous name for the object (not the real name but a name used for care delivery)            
 * @property {EntityName} name.Artist             The name represents an artist name or stage name            
 * @property {EntityName} name.Assigned             The name represents an assigned name (given or bestowed by an authority)            
 * @property {EntityName} name.Ideographic             THe name represents an ideographic representation of the name            
 * @property {EntityName} name.Indigenous             The name is an indigenous name or tribal name for the patient            
 * @property {EntityName} name.Legal             The name represents the current legal name of an object (such as a corporate name)            
 * @property {EntityName} name.License             The name represents a name as displayed on a license or known to a license authority            
 * @property {EntityName} name.MaidenName             THe name is a maiden name (name of a patient before marriage)            
 * @property {EntityName} name.OfficialRecord             The name as it appears on an official record            
 * @property {EntityName} name.Phonetic             The name represents a phonetic representation of a name such as a SOUNDEX code            
 * @property {EntityName} name.Pseudonym             The name is a pseudonym for the object or an synonym name            
 * @property {EntityName} name.Religious             The name is to be used for religious purposes (such as baptismal name)            
 * @property {EntityName} name.Search             The name is to be used in the performing of matches only            
 * @property {EntityName} name.Soundex             The name represents the computed soundex code of a name            
 * @property {EntityName} name.Syllabic             The name represents a syllabic name.            
 * @property {EntityName} name.$other Unclassified
 * @property {string} note            Gets a list of all notes associated with the entity            
 * @property {object} participation            Gets the acts in which this entity participates            
 * @property {ActParticipation} participation.Admitter             The player entity was the person who was responsible for admitting the patient into a facility or care scenario.            
 * @property {ActParticipation} participation.Attender             The player entity represents the attending physician for the patient            
 * @property {ActParticipation} participation.Authenticator             The player entity represents an entity which authenticates the provision of care            
 * @property {ActParticipation} participation.Authororiginator             The player entity is responsible for the creation of data described in the act            
 * @property {ActParticipation} participation.Baby             The player is a resultant person in that it was the baby             
 * @property {ActParticipation} participation.Beneficiary             The player is a beneficiary of the act such a receiver of a financial instrument, or other good            
 * @property {ActParticipation} participation.CallbackContact             The player entity represents something that should be contacted upon completion of the act            
 * @property {ActParticipation} participation.CausativeAgent             The player entity is an agent which caused the act to occur            
 * @property {ActParticipation} participation.Consultant             The player entity is acting as a consult to the carrying out of the act            
 * @property {ActParticipation} participation.Consumable             The player entity was or is to be consumed during the process of carrying out the act.            
 * @property {ActParticipation} participation.CoverageTarget             The player entity represents the target coverage entity of the act            
 * @property {ActParticipation} participation.Custodian             The player entity is the data custodian of the act (is responsible for storing and securing the act)            
 * @property {ActParticipation} participation.DataEnterer             The player entity represents the person or device which phisically entered the data at the terminal            
 * @property {ActParticipation} participation.Destination             The player etity represents the ultimate destination of the goods/materials/services described in the act            
 * @property {ActParticipation} participation.Device             The player entity represents the device on which the act or data from the act was acquired or recorded            
 * @property {ActParticipation} participation.DirectTarget             The player entity represents the directed target of care provided in the act            
 * @property {ActParticipation} participation.Discharger             The player entity represents the person who is responsible for the discharging of the patient from an encounter            
 * @property {ActParticipation} participation.Distributor             The player entity is the source distribution point for the financial or material instruments contained in the message            
 * @property {ActParticipation} participation.Donor             The player entity represents the donor of tissue or materials used in the act            
 * @property {ActParticipation} participation.EntryLocation             The location where the act was entered.            
 * @property {ActParticipation} participation.Escort             The player entity was responsible for escorting the patient during the course of the act            
 * @property {ActParticipation} participation.Exposure             The player entity something to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureAgent             The player entity represents the agent (material) to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureSource             The player entity describes the source of the material to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureTarget             The player entity describes the target to which the agent was exposed            
 * @property {ActParticipation} participation.GuarantorParty             The player represents a party which is used as a financial guarantor for payment in the carrying out of the act            
 * @property {ActParticipation} participation.Holder             The player is responsible for holding the act            
 * @property {ActParticipation} participation.IndirectTarget             The entity not directly present in the act but which will be the focust of th act.            
 * @property {ActParticipation} participation.Informant             The player was a person or device which informed data presented in the act. (Example: A mother telling a nurse that their child had a reaction)            
 * @property {ActParticipation} participation.InformationRecipient             The player entity represents something that should be cc'ed on the act            
 * @property {ActParticipation} participation.LegalAuthenticator             The player entity is responsible for legally authenticating the content of the act            
 * @property {ActParticipation} participation.Location             The location where the service was performed.            
 * @property {ActParticipation} participation.NonreuseableDevice             The player represents a consumable that can no longer be used            
 * @property {ActParticipation} participation.Origin             The player represents the origin of the act            
 * @property {ActParticipation} participation.Participation             The player entity participates in the act in no particular classification            
 * @property {ActParticipation} participation.Performer             The player entity is responsible for performing the clinical steps documented in the act            
 * @property {ActParticipation} participation.PrimaryInformationRecipient             The player entity represents a high priority contact which should be informed or cc'ed on the act            
 * @property {ActParticipation} participation.PrimaryPerformer             The player entity was the primary performer of the act. This is used in procedures where more than one performer is present            
 * @property {ActParticipation} participation.Product             The player represents a product that is not necessarily consumed but informs the act            
 * @property {ActParticipation} participation.Receiver             The player represents the entity which is the intended receiver of the act            
 * @property {ActParticipation} participation.RecordTarget             The player represents the entity to which the act is recorded against            
 * @property {ActParticipation} participation.ReferredBy             The player represents the entity which referred the act or caused the act to be undertaken            
 * @property {ActParticipation} participation.ReferredTo             The player entity represents the entity which was referred to            
 * @property {ActParticipation} participation.Referrer             The player entity represents the person who was originally the referrer.            
 * @property {ActParticipation} participation.Remote             The player entity represents a remote portion of the act            
 * @property {ActParticipation} participation.ResponsibleParty             The player entity is ultimately responsible for the carrying out of the act            
 * @property {ActParticipation} participation.ReusableDevice             The player entity represents a device which can be reused in future acts            
 * @property {ActParticipation} participation.SecondaryPerformer             The secondary performing person (support clinician).            
 * @property {ActParticipation} participation.Specimen             The player entity represents a specimen collected for the purpose of testing and diagnosis            
 * @property {ActParticipation} participation.Subject             The player entity is the subject of an act, but not necessarily the record target (meaning the act is about a particular entity but not to be attached to their record)            
 * @property {ActParticipation} participation.Tracker             The player entity is responsible for tracking the progress of the act            
 * @property {ActParticipation} participation.Transcriber             The person who transcribed data from the original act.            
 * @property {ActParticipation} participation.UgentNotificationContact             The player entity represents a contact entity in case of an emergency occurs during the act.            
 * @property {ActParticipation} participation.Verifier             The player entity was responsible for verifying the accuracy of the data in the act            
 * @property {ActParticipation} participation.Via             The player entity represents an entity where the act occurred "via" this entity (i.e. in transport)            
 * @property {ActParticipation} participation.Witness             The player entity represents a legal witness to the act occurring.            
 * @property {ActParticipation} participation.$other Unclassified
 * @property {object} relationship            Gets a list of all associated entities for this entity            
 * @property {EntityRelationship} relationship.Access             The access            
 * @property {EntityRelationship} relationship.ActiveMoiety             The active moiety            
 * @property {EntityRelationship} relationship.AdministerableMaterial             The administerable material            
 * @property {EntityRelationship} relationship.AdoptedChild             The adopted child            
 * @property {EntityRelationship} relationship.AdoptedDaughter             The adopted daughter            
 * @property {EntityRelationship} relationship.AdoptedSon             The adopted son            
 * @property {EntityRelationship} relationship.Affiliate             The affiliate            
 * @property {EntityRelationship} relationship.Agent             The agent            
 * @property {EntityRelationship} relationship.Aliquot             The aliquot            
 * @property {EntityRelationship} relationship.Assigned             The assigned            
 * @property {EntityRelationship} relationship.AssignedEntity             The assigned entity            
 * @property {EntityRelationship} relationship.Aunt             The aunt            
 * @property {EntityRelationship} relationship.Birthplace             The birthplace            
 * @property {EntityRelationship} relationship.Brother             The brother            
 * @property {EntityRelationship} relationship.Brotherinlaw             The brotherinlaw            
 * @property {EntityRelationship} relationship.Caregiver             The caregiver            
 * @property {EntityRelationship} relationship.CaseSubject             The case subject            
 * @property {EntityRelationship} relationship.Child             The child            
 * @property {EntityRelationship} relationship.ChildInlaw             The child inlaw            
 * @property {EntityRelationship} relationship.Citizen             The citizen            
 * @property {EntityRelationship} relationship.Claimant             The claimant            
 * @property {EntityRelationship} relationship.ClinicalResearchInvestigator             The clinical research investigator            
 * @property {EntityRelationship} relationship.ClinicalResearchSponsor             The clinical research sponsor            
 * @property {EntityRelationship} relationship.CommissioningParty             The commissioning party            
 * @property {EntityRelationship} relationship.Contact             The contact            
 * @property {EntityRelationship} relationship.Cousin             The cousin            
 * @property {EntityRelationship} relationship.CoverageSponsor             The coverage sponsor            
 * @property {EntityRelationship} relationship.CoveredParty             The covered party            
 * @property {EntityRelationship} relationship.Daughter             The daughter            
 * @property {EntityRelationship} relationship.DaughterInlaw             The daughter inlaw            
 * @property {EntityRelationship} relationship.DedicatedServiceDeliveryLocation             The dedicated service delivery location            
 * @property {EntityRelationship} relationship.Dependent             The dependent            
 * @property {EntityRelationship} relationship.DistributedMaterial             The distributed material            
 * @property {EntityRelationship} relationship.DomesticPartner             The domestic partner            
 * @property {EntityRelationship} relationship.EmergencyContact             The emergency contact            
 * @property {EntityRelationship} relationship.Employee             The employee            
 * @property {EntityRelationship} relationship.ExposedEntity             The exposed entity            
 * @property {EntityRelationship} relationship.FamilyMember             The family member            
 * @property {EntityRelationship} relationship.Father             The father            
 * @property {EntityRelationship} relationship.Fatherinlaw             The fatherinlaw            
 * @property {EntityRelationship} relationship.FosterChild             The foster child            
 * @property {EntityRelationship} relationship.FosterDaughter             The foster daughter            
 * @property {EntityRelationship} relationship.FosterSon             The foster son            
 * @property {EntityRelationship} relationship.Grandchild             The grandchild            
 * @property {EntityRelationship} relationship.Granddaughter             The granddaughter            
 * @property {EntityRelationship} relationship.Grandfather             The grandfather            
 * @property {EntityRelationship} relationship.Grandmother             The grandmother            
 * @property {EntityRelationship} relationship.Grandparent             The grandparent            
 * @property {EntityRelationship} relationship.Grandson             The grandson            
 * @property {EntityRelationship} relationship.GreatGrandfather             The great grandfather            
 * @property {EntityRelationship} relationship.GreatGrandmother             The great grandmother            
 * @property {EntityRelationship} relationship.GreatGrandparent             The great grandparent            
 * @property {EntityRelationship} relationship.Guarantor             The guarantor            
 * @property {EntityRelationship} relationship.GUARD             The guard            
 * @property {EntityRelationship} relationship.Guardian             The guardian            
 * @property {EntityRelationship} relationship.Halfbrother             The halfbrother            
 * @property {EntityRelationship} relationship.Halfsibling             The halfsibling            
 * @property {EntityRelationship} relationship.Halfsister             The halfsister            
 * @property {EntityRelationship} relationship.HealthcareProvider             The healthcare provider            
 * @property {EntityRelationship} relationship.HealthChart             The health chart            
 * @property {EntityRelationship} relationship.HeldEntity             The held entity            
 * @property {EntityRelationship} relationship.Husband             The husband            
 * @property {EntityRelationship} relationship.IdentifiedEntity             The identified entity            
 * @property {EntityRelationship} relationship.IncidentalServiceDeliveryLocation             The incidental service delivery location            
 * @property {EntityRelationship} relationship.Individual             The individual            
 * @property {EntityRelationship} relationship.InvestigationSubject             The investigation subject            
 * @property {EntityRelationship} relationship.InvoicePayor             The invoice payor            
 * @property {EntityRelationship} relationship.Isolate             The isolate            
 * @property {EntityRelationship} relationship.LicensedEntity             The licensed entity            
 * @property {EntityRelationship} relationship.MaintainedEntity             The maintained entity            
 * @property {EntityRelationship} relationship.ManufacturedProduct             The manufactured product            
 * @property {EntityRelationship} relationship.MaternalAunt             The maternal aunt            
 * @property {EntityRelationship} relationship.MaternalCousin             The maternal cousin            
 * @property {EntityRelationship} relationship.MaternalGrandfather             The maternal grandfather            
 * @property {EntityRelationship} relationship.MaternalGrandmother             The maternal grandmother            
 * @property {EntityRelationship} relationship.MaternalGrandparent             The maternal grandparent            
 * @property {EntityRelationship} relationship.MaternalGreatgrandfather             The maternal greatgrandfather            
 * @property {EntityRelationship} relationship.MaternalGreatgrandmother             The maternal greatgrandmother            
 * @property {EntityRelationship} relationship.MaternalGreatgrandparent             The maternal greatgrandparent            
 * @property {EntityRelationship} relationship.MaternalUncle             The maternal uncle            
 * @property {EntityRelationship} relationship.MilitaryPerson             The military person            
 * @property {EntityRelationship} relationship.Mother             The mother            
 * @property {EntityRelationship} relationship.Motherinlaw             The motherinlaw            
 * @property {EntityRelationship} relationship.NamedInsured             The named insured            
 * @property {EntityRelationship} relationship.NaturalBrother             The natural brother            
 * @property {EntityRelationship} relationship.NaturalChild             The natural child            
 * @property {EntityRelationship} relationship.NaturalDaughter             The natural daughter            
 * @property {EntityRelationship} relationship.NaturalFather             The natural father            
 * @property {EntityRelationship} relationship.NaturalFatherOfFetus             The natural father of fetus            
 * @property {EntityRelationship} relationship.NaturalMother             The natural mother            
 * @property {EntityRelationship} relationship.NaturalParent             The natural parent            
 * @property {EntityRelationship} relationship.NaturalSibling             The natural sibling            
 * @property {EntityRelationship} relationship.NaturalSister             The natural sister            
 * @property {EntityRelationship} relationship.NaturalSon             The natural son            
 * @property {EntityRelationship} relationship.Nephew             The nephew            
 * @property {EntityRelationship} relationship.NextOfKin             The next of kin            
 * @property {EntityRelationship} relationship.Niece             The niece            
 * @property {EntityRelationship} relationship.NieceNephew             The niece nephew            
 * @property {EntityRelationship} relationship.NotaryPublic             The notary public            
 * @property {EntityRelationship} relationship.OwnedEntity             The owned entity            
 * @property {EntityRelationship} relationship.Parent             The parent            
 * @property {EntityRelationship} relationship.ParentInlaw             The parent inlaw            
 * @property {EntityRelationship} relationship.Part             The part            
 * @property {EntityRelationship} relationship.PaternalAunt             The paternal aunt            
 * @property {EntityRelationship} relationship.PaternalCousin             The paternal cousin            
 * @property {EntityRelationship} relationship.PaternalGrandfather             The paternal grandfather            
 * @property {EntityRelationship} relationship.PaternalGrandmother             The paternal grandmother            
 * @property {EntityRelationship} relationship.PaternalGrandparent             The paternal grandparent            
 * @property {EntityRelationship} relationship.PaternalGreatgrandfather             The paternal greatgrandfather            
 * @property {EntityRelationship} relationship.PaternalGreatgrandmother             The paternal greatgrandmother            
 * @property {EntityRelationship} relationship.PaternalGreatgrandparent             The paternal greatgrandparent            
 * @property {EntityRelationship} relationship.PaternalUncle             The paternal uncle            
 * @property {EntityRelationship} relationship.Patient             The patient            
 * @property {EntityRelationship} relationship.Payee             The payee            
 * @property {EntityRelationship} relationship.PersonalRelationship             The personal relationship            
 * @property {EntityRelationship} relationship.PlaceOfDeath             The place of death            
 * @property {EntityRelationship} relationship.PolicyHolder             The policy holder            
 * @property {EntityRelationship} relationship.ProgramEligible             The program eligible            
 * @property {EntityRelationship} relationship.QualifiedEntity             The qualified entity            
 * @property {EntityRelationship} relationship.RegulatedProduct             The regulated product            
 * @property {EntityRelationship} relationship.ResearchSubject             The research subject            
 * @property {EntityRelationship} relationship.RetailedMaterial             The retailed material            
 * @property {EntityRelationship} relationship.Roomate             The roomate            
 * @property {EntityRelationship} relationship.ServiceDeliveryLocation             The service delivery location            
 * @property {EntityRelationship} relationship.Sibling             The sibling            
 * @property {EntityRelationship} relationship.SiblingInlaw             The sibling inlaw            
 * @property {EntityRelationship} relationship.SignificantOther             The significant other            
 * @property {EntityRelationship} relationship.SigningAuthorityOrOfficer             The signing authority or officer            
 * @property {EntityRelationship} relationship.Sister             The sister            
 * @property {EntityRelationship} relationship.Sisterinlaw             The sisterinlaw            
 * @property {EntityRelationship} relationship.Son             The son            
 * @property {EntityRelationship} relationship.SonInlaw             The son inlaw            
 * @property {EntityRelationship} relationship.Specimen             The specimen            
 * @property {EntityRelationship} relationship.Spouse             The spouse            
 * @property {EntityRelationship} relationship.Stepbrother             The stepbrother            
 * @property {EntityRelationship} relationship.StepChild             The step child            
 * @property {EntityRelationship} relationship.Stepdaughter             The stepdaughter            
 * @property {EntityRelationship} relationship.Stepfather             The stepfather            
 * @property {EntityRelationship} relationship.Stepmother             The stepmother            
 * @property {EntityRelationship} relationship.StepParent             The step parent            
 * @property {EntityRelationship} relationship.StepSibling             The step sibling            
 * @property {EntityRelationship} relationship.Stepsister             The stepsister            
 * @property {EntityRelationship} relationship.Stepson             The stepson            
 * @property {EntityRelationship} relationship.Student             The student            
 * @property {EntityRelationship} relationship.Subscriber             The subscriber            
 * @property {EntityRelationship} relationship.TerritoryOfAuthority             The territory of authority            
 * @property {EntityRelationship} relationship.TherapeuticAgent             The therapeutic agent            
 * @property {EntityRelationship} relationship.Uncle             The uncle            
 * @property {EntityRelationship} relationship.Underwriter             The underwriter            
 * @property {EntityRelationship} relationship.UsedEntity             The used entity            
 * @property {EntityRelationship} relationship.WarrantedProduct             The warranted product            
 * @property {EntityRelationship} relationship.Wife             The wife            
 * @property {EntityRelationship} relationship.Replaces             The replaces            
 * @property {EntityRelationship} relationship.Instance             The target entity represents an instance of the scoper entity            
 * @property {EntityRelationship} relationship.LocatedEntity             Relates the target entity to a source location            
 * @property {EntityRelationship} relationship.$other Unclassified
 * @property {Concept} statusConceptModel [Delay loaded from statusConcept],             Status concept id            
 * @property {string} statusConcept            Status concept id            (see: {@link StatusKeys} for values)
 * @property {object} tag            Gets a list of all tags associated with the entity            
 * @property {string} tag.classifier  where classifier is from {@link Tag} key
 * @property {object} telecom            Gets a list of all telecommunications addresses associated with the entity            
 * @property {EntityTelecomAddress} telecom.AnsweringService             answering service            
 * @property {EntityTelecomAddress} telecom.EmergencyContact             Emergency contact            
 * @property {EntityTelecomAddress} telecom.MobileContact             Mobile phone contact            
 * @property {EntityTelecomAddress} telecom.Pager             pager            
 * @property {EntityTelecomAddress} telecom.Public             public (800 number example) contact            
 * @property {EntityTelecomAddress} telecom.TemporaryAddress             temporary contact            
 * @property {EntityTelecomAddress} telecom.WorkPlace             For use in the workplace            
 * @property {EntityTelecomAddress} telecom.$other Unclassified
 * @property {string} template            Gets the template key            
 * @property {TemplateDefinition} templateModel [Delay loaded from template],             Gets or sets the template definition            
 * @property {Concept} typeConceptModel [Delay loaded from typeConcept],             Type concept identifier            
 * @property {string} typeConcept            Type concept identifier            
 * @property {string} previousVersion
 * @property {string} version
 * @property {number} sequence
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {Patient} copyData Copy constructor (if present)
 */
function Patient (copyData) { 
	this.$type = 'Patient';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {number} */
	this.sequence = copyData.sequence;
	/** @type {string} */
	this.version = copyData.version;
	/** @type {string} */
	this.previousVersion = copyData.previousVersion;
	/** @type {string} */
	this.typeConcept = copyData.typeConcept;
	/** @type {Concept} */
	this.typeConceptModel = copyData.typeConceptModel;
	/** @type {TemplateDefinition} */
	this.templateModel = copyData.templateModel;
	/** @type {string} */
	this.template = copyData.template;
	/** @type {object} */
	this.telecom = copyData.telecom;
	/** @type {object} */
	this.tag = copyData.tag;
	/** @type {string} */
	this.statusConcept = copyData.statusConcept;
	/** @type {Concept} */
	this.statusConceptModel = copyData.statusConceptModel;
	/** @type {object} */
	this.relationship = copyData.relationship;
	/** @type {object} */
	this.participation = copyData.participation;
	/** @type {string} */
	this.note = copyData.note;
	/** @type {object} */
	this.name = copyData.name;
	/** @type {object} */
	this.identifier = copyData.identifier;
	/** @type {object} */
	this.extension = copyData.extension;
	/** @type {string} */
	this.determinerConcept = copyData.determinerConcept;
	/** @type {Concept} */
	this.determinerConceptModel = copyData.determinerConceptModel;
	/** @type {string} */
	this.creationAct = copyData.creationAct;
	/** @type {Act} */
	this.creationActModel = copyData.creationActModel;
	/** @type {string} */
	this.classConcept = copyData.classConcept;
	/** @type {Concept} */
	this.classConceptModel = copyData.classConceptModel;
	/** @type {object} */
	this.address = copyData.address;
	/** @type {PersonLanguageCommunication} */
	this.language = copyData.language;
	/** @type {string} */
	this.dateOfBirth = copyData.dateOfBirth;
	/** @type {DatePrecision} */
	this.dateOfBirthPrecision = copyData.dateOfBirthPrecision;
	/** @type {Concept} */
	this.genderConceptModel = copyData.genderConceptModel;
	/** @type {string} */
	this.genderConcept = copyData.genderConcept;
	/** @type {number} */
	this.multipleBirthOrder = copyData.multipleBirthOrder;
	/** @type {DatePrecision} */
	this.deceasedDatePrecision = copyData.deceasedDatePrecision;
	/** @type {Date} */
	this.deceasedDate = copyData.deceasedDate;
	}
}  // Patient 
// SanteDB.Core.Model.Roles.Provider, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!Provider)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends Person
 * @summary             Represents a provider role of a person            
 * @property {string} providerSpecialty            Gets or sets the provider specialty key            
 * @property {Concept} providerSpecialtyModel [Delay loaded from providerSpecialty],             Gets or sets the provider specialty            
 * @property {DatePrecision} dateOfBirthPrecision            Gets or sets the precision ofthe date of birth            (see: {@link DatePrecision} for values)
 * @property {string} dateOfBirth            Gets the date of birth as XML            
 * @property {PersonLanguageCommunication} language            Gets the person's languages of communication            
 * @property {object} address            Gets a list of all addresses associated with the entity            
 * @property {EntityAddress} address.Alphabetic             Represents an alphabetic address used for matching             
 * @property {EntityAddress} address.BadAddress             Represents a bad address, i.e. an address which is old or invalid.            
 * @property {EntityAddress} address.Direct             Represents a workplace address that reaches the person directly without intermediaries.            
 * @property {EntityAddress} address.HomeAddress             The home address            
 * @property {EntityAddress} address.Ideographic             Represents an address expressed in an ideographic manner (example: Kanji)            
 * @property {EntityAddress} address.Phonetic             Represents an address expressed as a phonetic spelling of an ideographic address            
 * @property {EntityAddress} address.PhysicalVisit             The address is a physical place where visits should occur            
 * @property {EntityAddress} address.PostalAddress             The address is a postal address used for the delivery of mail and materials            
 * @property {EntityAddress} address.PrimaryHome             Represents a primary address to reach a contact after business hours.            
 * @property {EntityAddress} address.Public             Represents an address that is a standard address that may be subject to a switchboard or operator prior to reaching the intended entity.            
 * @property {EntityAddress} address.Soundex             Represents an address used for soundex matching purposes.            
 * @property {EntityAddress} address.Syllabic             Represents a syllabic address.            
 * @property {EntityAddress} address.TemporaryAddress             Represents a temporary address that may be good for visiting or mailing.            
 * @property {EntityAddress} address.VacationHome             Represents a vacation home to reach a person while on vacation.            
 * @property {EntityAddress} address.WorkPlace             Represents an office address, should be used for business communications            
 * @property {EntityAddress} address.$other Unclassified
 * @property {Concept} classConceptModel [Delay loaded from classConcept],             Class concept datal load property            
 * @property {string} classConcept            Class concept            (see: {@link EntityClassKeys} for values)
 * @property {Act} creationActModel [Delay loaded from creationAct],             Creation act reference            
 * @property {string} creationAct            Creation act reference            
 * @property {Concept} determinerConceptModel [Delay loaded from determinerConcept],             Determiner concept            
 * @property {string} determinerConcept            Determiner concept            (see: {@link DeterminerKeys} for values)
 * @property {object} extension            Gets a list of all extensions associated with the entity            
 * @property {string} extension.classifier  where classifier is from {@link Extension} extensionType
 * @property {object} identifier            Gets the identifiers associated with this entity            
 * @property {EntityIdentifier} identifier.classifier  where classifier is from {@link IdentifierBase} authority
 * @property {object} name            Gets a list of all names associated with the entity            
 * @property {EntityName} name.Alphabetic             The name used is an alphabetic representation of the name (ex: romaji in Japanese)            
 * @property {EntityName} name.Anonymous             The name is an anonymous name for the object (not the real name but a name used for care delivery)            
 * @property {EntityName} name.Artist             The name represents an artist name or stage name            
 * @property {EntityName} name.Assigned             The name represents an assigned name (given or bestowed by an authority)            
 * @property {EntityName} name.Ideographic             THe name represents an ideographic representation of the name            
 * @property {EntityName} name.Indigenous             The name is an indigenous name or tribal name for the patient            
 * @property {EntityName} name.Legal             The name represents the current legal name of an object (such as a corporate name)            
 * @property {EntityName} name.License             The name represents a name as displayed on a license or known to a license authority            
 * @property {EntityName} name.MaidenName             THe name is a maiden name (name of a patient before marriage)            
 * @property {EntityName} name.OfficialRecord             The name as it appears on an official record            
 * @property {EntityName} name.Phonetic             The name represents a phonetic representation of a name such as a SOUNDEX code            
 * @property {EntityName} name.Pseudonym             The name is a pseudonym for the object or an synonym name            
 * @property {EntityName} name.Religious             The name is to be used for religious purposes (such as baptismal name)            
 * @property {EntityName} name.Search             The name is to be used in the performing of matches only            
 * @property {EntityName} name.Soundex             The name represents the computed soundex code of a name            
 * @property {EntityName} name.Syllabic             The name represents a syllabic name.            
 * @property {EntityName} name.$other Unclassified
 * @property {string} note            Gets a list of all notes associated with the entity            
 * @property {object} participation            Gets the acts in which this entity participates            
 * @property {ActParticipation} participation.Admitter             The player entity was the person who was responsible for admitting the patient into a facility or care scenario.            
 * @property {ActParticipation} participation.Attender             The player entity represents the attending physician for the patient            
 * @property {ActParticipation} participation.Authenticator             The player entity represents an entity which authenticates the provision of care            
 * @property {ActParticipation} participation.Authororiginator             The player entity is responsible for the creation of data described in the act            
 * @property {ActParticipation} participation.Baby             The player is a resultant person in that it was the baby             
 * @property {ActParticipation} participation.Beneficiary             The player is a beneficiary of the act such a receiver of a financial instrument, or other good            
 * @property {ActParticipation} participation.CallbackContact             The player entity represents something that should be contacted upon completion of the act            
 * @property {ActParticipation} participation.CausativeAgent             The player entity is an agent which caused the act to occur            
 * @property {ActParticipation} participation.Consultant             The player entity is acting as a consult to the carrying out of the act            
 * @property {ActParticipation} participation.Consumable             The player entity was or is to be consumed during the process of carrying out the act.            
 * @property {ActParticipation} participation.CoverageTarget             The player entity represents the target coverage entity of the act            
 * @property {ActParticipation} participation.Custodian             The player entity is the data custodian of the act (is responsible for storing and securing the act)            
 * @property {ActParticipation} participation.DataEnterer             The player entity represents the person or device which phisically entered the data at the terminal            
 * @property {ActParticipation} participation.Destination             The player etity represents the ultimate destination of the goods/materials/services described in the act            
 * @property {ActParticipation} participation.Device             The player entity represents the device on which the act or data from the act was acquired or recorded            
 * @property {ActParticipation} participation.DirectTarget             The player entity represents the directed target of care provided in the act            
 * @property {ActParticipation} participation.Discharger             The player entity represents the person who is responsible for the discharging of the patient from an encounter            
 * @property {ActParticipation} participation.Distributor             The player entity is the source distribution point for the financial or material instruments contained in the message            
 * @property {ActParticipation} participation.Donor             The player entity represents the donor of tissue or materials used in the act            
 * @property {ActParticipation} participation.EntryLocation             The location where the act was entered.            
 * @property {ActParticipation} participation.Escort             The player entity was responsible for escorting the patient during the course of the act            
 * @property {ActParticipation} participation.Exposure             The player entity something to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureAgent             The player entity represents the agent (material) to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureSource             The player entity describes the source of the material to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureTarget             The player entity describes the target to which the agent was exposed            
 * @property {ActParticipation} participation.GuarantorParty             The player represents a party which is used as a financial guarantor for payment in the carrying out of the act            
 * @property {ActParticipation} participation.Holder             The player is responsible for holding the act            
 * @property {ActParticipation} participation.IndirectTarget             The entity not directly present in the act but which will be the focust of th act.            
 * @property {ActParticipation} participation.Informant             The player was a person or device which informed data presented in the act. (Example: A mother telling a nurse that their child had a reaction)            
 * @property {ActParticipation} participation.InformationRecipient             The player entity represents something that should be cc'ed on the act            
 * @property {ActParticipation} participation.LegalAuthenticator             The player entity is responsible for legally authenticating the content of the act            
 * @property {ActParticipation} participation.Location             The location where the service was performed.            
 * @property {ActParticipation} participation.NonreuseableDevice             The player represents a consumable that can no longer be used            
 * @property {ActParticipation} participation.Origin             The player represents the origin of the act            
 * @property {ActParticipation} participation.Participation             The player entity participates in the act in no particular classification            
 * @property {ActParticipation} participation.Performer             The player entity is responsible for performing the clinical steps documented in the act            
 * @property {ActParticipation} participation.PrimaryInformationRecipient             The player entity represents a high priority contact which should be informed or cc'ed on the act            
 * @property {ActParticipation} participation.PrimaryPerformer             The player entity was the primary performer of the act. This is used in procedures where more than one performer is present            
 * @property {ActParticipation} participation.Product             The player represents a product that is not necessarily consumed but informs the act            
 * @property {ActParticipation} participation.Receiver             The player represents the entity which is the intended receiver of the act            
 * @property {ActParticipation} participation.RecordTarget             The player represents the entity to which the act is recorded against            
 * @property {ActParticipation} participation.ReferredBy             The player represents the entity which referred the act or caused the act to be undertaken            
 * @property {ActParticipation} participation.ReferredTo             The player entity represents the entity which was referred to            
 * @property {ActParticipation} participation.Referrer             The player entity represents the person who was originally the referrer.            
 * @property {ActParticipation} participation.Remote             The player entity represents a remote portion of the act            
 * @property {ActParticipation} participation.ResponsibleParty             The player entity is ultimately responsible for the carrying out of the act            
 * @property {ActParticipation} participation.ReusableDevice             The player entity represents a device which can be reused in future acts            
 * @property {ActParticipation} participation.SecondaryPerformer             The secondary performing person (support clinician).            
 * @property {ActParticipation} participation.Specimen             The player entity represents a specimen collected for the purpose of testing and diagnosis            
 * @property {ActParticipation} participation.Subject             The player entity is the subject of an act, but not necessarily the record target (meaning the act is about a particular entity but not to be attached to their record)            
 * @property {ActParticipation} participation.Tracker             The player entity is responsible for tracking the progress of the act            
 * @property {ActParticipation} participation.Transcriber             The person who transcribed data from the original act.            
 * @property {ActParticipation} participation.UgentNotificationContact             The player entity represents a contact entity in case of an emergency occurs during the act.            
 * @property {ActParticipation} participation.Verifier             The player entity was responsible for verifying the accuracy of the data in the act            
 * @property {ActParticipation} participation.Via             The player entity represents an entity where the act occurred "via" this entity (i.e. in transport)            
 * @property {ActParticipation} participation.Witness             The player entity represents a legal witness to the act occurring.            
 * @property {ActParticipation} participation.$other Unclassified
 * @property {object} relationship            Gets a list of all associated entities for this entity            
 * @property {EntityRelationship} relationship.Access             The access            
 * @property {EntityRelationship} relationship.ActiveMoiety             The active moiety            
 * @property {EntityRelationship} relationship.AdministerableMaterial             The administerable material            
 * @property {EntityRelationship} relationship.AdoptedChild             The adopted child            
 * @property {EntityRelationship} relationship.AdoptedDaughter             The adopted daughter            
 * @property {EntityRelationship} relationship.AdoptedSon             The adopted son            
 * @property {EntityRelationship} relationship.Affiliate             The affiliate            
 * @property {EntityRelationship} relationship.Agent             The agent            
 * @property {EntityRelationship} relationship.Aliquot             The aliquot            
 * @property {EntityRelationship} relationship.Assigned             The assigned            
 * @property {EntityRelationship} relationship.AssignedEntity             The assigned entity            
 * @property {EntityRelationship} relationship.Aunt             The aunt            
 * @property {EntityRelationship} relationship.Birthplace             The birthplace            
 * @property {EntityRelationship} relationship.Brother             The brother            
 * @property {EntityRelationship} relationship.Brotherinlaw             The brotherinlaw            
 * @property {EntityRelationship} relationship.Caregiver             The caregiver            
 * @property {EntityRelationship} relationship.CaseSubject             The case subject            
 * @property {EntityRelationship} relationship.Child             The child            
 * @property {EntityRelationship} relationship.ChildInlaw             The child inlaw            
 * @property {EntityRelationship} relationship.Citizen             The citizen            
 * @property {EntityRelationship} relationship.Claimant             The claimant            
 * @property {EntityRelationship} relationship.ClinicalResearchInvestigator             The clinical research investigator            
 * @property {EntityRelationship} relationship.ClinicalResearchSponsor             The clinical research sponsor            
 * @property {EntityRelationship} relationship.CommissioningParty             The commissioning party            
 * @property {EntityRelationship} relationship.Contact             The contact            
 * @property {EntityRelationship} relationship.Cousin             The cousin            
 * @property {EntityRelationship} relationship.CoverageSponsor             The coverage sponsor            
 * @property {EntityRelationship} relationship.CoveredParty             The covered party            
 * @property {EntityRelationship} relationship.Daughter             The daughter            
 * @property {EntityRelationship} relationship.DaughterInlaw             The daughter inlaw            
 * @property {EntityRelationship} relationship.DedicatedServiceDeliveryLocation             The dedicated service delivery location            
 * @property {EntityRelationship} relationship.Dependent             The dependent            
 * @property {EntityRelationship} relationship.DistributedMaterial             The distributed material            
 * @property {EntityRelationship} relationship.DomesticPartner             The domestic partner            
 * @property {EntityRelationship} relationship.EmergencyContact             The emergency contact            
 * @property {EntityRelationship} relationship.Employee             The employee            
 * @property {EntityRelationship} relationship.ExposedEntity             The exposed entity            
 * @property {EntityRelationship} relationship.FamilyMember             The family member            
 * @property {EntityRelationship} relationship.Father             The father            
 * @property {EntityRelationship} relationship.Fatherinlaw             The fatherinlaw            
 * @property {EntityRelationship} relationship.FosterChild             The foster child            
 * @property {EntityRelationship} relationship.FosterDaughter             The foster daughter            
 * @property {EntityRelationship} relationship.FosterSon             The foster son            
 * @property {EntityRelationship} relationship.Grandchild             The grandchild            
 * @property {EntityRelationship} relationship.Granddaughter             The granddaughter            
 * @property {EntityRelationship} relationship.Grandfather             The grandfather            
 * @property {EntityRelationship} relationship.Grandmother             The grandmother            
 * @property {EntityRelationship} relationship.Grandparent             The grandparent            
 * @property {EntityRelationship} relationship.Grandson             The grandson            
 * @property {EntityRelationship} relationship.GreatGrandfather             The great grandfather            
 * @property {EntityRelationship} relationship.GreatGrandmother             The great grandmother            
 * @property {EntityRelationship} relationship.GreatGrandparent             The great grandparent            
 * @property {EntityRelationship} relationship.Guarantor             The guarantor            
 * @property {EntityRelationship} relationship.GUARD             The guard            
 * @property {EntityRelationship} relationship.Guardian             The guardian            
 * @property {EntityRelationship} relationship.Halfbrother             The halfbrother            
 * @property {EntityRelationship} relationship.Halfsibling             The halfsibling            
 * @property {EntityRelationship} relationship.Halfsister             The halfsister            
 * @property {EntityRelationship} relationship.HealthcareProvider             The healthcare provider            
 * @property {EntityRelationship} relationship.HealthChart             The health chart            
 * @property {EntityRelationship} relationship.HeldEntity             The held entity            
 * @property {EntityRelationship} relationship.Husband             The husband            
 * @property {EntityRelationship} relationship.IdentifiedEntity             The identified entity            
 * @property {EntityRelationship} relationship.IncidentalServiceDeliveryLocation             The incidental service delivery location            
 * @property {EntityRelationship} relationship.Individual             The individual            
 * @property {EntityRelationship} relationship.InvestigationSubject             The investigation subject            
 * @property {EntityRelationship} relationship.InvoicePayor             The invoice payor            
 * @property {EntityRelationship} relationship.Isolate             The isolate            
 * @property {EntityRelationship} relationship.LicensedEntity             The licensed entity            
 * @property {EntityRelationship} relationship.MaintainedEntity             The maintained entity            
 * @property {EntityRelationship} relationship.ManufacturedProduct             The manufactured product            
 * @property {EntityRelationship} relationship.MaternalAunt             The maternal aunt            
 * @property {EntityRelationship} relationship.MaternalCousin             The maternal cousin            
 * @property {EntityRelationship} relationship.MaternalGrandfather             The maternal grandfather            
 * @property {EntityRelationship} relationship.MaternalGrandmother             The maternal grandmother            
 * @property {EntityRelationship} relationship.MaternalGrandparent             The maternal grandparent            
 * @property {EntityRelationship} relationship.MaternalGreatgrandfather             The maternal greatgrandfather            
 * @property {EntityRelationship} relationship.MaternalGreatgrandmother             The maternal greatgrandmother            
 * @property {EntityRelationship} relationship.MaternalGreatgrandparent             The maternal greatgrandparent            
 * @property {EntityRelationship} relationship.MaternalUncle             The maternal uncle            
 * @property {EntityRelationship} relationship.MilitaryPerson             The military person            
 * @property {EntityRelationship} relationship.Mother             The mother            
 * @property {EntityRelationship} relationship.Motherinlaw             The motherinlaw            
 * @property {EntityRelationship} relationship.NamedInsured             The named insured            
 * @property {EntityRelationship} relationship.NaturalBrother             The natural brother            
 * @property {EntityRelationship} relationship.NaturalChild             The natural child            
 * @property {EntityRelationship} relationship.NaturalDaughter             The natural daughter            
 * @property {EntityRelationship} relationship.NaturalFather             The natural father            
 * @property {EntityRelationship} relationship.NaturalFatherOfFetus             The natural father of fetus            
 * @property {EntityRelationship} relationship.NaturalMother             The natural mother            
 * @property {EntityRelationship} relationship.NaturalParent             The natural parent            
 * @property {EntityRelationship} relationship.NaturalSibling             The natural sibling            
 * @property {EntityRelationship} relationship.NaturalSister             The natural sister            
 * @property {EntityRelationship} relationship.NaturalSon             The natural son            
 * @property {EntityRelationship} relationship.Nephew             The nephew            
 * @property {EntityRelationship} relationship.NextOfKin             The next of kin            
 * @property {EntityRelationship} relationship.Niece             The niece            
 * @property {EntityRelationship} relationship.NieceNephew             The niece nephew            
 * @property {EntityRelationship} relationship.NotaryPublic             The notary public            
 * @property {EntityRelationship} relationship.OwnedEntity             The owned entity            
 * @property {EntityRelationship} relationship.Parent             The parent            
 * @property {EntityRelationship} relationship.ParentInlaw             The parent inlaw            
 * @property {EntityRelationship} relationship.Part             The part            
 * @property {EntityRelationship} relationship.PaternalAunt             The paternal aunt            
 * @property {EntityRelationship} relationship.PaternalCousin             The paternal cousin            
 * @property {EntityRelationship} relationship.PaternalGrandfather             The paternal grandfather            
 * @property {EntityRelationship} relationship.PaternalGrandmother             The paternal grandmother            
 * @property {EntityRelationship} relationship.PaternalGrandparent             The paternal grandparent            
 * @property {EntityRelationship} relationship.PaternalGreatgrandfather             The paternal greatgrandfather            
 * @property {EntityRelationship} relationship.PaternalGreatgrandmother             The paternal greatgrandmother            
 * @property {EntityRelationship} relationship.PaternalGreatgrandparent             The paternal greatgrandparent            
 * @property {EntityRelationship} relationship.PaternalUncle             The paternal uncle            
 * @property {EntityRelationship} relationship.Patient             The patient            
 * @property {EntityRelationship} relationship.Payee             The payee            
 * @property {EntityRelationship} relationship.PersonalRelationship             The personal relationship            
 * @property {EntityRelationship} relationship.PlaceOfDeath             The place of death            
 * @property {EntityRelationship} relationship.PolicyHolder             The policy holder            
 * @property {EntityRelationship} relationship.ProgramEligible             The program eligible            
 * @property {EntityRelationship} relationship.QualifiedEntity             The qualified entity            
 * @property {EntityRelationship} relationship.RegulatedProduct             The regulated product            
 * @property {EntityRelationship} relationship.ResearchSubject             The research subject            
 * @property {EntityRelationship} relationship.RetailedMaterial             The retailed material            
 * @property {EntityRelationship} relationship.Roomate             The roomate            
 * @property {EntityRelationship} relationship.ServiceDeliveryLocation             The service delivery location            
 * @property {EntityRelationship} relationship.Sibling             The sibling            
 * @property {EntityRelationship} relationship.SiblingInlaw             The sibling inlaw            
 * @property {EntityRelationship} relationship.SignificantOther             The significant other            
 * @property {EntityRelationship} relationship.SigningAuthorityOrOfficer             The signing authority or officer            
 * @property {EntityRelationship} relationship.Sister             The sister            
 * @property {EntityRelationship} relationship.Sisterinlaw             The sisterinlaw            
 * @property {EntityRelationship} relationship.Son             The son            
 * @property {EntityRelationship} relationship.SonInlaw             The son inlaw            
 * @property {EntityRelationship} relationship.Specimen             The specimen            
 * @property {EntityRelationship} relationship.Spouse             The spouse            
 * @property {EntityRelationship} relationship.Stepbrother             The stepbrother            
 * @property {EntityRelationship} relationship.StepChild             The step child            
 * @property {EntityRelationship} relationship.Stepdaughter             The stepdaughter            
 * @property {EntityRelationship} relationship.Stepfather             The stepfather            
 * @property {EntityRelationship} relationship.Stepmother             The stepmother            
 * @property {EntityRelationship} relationship.StepParent             The step parent            
 * @property {EntityRelationship} relationship.StepSibling             The step sibling            
 * @property {EntityRelationship} relationship.Stepsister             The stepsister            
 * @property {EntityRelationship} relationship.Stepson             The stepson            
 * @property {EntityRelationship} relationship.Student             The student            
 * @property {EntityRelationship} relationship.Subscriber             The subscriber            
 * @property {EntityRelationship} relationship.TerritoryOfAuthority             The territory of authority            
 * @property {EntityRelationship} relationship.TherapeuticAgent             The therapeutic agent            
 * @property {EntityRelationship} relationship.Uncle             The uncle            
 * @property {EntityRelationship} relationship.Underwriter             The underwriter            
 * @property {EntityRelationship} relationship.UsedEntity             The used entity            
 * @property {EntityRelationship} relationship.WarrantedProduct             The warranted product            
 * @property {EntityRelationship} relationship.Wife             The wife            
 * @property {EntityRelationship} relationship.Replaces             The replaces            
 * @property {EntityRelationship} relationship.Instance             The target entity represents an instance of the scoper entity            
 * @property {EntityRelationship} relationship.LocatedEntity             Relates the target entity to a source location            
 * @property {EntityRelationship} relationship.$other Unclassified
 * @property {Concept} statusConceptModel [Delay loaded from statusConcept],             Status concept id            
 * @property {string} statusConcept            Status concept id            (see: {@link StatusKeys} for values)
 * @property {object} tag            Gets a list of all tags associated with the entity            
 * @property {string} tag.classifier  where classifier is from {@link Tag} key
 * @property {object} telecom            Gets a list of all telecommunications addresses associated with the entity            
 * @property {EntityTelecomAddress} telecom.AnsweringService             answering service            
 * @property {EntityTelecomAddress} telecom.EmergencyContact             Emergency contact            
 * @property {EntityTelecomAddress} telecom.MobileContact             Mobile phone contact            
 * @property {EntityTelecomAddress} telecom.Pager             pager            
 * @property {EntityTelecomAddress} telecom.Public             public (800 number example) contact            
 * @property {EntityTelecomAddress} telecom.TemporaryAddress             temporary contact            
 * @property {EntityTelecomAddress} telecom.WorkPlace             For use in the workplace            
 * @property {EntityTelecomAddress} telecom.$other Unclassified
 * @property {string} template            Gets the template key            
 * @property {TemplateDefinition} templateModel [Delay loaded from template],             Gets or sets the template definition            
 * @property {Concept} typeConceptModel [Delay loaded from typeConcept],             Type concept identifier            
 * @property {string} typeConcept            Type concept identifier            
 * @property {string} previousVersion
 * @property {string} version
 * @property {number} sequence
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {Provider} copyData Copy constructor (if present)
 */
function Provider (copyData) { 
	this.$type = 'Provider';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {number} */
	this.sequence = copyData.sequence;
	/** @type {string} */
	this.version = copyData.version;
	/** @type {string} */
	this.previousVersion = copyData.previousVersion;
	/** @type {string} */
	this.typeConcept = copyData.typeConcept;
	/** @type {Concept} */
	this.typeConceptModel = copyData.typeConceptModel;
	/** @type {TemplateDefinition} */
	this.templateModel = copyData.templateModel;
	/** @type {string} */
	this.template = copyData.template;
	/** @type {object} */
	this.telecom = copyData.telecom;
	/** @type {object} */
	this.tag = copyData.tag;
	/** @type {string} */
	this.statusConcept = copyData.statusConcept;
	/** @type {Concept} */
	this.statusConceptModel = copyData.statusConceptModel;
	/** @type {object} */
	this.relationship = copyData.relationship;
	/** @type {object} */
	this.participation = copyData.participation;
	/** @type {string} */
	this.note = copyData.note;
	/** @type {object} */
	this.name = copyData.name;
	/** @type {object} */
	this.identifier = copyData.identifier;
	/** @type {object} */
	this.extension = copyData.extension;
	/** @type {string} */
	this.determinerConcept = copyData.determinerConcept;
	/** @type {Concept} */
	this.determinerConceptModel = copyData.determinerConceptModel;
	/** @type {string} */
	this.creationAct = copyData.creationAct;
	/** @type {Act} */
	this.creationActModel = copyData.creationActModel;
	/** @type {string} */
	this.classConcept = copyData.classConcept;
	/** @type {Concept} */
	this.classConceptModel = copyData.classConceptModel;
	/** @type {object} */
	this.address = copyData.address;
	/** @type {PersonLanguageCommunication} */
	this.language = copyData.language;
	/** @type {string} */
	this.dateOfBirth = copyData.dateOfBirth;
	/** @type {DatePrecision} */
	this.dateOfBirthPrecision = copyData.dateOfBirthPrecision;
	/** @type {Concept} */
	this.providerSpecialtyModel = copyData.providerSpecialtyModel;
	/** @type {string} */
	this.providerSpecialty = copyData.providerSpecialty;
	}
}  // Provider 
// SanteDB.Core.Model.Patch.Patch, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!Patch)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents a series of patch instructions             
 * @property {string} version            Gets or sets the version of the patch file            
 * @property {PatchTarget} appliesTo            Application version            
 * @property {PatchOperation} change            A list of patch operations to be applied to the object            
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {Patch} copyData Copy constructor (if present)
 */
function Patch (copyData) { 
	this.$type = 'Patch';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {PatchOperation} */
	this.change = copyData.change;
	/** @type {PatchTarget} */
	this.appliesTo = copyData.appliesTo;
	/** @type {string} */
	this.version = copyData.version;
	}
}  // Patch 
// SanteDB.Core.Model.Patch.PatchOperation, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!PatchOperation)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents a single patch operation            
 * @property {PatchOperationType} op            Gets or sets the operation type            (see: {@link PatchOperationType} for values)
 * @property {string} path            Gets or sets the path            
 * @property {Object} value            Get or sets the value            
 * @param {PatchOperation} copyData Copy constructor (if present)
 */
function PatchOperation (copyData) { 
	this.$type = 'PatchOperation';
	if(copyData) {
	/** @type {Object} */
	this.value = copyData.value;
	/** @type {string} */
	this.path = copyData.path;
	/** @type {PatchOperationType} */
	this.op = copyData.op;
	}
}  // PatchOperation 
// SanteDB.Core.Model.Patch.PatchTarget, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!PatchTarget)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents a target of a patch            
 * @property {string} type            Identifies the target type            
 * @property {string} id            Gets or sets the key            
 * @property {string} version            Gets or sets the key            
 * @property {string} etag            Gets or sets the tag of the item            
 * @param {PatchTarget} copyData Copy constructor (if present)
 */
function PatchTarget (copyData) { 
	this.$type = 'PatchTarget';
	if(copyData) {
	/** @type {string} */
	this.etag = copyData.etag;
	/** @type {string} */
	this.version = copyData.version;
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.type = copyData.type;
	}
}  // PatchTarget 
// SanteDB.Core.Model.Entities.Container, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!Container)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends ManufacturedMaterial
 * @summary             Represents a container.            
 * @property {number} barrierDeltaQuantity            Gets or sets the barrier delta quantity. The distance from the Point of Reference to the separator material (barrier) within a container.            
 * @property {number} bottomDeltaQuantity            Gets or sets the bottom delta quantity. The distance from the Point of Reference to the outside bottom of the container.            
 * @property {number} capacityQuantity            Gets or sets the capacity quantity. The functional capacity of the container.            
 * @property {Concept} capTypeConceptModel [Delay loaded from capTypeConcept],             Gets or sets the cap type concept. The type of container cap consistent with de-capping, piercing or other automated manipulation.            
 * @property {string} capTypeConcept            Gets or sets the cap type concept key.            
 * @property {number} diameterQuantity            Gets or sets the diameter quantity. The outside diameter of the container.            
 * @property {number} heightQuantity            Gets or sets the height quantity. The height of the container.            
 * @property {Concept} separatorTypeConceptModel [Delay loaded from separatorTypeConcept],             Gets or sets the separator type concept. A material added to a container to facilitate and create a physical separation of specimen components of differing density.            Examples: A gel material added to blood collection tubes that following centrifugation creates a physical barrier between the blood cells and the serum or plasma.            
 * @property {string} separatorTypeConcept            Gets or sets the separator type concept key.            
 * @property {string} lotNumber            Gets or sets the lot number of the manufactured material            
 * @property {Date} expiryDate            Gets or sets the expiry date of the material            
 * @property {Concept} formConceptModel [Delay loaded from formConcept],             Gets or sets the concept which dictates the form of the material (solid, liquid, capsule, injection, etc.)            
 * @property {string} formConcept            Gets or sets the form concept's key            
 * @property {boolean} isAdministrative            True if the material is simply administrative            
 * @property {number} quantity            The base quantity of the object in the units. This differs from quantity on the relationship            which is a /per ...            
 * @property {Concept} quantityConceptModel [Delay loaded from quantityConcept],             Gets or sets the concept which dictates the unit of measure for a single instance of this entity            
 * @property {string} quantityConcept            Gets or sets the quantity concept ref            
 * @property {object} address            Gets a list of all addresses associated with the entity            
 * @property {EntityAddress} address.Alphabetic             Represents an alphabetic address used for matching             
 * @property {EntityAddress} address.BadAddress             Represents a bad address, i.e. an address which is old or invalid.            
 * @property {EntityAddress} address.Direct             Represents a workplace address that reaches the person directly without intermediaries.            
 * @property {EntityAddress} address.HomeAddress             The home address            
 * @property {EntityAddress} address.Ideographic             Represents an address expressed in an ideographic manner (example: Kanji)            
 * @property {EntityAddress} address.Phonetic             Represents an address expressed as a phonetic spelling of an ideographic address            
 * @property {EntityAddress} address.PhysicalVisit             The address is a physical place where visits should occur            
 * @property {EntityAddress} address.PostalAddress             The address is a postal address used for the delivery of mail and materials            
 * @property {EntityAddress} address.PrimaryHome             Represents a primary address to reach a contact after business hours.            
 * @property {EntityAddress} address.Public             Represents an address that is a standard address that may be subject to a switchboard or operator prior to reaching the intended entity.            
 * @property {EntityAddress} address.Soundex             Represents an address used for soundex matching purposes.            
 * @property {EntityAddress} address.Syllabic             Represents a syllabic address.            
 * @property {EntityAddress} address.TemporaryAddress             Represents a temporary address that may be good for visiting or mailing.            
 * @property {EntityAddress} address.VacationHome             Represents a vacation home to reach a person while on vacation.            
 * @property {EntityAddress} address.WorkPlace             Represents an office address, should be used for business communications            
 * @property {EntityAddress} address.$other Unclassified
 * @property {Concept} classConceptModel [Delay loaded from classConcept],             Class concept datal load property            
 * @property {string} classConcept            Class concept            (see: {@link EntityClassKeys} for values)
 * @property {Act} creationActModel [Delay loaded from creationAct],             Creation act reference            
 * @property {string} creationAct            Creation act reference            
 * @property {Concept} determinerConceptModel [Delay loaded from determinerConcept],             Determiner concept            
 * @property {string} determinerConcept            Determiner concept            (see: {@link DeterminerKeys} for values)
 * @property {object} extension            Gets a list of all extensions associated with the entity            
 * @property {string} extension.classifier  where classifier is from {@link Extension} extensionType
 * @property {object} identifier            Gets the identifiers associated with this entity            
 * @property {EntityIdentifier} identifier.classifier  where classifier is from {@link IdentifierBase} authority
 * @property {object} name            Gets a list of all names associated with the entity            
 * @property {EntityName} name.Alphabetic             The name used is an alphabetic representation of the name (ex: romaji in Japanese)            
 * @property {EntityName} name.Anonymous             The name is an anonymous name for the object (not the real name but a name used for care delivery)            
 * @property {EntityName} name.Artist             The name represents an artist name or stage name            
 * @property {EntityName} name.Assigned             The name represents an assigned name (given or bestowed by an authority)            
 * @property {EntityName} name.Ideographic             THe name represents an ideographic representation of the name            
 * @property {EntityName} name.Indigenous             The name is an indigenous name or tribal name for the patient            
 * @property {EntityName} name.Legal             The name represents the current legal name of an object (such as a corporate name)            
 * @property {EntityName} name.License             The name represents a name as displayed on a license or known to a license authority            
 * @property {EntityName} name.MaidenName             THe name is a maiden name (name of a patient before marriage)            
 * @property {EntityName} name.OfficialRecord             The name as it appears on an official record            
 * @property {EntityName} name.Phonetic             The name represents a phonetic representation of a name such as a SOUNDEX code            
 * @property {EntityName} name.Pseudonym             The name is a pseudonym for the object or an synonym name            
 * @property {EntityName} name.Religious             The name is to be used for religious purposes (such as baptismal name)            
 * @property {EntityName} name.Search             The name is to be used in the performing of matches only            
 * @property {EntityName} name.Soundex             The name represents the computed soundex code of a name            
 * @property {EntityName} name.Syllabic             The name represents a syllabic name.            
 * @property {EntityName} name.$other Unclassified
 * @property {string} note            Gets a list of all notes associated with the entity            
 * @property {object} participation            Gets the acts in which this entity participates            
 * @property {ActParticipation} participation.Admitter             The player entity was the person who was responsible for admitting the patient into a facility or care scenario.            
 * @property {ActParticipation} participation.Attender             The player entity represents the attending physician for the patient            
 * @property {ActParticipation} participation.Authenticator             The player entity represents an entity which authenticates the provision of care            
 * @property {ActParticipation} participation.Authororiginator             The player entity is responsible for the creation of data described in the act            
 * @property {ActParticipation} participation.Baby             The player is a resultant person in that it was the baby             
 * @property {ActParticipation} participation.Beneficiary             The player is a beneficiary of the act such a receiver of a financial instrument, or other good            
 * @property {ActParticipation} participation.CallbackContact             The player entity represents something that should be contacted upon completion of the act            
 * @property {ActParticipation} participation.CausativeAgent             The player entity is an agent which caused the act to occur            
 * @property {ActParticipation} participation.Consultant             The player entity is acting as a consult to the carrying out of the act            
 * @property {ActParticipation} participation.Consumable             The player entity was or is to be consumed during the process of carrying out the act.            
 * @property {ActParticipation} participation.CoverageTarget             The player entity represents the target coverage entity of the act            
 * @property {ActParticipation} participation.Custodian             The player entity is the data custodian of the act (is responsible for storing and securing the act)            
 * @property {ActParticipation} participation.DataEnterer             The player entity represents the person or device which phisically entered the data at the terminal            
 * @property {ActParticipation} participation.Destination             The player etity represents the ultimate destination of the goods/materials/services described in the act            
 * @property {ActParticipation} participation.Device             The player entity represents the device on which the act or data from the act was acquired or recorded            
 * @property {ActParticipation} participation.DirectTarget             The player entity represents the directed target of care provided in the act            
 * @property {ActParticipation} participation.Discharger             The player entity represents the person who is responsible for the discharging of the patient from an encounter            
 * @property {ActParticipation} participation.Distributor             The player entity is the source distribution point for the financial or material instruments contained in the message            
 * @property {ActParticipation} participation.Donor             The player entity represents the donor of tissue or materials used in the act            
 * @property {ActParticipation} participation.EntryLocation             The location where the act was entered.            
 * @property {ActParticipation} participation.Escort             The player entity was responsible for escorting the patient during the course of the act            
 * @property {ActParticipation} participation.Exposure             The player entity something to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureAgent             The player entity represents the agent (material) to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureSource             The player entity describes the source of the material to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureTarget             The player entity describes the target to which the agent was exposed            
 * @property {ActParticipation} participation.GuarantorParty             The player represents a party which is used as a financial guarantor for payment in the carrying out of the act            
 * @property {ActParticipation} participation.Holder             The player is responsible for holding the act            
 * @property {ActParticipation} participation.IndirectTarget             The entity not directly present in the act but which will be the focust of th act.            
 * @property {ActParticipation} participation.Informant             The player was a person or device which informed data presented in the act. (Example: A mother telling a nurse that their child had a reaction)            
 * @property {ActParticipation} participation.InformationRecipient             The player entity represents something that should be cc'ed on the act            
 * @property {ActParticipation} participation.LegalAuthenticator             The player entity is responsible for legally authenticating the content of the act            
 * @property {ActParticipation} participation.Location             The location where the service was performed.            
 * @property {ActParticipation} participation.NonreuseableDevice             The player represents a consumable that can no longer be used            
 * @property {ActParticipation} participation.Origin             The player represents the origin of the act            
 * @property {ActParticipation} participation.Participation             The player entity participates in the act in no particular classification            
 * @property {ActParticipation} participation.Performer             The player entity is responsible for performing the clinical steps documented in the act            
 * @property {ActParticipation} participation.PrimaryInformationRecipient             The player entity represents a high priority contact which should be informed or cc'ed on the act            
 * @property {ActParticipation} participation.PrimaryPerformer             The player entity was the primary performer of the act. This is used in procedures where more than one performer is present            
 * @property {ActParticipation} participation.Product             The player represents a product that is not necessarily consumed but informs the act            
 * @property {ActParticipation} participation.Receiver             The player represents the entity which is the intended receiver of the act            
 * @property {ActParticipation} participation.RecordTarget             The player represents the entity to which the act is recorded against            
 * @property {ActParticipation} participation.ReferredBy             The player represents the entity which referred the act or caused the act to be undertaken            
 * @property {ActParticipation} participation.ReferredTo             The player entity represents the entity which was referred to            
 * @property {ActParticipation} participation.Referrer             The player entity represents the person who was originally the referrer.            
 * @property {ActParticipation} participation.Remote             The player entity represents a remote portion of the act            
 * @property {ActParticipation} participation.ResponsibleParty             The player entity is ultimately responsible for the carrying out of the act            
 * @property {ActParticipation} participation.ReusableDevice             The player entity represents a device which can be reused in future acts            
 * @property {ActParticipation} participation.SecondaryPerformer             The secondary performing person (support clinician).            
 * @property {ActParticipation} participation.Specimen             The player entity represents a specimen collected for the purpose of testing and diagnosis            
 * @property {ActParticipation} participation.Subject             The player entity is the subject of an act, but not necessarily the record target (meaning the act is about a particular entity but not to be attached to their record)            
 * @property {ActParticipation} participation.Tracker             The player entity is responsible for tracking the progress of the act            
 * @property {ActParticipation} participation.Transcriber             The person who transcribed data from the original act.            
 * @property {ActParticipation} participation.UgentNotificationContact             The player entity represents a contact entity in case of an emergency occurs during the act.            
 * @property {ActParticipation} participation.Verifier             The player entity was responsible for verifying the accuracy of the data in the act            
 * @property {ActParticipation} participation.Via             The player entity represents an entity where the act occurred "via" this entity (i.e. in transport)            
 * @property {ActParticipation} participation.Witness             The player entity represents a legal witness to the act occurring.            
 * @property {ActParticipation} participation.$other Unclassified
 * @property {object} relationship            Gets a list of all associated entities for this entity            
 * @property {EntityRelationship} relationship.Access             The access            
 * @property {EntityRelationship} relationship.ActiveMoiety             The active moiety            
 * @property {EntityRelationship} relationship.AdministerableMaterial             The administerable material            
 * @property {EntityRelationship} relationship.AdoptedChild             The adopted child            
 * @property {EntityRelationship} relationship.AdoptedDaughter             The adopted daughter            
 * @property {EntityRelationship} relationship.AdoptedSon             The adopted son            
 * @property {EntityRelationship} relationship.Affiliate             The affiliate            
 * @property {EntityRelationship} relationship.Agent             The agent            
 * @property {EntityRelationship} relationship.Aliquot             The aliquot            
 * @property {EntityRelationship} relationship.Assigned             The assigned            
 * @property {EntityRelationship} relationship.AssignedEntity             The assigned entity            
 * @property {EntityRelationship} relationship.Aunt             The aunt            
 * @property {EntityRelationship} relationship.Birthplace             The birthplace            
 * @property {EntityRelationship} relationship.Brother             The brother            
 * @property {EntityRelationship} relationship.Brotherinlaw             The brotherinlaw            
 * @property {EntityRelationship} relationship.Caregiver             The caregiver            
 * @property {EntityRelationship} relationship.CaseSubject             The case subject            
 * @property {EntityRelationship} relationship.Child             The child            
 * @property {EntityRelationship} relationship.ChildInlaw             The child inlaw            
 * @property {EntityRelationship} relationship.Citizen             The citizen            
 * @property {EntityRelationship} relationship.Claimant             The claimant            
 * @property {EntityRelationship} relationship.ClinicalResearchInvestigator             The clinical research investigator            
 * @property {EntityRelationship} relationship.ClinicalResearchSponsor             The clinical research sponsor            
 * @property {EntityRelationship} relationship.CommissioningParty             The commissioning party            
 * @property {EntityRelationship} relationship.Contact             The contact            
 * @property {EntityRelationship} relationship.Cousin             The cousin            
 * @property {EntityRelationship} relationship.CoverageSponsor             The coverage sponsor            
 * @property {EntityRelationship} relationship.CoveredParty             The covered party            
 * @property {EntityRelationship} relationship.Daughter             The daughter            
 * @property {EntityRelationship} relationship.DaughterInlaw             The daughter inlaw            
 * @property {EntityRelationship} relationship.DedicatedServiceDeliveryLocation             The dedicated service delivery location            
 * @property {EntityRelationship} relationship.Dependent             The dependent            
 * @property {EntityRelationship} relationship.DistributedMaterial             The distributed material            
 * @property {EntityRelationship} relationship.DomesticPartner             The domestic partner            
 * @property {EntityRelationship} relationship.EmergencyContact             The emergency contact            
 * @property {EntityRelationship} relationship.Employee             The employee            
 * @property {EntityRelationship} relationship.ExposedEntity             The exposed entity            
 * @property {EntityRelationship} relationship.FamilyMember             The family member            
 * @property {EntityRelationship} relationship.Father             The father            
 * @property {EntityRelationship} relationship.Fatherinlaw             The fatherinlaw            
 * @property {EntityRelationship} relationship.FosterChild             The foster child            
 * @property {EntityRelationship} relationship.FosterDaughter             The foster daughter            
 * @property {EntityRelationship} relationship.FosterSon             The foster son            
 * @property {EntityRelationship} relationship.Grandchild             The grandchild            
 * @property {EntityRelationship} relationship.Granddaughter             The granddaughter            
 * @property {EntityRelationship} relationship.Grandfather             The grandfather            
 * @property {EntityRelationship} relationship.Grandmother             The grandmother            
 * @property {EntityRelationship} relationship.Grandparent             The grandparent            
 * @property {EntityRelationship} relationship.Grandson             The grandson            
 * @property {EntityRelationship} relationship.GreatGrandfather             The great grandfather            
 * @property {EntityRelationship} relationship.GreatGrandmother             The great grandmother            
 * @property {EntityRelationship} relationship.GreatGrandparent             The great grandparent            
 * @property {EntityRelationship} relationship.Guarantor             The guarantor            
 * @property {EntityRelationship} relationship.GUARD             The guard            
 * @property {EntityRelationship} relationship.Guardian             The guardian            
 * @property {EntityRelationship} relationship.Halfbrother             The halfbrother            
 * @property {EntityRelationship} relationship.Halfsibling             The halfsibling            
 * @property {EntityRelationship} relationship.Halfsister             The halfsister            
 * @property {EntityRelationship} relationship.HealthcareProvider             The healthcare provider            
 * @property {EntityRelationship} relationship.HealthChart             The health chart            
 * @property {EntityRelationship} relationship.HeldEntity             The held entity            
 * @property {EntityRelationship} relationship.Husband             The husband            
 * @property {EntityRelationship} relationship.IdentifiedEntity             The identified entity            
 * @property {EntityRelationship} relationship.IncidentalServiceDeliveryLocation             The incidental service delivery location            
 * @property {EntityRelationship} relationship.Individual             The individual            
 * @property {EntityRelationship} relationship.InvestigationSubject             The investigation subject            
 * @property {EntityRelationship} relationship.InvoicePayor             The invoice payor            
 * @property {EntityRelationship} relationship.Isolate             The isolate            
 * @property {EntityRelationship} relationship.LicensedEntity             The licensed entity            
 * @property {EntityRelationship} relationship.MaintainedEntity             The maintained entity            
 * @property {EntityRelationship} relationship.ManufacturedProduct             The manufactured product            
 * @property {EntityRelationship} relationship.MaternalAunt             The maternal aunt            
 * @property {EntityRelationship} relationship.MaternalCousin             The maternal cousin            
 * @property {EntityRelationship} relationship.MaternalGrandfather             The maternal grandfather            
 * @property {EntityRelationship} relationship.MaternalGrandmother             The maternal grandmother            
 * @property {EntityRelationship} relationship.MaternalGrandparent             The maternal grandparent            
 * @property {EntityRelationship} relationship.MaternalGreatgrandfather             The maternal greatgrandfather            
 * @property {EntityRelationship} relationship.MaternalGreatgrandmother             The maternal greatgrandmother            
 * @property {EntityRelationship} relationship.MaternalGreatgrandparent             The maternal greatgrandparent            
 * @property {EntityRelationship} relationship.MaternalUncle             The maternal uncle            
 * @property {EntityRelationship} relationship.MilitaryPerson             The military person            
 * @property {EntityRelationship} relationship.Mother             The mother            
 * @property {EntityRelationship} relationship.Motherinlaw             The motherinlaw            
 * @property {EntityRelationship} relationship.NamedInsured             The named insured            
 * @property {EntityRelationship} relationship.NaturalBrother             The natural brother            
 * @property {EntityRelationship} relationship.NaturalChild             The natural child            
 * @property {EntityRelationship} relationship.NaturalDaughter             The natural daughter            
 * @property {EntityRelationship} relationship.NaturalFather             The natural father            
 * @property {EntityRelationship} relationship.NaturalFatherOfFetus             The natural father of fetus            
 * @property {EntityRelationship} relationship.NaturalMother             The natural mother            
 * @property {EntityRelationship} relationship.NaturalParent             The natural parent            
 * @property {EntityRelationship} relationship.NaturalSibling             The natural sibling            
 * @property {EntityRelationship} relationship.NaturalSister             The natural sister            
 * @property {EntityRelationship} relationship.NaturalSon             The natural son            
 * @property {EntityRelationship} relationship.Nephew             The nephew            
 * @property {EntityRelationship} relationship.NextOfKin             The next of kin            
 * @property {EntityRelationship} relationship.Niece             The niece            
 * @property {EntityRelationship} relationship.NieceNephew             The niece nephew            
 * @property {EntityRelationship} relationship.NotaryPublic             The notary public            
 * @property {EntityRelationship} relationship.OwnedEntity             The owned entity            
 * @property {EntityRelationship} relationship.Parent             The parent            
 * @property {EntityRelationship} relationship.ParentInlaw             The parent inlaw            
 * @property {EntityRelationship} relationship.Part             The part            
 * @property {EntityRelationship} relationship.PaternalAunt             The paternal aunt            
 * @property {EntityRelationship} relationship.PaternalCousin             The paternal cousin            
 * @property {EntityRelationship} relationship.PaternalGrandfather             The paternal grandfather            
 * @property {EntityRelationship} relationship.PaternalGrandmother             The paternal grandmother            
 * @property {EntityRelationship} relationship.PaternalGrandparent             The paternal grandparent            
 * @property {EntityRelationship} relationship.PaternalGreatgrandfather             The paternal greatgrandfather            
 * @property {EntityRelationship} relationship.PaternalGreatgrandmother             The paternal greatgrandmother            
 * @property {EntityRelationship} relationship.PaternalGreatgrandparent             The paternal greatgrandparent            
 * @property {EntityRelationship} relationship.PaternalUncle             The paternal uncle            
 * @property {EntityRelationship} relationship.Patient             The patient            
 * @property {EntityRelationship} relationship.Payee             The payee            
 * @property {EntityRelationship} relationship.PersonalRelationship             The personal relationship            
 * @property {EntityRelationship} relationship.PlaceOfDeath             The place of death            
 * @property {EntityRelationship} relationship.PolicyHolder             The policy holder            
 * @property {EntityRelationship} relationship.ProgramEligible             The program eligible            
 * @property {EntityRelationship} relationship.QualifiedEntity             The qualified entity            
 * @property {EntityRelationship} relationship.RegulatedProduct             The regulated product            
 * @property {EntityRelationship} relationship.ResearchSubject             The research subject            
 * @property {EntityRelationship} relationship.RetailedMaterial             The retailed material            
 * @property {EntityRelationship} relationship.Roomate             The roomate            
 * @property {EntityRelationship} relationship.ServiceDeliveryLocation             The service delivery location            
 * @property {EntityRelationship} relationship.Sibling             The sibling            
 * @property {EntityRelationship} relationship.SiblingInlaw             The sibling inlaw            
 * @property {EntityRelationship} relationship.SignificantOther             The significant other            
 * @property {EntityRelationship} relationship.SigningAuthorityOrOfficer             The signing authority or officer            
 * @property {EntityRelationship} relationship.Sister             The sister            
 * @property {EntityRelationship} relationship.Sisterinlaw             The sisterinlaw            
 * @property {EntityRelationship} relationship.Son             The son            
 * @property {EntityRelationship} relationship.SonInlaw             The son inlaw            
 * @property {EntityRelationship} relationship.Specimen             The specimen            
 * @property {EntityRelationship} relationship.Spouse             The spouse            
 * @property {EntityRelationship} relationship.Stepbrother             The stepbrother            
 * @property {EntityRelationship} relationship.StepChild             The step child            
 * @property {EntityRelationship} relationship.Stepdaughter             The stepdaughter            
 * @property {EntityRelationship} relationship.Stepfather             The stepfather            
 * @property {EntityRelationship} relationship.Stepmother             The stepmother            
 * @property {EntityRelationship} relationship.StepParent             The step parent            
 * @property {EntityRelationship} relationship.StepSibling             The step sibling            
 * @property {EntityRelationship} relationship.Stepsister             The stepsister            
 * @property {EntityRelationship} relationship.Stepson             The stepson            
 * @property {EntityRelationship} relationship.Student             The student            
 * @property {EntityRelationship} relationship.Subscriber             The subscriber            
 * @property {EntityRelationship} relationship.TerritoryOfAuthority             The territory of authority            
 * @property {EntityRelationship} relationship.TherapeuticAgent             The therapeutic agent            
 * @property {EntityRelationship} relationship.Uncle             The uncle            
 * @property {EntityRelationship} relationship.Underwriter             The underwriter            
 * @property {EntityRelationship} relationship.UsedEntity             The used entity            
 * @property {EntityRelationship} relationship.WarrantedProduct             The warranted product            
 * @property {EntityRelationship} relationship.Wife             The wife            
 * @property {EntityRelationship} relationship.Replaces             The replaces            
 * @property {EntityRelationship} relationship.Instance             The target entity represents an instance of the scoper entity            
 * @property {EntityRelationship} relationship.LocatedEntity             Relates the target entity to a source location            
 * @property {EntityRelationship} relationship.$other Unclassified
 * @property {Concept} statusConceptModel [Delay loaded from statusConcept],             Status concept id            
 * @property {string} statusConcept            Status concept id            (see: {@link StatusKeys} for values)
 * @property {object} tag            Gets a list of all tags associated with the entity            
 * @property {string} tag.classifier  where classifier is from {@link Tag} key
 * @property {object} telecom            Gets a list of all telecommunications addresses associated with the entity            
 * @property {EntityTelecomAddress} telecom.AnsweringService             answering service            
 * @property {EntityTelecomAddress} telecom.EmergencyContact             Emergency contact            
 * @property {EntityTelecomAddress} telecom.MobileContact             Mobile phone contact            
 * @property {EntityTelecomAddress} telecom.Pager             pager            
 * @property {EntityTelecomAddress} telecom.Public             public (800 number example) contact            
 * @property {EntityTelecomAddress} telecom.TemporaryAddress             temporary contact            
 * @property {EntityTelecomAddress} telecom.WorkPlace             For use in the workplace            
 * @property {EntityTelecomAddress} telecom.$other Unclassified
 * @property {string} template            Gets the template key            
 * @property {TemplateDefinition} templateModel [Delay loaded from template],             Gets or sets the template definition            
 * @property {Concept} typeConceptModel [Delay loaded from typeConcept],             Type concept identifier            
 * @property {string} typeConcept            Type concept identifier            
 * @property {string} previousVersion
 * @property {string} version
 * @property {number} sequence
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {Container} copyData Copy constructor (if present)
 */
function Container (copyData) { 
	this.$type = 'Container';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {number} */
	this.sequence = copyData.sequence;
	/** @type {string} */
	this.version = copyData.version;
	/** @type {string} */
	this.previousVersion = copyData.previousVersion;
	/** @type {string} */
	this.typeConcept = copyData.typeConcept;
	/** @type {Concept} */
	this.typeConceptModel = copyData.typeConceptModel;
	/** @type {TemplateDefinition} */
	this.templateModel = copyData.templateModel;
	/** @type {string} */
	this.template = copyData.template;
	/** @type {object} */
	this.telecom = copyData.telecom;
	/** @type {object} */
	this.tag = copyData.tag;
	/** @type {string} */
	this.statusConcept = copyData.statusConcept;
	/** @type {Concept} */
	this.statusConceptModel = copyData.statusConceptModel;
	/** @type {object} */
	this.relationship = copyData.relationship;
	/** @type {object} */
	this.participation = copyData.participation;
	/** @type {string} */
	this.note = copyData.note;
	/** @type {object} */
	this.name = copyData.name;
	/** @type {object} */
	this.identifier = copyData.identifier;
	/** @type {object} */
	this.extension = copyData.extension;
	/** @type {string} */
	this.determinerConcept = copyData.determinerConcept;
	/** @type {Concept} */
	this.determinerConceptModel = copyData.determinerConceptModel;
	/** @type {string} */
	this.creationAct = copyData.creationAct;
	/** @type {Act} */
	this.creationActModel = copyData.creationActModel;
	/** @type {string} */
	this.classConcept = copyData.classConcept;
	/** @type {Concept} */
	this.classConceptModel = copyData.classConceptModel;
	/** @type {object} */
	this.address = copyData.address;
	/** @type {string} */
	this.quantityConcept = copyData.quantityConcept;
	/** @type {Concept} */
	this.quantityConceptModel = copyData.quantityConceptModel;
	/** @type {number} */
	this.quantity = copyData.quantity;
	/** @type {boolean} */
	this.isAdministrative = copyData.isAdministrative;
	/** @type {string} */
	this.formConcept = copyData.formConcept;
	/** @type {Concept} */
	this.formConceptModel = copyData.formConceptModel;
	/** @type {Date} */
	this.expiryDate = copyData.expiryDate;
	/** @type {string} */
	this.lotNumber = copyData.lotNumber;
	/** @type {string} */
	this.separatorTypeConcept = copyData.separatorTypeConcept;
	/** @type {Concept} */
	this.separatorTypeConceptModel = copyData.separatorTypeConceptModel;
	/** @type {number} */
	this.heightQuantity = copyData.heightQuantity;
	/** @type {number} */
	this.diameterQuantity = copyData.diameterQuantity;
	/** @type {string} */
	this.capTypeConcept = copyData.capTypeConcept;
	/** @type {Concept} */
	this.capTypeConceptModel = copyData.capTypeConceptModel;
	/** @type {number} */
	this.capacityQuantity = copyData.capacityQuantity;
	/** @type {number} */
	this.bottomDeltaQuantity = copyData.bottomDeltaQuantity;
	/** @type {number} */
	this.barrierDeltaQuantity = copyData.barrierDeltaQuantity;
	}
}  // Container 
// SanteDB.Core.Model.Entities.UserEntity, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!UserEntity)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends Person
 * @summary             Represents a user entity            
 * @property {SecurityUser} securityUserModel [Delay loaded from securityUser],             Gets or sets the security user key            
 * @property {string} securityUser            Gets or sets the security user key            
 * @property {DatePrecision} dateOfBirthPrecision            Gets or sets the precision ofthe date of birth            (see: {@link DatePrecision} for values)
 * @property {string} dateOfBirth            Gets the date of birth as XML            
 * @property {PersonLanguageCommunication} language            Gets the person's languages of communication            
 * @property {object} address            Gets a list of all addresses associated with the entity            
 * @property {EntityAddress} address.Alphabetic             Represents an alphabetic address used for matching             
 * @property {EntityAddress} address.BadAddress             Represents a bad address, i.e. an address which is old or invalid.            
 * @property {EntityAddress} address.Direct             Represents a workplace address that reaches the person directly without intermediaries.            
 * @property {EntityAddress} address.HomeAddress             The home address            
 * @property {EntityAddress} address.Ideographic             Represents an address expressed in an ideographic manner (example: Kanji)            
 * @property {EntityAddress} address.Phonetic             Represents an address expressed as a phonetic spelling of an ideographic address            
 * @property {EntityAddress} address.PhysicalVisit             The address is a physical place where visits should occur            
 * @property {EntityAddress} address.PostalAddress             The address is a postal address used for the delivery of mail and materials            
 * @property {EntityAddress} address.PrimaryHome             Represents a primary address to reach a contact after business hours.            
 * @property {EntityAddress} address.Public             Represents an address that is a standard address that may be subject to a switchboard or operator prior to reaching the intended entity.            
 * @property {EntityAddress} address.Soundex             Represents an address used for soundex matching purposes.            
 * @property {EntityAddress} address.Syllabic             Represents a syllabic address.            
 * @property {EntityAddress} address.TemporaryAddress             Represents a temporary address that may be good for visiting or mailing.            
 * @property {EntityAddress} address.VacationHome             Represents a vacation home to reach a person while on vacation.            
 * @property {EntityAddress} address.WorkPlace             Represents an office address, should be used for business communications            
 * @property {EntityAddress} address.$other Unclassified
 * @property {Concept} classConceptModel [Delay loaded from classConcept],             Class concept datal load property            
 * @property {string} classConcept            Class concept            (see: {@link EntityClassKeys} for values)
 * @property {Act} creationActModel [Delay loaded from creationAct],             Creation act reference            
 * @property {string} creationAct            Creation act reference            
 * @property {Concept} determinerConceptModel [Delay loaded from determinerConcept],             Determiner concept            
 * @property {string} determinerConcept            Determiner concept            (see: {@link DeterminerKeys} for values)
 * @property {object} extension            Gets a list of all extensions associated with the entity            
 * @property {string} extension.classifier  where classifier is from {@link Extension} extensionType
 * @property {object} identifier            Gets the identifiers associated with this entity            
 * @property {EntityIdentifier} identifier.classifier  where classifier is from {@link IdentifierBase} authority
 * @property {object} name            Gets a list of all names associated with the entity            
 * @property {EntityName} name.Alphabetic             The name used is an alphabetic representation of the name (ex: romaji in Japanese)            
 * @property {EntityName} name.Anonymous             The name is an anonymous name for the object (not the real name but a name used for care delivery)            
 * @property {EntityName} name.Artist             The name represents an artist name or stage name            
 * @property {EntityName} name.Assigned             The name represents an assigned name (given or bestowed by an authority)            
 * @property {EntityName} name.Ideographic             THe name represents an ideographic representation of the name            
 * @property {EntityName} name.Indigenous             The name is an indigenous name or tribal name for the patient            
 * @property {EntityName} name.Legal             The name represents the current legal name of an object (such as a corporate name)            
 * @property {EntityName} name.License             The name represents a name as displayed on a license or known to a license authority            
 * @property {EntityName} name.MaidenName             THe name is a maiden name (name of a patient before marriage)            
 * @property {EntityName} name.OfficialRecord             The name as it appears on an official record            
 * @property {EntityName} name.Phonetic             The name represents a phonetic representation of a name such as a SOUNDEX code            
 * @property {EntityName} name.Pseudonym             The name is a pseudonym for the object or an synonym name            
 * @property {EntityName} name.Religious             The name is to be used for religious purposes (such as baptismal name)            
 * @property {EntityName} name.Search             The name is to be used in the performing of matches only            
 * @property {EntityName} name.Soundex             The name represents the computed soundex code of a name            
 * @property {EntityName} name.Syllabic             The name represents a syllabic name.            
 * @property {EntityName} name.$other Unclassified
 * @property {string} note            Gets a list of all notes associated with the entity            
 * @property {object} participation            Gets the acts in which this entity participates            
 * @property {ActParticipation} participation.Admitter             The player entity was the person who was responsible for admitting the patient into a facility or care scenario.            
 * @property {ActParticipation} participation.Attender             The player entity represents the attending physician for the patient            
 * @property {ActParticipation} participation.Authenticator             The player entity represents an entity which authenticates the provision of care            
 * @property {ActParticipation} participation.Authororiginator             The player entity is responsible for the creation of data described in the act            
 * @property {ActParticipation} participation.Baby             The player is a resultant person in that it was the baby             
 * @property {ActParticipation} participation.Beneficiary             The player is a beneficiary of the act such a receiver of a financial instrument, or other good            
 * @property {ActParticipation} participation.CallbackContact             The player entity represents something that should be contacted upon completion of the act            
 * @property {ActParticipation} participation.CausativeAgent             The player entity is an agent which caused the act to occur            
 * @property {ActParticipation} participation.Consultant             The player entity is acting as a consult to the carrying out of the act            
 * @property {ActParticipation} participation.Consumable             The player entity was or is to be consumed during the process of carrying out the act.            
 * @property {ActParticipation} participation.CoverageTarget             The player entity represents the target coverage entity of the act            
 * @property {ActParticipation} participation.Custodian             The player entity is the data custodian of the act (is responsible for storing and securing the act)            
 * @property {ActParticipation} participation.DataEnterer             The player entity represents the person or device which phisically entered the data at the terminal            
 * @property {ActParticipation} participation.Destination             The player etity represents the ultimate destination of the goods/materials/services described in the act            
 * @property {ActParticipation} participation.Device             The player entity represents the device on which the act or data from the act was acquired or recorded            
 * @property {ActParticipation} participation.DirectTarget             The player entity represents the directed target of care provided in the act            
 * @property {ActParticipation} participation.Discharger             The player entity represents the person who is responsible for the discharging of the patient from an encounter            
 * @property {ActParticipation} participation.Distributor             The player entity is the source distribution point for the financial or material instruments contained in the message            
 * @property {ActParticipation} participation.Donor             The player entity represents the donor of tissue or materials used in the act            
 * @property {ActParticipation} participation.EntryLocation             The location where the act was entered.            
 * @property {ActParticipation} participation.Escort             The player entity was responsible for escorting the patient during the course of the act            
 * @property {ActParticipation} participation.Exposure             The player entity something to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureAgent             The player entity represents the agent (material) to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureSource             The player entity describes the source of the material to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureTarget             The player entity describes the target to which the agent was exposed            
 * @property {ActParticipation} participation.GuarantorParty             The player represents a party which is used as a financial guarantor for payment in the carrying out of the act            
 * @property {ActParticipation} participation.Holder             The player is responsible for holding the act            
 * @property {ActParticipation} participation.IndirectTarget             The entity not directly present in the act but which will be the focust of th act.            
 * @property {ActParticipation} participation.Informant             The player was a person or device which informed data presented in the act. (Example: A mother telling a nurse that their child had a reaction)            
 * @property {ActParticipation} participation.InformationRecipient             The player entity represents something that should be cc'ed on the act            
 * @property {ActParticipation} participation.LegalAuthenticator             The player entity is responsible for legally authenticating the content of the act            
 * @property {ActParticipation} participation.Location             The location where the service was performed.            
 * @property {ActParticipation} participation.NonreuseableDevice             The player represents a consumable that can no longer be used            
 * @property {ActParticipation} participation.Origin             The player represents the origin of the act            
 * @property {ActParticipation} participation.Participation             The player entity participates in the act in no particular classification            
 * @property {ActParticipation} participation.Performer             The player entity is responsible for performing the clinical steps documented in the act            
 * @property {ActParticipation} participation.PrimaryInformationRecipient             The player entity represents a high priority contact which should be informed or cc'ed on the act            
 * @property {ActParticipation} participation.PrimaryPerformer             The player entity was the primary performer of the act. This is used in procedures where more than one performer is present            
 * @property {ActParticipation} participation.Product             The player represents a product that is not necessarily consumed but informs the act            
 * @property {ActParticipation} participation.Receiver             The player represents the entity which is the intended receiver of the act            
 * @property {ActParticipation} participation.RecordTarget             The player represents the entity to which the act is recorded against            
 * @property {ActParticipation} participation.ReferredBy             The player represents the entity which referred the act or caused the act to be undertaken            
 * @property {ActParticipation} participation.ReferredTo             The player entity represents the entity which was referred to            
 * @property {ActParticipation} participation.Referrer             The player entity represents the person who was originally the referrer.            
 * @property {ActParticipation} participation.Remote             The player entity represents a remote portion of the act            
 * @property {ActParticipation} participation.ResponsibleParty             The player entity is ultimately responsible for the carrying out of the act            
 * @property {ActParticipation} participation.ReusableDevice             The player entity represents a device which can be reused in future acts            
 * @property {ActParticipation} participation.SecondaryPerformer             The secondary performing person (support clinician).            
 * @property {ActParticipation} participation.Specimen             The player entity represents a specimen collected for the purpose of testing and diagnosis            
 * @property {ActParticipation} participation.Subject             The player entity is the subject of an act, but not necessarily the record target (meaning the act is about a particular entity but not to be attached to their record)            
 * @property {ActParticipation} participation.Tracker             The player entity is responsible for tracking the progress of the act            
 * @property {ActParticipation} participation.Transcriber             The person who transcribed data from the original act.            
 * @property {ActParticipation} participation.UgentNotificationContact             The player entity represents a contact entity in case of an emergency occurs during the act.            
 * @property {ActParticipation} participation.Verifier             The player entity was responsible for verifying the accuracy of the data in the act            
 * @property {ActParticipation} participation.Via             The player entity represents an entity where the act occurred "via" this entity (i.e. in transport)            
 * @property {ActParticipation} participation.Witness             The player entity represents a legal witness to the act occurring.            
 * @property {ActParticipation} participation.$other Unclassified
 * @property {object} relationship            Gets a list of all associated entities for this entity            
 * @property {EntityRelationship} relationship.Access             The access            
 * @property {EntityRelationship} relationship.ActiveMoiety             The active moiety            
 * @property {EntityRelationship} relationship.AdministerableMaterial             The administerable material            
 * @property {EntityRelationship} relationship.AdoptedChild             The adopted child            
 * @property {EntityRelationship} relationship.AdoptedDaughter             The adopted daughter            
 * @property {EntityRelationship} relationship.AdoptedSon             The adopted son            
 * @property {EntityRelationship} relationship.Affiliate             The affiliate            
 * @property {EntityRelationship} relationship.Agent             The agent            
 * @property {EntityRelationship} relationship.Aliquot             The aliquot            
 * @property {EntityRelationship} relationship.Assigned             The assigned            
 * @property {EntityRelationship} relationship.AssignedEntity             The assigned entity            
 * @property {EntityRelationship} relationship.Aunt             The aunt            
 * @property {EntityRelationship} relationship.Birthplace             The birthplace            
 * @property {EntityRelationship} relationship.Brother             The brother            
 * @property {EntityRelationship} relationship.Brotherinlaw             The brotherinlaw            
 * @property {EntityRelationship} relationship.Caregiver             The caregiver            
 * @property {EntityRelationship} relationship.CaseSubject             The case subject            
 * @property {EntityRelationship} relationship.Child             The child            
 * @property {EntityRelationship} relationship.ChildInlaw             The child inlaw            
 * @property {EntityRelationship} relationship.Citizen             The citizen            
 * @property {EntityRelationship} relationship.Claimant             The claimant            
 * @property {EntityRelationship} relationship.ClinicalResearchInvestigator             The clinical research investigator            
 * @property {EntityRelationship} relationship.ClinicalResearchSponsor             The clinical research sponsor            
 * @property {EntityRelationship} relationship.CommissioningParty             The commissioning party            
 * @property {EntityRelationship} relationship.Contact             The contact            
 * @property {EntityRelationship} relationship.Cousin             The cousin            
 * @property {EntityRelationship} relationship.CoverageSponsor             The coverage sponsor            
 * @property {EntityRelationship} relationship.CoveredParty             The covered party            
 * @property {EntityRelationship} relationship.Daughter             The daughter            
 * @property {EntityRelationship} relationship.DaughterInlaw             The daughter inlaw            
 * @property {EntityRelationship} relationship.DedicatedServiceDeliveryLocation             The dedicated service delivery location            
 * @property {EntityRelationship} relationship.Dependent             The dependent            
 * @property {EntityRelationship} relationship.DistributedMaterial             The distributed material            
 * @property {EntityRelationship} relationship.DomesticPartner             The domestic partner            
 * @property {EntityRelationship} relationship.EmergencyContact             The emergency contact            
 * @property {EntityRelationship} relationship.Employee             The employee            
 * @property {EntityRelationship} relationship.ExposedEntity             The exposed entity            
 * @property {EntityRelationship} relationship.FamilyMember             The family member            
 * @property {EntityRelationship} relationship.Father             The father            
 * @property {EntityRelationship} relationship.Fatherinlaw             The fatherinlaw            
 * @property {EntityRelationship} relationship.FosterChild             The foster child            
 * @property {EntityRelationship} relationship.FosterDaughter             The foster daughter            
 * @property {EntityRelationship} relationship.FosterSon             The foster son            
 * @property {EntityRelationship} relationship.Grandchild             The grandchild            
 * @property {EntityRelationship} relationship.Granddaughter             The granddaughter            
 * @property {EntityRelationship} relationship.Grandfather             The grandfather            
 * @property {EntityRelationship} relationship.Grandmother             The grandmother            
 * @property {EntityRelationship} relationship.Grandparent             The grandparent            
 * @property {EntityRelationship} relationship.Grandson             The grandson            
 * @property {EntityRelationship} relationship.GreatGrandfather             The great grandfather            
 * @property {EntityRelationship} relationship.GreatGrandmother             The great grandmother            
 * @property {EntityRelationship} relationship.GreatGrandparent             The great grandparent            
 * @property {EntityRelationship} relationship.Guarantor             The guarantor            
 * @property {EntityRelationship} relationship.GUARD             The guard            
 * @property {EntityRelationship} relationship.Guardian             The guardian            
 * @property {EntityRelationship} relationship.Halfbrother             The halfbrother            
 * @property {EntityRelationship} relationship.Halfsibling             The halfsibling            
 * @property {EntityRelationship} relationship.Halfsister             The halfsister            
 * @property {EntityRelationship} relationship.HealthcareProvider             The healthcare provider            
 * @property {EntityRelationship} relationship.HealthChart             The health chart            
 * @property {EntityRelationship} relationship.HeldEntity             The held entity            
 * @property {EntityRelationship} relationship.Husband             The husband            
 * @property {EntityRelationship} relationship.IdentifiedEntity             The identified entity            
 * @property {EntityRelationship} relationship.IncidentalServiceDeliveryLocation             The incidental service delivery location            
 * @property {EntityRelationship} relationship.Individual             The individual            
 * @property {EntityRelationship} relationship.InvestigationSubject             The investigation subject            
 * @property {EntityRelationship} relationship.InvoicePayor             The invoice payor            
 * @property {EntityRelationship} relationship.Isolate             The isolate            
 * @property {EntityRelationship} relationship.LicensedEntity             The licensed entity            
 * @property {EntityRelationship} relationship.MaintainedEntity             The maintained entity            
 * @property {EntityRelationship} relationship.ManufacturedProduct             The manufactured product            
 * @property {EntityRelationship} relationship.MaternalAunt             The maternal aunt            
 * @property {EntityRelationship} relationship.MaternalCousin             The maternal cousin            
 * @property {EntityRelationship} relationship.MaternalGrandfather             The maternal grandfather            
 * @property {EntityRelationship} relationship.MaternalGrandmother             The maternal grandmother            
 * @property {EntityRelationship} relationship.MaternalGrandparent             The maternal grandparent            
 * @property {EntityRelationship} relationship.MaternalGreatgrandfather             The maternal greatgrandfather            
 * @property {EntityRelationship} relationship.MaternalGreatgrandmother             The maternal greatgrandmother            
 * @property {EntityRelationship} relationship.MaternalGreatgrandparent             The maternal greatgrandparent            
 * @property {EntityRelationship} relationship.MaternalUncle             The maternal uncle            
 * @property {EntityRelationship} relationship.MilitaryPerson             The military person            
 * @property {EntityRelationship} relationship.Mother             The mother            
 * @property {EntityRelationship} relationship.Motherinlaw             The motherinlaw            
 * @property {EntityRelationship} relationship.NamedInsured             The named insured            
 * @property {EntityRelationship} relationship.NaturalBrother             The natural brother            
 * @property {EntityRelationship} relationship.NaturalChild             The natural child            
 * @property {EntityRelationship} relationship.NaturalDaughter             The natural daughter            
 * @property {EntityRelationship} relationship.NaturalFather             The natural father            
 * @property {EntityRelationship} relationship.NaturalFatherOfFetus             The natural father of fetus            
 * @property {EntityRelationship} relationship.NaturalMother             The natural mother            
 * @property {EntityRelationship} relationship.NaturalParent             The natural parent            
 * @property {EntityRelationship} relationship.NaturalSibling             The natural sibling            
 * @property {EntityRelationship} relationship.NaturalSister             The natural sister            
 * @property {EntityRelationship} relationship.NaturalSon             The natural son            
 * @property {EntityRelationship} relationship.Nephew             The nephew            
 * @property {EntityRelationship} relationship.NextOfKin             The next of kin            
 * @property {EntityRelationship} relationship.Niece             The niece            
 * @property {EntityRelationship} relationship.NieceNephew             The niece nephew            
 * @property {EntityRelationship} relationship.NotaryPublic             The notary public            
 * @property {EntityRelationship} relationship.OwnedEntity             The owned entity            
 * @property {EntityRelationship} relationship.Parent             The parent            
 * @property {EntityRelationship} relationship.ParentInlaw             The parent inlaw            
 * @property {EntityRelationship} relationship.Part             The part            
 * @property {EntityRelationship} relationship.PaternalAunt             The paternal aunt            
 * @property {EntityRelationship} relationship.PaternalCousin             The paternal cousin            
 * @property {EntityRelationship} relationship.PaternalGrandfather             The paternal grandfather            
 * @property {EntityRelationship} relationship.PaternalGrandmother             The paternal grandmother            
 * @property {EntityRelationship} relationship.PaternalGrandparent             The paternal grandparent            
 * @property {EntityRelationship} relationship.PaternalGreatgrandfather             The paternal greatgrandfather            
 * @property {EntityRelationship} relationship.PaternalGreatgrandmother             The paternal greatgrandmother            
 * @property {EntityRelationship} relationship.PaternalGreatgrandparent             The paternal greatgrandparent            
 * @property {EntityRelationship} relationship.PaternalUncle             The paternal uncle            
 * @property {EntityRelationship} relationship.Patient             The patient            
 * @property {EntityRelationship} relationship.Payee             The payee            
 * @property {EntityRelationship} relationship.PersonalRelationship             The personal relationship            
 * @property {EntityRelationship} relationship.PlaceOfDeath             The place of death            
 * @property {EntityRelationship} relationship.PolicyHolder             The policy holder            
 * @property {EntityRelationship} relationship.ProgramEligible             The program eligible            
 * @property {EntityRelationship} relationship.QualifiedEntity             The qualified entity            
 * @property {EntityRelationship} relationship.RegulatedProduct             The regulated product            
 * @property {EntityRelationship} relationship.ResearchSubject             The research subject            
 * @property {EntityRelationship} relationship.RetailedMaterial             The retailed material            
 * @property {EntityRelationship} relationship.Roomate             The roomate            
 * @property {EntityRelationship} relationship.ServiceDeliveryLocation             The service delivery location            
 * @property {EntityRelationship} relationship.Sibling             The sibling            
 * @property {EntityRelationship} relationship.SiblingInlaw             The sibling inlaw            
 * @property {EntityRelationship} relationship.SignificantOther             The significant other            
 * @property {EntityRelationship} relationship.SigningAuthorityOrOfficer             The signing authority or officer            
 * @property {EntityRelationship} relationship.Sister             The sister            
 * @property {EntityRelationship} relationship.Sisterinlaw             The sisterinlaw            
 * @property {EntityRelationship} relationship.Son             The son            
 * @property {EntityRelationship} relationship.SonInlaw             The son inlaw            
 * @property {EntityRelationship} relationship.Specimen             The specimen            
 * @property {EntityRelationship} relationship.Spouse             The spouse            
 * @property {EntityRelationship} relationship.Stepbrother             The stepbrother            
 * @property {EntityRelationship} relationship.StepChild             The step child            
 * @property {EntityRelationship} relationship.Stepdaughter             The stepdaughter            
 * @property {EntityRelationship} relationship.Stepfather             The stepfather            
 * @property {EntityRelationship} relationship.Stepmother             The stepmother            
 * @property {EntityRelationship} relationship.StepParent             The step parent            
 * @property {EntityRelationship} relationship.StepSibling             The step sibling            
 * @property {EntityRelationship} relationship.Stepsister             The stepsister            
 * @property {EntityRelationship} relationship.Stepson             The stepson            
 * @property {EntityRelationship} relationship.Student             The student            
 * @property {EntityRelationship} relationship.Subscriber             The subscriber            
 * @property {EntityRelationship} relationship.TerritoryOfAuthority             The territory of authority            
 * @property {EntityRelationship} relationship.TherapeuticAgent             The therapeutic agent            
 * @property {EntityRelationship} relationship.Uncle             The uncle            
 * @property {EntityRelationship} relationship.Underwriter             The underwriter            
 * @property {EntityRelationship} relationship.UsedEntity             The used entity            
 * @property {EntityRelationship} relationship.WarrantedProduct             The warranted product            
 * @property {EntityRelationship} relationship.Wife             The wife            
 * @property {EntityRelationship} relationship.Replaces             The replaces            
 * @property {EntityRelationship} relationship.Instance             The target entity represents an instance of the scoper entity            
 * @property {EntityRelationship} relationship.LocatedEntity             Relates the target entity to a source location            
 * @property {EntityRelationship} relationship.$other Unclassified
 * @property {Concept} statusConceptModel [Delay loaded from statusConcept],             Status concept id            
 * @property {string} statusConcept            Status concept id            (see: {@link StatusKeys} for values)
 * @property {object} tag            Gets a list of all tags associated with the entity            
 * @property {string} tag.classifier  where classifier is from {@link Tag} key
 * @property {object} telecom            Gets a list of all telecommunications addresses associated with the entity            
 * @property {EntityTelecomAddress} telecom.AnsweringService             answering service            
 * @property {EntityTelecomAddress} telecom.EmergencyContact             Emergency contact            
 * @property {EntityTelecomAddress} telecom.MobileContact             Mobile phone contact            
 * @property {EntityTelecomAddress} telecom.Pager             pager            
 * @property {EntityTelecomAddress} telecom.Public             public (800 number example) contact            
 * @property {EntityTelecomAddress} telecom.TemporaryAddress             temporary contact            
 * @property {EntityTelecomAddress} telecom.WorkPlace             For use in the workplace            
 * @property {EntityTelecomAddress} telecom.$other Unclassified
 * @property {string} template            Gets the template key            
 * @property {TemplateDefinition} templateModel [Delay loaded from template],             Gets or sets the template definition            
 * @property {Concept} typeConceptModel [Delay loaded from typeConcept],             Type concept identifier            
 * @property {string} typeConcept            Type concept identifier            
 * @property {string} previousVersion
 * @property {string} version
 * @property {number} sequence
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {UserEntity} copyData Copy constructor (if present)
 */
function UserEntity (copyData) { 
	this.$type = 'UserEntity';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {number} */
	this.sequence = copyData.sequence;
	/** @type {string} */
	this.version = copyData.version;
	/** @type {string} */
	this.previousVersion = copyData.previousVersion;
	/** @type {string} */
	this.typeConcept = copyData.typeConcept;
	/** @type {Concept} */
	this.typeConceptModel = copyData.typeConceptModel;
	/** @type {TemplateDefinition} */
	this.templateModel = copyData.templateModel;
	/** @type {string} */
	this.template = copyData.template;
	/** @type {object} */
	this.telecom = copyData.telecom;
	/** @type {object} */
	this.tag = copyData.tag;
	/** @type {string} */
	this.statusConcept = copyData.statusConcept;
	/** @type {Concept} */
	this.statusConceptModel = copyData.statusConceptModel;
	/** @type {object} */
	this.relationship = copyData.relationship;
	/** @type {object} */
	this.participation = copyData.participation;
	/** @type {string} */
	this.note = copyData.note;
	/** @type {object} */
	this.name = copyData.name;
	/** @type {object} */
	this.identifier = copyData.identifier;
	/** @type {object} */
	this.extension = copyData.extension;
	/** @type {string} */
	this.determinerConcept = copyData.determinerConcept;
	/** @type {Concept} */
	this.determinerConceptModel = copyData.determinerConceptModel;
	/** @type {string} */
	this.creationAct = copyData.creationAct;
	/** @type {Act} */
	this.creationActModel = copyData.creationActModel;
	/** @type {string} */
	this.classConcept = copyData.classConcept;
	/** @type {Concept} */
	this.classConceptModel = copyData.classConceptModel;
	/** @type {object} */
	this.address = copyData.address;
	/** @type {PersonLanguageCommunication} */
	this.language = copyData.language;
	/** @type {string} */
	this.dateOfBirth = copyData.dateOfBirth;
	/** @type {DatePrecision} */
	this.dateOfBirthPrecision = copyData.dateOfBirthPrecision;
	/** @type {string} */
	this.securityUser = copyData.securityUser;
	/** @type {SecurityUser} */
	this.securityUserModel = copyData.securityUserModel;
	}
}  // UserEntity 
// SanteDB.Core.Model.Entities.ApplicationEntity, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ApplicationEntity)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends Entity
 * @summary             An associative entity which links a SecurityApplication to an Entity            
 * @property {SecurityApplication} securityApplicationModel [Delay loaded from securityApplication],             Gets or sets the security application            
 * @property {string} securityApplication            Gets or sets the security application            
 * @property {string} softwareName            Gets or sets the name of the software            
 * @property {string} vendorName            Gets or sets the vendoer name of the software            
 * @property {string} versionName            Gets or sets the version of the software            
 * @property {object} address            Gets a list of all addresses associated with the entity            
 * @property {EntityAddress} address.Alphabetic             Represents an alphabetic address used for matching             
 * @property {EntityAddress} address.BadAddress             Represents a bad address, i.e. an address which is old or invalid.            
 * @property {EntityAddress} address.Direct             Represents a workplace address that reaches the person directly without intermediaries.            
 * @property {EntityAddress} address.HomeAddress             The home address            
 * @property {EntityAddress} address.Ideographic             Represents an address expressed in an ideographic manner (example: Kanji)            
 * @property {EntityAddress} address.Phonetic             Represents an address expressed as a phonetic spelling of an ideographic address            
 * @property {EntityAddress} address.PhysicalVisit             The address is a physical place where visits should occur            
 * @property {EntityAddress} address.PostalAddress             The address is a postal address used for the delivery of mail and materials            
 * @property {EntityAddress} address.PrimaryHome             Represents a primary address to reach a contact after business hours.            
 * @property {EntityAddress} address.Public             Represents an address that is a standard address that may be subject to a switchboard or operator prior to reaching the intended entity.            
 * @property {EntityAddress} address.Soundex             Represents an address used for soundex matching purposes.            
 * @property {EntityAddress} address.Syllabic             Represents a syllabic address.            
 * @property {EntityAddress} address.TemporaryAddress             Represents a temporary address that may be good for visiting or mailing.            
 * @property {EntityAddress} address.VacationHome             Represents a vacation home to reach a person while on vacation.            
 * @property {EntityAddress} address.WorkPlace             Represents an office address, should be used for business communications            
 * @property {EntityAddress} address.$other Unclassified
 * @property {Concept} classConceptModel [Delay loaded from classConcept],             Class concept datal load property            
 * @property {string} classConcept            Class concept            (see: {@link EntityClassKeys} for values)
 * @property {Act} creationActModel [Delay loaded from creationAct],             Creation act reference            
 * @property {string} creationAct            Creation act reference            
 * @property {Concept} determinerConceptModel [Delay loaded from determinerConcept],             Determiner concept            
 * @property {string} determinerConcept            Determiner concept            (see: {@link DeterminerKeys} for values)
 * @property {object} extension            Gets a list of all extensions associated with the entity            
 * @property {string} extension.classifier  where classifier is from {@link Extension} extensionType
 * @property {object} identifier            Gets the identifiers associated with this entity            
 * @property {EntityIdentifier} identifier.classifier  where classifier is from {@link IdentifierBase} authority
 * @property {object} name            Gets a list of all names associated with the entity            
 * @property {EntityName} name.Alphabetic             The name used is an alphabetic representation of the name (ex: romaji in Japanese)            
 * @property {EntityName} name.Anonymous             The name is an anonymous name for the object (not the real name but a name used for care delivery)            
 * @property {EntityName} name.Artist             The name represents an artist name or stage name            
 * @property {EntityName} name.Assigned             The name represents an assigned name (given or bestowed by an authority)            
 * @property {EntityName} name.Ideographic             THe name represents an ideographic representation of the name            
 * @property {EntityName} name.Indigenous             The name is an indigenous name or tribal name for the patient            
 * @property {EntityName} name.Legal             The name represents the current legal name of an object (such as a corporate name)            
 * @property {EntityName} name.License             The name represents a name as displayed on a license or known to a license authority            
 * @property {EntityName} name.MaidenName             THe name is a maiden name (name of a patient before marriage)            
 * @property {EntityName} name.OfficialRecord             The name as it appears on an official record            
 * @property {EntityName} name.Phonetic             The name represents a phonetic representation of a name such as a SOUNDEX code            
 * @property {EntityName} name.Pseudonym             The name is a pseudonym for the object or an synonym name            
 * @property {EntityName} name.Religious             The name is to be used for religious purposes (such as baptismal name)            
 * @property {EntityName} name.Search             The name is to be used in the performing of matches only            
 * @property {EntityName} name.Soundex             The name represents the computed soundex code of a name            
 * @property {EntityName} name.Syllabic             The name represents a syllabic name.            
 * @property {EntityName} name.$other Unclassified
 * @property {string} note            Gets a list of all notes associated with the entity            
 * @property {object} participation            Gets the acts in which this entity participates            
 * @property {ActParticipation} participation.Admitter             The player entity was the person who was responsible for admitting the patient into a facility or care scenario.            
 * @property {ActParticipation} participation.Attender             The player entity represents the attending physician for the patient            
 * @property {ActParticipation} participation.Authenticator             The player entity represents an entity which authenticates the provision of care            
 * @property {ActParticipation} participation.Authororiginator             The player entity is responsible for the creation of data described in the act            
 * @property {ActParticipation} participation.Baby             The player is a resultant person in that it was the baby             
 * @property {ActParticipation} participation.Beneficiary             The player is a beneficiary of the act such a receiver of a financial instrument, or other good            
 * @property {ActParticipation} participation.CallbackContact             The player entity represents something that should be contacted upon completion of the act            
 * @property {ActParticipation} participation.CausativeAgent             The player entity is an agent which caused the act to occur            
 * @property {ActParticipation} participation.Consultant             The player entity is acting as a consult to the carrying out of the act            
 * @property {ActParticipation} participation.Consumable             The player entity was or is to be consumed during the process of carrying out the act.            
 * @property {ActParticipation} participation.CoverageTarget             The player entity represents the target coverage entity of the act            
 * @property {ActParticipation} participation.Custodian             The player entity is the data custodian of the act (is responsible for storing and securing the act)            
 * @property {ActParticipation} participation.DataEnterer             The player entity represents the person or device which phisically entered the data at the terminal            
 * @property {ActParticipation} participation.Destination             The player etity represents the ultimate destination of the goods/materials/services described in the act            
 * @property {ActParticipation} participation.Device             The player entity represents the device on which the act or data from the act was acquired or recorded            
 * @property {ActParticipation} participation.DirectTarget             The player entity represents the directed target of care provided in the act            
 * @property {ActParticipation} participation.Discharger             The player entity represents the person who is responsible for the discharging of the patient from an encounter            
 * @property {ActParticipation} participation.Distributor             The player entity is the source distribution point for the financial or material instruments contained in the message            
 * @property {ActParticipation} participation.Donor             The player entity represents the donor of tissue or materials used in the act            
 * @property {ActParticipation} participation.EntryLocation             The location where the act was entered.            
 * @property {ActParticipation} participation.Escort             The player entity was responsible for escorting the patient during the course of the act            
 * @property {ActParticipation} participation.Exposure             The player entity something to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureAgent             The player entity represents the agent (material) to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureSource             The player entity describes the source of the material to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureTarget             The player entity describes the target to which the agent was exposed            
 * @property {ActParticipation} participation.GuarantorParty             The player represents a party which is used as a financial guarantor for payment in the carrying out of the act            
 * @property {ActParticipation} participation.Holder             The player is responsible for holding the act            
 * @property {ActParticipation} participation.IndirectTarget             The entity not directly present in the act but which will be the focust of th act.            
 * @property {ActParticipation} participation.Informant             The player was a person or device which informed data presented in the act. (Example: A mother telling a nurse that their child had a reaction)            
 * @property {ActParticipation} participation.InformationRecipient             The player entity represents something that should be cc'ed on the act            
 * @property {ActParticipation} participation.LegalAuthenticator             The player entity is responsible for legally authenticating the content of the act            
 * @property {ActParticipation} participation.Location             The location where the service was performed.            
 * @property {ActParticipation} participation.NonreuseableDevice             The player represents a consumable that can no longer be used            
 * @property {ActParticipation} participation.Origin             The player represents the origin of the act            
 * @property {ActParticipation} participation.Participation             The player entity participates in the act in no particular classification            
 * @property {ActParticipation} participation.Performer             The player entity is responsible for performing the clinical steps documented in the act            
 * @property {ActParticipation} participation.PrimaryInformationRecipient             The player entity represents a high priority contact which should be informed or cc'ed on the act            
 * @property {ActParticipation} participation.PrimaryPerformer             The player entity was the primary performer of the act. This is used in procedures where more than one performer is present            
 * @property {ActParticipation} participation.Product             The player represents a product that is not necessarily consumed but informs the act            
 * @property {ActParticipation} participation.Receiver             The player represents the entity which is the intended receiver of the act            
 * @property {ActParticipation} participation.RecordTarget             The player represents the entity to which the act is recorded against            
 * @property {ActParticipation} participation.ReferredBy             The player represents the entity which referred the act or caused the act to be undertaken            
 * @property {ActParticipation} participation.ReferredTo             The player entity represents the entity which was referred to            
 * @property {ActParticipation} participation.Referrer             The player entity represents the person who was originally the referrer.            
 * @property {ActParticipation} participation.Remote             The player entity represents a remote portion of the act            
 * @property {ActParticipation} participation.ResponsibleParty             The player entity is ultimately responsible for the carrying out of the act            
 * @property {ActParticipation} participation.ReusableDevice             The player entity represents a device which can be reused in future acts            
 * @property {ActParticipation} participation.SecondaryPerformer             The secondary performing person (support clinician).            
 * @property {ActParticipation} participation.Specimen             The player entity represents a specimen collected for the purpose of testing and diagnosis            
 * @property {ActParticipation} participation.Subject             The player entity is the subject of an act, but not necessarily the record target (meaning the act is about a particular entity but not to be attached to their record)            
 * @property {ActParticipation} participation.Tracker             The player entity is responsible for tracking the progress of the act            
 * @property {ActParticipation} participation.Transcriber             The person who transcribed data from the original act.            
 * @property {ActParticipation} participation.UgentNotificationContact             The player entity represents a contact entity in case of an emergency occurs during the act.            
 * @property {ActParticipation} participation.Verifier             The player entity was responsible for verifying the accuracy of the data in the act            
 * @property {ActParticipation} participation.Via             The player entity represents an entity where the act occurred "via" this entity (i.e. in transport)            
 * @property {ActParticipation} participation.Witness             The player entity represents a legal witness to the act occurring.            
 * @property {ActParticipation} participation.$other Unclassified
 * @property {object} relationship            Gets a list of all associated entities for this entity            
 * @property {EntityRelationship} relationship.Access             The access            
 * @property {EntityRelationship} relationship.ActiveMoiety             The active moiety            
 * @property {EntityRelationship} relationship.AdministerableMaterial             The administerable material            
 * @property {EntityRelationship} relationship.AdoptedChild             The adopted child            
 * @property {EntityRelationship} relationship.AdoptedDaughter             The adopted daughter            
 * @property {EntityRelationship} relationship.AdoptedSon             The adopted son            
 * @property {EntityRelationship} relationship.Affiliate             The affiliate            
 * @property {EntityRelationship} relationship.Agent             The agent            
 * @property {EntityRelationship} relationship.Aliquot             The aliquot            
 * @property {EntityRelationship} relationship.Assigned             The assigned            
 * @property {EntityRelationship} relationship.AssignedEntity             The assigned entity            
 * @property {EntityRelationship} relationship.Aunt             The aunt            
 * @property {EntityRelationship} relationship.Birthplace             The birthplace            
 * @property {EntityRelationship} relationship.Brother             The brother            
 * @property {EntityRelationship} relationship.Brotherinlaw             The brotherinlaw            
 * @property {EntityRelationship} relationship.Caregiver             The caregiver            
 * @property {EntityRelationship} relationship.CaseSubject             The case subject            
 * @property {EntityRelationship} relationship.Child             The child            
 * @property {EntityRelationship} relationship.ChildInlaw             The child inlaw            
 * @property {EntityRelationship} relationship.Citizen             The citizen            
 * @property {EntityRelationship} relationship.Claimant             The claimant            
 * @property {EntityRelationship} relationship.ClinicalResearchInvestigator             The clinical research investigator            
 * @property {EntityRelationship} relationship.ClinicalResearchSponsor             The clinical research sponsor            
 * @property {EntityRelationship} relationship.CommissioningParty             The commissioning party            
 * @property {EntityRelationship} relationship.Contact             The contact            
 * @property {EntityRelationship} relationship.Cousin             The cousin            
 * @property {EntityRelationship} relationship.CoverageSponsor             The coverage sponsor            
 * @property {EntityRelationship} relationship.CoveredParty             The covered party            
 * @property {EntityRelationship} relationship.Daughter             The daughter            
 * @property {EntityRelationship} relationship.DaughterInlaw             The daughter inlaw            
 * @property {EntityRelationship} relationship.DedicatedServiceDeliveryLocation             The dedicated service delivery location            
 * @property {EntityRelationship} relationship.Dependent             The dependent            
 * @property {EntityRelationship} relationship.DistributedMaterial             The distributed material            
 * @property {EntityRelationship} relationship.DomesticPartner             The domestic partner            
 * @property {EntityRelationship} relationship.EmergencyContact             The emergency contact            
 * @property {EntityRelationship} relationship.Employee             The employee            
 * @property {EntityRelationship} relationship.ExposedEntity             The exposed entity            
 * @property {EntityRelationship} relationship.FamilyMember             The family member            
 * @property {EntityRelationship} relationship.Father             The father            
 * @property {EntityRelationship} relationship.Fatherinlaw             The fatherinlaw            
 * @property {EntityRelationship} relationship.FosterChild             The foster child            
 * @property {EntityRelationship} relationship.FosterDaughter             The foster daughter            
 * @property {EntityRelationship} relationship.FosterSon             The foster son            
 * @property {EntityRelationship} relationship.Grandchild             The grandchild            
 * @property {EntityRelationship} relationship.Granddaughter             The granddaughter            
 * @property {EntityRelationship} relationship.Grandfather             The grandfather            
 * @property {EntityRelationship} relationship.Grandmother             The grandmother            
 * @property {EntityRelationship} relationship.Grandparent             The grandparent            
 * @property {EntityRelationship} relationship.Grandson             The grandson            
 * @property {EntityRelationship} relationship.GreatGrandfather             The great grandfather            
 * @property {EntityRelationship} relationship.GreatGrandmother             The great grandmother            
 * @property {EntityRelationship} relationship.GreatGrandparent             The great grandparent            
 * @property {EntityRelationship} relationship.Guarantor             The guarantor            
 * @property {EntityRelationship} relationship.GUARD             The guard            
 * @property {EntityRelationship} relationship.Guardian             The guardian            
 * @property {EntityRelationship} relationship.Halfbrother             The halfbrother            
 * @property {EntityRelationship} relationship.Halfsibling             The halfsibling            
 * @property {EntityRelationship} relationship.Halfsister             The halfsister            
 * @property {EntityRelationship} relationship.HealthcareProvider             The healthcare provider            
 * @property {EntityRelationship} relationship.HealthChart             The health chart            
 * @property {EntityRelationship} relationship.HeldEntity             The held entity            
 * @property {EntityRelationship} relationship.Husband             The husband            
 * @property {EntityRelationship} relationship.IdentifiedEntity             The identified entity            
 * @property {EntityRelationship} relationship.IncidentalServiceDeliveryLocation             The incidental service delivery location            
 * @property {EntityRelationship} relationship.Individual             The individual            
 * @property {EntityRelationship} relationship.InvestigationSubject             The investigation subject            
 * @property {EntityRelationship} relationship.InvoicePayor             The invoice payor            
 * @property {EntityRelationship} relationship.Isolate             The isolate            
 * @property {EntityRelationship} relationship.LicensedEntity             The licensed entity            
 * @property {EntityRelationship} relationship.MaintainedEntity             The maintained entity            
 * @property {EntityRelationship} relationship.ManufacturedProduct             The manufactured product            
 * @property {EntityRelationship} relationship.MaternalAunt             The maternal aunt            
 * @property {EntityRelationship} relationship.MaternalCousin             The maternal cousin            
 * @property {EntityRelationship} relationship.MaternalGrandfather             The maternal grandfather            
 * @property {EntityRelationship} relationship.MaternalGrandmother             The maternal grandmother            
 * @property {EntityRelationship} relationship.MaternalGrandparent             The maternal grandparent            
 * @property {EntityRelationship} relationship.MaternalGreatgrandfather             The maternal greatgrandfather            
 * @property {EntityRelationship} relationship.MaternalGreatgrandmother             The maternal greatgrandmother            
 * @property {EntityRelationship} relationship.MaternalGreatgrandparent             The maternal greatgrandparent            
 * @property {EntityRelationship} relationship.MaternalUncle             The maternal uncle            
 * @property {EntityRelationship} relationship.MilitaryPerson             The military person            
 * @property {EntityRelationship} relationship.Mother             The mother            
 * @property {EntityRelationship} relationship.Motherinlaw             The motherinlaw            
 * @property {EntityRelationship} relationship.NamedInsured             The named insured            
 * @property {EntityRelationship} relationship.NaturalBrother             The natural brother            
 * @property {EntityRelationship} relationship.NaturalChild             The natural child            
 * @property {EntityRelationship} relationship.NaturalDaughter             The natural daughter            
 * @property {EntityRelationship} relationship.NaturalFather             The natural father            
 * @property {EntityRelationship} relationship.NaturalFatherOfFetus             The natural father of fetus            
 * @property {EntityRelationship} relationship.NaturalMother             The natural mother            
 * @property {EntityRelationship} relationship.NaturalParent             The natural parent            
 * @property {EntityRelationship} relationship.NaturalSibling             The natural sibling            
 * @property {EntityRelationship} relationship.NaturalSister             The natural sister            
 * @property {EntityRelationship} relationship.NaturalSon             The natural son            
 * @property {EntityRelationship} relationship.Nephew             The nephew            
 * @property {EntityRelationship} relationship.NextOfKin             The next of kin            
 * @property {EntityRelationship} relationship.Niece             The niece            
 * @property {EntityRelationship} relationship.NieceNephew             The niece nephew            
 * @property {EntityRelationship} relationship.NotaryPublic             The notary public            
 * @property {EntityRelationship} relationship.OwnedEntity             The owned entity            
 * @property {EntityRelationship} relationship.Parent             The parent            
 * @property {EntityRelationship} relationship.ParentInlaw             The parent inlaw            
 * @property {EntityRelationship} relationship.Part             The part            
 * @property {EntityRelationship} relationship.PaternalAunt             The paternal aunt            
 * @property {EntityRelationship} relationship.PaternalCousin             The paternal cousin            
 * @property {EntityRelationship} relationship.PaternalGrandfather             The paternal grandfather            
 * @property {EntityRelationship} relationship.PaternalGrandmother             The paternal grandmother            
 * @property {EntityRelationship} relationship.PaternalGrandparent             The paternal grandparent            
 * @property {EntityRelationship} relationship.PaternalGreatgrandfather             The paternal greatgrandfather            
 * @property {EntityRelationship} relationship.PaternalGreatgrandmother             The paternal greatgrandmother            
 * @property {EntityRelationship} relationship.PaternalGreatgrandparent             The paternal greatgrandparent            
 * @property {EntityRelationship} relationship.PaternalUncle             The paternal uncle            
 * @property {EntityRelationship} relationship.Patient             The patient            
 * @property {EntityRelationship} relationship.Payee             The payee            
 * @property {EntityRelationship} relationship.PersonalRelationship             The personal relationship            
 * @property {EntityRelationship} relationship.PlaceOfDeath             The place of death            
 * @property {EntityRelationship} relationship.PolicyHolder             The policy holder            
 * @property {EntityRelationship} relationship.ProgramEligible             The program eligible            
 * @property {EntityRelationship} relationship.QualifiedEntity             The qualified entity            
 * @property {EntityRelationship} relationship.RegulatedProduct             The regulated product            
 * @property {EntityRelationship} relationship.ResearchSubject             The research subject            
 * @property {EntityRelationship} relationship.RetailedMaterial             The retailed material            
 * @property {EntityRelationship} relationship.Roomate             The roomate            
 * @property {EntityRelationship} relationship.ServiceDeliveryLocation             The service delivery location            
 * @property {EntityRelationship} relationship.Sibling             The sibling            
 * @property {EntityRelationship} relationship.SiblingInlaw             The sibling inlaw            
 * @property {EntityRelationship} relationship.SignificantOther             The significant other            
 * @property {EntityRelationship} relationship.SigningAuthorityOrOfficer             The signing authority or officer            
 * @property {EntityRelationship} relationship.Sister             The sister            
 * @property {EntityRelationship} relationship.Sisterinlaw             The sisterinlaw            
 * @property {EntityRelationship} relationship.Son             The son            
 * @property {EntityRelationship} relationship.SonInlaw             The son inlaw            
 * @property {EntityRelationship} relationship.Specimen             The specimen            
 * @property {EntityRelationship} relationship.Spouse             The spouse            
 * @property {EntityRelationship} relationship.Stepbrother             The stepbrother            
 * @property {EntityRelationship} relationship.StepChild             The step child            
 * @property {EntityRelationship} relationship.Stepdaughter             The stepdaughter            
 * @property {EntityRelationship} relationship.Stepfather             The stepfather            
 * @property {EntityRelationship} relationship.Stepmother             The stepmother            
 * @property {EntityRelationship} relationship.StepParent             The step parent            
 * @property {EntityRelationship} relationship.StepSibling             The step sibling            
 * @property {EntityRelationship} relationship.Stepsister             The stepsister            
 * @property {EntityRelationship} relationship.Stepson             The stepson            
 * @property {EntityRelationship} relationship.Student             The student            
 * @property {EntityRelationship} relationship.Subscriber             The subscriber            
 * @property {EntityRelationship} relationship.TerritoryOfAuthority             The territory of authority            
 * @property {EntityRelationship} relationship.TherapeuticAgent             The therapeutic agent            
 * @property {EntityRelationship} relationship.Uncle             The uncle            
 * @property {EntityRelationship} relationship.Underwriter             The underwriter            
 * @property {EntityRelationship} relationship.UsedEntity             The used entity            
 * @property {EntityRelationship} relationship.WarrantedProduct             The warranted product            
 * @property {EntityRelationship} relationship.Wife             The wife            
 * @property {EntityRelationship} relationship.Replaces             The replaces            
 * @property {EntityRelationship} relationship.Instance             The target entity represents an instance of the scoper entity            
 * @property {EntityRelationship} relationship.LocatedEntity             Relates the target entity to a source location            
 * @property {EntityRelationship} relationship.$other Unclassified
 * @property {Concept} statusConceptModel [Delay loaded from statusConcept],             Status concept id            
 * @property {string} statusConcept            Status concept id            (see: {@link StatusKeys} for values)
 * @property {object} tag            Gets a list of all tags associated with the entity            
 * @property {string} tag.classifier  where classifier is from {@link Tag} key
 * @property {object} telecom            Gets a list of all telecommunications addresses associated with the entity            
 * @property {EntityTelecomAddress} telecom.AnsweringService             answering service            
 * @property {EntityTelecomAddress} telecom.EmergencyContact             Emergency contact            
 * @property {EntityTelecomAddress} telecom.MobileContact             Mobile phone contact            
 * @property {EntityTelecomAddress} telecom.Pager             pager            
 * @property {EntityTelecomAddress} telecom.Public             public (800 number example) contact            
 * @property {EntityTelecomAddress} telecom.TemporaryAddress             temporary contact            
 * @property {EntityTelecomAddress} telecom.WorkPlace             For use in the workplace            
 * @property {EntityTelecomAddress} telecom.$other Unclassified
 * @property {string} template            Gets the template key            
 * @property {TemplateDefinition} templateModel [Delay loaded from template],             Gets or sets the template definition            
 * @property {Concept} typeConceptModel [Delay loaded from typeConcept],             Type concept identifier            
 * @property {string} typeConcept            Type concept identifier            
 * @property {string} previousVersion
 * @property {string} version
 * @property {number} sequence
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {ApplicationEntity} copyData Copy constructor (if present)
 */
function ApplicationEntity (copyData) { 
	this.$type = 'ApplicationEntity';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {number} */
	this.sequence = copyData.sequence;
	/** @type {string} */
	this.version = copyData.version;
	/** @type {string} */
	this.previousVersion = copyData.previousVersion;
	/** @type {string} */
	this.typeConcept = copyData.typeConcept;
	/** @type {Concept} */
	this.typeConceptModel = copyData.typeConceptModel;
	/** @type {TemplateDefinition} */
	this.templateModel = copyData.templateModel;
	/** @type {string} */
	this.template = copyData.template;
	/** @type {object} */
	this.telecom = copyData.telecom;
	/** @type {object} */
	this.tag = copyData.tag;
	/** @type {string} */
	this.statusConcept = copyData.statusConcept;
	/** @type {Concept} */
	this.statusConceptModel = copyData.statusConceptModel;
	/** @type {object} */
	this.relationship = copyData.relationship;
	/** @type {object} */
	this.participation = copyData.participation;
	/** @type {string} */
	this.note = copyData.note;
	/** @type {object} */
	this.name = copyData.name;
	/** @type {object} */
	this.identifier = copyData.identifier;
	/** @type {object} */
	this.extension = copyData.extension;
	/** @type {string} */
	this.determinerConcept = copyData.determinerConcept;
	/** @type {Concept} */
	this.determinerConceptModel = copyData.determinerConceptModel;
	/** @type {string} */
	this.creationAct = copyData.creationAct;
	/** @type {Act} */
	this.creationActModel = copyData.creationActModel;
	/** @type {string} */
	this.classConcept = copyData.classConcept;
	/** @type {Concept} */
	this.classConceptModel = copyData.classConceptModel;
	/** @type {object} */
	this.address = copyData.address;
	/** @type {string} */
	this.versionName = copyData.versionName;
	/** @type {string} */
	this.vendorName = copyData.vendorName;
	/** @type {string} */
	this.softwareName = copyData.softwareName;
	/** @type {string} */
	this.securityApplication = copyData.securityApplication;
	/** @type {SecurityApplication} */
	this.securityApplicationModel = copyData.securityApplicationModel;
	}
}  // ApplicationEntity 
// SanteDB.Core.Model.Entities.DeviceEntity, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!DeviceEntity)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends Entity
 * @summary             Represents a device entity            
 * @property {string} manufacturerModelName            Gets or sets the manufacturer model name            
 * @property {string} operatingSystemName            Gets or sets the operating system name            
 * @property {SecurityDevice} securityDeviceModel [Delay loaded from securityDevice],             Gets or sets the security device            
 * @property {string} securityDevice            Gets or sets the security device key            
 * @property {object} address            Gets a list of all addresses associated with the entity            
 * @property {EntityAddress} address.Alphabetic             Represents an alphabetic address used for matching             
 * @property {EntityAddress} address.BadAddress             Represents a bad address, i.e. an address which is old or invalid.            
 * @property {EntityAddress} address.Direct             Represents a workplace address that reaches the person directly without intermediaries.            
 * @property {EntityAddress} address.HomeAddress             The home address            
 * @property {EntityAddress} address.Ideographic             Represents an address expressed in an ideographic manner (example: Kanji)            
 * @property {EntityAddress} address.Phonetic             Represents an address expressed as a phonetic spelling of an ideographic address            
 * @property {EntityAddress} address.PhysicalVisit             The address is a physical place where visits should occur            
 * @property {EntityAddress} address.PostalAddress             The address is a postal address used for the delivery of mail and materials            
 * @property {EntityAddress} address.PrimaryHome             Represents a primary address to reach a contact after business hours.            
 * @property {EntityAddress} address.Public             Represents an address that is a standard address that may be subject to a switchboard or operator prior to reaching the intended entity.            
 * @property {EntityAddress} address.Soundex             Represents an address used for soundex matching purposes.            
 * @property {EntityAddress} address.Syllabic             Represents a syllabic address.            
 * @property {EntityAddress} address.TemporaryAddress             Represents a temporary address that may be good for visiting or mailing.            
 * @property {EntityAddress} address.VacationHome             Represents a vacation home to reach a person while on vacation.            
 * @property {EntityAddress} address.WorkPlace             Represents an office address, should be used for business communications            
 * @property {EntityAddress} address.$other Unclassified
 * @property {Concept} classConceptModel [Delay loaded from classConcept],             Class concept datal load property            
 * @property {string} classConcept            Class concept            (see: {@link EntityClassKeys} for values)
 * @property {Act} creationActModel [Delay loaded from creationAct],             Creation act reference            
 * @property {string} creationAct            Creation act reference            
 * @property {Concept} determinerConceptModel [Delay loaded from determinerConcept],             Determiner concept            
 * @property {string} determinerConcept            Determiner concept            (see: {@link DeterminerKeys} for values)
 * @property {object} extension            Gets a list of all extensions associated with the entity            
 * @property {string} extension.classifier  where classifier is from {@link Extension} extensionType
 * @property {object} identifier            Gets the identifiers associated with this entity            
 * @property {EntityIdentifier} identifier.classifier  where classifier is from {@link IdentifierBase} authority
 * @property {object} name            Gets a list of all names associated with the entity            
 * @property {EntityName} name.Alphabetic             The name used is an alphabetic representation of the name (ex: romaji in Japanese)            
 * @property {EntityName} name.Anonymous             The name is an anonymous name for the object (not the real name but a name used for care delivery)            
 * @property {EntityName} name.Artist             The name represents an artist name or stage name            
 * @property {EntityName} name.Assigned             The name represents an assigned name (given or bestowed by an authority)            
 * @property {EntityName} name.Ideographic             THe name represents an ideographic representation of the name            
 * @property {EntityName} name.Indigenous             The name is an indigenous name or tribal name for the patient            
 * @property {EntityName} name.Legal             The name represents the current legal name of an object (such as a corporate name)            
 * @property {EntityName} name.License             The name represents a name as displayed on a license or known to a license authority            
 * @property {EntityName} name.MaidenName             THe name is a maiden name (name of a patient before marriage)            
 * @property {EntityName} name.OfficialRecord             The name as it appears on an official record            
 * @property {EntityName} name.Phonetic             The name represents a phonetic representation of a name such as a SOUNDEX code            
 * @property {EntityName} name.Pseudonym             The name is a pseudonym for the object or an synonym name            
 * @property {EntityName} name.Religious             The name is to be used for religious purposes (such as baptismal name)            
 * @property {EntityName} name.Search             The name is to be used in the performing of matches only            
 * @property {EntityName} name.Soundex             The name represents the computed soundex code of a name            
 * @property {EntityName} name.Syllabic             The name represents a syllabic name.            
 * @property {EntityName} name.$other Unclassified
 * @property {string} note            Gets a list of all notes associated with the entity            
 * @property {object} participation            Gets the acts in which this entity participates            
 * @property {ActParticipation} participation.Admitter             The player entity was the person who was responsible for admitting the patient into a facility or care scenario.            
 * @property {ActParticipation} participation.Attender             The player entity represents the attending physician for the patient            
 * @property {ActParticipation} participation.Authenticator             The player entity represents an entity which authenticates the provision of care            
 * @property {ActParticipation} participation.Authororiginator             The player entity is responsible for the creation of data described in the act            
 * @property {ActParticipation} participation.Baby             The player is a resultant person in that it was the baby             
 * @property {ActParticipation} participation.Beneficiary             The player is a beneficiary of the act such a receiver of a financial instrument, or other good            
 * @property {ActParticipation} participation.CallbackContact             The player entity represents something that should be contacted upon completion of the act            
 * @property {ActParticipation} participation.CausativeAgent             The player entity is an agent which caused the act to occur            
 * @property {ActParticipation} participation.Consultant             The player entity is acting as a consult to the carrying out of the act            
 * @property {ActParticipation} participation.Consumable             The player entity was or is to be consumed during the process of carrying out the act.            
 * @property {ActParticipation} participation.CoverageTarget             The player entity represents the target coverage entity of the act            
 * @property {ActParticipation} participation.Custodian             The player entity is the data custodian of the act (is responsible for storing and securing the act)            
 * @property {ActParticipation} participation.DataEnterer             The player entity represents the person or device which phisically entered the data at the terminal            
 * @property {ActParticipation} participation.Destination             The player etity represents the ultimate destination of the goods/materials/services described in the act            
 * @property {ActParticipation} participation.Device             The player entity represents the device on which the act or data from the act was acquired or recorded            
 * @property {ActParticipation} participation.DirectTarget             The player entity represents the directed target of care provided in the act            
 * @property {ActParticipation} participation.Discharger             The player entity represents the person who is responsible for the discharging of the patient from an encounter            
 * @property {ActParticipation} participation.Distributor             The player entity is the source distribution point for the financial or material instruments contained in the message            
 * @property {ActParticipation} participation.Donor             The player entity represents the donor of tissue or materials used in the act            
 * @property {ActParticipation} participation.EntryLocation             The location where the act was entered.            
 * @property {ActParticipation} participation.Escort             The player entity was responsible for escorting the patient during the course of the act            
 * @property {ActParticipation} participation.Exposure             The player entity something to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureAgent             The player entity represents the agent (material) to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureSource             The player entity describes the source of the material to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureTarget             The player entity describes the target to which the agent was exposed            
 * @property {ActParticipation} participation.GuarantorParty             The player represents a party which is used as a financial guarantor for payment in the carrying out of the act            
 * @property {ActParticipation} participation.Holder             The player is responsible for holding the act            
 * @property {ActParticipation} participation.IndirectTarget             The entity not directly present in the act but which will be the focust of th act.            
 * @property {ActParticipation} participation.Informant             The player was a person or device which informed data presented in the act. (Example: A mother telling a nurse that their child had a reaction)            
 * @property {ActParticipation} participation.InformationRecipient             The player entity represents something that should be cc'ed on the act            
 * @property {ActParticipation} participation.LegalAuthenticator             The player entity is responsible for legally authenticating the content of the act            
 * @property {ActParticipation} participation.Location             The location where the service was performed.            
 * @property {ActParticipation} participation.NonreuseableDevice             The player represents a consumable that can no longer be used            
 * @property {ActParticipation} participation.Origin             The player represents the origin of the act            
 * @property {ActParticipation} participation.Participation             The player entity participates in the act in no particular classification            
 * @property {ActParticipation} participation.Performer             The player entity is responsible for performing the clinical steps documented in the act            
 * @property {ActParticipation} participation.PrimaryInformationRecipient             The player entity represents a high priority contact which should be informed or cc'ed on the act            
 * @property {ActParticipation} participation.PrimaryPerformer             The player entity was the primary performer of the act. This is used in procedures where more than one performer is present            
 * @property {ActParticipation} participation.Product             The player represents a product that is not necessarily consumed but informs the act            
 * @property {ActParticipation} participation.Receiver             The player represents the entity which is the intended receiver of the act            
 * @property {ActParticipation} participation.RecordTarget             The player represents the entity to which the act is recorded against            
 * @property {ActParticipation} participation.ReferredBy             The player represents the entity which referred the act or caused the act to be undertaken            
 * @property {ActParticipation} participation.ReferredTo             The player entity represents the entity which was referred to            
 * @property {ActParticipation} participation.Referrer             The player entity represents the person who was originally the referrer.            
 * @property {ActParticipation} participation.Remote             The player entity represents a remote portion of the act            
 * @property {ActParticipation} participation.ResponsibleParty             The player entity is ultimately responsible for the carrying out of the act            
 * @property {ActParticipation} participation.ReusableDevice             The player entity represents a device which can be reused in future acts            
 * @property {ActParticipation} participation.SecondaryPerformer             The secondary performing person (support clinician).            
 * @property {ActParticipation} participation.Specimen             The player entity represents a specimen collected for the purpose of testing and diagnosis            
 * @property {ActParticipation} participation.Subject             The player entity is the subject of an act, but not necessarily the record target (meaning the act is about a particular entity but not to be attached to their record)            
 * @property {ActParticipation} participation.Tracker             The player entity is responsible for tracking the progress of the act            
 * @property {ActParticipation} participation.Transcriber             The person who transcribed data from the original act.            
 * @property {ActParticipation} participation.UgentNotificationContact             The player entity represents a contact entity in case of an emergency occurs during the act.            
 * @property {ActParticipation} participation.Verifier             The player entity was responsible for verifying the accuracy of the data in the act            
 * @property {ActParticipation} participation.Via             The player entity represents an entity where the act occurred "via" this entity (i.e. in transport)            
 * @property {ActParticipation} participation.Witness             The player entity represents a legal witness to the act occurring.            
 * @property {ActParticipation} participation.$other Unclassified
 * @property {object} relationship            Gets a list of all associated entities for this entity            
 * @property {EntityRelationship} relationship.Access             The access            
 * @property {EntityRelationship} relationship.ActiveMoiety             The active moiety            
 * @property {EntityRelationship} relationship.AdministerableMaterial             The administerable material            
 * @property {EntityRelationship} relationship.AdoptedChild             The adopted child            
 * @property {EntityRelationship} relationship.AdoptedDaughter             The adopted daughter            
 * @property {EntityRelationship} relationship.AdoptedSon             The adopted son            
 * @property {EntityRelationship} relationship.Affiliate             The affiliate            
 * @property {EntityRelationship} relationship.Agent             The agent            
 * @property {EntityRelationship} relationship.Aliquot             The aliquot            
 * @property {EntityRelationship} relationship.Assigned             The assigned            
 * @property {EntityRelationship} relationship.AssignedEntity             The assigned entity            
 * @property {EntityRelationship} relationship.Aunt             The aunt            
 * @property {EntityRelationship} relationship.Birthplace             The birthplace            
 * @property {EntityRelationship} relationship.Brother             The brother            
 * @property {EntityRelationship} relationship.Brotherinlaw             The brotherinlaw            
 * @property {EntityRelationship} relationship.Caregiver             The caregiver            
 * @property {EntityRelationship} relationship.CaseSubject             The case subject            
 * @property {EntityRelationship} relationship.Child             The child            
 * @property {EntityRelationship} relationship.ChildInlaw             The child inlaw            
 * @property {EntityRelationship} relationship.Citizen             The citizen            
 * @property {EntityRelationship} relationship.Claimant             The claimant            
 * @property {EntityRelationship} relationship.ClinicalResearchInvestigator             The clinical research investigator            
 * @property {EntityRelationship} relationship.ClinicalResearchSponsor             The clinical research sponsor            
 * @property {EntityRelationship} relationship.CommissioningParty             The commissioning party            
 * @property {EntityRelationship} relationship.Contact             The contact            
 * @property {EntityRelationship} relationship.Cousin             The cousin            
 * @property {EntityRelationship} relationship.CoverageSponsor             The coverage sponsor            
 * @property {EntityRelationship} relationship.CoveredParty             The covered party            
 * @property {EntityRelationship} relationship.Daughter             The daughter            
 * @property {EntityRelationship} relationship.DaughterInlaw             The daughter inlaw            
 * @property {EntityRelationship} relationship.DedicatedServiceDeliveryLocation             The dedicated service delivery location            
 * @property {EntityRelationship} relationship.Dependent             The dependent            
 * @property {EntityRelationship} relationship.DistributedMaterial             The distributed material            
 * @property {EntityRelationship} relationship.DomesticPartner             The domestic partner            
 * @property {EntityRelationship} relationship.EmergencyContact             The emergency contact            
 * @property {EntityRelationship} relationship.Employee             The employee            
 * @property {EntityRelationship} relationship.ExposedEntity             The exposed entity            
 * @property {EntityRelationship} relationship.FamilyMember             The family member            
 * @property {EntityRelationship} relationship.Father             The father            
 * @property {EntityRelationship} relationship.Fatherinlaw             The fatherinlaw            
 * @property {EntityRelationship} relationship.FosterChild             The foster child            
 * @property {EntityRelationship} relationship.FosterDaughter             The foster daughter            
 * @property {EntityRelationship} relationship.FosterSon             The foster son            
 * @property {EntityRelationship} relationship.Grandchild             The grandchild            
 * @property {EntityRelationship} relationship.Granddaughter             The granddaughter            
 * @property {EntityRelationship} relationship.Grandfather             The grandfather            
 * @property {EntityRelationship} relationship.Grandmother             The grandmother            
 * @property {EntityRelationship} relationship.Grandparent             The grandparent            
 * @property {EntityRelationship} relationship.Grandson             The grandson            
 * @property {EntityRelationship} relationship.GreatGrandfather             The great grandfather            
 * @property {EntityRelationship} relationship.GreatGrandmother             The great grandmother            
 * @property {EntityRelationship} relationship.GreatGrandparent             The great grandparent            
 * @property {EntityRelationship} relationship.Guarantor             The guarantor            
 * @property {EntityRelationship} relationship.GUARD             The guard            
 * @property {EntityRelationship} relationship.Guardian             The guardian            
 * @property {EntityRelationship} relationship.Halfbrother             The halfbrother            
 * @property {EntityRelationship} relationship.Halfsibling             The halfsibling            
 * @property {EntityRelationship} relationship.Halfsister             The halfsister            
 * @property {EntityRelationship} relationship.HealthcareProvider             The healthcare provider            
 * @property {EntityRelationship} relationship.HealthChart             The health chart            
 * @property {EntityRelationship} relationship.HeldEntity             The held entity            
 * @property {EntityRelationship} relationship.Husband             The husband            
 * @property {EntityRelationship} relationship.IdentifiedEntity             The identified entity            
 * @property {EntityRelationship} relationship.IncidentalServiceDeliveryLocation             The incidental service delivery location            
 * @property {EntityRelationship} relationship.Individual             The individual            
 * @property {EntityRelationship} relationship.InvestigationSubject             The investigation subject            
 * @property {EntityRelationship} relationship.InvoicePayor             The invoice payor            
 * @property {EntityRelationship} relationship.Isolate             The isolate            
 * @property {EntityRelationship} relationship.LicensedEntity             The licensed entity            
 * @property {EntityRelationship} relationship.MaintainedEntity             The maintained entity            
 * @property {EntityRelationship} relationship.ManufacturedProduct             The manufactured product            
 * @property {EntityRelationship} relationship.MaternalAunt             The maternal aunt            
 * @property {EntityRelationship} relationship.MaternalCousin             The maternal cousin            
 * @property {EntityRelationship} relationship.MaternalGrandfather             The maternal grandfather            
 * @property {EntityRelationship} relationship.MaternalGrandmother             The maternal grandmother            
 * @property {EntityRelationship} relationship.MaternalGrandparent             The maternal grandparent            
 * @property {EntityRelationship} relationship.MaternalGreatgrandfather             The maternal greatgrandfather            
 * @property {EntityRelationship} relationship.MaternalGreatgrandmother             The maternal greatgrandmother            
 * @property {EntityRelationship} relationship.MaternalGreatgrandparent             The maternal greatgrandparent            
 * @property {EntityRelationship} relationship.MaternalUncle             The maternal uncle            
 * @property {EntityRelationship} relationship.MilitaryPerson             The military person            
 * @property {EntityRelationship} relationship.Mother             The mother            
 * @property {EntityRelationship} relationship.Motherinlaw             The motherinlaw            
 * @property {EntityRelationship} relationship.NamedInsured             The named insured            
 * @property {EntityRelationship} relationship.NaturalBrother             The natural brother            
 * @property {EntityRelationship} relationship.NaturalChild             The natural child            
 * @property {EntityRelationship} relationship.NaturalDaughter             The natural daughter            
 * @property {EntityRelationship} relationship.NaturalFather             The natural father            
 * @property {EntityRelationship} relationship.NaturalFatherOfFetus             The natural father of fetus            
 * @property {EntityRelationship} relationship.NaturalMother             The natural mother            
 * @property {EntityRelationship} relationship.NaturalParent             The natural parent            
 * @property {EntityRelationship} relationship.NaturalSibling             The natural sibling            
 * @property {EntityRelationship} relationship.NaturalSister             The natural sister            
 * @property {EntityRelationship} relationship.NaturalSon             The natural son            
 * @property {EntityRelationship} relationship.Nephew             The nephew            
 * @property {EntityRelationship} relationship.NextOfKin             The next of kin            
 * @property {EntityRelationship} relationship.Niece             The niece            
 * @property {EntityRelationship} relationship.NieceNephew             The niece nephew            
 * @property {EntityRelationship} relationship.NotaryPublic             The notary public            
 * @property {EntityRelationship} relationship.OwnedEntity             The owned entity            
 * @property {EntityRelationship} relationship.Parent             The parent            
 * @property {EntityRelationship} relationship.ParentInlaw             The parent inlaw            
 * @property {EntityRelationship} relationship.Part             The part            
 * @property {EntityRelationship} relationship.PaternalAunt             The paternal aunt            
 * @property {EntityRelationship} relationship.PaternalCousin             The paternal cousin            
 * @property {EntityRelationship} relationship.PaternalGrandfather             The paternal grandfather            
 * @property {EntityRelationship} relationship.PaternalGrandmother             The paternal grandmother            
 * @property {EntityRelationship} relationship.PaternalGrandparent             The paternal grandparent            
 * @property {EntityRelationship} relationship.PaternalGreatgrandfather             The paternal greatgrandfather            
 * @property {EntityRelationship} relationship.PaternalGreatgrandmother             The paternal greatgrandmother            
 * @property {EntityRelationship} relationship.PaternalGreatgrandparent             The paternal greatgrandparent            
 * @property {EntityRelationship} relationship.PaternalUncle             The paternal uncle            
 * @property {EntityRelationship} relationship.Patient             The patient            
 * @property {EntityRelationship} relationship.Payee             The payee            
 * @property {EntityRelationship} relationship.PersonalRelationship             The personal relationship            
 * @property {EntityRelationship} relationship.PlaceOfDeath             The place of death            
 * @property {EntityRelationship} relationship.PolicyHolder             The policy holder            
 * @property {EntityRelationship} relationship.ProgramEligible             The program eligible            
 * @property {EntityRelationship} relationship.QualifiedEntity             The qualified entity            
 * @property {EntityRelationship} relationship.RegulatedProduct             The regulated product            
 * @property {EntityRelationship} relationship.ResearchSubject             The research subject            
 * @property {EntityRelationship} relationship.RetailedMaterial             The retailed material            
 * @property {EntityRelationship} relationship.Roomate             The roomate            
 * @property {EntityRelationship} relationship.ServiceDeliveryLocation             The service delivery location            
 * @property {EntityRelationship} relationship.Sibling             The sibling            
 * @property {EntityRelationship} relationship.SiblingInlaw             The sibling inlaw            
 * @property {EntityRelationship} relationship.SignificantOther             The significant other            
 * @property {EntityRelationship} relationship.SigningAuthorityOrOfficer             The signing authority or officer            
 * @property {EntityRelationship} relationship.Sister             The sister            
 * @property {EntityRelationship} relationship.Sisterinlaw             The sisterinlaw            
 * @property {EntityRelationship} relationship.Son             The son            
 * @property {EntityRelationship} relationship.SonInlaw             The son inlaw            
 * @property {EntityRelationship} relationship.Specimen             The specimen            
 * @property {EntityRelationship} relationship.Spouse             The spouse            
 * @property {EntityRelationship} relationship.Stepbrother             The stepbrother            
 * @property {EntityRelationship} relationship.StepChild             The step child            
 * @property {EntityRelationship} relationship.Stepdaughter             The stepdaughter            
 * @property {EntityRelationship} relationship.Stepfather             The stepfather            
 * @property {EntityRelationship} relationship.Stepmother             The stepmother            
 * @property {EntityRelationship} relationship.StepParent             The step parent            
 * @property {EntityRelationship} relationship.StepSibling             The step sibling            
 * @property {EntityRelationship} relationship.Stepsister             The stepsister            
 * @property {EntityRelationship} relationship.Stepson             The stepson            
 * @property {EntityRelationship} relationship.Student             The student            
 * @property {EntityRelationship} relationship.Subscriber             The subscriber            
 * @property {EntityRelationship} relationship.TerritoryOfAuthority             The territory of authority            
 * @property {EntityRelationship} relationship.TherapeuticAgent             The therapeutic agent            
 * @property {EntityRelationship} relationship.Uncle             The uncle            
 * @property {EntityRelationship} relationship.Underwriter             The underwriter            
 * @property {EntityRelationship} relationship.UsedEntity             The used entity            
 * @property {EntityRelationship} relationship.WarrantedProduct             The warranted product            
 * @property {EntityRelationship} relationship.Wife             The wife            
 * @property {EntityRelationship} relationship.Replaces             The replaces            
 * @property {EntityRelationship} relationship.Instance             The target entity represents an instance of the scoper entity            
 * @property {EntityRelationship} relationship.LocatedEntity             Relates the target entity to a source location            
 * @property {EntityRelationship} relationship.$other Unclassified
 * @property {Concept} statusConceptModel [Delay loaded from statusConcept],             Status concept id            
 * @property {string} statusConcept            Status concept id            (see: {@link StatusKeys} for values)
 * @property {object} tag            Gets a list of all tags associated with the entity            
 * @property {string} tag.classifier  where classifier is from {@link Tag} key
 * @property {object} telecom            Gets a list of all telecommunications addresses associated with the entity            
 * @property {EntityTelecomAddress} telecom.AnsweringService             answering service            
 * @property {EntityTelecomAddress} telecom.EmergencyContact             Emergency contact            
 * @property {EntityTelecomAddress} telecom.MobileContact             Mobile phone contact            
 * @property {EntityTelecomAddress} telecom.Pager             pager            
 * @property {EntityTelecomAddress} telecom.Public             public (800 number example) contact            
 * @property {EntityTelecomAddress} telecom.TemporaryAddress             temporary contact            
 * @property {EntityTelecomAddress} telecom.WorkPlace             For use in the workplace            
 * @property {EntityTelecomAddress} telecom.$other Unclassified
 * @property {string} template            Gets the template key            
 * @property {TemplateDefinition} templateModel [Delay loaded from template],             Gets or sets the template definition            
 * @property {Concept} typeConceptModel [Delay loaded from typeConcept],             Type concept identifier            
 * @property {string} typeConcept            Type concept identifier            
 * @property {string} previousVersion
 * @property {string} version
 * @property {number} sequence
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {DeviceEntity} copyData Copy constructor (if present)
 */
function DeviceEntity (copyData) { 
	this.$type = 'DeviceEntity';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {number} */
	this.sequence = copyData.sequence;
	/** @type {string} */
	this.version = copyData.version;
	/** @type {string} */
	this.previousVersion = copyData.previousVersion;
	/** @type {string} */
	this.typeConcept = copyData.typeConcept;
	/** @type {Concept} */
	this.typeConceptModel = copyData.typeConceptModel;
	/** @type {TemplateDefinition} */
	this.templateModel = copyData.templateModel;
	/** @type {string} */
	this.template = copyData.template;
	/** @type {object} */
	this.telecom = copyData.telecom;
	/** @type {object} */
	this.tag = copyData.tag;
	/** @type {string} */
	this.statusConcept = copyData.statusConcept;
	/** @type {Concept} */
	this.statusConceptModel = copyData.statusConceptModel;
	/** @type {object} */
	this.relationship = copyData.relationship;
	/** @type {object} */
	this.participation = copyData.participation;
	/** @type {string} */
	this.note = copyData.note;
	/** @type {object} */
	this.name = copyData.name;
	/** @type {object} */
	this.identifier = copyData.identifier;
	/** @type {object} */
	this.extension = copyData.extension;
	/** @type {string} */
	this.determinerConcept = copyData.determinerConcept;
	/** @type {Concept} */
	this.determinerConceptModel = copyData.determinerConceptModel;
	/** @type {string} */
	this.creationAct = copyData.creationAct;
	/** @type {Act} */
	this.creationActModel = copyData.creationActModel;
	/** @type {string} */
	this.classConcept = copyData.classConcept;
	/** @type {Concept} */
	this.classConceptModel = copyData.classConceptModel;
	/** @type {object} */
	this.address = copyData.address;
	/** @type {string} */
	this.securityDevice = copyData.securityDevice;
	/** @type {SecurityDevice} */
	this.securityDeviceModel = copyData.securityDeviceModel;
	/** @type {string} */
	this.operatingSystemName = copyData.operatingSystemName;
	/** @type {string} */
	this.manufacturerModelName = copyData.manufacturerModelName;
	}
}  // DeviceEntity 
// SanteDB.Core.Model.Entities.Entity, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!Entity)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents the base of all entities            
 * @property {object} address            Gets a list of all addresses associated with the entity            
 * @property {EntityAddress} address.Alphabetic             Represents an alphabetic address used for matching             
 * @property {EntityAddress} address.BadAddress             Represents a bad address, i.e. an address which is old or invalid.            
 * @property {EntityAddress} address.Direct             Represents a workplace address that reaches the person directly without intermediaries.            
 * @property {EntityAddress} address.HomeAddress             The home address            
 * @property {EntityAddress} address.Ideographic             Represents an address expressed in an ideographic manner (example: Kanji)            
 * @property {EntityAddress} address.Phonetic             Represents an address expressed as a phonetic spelling of an ideographic address            
 * @property {EntityAddress} address.PhysicalVisit             The address is a physical place where visits should occur            
 * @property {EntityAddress} address.PostalAddress             The address is a postal address used for the delivery of mail and materials            
 * @property {EntityAddress} address.PrimaryHome             Represents a primary address to reach a contact after business hours.            
 * @property {EntityAddress} address.Public             Represents an address that is a standard address that may be subject to a switchboard or operator prior to reaching the intended entity.            
 * @property {EntityAddress} address.Soundex             Represents an address used for soundex matching purposes.            
 * @property {EntityAddress} address.Syllabic             Represents a syllabic address.            
 * @property {EntityAddress} address.TemporaryAddress             Represents a temporary address that may be good for visiting or mailing.            
 * @property {EntityAddress} address.VacationHome             Represents a vacation home to reach a person while on vacation.            
 * @property {EntityAddress} address.WorkPlace             Represents an office address, should be used for business communications            
 * @property {EntityAddress} address.$other Unclassified
 * @property {Concept} classConceptModel [Delay loaded from classConcept],             Class concept datal load property            
 * @property {string} classConcept            Class concept            (see: {@link EntityClassKeys} for values)
 * @property {Act} creationActModel [Delay loaded from creationAct],             Creation act reference            
 * @property {string} creationAct            Creation act reference            
 * @property {Concept} determinerConceptModel [Delay loaded from determinerConcept],             Determiner concept            
 * @property {string} determinerConcept            Determiner concept            (see: {@link DeterminerKeys} for values)
 * @property {object} extension            Gets a list of all extensions associated with the entity            
 * @property {string} extension.classifier  where classifier is from {@link Extension} extensionType
 * @property {object} identifier            Gets the identifiers associated with this entity            
 * @property {EntityIdentifier} identifier.classifier  where classifier is from {@link IdentifierBase} authority
 * @property {object} name            Gets a list of all names associated with the entity            
 * @property {EntityName} name.Alphabetic             The name used is an alphabetic representation of the name (ex: romaji in Japanese)            
 * @property {EntityName} name.Anonymous             The name is an anonymous name for the object (not the real name but a name used for care delivery)            
 * @property {EntityName} name.Artist             The name represents an artist name or stage name            
 * @property {EntityName} name.Assigned             The name represents an assigned name (given or bestowed by an authority)            
 * @property {EntityName} name.Ideographic             THe name represents an ideographic representation of the name            
 * @property {EntityName} name.Indigenous             The name is an indigenous name or tribal name for the patient            
 * @property {EntityName} name.Legal             The name represents the current legal name of an object (such as a corporate name)            
 * @property {EntityName} name.License             The name represents a name as displayed on a license or known to a license authority            
 * @property {EntityName} name.MaidenName             THe name is a maiden name (name of a patient before marriage)            
 * @property {EntityName} name.OfficialRecord             The name as it appears on an official record            
 * @property {EntityName} name.Phonetic             The name represents a phonetic representation of a name such as a SOUNDEX code            
 * @property {EntityName} name.Pseudonym             The name is a pseudonym for the object or an synonym name            
 * @property {EntityName} name.Religious             The name is to be used for religious purposes (such as baptismal name)            
 * @property {EntityName} name.Search             The name is to be used in the performing of matches only            
 * @property {EntityName} name.Soundex             The name represents the computed soundex code of a name            
 * @property {EntityName} name.Syllabic             The name represents a syllabic name.            
 * @property {EntityName} name.$other Unclassified
 * @property {string} note            Gets a list of all notes associated with the entity            
 * @property {object} participation            Gets the acts in which this entity participates            
 * @property {ActParticipation} participation.Admitter             The player entity was the person who was responsible for admitting the patient into a facility or care scenario.            
 * @property {ActParticipation} participation.Attender             The player entity represents the attending physician for the patient            
 * @property {ActParticipation} participation.Authenticator             The player entity represents an entity which authenticates the provision of care            
 * @property {ActParticipation} participation.Authororiginator             The player entity is responsible for the creation of data described in the act            
 * @property {ActParticipation} participation.Baby             The player is a resultant person in that it was the baby             
 * @property {ActParticipation} participation.Beneficiary             The player is a beneficiary of the act such a receiver of a financial instrument, or other good            
 * @property {ActParticipation} participation.CallbackContact             The player entity represents something that should be contacted upon completion of the act            
 * @property {ActParticipation} participation.CausativeAgent             The player entity is an agent which caused the act to occur            
 * @property {ActParticipation} participation.Consultant             The player entity is acting as a consult to the carrying out of the act            
 * @property {ActParticipation} participation.Consumable             The player entity was or is to be consumed during the process of carrying out the act.            
 * @property {ActParticipation} participation.CoverageTarget             The player entity represents the target coverage entity of the act            
 * @property {ActParticipation} participation.Custodian             The player entity is the data custodian of the act (is responsible for storing and securing the act)            
 * @property {ActParticipation} participation.DataEnterer             The player entity represents the person or device which phisically entered the data at the terminal            
 * @property {ActParticipation} participation.Destination             The player etity represents the ultimate destination of the goods/materials/services described in the act            
 * @property {ActParticipation} participation.Device             The player entity represents the device on which the act or data from the act was acquired or recorded            
 * @property {ActParticipation} participation.DirectTarget             The player entity represents the directed target of care provided in the act            
 * @property {ActParticipation} participation.Discharger             The player entity represents the person who is responsible for the discharging of the patient from an encounter            
 * @property {ActParticipation} participation.Distributor             The player entity is the source distribution point for the financial or material instruments contained in the message            
 * @property {ActParticipation} participation.Donor             The player entity represents the donor of tissue or materials used in the act            
 * @property {ActParticipation} participation.EntryLocation             The location where the act was entered.            
 * @property {ActParticipation} participation.Escort             The player entity was responsible for escorting the patient during the course of the act            
 * @property {ActParticipation} participation.Exposure             The player entity something to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureAgent             The player entity represents the agent (material) to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureSource             The player entity describes the source of the material to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureTarget             The player entity describes the target to which the agent was exposed            
 * @property {ActParticipation} participation.GuarantorParty             The player represents a party which is used as a financial guarantor for payment in the carrying out of the act            
 * @property {ActParticipation} participation.Holder             The player is responsible for holding the act            
 * @property {ActParticipation} participation.IndirectTarget             The entity not directly present in the act but which will be the focust of th act.            
 * @property {ActParticipation} participation.Informant             The player was a person or device which informed data presented in the act. (Example: A mother telling a nurse that their child had a reaction)            
 * @property {ActParticipation} participation.InformationRecipient             The player entity represents something that should be cc'ed on the act            
 * @property {ActParticipation} participation.LegalAuthenticator             The player entity is responsible for legally authenticating the content of the act            
 * @property {ActParticipation} participation.Location             The location where the service was performed.            
 * @property {ActParticipation} participation.NonreuseableDevice             The player represents a consumable that can no longer be used            
 * @property {ActParticipation} participation.Origin             The player represents the origin of the act            
 * @property {ActParticipation} participation.Participation             The player entity participates in the act in no particular classification            
 * @property {ActParticipation} participation.Performer             The player entity is responsible for performing the clinical steps documented in the act            
 * @property {ActParticipation} participation.PrimaryInformationRecipient             The player entity represents a high priority contact which should be informed or cc'ed on the act            
 * @property {ActParticipation} participation.PrimaryPerformer             The player entity was the primary performer of the act. This is used in procedures where more than one performer is present            
 * @property {ActParticipation} participation.Product             The player represents a product that is not necessarily consumed but informs the act            
 * @property {ActParticipation} participation.Receiver             The player represents the entity which is the intended receiver of the act            
 * @property {ActParticipation} participation.RecordTarget             The player represents the entity to which the act is recorded against            
 * @property {ActParticipation} participation.ReferredBy             The player represents the entity which referred the act or caused the act to be undertaken            
 * @property {ActParticipation} participation.ReferredTo             The player entity represents the entity which was referred to            
 * @property {ActParticipation} participation.Referrer             The player entity represents the person who was originally the referrer.            
 * @property {ActParticipation} participation.Remote             The player entity represents a remote portion of the act            
 * @property {ActParticipation} participation.ResponsibleParty             The player entity is ultimately responsible for the carrying out of the act            
 * @property {ActParticipation} participation.ReusableDevice             The player entity represents a device which can be reused in future acts            
 * @property {ActParticipation} participation.SecondaryPerformer             The secondary performing person (support clinician).            
 * @property {ActParticipation} participation.Specimen             The player entity represents a specimen collected for the purpose of testing and diagnosis            
 * @property {ActParticipation} participation.Subject             The player entity is the subject of an act, but not necessarily the record target (meaning the act is about a particular entity but not to be attached to their record)            
 * @property {ActParticipation} participation.Tracker             The player entity is responsible for tracking the progress of the act            
 * @property {ActParticipation} participation.Transcriber             The person who transcribed data from the original act.            
 * @property {ActParticipation} participation.UgentNotificationContact             The player entity represents a contact entity in case of an emergency occurs during the act.            
 * @property {ActParticipation} participation.Verifier             The player entity was responsible for verifying the accuracy of the data in the act            
 * @property {ActParticipation} participation.Via             The player entity represents an entity where the act occurred "via" this entity (i.e. in transport)            
 * @property {ActParticipation} participation.Witness             The player entity represents a legal witness to the act occurring.            
 * @property {ActParticipation} participation.$other Unclassified
 * @property {object} relationship            Gets a list of all associated entities for this entity            
 * @property {EntityRelationship} relationship.Access             The access            
 * @property {EntityRelationship} relationship.ActiveMoiety             The active moiety            
 * @property {EntityRelationship} relationship.AdministerableMaterial             The administerable material            
 * @property {EntityRelationship} relationship.AdoptedChild             The adopted child            
 * @property {EntityRelationship} relationship.AdoptedDaughter             The adopted daughter            
 * @property {EntityRelationship} relationship.AdoptedSon             The adopted son            
 * @property {EntityRelationship} relationship.Affiliate             The affiliate            
 * @property {EntityRelationship} relationship.Agent             The agent            
 * @property {EntityRelationship} relationship.Aliquot             The aliquot            
 * @property {EntityRelationship} relationship.Assigned             The assigned            
 * @property {EntityRelationship} relationship.AssignedEntity             The assigned entity            
 * @property {EntityRelationship} relationship.Aunt             The aunt            
 * @property {EntityRelationship} relationship.Birthplace             The birthplace            
 * @property {EntityRelationship} relationship.Brother             The brother            
 * @property {EntityRelationship} relationship.Brotherinlaw             The brotherinlaw            
 * @property {EntityRelationship} relationship.Caregiver             The caregiver            
 * @property {EntityRelationship} relationship.CaseSubject             The case subject            
 * @property {EntityRelationship} relationship.Child             The child            
 * @property {EntityRelationship} relationship.ChildInlaw             The child inlaw            
 * @property {EntityRelationship} relationship.Citizen             The citizen            
 * @property {EntityRelationship} relationship.Claimant             The claimant            
 * @property {EntityRelationship} relationship.ClinicalResearchInvestigator             The clinical research investigator            
 * @property {EntityRelationship} relationship.ClinicalResearchSponsor             The clinical research sponsor            
 * @property {EntityRelationship} relationship.CommissioningParty             The commissioning party            
 * @property {EntityRelationship} relationship.Contact             The contact            
 * @property {EntityRelationship} relationship.Cousin             The cousin            
 * @property {EntityRelationship} relationship.CoverageSponsor             The coverage sponsor            
 * @property {EntityRelationship} relationship.CoveredParty             The covered party            
 * @property {EntityRelationship} relationship.Daughter             The daughter            
 * @property {EntityRelationship} relationship.DaughterInlaw             The daughter inlaw            
 * @property {EntityRelationship} relationship.DedicatedServiceDeliveryLocation             The dedicated service delivery location            
 * @property {EntityRelationship} relationship.Dependent             The dependent            
 * @property {EntityRelationship} relationship.DistributedMaterial             The distributed material            
 * @property {EntityRelationship} relationship.DomesticPartner             The domestic partner            
 * @property {EntityRelationship} relationship.EmergencyContact             The emergency contact            
 * @property {EntityRelationship} relationship.Employee             The employee            
 * @property {EntityRelationship} relationship.ExposedEntity             The exposed entity            
 * @property {EntityRelationship} relationship.FamilyMember             The family member            
 * @property {EntityRelationship} relationship.Father             The father            
 * @property {EntityRelationship} relationship.Fatherinlaw             The fatherinlaw            
 * @property {EntityRelationship} relationship.FosterChild             The foster child            
 * @property {EntityRelationship} relationship.FosterDaughter             The foster daughter            
 * @property {EntityRelationship} relationship.FosterSon             The foster son            
 * @property {EntityRelationship} relationship.Grandchild             The grandchild            
 * @property {EntityRelationship} relationship.Granddaughter             The granddaughter            
 * @property {EntityRelationship} relationship.Grandfather             The grandfather            
 * @property {EntityRelationship} relationship.Grandmother             The grandmother            
 * @property {EntityRelationship} relationship.Grandparent             The grandparent            
 * @property {EntityRelationship} relationship.Grandson             The grandson            
 * @property {EntityRelationship} relationship.GreatGrandfather             The great grandfather            
 * @property {EntityRelationship} relationship.GreatGrandmother             The great grandmother            
 * @property {EntityRelationship} relationship.GreatGrandparent             The great grandparent            
 * @property {EntityRelationship} relationship.Guarantor             The guarantor            
 * @property {EntityRelationship} relationship.GUARD             The guard            
 * @property {EntityRelationship} relationship.Guardian             The guardian            
 * @property {EntityRelationship} relationship.Halfbrother             The halfbrother            
 * @property {EntityRelationship} relationship.Halfsibling             The halfsibling            
 * @property {EntityRelationship} relationship.Halfsister             The halfsister            
 * @property {EntityRelationship} relationship.HealthcareProvider             The healthcare provider            
 * @property {EntityRelationship} relationship.HealthChart             The health chart            
 * @property {EntityRelationship} relationship.HeldEntity             The held entity            
 * @property {EntityRelationship} relationship.Husband             The husband            
 * @property {EntityRelationship} relationship.IdentifiedEntity             The identified entity            
 * @property {EntityRelationship} relationship.IncidentalServiceDeliveryLocation             The incidental service delivery location            
 * @property {EntityRelationship} relationship.Individual             The individual            
 * @property {EntityRelationship} relationship.InvestigationSubject             The investigation subject            
 * @property {EntityRelationship} relationship.InvoicePayor             The invoice payor            
 * @property {EntityRelationship} relationship.Isolate             The isolate            
 * @property {EntityRelationship} relationship.LicensedEntity             The licensed entity            
 * @property {EntityRelationship} relationship.MaintainedEntity             The maintained entity            
 * @property {EntityRelationship} relationship.ManufacturedProduct             The manufactured product            
 * @property {EntityRelationship} relationship.MaternalAunt             The maternal aunt            
 * @property {EntityRelationship} relationship.MaternalCousin             The maternal cousin            
 * @property {EntityRelationship} relationship.MaternalGrandfather             The maternal grandfather            
 * @property {EntityRelationship} relationship.MaternalGrandmother             The maternal grandmother            
 * @property {EntityRelationship} relationship.MaternalGrandparent             The maternal grandparent            
 * @property {EntityRelationship} relationship.MaternalGreatgrandfather             The maternal greatgrandfather            
 * @property {EntityRelationship} relationship.MaternalGreatgrandmother             The maternal greatgrandmother            
 * @property {EntityRelationship} relationship.MaternalGreatgrandparent             The maternal greatgrandparent            
 * @property {EntityRelationship} relationship.MaternalUncle             The maternal uncle            
 * @property {EntityRelationship} relationship.MilitaryPerson             The military person            
 * @property {EntityRelationship} relationship.Mother             The mother            
 * @property {EntityRelationship} relationship.Motherinlaw             The motherinlaw            
 * @property {EntityRelationship} relationship.NamedInsured             The named insured            
 * @property {EntityRelationship} relationship.NaturalBrother             The natural brother            
 * @property {EntityRelationship} relationship.NaturalChild             The natural child            
 * @property {EntityRelationship} relationship.NaturalDaughter             The natural daughter            
 * @property {EntityRelationship} relationship.NaturalFather             The natural father            
 * @property {EntityRelationship} relationship.NaturalFatherOfFetus             The natural father of fetus            
 * @property {EntityRelationship} relationship.NaturalMother             The natural mother            
 * @property {EntityRelationship} relationship.NaturalParent             The natural parent            
 * @property {EntityRelationship} relationship.NaturalSibling             The natural sibling            
 * @property {EntityRelationship} relationship.NaturalSister             The natural sister            
 * @property {EntityRelationship} relationship.NaturalSon             The natural son            
 * @property {EntityRelationship} relationship.Nephew             The nephew            
 * @property {EntityRelationship} relationship.NextOfKin             The next of kin            
 * @property {EntityRelationship} relationship.Niece             The niece            
 * @property {EntityRelationship} relationship.NieceNephew             The niece nephew            
 * @property {EntityRelationship} relationship.NotaryPublic             The notary public            
 * @property {EntityRelationship} relationship.OwnedEntity             The owned entity            
 * @property {EntityRelationship} relationship.Parent             The parent            
 * @property {EntityRelationship} relationship.ParentInlaw             The parent inlaw            
 * @property {EntityRelationship} relationship.Part             The part            
 * @property {EntityRelationship} relationship.PaternalAunt             The paternal aunt            
 * @property {EntityRelationship} relationship.PaternalCousin             The paternal cousin            
 * @property {EntityRelationship} relationship.PaternalGrandfather             The paternal grandfather            
 * @property {EntityRelationship} relationship.PaternalGrandmother             The paternal grandmother            
 * @property {EntityRelationship} relationship.PaternalGrandparent             The paternal grandparent            
 * @property {EntityRelationship} relationship.PaternalGreatgrandfather             The paternal greatgrandfather            
 * @property {EntityRelationship} relationship.PaternalGreatgrandmother             The paternal greatgrandmother            
 * @property {EntityRelationship} relationship.PaternalGreatgrandparent             The paternal greatgrandparent            
 * @property {EntityRelationship} relationship.PaternalUncle             The paternal uncle            
 * @property {EntityRelationship} relationship.Patient             The patient            
 * @property {EntityRelationship} relationship.Payee             The payee            
 * @property {EntityRelationship} relationship.PersonalRelationship             The personal relationship            
 * @property {EntityRelationship} relationship.PlaceOfDeath             The place of death            
 * @property {EntityRelationship} relationship.PolicyHolder             The policy holder            
 * @property {EntityRelationship} relationship.ProgramEligible             The program eligible            
 * @property {EntityRelationship} relationship.QualifiedEntity             The qualified entity            
 * @property {EntityRelationship} relationship.RegulatedProduct             The regulated product            
 * @property {EntityRelationship} relationship.ResearchSubject             The research subject            
 * @property {EntityRelationship} relationship.RetailedMaterial             The retailed material            
 * @property {EntityRelationship} relationship.Roomate             The roomate            
 * @property {EntityRelationship} relationship.ServiceDeliveryLocation             The service delivery location            
 * @property {EntityRelationship} relationship.Sibling             The sibling            
 * @property {EntityRelationship} relationship.SiblingInlaw             The sibling inlaw            
 * @property {EntityRelationship} relationship.SignificantOther             The significant other            
 * @property {EntityRelationship} relationship.SigningAuthorityOrOfficer             The signing authority or officer            
 * @property {EntityRelationship} relationship.Sister             The sister            
 * @property {EntityRelationship} relationship.Sisterinlaw             The sisterinlaw            
 * @property {EntityRelationship} relationship.Son             The son            
 * @property {EntityRelationship} relationship.SonInlaw             The son inlaw            
 * @property {EntityRelationship} relationship.Specimen             The specimen            
 * @property {EntityRelationship} relationship.Spouse             The spouse            
 * @property {EntityRelationship} relationship.Stepbrother             The stepbrother            
 * @property {EntityRelationship} relationship.StepChild             The step child            
 * @property {EntityRelationship} relationship.Stepdaughter             The stepdaughter            
 * @property {EntityRelationship} relationship.Stepfather             The stepfather            
 * @property {EntityRelationship} relationship.Stepmother             The stepmother            
 * @property {EntityRelationship} relationship.StepParent             The step parent            
 * @property {EntityRelationship} relationship.StepSibling             The step sibling            
 * @property {EntityRelationship} relationship.Stepsister             The stepsister            
 * @property {EntityRelationship} relationship.Stepson             The stepson            
 * @property {EntityRelationship} relationship.Student             The student            
 * @property {EntityRelationship} relationship.Subscriber             The subscriber            
 * @property {EntityRelationship} relationship.TerritoryOfAuthority             The territory of authority            
 * @property {EntityRelationship} relationship.TherapeuticAgent             The therapeutic agent            
 * @property {EntityRelationship} relationship.Uncle             The uncle            
 * @property {EntityRelationship} relationship.Underwriter             The underwriter            
 * @property {EntityRelationship} relationship.UsedEntity             The used entity            
 * @property {EntityRelationship} relationship.WarrantedProduct             The warranted product            
 * @property {EntityRelationship} relationship.Wife             The wife            
 * @property {EntityRelationship} relationship.Replaces             The replaces            
 * @property {EntityRelationship} relationship.Instance             The target entity represents an instance of the scoper entity            
 * @property {EntityRelationship} relationship.LocatedEntity             Relates the target entity to a source location            
 * @property {EntityRelationship} relationship.$other Unclassified
 * @property {Concept} statusConceptModel [Delay loaded from statusConcept],             Status concept id            
 * @property {string} statusConcept            Status concept id            (see: {@link StatusKeys} for values)
 * @property {object} tag            Gets a list of all tags associated with the entity            
 * @property {string} tag.classifier  where classifier is from {@link Tag} key
 * @property {object} telecom            Gets a list of all telecommunications addresses associated with the entity            
 * @property {EntityTelecomAddress} telecom.AnsweringService             answering service            
 * @property {EntityTelecomAddress} telecom.EmergencyContact             Emergency contact            
 * @property {EntityTelecomAddress} telecom.MobileContact             Mobile phone contact            
 * @property {EntityTelecomAddress} telecom.Pager             pager            
 * @property {EntityTelecomAddress} telecom.Public             public (800 number example) contact            
 * @property {EntityTelecomAddress} telecom.TemporaryAddress             temporary contact            
 * @property {EntityTelecomAddress} telecom.WorkPlace             For use in the workplace            
 * @property {EntityTelecomAddress} telecom.$other Unclassified
 * @property {string} template            Gets the template key            
 * @property {TemplateDefinition} templateModel [Delay loaded from template],             Gets or sets the template definition            
 * @property {Concept} typeConceptModel [Delay loaded from typeConcept],             Type concept identifier            
 * @property {string} typeConcept            Type concept identifier            
 * @property {string} previousVersion
 * @property {string} version
 * @property {number} sequence
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {Entity} copyData Copy constructor (if present)
 */
function Entity (copyData) { 
	this.$type = 'Entity';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {number} */
	this.sequence = copyData.sequence;
	/** @type {string} */
	this.version = copyData.version;
	/** @type {string} */
	this.previousVersion = copyData.previousVersion;
	/** @type {string} */
	this.typeConcept = copyData.typeConcept;
	/** @type {Concept} */
	this.typeConceptModel = copyData.typeConceptModel;
	/** @type {TemplateDefinition} */
	this.templateModel = copyData.templateModel;
	/** @type {string} */
	this.template = copyData.template;
	/** @type {object} */
	this.telecom = copyData.telecom;
	/** @type {object} */
	this.tag = copyData.tag;
	/** @type {string} */
	this.statusConcept = copyData.statusConcept;
	/** @type {Concept} */
	this.statusConceptModel = copyData.statusConceptModel;
	/** @type {object} */
	this.relationship = copyData.relationship;
	/** @type {object} */
	this.participation = copyData.participation;
	/** @type {string} */
	this.note = copyData.note;
	/** @type {object} */
	this.name = copyData.name;
	/** @type {object} */
	this.identifier = copyData.identifier;
	/** @type {object} */
	this.extension = copyData.extension;
	/** @type {string} */
	this.determinerConcept = copyData.determinerConcept;
	/** @type {Concept} */
	this.determinerConceptModel = copyData.determinerConceptModel;
	/** @type {string} */
	this.creationAct = copyData.creationAct;
	/** @type {Act} */
	this.creationActModel = copyData.creationActModel;
	/** @type {string} */
	this.classConcept = copyData.classConcept;
	/** @type {Concept} */
	this.classConceptModel = copyData.classConceptModel;
	/** @type {object} */
	this.address = copyData.address;
	}
}  // Entity 
// SanteDB.Core.Model.Entities.EntityAddress, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!EntityAddress)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Entity address            
 * @property {Concept} useModel [Delay loaded from use],             Gets or sets the address use            
 * @property {string} use            Gets or sets the address use key            (see: {@link AddressUseKeys} for values)
 * @property {object} component            Gets or sets the component types            
 * @property {string} component.AdditionalLocator             An additional locator (example: Beside the red barn).            
 * @property {string} component.AddressLine             An address line as would appear on an address (example: 123 Main Street West)            
 * @property {string} component.BuildingNumber             Identifies a particular building on a street (example: A23 Building)            
 * @property {string} component.BuildingNumberNumeric             Identifies a numeric identifier for a building (example: 123)            
 * @property {string} component.BuildingNumberSuffix             Identifies a suffix to the building number (example: 123 *SECTOR 7*)            
 * @property {string} component.CareOf             Identifies the person where deliveries should be care-of (example: c/o Bob Smith)            
 * @property {string} component.CensusTract             The census tract which is used for political counting of the census            
 * @property {string} component.City             The town or city (example: Toronto)            
 * @property {string} component.Country             The country in which the address resides (example: Canada)            
 * @property {string} component.County             The county or sub-division of a sub-national unit (example: Clark County)            
 * @property {string} component.Delimiter             Represents a meaningless delimiter such as dash, or newline            
 * @property {string} component.DeliveryAddressLine             Represents an address line to be used for delivery rather than physical location (example: Loading Dock #4)            
 * @property {string} component.DeliveryInstallationArea             Represents the area where the delivery should take place            
 * @property {string} component.DeliveryInstallationQualifier             The delivery installation qualifier.            
 * @property {string} component.DeliveryInstallationType             The delivery installation type.            
 * @property {string} component.DeliveryMode             The delivery mode.            
 * @property {string} component.DeliveryModeIdentifier             The delivery mode identifier.            
 * @property {string} component.Direction             Represents a directory such as north, south, east, or west            
 * @property {string} component.PostalCode             A codified adminsitrative unit used to locate the address (zip code or postal code)            
 * @property {string} component.PostBox             Represents a PO box where delivery of mail should take place            
 * @property {string} component.Precinct             Represents a precinct or sub-division of a city such as a burrogh            
 * @property {string} component.State             Represents a state or province, or a sub-division of a national boundary            
 * @property {string} component.StreetAddressLine             Represents a physical street delivery line (example: 123 Main Street West)            
 * @property {string} component.StreetName             Represents the name portion of a street address (example: Main St.)            
 * @property {string} component.StreetNameBase             The street name base portion of a street address (Example: Main)            
 * @property {string} component.StreetType             The street type (example: Street, Road, Hwy)            
 * @property {string} component.UnitDesignator             Identifies the type of unit (example: Suite, Apartment, Unit)            
 * @property {string} component.UnitIdentifier             The identifier of the unit (example: 820)            
 * @property {string} component.$other Unclassified
 * @property {number} effectiveVersionSequence
 * @property {number} obsoleteVersionSequence
 * @property {Date} modifiedOn
 * @property {string} source
 * @property {Entity} sourceModel [Delay loaded from source], 
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {EntityAddress} copyData Copy constructor (if present)
 */
function EntityAddress (copyData) { 
	this.$type = 'EntityAddress';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {Entity} */
	this.sourceModel = copyData.sourceModel;
	/** @type {string} */
	this.source = copyData.source;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {number} */
	this.obsoleteVersionSequence = copyData.obsoleteVersionSequence;
	/** @type {number} */
	this.effectiveVersionSequence = copyData.effectiveVersionSequence;
	/** @type {object} */
	this.component = copyData.component;
	/** @type {string} */
	this.use = copyData.use;
	/** @type {Concept} */
	this.useModel = copyData.useModel;
	}
}  // EntityAddress 
// SanteDB.Core.Model.Entities.EntityAddressComponent, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!AddressComponent)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             A single address component            
 * @property {string} type            Gets or sets the component type key            (see: {@link AddressComponentKeys} for values)
 * @property {Concept} typeModel [Delay loaded from type], 
 * @property {string} value
 * @property {Date} modifiedOn
 * @property {string} source
 * @property {EntityAddress} sourceModel [Delay loaded from source], 
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {AddressComponent} copyData Copy constructor (if present)
 */
function AddressComponent (copyData) { 
	this.$type = 'AddressComponent';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {EntityAddress} */
	this.sourceModel = copyData.sourceModel;
	/** @type {string} */
	this.source = copyData.source;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {string} */
	this.value = copyData.value;
	/** @type {Concept} */
	this.typeModel = copyData.typeModel;
	/** @type {string} */
	this.type = copyData.type;
	}
}  // AddressComponent 
// SanteDB.Core.Model.Entities.EntityName, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!EntityName)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents a name for an entity            
 * @property {object} component
 * @property {string} component.Delimiter             The name component represents a delimeter in a name such as hyphen or space            
 * @property {string} component.Family             The name component represents the surname            
 * @property {string} component.Given             The name component represents the given name            
 * @property {string} component.Prefix             The name component represents the prefix such as Von or Van            
 * @property {string} component.Suffix             The name component represents a suffix such as III or Esq.            
 * @property {string} component.Title             The name component represents a formal title like Mr, Dr, Capt.            
 * @property {string} component.$other Unclassified
 * @property {Concept} useModel [Delay loaded from use],             Gets or sets the name use            
 * @property {string} use            Gets or sets the name use key            (see: {@link NameUseKeys} for values)
 * @property {number} effectiveVersionSequence
 * @property {number} obsoleteVersionSequence
 * @property {Date} modifiedOn
 * @property {string} source
 * @property {Entity} sourceModel [Delay loaded from source], 
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {EntityName} copyData Copy constructor (if present)
 */
function EntityName (copyData) { 
	this.$type = 'EntityName';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {Entity} */
	this.sourceModel = copyData.sourceModel;
	/** @type {string} */
	this.source = copyData.source;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {number} */
	this.obsoleteVersionSequence = copyData.obsoleteVersionSequence;
	/** @type {number} */
	this.effectiveVersionSequence = copyData.effectiveVersionSequence;
	/** @type {string} */
	this.use = copyData.use;
	/** @type {Concept} */
	this.useModel = copyData.useModel;
	/** @type {object} */
	this.component = copyData.component;
	}
}  // EntityName 
// SanteDB.Core.Model.Entities.EntityNameComponent, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!EntityNameComponent)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents a name component which is bound to a name            
 * @property {string} type            Gets or sets the component type key            (see: {@link NameComponentKeys} for values)
 * @property {PhoneticAlgorithm} phoneticAlgorithmModel [Delay loaded from phoneticAlgorithm],             Gets or sets the phonetic algorithm            
 * @property {string} phoneticAlgorithm            Gets or sets the identifier of the phonetic code            (see: {@link PhoneticAlgorithmKeys} for values)
 * @property {string} phoneticCode            Gets or sets the phonetic code of the reference term            
 * @property {Concept} typeModel [Delay loaded from type], 
 * @property {string} value
 * @property {Date} modifiedOn
 * @property {string} source
 * @property {EntityName} sourceModel [Delay loaded from source], 
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {EntityNameComponent} copyData Copy constructor (if present)
 */
function EntityNameComponent (copyData) { 
	this.$type = 'EntityNameComponent';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {EntityName} */
	this.sourceModel = copyData.sourceModel;
	/** @type {string} */
	this.source = copyData.source;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {string} */
	this.value = copyData.value;
	/** @type {Concept} */
	this.typeModel = copyData.typeModel;
	/** @type {string} */
	this.phoneticCode = copyData.phoneticCode;
	/** @type {string} */
	this.phoneticAlgorithm = copyData.phoneticAlgorithm;
	/** @type {PhoneticAlgorithm} */
	this.phoneticAlgorithmModel = copyData.phoneticAlgorithmModel;
	/** @type {string} */
	this.type = copyData.type;
	}
}  // EntityNameComponent 
// SanteDB.Core.Model.Entities.EntityRelationship, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!EntityRelationship)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents an association between two entities            
 * @property {Entity} holderModel [Delay loaded from holder],             The entity that this relationship targets            
 * @property {string} holder            The entity that this relationship targets            
 * @property {boolean} inversionInd            The inversion indicator            
 * @property {number} quantity            Represents the quantity of target in source            
 * @property {Concept} relationshipTypeModel [Delay loaded from relationshipType],             Gets or sets the association type            
 * @property {string} relationshipType            Association type key            (see: {@link EntityRelationshipTypeKeys} for values)
 * @property {Entity} targetModel [Delay loaded from target],             Target entity reference            
 * @property {string} target            The target of the association            
 * @property {number} effectiveVersionSequence
 * @property {number} obsoleteVersionSequence
 * @property {Date} modifiedOn
 * @property {string} source
 * @property {Entity} sourceModel [Delay loaded from source], 
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {EntityRelationship} copyData Copy constructor (if present)
 */
function EntityRelationship (copyData) { 
	this.$type = 'EntityRelationship';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {Entity} */
	this.sourceModel = copyData.sourceModel;
	/** @type {string} */
	this.source = copyData.source;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {number} */
	this.obsoleteVersionSequence = copyData.obsoleteVersionSequence;
	/** @type {number} */
	this.effectiveVersionSequence = copyData.effectiveVersionSequence;
	/** @type {string} */
	this.target = copyData.target;
	/** @type {Entity} */
	this.targetModel = copyData.targetModel;
	/** @type {string} */
	this.relationshipType = copyData.relationshipType;
	/** @type {Concept} */
	this.relationshipTypeModel = copyData.relationshipTypeModel;
	/** @type {number} */
	this.quantity = copyData.quantity;
	/** @type {boolean} */
	this.inversionInd = copyData.inversionInd;
	/** @type {string} */
	this.holder = copyData.holder;
	/** @type {Entity} */
	this.holderModel = copyData.holderModel;
	}
}  // EntityRelationship 
// SanteDB.Core.Model.Entities.EntityTelecomAddress, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!EntityTelecomAddress)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents an entity telecom address            
 * @property {Concept} useModel [Delay loaded from use],             Gets or sets the name use            
 * @property {string} use            Gets or sets the name use key            (see: {@link TelecomAddressUseKeys} for values)
 * @property {string} value            Gets or sets the value of the telecom address            
 * @property {number} effectiveVersionSequence
 * @property {number} obsoleteVersionSequence
 * @property {Date} modifiedOn
 * @property {string} source
 * @property {Entity} sourceModel [Delay loaded from source], 
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {EntityTelecomAddress} copyData Copy constructor (if present)
 */
function EntityTelecomAddress (copyData) { 
	this.$type = 'EntityTelecomAddress';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {Entity} */
	this.sourceModel = copyData.sourceModel;
	/** @type {string} */
	this.source = copyData.source;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {number} */
	this.obsoleteVersionSequence = copyData.obsoleteVersionSequence;
	/** @type {number} */
	this.effectiveVersionSequence = copyData.effectiveVersionSequence;
	/** @type {string} */
	this.value = copyData.value;
	/** @type {string} */
	this.use = copyData.use;
	/** @type {Concept} */
	this.useModel = copyData.useModel;
	}
}  // EntityTelecomAddress 
// SanteDB.Core.Model.Entities.ManufacturedMaterial, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ManufacturedMaterial)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends Material
 * @summary             Manufactured material            
 * @property {string} lotNumber            Gets or sets the lot number of the manufactured material            
 * @property {Date} expiryDate            Gets or sets the expiry date of the material            
 * @property {Concept} formConceptModel [Delay loaded from formConcept],             Gets or sets the concept which dictates the form of the material (solid, liquid, capsule, injection, etc.)            
 * @property {string} formConcept            Gets or sets the form concept's key            
 * @property {boolean} isAdministrative            True if the material is simply administrative            
 * @property {number} quantity            The base quantity of the object in the units. This differs from quantity on the relationship            which is a /per ...            
 * @property {Concept} quantityConceptModel [Delay loaded from quantityConcept],             Gets or sets the concept which dictates the unit of measure for a single instance of this entity            
 * @property {string} quantityConcept            Gets or sets the quantity concept ref            
 * @property {object} address            Gets a list of all addresses associated with the entity            
 * @property {EntityAddress} address.Alphabetic             Represents an alphabetic address used for matching             
 * @property {EntityAddress} address.BadAddress             Represents a bad address, i.e. an address which is old or invalid.            
 * @property {EntityAddress} address.Direct             Represents a workplace address that reaches the person directly without intermediaries.            
 * @property {EntityAddress} address.HomeAddress             The home address            
 * @property {EntityAddress} address.Ideographic             Represents an address expressed in an ideographic manner (example: Kanji)            
 * @property {EntityAddress} address.Phonetic             Represents an address expressed as a phonetic spelling of an ideographic address            
 * @property {EntityAddress} address.PhysicalVisit             The address is a physical place where visits should occur            
 * @property {EntityAddress} address.PostalAddress             The address is a postal address used for the delivery of mail and materials            
 * @property {EntityAddress} address.PrimaryHome             Represents a primary address to reach a contact after business hours.            
 * @property {EntityAddress} address.Public             Represents an address that is a standard address that may be subject to a switchboard or operator prior to reaching the intended entity.            
 * @property {EntityAddress} address.Soundex             Represents an address used for soundex matching purposes.            
 * @property {EntityAddress} address.Syllabic             Represents a syllabic address.            
 * @property {EntityAddress} address.TemporaryAddress             Represents a temporary address that may be good for visiting or mailing.            
 * @property {EntityAddress} address.VacationHome             Represents a vacation home to reach a person while on vacation.            
 * @property {EntityAddress} address.WorkPlace             Represents an office address, should be used for business communications            
 * @property {EntityAddress} address.$other Unclassified
 * @property {Concept} classConceptModel [Delay loaded from classConcept],             Class concept datal load property            
 * @property {string} classConcept            Class concept            (see: {@link EntityClassKeys} for values)
 * @property {Act} creationActModel [Delay loaded from creationAct],             Creation act reference            
 * @property {string} creationAct            Creation act reference            
 * @property {Concept} determinerConceptModel [Delay loaded from determinerConcept],             Determiner concept            
 * @property {string} determinerConcept            Determiner concept            (see: {@link DeterminerKeys} for values)
 * @property {object} extension            Gets a list of all extensions associated with the entity            
 * @property {string} extension.classifier  where classifier is from {@link Extension} extensionType
 * @property {object} identifier            Gets the identifiers associated with this entity            
 * @property {EntityIdentifier} identifier.classifier  where classifier is from {@link IdentifierBase} authority
 * @property {object} name            Gets a list of all names associated with the entity            
 * @property {EntityName} name.Alphabetic             The name used is an alphabetic representation of the name (ex: romaji in Japanese)            
 * @property {EntityName} name.Anonymous             The name is an anonymous name for the object (not the real name but a name used for care delivery)            
 * @property {EntityName} name.Artist             The name represents an artist name or stage name            
 * @property {EntityName} name.Assigned             The name represents an assigned name (given or bestowed by an authority)            
 * @property {EntityName} name.Ideographic             THe name represents an ideographic representation of the name            
 * @property {EntityName} name.Indigenous             The name is an indigenous name or tribal name for the patient            
 * @property {EntityName} name.Legal             The name represents the current legal name of an object (such as a corporate name)            
 * @property {EntityName} name.License             The name represents a name as displayed on a license or known to a license authority            
 * @property {EntityName} name.MaidenName             THe name is a maiden name (name of a patient before marriage)            
 * @property {EntityName} name.OfficialRecord             The name as it appears on an official record            
 * @property {EntityName} name.Phonetic             The name represents a phonetic representation of a name such as a SOUNDEX code            
 * @property {EntityName} name.Pseudonym             The name is a pseudonym for the object or an synonym name            
 * @property {EntityName} name.Religious             The name is to be used for religious purposes (such as baptismal name)            
 * @property {EntityName} name.Search             The name is to be used in the performing of matches only            
 * @property {EntityName} name.Soundex             The name represents the computed soundex code of a name            
 * @property {EntityName} name.Syllabic             The name represents a syllabic name.            
 * @property {EntityName} name.$other Unclassified
 * @property {string} note            Gets a list of all notes associated with the entity            
 * @property {object} participation            Gets the acts in which this entity participates            
 * @property {ActParticipation} participation.Admitter             The player entity was the person who was responsible for admitting the patient into a facility or care scenario.            
 * @property {ActParticipation} participation.Attender             The player entity represents the attending physician for the patient            
 * @property {ActParticipation} participation.Authenticator             The player entity represents an entity which authenticates the provision of care            
 * @property {ActParticipation} participation.Authororiginator             The player entity is responsible for the creation of data described in the act            
 * @property {ActParticipation} participation.Baby             The player is a resultant person in that it was the baby             
 * @property {ActParticipation} participation.Beneficiary             The player is a beneficiary of the act such a receiver of a financial instrument, or other good            
 * @property {ActParticipation} participation.CallbackContact             The player entity represents something that should be contacted upon completion of the act            
 * @property {ActParticipation} participation.CausativeAgent             The player entity is an agent which caused the act to occur            
 * @property {ActParticipation} participation.Consultant             The player entity is acting as a consult to the carrying out of the act            
 * @property {ActParticipation} participation.Consumable             The player entity was or is to be consumed during the process of carrying out the act.            
 * @property {ActParticipation} participation.CoverageTarget             The player entity represents the target coverage entity of the act            
 * @property {ActParticipation} participation.Custodian             The player entity is the data custodian of the act (is responsible for storing and securing the act)            
 * @property {ActParticipation} participation.DataEnterer             The player entity represents the person or device which phisically entered the data at the terminal            
 * @property {ActParticipation} participation.Destination             The player etity represents the ultimate destination of the goods/materials/services described in the act            
 * @property {ActParticipation} participation.Device             The player entity represents the device on which the act or data from the act was acquired or recorded            
 * @property {ActParticipation} participation.DirectTarget             The player entity represents the directed target of care provided in the act            
 * @property {ActParticipation} participation.Discharger             The player entity represents the person who is responsible for the discharging of the patient from an encounter            
 * @property {ActParticipation} participation.Distributor             The player entity is the source distribution point for the financial or material instruments contained in the message            
 * @property {ActParticipation} participation.Donor             The player entity represents the donor of tissue or materials used in the act            
 * @property {ActParticipation} participation.EntryLocation             The location where the act was entered.            
 * @property {ActParticipation} participation.Escort             The player entity was responsible for escorting the patient during the course of the act            
 * @property {ActParticipation} participation.Exposure             The player entity something to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureAgent             The player entity represents the agent (material) to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureSource             The player entity describes the source of the material to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureTarget             The player entity describes the target to which the agent was exposed            
 * @property {ActParticipation} participation.GuarantorParty             The player represents a party which is used as a financial guarantor for payment in the carrying out of the act            
 * @property {ActParticipation} participation.Holder             The player is responsible for holding the act            
 * @property {ActParticipation} participation.IndirectTarget             The entity not directly present in the act but which will be the focust of th act.            
 * @property {ActParticipation} participation.Informant             The player was a person or device which informed data presented in the act. (Example: A mother telling a nurse that their child had a reaction)            
 * @property {ActParticipation} participation.InformationRecipient             The player entity represents something that should be cc'ed on the act            
 * @property {ActParticipation} participation.LegalAuthenticator             The player entity is responsible for legally authenticating the content of the act            
 * @property {ActParticipation} participation.Location             The location where the service was performed.            
 * @property {ActParticipation} participation.NonreuseableDevice             The player represents a consumable that can no longer be used            
 * @property {ActParticipation} participation.Origin             The player represents the origin of the act            
 * @property {ActParticipation} participation.Participation             The player entity participates in the act in no particular classification            
 * @property {ActParticipation} participation.Performer             The player entity is responsible for performing the clinical steps documented in the act            
 * @property {ActParticipation} participation.PrimaryInformationRecipient             The player entity represents a high priority contact which should be informed or cc'ed on the act            
 * @property {ActParticipation} participation.PrimaryPerformer             The player entity was the primary performer of the act. This is used in procedures where more than one performer is present            
 * @property {ActParticipation} participation.Product             The player represents a product that is not necessarily consumed but informs the act            
 * @property {ActParticipation} participation.Receiver             The player represents the entity which is the intended receiver of the act            
 * @property {ActParticipation} participation.RecordTarget             The player represents the entity to which the act is recorded against            
 * @property {ActParticipation} participation.ReferredBy             The player represents the entity which referred the act or caused the act to be undertaken            
 * @property {ActParticipation} participation.ReferredTo             The player entity represents the entity which was referred to            
 * @property {ActParticipation} participation.Referrer             The player entity represents the person who was originally the referrer.            
 * @property {ActParticipation} participation.Remote             The player entity represents a remote portion of the act            
 * @property {ActParticipation} participation.ResponsibleParty             The player entity is ultimately responsible for the carrying out of the act            
 * @property {ActParticipation} participation.ReusableDevice             The player entity represents a device which can be reused in future acts            
 * @property {ActParticipation} participation.SecondaryPerformer             The secondary performing person (support clinician).            
 * @property {ActParticipation} participation.Specimen             The player entity represents a specimen collected for the purpose of testing and diagnosis            
 * @property {ActParticipation} participation.Subject             The player entity is the subject of an act, but not necessarily the record target (meaning the act is about a particular entity but not to be attached to their record)            
 * @property {ActParticipation} participation.Tracker             The player entity is responsible for tracking the progress of the act            
 * @property {ActParticipation} participation.Transcriber             The person who transcribed data from the original act.            
 * @property {ActParticipation} participation.UgentNotificationContact             The player entity represents a contact entity in case of an emergency occurs during the act.            
 * @property {ActParticipation} participation.Verifier             The player entity was responsible for verifying the accuracy of the data in the act            
 * @property {ActParticipation} participation.Via             The player entity represents an entity where the act occurred "via" this entity (i.e. in transport)            
 * @property {ActParticipation} participation.Witness             The player entity represents a legal witness to the act occurring.            
 * @property {ActParticipation} participation.$other Unclassified
 * @property {object} relationship            Gets a list of all associated entities for this entity            
 * @property {EntityRelationship} relationship.Access             The access            
 * @property {EntityRelationship} relationship.ActiveMoiety             The active moiety            
 * @property {EntityRelationship} relationship.AdministerableMaterial             The administerable material            
 * @property {EntityRelationship} relationship.AdoptedChild             The adopted child            
 * @property {EntityRelationship} relationship.AdoptedDaughter             The adopted daughter            
 * @property {EntityRelationship} relationship.AdoptedSon             The adopted son            
 * @property {EntityRelationship} relationship.Affiliate             The affiliate            
 * @property {EntityRelationship} relationship.Agent             The agent            
 * @property {EntityRelationship} relationship.Aliquot             The aliquot            
 * @property {EntityRelationship} relationship.Assigned             The assigned            
 * @property {EntityRelationship} relationship.AssignedEntity             The assigned entity            
 * @property {EntityRelationship} relationship.Aunt             The aunt            
 * @property {EntityRelationship} relationship.Birthplace             The birthplace            
 * @property {EntityRelationship} relationship.Brother             The brother            
 * @property {EntityRelationship} relationship.Brotherinlaw             The brotherinlaw            
 * @property {EntityRelationship} relationship.Caregiver             The caregiver            
 * @property {EntityRelationship} relationship.CaseSubject             The case subject            
 * @property {EntityRelationship} relationship.Child             The child            
 * @property {EntityRelationship} relationship.ChildInlaw             The child inlaw            
 * @property {EntityRelationship} relationship.Citizen             The citizen            
 * @property {EntityRelationship} relationship.Claimant             The claimant            
 * @property {EntityRelationship} relationship.ClinicalResearchInvestigator             The clinical research investigator            
 * @property {EntityRelationship} relationship.ClinicalResearchSponsor             The clinical research sponsor            
 * @property {EntityRelationship} relationship.CommissioningParty             The commissioning party            
 * @property {EntityRelationship} relationship.Contact             The contact            
 * @property {EntityRelationship} relationship.Cousin             The cousin            
 * @property {EntityRelationship} relationship.CoverageSponsor             The coverage sponsor            
 * @property {EntityRelationship} relationship.CoveredParty             The covered party            
 * @property {EntityRelationship} relationship.Daughter             The daughter            
 * @property {EntityRelationship} relationship.DaughterInlaw             The daughter inlaw            
 * @property {EntityRelationship} relationship.DedicatedServiceDeliveryLocation             The dedicated service delivery location            
 * @property {EntityRelationship} relationship.Dependent             The dependent            
 * @property {EntityRelationship} relationship.DistributedMaterial             The distributed material            
 * @property {EntityRelationship} relationship.DomesticPartner             The domestic partner            
 * @property {EntityRelationship} relationship.EmergencyContact             The emergency contact            
 * @property {EntityRelationship} relationship.Employee             The employee            
 * @property {EntityRelationship} relationship.ExposedEntity             The exposed entity            
 * @property {EntityRelationship} relationship.FamilyMember             The family member            
 * @property {EntityRelationship} relationship.Father             The father            
 * @property {EntityRelationship} relationship.Fatherinlaw             The fatherinlaw            
 * @property {EntityRelationship} relationship.FosterChild             The foster child            
 * @property {EntityRelationship} relationship.FosterDaughter             The foster daughter            
 * @property {EntityRelationship} relationship.FosterSon             The foster son            
 * @property {EntityRelationship} relationship.Grandchild             The grandchild            
 * @property {EntityRelationship} relationship.Granddaughter             The granddaughter            
 * @property {EntityRelationship} relationship.Grandfather             The grandfather            
 * @property {EntityRelationship} relationship.Grandmother             The grandmother            
 * @property {EntityRelationship} relationship.Grandparent             The grandparent            
 * @property {EntityRelationship} relationship.Grandson             The grandson            
 * @property {EntityRelationship} relationship.GreatGrandfather             The great grandfather            
 * @property {EntityRelationship} relationship.GreatGrandmother             The great grandmother            
 * @property {EntityRelationship} relationship.GreatGrandparent             The great grandparent            
 * @property {EntityRelationship} relationship.Guarantor             The guarantor            
 * @property {EntityRelationship} relationship.GUARD             The guard            
 * @property {EntityRelationship} relationship.Guardian             The guardian            
 * @property {EntityRelationship} relationship.Halfbrother             The halfbrother            
 * @property {EntityRelationship} relationship.Halfsibling             The halfsibling            
 * @property {EntityRelationship} relationship.Halfsister             The halfsister            
 * @property {EntityRelationship} relationship.HealthcareProvider             The healthcare provider            
 * @property {EntityRelationship} relationship.HealthChart             The health chart            
 * @property {EntityRelationship} relationship.HeldEntity             The held entity            
 * @property {EntityRelationship} relationship.Husband             The husband            
 * @property {EntityRelationship} relationship.IdentifiedEntity             The identified entity            
 * @property {EntityRelationship} relationship.IncidentalServiceDeliveryLocation             The incidental service delivery location            
 * @property {EntityRelationship} relationship.Individual             The individual            
 * @property {EntityRelationship} relationship.InvestigationSubject             The investigation subject            
 * @property {EntityRelationship} relationship.InvoicePayor             The invoice payor            
 * @property {EntityRelationship} relationship.Isolate             The isolate            
 * @property {EntityRelationship} relationship.LicensedEntity             The licensed entity            
 * @property {EntityRelationship} relationship.MaintainedEntity             The maintained entity            
 * @property {EntityRelationship} relationship.ManufacturedProduct             The manufactured product            
 * @property {EntityRelationship} relationship.MaternalAunt             The maternal aunt            
 * @property {EntityRelationship} relationship.MaternalCousin             The maternal cousin            
 * @property {EntityRelationship} relationship.MaternalGrandfather             The maternal grandfather            
 * @property {EntityRelationship} relationship.MaternalGrandmother             The maternal grandmother            
 * @property {EntityRelationship} relationship.MaternalGrandparent             The maternal grandparent            
 * @property {EntityRelationship} relationship.MaternalGreatgrandfather             The maternal greatgrandfather            
 * @property {EntityRelationship} relationship.MaternalGreatgrandmother             The maternal greatgrandmother            
 * @property {EntityRelationship} relationship.MaternalGreatgrandparent             The maternal greatgrandparent            
 * @property {EntityRelationship} relationship.MaternalUncle             The maternal uncle            
 * @property {EntityRelationship} relationship.MilitaryPerson             The military person            
 * @property {EntityRelationship} relationship.Mother             The mother            
 * @property {EntityRelationship} relationship.Motherinlaw             The motherinlaw            
 * @property {EntityRelationship} relationship.NamedInsured             The named insured            
 * @property {EntityRelationship} relationship.NaturalBrother             The natural brother            
 * @property {EntityRelationship} relationship.NaturalChild             The natural child            
 * @property {EntityRelationship} relationship.NaturalDaughter             The natural daughter            
 * @property {EntityRelationship} relationship.NaturalFather             The natural father            
 * @property {EntityRelationship} relationship.NaturalFatherOfFetus             The natural father of fetus            
 * @property {EntityRelationship} relationship.NaturalMother             The natural mother            
 * @property {EntityRelationship} relationship.NaturalParent             The natural parent            
 * @property {EntityRelationship} relationship.NaturalSibling             The natural sibling            
 * @property {EntityRelationship} relationship.NaturalSister             The natural sister            
 * @property {EntityRelationship} relationship.NaturalSon             The natural son            
 * @property {EntityRelationship} relationship.Nephew             The nephew            
 * @property {EntityRelationship} relationship.NextOfKin             The next of kin            
 * @property {EntityRelationship} relationship.Niece             The niece            
 * @property {EntityRelationship} relationship.NieceNephew             The niece nephew            
 * @property {EntityRelationship} relationship.NotaryPublic             The notary public            
 * @property {EntityRelationship} relationship.OwnedEntity             The owned entity            
 * @property {EntityRelationship} relationship.Parent             The parent            
 * @property {EntityRelationship} relationship.ParentInlaw             The parent inlaw            
 * @property {EntityRelationship} relationship.Part             The part            
 * @property {EntityRelationship} relationship.PaternalAunt             The paternal aunt            
 * @property {EntityRelationship} relationship.PaternalCousin             The paternal cousin            
 * @property {EntityRelationship} relationship.PaternalGrandfather             The paternal grandfather            
 * @property {EntityRelationship} relationship.PaternalGrandmother             The paternal grandmother            
 * @property {EntityRelationship} relationship.PaternalGrandparent             The paternal grandparent            
 * @property {EntityRelationship} relationship.PaternalGreatgrandfather             The paternal greatgrandfather            
 * @property {EntityRelationship} relationship.PaternalGreatgrandmother             The paternal greatgrandmother            
 * @property {EntityRelationship} relationship.PaternalGreatgrandparent             The paternal greatgrandparent            
 * @property {EntityRelationship} relationship.PaternalUncle             The paternal uncle            
 * @property {EntityRelationship} relationship.Patient             The patient            
 * @property {EntityRelationship} relationship.Payee             The payee            
 * @property {EntityRelationship} relationship.PersonalRelationship             The personal relationship            
 * @property {EntityRelationship} relationship.PlaceOfDeath             The place of death            
 * @property {EntityRelationship} relationship.PolicyHolder             The policy holder            
 * @property {EntityRelationship} relationship.ProgramEligible             The program eligible            
 * @property {EntityRelationship} relationship.QualifiedEntity             The qualified entity            
 * @property {EntityRelationship} relationship.RegulatedProduct             The regulated product            
 * @property {EntityRelationship} relationship.ResearchSubject             The research subject            
 * @property {EntityRelationship} relationship.RetailedMaterial             The retailed material            
 * @property {EntityRelationship} relationship.Roomate             The roomate            
 * @property {EntityRelationship} relationship.ServiceDeliveryLocation             The service delivery location            
 * @property {EntityRelationship} relationship.Sibling             The sibling            
 * @property {EntityRelationship} relationship.SiblingInlaw             The sibling inlaw            
 * @property {EntityRelationship} relationship.SignificantOther             The significant other            
 * @property {EntityRelationship} relationship.SigningAuthorityOrOfficer             The signing authority or officer            
 * @property {EntityRelationship} relationship.Sister             The sister            
 * @property {EntityRelationship} relationship.Sisterinlaw             The sisterinlaw            
 * @property {EntityRelationship} relationship.Son             The son            
 * @property {EntityRelationship} relationship.SonInlaw             The son inlaw            
 * @property {EntityRelationship} relationship.Specimen             The specimen            
 * @property {EntityRelationship} relationship.Spouse             The spouse            
 * @property {EntityRelationship} relationship.Stepbrother             The stepbrother            
 * @property {EntityRelationship} relationship.StepChild             The step child            
 * @property {EntityRelationship} relationship.Stepdaughter             The stepdaughter            
 * @property {EntityRelationship} relationship.Stepfather             The stepfather            
 * @property {EntityRelationship} relationship.Stepmother             The stepmother            
 * @property {EntityRelationship} relationship.StepParent             The step parent            
 * @property {EntityRelationship} relationship.StepSibling             The step sibling            
 * @property {EntityRelationship} relationship.Stepsister             The stepsister            
 * @property {EntityRelationship} relationship.Stepson             The stepson            
 * @property {EntityRelationship} relationship.Student             The student            
 * @property {EntityRelationship} relationship.Subscriber             The subscriber            
 * @property {EntityRelationship} relationship.TerritoryOfAuthority             The territory of authority            
 * @property {EntityRelationship} relationship.TherapeuticAgent             The therapeutic agent            
 * @property {EntityRelationship} relationship.Uncle             The uncle            
 * @property {EntityRelationship} relationship.Underwriter             The underwriter            
 * @property {EntityRelationship} relationship.UsedEntity             The used entity            
 * @property {EntityRelationship} relationship.WarrantedProduct             The warranted product            
 * @property {EntityRelationship} relationship.Wife             The wife            
 * @property {EntityRelationship} relationship.Replaces             The replaces            
 * @property {EntityRelationship} relationship.Instance             The target entity represents an instance of the scoper entity            
 * @property {EntityRelationship} relationship.LocatedEntity             Relates the target entity to a source location            
 * @property {EntityRelationship} relationship.$other Unclassified
 * @property {Concept} statusConceptModel [Delay loaded from statusConcept],             Status concept id            
 * @property {string} statusConcept            Status concept id            (see: {@link StatusKeys} for values)
 * @property {object} tag            Gets a list of all tags associated with the entity            
 * @property {string} tag.classifier  where classifier is from {@link Tag} key
 * @property {object} telecom            Gets a list of all telecommunications addresses associated with the entity            
 * @property {EntityTelecomAddress} telecom.AnsweringService             answering service            
 * @property {EntityTelecomAddress} telecom.EmergencyContact             Emergency contact            
 * @property {EntityTelecomAddress} telecom.MobileContact             Mobile phone contact            
 * @property {EntityTelecomAddress} telecom.Pager             pager            
 * @property {EntityTelecomAddress} telecom.Public             public (800 number example) contact            
 * @property {EntityTelecomAddress} telecom.TemporaryAddress             temporary contact            
 * @property {EntityTelecomAddress} telecom.WorkPlace             For use in the workplace            
 * @property {EntityTelecomAddress} telecom.$other Unclassified
 * @property {string} template            Gets the template key            
 * @property {TemplateDefinition} templateModel [Delay loaded from template],             Gets or sets the template definition            
 * @property {Concept} typeConceptModel [Delay loaded from typeConcept],             Type concept identifier            
 * @property {string} typeConcept            Type concept identifier            
 * @property {string} previousVersion
 * @property {string} version
 * @property {number} sequence
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {ManufacturedMaterial} copyData Copy constructor (if present)
 */
function ManufacturedMaterial (copyData) { 
	this.$type = 'ManufacturedMaterial';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {number} */
	this.sequence = copyData.sequence;
	/** @type {string} */
	this.version = copyData.version;
	/** @type {string} */
	this.previousVersion = copyData.previousVersion;
	/** @type {string} */
	this.typeConcept = copyData.typeConcept;
	/** @type {Concept} */
	this.typeConceptModel = copyData.typeConceptModel;
	/** @type {TemplateDefinition} */
	this.templateModel = copyData.templateModel;
	/** @type {string} */
	this.template = copyData.template;
	/** @type {object} */
	this.telecom = copyData.telecom;
	/** @type {object} */
	this.tag = copyData.tag;
	/** @type {string} */
	this.statusConcept = copyData.statusConcept;
	/** @type {Concept} */
	this.statusConceptModel = copyData.statusConceptModel;
	/** @type {object} */
	this.relationship = copyData.relationship;
	/** @type {object} */
	this.participation = copyData.participation;
	/** @type {string} */
	this.note = copyData.note;
	/** @type {object} */
	this.name = copyData.name;
	/** @type {object} */
	this.identifier = copyData.identifier;
	/** @type {object} */
	this.extension = copyData.extension;
	/** @type {string} */
	this.determinerConcept = copyData.determinerConcept;
	/** @type {Concept} */
	this.determinerConceptModel = copyData.determinerConceptModel;
	/** @type {string} */
	this.creationAct = copyData.creationAct;
	/** @type {Act} */
	this.creationActModel = copyData.creationActModel;
	/** @type {string} */
	this.classConcept = copyData.classConcept;
	/** @type {Concept} */
	this.classConceptModel = copyData.classConceptModel;
	/** @type {object} */
	this.address = copyData.address;
	/** @type {string} */
	this.quantityConcept = copyData.quantityConcept;
	/** @type {Concept} */
	this.quantityConceptModel = copyData.quantityConceptModel;
	/** @type {number} */
	this.quantity = copyData.quantity;
	/** @type {boolean} */
	this.isAdministrative = copyData.isAdministrative;
	/** @type {string} */
	this.formConcept = copyData.formConcept;
	/** @type {Concept} */
	this.formConceptModel = copyData.formConceptModel;
	/** @type {Date} */
	this.expiryDate = copyData.expiryDate;
	/** @type {string} */
	this.lotNumber = copyData.lotNumber;
	}
}  // ManufacturedMaterial 
// SanteDB.Core.Model.Entities.Material, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!Material)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends Entity
 * @summary             Represents a material            
 * @property {Date} expiryDate            Gets or sets the expiry date of the material            
 * @property {Concept} formConceptModel [Delay loaded from formConcept],             Gets or sets the concept which dictates the form of the material (solid, liquid, capsule, injection, etc.)            
 * @property {string} formConcept            Gets or sets the form concept's key            
 * @property {boolean} isAdministrative            True if the material is simply administrative            
 * @property {number} quantity            The base quantity of the object in the units. This differs from quantity on the relationship            which is a /per ...            
 * @property {Concept} quantityConceptModel [Delay loaded from quantityConcept],             Gets or sets the concept which dictates the unit of measure for a single instance of this entity            
 * @property {string} quantityConcept            Gets or sets the quantity concept ref            
 * @property {object} address            Gets a list of all addresses associated with the entity            
 * @property {EntityAddress} address.Alphabetic             Represents an alphabetic address used for matching             
 * @property {EntityAddress} address.BadAddress             Represents a bad address, i.e. an address which is old or invalid.            
 * @property {EntityAddress} address.Direct             Represents a workplace address that reaches the person directly without intermediaries.            
 * @property {EntityAddress} address.HomeAddress             The home address            
 * @property {EntityAddress} address.Ideographic             Represents an address expressed in an ideographic manner (example: Kanji)            
 * @property {EntityAddress} address.Phonetic             Represents an address expressed as a phonetic spelling of an ideographic address            
 * @property {EntityAddress} address.PhysicalVisit             The address is a physical place where visits should occur            
 * @property {EntityAddress} address.PostalAddress             The address is a postal address used for the delivery of mail and materials            
 * @property {EntityAddress} address.PrimaryHome             Represents a primary address to reach a contact after business hours.            
 * @property {EntityAddress} address.Public             Represents an address that is a standard address that may be subject to a switchboard or operator prior to reaching the intended entity.            
 * @property {EntityAddress} address.Soundex             Represents an address used for soundex matching purposes.            
 * @property {EntityAddress} address.Syllabic             Represents a syllabic address.            
 * @property {EntityAddress} address.TemporaryAddress             Represents a temporary address that may be good for visiting or mailing.            
 * @property {EntityAddress} address.VacationHome             Represents a vacation home to reach a person while on vacation.            
 * @property {EntityAddress} address.WorkPlace             Represents an office address, should be used for business communications            
 * @property {EntityAddress} address.$other Unclassified
 * @property {Concept} classConceptModel [Delay loaded from classConcept],             Class concept datal load property            
 * @property {string} classConcept            Class concept            (see: {@link EntityClassKeys} for values)
 * @property {Act} creationActModel [Delay loaded from creationAct],             Creation act reference            
 * @property {string} creationAct            Creation act reference            
 * @property {Concept} determinerConceptModel [Delay loaded from determinerConcept],             Determiner concept            
 * @property {string} determinerConcept            Determiner concept            (see: {@link DeterminerKeys} for values)
 * @property {object} extension            Gets a list of all extensions associated with the entity            
 * @property {string} extension.classifier  where classifier is from {@link Extension} extensionType
 * @property {object} identifier            Gets the identifiers associated with this entity            
 * @property {EntityIdentifier} identifier.classifier  where classifier is from {@link IdentifierBase} authority
 * @property {object} name            Gets a list of all names associated with the entity            
 * @property {EntityName} name.Alphabetic             The name used is an alphabetic representation of the name (ex: romaji in Japanese)            
 * @property {EntityName} name.Anonymous             The name is an anonymous name for the object (not the real name but a name used for care delivery)            
 * @property {EntityName} name.Artist             The name represents an artist name or stage name            
 * @property {EntityName} name.Assigned             The name represents an assigned name (given or bestowed by an authority)            
 * @property {EntityName} name.Ideographic             THe name represents an ideographic representation of the name            
 * @property {EntityName} name.Indigenous             The name is an indigenous name or tribal name for the patient            
 * @property {EntityName} name.Legal             The name represents the current legal name of an object (such as a corporate name)            
 * @property {EntityName} name.License             The name represents a name as displayed on a license or known to a license authority            
 * @property {EntityName} name.MaidenName             THe name is a maiden name (name of a patient before marriage)            
 * @property {EntityName} name.OfficialRecord             The name as it appears on an official record            
 * @property {EntityName} name.Phonetic             The name represents a phonetic representation of a name such as a SOUNDEX code            
 * @property {EntityName} name.Pseudonym             The name is a pseudonym for the object or an synonym name            
 * @property {EntityName} name.Religious             The name is to be used for religious purposes (such as baptismal name)            
 * @property {EntityName} name.Search             The name is to be used in the performing of matches only            
 * @property {EntityName} name.Soundex             The name represents the computed soundex code of a name            
 * @property {EntityName} name.Syllabic             The name represents a syllabic name.            
 * @property {EntityName} name.$other Unclassified
 * @property {string} note            Gets a list of all notes associated with the entity            
 * @property {object} participation            Gets the acts in which this entity participates            
 * @property {ActParticipation} participation.Admitter             The player entity was the person who was responsible for admitting the patient into a facility or care scenario.            
 * @property {ActParticipation} participation.Attender             The player entity represents the attending physician for the patient            
 * @property {ActParticipation} participation.Authenticator             The player entity represents an entity which authenticates the provision of care            
 * @property {ActParticipation} participation.Authororiginator             The player entity is responsible for the creation of data described in the act            
 * @property {ActParticipation} participation.Baby             The player is a resultant person in that it was the baby             
 * @property {ActParticipation} participation.Beneficiary             The player is a beneficiary of the act such a receiver of a financial instrument, or other good            
 * @property {ActParticipation} participation.CallbackContact             The player entity represents something that should be contacted upon completion of the act            
 * @property {ActParticipation} participation.CausativeAgent             The player entity is an agent which caused the act to occur            
 * @property {ActParticipation} participation.Consultant             The player entity is acting as a consult to the carrying out of the act            
 * @property {ActParticipation} participation.Consumable             The player entity was or is to be consumed during the process of carrying out the act.            
 * @property {ActParticipation} participation.CoverageTarget             The player entity represents the target coverage entity of the act            
 * @property {ActParticipation} participation.Custodian             The player entity is the data custodian of the act (is responsible for storing and securing the act)            
 * @property {ActParticipation} participation.DataEnterer             The player entity represents the person or device which phisically entered the data at the terminal            
 * @property {ActParticipation} participation.Destination             The player etity represents the ultimate destination of the goods/materials/services described in the act            
 * @property {ActParticipation} participation.Device             The player entity represents the device on which the act or data from the act was acquired or recorded            
 * @property {ActParticipation} participation.DirectTarget             The player entity represents the directed target of care provided in the act            
 * @property {ActParticipation} participation.Discharger             The player entity represents the person who is responsible for the discharging of the patient from an encounter            
 * @property {ActParticipation} participation.Distributor             The player entity is the source distribution point for the financial or material instruments contained in the message            
 * @property {ActParticipation} participation.Donor             The player entity represents the donor of tissue or materials used in the act            
 * @property {ActParticipation} participation.EntryLocation             The location where the act was entered.            
 * @property {ActParticipation} participation.Escort             The player entity was responsible for escorting the patient during the course of the act            
 * @property {ActParticipation} participation.Exposure             The player entity something to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureAgent             The player entity represents the agent (material) to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureSource             The player entity describes the source of the material to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureTarget             The player entity describes the target to which the agent was exposed            
 * @property {ActParticipation} participation.GuarantorParty             The player represents a party which is used as a financial guarantor for payment in the carrying out of the act            
 * @property {ActParticipation} participation.Holder             The player is responsible for holding the act            
 * @property {ActParticipation} participation.IndirectTarget             The entity not directly present in the act but which will be the focust of th act.            
 * @property {ActParticipation} participation.Informant             The player was a person or device which informed data presented in the act. (Example: A mother telling a nurse that their child had a reaction)            
 * @property {ActParticipation} participation.InformationRecipient             The player entity represents something that should be cc'ed on the act            
 * @property {ActParticipation} participation.LegalAuthenticator             The player entity is responsible for legally authenticating the content of the act            
 * @property {ActParticipation} participation.Location             The location where the service was performed.            
 * @property {ActParticipation} participation.NonreuseableDevice             The player represents a consumable that can no longer be used            
 * @property {ActParticipation} participation.Origin             The player represents the origin of the act            
 * @property {ActParticipation} participation.Participation             The player entity participates in the act in no particular classification            
 * @property {ActParticipation} participation.Performer             The player entity is responsible for performing the clinical steps documented in the act            
 * @property {ActParticipation} participation.PrimaryInformationRecipient             The player entity represents a high priority contact which should be informed or cc'ed on the act            
 * @property {ActParticipation} participation.PrimaryPerformer             The player entity was the primary performer of the act. This is used in procedures where more than one performer is present            
 * @property {ActParticipation} participation.Product             The player represents a product that is not necessarily consumed but informs the act            
 * @property {ActParticipation} participation.Receiver             The player represents the entity which is the intended receiver of the act            
 * @property {ActParticipation} participation.RecordTarget             The player represents the entity to which the act is recorded against            
 * @property {ActParticipation} participation.ReferredBy             The player represents the entity which referred the act or caused the act to be undertaken            
 * @property {ActParticipation} participation.ReferredTo             The player entity represents the entity which was referred to            
 * @property {ActParticipation} participation.Referrer             The player entity represents the person who was originally the referrer.            
 * @property {ActParticipation} participation.Remote             The player entity represents a remote portion of the act            
 * @property {ActParticipation} participation.ResponsibleParty             The player entity is ultimately responsible for the carrying out of the act            
 * @property {ActParticipation} participation.ReusableDevice             The player entity represents a device which can be reused in future acts            
 * @property {ActParticipation} participation.SecondaryPerformer             The secondary performing person (support clinician).            
 * @property {ActParticipation} participation.Specimen             The player entity represents a specimen collected for the purpose of testing and diagnosis            
 * @property {ActParticipation} participation.Subject             The player entity is the subject of an act, but not necessarily the record target (meaning the act is about a particular entity but not to be attached to their record)            
 * @property {ActParticipation} participation.Tracker             The player entity is responsible for tracking the progress of the act            
 * @property {ActParticipation} participation.Transcriber             The person who transcribed data from the original act.            
 * @property {ActParticipation} participation.UgentNotificationContact             The player entity represents a contact entity in case of an emergency occurs during the act.            
 * @property {ActParticipation} participation.Verifier             The player entity was responsible for verifying the accuracy of the data in the act            
 * @property {ActParticipation} participation.Via             The player entity represents an entity where the act occurred "via" this entity (i.e. in transport)            
 * @property {ActParticipation} participation.Witness             The player entity represents a legal witness to the act occurring.            
 * @property {ActParticipation} participation.$other Unclassified
 * @property {object} relationship            Gets a list of all associated entities for this entity            
 * @property {EntityRelationship} relationship.Access             The access            
 * @property {EntityRelationship} relationship.ActiveMoiety             The active moiety            
 * @property {EntityRelationship} relationship.AdministerableMaterial             The administerable material            
 * @property {EntityRelationship} relationship.AdoptedChild             The adopted child            
 * @property {EntityRelationship} relationship.AdoptedDaughter             The adopted daughter            
 * @property {EntityRelationship} relationship.AdoptedSon             The adopted son            
 * @property {EntityRelationship} relationship.Affiliate             The affiliate            
 * @property {EntityRelationship} relationship.Agent             The agent            
 * @property {EntityRelationship} relationship.Aliquot             The aliquot            
 * @property {EntityRelationship} relationship.Assigned             The assigned            
 * @property {EntityRelationship} relationship.AssignedEntity             The assigned entity            
 * @property {EntityRelationship} relationship.Aunt             The aunt            
 * @property {EntityRelationship} relationship.Birthplace             The birthplace            
 * @property {EntityRelationship} relationship.Brother             The brother            
 * @property {EntityRelationship} relationship.Brotherinlaw             The brotherinlaw            
 * @property {EntityRelationship} relationship.Caregiver             The caregiver            
 * @property {EntityRelationship} relationship.CaseSubject             The case subject            
 * @property {EntityRelationship} relationship.Child             The child            
 * @property {EntityRelationship} relationship.ChildInlaw             The child inlaw            
 * @property {EntityRelationship} relationship.Citizen             The citizen            
 * @property {EntityRelationship} relationship.Claimant             The claimant            
 * @property {EntityRelationship} relationship.ClinicalResearchInvestigator             The clinical research investigator            
 * @property {EntityRelationship} relationship.ClinicalResearchSponsor             The clinical research sponsor            
 * @property {EntityRelationship} relationship.CommissioningParty             The commissioning party            
 * @property {EntityRelationship} relationship.Contact             The contact            
 * @property {EntityRelationship} relationship.Cousin             The cousin            
 * @property {EntityRelationship} relationship.CoverageSponsor             The coverage sponsor            
 * @property {EntityRelationship} relationship.CoveredParty             The covered party            
 * @property {EntityRelationship} relationship.Daughter             The daughter            
 * @property {EntityRelationship} relationship.DaughterInlaw             The daughter inlaw            
 * @property {EntityRelationship} relationship.DedicatedServiceDeliveryLocation             The dedicated service delivery location            
 * @property {EntityRelationship} relationship.Dependent             The dependent            
 * @property {EntityRelationship} relationship.DistributedMaterial             The distributed material            
 * @property {EntityRelationship} relationship.DomesticPartner             The domestic partner            
 * @property {EntityRelationship} relationship.EmergencyContact             The emergency contact            
 * @property {EntityRelationship} relationship.Employee             The employee            
 * @property {EntityRelationship} relationship.ExposedEntity             The exposed entity            
 * @property {EntityRelationship} relationship.FamilyMember             The family member            
 * @property {EntityRelationship} relationship.Father             The father            
 * @property {EntityRelationship} relationship.Fatherinlaw             The fatherinlaw            
 * @property {EntityRelationship} relationship.FosterChild             The foster child            
 * @property {EntityRelationship} relationship.FosterDaughter             The foster daughter            
 * @property {EntityRelationship} relationship.FosterSon             The foster son            
 * @property {EntityRelationship} relationship.Grandchild             The grandchild            
 * @property {EntityRelationship} relationship.Granddaughter             The granddaughter            
 * @property {EntityRelationship} relationship.Grandfather             The grandfather            
 * @property {EntityRelationship} relationship.Grandmother             The grandmother            
 * @property {EntityRelationship} relationship.Grandparent             The grandparent            
 * @property {EntityRelationship} relationship.Grandson             The grandson            
 * @property {EntityRelationship} relationship.GreatGrandfather             The great grandfather            
 * @property {EntityRelationship} relationship.GreatGrandmother             The great grandmother            
 * @property {EntityRelationship} relationship.GreatGrandparent             The great grandparent            
 * @property {EntityRelationship} relationship.Guarantor             The guarantor            
 * @property {EntityRelationship} relationship.GUARD             The guard            
 * @property {EntityRelationship} relationship.Guardian             The guardian            
 * @property {EntityRelationship} relationship.Halfbrother             The halfbrother            
 * @property {EntityRelationship} relationship.Halfsibling             The halfsibling            
 * @property {EntityRelationship} relationship.Halfsister             The halfsister            
 * @property {EntityRelationship} relationship.HealthcareProvider             The healthcare provider            
 * @property {EntityRelationship} relationship.HealthChart             The health chart            
 * @property {EntityRelationship} relationship.HeldEntity             The held entity            
 * @property {EntityRelationship} relationship.Husband             The husband            
 * @property {EntityRelationship} relationship.IdentifiedEntity             The identified entity            
 * @property {EntityRelationship} relationship.IncidentalServiceDeliveryLocation             The incidental service delivery location            
 * @property {EntityRelationship} relationship.Individual             The individual            
 * @property {EntityRelationship} relationship.InvestigationSubject             The investigation subject            
 * @property {EntityRelationship} relationship.InvoicePayor             The invoice payor            
 * @property {EntityRelationship} relationship.Isolate             The isolate            
 * @property {EntityRelationship} relationship.LicensedEntity             The licensed entity            
 * @property {EntityRelationship} relationship.MaintainedEntity             The maintained entity            
 * @property {EntityRelationship} relationship.ManufacturedProduct             The manufactured product            
 * @property {EntityRelationship} relationship.MaternalAunt             The maternal aunt            
 * @property {EntityRelationship} relationship.MaternalCousin             The maternal cousin            
 * @property {EntityRelationship} relationship.MaternalGrandfather             The maternal grandfather            
 * @property {EntityRelationship} relationship.MaternalGrandmother             The maternal grandmother            
 * @property {EntityRelationship} relationship.MaternalGrandparent             The maternal grandparent            
 * @property {EntityRelationship} relationship.MaternalGreatgrandfather             The maternal greatgrandfather            
 * @property {EntityRelationship} relationship.MaternalGreatgrandmother             The maternal greatgrandmother            
 * @property {EntityRelationship} relationship.MaternalGreatgrandparent             The maternal greatgrandparent            
 * @property {EntityRelationship} relationship.MaternalUncle             The maternal uncle            
 * @property {EntityRelationship} relationship.MilitaryPerson             The military person            
 * @property {EntityRelationship} relationship.Mother             The mother            
 * @property {EntityRelationship} relationship.Motherinlaw             The motherinlaw            
 * @property {EntityRelationship} relationship.NamedInsured             The named insured            
 * @property {EntityRelationship} relationship.NaturalBrother             The natural brother            
 * @property {EntityRelationship} relationship.NaturalChild             The natural child            
 * @property {EntityRelationship} relationship.NaturalDaughter             The natural daughter            
 * @property {EntityRelationship} relationship.NaturalFather             The natural father            
 * @property {EntityRelationship} relationship.NaturalFatherOfFetus             The natural father of fetus            
 * @property {EntityRelationship} relationship.NaturalMother             The natural mother            
 * @property {EntityRelationship} relationship.NaturalParent             The natural parent            
 * @property {EntityRelationship} relationship.NaturalSibling             The natural sibling            
 * @property {EntityRelationship} relationship.NaturalSister             The natural sister            
 * @property {EntityRelationship} relationship.NaturalSon             The natural son            
 * @property {EntityRelationship} relationship.Nephew             The nephew            
 * @property {EntityRelationship} relationship.NextOfKin             The next of kin            
 * @property {EntityRelationship} relationship.Niece             The niece            
 * @property {EntityRelationship} relationship.NieceNephew             The niece nephew            
 * @property {EntityRelationship} relationship.NotaryPublic             The notary public            
 * @property {EntityRelationship} relationship.OwnedEntity             The owned entity            
 * @property {EntityRelationship} relationship.Parent             The parent            
 * @property {EntityRelationship} relationship.ParentInlaw             The parent inlaw            
 * @property {EntityRelationship} relationship.Part             The part            
 * @property {EntityRelationship} relationship.PaternalAunt             The paternal aunt            
 * @property {EntityRelationship} relationship.PaternalCousin             The paternal cousin            
 * @property {EntityRelationship} relationship.PaternalGrandfather             The paternal grandfather            
 * @property {EntityRelationship} relationship.PaternalGrandmother             The paternal grandmother            
 * @property {EntityRelationship} relationship.PaternalGrandparent             The paternal grandparent            
 * @property {EntityRelationship} relationship.PaternalGreatgrandfather             The paternal greatgrandfather            
 * @property {EntityRelationship} relationship.PaternalGreatgrandmother             The paternal greatgrandmother            
 * @property {EntityRelationship} relationship.PaternalGreatgrandparent             The paternal greatgrandparent            
 * @property {EntityRelationship} relationship.PaternalUncle             The paternal uncle            
 * @property {EntityRelationship} relationship.Patient             The patient            
 * @property {EntityRelationship} relationship.Payee             The payee            
 * @property {EntityRelationship} relationship.PersonalRelationship             The personal relationship            
 * @property {EntityRelationship} relationship.PlaceOfDeath             The place of death            
 * @property {EntityRelationship} relationship.PolicyHolder             The policy holder            
 * @property {EntityRelationship} relationship.ProgramEligible             The program eligible            
 * @property {EntityRelationship} relationship.QualifiedEntity             The qualified entity            
 * @property {EntityRelationship} relationship.RegulatedProduct             The regulated product            
 * @property {EntityRelationship} relationship.ResearchSubject             The research subject            
 * @property {EntityRelationship} relationship.RetailedMaterial             The retailed material            
 * @property {EntityRelationship} relationship.Roomate             The roomate            
 * @property {EntityRelationship} relationship.ServiceDeliveryLocation             The service delivery location            
 * @property {EntityRelationship} relationship.Sibling             The sibling            
 * @property {EntityRelationship} relationship.SiblingInlaw             The sibling inlaw            
 * @property {EntityRelationship} relationship.SignificantOther             The significant other            
 * @property {EntityRelationship} relationship.SigningAuthorityOrOfficer             The signing authority or officer            
 * @property {EntityRelationship} relationship.Sister             The sister            
 * @property {EntityRelationship} relationship.Sisterinlaw             The sisterinlaw            
 * @property {EntityRelationship} relationship.Son             The son            
 * @property {EntityRelationship} relationship.SonInlaw             The son inlaw            
 * @property {EntityRelationship} relationship.Specimen             The specimen            
 * @property {EntityRelationship} relationship.Spouse             The spouse            
 * @property {EntityRelationship} relationship.Stepbrother             The stepbrother            
 * @property {EntityRelationship} relationship.StepChild             The step child            
 * @property {EntityRelationship} relationship.Stepdaughter             The stepdaughter            
 * @property {EntityRelationship} relationship.Stepfather             The stepfather            
 * @property {EntityRelationship} relationship.Stepmother             The stepmother            
 * @property {EntityRelationship} relationship.StepParent             The step parent            
 * @property {EntityRelationship} relationship.StepSibling             The step sibling            
 * @property {EntityRelationship} relationship.Stepsister             The stepsister            
 * @property {EntityRelationship} relationship.Stepson             The stepson            
 * @property {EntityRelationship} relationship.Student             The student            
 * @property {EntityRelationship} relationship.Subscriber             The subscriber            
 * @property {EntityRelationship} relationship.TerritoryOfAuthority             The territory of authority            
 * @property {EntityRelationship} relationship.TherapeuticAgent             The therapeutic agent            
 * @property {EntityRelationship} relationship.Uncle             The uncle            
 * @property {EntityRelationship} relationship.Underwriter             The underwriter            
 * @property {EntityRelationship} relationship.UsedEntity             The used entity            
 * @property {EntityRelationship} relationship.WarrantedProduct             The warranted product            
 * @property {EntityRelationship} relationship.Wife             The wife            
 * @property {EntityRelationship} relationship.Replaces             The replaces            
 * @property {EntityRelationship} relationship.Instance             The target entity represents an instance of the scoper entity            
 * @property {EntityRelationship} relationship.LocatedEntity             Relates the target entity to a source location            
 * @property {EntityRelationship} relationship.$other Unclassified
 * @property {Concept} statusConceptModel [Delay loaded from statusConcept],             Status concept id            
 * @property {string} statusConcept            Status concept id            (see: {@link StatusKeys} for values)
 * @property {object} tag            Gets a list of all tags associated with the entity            
 * @property {string} tag.classifier  where classifier is from {@link Tag} key
 * @property {object} telecom            Gets a list of all telecommunications addresses associated with the entity            
 * @property {EntityTelecomAddress} telecom.AnsweringService             answering service            
 * @property {EntityTelecomAddress} telecom.EmergencyContact             Emergency contact            
 * @property {EntityTelecomAddress} telecom.MobileContact             Mobile phone contact            
 * @property {EntityTelecomAddress} telecom.Pager             pager            
 * @property {EntityTelecomAddress} telecom.Public             public (800 number example) contact            
 * @property {EntityTelecomAddress} telecom.TemporaryAddress             temporary contact            
 * @property {EntityTelecomAddress} telecom.WorkPlace             For use in the workplace            
 * @property {EntityTelecomAddress} telecom.$other Unclassified
 * @property {string} template            Gets the template key            
 * @property {TemplateDefinition} templateModel [Delay loaded from template],             Gets or sets the template definition            
 * @property {Concept} typeConceptModel [Delay loaded from typeConcept],             Type concept identifier            
 * @property {string} typeConcept            Type concept identifier            
 * @property {string} previousVersion
 * @property {string} version
 * @property {number} sequence
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {Material} copyData Copy constructor (if present)
 */
function Material (copyData) { 
	this.$type = 'Material';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {number} */
	this.sequence = copyData.sequence;
	/** @type {string} */
	this.version = copyData.version;
	/** @type {string} */
	this.previousVersion = copyData.previousVersion;
	/** @type {string} */
	this.typeConcept = copyData.typeConcept;
	/** @type {Concept} */
	this.typeConceptModel = copyData.typeConceptModel;
	/** @type {TemplateDefinition} */
	this.templateModel = copyData.templateModel;
	/** @type {string} */
	this.template = copyData.template;
	/** @type {object} */
	this.telecom = copyData.telecom;
	/** @type {object} */
	this.tag = copyData.tag;
	/** @type {string} */
	this.statusConcept = copyData.statusConcept;
	/** @type {Concept} */
	this.statusConceptModel = copyData.statusConceptModel;
	/** @type {object} */
	this.relationship = copyData.relationship;
	/** @type {object} */
	this.participation = copyData.participation;
	/** @type {string} */
	this.note = copyData.note;
	/** @type {object} */
	this.name = copyData.name;
	/** @type {object} */
	this.identifier = copyData.identifier;
	/** @type {object} */
	this.extension = copyData.extension;
	/** @type {string} */
	this.determinerConcept = copyData.determinerConcept;
	/** @type {Concept} */
	this.determinerConceptModel = copyData.determinerConceptModel;
	/** @type {string} */
	this.creationAct = copyData.creationAct;
	/** @type {Act} */
	this.creationActModel = copyData.creationActModel;
	/** @type {string} */
	this.classConcept = copyData.classConcept;
	/** @type {Concept} */
	this.classConceptModel = copyData.classConceptModel;
	/** @type {object} */
	this.address = copyData.address;
	/** @type {string} */
	this.quantityConcept = copyData.quantityConcept;
	/** @type {Concept} */
	this.quantityConceptModel = copyData.quantityConceptModel;
	/** @type {number} */
	this.quantity = copyData.quantity;
	/** @type {boolean} */
	this.isAdministrative = copyData.isAdministrative;
	/** @type {string} */
	this.formConcept = copyData.formConcept;
	/** @type {Concept} */
	this.formConceptModel = copyData.formConceptModel;
	/** @type {Date} */
	this.expiryDate = copyData.expiryDate;
	}
}  // Material 
// SanteDB.Core.Model.Entities.Organization, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!Organization)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends Entity
 * @summary             Organization entity            
 * @property {Concept} industryConceptModel [Delay loaded from industryConcept],             Gets or sets the industry concept key            
 * @property {string} industryConcept            Gets or sets the concept key which classifies the industry in which the organization operates            
 * @property {object} address            Gets a list of all addresses associated with the entity            
 * @property {EntityAddress} address.Alphabetic             Represents an alphabetic address used for matching             
 * @property {EntityAddress} address.BadAddress             Represents a bad address, i.e. an address which is old or invalid.            
 * @property {EntityAddress} address.Direct             Represents a workplace address that reaches the person directly without intermediaries.            
 * @property {EntityAddress} address.HomeAddress             The home address            
 * @property {EntityAddress} address.Ideographic             Represents an address expressed in an ideographic manner (example: Kanji)            
 * @property {EntityAddress} address.Phonetic             Represents an address expressed as a phonetic spelling of an ideographic address            
 * @property {EntityAddress} address.PhysicalVisit             The address is a physical place where visits should occur            
 * @property {EntityAddress} address.PostalAddress             The address is a postal address used for the delivery of mail and materials            
 * @property {EntityAddress} address.PrimaryHome             Represents a primary address to reach a contact after business hours.            
 * @property {EntityAddress} address.Public             Represents an address that is a standard address that may be subject to a switchboard or operator prior to reaching the intended entity.            
 * @property {EntityAddress} address.Soundex             Represents an address used for soundex matching purposes.            
 * @property {EntityAddress} address.Syllabic             Represents a syllabic address.            
 * @property {EntityAddress} address.TemporaryAddress             Represents a temporary address that may be good for visiting or mailing.            
 * @property {EntityAddress} address.VacationHome             Represents a vacation home to reach a person while on vacation.            
 * @property {EntityAddress} address.WorkPlace             Represents an office address, should be used for business communications            
 * @property {EntityAddress} address.$other Unclassified
 * @property {Concept} classConceptModel [Delay loaded from classConcept],             Class concept datal load property            
 * @property {string} classConcept            Class concept            (see: {@link EntityClassKeys} for values)
 * @property {Act} creationActModel [Delay loaded from creationAct],             Creation act reference            
 * @property {string} creationAct            Creation act reference            
 * @property {Concept} determinerConceptModel [Delay loaded from determinerConcept],             Determiner concept            
 * @property {string} determinerConcept            Determiner concept            (see: {@link DeterminerKeys} for values)
 * @property {object} extension            Gets a list of all extensions associated with the entity            
 * @property {string} extension.classifier  where classifier is from {@link Extension} extensionType
 * @property {object} identifier            Gets the identifiers associated with this entity            
 * @property {EntityIdentifier} identifier.classifier  where classifier is from {@link IdentifierBase} authority
 * @property {object} name            Gets a list of all names associated with the entity            
 * @property {EntityName} name.Alphabetic             The name used is an alphabetic representation of the name (ex: romaji in Japanese)            
 * @property {EntityName} name.Anonymous             The name is an anonymous name for the object (not the real name but a name used for care delivery)            
 * @property {EntityName} name.Artist             The name represents an artist name or stage name            
 * @property {EntityName} name.Assigned             The name represents an assigned name (given or bestowed by an authority)            
 * @property {EntityName} name.Ideographic             THe name represents an ideographic representation of the name            
 * @property {EntityName} name.Indigenous             The name is an indigenous name or tribal name for the patient            
 * @property {EntityName} name.Legal             The name represents the current legal name of an object (such as a corporate name)            
 * @property {EntityName} name.License             The name represents a name as displayed on a license or known to a license authority            
 * @property {EntityName} name.MaidenName             THe name is a maiden name (name of a patient before marriage)            
 * @property {EntityName} name.OfficialRecord             The name as it appears on an official record            
 * @property {EntityName} name.Phonetic             The name represents a phonetic representation of a name such as a SOUNDEX code            
 * @property {EntityName} name.Pseudonym             The name is a pseudonym for the object or an synonym name            
 * @property {EntityName} name.Religious             The name is to be used for religious purposes (such as baptismal name)            
 * @property {EntityName} name.Search             The name is to be used in the performing of matches only            
 * @property {EntityName} name.Soundex             The name represents the computed soundex code of a name            
 * @property {EntityName} name.Syllabic             The name represents a syllabic name.            
 * @property {EntityName} name.$other Unclassified
 * @property {string} note            Gets a list of all notes associated with the entity            
 * @property {object} participation            Gets the acts in which this entity participates            
 * @property {ActParticipation} participation.Admitter             The player entity was the person who was responsible for admitting the patient into a facility or care scenario.            
 * @property {ActParticipation} participation.Attender             The player entity represents the attending physician for the patient            
 * @property {ActParticipation} participation.Authenticator             The player entity represents an entity which authenticates the provision of care            
 * @property {ActParticipation} participation.Authororiginator             The player entity is responsible for the creation of data described in the act            
 * @property {ActParticipation} participation.Baby             The player is a resultant person in that it was the baby             
 * @property {ActParticipation} participation.Beneficiary             The player is a beneficiary of the act such a receiver of a financial instrument, or other good            
 * @property {ActParticipation} participation.CallbackContact             The player entity represents something that should be contacted upon completion of the act            
 * @property {ActParticipation} participation.CausativeAgent             The player entity is an agent which caused the act to occur            
 * @property {ActParticipation} participation.Consultant             The player entity is acting as a consult to the carrying out of the act            
 * @property {ActParticipation} participation.Consumable             The player entity was or is to be consumed during the process of carrying out the act.            
 * @property {ActParticipation} participation.CoverageTarget             The player entity represents the target coverage entity of the act            
 * @property {ActParticipation} participation.Custodian             The player entity is the data custodian of the act (is responsible for storing and securing the act)            
 * @property {ActParticipation} participation.DataEnterer             The player entity represents the person or device which phisically entered the data at the terminal            
 * @property {ActParticipation} participation.Destination             The player etity represents the ultimate destination of the goods/materials/services described in the act            
 * @property {ActParticipation} participation.Device             The player entity represents the device on which the act or data from the act was acquired or recorded            
 * @property {ActParticipation} participation.DirectTarget             The player entity represents the directed target of care provided in the act            
 * @property {ActParticipation} participation.Discharger             The player entity represents the person who is responsible for the discharging of the patient from an encounter            
 * @property {ActParticipation} participation.Distributor             The player entity is the source distribution point for the financial or material instruments contained in the message            
 * @property {ActParticipation} participation.Donor             The player entity represents the donor of tissue or materials used in the act            
 * @property {ActParticipation} participation.EntryLocation             The location where the act was entered.            
 * @property {ActParticipation} participation.Escort             The player entity was responsible for escorting the patient during the course of the act            
 * @property {ActParticipation} participation.Exposure             The player entity something to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureAgent             The player entity represents the agent (material) to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureSource             The player entity describes the source of the material to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureTarget             The player entity describes the target to which the agent was exposed            
 * @property {ActParticipation} participation.GuarantorParty             The player represents a party which is used as a financial guarantor for payment in the carrying out of the act            
 * @property {ActParticipation} participation.Holder             The player is responsible for holding the act            
 * @property {ActParticipation} participation.IndirectTarget             The entity not directly present in the act but which will be the focust of th act.            
 * @property {ActParticipation} participation.Informant             The player was a person or device which informed data presented in the act. (Example: A mother telling a nurse that their child had a reaction)            
 * @property {ActParticipation} participation.InformationRecipient             The player entity represents something that should be cc'ed on the act            
 * @property {ActParticipation} participation.LegalAuthenticator             The player entity is responsible for legally authenticating the content of the act            
 * @property {ActParticipation} participation.Location             The location where the service was performed.            
 * @property {ActParticipation} participation.NonreuseableDevice             The player represents a consumable that can no longer be used            
 * @property {ActParticipation} participation.Origin             The player represents the origin of the act            
 * @property {ActParticipation} participation.Participation             The player entity participates in the act in no particular classification            
 * @property {ActParticipation} participation.Performer             The player entity is responsible for performing the clinical steps documented in the act            
 * @property {ActParticipation} participation.PrimaryInformationRecipient             The player entity represents a high priority contact which should be informed or cc'ed on the act            
 * @property {ActParticipation} participation.PrimaryPerformer             The player entity was the primary performer of the act. This is used in procedures where more than one performer is present            
 * @property {ActParticipation} participation.Product             The player represents a product that is not necessarily consumed but informs the act            
 * @property {ActParticipation} participation.Receiver             The player represents the entity which is the intended receiver of the act            
 * @property {ActParticipation} participation.RecordTarget             The player represents the entity to which the act is recorded against            
 * @property {ActParticipation} participation.ReferredBy             The player represents the entity which referred the act or caused the act to be undertaken            
 * @property {ActParticipation} participation.ReferredTo             The player entity represents the entity which was referred to            
 * @property {ActParticipation} participation.Referrer             The player entity represents the person who was originally the referrer.            
 * @property {ActParticipation} participation.Remote             The player entity represents a remote portion of the act            
 * @property {ActParticipation} participation.ResponsibleParty             The player entity is ultimately responsible for the carrying out of the act            
 * @property {ActParticipation} participation.ReusableDevice             The player entity represents a device which can be reused in future acts            
 * @property {ActParticipation} participation.SecondaryPerformer             The secondary performing person (support clinician).            
 * @property {ActParticipation} participation.Specimen             The player entity represents a specimen collected for the purpose of testing and diagnosis            
 * @property {ActParticipation} participation.Subject             The player entity is the subject of an act, but not necessarily the record target (meaning the act is about a particular entity but not to be attached to their record)            
 * @property {ActParticipation} participation.Tracker             The player entity is responsible for tracking the progress of the act            
 * @property {ActParticipation} participation.Transcriber             The person who transcribed data from the original act.            
 * @property {ActParticipation} participation.UgentNotificationContact             The player entity represents a contact entity in case of an emergency occurs during the act.            
 * @property {ActParticipation} participation.Verifier             The player entity was responsible for verifying the accuracy of the data in the act            
 * @property {ActParticipation} participation.Via             The player entity represents an entity where the act occurred "via" this entity (i.e. in transport)            
 * @property {ActParticipation} participation.Witness             The player entity represents a legal witness to the act occurring.            
 * @property {ActParticipation} participation.$other Unclassified
 * @property {object} relationship            Gets a list of all associated entities for this entity            
 * @property {EntityRelationship} relationship.Access             The access            
 * @property {EntityRelationship} relationship.ActiveMoiety             The active moiety            
 * @property {EntityRelationship} relationship.AdministerableMaterial             The administerable material            
 * @property {EntityRelationship} relationship.AdoptedChild             The adopted child            
 * @property {EntityRelationship} relationship.AdoptedDaughter             The adopted daughter            
 * @property {EntityRelationship} relationship.AdoptedSon             The adopted son            
 * @property {EntityRelationship} relationship.Affiliate             The affiliate            
 * @property {EntityRelationship} relationship.Agent             The agent            
 * @property {EntityRelationship} relationship.Aliquot             The aliquot            
 * @property {EntityRelationship} relationship.Assigned             The assigned            
 * @property {EntityRelationship} relationship.AssignedEntity             The assigned entity            
 * @property {EntityRelationship} relationship.Aunt             The aunt            
 * @property {EntityRelationship} relationship.Birthplace             The birthplace            
 * @property {EntityRelationship} relationship.Brother             The brother            
 * @property {EntityRelationship} relationship.Brotherinlaw             The brotherinlaw            
 * @property {EntityRelationship} relationship.Caregiver             The caregiver            
 * @property {EntityRelationship} relationship.CaseSubject             The case subject            
 * @property {EntityRelationship} relationship.Child             The child            
 * @property {EntityRelationship} relationship.ChildInlaw             The child inlaw            
 * @property {EntityRelationship} relationship.Citizen             The citizen            
 * @property {EntityRelationship} relationship.Claimant             The claimant            
 * @property {EntityRelationship} relationship.ClinicalResearchInvestigator             The clinical research investigator            
 * @property {EntityRelationship} relationship.ClinicalResearchSponsor             The clinical research sponsor            
 * @property {EntityRelationship} relationship.CommissioningParty             The commissioning party            
 * @property {EntityRelationship} relationship.Contact             The contact            
 * @property {EntityRelationship} relationship.Cousin             The cousin            
 * @property {EntityRelationship} relationship.CoverageSponsor             The coverage sponsor            
 * @property {EntityRelationship} relationship.CoveredParty             The covered party            
 * @property {EntityRelationship} relationship.Daughter             The daughter            
 * @property {EntityRelationship} relationship.DaughterInlaw             The daughter inlaw            
 * @property {EntityRelationship} relationship.DedicatedServiceDeliveryLocation             The dedicated service delivery location            
 * @property {EntityRelationship} relationship.Dependent             The dependent            
 * @property {EntityRelationship} relationship.DistributedMaterial             The distributed material            
 * @property {EntityRelationship} relationship.DomesticPartner             The domestic partner            
 * @property {EntityRelationship} relationship.EmergencyContact             The emergency contact            
 * @property {EntityRelationship} relationship.Employee             The employee            
 * @property {EntityRelationship} relationship.ExposedEntity             The exposed entity            
 * @property {EntityRelationship} relationship.FamilyMember             The family member            
 * @property {EntityRelationship} relationship.Father             The father            
 * @property {EntityRelationship} relationship.Fatherinlaw             The fatherinlaw            
 * @property {EntityRelationship} relationship.FosterChild             The foster child            
 * @property {EntityRelationship} relationship.FosterDaughter             The foster daughter            
 * @property {EntityRelationship} relationship.FosterSon             The foster son            
 * @property {EntityRelationship} relationship.Grandchild             The grandchild            
 * @property {EntityRelationship} relationship.Granddaughter             The granddaughter            
 * @property {EntityRelationship} relationship.Grandfather             The grandfather            
 * @property {EntityRelationship} relationship.Grandmother             The grandmother            
 * @property {EntityRelationship} relationship.Grandparent             The grandparent            
 * @property {EntityRelationship} relationship.Grandson             The grandson            
 * @property {EntityRelationship} relationship.GreatGrandfather             The great grandfather            
 * @property {EntityRelationship} relationship.GreatGrandmother             The great grandmother            
 * @property {EntityRelationship} relationship.GreatGrandparent             The great grandparent            
 * @property {EntityRelationship} relationship.Guarantor             The guarantor            
 * @property {EntityRelationship} relationship.GUARD             The guard            
 * @property {EntityRelationship} relationship.Guardian             The guardian            
 * @property {EntityRelationship} relationship.Halfbrother             The halfbrother            
 * @property {EntityRelationship} relationship.Halfsibling             The halfsibling            
 * @property {EntityRelationship} relationship.Halfsister             The halfsister            
 * @property {EntityRelationship} relationship.HealthcareProvider             The healthcare provider            
 * @property {EntityRelationship} relationship.HealthChart             The health chart            
 * @property {EntityRelationship} relationship.HeldEntity             The held entity            
 * @property {EntityRelationship} relationship.Husband             The husband            
 * @property {EntityRelationship} relationship.IdentifiedEntity             The identified entity            
 * @property {EntityRelationship} relationship.IncidentalServiceDeliveryLocation             The incidental service delivery location            
 * @property {EntityRelationship} relationship.Individual             The individual            
 * @property {EntityRelationship} relationship.InvestigationSubject             The investigation subject            
 * @property {EntityRelationship} relationship.InvoicePayor             The invoice payor            
 * @property {EntityRelationship} relationship.Isolate             The isolate            
 * @property {EntityRelationship} relationship.LicensedEntity             The licensed entity            
 * @property {EntityRelationship} relationship.MaintainedEntity             The maintained entity            
 * @property {EntityRelationship} relationship.ManufacturedProduct             The manufactured product            
 * @property {EntityRelationship} relationship.MaternalAunt             The maternal aunt            
 * @property {EntityRelationship} relationship.MaternalCousin             The maternal cousin            
 * @property {EntityRelationship} relationship.MaternalGrandfather             The maternal grandfather            
 * @property {EntityRelationship} relationship.MaternalGrandmother             The maternal grandmother            
 * @property {EntityRelationship} relationship.MaternalGrandparent             The maternal grandparent            
 * @property {EntityRelationship} relationship.MaternalGreatgrandfather             The maternal greatgrandfather            
 * @property {EntityRelationship} relationship.MaternalGreatgrandmother             The maternal greatgrandmother            
 * @property {EntityRelationship} relationship.MaternalGreatgrandparent             The maternal greatgrandparent            
 * @property {EntityRelationship} relationship.MaternalUncle             The maternal uncle            
 * @property {EntityRelationship} relationship.MilitaryPerson             The military person            
 * @property {EntityRelationship} relationship.Mother             The mother            
 * @property {EntityRelationship} relationship.Motherinlaw             The motherinlaw            
 * @property {EntityRelationship} relationship.NamedInsured             The named insured            
 * @property {EntityRelationship} relationship.NaturalBrother             The natural brother            
 * @property {EntityRelationship} relationship.NaturalChild             The natural child            
 * @property {EntityRelationship} relationship.NaturalDaughter             The natural daughter            
 * @property {EntityRelationship} relationship.NaturalFather             The natural father            
 * @property {EntityRelationship} relationship.NaturalFatherOfFetus             The natural father of fetus            
 * @property {EntityRelationship} relationship.NaturalMother             The natural mother            
 * @property {EntityRelationship} relationship.NaturalParent             The natural parent            
 * @property {EntityRelationship} relationship.NaturalSibling             The natural sibling            
 * @property {EntityRelationship} relationship.NaturalSister             The natural sister            
 * @property {EntityRelationship} relationship.NaturalSon             The natural son            
 * @property {EntityRelationship} relationship.Nephew             The nephew            
 * @property {EntityRelationship} relationship.NextOfKin             The next of kin            
 * @property {EntityRelationship} relationship.Niece             The niece            
 * @property {EntityRelationship} relationship.NieceNephew             The niece nephew            
 * @property {EntityRelationship} relationship.NotaryPublic             The notary public            
 * @property {EntityRelationship} relationship.OwnedEntity             The owned entity            
 * @property {EntityRelationship} relationship.Parent             The parent            
 * @property {EntityRelationship} relationship.ParentInlaw             The parent inlaw            
 * @property {EntityRelationship} relationship.Part             The part            
 * @property {EntityRelationship} relationship.PaternalAunt             The paternal aunt            
 * @property {EntityRelationship} relationship.PaternalCousin             The paternal cousin            
 * @property {EntityRelationship} relationship.PaternalGrandfather             The paternal grandfather            
 * @property {EntityRelationship} relationship.PaternalGrandmother             The paternal grandmother            
 * @property {EntityRelationship} relationship.PaternalGrandparent             The paternal grandparent            
 * @property {EntityRelationship} relationship.PaternalGreatgrandfather             The paternal greatgrandfather            
 * @property {EntityRelationship} relationship.PaternalGreatgrandmother             The paternal greatgrandmother            
 * @property {EntityRelationship} relationship.PaternalGreatgrandparent             The paternal greatgrandparent            
 * @property {EntityRelationship} relationship.PaternalUncle             The paternal uncle            
 * @property {EntityRelationship} relationship.Patient             The patient            
 * @property {EntityRelationship} relationship.Payee             The payee            
 * @property {EntityRelationship} relationship.PersonalRelationship             The personal relationship            
 * @property {EntityRelationship} relationship.PlaceOfDeath             The place of death            
 * @property {EntityRelationship} relationship.PolicyHolder             The policy holder            
 * @property {EntityRelationship} relationship.ProgramEligible             The program eligible            
 * @property {EntityRelationship} relationship.QualifiedEntity             The qualified entity            
 * @property {EntityRelationship} relationship.RegulatedProduct             The regulated product            
 * @property {EntityRelationship} relationship.ResearchSubject             The research subject            
 * @property {EntityRelationship} relationship.RetailedMaterial             The retailed material            
 * @property {EntityRelationship} relationship.Roomate             The roomate            
 * @property {EntityRelationship} relationship.ServiceDeliveryLocation             The service delivery location            
 * @property {EntityRelationship} relationship.Sibling             The sibling            
 * @property {EntityRelationship} relationship.SiblingInlaw             The sibling inlaw            
 * @property {EntityRelationship} relationship.SignificantOther             The significant other            
 * @property {EntityRelationship} relationship.SigningAuthorityOrOfficer             The signing authority or officer            
 * @property {EntityRelationship} relationship.Sister             The sister            
 * @property {EntityRelationship} relationship.Sisterinlaw             The sisterinlaw            
 * @property {EntityRelationship} relationship.Son             The son            
 * @property {EntityRelationship} relationship.SonInlaw             The son inlaw            
 * @property {EntityRelationship} relationship.Specimen             The specimen            
 * @property {EntityRelationship} relationship.Spouse             The spouse            
 * @property {EntityRelationship} relationship.Stepbrother             The stepbrother            
 * @property {EntityRelationship} relationship.StepChild             The step child            
 * @property {EntityRelationship} relationship.Stepdaughter             The stepdaughter            
 * @property {EntityRelationship} relationship.Stepfather             The stepfather            
 * @property {EntityRelationship} relationship.Stepmother             The stepmother            
 * @property {EntityRelationship} relationship.StepParent             The step parent            
 * @property {EntityRelationship} relationship.StepSibling             The step sibling            
 * @property {EntityRelationship} relationship.Stepsister             The stepsister            
 * @property {EntityRelationship} relationship.Stepson             The stepson            
 * @property {EntityRelationship} relationship.Student             The student            
 * @property {EntityRelationship} relationship.Subscriber             The subscriber            
 * @property {EntityRelationship} relationship.TerritoryOfAuthority             The territory of authority            
 * @property {EntityRelationship} relationship.TherapeuticAgent             The therapeutic agent            
 * @property {EntityRelationship} relationship.Uncle             The uncle            
 * @property {EntityRelationship} relationship.Underwriter             The underwriter            
 * @property {EntityRelationship} relationship.UsedEntity             The used entity            
 * @property {EntityRelationship} relationship.WarrantedProduct             The warranted product            
 * @property {EntityRelationship} relationship.Wife             The wife            
 * @property {EntityRelationship} relationship.Replaces             The replaces            
 * @property {EntityRelationship} relationship.Instance             The target entity represents an instance of the scoper entity            
 * @property {EntityRelationship} relationship.LocatedEntity             Relates the target entity to a source location            
 * @property {EntityRelationship} relationship.$other Unclassified
 * @property {Concept} statusConceptModel [Delay loaded from statusConcept],             Status concept id            
 * @property {string} statusConcept            Status concept id            (see: {@link StatusKeys} for values)
 * @property {object} tag            Gets a list of all tags associated with the entity            
 * @property {string} tag.classifier  where classifier is from {@link Tag} key
 * @property {object} telecom            Gets a list of all telecommunications addresses associated with the entity            
 * @property {EntityTelecomAddress} telecom.AnsweringService             answering service            
 * @property {EntityTelecomAddress} telecom.EmergencyContact             Emergency contact            
 * @property {EntityTelecomAddress} telecom.MobileContact             Mobile phone contact            
 * @property {EntityTelecomAddress} telecom.Pager             pager            
 * @property {EntityTelecomAddress} telecom.Public             public (800 number example) contact            
 * @property {EntityTelecomAddress} telecom.TemporaryAddress             temporary contact            
 * @property {EntityTelecomAddress} telecom.WorkPlace             For use in the workplace            
 * @property {EntityTelecomAddress} telecom.$other Unclassified
 * @property {string} template            Gets the template key            
 * @property {TemplateDefinition} templateModel [Delay loaded from template],             Gets or sets the template definition            
 * @property {Concept} typeConceptModel [Delay loaded from typeConcept],             Type concept identifier            
 * @property {string} typeConcept            Type concept identifier            
 * @property {string} previousVersion
 * @property {string} version
 * @property {number} sequence
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {Organization} copyData Copy constructor (if present)
 */
function Organization (copyData) { 
	this.$type = 'Organization';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {number} */
	this.sequence = copyData.sequence;
	/** @type {string} */
	this.version = copyData.version;
	/** @type {string} */
	this.previousVersion = copyData.previousVersion;
	/** @type {string} */
	this.typeConcept = copyData.typeConcept;
	/** @type {Concept} */
	this.typeConceptModel = copyData.typeConceptModel;
	/** @type {TemplateDefinition} */
	this.templateModel = copyData.templateModel;
	/** @type {string} */
	this.template = copyData.template;
	/** @type {object} */
	this.telecom = copyData.telecom;
	/** @type {object} */
	this.tag = copyData.tag;
	/** @type {string} */
	this.statusConcept = copyData.statusConcept;
	/** @type {Concept} */
	this.statusConceptModel = copyData.statusConceptModel;
	/** @type {object} */
	this.relationship = copyData.relationship;
	/** @type {object} */
	this.participation = copyData.participation;
	/** @type {string} */
	this.note = copyData.note;
	/** @type {object} */
	this.name = copyData.name;
	/** @type {object} */
	this.identifier = copyData.identifier;
	/** @type {object} */
	this.extension = copyData.extension;
	/** @type {string} */
	this.determinerConcept = copyData.determinerConcept;
	/** @type {Concept} */
	this.determinerConceptModel = copyData.determinerConceptModel;
	/** @type {string} */
	this.creationAct = copyData.creationAct;
	/** @type {Act} */
	this.creationActModel = copyData.creationActModel;
	/** @type {string} */
	this.classConcept = copyData.classConcept;
	/** @type {Concept} */
	this.classConceptModel = copyData.classConceptModel;
	/** @type {object} */
	this.address = copyData.address;
	/** @type {string} */
	this.industryConcept = copyData.industryConcept;
	/** @type {Concept} */
	this.industryConceptModel = copyData.industryConceptModel;
	}
}  // Organization 
// SanteDB.Core.Model.Entities.Person, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!Person)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends Entity
 * @summary             Represents an entity which is a person            
 * @property {DatePrecision} dateOfBirthPrecision            Gets or sets the precision ofthe date of birth            (see: {@link DatePrecision} for values)
 * @property {string} dateOfBirth            Gets the date of birth as XML            
 * @property {PersonLanguageCommunication} language            Gets the person's languages of communication            
 * @property {object} address            Gets a list of all addresses associated with the entity            
 * @property {EntityAddress} address.Alphabetic             Represents an alphabetic address used for matching             
 * @property {EntityAddress} address.BadAddress             Represents a bad address, i.e. an address which is old or invalid.            
 * @property {EntityAddress} address.Direct             Represents a workplace address that reaches the person directly without intermediaries.            
 * @property {EntityAddress} address.HomeAddress             The home address            
 * @property {EntityAddress} address.Ideographic             Represents an address expressed in an ideographic manner (example: Kanji)            
 * @property {EntityAddress} address.Phonetic             Represents an address expressed as a phonetic spelling of an ideographic address            
 * @property {EntityAddress} address.PhysicalVisit             The address is a physical place where visits should occur            
 * @property {EntityAddress} address.PostalAddress             The address is a postal address used for the delivery of mail and materials            
 * @property {EntityAddress} address.PrimaryHome             Represents a primary address to reach a contact after business hours.            
 * @property {EntityAddress} address.Public             Represents an address that is a standard address that may be subject to a switchboard or operator prior to reaching the intended entity.            
 * @property {EntityAddress} address.Soundex             Represents an address used for soundex matching purposes.            
 * @property {EntityAddress} address.Syllabic             Represents a syllabic address.            
 * @property {EntityAddress} address.TemporaryAddress             Represents a temporary address that may be good for visiting or mailing.            
 * @property {EntityAddress} address.VacationHome             Represents a vacation home to reach a person while on vacation.            
 * @property {EntityAddress} address.WorkPlace             Represents an office address, should be used for business communications            
 * @property {EntityAddress} address.$other Unclassified
 * @property {Concept} classConceptModel [Delay loaded from classConcept],             Class concept datal load property            
 * @property {string} classConcept            Class concept            (see: {@link EntityClassKeys} for values)
 * @property {Act} creationActModel [Delay loaded from creationAct],             Creation act reference            
 * @property {string} creationAct            Creation act reference            
 * @property {Concept} determinerConceptModel [Delay loaded from determinerConcept],             Determiner concept            
 * @property {string} determinerConcept            Determiner concept            (see: {@link DeterminerKeys} for values)
 * @property {object} extension            Gets a list of all extensions associated with the entity            
 * @property {string} extension.classifier  where classifier is from {@link Extension} extensionType
 * @property {object} identifier            Gets the identifiers associated with this entity            
 * @property {EntityIdentifier} identifier.classifier  where classifier is from {@link IdentifierBase} authority
 * @property {object} name            Gets a list of all names associated with the entity            
 * @property {EntityName} name.Alphabetic             The name used is an alphabetic representation of the name (ex: romaji in Japanese)            
 * @property {EntityName} name.Anonymous             The name is an anonymous name for the object (not the real name but a name used for care delivery)            
 * @property {EntityName} name.Artist             The name represents an artist name or stage name            
 * @property {EntityName} name.Assigned             The name represents an assigned name (given or bestowed by an authority)            
 * @property {EntityName} name.Ideographic             THe name represents an ideographic representation of the name            
 * @property {EntityName} name.Indigenous             The name is an indigenous name or tribal name for the patient            
 * @property {EntityName} name.Legal             The name represents the current legal name of an object (such as a corporate name)            
 * @property {EntityName} name.License             The name represents a name as displayed on a license or known to a license authority            
 * @property {EntityName} name.MaidenName             THe name is a maiden name (name of a patient before marriage)            
 * @property {EntityName} name.OfficialRecord             The name as it appears on an official record            
 * @property {EntityName} name.Phonetic             The name represents a phonetic representation of a name such as a SOUNDEX code            
 * @property {EntityName} name.Pseudonym             The name is a pseudonym for the object or an synonym name            
 * @property {EntityName} name.Religious             The name is to be used for religious purposes (such as baptismal name)            
 * @property {EntityName} name.Search             The name is to be used in the performing of matches only            
 * @property {EntityName} name.Soundex             The name represents the computed soundex code of a name            
 * @property {EntityName} name.Syllabic             The name represents a syllabic name.            
 * @property {EntityName} name.$other Unclassified
 * @property {string} note            Gets a list of all notes associated with the entity            
 * @property {object} participation            Gets the acts in which this entity participates            
 * @property {ActParticipation} participation.Admitter             The player entity was the person who was responsible for admitting the patient into a facility or care scenario.            
 * @property {ActParticipation} participation.Attender             The player entity represents the attending physician for the patient            
 * @property {ActParticipation} participation.Authenticator             The player entity represents an entity which authenticates the provision of care            
 * @property {ActParticipation} participation.Authororiginator             The player entity is responsible for the creation of data described in the act            
 * @property {ActParticipation} participation.Baby             The player is a resultant person in that it was the baby             
 * @property {ActParticipation} participation.Beneficiary             The player is a beneficiary of the act such a receiver of a financial instrument, or other good            
 * @property {ActParticipation} participation.CallbackContact             The player entity represents something that should be contacted upon completion of the act            
 * @property {ActParticipation} participation.CausativeAgent             The player entity is an agent which caused the act to occur            
 * @property {ActParticipation} participation.Consultant             The player entity is acting as a consult to the carrying out of the act            
 * @property {ActParticipation} participation.Consumable             The player entity was or is to be consumed during the process of carrying out the act.            
 * @property {ActParticipation} participation.CoverageTarget             The player entity represents the target coverage entity of the act            
 * @property {ActParticipation} participation.Custodian             The player entity is the data custodian of the act (is responsible for storing and securing the act)            
 * @property {ActParticipation} participation.DataEnterer             The player entity represents the person or device which phisically entered the data at the terminal            
 * @property {ActParticipation} participation.Destination             The player etity represents the ultimate destination of the goods/materials/services described in the act            
 * @property {ActParticipation} participation.Device             The player entity represents the device on which the act or data from the act was acquired or recorded            
 * @property {ActParticipation} participation.DirectTarget             The player entity represents the directed target of care provided in the act            
 * @property {ActParticipation} participation.Discharger             The player entity represents the person who is responsible for the discharging of the patient from an encounter            
 * @property {ActParticipation} participation.Distributor             The player entity is the source distribution point for the financial or material instruments contained in the message            
 * @property {ActParticipation} participation.Donor             The player entity represents the donor of tissue or materials used in the act            
 * @property {ActParticipation} participation.EntryLocation             The location where the act was entered.            
 * @property {ActParticipation} participation.Escort             The player entity was responsible for escorting the patient during the course of the act            
 * @property {ActParticipation} participation.Exposure             The player entity something to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureAgent             The player entity represents the agent (material) to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureSource             The player entity describes the source of the material to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureTarget             The player entity describes the target to which the agent was exposed            
 * @property {ActParticipation} participation.GuarantorParty             The player represents a party which is used as a financial guarantor for payment in the carrying out of the act            
 * @property {ActParticipation} participation.Holder             The player is responsible for holding the act            
 * @property {ActParticipation} participation.IndirectTarget             The entity not directly present in the act but which will be the focust of th act.            
 * @property {ActParticipation} participation.Informant             The player was a person or device which informed data presented in the act. (Example: A mother telling a nurse that their child had a reaction)            
 * @property {ActParticipation} participation.InformationRecipient             The player entity represents something that should be cc'ed on the act            
 * @property {ActParticipation} participation.LegalAuthenticator             The player entity is responsible for legally authenticating the content of the act            
 * @property {ActParticipation} participation.Location             The location where the service was performed.            
 * @property {ActParticipation} participation.NonreuseableDevice             The player represents a consumable that can no longer be used            
 * @property {ActParticipation} participation.Origin             The player represents the origin of the act            
 * @property {ActParticipation} participation.Participation             The player entity participates in the act in no particular classification            
 * @property {ActParticipation} participation.Performer             The player entity is responsible for performing the clinical steps documented in the act            
 * @property {ActParticipation} participation.PrimaryInformationRecipient             The player entity represents a high priority contact which should be informed or cc'ed on the act            
 * @property {ActParticipation} participation.PrimaryPerformer             The player entity was the primary performer of the act. This is used in procedures where more than one performer is present            
 * @property {ActParticipation} participation.Product             The player represents a product that is not necessarily consumed but informs the act            
 * @property {ActParticipation} participation.Receiver             The player represents the entity which is the intended receiver of the act            
 * @property {ActParticipation} participation.RecordTarget             The player represents the entity to which the act is recorded against            
 * @property {ActParticipation} participation.ReferredBy             The player represents the entity which referred the act or caused the act to be undertaken            
 * @property {ActParticipation} participation.ReferredTo             The player entity represents the entity which was referred to            
 * @property {ActParticipation} participation.Referrer             The player entity represents the person who was originally the referrer.            
 * @property {ActParticipation} participation.Remote             The player entity represents a remote portion of the act            
 * @property {ActParticipation} participation.ResponsibleParty             The player entity is ultimately responsible for the carrying out of the act            
 * @property {ActParticipation} participation.ReusableDevice             The player entity represents a device which can be reused in future acts            
 * @property {ActParticipation} participation.SecondaryPerformer             The secondary performing person (support clinician).            
 * @property {ActParticipation} participation.Specimen             The player entity represents a specimen collected for the purpose of testing and diagnosis            
 * @property {ActParticipation} participation.Subject             The player entity is the subject of an act, but not necessarily the record target (meaning the act is about a particular entity but not to be attached to their record)            
 * @property {ActParticipation} participation.Tracker             The player entity is responsible for tracking the progress of the act            
 * @property {ActParticipation} participation.Transcriber             The person who transcribed data from the original act.            
 * @property {ActParticipation} participation.UgentNotificationContact             The player entity represents a contact entity in case of an emergency occurs during the act.            
 * @property {ActParticipation} participation.Verifier             The player entity was responsible for verifying the accuracy of the data in the act            
 * @property {ActParticipation} participation.Via             The player entity represents an entity where the act occurred "via" this entity (i.e. in transport)            
 * @property {ActParticipation} participation.Witness             The player entity represents a legal witness to the act occurring.            
 * @property {ActParticipation} participation.$other Unclassified
 * @property {object} relationship            Gets a list of all associated entities for this entity            
 * @property {EntityRelationship} relationship.Access             The access            
 * @property {EntityRelationship} relationship.ActiveMoiety             The active moiety            
 * @property {EntityRelationship} relationship.AdministerableMaterial             The administerable material            
 * @property {EntityRelationship} relationship.AdoptedChild             The adopted child            
 * @property {EntityRelationship} relationship.AdoptedDaughter             The adopted daughter            
 * @property {EntityRelationship} relationship.AdoptedSon             The adopted son            
 * @property {EntityRelationship} relationship.Affiliate             The affiliate            
 * @property {EntityRelationship} relationship.Agent             The agent            
 * @property {EntityRelationship} relationship.Aliquot             The aliquot            
 * @property {EntityRelationship} relationship.Assigned             The assigned            
 * @property {EntityRelationship} relationship.AssignedEntity             The assigned entity            
 * @property {EntityRelationship} relationship.Aunt             The aunt            
 * @property {EntityRelationship} relationship.Birthplace             The birthplace            
 * @property {EntityRelationship} relationship.Brother             The brother            
 * @property {EntityRelationship} relationship.Brotherinlaw             The brotherinlaw            
 * @property {EntityRelationship} relationship.Caregiver             The caregiver            
 * @property {EntityRelationship} relationship.CaseSubject             The case subject            
 * @property {EntityRelationship} relationship.Child             The child            
 * @property {EntityRelationship} relationship.ChildInlaw             The child inlaw            
 * @property {EntityRelationship} relationship.Citizen             The citizen            
 * @property {EntityRelationship} relationship.Claimant             The claimant            
 * @property {EntityRelationship} relationship.ClinicalResearchInvestigator             The clinical research investigator            
 * @property {EntityRelationship} relationship.ClinicalResearchSponsor             The clinical research sponsor            
 * @property {EntityRelationship} relationship.CommissioningParty             The commissioning party            
 * @property {EntityRelationship} relationship.Contact             The contact            
 * @property {EntityRelationship} relationship.Cousin             The cousin            
 * @property {EntityRelationship} relationship.CoverageSponsor             The coverage sponsor            
 * @property {EntityRelationship} relationship.CoveredParty             The covered party            
 * @property {EntityRelationship} relationship.Daughter             The daughter            
 * @property {EntityRelationship} relationship.DaughterInlaw             The daughter inlaw            
 * @property {EntityRelationship} relationship.DedicatedServiceDeliveryLocation             The dedicated service delivery location            
 * @property {EntityRelationship} relationship.Dependent             The dependent            
 * @property {EntityRelationship} relationship.DistributedMaterial             The distributed material            
 * @property {EntityRelationship} relationship.DomesticPartner             The domestic partner            
 * @property {EntityRelationship} relationship.EmergencyContact             The emergency contact            
 * @property {EntityRelationship} relationship.Employee             The employee            
 * @property {EntityRelationship} relationship.ExposedEntity             The exposed entity            
 * @property {EntityRelationship} relationship.FamilyMember             The family member            
 * @property {EntityRelationship} relationship.Father             The father            
 * @property {EntityRelationship} relationship.Fatherinlaw             The fatherinlaw            
 * @property {EntityRelationship} relationship.FosterChild             The foster child            
 * @property {EntityRelationship} relationship.FosterDaughter             The foster daughter            
 * @property {EntityRelationship} relationship.FosterSon             The foster son            
 * @property {EntityRelationship} relationship.Grandchild             The grandchild            
 * @property {EntityRelationship} relationship.Granddaughter             The granddaughter            
 * @property {EntityRelationship} relationship.Grandfather             The grandfather            
 * @property {EntityRelationship} relationship.Grandmother             The grandmother            
 * @property {EntityRelationship} relationship.Grandparent             The grandparent            
 * @property {EntityRelationship} relationship.Grandson             The grandson            
 * @property {EntityRelationship} relationship.GreatGrandfather             The great grandfather            
 * @property {EntityRelationship} relationship.GreatGrandmother             The great grandmother            
 * @property {EntityRelationship} relationship.GreatGrandparent             The great grandparent            
 * @property {EntityRelationship} relationship.Guarantor             The guarantor            
 * @property {EntityRelationship} relationship.GUARD             The guard            
 * @property {EntityRelationship} relationship.Guardian             The guardian            
 * @property {EntityRelationship} relationship.Halfbrother             The halfbrother            
 * @property {EntityRelationship} relationship.Halfsibling             The halfsibling            
 * @property {EntityRelationship} relationship.Halfsister             The halfsister            
 * @property {EntityRelationship} relationship.HealthcareProvider             The healthcare provider            
 * @property {EntityRelationship} relationship.HealthChart             The health chart            
 * @property {EntityRelationship} relationship.HeldEntity             The held entity            
 * @property {EntityRelationship} relationship.Husband             The husband            
 * @property {EntityRelationship} relationship.IdentifiedEntity             The identified entity            
 * @property {EntityRelationship} relationship.IncidentalServiceDeliveryLocation             The incidental service delivery location            
 * @property {EntityRelationship} relationship.Individual             The individual            
 * @property {EntityRelationship} relationship.InvestigationSubject             The investigation subject            
 * @property {EntityRelationship} relationship.InvoicePayor             The invoice payor            
 * @property {EntityRelationship} relationship.Isolate             The isolate            
 * @property {EntityRelationship} relationship.LicensedEntity             The licensed entity            
 * @property {EntityRelationship} relationship.MaintainedEntity             The maintained entity            
 * @property {EntityRelationship} relationship.ManufacturedProduct             The manufactured product            
 * @property {EntityRelationship} relationship.MaternalAunt             The maternal aunt            
 * @property {EntityRelationship} relationship.MaternalCousin             The maternal cousin            
 * @property {EntityRelationship} relationship.MaternalGrandfather             The maternal grandfather            
 * @property {EntityRelationship} relationship.MaternalGrandmother             The maternal grandmother            
 * @property {EntityRelationship} relationship.MaternalGrandparent             The maternal grandparent            
 * @property {EntityRelationship} relationship.MaternalGreatgrandfather             The maternal greatgrandfather            
 * @property {EntityRelationship} relationship.MaternalGreatgrandmother             The maternal greatgrandmother            
 * @property {EntityRelationship} relationship.MaternalGreatgrandparent             The maternal greatgrandparent            
 * @property {EntityRelationship} relationship.MaternalUncle             The maternal uncle            
 * @property {EntityRelationship} relationship.MilitaryPerson             The military person            
 * @property {EntityRelationship} relationship.Mother             The mother            
 * @property {EntityRelationship} relationship.Motherinlaw             The motherinlaw            
 * @property {EntityRelationship} relationship.NamedInsured             The named insured            
 * @property {EntityRelationship} relationship.NaturalBrother             The natural brother            
 * @property {EntityRelationship} relationship.NaturalChild             The natural child            
 * @property {EntityRelationship} relationship.NaturalDaughter             The natural daughter            
 * @property {EntityRelationship} relationship.NaturalFather             The natural father            
 * @property {EntityRelationship} relationship.NaturalFatherOfFetus             The natural father of fetus            
 * @property {EntityRelationship} relationship.NaturalMother             The natural mother            
 * @property {EntityRelationship} relationship.NaturalParent             The natural parent            
 * @property {EntityRelationship} relationship.NaturalSibling             The natural sibling            
 * @property {EntityRelationship} relationship.NaturalSister             The natural sister            
 * @property {EntityRelationship} relationship.NaturalSon             The natural son            
 * @property {EntityRelationship} relationship.Nephew             The nephew            
 * @property {EntityRelationship} relationship.NextOfKin             The next of kin            
 * @property {EntityRelationship} relationship.Niece             The niece            
 * @property {EntityRelationship} relationship.NieceNephew             The niece nephew            
 * @property {EntityRelationship} relationship.NotaryPublic             The notary public            
 * @property {EntityRelationship} relationship.OwnedEntity             The owned entity            
 * @property {EntityRelationship} relationship.Parent             The parent            
 * @property {EntityRelationship} relationship.ParentInlaw             The parent inlaw            
 * @property {EntityRelationship} relationship.Part             The part            
 * @property {EntityRelationship} relationship.PaternalAunt             The paternal aunt            
 * @property {EntityRelationship} relationship.PaternalCousin             The paternal cousin            
 * @property {EntityRelationship} relationship.PaternalGrandfather             The paternal grandfather            
 * @property {EntityRelationship} relationship.PaternalGrandmother             The paternal grandmother            
 * @property {EntityRelationship} relationship.PaternalGrandparent             The paternal grandparent            
 * @property {EntityRelationship} relationship.PaternalGreatgrandfather             The paternal greatgrandfather            
 * @property {EntityRelationship} relationship.PaternalGreatgrandmother             The paternal greatgrandmother            
 * @property {EntityRelationship} relationship.PaternalGreatgrandparent             The paternal greatgrandparent            
 * @property {EntityRelationship} relationship.PaternalUncle             The paternal uncle            
 * @property {EntityRelationship} relationship.Patient             The patient            
 * @property {EntityRelationship} relationship.Payee             The payee            
 * @property {EntityRelationship} relationship.PersonalRelationship             The personal relationship            
 * @property {EntityRelationship} relationship.PlaceOfDeath             The place of death            
 * @property {EntityRelationship} relationship.PolicyHolder             The policy holder            
 * @property {EntityRelationship} relationship.ProgramEligible             The program eligible            
 * @property {EntityRelationship} relationship.QualifiedEntity             The qualified entity            
 * @property {EntityRelationship} relationship.RegulatedProduct             The regulated product            
 * @property {EntityRelationship} relationship.ResearchSubject             The research subject            
 * @property {EntityRelationship} relationship.RetailedMaterial             The retailed material            
 * @property {EntityRelationship} relationship.Roomate             The roomate            
 * @property {EntityRelationship} relationship.ServiceDeliveryLocation             The service delivery location            
 * @property {EntityRelationship} relationship.Sibling             The sibling            
 * @property {EntityRelationship} relationship.SiblingInlaw             The sibling inlaw            
 * @property {EntityRelationship} relationship.SignificantOther             The significant other            
 * @property {EntityRelationship} relationship.SigningAuthorityOrOfficer             The signing authority or officer            
 * @property {EntityRelationship} relationship.Sister             The sister            
 * @property {EntityRelationship} relationship.Sisterinlaw             The sisterinlaw            
 * @property {EntityRelationship} relationship.Son             The son            
 * @property {EntityRelationship} relationship.SonInlaw             The son inlaw            
 * @property {EntityRelationship} relationship.Specimen             The specimen            
 * @property {EntityRelationship} relationship.Spouse             The spouse            
 * @property {EntityRelationship} relationship.Stepbrother             The stepbrother            
 * @property {EntityRelationship} relationship.StepChild             The step child            
 * @property {EntityRelationship} relationship.Stepdaughter             The stepdaughter            
 * @property {EntityRelationship} relationship.Stepfather             The stepfather            
 * @property {EntityRelationship} relationship.Stepmother             The stepmother            
 * @property {EntityRelationship} relationship.StepParent             The step parent            
 * @property {EntityRelationship} relationship.StepSibling             The step sibling            
 * @property {EntityRelationship} relationship.Stepsister             The stepsister            
 * @property {EntityRelationship} relationship.Stepson             The stepson            
 * @property {EntityRelationship} relationship.Student             The student            
 * @property {EntityRelationship} relationship.Subscriber             The subscriber            
 * @property {EntityRelationship} relationship.TerritoryOfAuthority             The territory of authority            
 * @property {EntityRelationship} relationship.TherapeuticAgent             The therapeutic agent            
 * @property {EntityRelationship} relationship.Uncle             The uncle            
 * @property {EntityRelationship} relationship.Underwriter             The underwriter            
 * @property {EntityRelationship} relationship.UsedEntity             The used entity            
 * @property {EntityRelationship} relationship.WarrantedProduct             The warranted product            
 * @property {EntityRelationship} relationship.Wife             The wife            
 * @property {EntityRelationship} relationship.Replaces             The replaces            
 * @property {EntityRelationship} relationship.Instance             The target entity represents an instance of the scoper entity            
 * @property {EntityRelationship} relationship.LocatedEntity             Relates the target entity to a source location            
 * @property {EntityRelationship} relationship.$other Unclassified
 * @property {Concept} statusConceptModel [Delay loaded from statusConcept],             Status concept id            
 * @property {string} statusConcept            Status concept id            (see: {@link StatusKeys} for values)
 * @property {object} tag            Gets a list of all tags associated with the entity            
 * @property {string} tag.classifier  where classifier is from {@link Tag} key
 * @property {object} telecom            Gets a list of all telecommunications addresses associated with the entity            
 * @property {EntityTelecomAddress} telecom.AnsweringService             answering service            
 * @property {EntityTelecomAddress} telecom.EmergencyContact             Emergency contact            
 * @property {EntityTelecomAddress} telecom.MobileContact             Mobile phone contact            
 * @property {EntityTelecomAddress} telecom.Pager             pager            
 * @property {EntityTelecomAddress} telecom.Public             public (800 number example) contact            
 * @property {EntityTelecomAddress} telecom.TemporaryAddress             temporary contact            
 * @property {EntityTelecomAddress} telecom.WorkPlace             For use in the workplace            
 * @property {EntityTelecomAddress} telecom.$other Unclassified
 * @property {string} template            Gets the template key            
 * @property {TemplateDefinition} templateModel [Delay loaded from template],             Gets or sets the template definition            
 * @property {Concept} typeConceptModel [Delay loaded from typeConcept],             Type concept identifier            
 * @property {string} typeConcept            Type concept identifier            
 * @property {string} previousVersion
 * @property {string} version
 * @property {number} sequence
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {Person} copyData Copy constructor (if present)
 */
function Person (copyData) { 
	this.$type = 'Person';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {number} */
	this.sequence = copyData.sequence;
	/** @type {string} */
	this.version = copyData.version;
	/** @type {string} */
	this.previousVersion = copyData.previousVersion;
	/** @type {string} */
	this.typeConcept = copyData.typeConcept;
	/** @type {Concept} */
	this.typeConceptModel = copyData.typeConceptModel;
	/** @type {TemplateDefinition} */
	this.templateModel = copyData.templateModel;
	/** @type {string} */
	this.template = copyData.template;
	/** @type {object} */
	this.telecom = copyData.telecom;
	/** @type {object} */
	this.tag = copyData.tag;
	/** @type {string} */
	this.statusConcept = copyData.statusConcept;
	/** @type {Concept} */
	this.statusConceptModel = copyData.statusConceptModel;
	/** @type {object} */
	this.relationship = copyData.relationship;
	/** @type {object} */
	this.participation = copyData.participation;
	/** @type {string} */
	this.note = copyData.note;
	/** @type {object} */
	this.name = copyData.name;
	/** @type {object} */
	this.identifier = copyData.identifier;
	/** @type {object} */
	this.extension = copyData.extension;
	/** @type {string} */
	this.determinerConcept = copyData.determinerConcept;
	/** @type {Concept} */
	this.determinerConceptModel = copyData.determinerConceptModel;
	/** @type {string} */
	this.creationAct = copyData.creationAct;
	/** @type {Act} */
	this.creationActModel = copyData.creationActModel;
	/** @type {string} */
	this.classConcept = copyData.classConcept;
	/** @type {Concept} */
	this.classConceptModel = copyData.classConceptModel;
	/** @type {object} */
	this.address = copyData.address;
	/** @type {PersonLanguageCommunication} */
	this.language = copyData.language;
	/** @type {string} */
	this.dateOfBirth = copyData.dateOfBirth;
	/** @type {DatePrecision} */
	this.dateOfBirthPrecision = copyData.dateOfBirthPrecision;
	}
}  // Person 
// SanteDB.Core.Model.Entities.PersonLanguageCommunication, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!PersonLanguageCommunication)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents a single preferred communication method for the entity            
 * @property {boolean} isPreferred            Gets or set the user's preference indicator            
 * @property {string} languageCode            Gets or sets the language code            
 * @property {number} effectiveVersionSequence
 * @property {number} obsoleteVersionSequence
 * @property {Date} modifiedOn
 * @property {string} source
 * @property {Entity} sourceModel [Delay loaded from source], 
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {PersonLanguageCommunication} copyData Copy constructor (if present)
 */
function PersonLanguageCommunication (copyData) { 
	this.$type = 'PersonLanguageCommunication';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {Entity} */
	this.sourceModel = copyData.sourceModel;
	/** @type {string} */
	this.source = copyData.source;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {number} */
	this.obsoleteVersionSequence = copyData.obsoleteVersionSequence;
	/** @type {number} */
	this.effectiveVersionSequence = copyData.effectiveVersionSequence;
	/** @type {string} */
	this.languageCode = copyData.languageCode;
	/** @type {boolean} */
	this.isPreferred = copyData.isPreferred;
	}
}  // PersonLanguageCommunication 
// SanteDB.Core.Model.Entities.Place, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!Place)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends Entity
 * @summary             An entity which is a place where healthcare services are delivered            
 * @property {string} classConcept            Gets or sets the class concept key            (see: {@link EntityClassKeys} for values)
 * @property {boolean} isMobile            True if location is mobile            
 * @property {Double} lat            Gets or sets the latitude            
 * @property {Double} lng            Gets or sets the longitude            
 * @property {PlaceService} service            Gets the services            
 * @property {object} address            Gets a list of all addresses associated with the entity            
 * @property {EntityAddress} address.Alphabetic             Represents an alphabetic address used for matching             
 * @property {EntityAddress} address.BadAddress             Represents a bad address, i.e. an address which is old or invalid.            
 * @property {EntityAddress} address.Direct             Represents a workplace address that reaches the person directly without intermediaries.            
 * @property {EntityAddress} address.HomeAddress             The home address            
 * @property {EntityAddress} address.Ideographic             Represents an address expressed in an ideographic manner (example: Kanji)            
 * @property {EntityAddress} address.Phonetic             Represents an address expressed as a phonetic spelling of an ideographic address            
 * @property {EntityAddress} address.PhysicalVisit             The address is a physical place where visits should occur            
 * @property {EntityAddress} address.PostalAddress             The address is a postal address used for the delivery of mail and materials            
 * @property {EntityAddress} address.PrimaryHome             Represents a primary address to reach a contact after business hours.            
 * @property {EntityAddress} address.Public             Represents an address that is a standard address that may be subject to a switchboard or operator prior to reaching the intended entity.            
 * @property {EntityAddress} address.Soundex             Represents an address used for soundex matching purposes.            
 * @property {EntityAddress} address.Syllabic             Represents a syllabic address.            
 * @property {EntityAddress} address.TemporaryAddress             Represents a temporary address that may be good for visiting or mailing.            
 * @property {EntityAddress} address.VacationHome             Represents a vacation home to reach a person while on vacation.            
 * @property {EntityAddress} address.WorkPlace             Represents an office address, should be used for business communications            
 * @property {EntityAddress} address.$other Unclassified
 * @property {Concept} classConceptModel [Delay loaded from classConcept],             Class concept datal load property            
 * @property {Act} creationActModel [Delay loaded from creationAct],             Creation act reference            
 * @property {string} creationAct            Creation act reference            
 * @property {Concept} determinerConceptModel [Delay loaded from determinerConcept],             Determiner concept            
 * @property {string} determinerConcept            Determiner concept            (see: {@link DeterminerKeys} for values)
 * @property {object} extension            Gets a list of all extensions associated with the entity            
 * @property {string} extension.classifier  where classifier is from {@link Extension} extensionType
 * @property {object} identifier            Gets the identifiers associated with this entity            
 * @property {EntityIdentifier} identifier.classifier  where classifier is from {@link IdentifierBase} authority
 * @property {object} name            Gets a list of all names associated with the entity            
 * @property {EntityName} name.Alphabetic             The name used is an alphabetic representation of the name (ex: romaji in Japanese)            
 * @property {EntityName} name.Anonymous             The name is an anonymous name for the object (not the real name but a name used for care delivery)            
 * @property {EntityName} name.Artist             The name represents an artist name or stage name            
 * @property {EntityName} name.Assigned             The name represents an assigned name (given or bestowed by an authority)            
 * @property {EntityName} name.Ideographic             THe name represents an ideographic representation of the name            
 * @property {EntityName} name.Indigenous             The name is an indigenous name or tribal name for the patient            
 * @property {EntityName} name.Legal             The name represents the current legal name of an object (such as a corporate name)            
 * @property {EntityName} name.License             The name represents a name as displayed on a license or known to a license authority            
 * @property {EntityName} name.MaidenName             THe name is a maiden name (name of a patient before marriage)            
 * @property {EntityName} name.OfficialRecord             The name as it appears on an official record            
 * @property {EntityName} name.Phonetic             The name represents a phonetic representation of a name such as a SOUNDEX code            
 * @property {EntityName} name.Pseudonym             The name is a pseudonym for the object or an synonym name            
 * @property {EntityName} name.Religious             The name is to be used for religious purposes (such as baptismal name)            
 * @property {EntityName} name.Search             The name is to be used in the performing of matches only            
 * @property {EntityName} name.Soundex             The name represents the computed soundex code of a name            
 * @property {EntityName} name.Syllabic             The name represents a syllabic name.            
 * @property {EntityName} name.$other Unclassified
 * @property {string} note            Gets a list of all notes associated with the entity            
 * @property {object} participation            Gets the acts in which this entity participates            
 * @property {ActParticipation} participation.Admitter             The player entity was the person who was responsible for admitting the patient into a facility or care scenario.            
 * @property {ActParticipation} participation.Attender             The player entity represents the attending physician for the patient            
 * @property {ActParticipation} participation.Authenticator             The player entity represents an entity which authenticates the provision of care            
 * @property {ActParticipation} participation.Authororiginator             The player entity is responsible for the creation of data described in the act            
 * @property {ActParticipation} participation.Baby             The player is a resultant person in that it was the baby             
 * @property {ActParticipation} participation.Beneficiary             The player is a beneficiary of the act such a receiver of a financial instrument, or other good            
 * @property {ActParticipation} participation.CallbackContact             The player entity represents something that should be contacted upon completion of the act            
 * @property {ActParticipation} participation.CausativeAgent             The player entity is an agent which caused the act to occur            
 * @property {ActParticipation} participation.Consultant             The player entity is acting as a consult to the carrying out of the act            
 * @property {ActParticipation} participation.Consumable             The player entity was or is to be consumed during the process of carrying out the act.            
 * @property {ActParticipation} participation.CoverageTarget             The player entity represents the target coverage entity of the act            
 * @property {ActParticipation} participation.Custodian             The player entity is the data custodian of the act (is responsible for storing and securing the act)            
 * @property {ActParticipation} participation.DataEnterer             The player entity represents the person or device which phisically entered the data at the terminal            
 * @property {ActParticipation} participation.Destination             The player etity represents the ultimate destination of the goods/materials/services described in the act            
 * @property {ActParticipation} participation.Device             The player entity represents the device on which the act or data from the act was acquired or recorded            
 * @property {ActParticipation} participation.DirectTarget             The player entity represents the directed target of care provided in the act            
 * @property {ActParticipation} participation.Discharger             The player entity represents the person who is responsible for the discharging of the patient from an encounter            
 * @property {ActParticipation} participation.Distributor             The player entity is the source distribution point for the financial or material instruments contained in the message            
 * @property {ActParticipation} participation.Donor             The player entity represents the donor of tissue or materials used in the act            
 * @property {ActParticipation} participation.EntryLocation             The location where the act was entered.            
 * @property {ActParticipation} participation.Escort             The player entity was responsible for escorting the patient during the course of the act            
 * @property {ActParticipation} participation.Exposure             The player entity something to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureAgent             The player entity represents the agent (material) to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureSource             The player entity describes the source of the material to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureTarget             The player entity describes the target to which the agent was exposed            
 * @property {ActParticipation} participation.GuarantorParty             The player represents a party which is used as a financial guarantor for payment in the carrying out of the act            
 * @property {ActParticipation} participation.Holder             The player is responsible for holding the act            
 * @property {ActParticipation} participation.IndirectTarget             The entity not directly present in the act but which will be the focust of th act.            
 * @property {ActParticipation} participation.Informant             The player was a person or device which informed data presented in the act. (Example: A mother telling a nurse that their child had a reaction)            
 * @property {ActParticipation} participation.InformationRecipient             The player entity represents something that should be cc'ed on the act            
 * @property {ActParticipation} participation.LegalAuthenticator             The player entity is responsible for legally authenticating the content of the act            
 * @property {ActParticipation} participation.Location             The location where the service was performed.            
 * @property {ActParticipation} participation.NonreuseableDevice             The player represents a consumable that can no longer be used            
 * @property {ActParticipation} participation.Origin             The player represents the origin of the act            
 * @property {ActParticipation} participation.Participation             The player entity participates in the act in no particular classification            
 * @property {ActParticipation} participation.Performer             The player entity is responsible for performing the clinical steps documented in the act            
 * @property {ActParticipation} participation.PrimaryInformationRecipient             The player entity represents a high priority contact which should be informed or cc'ed on the act            
 * @property {ActParticipation} participation.PrimaryPerformer             The player entity was the primary performer of the act. This is used in procedures where more than one performer is present            
 * @property {ActParticipation} participation.Product             The player represents a product that is not necessarily consumed but informs the act            
 * @property {ActParticipation} participation.Receiver             The player represents the entity which is the intended receiver of the act            
 * @property {ActParticipation} participation.RecordTarget             The player represents the entity to which the act is recorded against            
 * @property {ActParticipation} participation.ReferredBy             The player represents the entity which referred the act or caused the act to be undertaken            
 * @property {ActParticipation} participation.ReferredTo             The player entity represents the entity which was referred to            
 * @property {ActParticipation} participation.Referrer             The player entity represents the person who was originally the referrer.            
 * @property {ActParticipation} participation.Remote             The player entity represents a remote portion of the act            
 * @property {ActParticipation} participation.ResponsibleParty             The player entity is ultimately responsible for the carrying out of the act            
 * @property {ActParticipation} participation.ReusableDevice             The player entity represents a device which can be reused in future acts            
 * @property {ActParticipation} participation.SecondaryPerformer             The secondary performing person (support clinician).            
 * @property {ActParticipation} participation.Specimen             The player entity represents a specimen collected for the purpose of testing and diagnosis            
 * @property {ActParticipation} participation.Subject             The player entity is the subject of an act, but not necessarily the record target (meaning the act is about a particular entity but not to be attached to their record)            
 * @property {ActParticipation} participation.Tracker             The player entity is responsible for tracking the progress of the act            
 * @property {ActParticipation} participation.Transcriber             The person who transcribed data from the original act.            
 * @property {ActParticipation} participation.UgentNotificationContact             The player entity represents a contact entity in case of an emergency occurs during the act.            
 * @property {ActParticipation} participation.Verifier             The player entity was responsible for verifying the accuracy of the data in the act            
 * @property {ActParticipation} participation.Via             The player entity represents an entity where the act occurred "via" this entity (i.e. in transport)            
 * @property {ActParticipation} participation.Witness             The player entity represents a legal witness to the act occurring.            
 * @property {ActParticipation} participation.$other Unclassified
 * @property {object} relationship            Gets a list of all associated entities for this entity            
 * @property {EntityRelationship} relationship.Access             The access            
 * @property {EntityRelationship} relationship.ActiveMoiety             The active moiety            
 * @property {EntityRelationship} relationship.AdministerableMaterial             The administerable material            
 * @property {EntityRelationship} relationship.AdoptedChild             The adopted child            
 * @property {EntityRelationship} relationship.AdoptedDaughter             The adopted daughter            
 * @property {EntityRelationship} relationship.AdoptedSon             The adopted son            
 * @property {EntityRelationship} relationship.Affiliate             The affiliate            
 * @property {EntityRelationship} relationship.Agent             The agent            
 * @property {EntityRelationship} relationship.Aliquot             The aliquot            
 * @property {EntityRelationship} relationship.Assigned             The assigned            
 * @property {EntityRelationship} relationship.AssignedEntity             The assigned entity            
 * @property {EntityRelationship} relationship.Aunt             The aunt            
 * @property {EntityRelationship} relationship.Birthplace             The birthplace            
 * @property {EntityRelationship} relationship.Brother             The brother            
 * @property {EntityRelationship} relationship.Brotherinlaw             The brotherinlaw            
 * @property {EntityRelationship} relationship.Caregiver             The caregiver            
 * @property {EntityRelationship} relationship.CaseSubject             The case subject            
 * @property {EntityRelationship} relationship.Child             The child            
 * @property {EntityRelationship} relationship.ChildInlaw             The child inlaw            
 * @property {EntityRelationship} relationship.Citizen             The citizen            
 * @property {EntityRelationship} relationship.Claimant             The claimant            
 * @property {EntityRelationship} relationship.ClinicalResearchInvestigator             The clinical research investigator            
 * @property {EntityRelationship} relationship.ClinicalResearchSponsor             The clinical research sponsor            
 * @property {EntityRelationship} relationship.CommissioningParty             The commissioning party            
 * @property {EntityRelationship} relationship.Contact             The contact            
 * @property {EntityRelationship} relationship.Cousin             The cousin            
 * @property {EntityRelationship} relationship.CoverageSponsor             The coverage sponsor            
 * @property {EntityRelationship} relationship.CoveredParty             The covered party            
 * @property {EntityRelationship} relationship.Daughter             The daughter            
 * @property {EntityRelationship} relationship.DaughterInlaw             The daughter inlaw            
 * @property {EntityRelationship} relationship.DedicatedServiceDeliveryLocation             The dedicated service delivery location            
 * @property {EntityRelationship} relationship.Dependent             The dependent            
 * @property {EntityRelationship} relationship.DistributedMaterial             The distributed material            
 * @property {EntityRelationship} relationship.DomesticPartner             The domestic partner            
 * @property {EntityRelationship} relationship.EmergencyContact             The emergency contact            
 * @property {EntityRelationship} relationship.Employee             The employee            
 * @property {EntityRelationship} relationship.ExposedEntity             The exposed entity            
 * @property {EntityRelationship} relationship.FamilyMember             The family member            
 * @property {EntityRelationship} relationship.Father             The father            
 * @property {EntityRelationship} relationship.Fatherinlaw             The fatherinlaw            
 * @property {EntityRelationship} relationship.FosterChild             The foster child            
 * @property {EntityRelationship} relationship.FosterDaughter             The foster daughter            
 * @property {EntityRelationship} relationship.FosterSon             The foster son            
 * @property {EntityRelationship} relationship.Grandchild             The grandchild            
 * @property {EntityRelationship} relationship.Granddaughter             The granddaughter            
 * @property {EntityRelationship} relationship.Grandfather             The grandfather            
 * @property {EntityRelationship} relationship.Grandmother             The grandmother            
 * @property {EntityRelationship} relationship.Grandparent             The grandparent            
 * @property {EntityRelationship} relationship.Grandson             The grandson            
 * @property {EntityRelationship} relationship.GreatGrandfather             The great grandfather            
 * @property {EntityRelationship} relationship.GreatGrandmother             The great grandmother            
 * @property {EntityRelationship} relationship.GreatGrandparent             The great grandparent            
 * @property {EntityRelationship} relationship.Guarantor             The guarantor            
 * @property {EntityRelationship} relationship.GUARD             The guard            
 * @property {EntityRelationship} relationship.Guardian             The guardian            
 * @property {EntityRelationship} relationship.Halfbrother             The halfbrother            
 * @property {EntityRelationship} relationship.Halfsibling             The halfsibling            
 * @property {EntityRelationship} relationship.Halfsister             The halfsister            
 * @property {EntityRelationship} relationship.HealthcareProvider             The healthcare provider            
 * @property {EntityRelationship} relationship.HealthChart             The health chart            
 * @property {EntityRelationship} relationship.HeldEntity             The held entity            
 * @property {EntityRelationship} relationship.Husband             The husband            
 * @property {EntityRelationship} relationship.IdentifiedEntity             The identified entity            
 * @property {EntityRelationship} relationship.IncidentalServiceDeliveryLocation             The incidental service delivery location            
 * @property {EntityRelationship} relationship.Individual             The individual            
 * @property {EntityRelationship} relationship.InvestigationSubject             The investigation subject            
 * @property {EntityRelationship} relationship.InvoicePayor             The invoice payor            
 * @property {EntityRelationship} relationship.Isolate             The isolate            
 * @property {EntityRelationship} relationship.LicensedEntity             The licensed entity            
 * @property {EntityRelationship} relationship.MaintainedEntity             The maintained entity            
 * @property {EntityRelationship} relationship.ManufacturedProduct             The manufactured product            
 * @property {EntityRelationship} relationship.MaternalAunt             The maternal aunt            
 * @property {EntityRelationship} relationship.MaternalCousin             The maternal cousin            
 * @property {EntityRelationship} relationship.MaternalGrandfather             The maternal grandfather            
 * @property {EntityRelationship} relationship.MaternalGrandmother             The maternal grandmother            
 * @property {EntityRelationship} relationship.MaternalGrandparent             The maternal grandparent            
 * @property {EntityRelationship} relationship.MaternalGreatgrandfather             The maternal greatgrandfather            
 * @property {EntityRelationship} relationship.MaternalGreatgrandmother             The maternal greatgrandmother            
 * @property {EntityRelationship} relationship.MaternalGreatgrandparent             The maternal greatgrandparent            
 * @property {EntityRelationship} relationship.MaternalUncle             The maternal uncle            
 * @property {EntityRelationship} relationship.MilitaryPerson             The military person            
 * @property {EntityRelationship} relationship.Mother             The mother            
 * @property {EntityRelationship} relationship.Motherinlaw             The motherinlaw            
 * @property {EntityRelationship} relationship.NamedInsured             The named insured            
 * @property {EntityRelationship} relationship.NaturalBrother             The natural brother            
 * @property {EntityRelationship} relationship.NaturalChild             The natural child            
 * @property {EntityRelationship} relationship.NaturalDaughter             The natural daughter            
 * @property {EntityRelationship} relationship.NaturalFather             The natural father            
 * @property {EntityRelationship} relationship.NaturalFatherOfFetus             The natural father of fetus            
 * @property {EntityRelationship} relationship.NaturalMother             The natural mother            
 * @property {EntityRelationship} relationship.NaturalParent             The natural parent            
 * @property {EntityRelationship} relationship.NaturalSibling             The natural sibling            
 * @property {EntityRelationship} relationship.NaturalSister             The natural sister            
 * @property {EntityRelationship} relationship.NaturalSon             The natural son            
 * @property {EntityRelationship} relationship.Nephew             The nephew            
 * @property {EntityRelationship} relationship.NextOfKin             The next of kin            
 * @property {EntityRelationship} relationship.Niece             The niece            
 * @property {EntityRelationship} relationship.NieceNephew             The niece nephew            
 * @property {EntityRelationship} relationship.NotaryPublic             The notary public            
 * @property {EntityRelationship} relationship.OwnedEntity             The owned entity            
 * @property {EntityRelationship} relationship.Parent             The parent            
 * @property {EntityRelationship} relationship.ParentInlaw             The parent inlaw            
 * @property {EntityRelationship} relationship.Part             The part            
 * @property {EntityRelationship} relationship.PaternalAunt             The paternal aunt            
 * @property {EntityRelationship} relationship.PaternalCousin             The paternal cousin            
 * @property {EntityRelationship} relationship.PaternalGrandfather             The paternal grandfather            
 * @property {EntityRelationship} relationship.PaternalGrandmother             The paternal grandmother            
 * @property {EntityRelationship} relationship.PaternalGrandparent             The paternal grandparent            
 * @property {EntityRelationship} relationship.PaternalGreatgrandfather             The paternal greatgrandfather            
 * @property {EntityRelationship} relationship.PaternalGreatgrandmother             The paternal greatgrandmother            
 * @property {EntityRelationship} relationship.PaternalGreatgrandparent             The paternal greatgrandparent            
 * @property {EntityRelationship} relationship.PaternalUncle             The paternal uncle            
 * @property {EntityRelationship} relationship.Patient             The patient            
 * @property {EntityRelationship} relationship.Payee             The payee            
 * @property {EntityRelationship} relationship.PersonalRelationship             The personal relationship            
 * @property {EntityRelationship} relationship.PlaceOfDeath             The place of death            
 * @property {EntityRelationship} relationship.PolicyHolder             The policy holder            
 * @property {EntityRelationship} relationship.ProgramEligible             The program eligible            
 * @property {EntityRelationship} relationship.QualifiedEntity             The qualified entity            
 * @property {EntityRelationship} relationship.RegulatedProduct             The regulated product            
 * @property {EntityRelationship} relationship.ResearchSubject             The research subject            
 * @property {EntityRelationship} relationship.RetailedMaterial             The retailed material            
 * @property {EntityRelationship} relationship.Roomate             The roomate            
 * @property {EntityRelationship} relationship.ServiceDeliveryLocation             The service delivery location            
 * @property {EntityRelationship} relationship.Sibling             The sibling            
 * @property {EntityRelationship} relationship.SiblingInlaw             The sibling inlaw            
 * @property {EntityRelationship} relationship.SignificantOther             The significant other            
 * @property {EntityRelationship} relationship.SigningAuthorityOrOfficer             The signing authority or officer            
 * @property {EntityRelationship} relationship.Sister             The sister            
 * @property {EntityRelationship} relationship.Sisterinlaw             The sisterinlaw            
 * @property {EntityRelationship} relationship.Son             The son            
 * @property {EntityRelationship} relationship.SonInlaw             The son inlaw            
 * @property {EntityRelationship} relationship.Specimen             The specimen            
 * @property {EntityRelationship} relationship.Spouse             The spouse            
 * @property {EntityRelationship} relationship.Stepbrother             The stepbrother            
 * @property {EntityRelationship} relationship.StepChild             The step child            
 * @property {EntityRelationship} relationship.Stepdaughter             The stepdaughter            
 * @property {EntityRelationship} relationship.Stepfather             The stepfather            
 * @property {EntityRelationship} relationship.Stepmother             The stepmother            
 * @property {EntityRelationship} relationship.StepParent             The step parent            
 * @property {EntityRelationship} relationship.StepSibling             The step sibling            
 * @property {EntityRelationship} relationship.Stepsister             The stepsister            
 * @property {EntityRelationship} relationship.Stepson             The stepson            
 * @property {EntityRelationship} relationship.Student             The student            
 * @property {EntityRelationship} relationship.Subscriber             The subscriber            
 * @property {EntityRelationship} relationship.TerritoryOfAuthority             The territory of authority            
 * @property {EntityRelationship} relationship.TherapeuticAgent             The therapeutic agent            
 * @property {EntityRelationship} relationship.Uncle             The uncle            
 * @property {EntityRelationship} relationship.Underwriter             The underwriter            
 * @property {EntityRelationship} relationship.UsedEntity             The used entity            
 * @property {EntityRelationship} relationship.WarrantedProduct             The warranted product            
 * @property {EntityRelationship} relationship.Wife             The wife            
 * @property {EntityRelationship} relationship.Replaces             The replaces            
 * @property {EntityRelationship} relationship.Instance             The target entity represents an instance of the scoper entity            
 * @property {EntityRelationship} relationship.LocatedEntity             Relates the target entity to a source location            
 * @property {EntityRelationship} relationship.$other Unclassified
 * @property {Concept} statusConceptModel [Delay loaded from statusConcept],             Status concept id            
 * @property {string} statusConcept            Status concept id            (see: {@link StatusKeys} for values)
 * @property {object} tag            Gets a list of all tags associated with the entity            
 * @property {string} tag.classifier  where classifier is from {@link Tag} key
 * @property {object} telecom            Gets a list of all telecommunications addresses associated with the entity            
 * @property {EntityTelecomAddress} telecom.AnsweringService             answering service            
 * @property {EntityTelecomAddress} telecom.EmergencyContact             Emergency contact            
 * @property {EntityTelecomAddress} telecom.MobileContact             Mobile phone contact            
 * @property {EntityTelecomAddress} telecom.Pager             pager            
 * @property {EntityTelecomAddress} telecom.Public             public (800 number example) contact            
 * @property {EntityTelecomAddress} telecom.TemporaryAddress             temporary contact            
 * @property {EntityTelecomAddress} telecom.WorkPlace             For use in the workplace            
 * @property {EntityTelecomAddress} telecom.$other Unclassified
 * @property {string} template            Gets the template key            
 * @property {TemplateDefinition} templateModel [Delay loaded from template],             Gets or sets the template definition            
 * @property {Concept} typeConceptModel [Delay loaded from typeConcept],             Type concept identifier            
 * @property {string} typeConcept            Type concept identifier            
 * @property {string} previousVersion
 * @property {string} version
 * @property {number} sequence
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {Place} copyData Copy constructor (if present)
 */
function Place (copyData) { 
	this.$type = 'Place';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {number} */
	this.sequence = copyData.sequence;
	/** @type {string} */
	this.version = copyData.version;
	/** @type {string} */
	this.previousVersion = copyData.previousVersion;
	/** @type {string} */
	this.typeConcept = copyData.typeConcept;
	/** @type {Concept} */
	this.typeConceptModel = copyData.typeConceptModel;
	/** @type {TemplateDefinition} */
	this.templateModel = copyData.templateModel;
	/** @type {string} */
	this.template = copyData.template;
	/** @type {object} */
	this.telecom = copyData.telecom;
	/** @type {object} */
	this.tag = copyData.tag;
	/** @type {string} */
	this.statusConcept = copyData.statusConcept;
	/** @type {Concept} */
	this.statusConceptModel = copyData.statusConceptModel;
	/** @type {object} */
	this.relationship = copyData.relationship;
	/** @type {object} */
	this.participation = copyData.participation;
	/** @type {string} */
	this.note = copyData.note;
	/** @type {object} */
	this.name = copyData.name;
	/** @type {object} */
	this.identifier = copyData.identifier;
	/** @type {object} */
	this.extension = copyData.extension;
	/** @type {string} */
	this.determinerConcept = copyData.determinerConcept;
	/** @type {Concept} */
	this.determinerConceptModel = copyData.determinerConceptModel;
	/** @type {string} */
	this.creationAct = copyData.creationAct;
	/** @type {Act} */
	this.creationActModel = copyData.creationActModel;
	/** @type {Concept} */
	this.classConceptModel = copyData.classConceptModel;
	/** @type {object} */
	this.address = copyData.address;
	/** @type {PlaceService} */
	this.service = copyData.service;
	/** @type {Double} */
	this.lng = copyData.lng;
	/** @type {Double} */
	this.lat = copyData.lat;
	/** @type {boolean} */
	this.isMobile = copyData.isMobile;
	/** @type {string} */
	this.classConcept = copyData.classConcept;
	}
}  // Place 
// SanteDB.Core.Model.Entities.PlaceService, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!PlaceService)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents a service for a place            
 * @property {Concept} serviceConceptModel [Delay loaded from serviceConcept],             Gets or sets the service concept            
 * @property {string} serviceConcept            Gets or sets the service concept key            
 * @property {Object} serviceSchedule            The schedule that the service is offered            
 * @property {number} effectiveVersionSequence
 * @property {number} obsoleteVersionSequence
 * @property {Date} modifiedOn
 * @property {string} source
 * @property {Entity} sourceModel [Delay loaded from source], 
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {PlaceService} copyData Copy constructor (if present)
 */
function PlaceService (copyData) { 
	this.$type = 'PlaceService';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {Entity} */
	this.sourceModel = copyData.sourceModel;
	/** @type {string} */
	this.source = copyData.source;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {number} */
	this.obsoleteVersionSequence = copyData.obsoleteVersionSequence;
	/** @type {number} */
	this.effectiveVersionSequence = copyData.effectiveVersionSequence;
	/** @type {Object} */
	this.serviceSchedule = copyData.serviceSchedule;
	/** @type {string} */
	this.serviceConcept = copyData.serviceConcept;
	/** @type {Concept} */
	this.serviceConceptModel = copyData.serviceConceptModel;
	}
}  // PlaceService 
// SanteDB.Core.Model.DataTypes.AssigningAuthority, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!AssigningAuthority)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents a model class which is an assigning authority            
 * @property {string} name            Gets or sets the name of the assigning authority            
 * @property {string} domainName            Gets or sets the domain name of the assigning authority            
 * @property {string} description            Gets or sets the description of the assigning authority            
 * @property {string} oid            Gets or sets the oid of the assigning authority            
 * @property {string} url            The URL of the assigning authority            
 * @property {string} scope            Represents scopes to which the authority is bound            
 * @property {string} assigningDevice            Assigning device identifier            
 * @property {string} validation            Gets or sets the validation regex            
 * @property {boolean} isUnique            True if the assigning authority values should be unique            
 * @property {object} scopeModel [Delay loaded from scope],             Gets concept sets to which this concept is a member            
 * @property {Concept} scope.classifier  where classifier is from {@link Concept} mnemonic
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {AssigningAuthority} copyData Copy constructor (if present)
 */
function AssigningAuthority (copyData) { 
	this.$type = 'AssigningAuthority';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {object} */
	this.scopeModel = copyData.scopeModel;
	/** @type {boolean} */
	this.isUnique = copyData.isUnique;
	/** @type {string} */
	this.validation = copyData.validation;
	/** @type {string} */
	this.assigningDevice = copyData.assigningDevice;
	/** @type {string} */
	this.scope = copyData.scope;
	/** @type {string} */
	this.url = copyData.url;
	/** @type {string} */
	this.oid = copyData.oid;
	/** @type {string} */
	this.description = copyData.description;
	/** @type {string} */
	this.domainName = copyData.domainName;
	/** @type {string} */
	this.name = copyData.name;
	}
}  // AssigningAuthority 
// SanteDB.Core.Model.DataTypes.CodeSystem, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!CodeSystem)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends NonVersionedEntityData
 * @summary             Represents a code system which is a collection of reference terms            
 * @property {string} name            Gets or sets the name of the code system            
 * @property {string} oid            Gets or sets the Oid of the code system            
 * @property {string} authority            Gets or sets the authority of the code system            
 * @property {string} obsoletionReason            Gets or sets the obsoletion reason of the code system            
 * @property {string} url            Gets or sets the URL of the code system            
 * @property {string} version            Gets or sets the version text of the code system            
 * @property {string} description            Gets or sets the human description            
 * @property {Date} updatedTime            Gets or sets the creation time in XML format            
 * @property {Date} modifiedOn            Gets the time this item was modified            
 * @property {string} updatedBy            Gets or sets the created by identifier            
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {CodeSystem} copyData Copy constructor (if present)
 */
function CodeSystem (copyData) { 
	this.$type = 'CodeSystem';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {string} */
	this.updatedBy = copyData.updatedBy;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {Date} */
	this.updatedTime = copyData.updatedTime;
	/** @type {string} */
	this.description = copyData.description;
	/** @type {string} */
	this.version = copyData.version;
	/** @type {string} */
	this.url = copyData.url;
	/** @type {string} */
	this.obsoletionReason = copyData.obsoletionReason;
	/** @type {string} */
	this.authority = copyData.authority;
	/** @type {string} */
	this.oid = copyData.oid;
	/** @type {string} */
	this.name = copyData.name;
	}
}  // CodeSystem 
// SanteDB.Core.Model.DataTypes.Concept, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!Concept)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             A class representing a generic concept used in the SanteDB datamodel            
 * @property {boolean} isReadonly            Gets or sets an indicator which dictates whether the concept is a system concept            
 * @property {string} mnemonic            Gets or sets the unchanging mnemonic for the concept            
 * @property {string} statusConcept            Gets or sets the status concept key            (see: {@link StatusKeys} for values)
 * @property {Concept} statusConceptModel [Delay loaded from statusConcept],             Gets or sets the status of the concept            
 * @property {object} relationship            Gets a list of concept relationships            
 * @property {ConceptRelationship} relationship.InverseOf             The source concept has the inverse meaning of the target concept            
 * @property {ConceptRelationship} relationship.MemberOf             The source concept is a member of the target concept            
 * @property {ConceptRelationship} relationship.NegationOf             The source concept is a negation of the target concept            
 * @property {ConceptRelationship} relationship.SameAs             The source concept has the same meaning as the target concept            
 * @property {ConceptRelationship} relationship.$other Unclassified
 * @property {string} conceptClass            Gets or sets the class identifier            (see: {@link ConceptClassKeys} for values)
 * @property {ConceptClass} conceptClassModel [Delay loaded from conceptClass],             Gets or sets the classification of the concept            
 * @property {object} referenceTerm            Gets a list of concept reference terms            
 * @property {ConceptReferenceTerm} referenceTerm.classifier  where classifier is from {@link ConceptReferenceTerm} term
 * @property {object} name            Gets the concept names            
 * @property {string} name.classifier  where classifier is from {@link ConceptName} language
 * @property {string} conceptSet            Concept sets as identifiers for XML purposes only            
 * @property {object} conceptSetModel [Delay loaded from conceptSet],             Gets concept sets to which this concept is a member            
 * @property {ConceptSet} conceptSet.classifier  where classifier is from {@link ConceptSet} mnemonic
 * @property {string} previousVersion
 * @property {string} version
 * @property {number} sequence
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {Concept} copyData Copy constructor (if present)
 */
function Concept (copyData) { 
	this.$type = 'Concept';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {number} */
	this.sequence = copyData.sequence;
	/** @type {string} */
	this.version = copyData.version;
	/** @type {string} */
	this.previousVersion = copyData.previousVersion;
	/** @type {object} */
	this.conceptSetModel = copyData.conceptSetModel;
	/** @type {string} */
	this.conceptSet = copyData.conceptSet;
	/** @type {object} */
	this.name = copyData.name;
	/** @type {object} */
	this.referenceTerm = copyData.referenceTerm;
	/** @type {ConceptClass} */
	this.conceptClassModel = copyData.conceptClassModel;
	/** @type {string} */
	this.conceptClass = copyData.conceptClass;
	/** @type {object} */
	this.relationship = copyData.relationship;
	/** @type {Concept} */
	this.statusConceptModel = copyData.statusConceptModel;
	/** @type {string} */
	this.statusConcept = copyData.statusConcept;
	/** @type {string} */
	this.mnemonic = copyData.mnemonic;
	/** @type {boolean} */
	this.isReadonly = copyData.isReadonly;
	}
}  // Concept 
// SanteDB.Core.Model.DataTypes.ConceptClass, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ConceptClass)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends NonVersionedEntityData
 * @summary             Identifies a classification for a concept            
 * @property {string} name            Gets or sets the name of the concept class            
 * @property {string} mnemonic            Gets or sets the mnemonic            
 * @property {Date} updatedTime            Gets or sets the creation time in XML format            
 * @property {Date} modifiedOn            Gets the time this item was modified            
 * @property {string} updatedBy            Gets or sets the created by identifier            
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {ConceptClass} copyData Copy constructor (if present)
 */
function ConceptClass (copyData) { 
	this.$type = 'ConceptClass';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {string} */
	this.updatedBy = copyData.updatedBy;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {Date} */
	this.updatedTime = copyData.updatedTime;
	/** @type {string} */
	this.mnemonic = copyData.mnemonic;
	/** @type {string} */
	this.name = copyData.name;
	}
}  // ConceptClass 
// SanteDB.Core.Model.DataTypes.ConceptName, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ConceptName)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents a name (human name) that a concept may have            
 * @property {string} language            Gets or sets the language code of the object            
 * @property {string} value            Gets or sets the name of the reference term            
 * @property {string} phoneticCode            Gets or sets the phonetic code of the reference term            
 * @property {string} phoneticAlgorithm            Gets or sets the identifier of the phonetic code            (see: {@link PhoneticAlgorithmKeys} for values)
 * @property {PhoneticAlgorithm} phoneticAlgorithmModel [Delay loaded from phoneticAlgorithm],             Gets or sets the phonetic algorithm            
 * @property {number} effectiveVersionSequence
 * @property {number} obsoleteVersionSequence
 * @property {Date} modifiedOn
 * @property {string} source
 * @property {Concept} sourceModel [Delay loaded from source], 
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {ConceptName} copyData Copy constructor (if present)
 */
function ConceptName (copyData) { 
	this.$type = 'ConceptName';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {Concept} */
	this.sourceModel = copyData.sourceModel;
	/** @type {string} */
	this.source = copyData.source;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {number} */
	this.obsoleteVersionSequence = copyData.obsoleteVersionSequence;
	/** @type {number} */
	this.effectiveVersionSequence = copyData.effectiveVersionSequence;
	/** @type {PhoneticAlgorithm} */
	this.phoneticAlgorithmModel = copyData.phoneticAlgorithmModel;
	/** @type {string} */
	this.phoneticAlgorithm = copyData.phoneticAlgorithm;
	/** @type {string} */
	this.phoneticCode = copyData.phoneticCode;
	/** @type {string} */
	this.value = copyData.value;
	/** @type {string} */
	this.language = copyData.language;
	}
}  // ConceptName 
// SanteDB.Core.Model.DataTypes.ConceptReferenceTerm, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ConceptReferenceTerm)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents a reference term relationship between a concept and reference term            
 * @property {string} term            Gets or sets the reference term identifier            
 * @property {ReferenceTerm} termModel [Delay loaded from term],             Gets or set the reference term            
 * @property {string} relationshipType            Gets or sets the relationship type identifier            
 * @property {ConceptRelationshipType} relationshipTypeModel [Delay loaded from relationshipType],             Gets or sets the relationship type            
 * @property {number} effectiveVersionSequence
 * @property {number} obsoleteVersionSequence
 * @property {Date} modifiedOn
 * @property {string} source
 * @property {Concept} sourceModel [Delay loaded from source], 
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {ConceptReferenceTerm} copyData Copy constructor (if present)
 */
function ConceptReferenceTerm (copyData) { 
	this.$type = 'ConceptReferenceTerm';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {Concept} */
	this.sourceModel = copyData.sourceModel;
	/** @type {string} */
	this.source = copyData.source;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {number} */
	this.obsoleteVersionSequence = copyData.obsoleteVersionSequence;
	/** @type {number} */
	this.effectiveVersionSequence = copyData.effectiveVersionSequence;
	/** @type {ConceptRelationshipType} */
	this.relationshipTypeModel = copyData.relationshipTypeModel;
	/** @type {string} */
	this.relationshipType = copyData.relationshipType;
	/** @type {ReferenceTerm} */
	this.termModel = copyData.termModel;
	/** @type {string} */
	this.term = copyData.term;
	}
}  // ConceptReferenceTerm 
// SanteDB.Core.Model.DataTypes.ConceptRelationship, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ConceptRelationship)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents a relationship between two concepts            
 * @property {string} targetConcept            Gets or sets the target concept identifier            
 * @property {Concept} targetConceptModel [Delay loaded from targetConcept],             Gets or sets the target concept            
 * @property {string} relationshipType            Relationship type            (see: {@link ConceptRelationshipTypeKeys} for values)
 * @property {ConceptRelationshipType} relationshipTypeModel [Delay loaded from relationshipType],             Gets or sets the relationship type            
 * @property {number} effectiveVersionSequence
 * @property {number} obsoleteVersionSequence
 * @property {Date} modifiedOn
 * @property {string} source
 * @property {Concept} sourceModel [Delay loaded from source], 
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {ConceptRelationship} copyData Copy constructor (if present)
 */
function ConceptRelationship (copyData) { 
	this.$type = 'ConceptRelationship';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {Concept} */
	this.sourceModel = copyData.sourceModel;
	/** @type {string} */
	this.source = copyData.source;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {number} */
	this.obsoleteVersionSequence = copyData.obsoleteVersionSequence;
	/** @type {number} */
	this.effectiveVersionSequence = copyData.effectiveVersionSequence;
	/** @type {ConceptRelationshipType} */
	this.relationshipTypeModel = copyData.relationshipTypeModel;
	/** @type {string} */
	this.relationshipType = copyData.relationshipType;
	/** @type {Concept} */
	this.targetConceptModel = copyData.targetConceptModel;
	/** @type {string} */
	this.targetConcept = copyData.targetConcept;
	}
}  // ConceptRelationship 
// SanteDB.Core.Model.DataTypes.ConceptRelationshipType, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ConceptRelationshipType)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends NonVersionedEntityData
 * @summary             Concept relationship type            
 * @property {string} name            Gets or sets the name of the relationship            
 * @property {string} mnemonic            The invariant of the relationship type            
 * @property {Date} updatedTime            Gets or sets the creation time in XML format            
 * @property {Date} modifiedOn            Gets the time this item was modified            
 * @property {string} updatedBy            Gets or sets the created by identifier            
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {ConceptRelationshipType} copyData Copy constructor (if present)
 */
function ConceptRelationshipType (copyData) { 
	this.$type = 'ConceptRelationshipType';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {string} */
	this.updatedBy = copyData.updatedBy;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {Date} */
	this.updatedTime = copyData.updatedTime;
	/** @type {string} */
	this.mnemonic = copyData.mnemonic;
	/** @type {string} */
	this.name = copyData.name;
	}
}  // ConceptRelationshipType 
// SanteDB.Core.Model.DataTypes.ConceptSet, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ConceptSet)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends NonVersionedEntityData
 * @summary             Represents set of concepts            
 * @property {string} name            Gets or sets the name of the concept set            
 * @property {string} mnemonic            Gets or sets the mnemonic for the concept set (used for convenient lookup)            
 * @property {string} oid            Gets or sets the oid of the concept set            
 * @property {string} url            Gets or sets the url of the concept set            
 * @property {string} concept            Concepts as identifiers for XML purposes only            
 * @property {Date} updatedTime            Gets or sets the creation time in XML format            
 * @property {Date} modifiedOn            Gets the time this item was modified            
 * @property {string} updatedBy            Gets or sets the created by identifier            
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {ConceptSet} copyData Copy constructor (if present)
 */
function ConceptSet (copyData) { 
	this.$type = 'ConceptSet';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {string} */
	this.updatedBy = copyData.updatedBy;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {Date} */
	this.updatedTime = copyData.updatedTime;
	/** @type {string} */
	this.concept = copyData.concept;
	/** @type {string} */
	this.url = copyData.url;
	/** @type {string} */
	this.oid = copyData.oid;
	/** @type {string} */
	this.mnemonic = copyData.mnemonic;
	/** @type {string} */
	this.name = copyData.name;
	}
}  // ConceptSet 
// SanteDB.Core.Model.DataTypes.EntityExtension, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!EntityExtension)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Extension bound to entity            
 * @property {Array<byte>} value
 * @property {string} valueModel [Delay loaded from value], 
 * @property {ExtensionType} extensionTypeModel [Delay loaded from extensionType], 
 * @property {string} extensionType
 * @property {number} effectiveVersionSequence
 * @property {number} obsoleteVersionSequence
 * @property {Date} modifiedOn
 * @property {string} source
 * @property {Entity} sourceModel [Delay loaded from source], 
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {EntityExtension} copyData Copy constructor (if present)
 */
function EntityExtension (copyData) { 
	this.$type = 'EntityExtension';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {Entity} */
	this.sourceModel = copyData.sourceModel;
	/** @type {string} */
	this.source = copyData.source;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {number} */
	this.obsoleteVersionSequence = copyData.obsoleteVersionSequence;
	/** @type {number} */
	this.effectiveVersionSequence = copyData.effectiveVersionSequence;
	/** @type {string} */
	this.extensionType = copyData.extensionType;
	/** @type {ExtensionType} */
	this.extensionTypeModel = copyData.extensionTypeModel;
	/** @type {string} */
	this.valueModel = copyData.valueModel;
	/** @type {Array<byte>} */
	this.value = copyData.value;
	}
}  // EntityExtension 
// SanteDB.Core.Model.DataTypes.ActExtension, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ActExtension)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Act extension            
 * @property {Array<byte>} value
 * @property {string} valueModel [Delay loaded from value], 
 * @property {ExtensionType} extensionTypeModel [Delay loaded from extensionType], 
 * @property {string} extensionType
 * @property {number} effectiveVersionSequence
 * @property {number} obsoleteVersionSequence
 * @property {Date} modifiedOn
 * @property {string} source
 * @property {Act} sourceModel [Delay loaded from source], 
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {ActExtension} copyData Copy constructor (if present)
 */
function ActExtension (copyData) { 
	this.$type = 'ActExtension';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {Act} */
	this.sourceModel = copyData.sourceModel;
	/** @type {string} */
	this.source = copyData.source;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {number} */
	this.obsoleteVersionSequence = copyData.obsoleteVersionSequence;
	/** @type {number} */
	this.effectiveVersionSequence = copyData.effectiveVersionSequence;
	/** @type {string} */
	this.extensionType = copyData.extensionType;
	/** @type {ExtensionType} */
	this.extensionTypeModel = copyData.extensionTypeModel;
	/** @type {string} */
	this.valueModel = copyData.valueModel;
	/** @type {Array<byte>} */
	this.value = copyData.value;
	}
}  // ActExtension 
// SanteDB.Core.Model.DataTypes.ExtensionType, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ExtensionType)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends NonVersionedEntityData
 * @summary             Instructions on how an extensionshould be handled            
 * @property {string} handlerClass            Gets or sets the description            
 * @property {string} name            Gets or sets the description            
 * @property {Date} updatedTime            Gets or sets the creation time in XML format            
 * @property {Date} modifiedOn            Gets the time this item was modified            
 * @property {string} updatedBy            Gets or sets the created by identifier            
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {ExtensionType} copyData Copy constructor (if present)
 */
function ExtensionType (copyData) { 
	this.$type = 'ExtensionType';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {string} */
	this.updatedBy = copyData.updatedBy;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {Date} */
	this.updatedTime = copyData.updatedTime;
	/** @type {string} */
	this.name = copyData.name;
	/** @type {string} */
	this.handlerClass = copyData.handlerClass;
	}
}  // ExtensionType 
// SanteDB.Core.Model.DataTypes.EntityIdentifier, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!EntityIdentifier)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Entity identifiers            
 * @property {string} value
 * @property {IdentifierType} type
 * @property {AssigningAuthority} authority
 * @property {number} effectiveVersionSequence
 * @property {number} obsoleteVersionSequence
 * @property {Date} modifiedOn
 * @property {string} source
 * @property {Entity} sourceModel [Delay loaded from source], 
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {EntityIdentifier} copyData Copy constructor (if present)
 */
function EntityIdentifier (copyData) { 
	this.$type = 'EntityIdentifier';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {Entity} */
	this.sourceModel = copyData.sourceModel;
	/** @type {string} */
	this.source = copyData.source;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {number} */
	this.obsoleteVersionSequence = copyData.obsoleteVersionSequence;
	/** @type {number} */
	this.effectiveVersionSequence = copyData.effectiveVersionSequence;
	/** @type {AssigningAuthority} */
	this.authority = copyData.authority;
	/** @type {IdentifierType} */
	this.type = copyData.type;
	/** @type {string} */
	this.value = copyData.value;
	}
}  // EntityIdentifier 
// SanteDB.Core.Model.DataTypes.ActIdentifier, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ActIdentifier)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Act identifier            
 * @property {string} value
 * @property {IdentifierType} type
 * @property {AssigningAuthority} authority
 * @property {number} effectiveVersionSequence
 * @property {number} obsoleteVersionSequence
 * @property {Date} modifiedOn
 * @property {string} source
 * @property {Act} sourceModel [Delay loaded from source], 
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {ActIdentifier} copyData Copy constructor (if present)
 */
function ActIdentifier (copyData) { 
	this.$type = 'ActIdentifier';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {Act} */
	this.sourceModel = copyData.sourceModel;
	/** @type {string} */
	this.source = copyData.source;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {number} */
	this.obsoleteVersionSequence = copyData.obsoleteVersionSequence;
	/** @type {number} */
	this.effectiveVersionSequence = copyData.effectiveVersionSequence;
	/** @type {AssigningAuthority} */
	this.authority = copyData.authority;
	/** @type {IdentifierType} */
	this.type = copyData.type;
	/** @type {string} */
	this.value = copyData.value;
	}
}  // ActIdentifier 
// SanteDB.Core.Model.DataTypes.IdentifierType, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!IdentifierType)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents a basic information class which classifies the use of an identifier            
 * @property {string} scopeConcept            Gets or sets the id of the scope concept            
 * @property {string} typeConcept            Gets or sets the concept which identifies the type            
 * @property {Concept} typeConceptModel [Delay loaded from typeConcept],             Type concept            
 * @property {Concept} scopeConceptModel [Delay loaded from scopeConcept],             Gets the scope of the identifier            
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {IdentifierType} copyData Copy constructor (if present)
 */
function IdentifierType (copyData) { 
	this.$type = 'IdentifierType';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {Concept} */
	this.scopeConceptModel = copyData.scopeConceptModel;
	/** @type {Concept} */
	this.typeConceptModel = copyData.typeConceptModel;
	/** @type {string} */
	this.typeConcept = copyData.typeConcept;
	/** @type {string} */
	this.scopeConcept = copyData.scopeConcept;
	}
}  // IdentifierType 
// SanteDB.Core.Model.DataTypes.EntityNote, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!EntityNote)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents a note attached to an entity            
 * @property {string} text
 * @property {string} author
 * @property {Entity} authorModel [Delay loaded from author], 
 * @property {number} effectiveVersionSequence
 * @property {number} obsoleteVersionSequence
 * @property {Date} modifiedOn
 * @property {string} source
 * @property {Entity} sourceModel [Delay loaded from source], 
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {EntityNote} copyData Copy constructor (if present)
 */
function EntityNote (copyData) { 
	this.$type = 'EntityNote';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {Entity} */
	this.sourceModel = copyData.sourceModel;
	/** @type {string} */
	this.source = copyData.source;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {number} */
	this.obsoleteVersionSequence = copyData.obsoleteVersionSequence;
	/** @type {number} */
	this.effectiveVersionSequence = copyData.effectiveVersionSequence;
	/** @type {Entity} */
	this.authorModel = copyData.authorModel;
	/** @type {string} */
	this.author = copyData.author;
	/** @type {string} */
	this.text = copyData.text;
	}
}  // EntityNote 
// SanteDB.Core.Model.DataTypes.ActNote, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ActNote)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents a note attached to an entity            
 * @property {string} text
 * @property {string} author
 * @property {Entity} authorModel [Delay loaded from author], 
 * @property {number} effectiveVersionSequence
 * @property {number} obsoleteVersionSequence
 * @property {Date} modifiedOn
 * @property {string} source
 * @property {Act} sourceModel [Delay loaded from source], 
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {ActNote} copyData Copy constructor (if present)
 */
function ActNote (copyData) { 
	this.$type = 'ActNote';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {Act} */
	this.sourceModel = copyData.sourceModel;
	/** @type {string} */
	this.source = copyData.source;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {number} */
	this.obsoleteVersionSequence = copyData.obsoleteVersionSequence;
	/** @type {number} */
	this.effectiveVersionSequence = copyData.effectiveVersionSequence;
	/** @type {Entity} */
	this.authorModel = copyData.authorModel;
	/** @type {string} */
	this.author = copyData.author;
	/** @type {string} */
	this.text = copyData.text;
	}
}  // ActNote 
// SanteDB.Core.Model.DataTypes.PhoneticAlgorithm, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!PhoneticAlgorithm)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends NonVersionedEntityData
 * @summary             Represents a phonetic algorithm record in the model            
 * @property {string} name            Gets the name of the phonetic algorithm            
 * @property {string} handler            Gets the handler (or generator) for the phonetic algorithm            
 * @property {Date} updatedTime            Gets or sets the creation time in XML format            
 * @property {Date} modifiedOn            Gets the time this item was modified            
 * @property {string} updatedBy            Gets or sets the created by identifier            
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {PhoneticAlgorithm} copyData Copy constructor (if present)
 */
function PhoneticAlgorithm (copyData) { 
	this.$type = 'PhoneticAlgorithm';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {string} */
	this.updatedBy = copyData.updatedBy;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {Date} */
	this.updatedTime = copyData.updatedTime;
	/** @type {string} */
	this.handler = copyData.handler;
	/** @type {string} */
	this.name = copyData.name;
	}
}  // PhoneticAlgorithm 
// SanteDB.Core.Model.DataTypes.ReferenceTerm, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ReferenceTerm)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends NonVersionedEntityData
 * @summary             Represents a basic reference term            
 * @property {string} mnemonic            Gets or sets the mnemonic for the reference term            
 * @property {CodeSystem} codeSystemModel [Delay loaded from codeSystem],             Gets or sets the code system             
 * @property {string} codeSystem            Gets or sets the code system identifier            (see: {@link CodeSystemKeys} for values)
 * @property {object} name            Gets display names associated with the reference term            
 * @property {string} name.classifier  where classifier is from {@link ReferenceTermName} language
 * @property {Date} updatedTime            Gets or sets the creation time in XML format            
 * @property {Date} modifiedOn            Gets the time this item was modified            
 * @property {string} updatedBy            Gets or sets the created by identifier            
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {ReferenceTerm} copyData Copy constructor (if present)
 */
function ReferenceTerm (copyData) { 
	this.$type = 'ReferenceTerm';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {string} */
	this.updatedBy = copyData.updatedBy;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {Date} */
	this.updatedTime = copyData.updatedTime;
	/** @type {object} */
	this.name = copyData.name;
	/** @type {string} */
	this.codeSystem = copyData.codeSystem;
	/** @type {CodeSystem} */
	this.codeSystemModel = copyData.codeSystemModel;
	/** @type {string} */
	this.mnemonic = copyData.mnemonic;
	}
}  // ReferenceTerm 
// SanteDB.Core.Model.DataTypes.ReferenceTermName, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ReferenceTermName)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Display name of a code system or reference term            
 * @property {string} language            Gets or sets the language code of the object            
 * @property {string} value            Gets or sets the name of the reference term            
 * @property {string} phoneticCode            Gets or sets the phonetic code of the reference term            
 * @property {string} phoneticAlgorithm            Gets or sets the identifier of the phonetic code            (see: {@link PhoneticAlgorithmKeys} for values)
 * @property {PhoneticAlgorithm} phoneticAlgorithmModel [Delay loaded from phoneticAlgorithm],             Gets or sets the phonetic algorithm            
 * @property {string} source            Gets the source entity key            
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {ReferenceTermName} copyData Copy constructor (if present)
 */
function ReferenceTermName (copyData) { 
	this.$type = 'ReferenceTermName';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {string} */
	this.source = copyData.source;
	/** @type {PhoneticAlgorithm} */
	this.phoneticAlgorithmModel = copyData.phoneticAlgorithmModel;
	/** @type {string} */
	this.phoneticAlgorithm = copyData.phoneticAlgorithm;
	/** @type {string} */
	this.phoneticCode = copyData.phoneticCode;
	/** @type {string} */
	this.value = copyData.value;
	/** @type {string} */
	this.language = copyData.language;
	}
}  // ReferenceTermName 
// SanteDB.Core.Model.DataTypes.EntityTag, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!EntityTag)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents a tag associated with an entity            
 * @property {string} key
 * @property {string} value
 * @property {string} source
 * @property {Entity} sourceModel [Delay loaded from source], 
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {EntityTag} copyData Copy constructor (if present)
 */
function EntityTag (copyData) { 
	this.$type = 'EntityTag';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {Entity} */
	this.sourceModel = copyData.sourceModel;
	/** @type {string} */
	this.source = copyData.source;
	/** @type {string} */
	this.value = copyData.value;
	/** @type {string} */
	this.key = copyData.key;
	}
}  // EntityTag 
// SanteDB.Core.Model.DataTypes.ActTag, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ActTag)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents a tag on an act            
 * @property {string} key
 * @property {string} value
 * @property {string} source
 * @property {Act} sourceModel [Delay loaded from source], 
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {ActTag} copyData Copy constructor (if present)
 */
function ActTag (copyData) { 
	this.$type = 'ActTag';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {Act} */
	this.sourceModel = copyData.sourceModel;
	/** @type {string} */
	this.source = copyData.source;
	/** @type {string} */
	this.value = copyData.value;
	/** @type {string} */
	this.key = copyData.key;
	}
}  // ActTag 
// SanteDB.Core.Model.DataTypes.TemplateDefinition, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!TemplateDefinition)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends NonVersionedEntityData
 * @summary             Represents a template definition            
 * @property {string} mnemonic            Gets or sets the mnemonic            
 * @property {string} name            Gets or set the name             
 * @property {string} oid            Gets or sets the oid of the concept set            
 * @property {string} description            Gets or sets the description            
 * @property {Date} updatedTime            Gets or sets the creation time in XML format            
 * @property {Date} modifiedOn            Gets the time this item was modified            
 * @property {string} updatedBy            Gets or sets the created by identifier            
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {TemplateDefinition} copyData Copy constructor (if present)
 */
function TemplateDefinition (copyData) { 
	this.$type = 'TemplateDefinition';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {string} */
	this.updatedBy = copyData.updatedBy;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {Date} */
	this.updatedTime = copyData.updatedTime;
	/** @type {string} */
	this.description = copyData.description;
	/** @type {string} */
	this.oid = copyData.oid;
	/** @type {string} */
	this.name = copyData.name;
	/** @type {string} */
	this.mnemonic = copyData.mnemonic;
	}
}  // TemplateDefinition 
// SanteDB.Core.Model.Collection.Bundle, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!Bundle)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents a collection of model items             
 * @property {Date} modifiedOn            Gets the time the bundle was modified            
 * @property {IdentifiedData} item            Gets or sets items in the bundle            
 * @property {string} entry            Entry into the bundle            
 * @property {number} offset            Gets or sets the count in this bundle            
 * @property {number} count            Gets or sets the count in this bundle            
 * @property {number} totalResults            Gets or sets the total results            
 * @property {string} result            Gets or sets the keys of objects that aren't really in the bundle but are expansion items            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {Bundle} copyData Copy constructor (if present)
 */
function Bundle (copyData) { 
	this.$type = 'Bundle';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.result = copyData.result;
	/** @type {number} */
	this.totalResults = copyData.totalResults;
	/** @type {number} */
	this.count = copyData.count;
	/** @type {number} */
	this.offset = copyData.offset;
	/** @type {string} */
	this.entry = copyData.entry;
	/** @type {IdentifiedData} */
	this.item = copyData.item;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	}
}  // Bundle 
// SanteDB.Core.Model.Acts.Act, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!Act)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents the base class for an act            
 * @description 
 *             An Act, in the context of the reference information model (RIM) represents something that is done to a patient. More precisely, an Act
 *             is anything that occurs involving entities in which the entity's state is changed or is documented.
 *             
 *             Examples of Acts Include:
 *              - The administration of a substance to a patient - The observing of a value for the patient - An encounter or visit that occurs where the patient receives one or more services - Any other action such as supply request, or problem recordation
 *             The property which classifies what specific type of action an act represents is its , which dictates
 *             what type an act is. Class concept keys can be found in here .
 *             
 *             This structure is used to represent events, proposals, and requests. That is to say, the Act structure can represent the request to 
 *             do an act, the intent to perform an act, or the actual act being performed itself. This classification of mode happens based on the 
 *              mood concept. Mood concept keys can be found on the  structure.
 *             
 * @property {boolean} isNegated            Gets or sets an indicator which identifies whether the act actually occurred, or            specifically did not occur            
 * @property {string} template            Gets the template key            
 * @property {TemplateDefinition} templateModel [Delay loaded from template],             Gets or sets the template definition            
 * @property {Date} actTime            Gets or sets the creation time in XML format            
 * @property {Date} startTime            Gets or sets the creation time in XML format            
 * @property {Date} stopTime            Gets or sets the creation time in XML format            
 * @property {string} classConcept            Gets or sets the key of the concept which classifies the act.            (see: {@link ActClassKeys} for values)
 * @property {string} moodConcept            Gets or sets the key of the concept which specifies the mood of the act.            (see: {@link ActMoodKeys} for values)
 * @property {string} reasonConcept            Gets or sets the key of the concept which defines the reason why the act is or didn't occur            (see: {@link ActReasonKeys} for values)
 * @property {string} statusConcept            Gets or sets the key of the concept which describes the current status of the act            (see: {@link StatusKeys} for values)
 * @property {string} typeConcept            Gets or sets the key of the conccept which further classifies the type of act occurring            
 * @property {Concept} classConceptModel [Delay loaded from classConcept],             Gets or sets the concept which classifies the type of act            
 * @property {Concept} moodConceptModel [Delay loaded from moodConcept],             Gets or sets the concept which specifies the mood of the act            
 * @property {Concept} reasonConceptModel [Delay loaded from reasonConcept],             Gets or sets the concept which indicates the reason of the act            
 * @property {Concept} statusConceptModel [Delay loaded from statusConcept],             Gets or sets the current status concept of the act            
 * @property {Concept} typeConceptModel [Delay loaded from typeConcept],             Type concept identifier            
 * @property {object} identifier            Gets or sets the identifiers by which this act is known as in other systems            
 * @property {ActIdentifier} identifier.classifier  where classifier is from {@link IdentifierBase} authority
 * @property {object} relationship            Gets a list of all associated acts for this act            
 * @property {ActRelationship} relationship.Appends             Indicates that the source act appends information contained in the target act            
 * @property {ActRelationship} relationship.Arrival             Links the transortation act from another act            
 * @property {ActRelationship} relationship.Departure             Links a transporation act from another act indicating departure of the subject            
 * @property {ActRelationship} relationship.Documents             The source act documents the target act            
 * @property {ActRelationship} relationship.EpisodeLink             Links two instances of the same act over time (example: chronic conditions)            
 * @property {ActRelationship} relationship.Evaluates             Used to link a goal to an observation            
 * @property {ActRelationship} relationship.Fulfills             Indicates that the source act fulfills the target act            
 * @property {ActRelationship} relationship.HasAuthorization             Indicates that the target act authorizes the source act            
 * @property {ActRelationship} relationship.HasComponent             Indicates that the target act is a component of the source act            
 * @property {ActRelationship} relationship.HasControlVariable             Relationship from an act to one or more control variables (for example: device settings, or environment)            
 * @property {ActRelationship} relationship.HasManifestation             The assertion that a new observation may be a manifestation of another            
 * @property {ActRelationship} relationship.HasPrecondition             Indicates that the target act is a pre-condition of the source act            
 * @property {ActRelationship} relationship.HasReason             Indicates a reasoning as to why the source act is occurring            
 * @property {ActRelationship} relationship.HasReferenceValues             Indicates that the source act contains reference values from the target            
 * @property {ActRelationship} relationship.HasSubject             Indicates the subject of a particular act (example: clinical act is a subject of a control act)            
 * @property {ActRelationship} relationship.HasSupport             Indicates an existing act is suggesting evidence for a new observation.            
 * @property {ActRelationship} relationship.IsCauseOf             Indicates that the source act is the cause of the target act            
 * @property {ActRelationship} relationship.IsDerivedFrom             Indicates the source act is derived from information contained in the target act            
 * @property {ActRelationship} relationship.IsExcerptOf             Indicates that the source act is an excerpt of the target act            
 * @property {ActRelationship} relationship.RefersTo             Indicates that the source act refers to the target act            
 * @property {ActRelationship} relationship.Replaces             The source act replaces the target act            
 * @property {ActRelationship} relationship.StartsAfterStartOf             Indicates that the source act starts after the start of another act            
 * @property {ActRelationship} relationship.Transforms             Indicates that the source act transforms the target act            
 * @property {ActRelationship} relationship.$other Unclassified
 * @property {SecurityPolicyInstance} policy            Gets or sets the security policy instances associated with the act            
 * @property {object} extension            Gets a list of all extensions associated with the act            
 * @property {string} extension.classifier  where classifier is from {@link Extension} extensionType
 * @property {string} note            Gets a list of all notes associated with the act            
 * @property {object} tag            Gets a list of all tags associated with the act            
 * @property {string} tag.classifier  where classifier is from {@link Tag} key
 * @property {ActProtocol} protocol            Identifies protocols attached to the act            
 * @property {object} participation            Gets or sets the entities and participations they play in the act            
 * @property {ActParticipation} participation.Admitter             The player entity was the person who was responsible for admitting the patient into a facility or care scenario.            
 * @property {ActParticipation} participation.Attender             The player entity represents the attending physician for the patient            
 * @property {ActParticipation} participation.Authenticator             The player entity represents an entity which authenticates the provision of care            
 * @property {ActParticipation} participation.Authororiginator             The player entity is responsible for the creation of data described in the act            
 * @property {ActParticipation} participation.Baby             The player is a resultant person in that it was the baby             
 * @property {ActParticipation} participation.Beneficiary             The player is a beneficiary of the act such a receiver of a financial instrument, or other good            
 * @property {ActParticipation} participation.CallbackContact             The player entity represents something that should be contacted upon completion of the act            
 * @property {ActParticipation} participation.CausativeAgent             The player entity is an agent which caused the act to occur            
 * @property {ActParticipation} participation.Consultant             The player entity is acting as a consult to the carrying out of the act            
 * @property {ActParticipation} participation.Consumable             The player entity was or is to be consumed during the process of carrying out the act.            
 * @property {ActParticipation} participation.CoverageTarget             The player entity represents the target coverage entity of the act            
 * @property {ActParticipation} participation.Custodian             The player entity is the data custodian of the act (is responsible for storing and securing the act)            
 * @property {ActParticipation} participation.DataEnterer             The player entity represents the person or device which phisically entered the data at the terminal            
 * @property {ActParticipation} participation.Destination             The player etity represents the ultimate destination of the goods/materials/services described in the act            
 * @property {ActParticipation} participation.Device             The player entity represents the device on which the act or data from the act was acquired or recorded            
 * @property {ActParticipation} participation.DirectTarget             The player entity represents the directed target of care provided in the act            
 * @property {ActParticipation} participation.Discharger             The player entity represents the person who is responsible for the discharging of the patient from an encounter            
 * @property {ActParticipation} participation.Distributor             The player entity is the source distribution point for the financial or material instruments contained in the message            
 * @property {ActParticipation} participation.Donor             The player entity represents the donor of tissue or materials used in the act            
 * @property {ActParticipation} participation.EntryLocation             The location where the act was entered.            
 * @property {ActParticipation} participation.Escort             The player entity was responsible for escorting the patient during the course of the act            
 * @property {ActParticipation} participation.Exposure             The player entity something to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureAgent             The player entity represents the agent (material) to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureSource             The player entity describes the source of the material to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureTarget             The player entity describes the target to which the agent was exposed            
 * @property {ActParticipation} participation.GuarantorParty             The player represents a party which is used as a financial guarantor for payment in the carrying out of the act            
 * @property {ActParticipation} participation.Holder             The player is responsible for holding the act            
 * @property {ActParticipation} participation.IndirectTarget             The entity not directly present in the act but which will be the focust of th act.            
 * @property {ActParticipation} participation.Informant             The player was a person or device which informed data presented in the act. (Example: A mother telling a nurse that their child had a reaction)            
 * @property {ActParticipation} participation.InformationRecipient             The player entity represents something that should be cc'ed on the act            
 * @property {ActParticipation} participation.LegalAuthenticator             The player entity is responsible for legally authenticating the content of the act            
 * @property {ActParticipation} participation.Location             The location where the service was performed.            
 * @property {ActParticipation} participation.NonreuseableDevice             The player represents a consumable that can no longer be used            
 * @property {ActParticipation} participation.Origin             The player represents the origin of the act            
 * @property {ActParticipation} participation.Participation             The player entity participates in the act in no particular classification            
 * @property {ActParticipation} participation.Performer             The player entity is responsible for performing the clinical steps documented in the act            
 * @property {ActParticipation} participation.PrimaryInformationRecipient             The player entity represents a high priority contact which should be informed or cc'ed on the act            
 * @property {ActParticipation} participation.PrimaryPerformer             The player entity was the primary performer of the act. This is used in procedures where more than one performer is present            
 * @property {ActParticipation} participation.Product             The player represents a product that is not necessarily consumed but informs the act            
 * @property {ActParticipation} participation.Receiver             The player represents the entity which is the intended receiver of the act            
 * @property {ActParticipation} participation.RecordTarget             The player represents the entity to which the act is recorded against            
 * @property {ActParticipation} participation.ReferredBy             The player represents the entity which referred the act or caused the act to be undertaken            
 * @property {ActParticipation} participation.ReferredTo             The player entity represents the entity which was referred to            
 * @property {ActParticipation} participation.Referrer             The player entity represents the person who was originally the referrer.            
 * @property {ActParticipation} participation.Remote             The player entity represents a remote portion of the act            
 * @property {ActParticipation} participation.ResponsibleParty             The player entity is ultimately responsible for the carrying out of the act            
 * @property {ActParticipation} participation.ReusableDevice             The player entity represents a device which can be reused in future acts            
 * @property {ActParticipation} participation.SecondaryPerformer             The secondary performing person (support clinician).            
 * @property {ActParticipation} participation.Specimen             The player entity represents a specimen collected for the purpose of testing and diagnosis            
 * @property {ActParticipation} participation.Subject             The player entity is the subject of an act, but not necessarily the record target (meaning the act is about a particular entity but not to be attached to their record)            
 * @property {ActParticipation} participation.Tracker             The player entity is responsible for tracking the progress of the act            
 * @property {ActParticipation} participation.Transcriber             The person who transcribed data from the original act.            
 * @property {ActParticipation} participation.UgentNotificationContact             The player entity represents a contact entity in case of an emergency occurs during the act.            
 * @property {ActParticipation} participation.Verifier             The player entity was responsible for verifying the accuracy of the data in the act            
 * @property {ActParticipation} participation.Via             The player entity represents an entity where the act occurred "via" this entity (i.e. in transport)            
 * @property {ActParticipation} participation.Witness             The player entity represents a legal witness to the act occurring.            
 * @property {ActParticipation} participation.$other Unclassified
 * @property {string} previousVersion
 * @property {string} version
 * @property {number} sequence
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {Act} copyData Copy constructor (if present)
 */
function Act (copyData) { 
	this.$type = 'Act';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {number} */
	this.sequence = copyData.sequence;
	/** @type {string} */
	this.version = copyData.version;
	/** @type {string} */
	this.previousVersion = copyData.previousVersion;
	/** @type {object} */
	this.participation = copyData.participation;
	/** @type {ActProtocol} */
	this.protocol = copyData.protocol;
	/** @type {object} */
	this.tag = copyData.tag;
	/** @type {string} */
	this.note = copyData.note;
	/** @type {object} */
	this.extension = copyData.extension;
	/** @type {SecurityPolicyInstance} */
	this.policy = copyData.policy;
	/** @type {object} */
	this.relationship = copyData.relationship;
	/** @type {object} */
	this.identifier = copyData.identifier;
	/** @type {Concept} */
	this.typeConceptModel = copyData.typeConceptModel;
	/** @type {Concept} */
	this.statusConceptModel = copyData.statusConceptModel;
	/** @type {Concept} */
	this.reasonConceptModel = copyData.reasonConceptModel;
	/** @type {Concept} */
	this.moodConceptModel = copyData.moodConceptModel;
	/** @type {Concept} */
	this.classConceptModel = copyData.classConceptModel;
	/** @type {string} */
	this.typeConcept = copyData.typeConcept;
	/** @type {string} */
	this.statusConcept = copyData.statusConcept;
	/** @type {string} */
	this.reasonConcept = copyData.reasonConcept;
	/** @type {string} */
	this.moodConcept = copyData.moodConcept;
	/** @type {string} */
	this.classConcept = copyData.classConcept;
	/** @type {Date} */
	this.stopTime = copyData.stopTime;
	/** @type {Date} */
	this.startTime = copyData.startTime;
	/** @type {Date} */
	this.actTime = copyData.actTime;
	/** @type {TemplateDefinition} */
	this.templateModel = copyData.templateModel;
	/** @type {string} */
	this.template = copyData.template;
	/** @type {boolean} */
	this.isNegated = copyData.isNegated;
	}
}  // Act 
// SanteDB.Core.Model.Acts.ActParticipation, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ActParticipation)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Associates an entity which participates in an act            
 * @description 
 *             An act participation instance is used to link an  entity instance to an  act instance. It is said that the
 *             player  participates in the act  in a particular role .
 *             
 *             Act participations can also be quantified. For example, if 100 doses of a particlar material  were consumed
 *             as part of an act, then the quantity would be 100.
 *             
 * @property {string} player            Gets or sets the target entity reference            
 * @property {string} participationRole            Gets or sets the participation role key            (see: {@link ActParticipationKey} for values)
 * @property {Entity} playerModel [Delay loaded from player],             Gets or sets the entity which participated in the act            
 * @property {Concept} participationRoleModel [Delay loaded from participationRole],             Gets or sets the role that the entity played in participating in the act            
 * @property {string} act            The entity that this relationship targets            
 * @property {Act} actModel [Delay loaded from act],             The entity that this relationship targets            
 * @property {number} quantity            Gets or sets the quantity of player in the act            
 * @property {number} effectiveVersionSequence
 * @property {number} obsoleteVersionSequence
 * @property {Date} modifiedOn
 * @property {string} source
 * @property {Act} sourceModel [Delay loaded from source], 
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {ActParticipation} copyData Copy constructor (if present)
 */
function ActParticipation (copyData) { 
	this.$type = 'ActParticipation';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {Act} */
	this.sourceModel = copyData.sourceModel;
	/** @type {string} */
	this.source = copyData.source;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {number} */
	this.obsoleteVersionSequence = copyData.obsoleteVersionSequence;
	/** @type {number} */
	this.effectiveVersionSequence = copyData.effectiveVersionSequence;
	/** @type {number} */
	this.quantity = copyData.quantity;
	/** @type {Act} */
	this.actModel = copyData.actModel;
	/** @type {string} */
	this.act = copyData.act;
	/** @type {Concept} */
	this.participationRoleModel = copyData.participationRoleModel;
	/** @type {Entity} */
	this.playerModel = copyData.playerModel;
	/** @type {string} */
	this.participationRole = copyData.participationRole;
	/** @type {string} */
	this.player = copyData.player;
	}
}  // ActParticipation 
// SanteDB.Core.Model.Acts.ActProtocol, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ActProtocol)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents information related to the clinical protocol to which an act is a member of            
 * @description 
 *             The  class is used to link an act instance  with the clinical 
 *             protocol  to which the act belongs.
 *             
 * @property {string} protocol            Gets or sets the protocol  to which this act belongs            
 * @property {Protocol} protocolModel [Delay loaded from protocol],             Gets or sets the protocol data related to the protocol            
 * @property {number} sequence            Represents the sequence of the act in the protocol            
 * @property {Array<byte>} state            Represents any state data related to the act / protocol link            
 * @property {Date} modifiedOn
 * @property {string} source
 * @property {Act} sourceModel [Delay loaded from source], 
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {ActProtocol} copyData Copy constructor (if present)
 */
function ActProtocol (copyData) { 
	this.$type = 'ActProtocol';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {Act} */
	this.sourceModel = copyData.sourceModel;
	/** @type {string} */
	this.source = copyData.source;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {Array<byte>} */
	this.state = copyData.state;
	/** @type {number} */
	this.sequence = copyData.sequence;
	/** @type {Protocol} */
	this.protocolModel = copyData.protocolModel;
	/** @type {string} */
	this.protocol = copyData.protocol;
	}
}  // ActProtocol 
// SanteDB.Core.Model.Acts.ActRelationship, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ActRelationship)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Used to link two or more acts together            
 * @description 
 *             An act relationship is used to link a source act with a target act  in a particular type of 
 *             relationship . This structure is often used to link together sub-components of an 
 *             encounter with the encounter, but can also be used to link together chronic care episodes.
 *             
 * @property {string} target            The target of the association            
 * @property {Act} targetModel [Delay loaded from target],             Target act reference            
 * @property {string} relationshipType            Association type key            (see: {@link ActRelationshipTypeKeys} for values)
 * @property {Concept} relationshipTypeModel [Delay loaded from relationshipType],             Gets or sets the association type            
 * @property {number} effectiveVersionSequence
 * @property {number} obsoleteVersionSequence
 * @property {Date} modifiedOn
 * @property {string} source
 * @property {Act} sourceModel [Delay loaded from source], 
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {ActRelationship} copyData Copy constructor (if present)
 */
function ActRelationship (copyData) { 
	this.$type = 'ActRelationship';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {Act} */
	this.sourceModel = copyData.sourceModel;
	/** @type {string} */
	this.source = copyData.source;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {number} */
	this.obsoleteVersionSequence = copyData.obsoleteVersionSequence;
	/** @type {number} */
	this.effectiveVersionSequence = copyData.effectiveVersionSequence;
	/** @type {Concept} */
	this.relationshipTypeModel = copyData.relationshipTypeModel;
	/** @type {string} */
	this.relationshipType = copyData.relationshipType;
	/** @type {Act} */
	this.targetModel = copyData.targetModel;
	/** @type {string} */
	this.target = copyData.target;
	}
}  // ActRelationship 
// SanteDB.Core.Model.Acts.CarePlan, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!CarePlan)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents a care plan            
 * @description 
 *             The care plan object is used to represent a collection of clinical protocols which the care planning
 *             engine proposes should be done as part of the patient's course of care.
 *             
 * @property {Patient} target            Target of the careplan            
 * @property {object} act            Action to take            
 * @property {Act} act.AccountManagement             The act represents generic account management such as adjudications, financial adjustments, stock counting, etc.            
 * @property {Act} act.Act             The act represents a generic act which has no special classification            
 * @property {Act} act.Battery             The act represents a simple battery of procedures/administrations/tests/etc.            
 * @property {Act} act.CareProvision             The act represents some provision of care such as the seeking out services.            
 * @property {Act} act.Condition             The act represents a problem or condition which the patient is suffering from.            
 * @property {Act} act.ControlAct             The control act event key is used to describe an infrastructural act which has no clinical meaning but can be used to wrap technical details.            
 * @property {Act} act.Encounter             The act represents an encounter such as the patient presenting for care and receiving services during a visit.            
 * @property {Act} act.Inform             The act represents an attempt to provide additional clinical information.            
 * @property {Act} act.Observation             The act represents an observation that is made about a patient such as a vital sign, an allergy, cause of death, etc..            
 * @property {Act} act.Procedure             The act represents a procedure (something done to a patient).            
 * @property {Act} act.Registration             The act represents a registration event such as the registration of a patient.            
 * @property {Act} act.SubstanceAdministration             The act represents that a substance (medication, or otherwise) was, should, or will be administered to the patient.            
 * @property {Act} act.Supply             The act represents a supply of some material or financial instrument between entities.            
 * @property {Act} act.Transport             The physical transporting of materials or people from one place to another.            
 * @property {Act} act.$other Unclassified
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {CarePlan} copyData Copy constructor (if present)
 */
function CarePlan (copyData) { 
	this.$type = 'CarePlan';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {object} */
	this.act = copyData.act;
	/** @type {Patient} */
	this.target = copyData.target;
	}
}  // CarePlan 
// SanteDB.Core.Model.Acts.ControlAct, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ControlAct)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends Act
 * @summary             Represents an act which indicates why data was created/changed            
 * @property {boolean} isNegated            Gets or sets an indicator which identifies whether the act actually occurred, or            specifically did not occur            
 * @property {string} template            Gets the template key            
 * @property {TemplateDefinition} templateModel [Delay loaded from template],             Gets or sets the template definition            
 * @property {Date} actTime            Gets or sets the creation time in XML format            
 * @property {Date} startTime            Gets or sets the creation time in XML format            
 * @property {Date} stopTime            Gets or sets the creation time in XML format            
 * @property {string} classConcept            Gets or sets the key of the concept which classifies the act.            (see: {@link ActClassKeys} for values)
 * @property {string} moodConcept            Gets or sets the key of the concept which specifies the mood of the act.            (see: {@link ActMoodKeys} for values)
 * @property {string} reasonConcept            Gets or sets the key of the concept which defines the reason why the act is or didn't occur            (see: {@link ActReasonKeys} for values)
 * @property {string} statusConcept            Gets or sets the key of the concept which describes the current status of the act            (see: {@link StatusKeys} for values)
 * @property {string} typeConcept            Gets or sets the key of the conccept which further classifies the type of act occurring            
 * @property {Concept} classConceptModel [Delay loaded from classConcept],             Gets or sets the concept which classifies the type of act            
 * @property {Concept} moodConceptModel [Delay loaded from moodConcept],             Gets or sets the concept which specifies the mood of the act            
 * @property {Concept} reasonConceptModel [Delay loaded from reasonConcept],             Gets or sets the concept which indicates the reason of the act            
 * @property {Concept} statusConceptModel [Delay loaded from statusConcept],             Gets or sets the current status concept of the act            
 * @property {Concept} typeConceptModel [Delay loaded from typeConcept],             Type concept identifier            
 * @property {object} identifier            Gets or sets the identifiers by which this act is known as in other systems            
 * @property {ActIdentifier} identifier.classifier  where classifier is from {@link IdentifierBase} authority
 * @property {object} relationship            Gets a list of all associated acts for this act            
 * @property {ActRelationship} relationship.Appends             Indicates that the source act appends information contained in the target act            
 * @property {ActRelationship} relationship.Arrival             Links the transortation act from another act            
 * @property {ActRelationship} relationship.Departure             Links a transporation act from another act indicating departure of the subject            
 * @property {ActRelationship} relationship.Documents             The source act documents the target act            
 * @property {ActRelationship} relationship.EpisodeLink             Links two instances of the same act over time (example: chronic conditions)            
 * @property {ActRelationship} relationship.Evaluates             Used to link a goal to an observation            
 * @property {ActRelationship} relationship.Fulfills             Indicates that the source act fulfills the target act            
 * @property {ActRelationship} relationship.HasAuthorization             Indicates that the target act authorizes the source act            
 * @property {ActRelationship} relationship.HasComponent             Indicates that the target act is a component of the source act            
 * @property {ActRelationship} relationship.HasControlVariable             Relationship from an act to one or more control variables (for example: device settings, or environment)            
 * @property {ActRelationship} relationship.HasManifestation             The assertion that a new observation may be a manifestation of another            
 * @property {ActRelationship} relationship.HasPrecondition             Indicates that the target act is a pre-condition of the source act            
 * @property {ActRelationship} relationship.HasReason             Indicates a reasoning as to why the source act is occurring            
 * @property {ActRelationship} relationship.HasReferenceValues             Indicates that the source act contains reference values from the target            
 * @property {ActRelationship} relationship.HasSubject             Indicates the subject of a particular act (example: clinical act is a subject of a control act)            
 * @property {ActRelationship} relationship.HasSupport             Indicates an existing act is suggesting evidence for a new observation.            
 * @property {ActRelationship} relationship.IsCauseOf             Indicates that the source act is the cause of the target act            
 * @property {ActRelationship} relationship.IsDerivedFrom             Indicates the source act is derived from information contained in the target act            
 * @property {ActRelationship} relationship.IsExcerptOf             Indicates that the source act is an excerpt of the target act            
 * @property {ActRelationship} relationship.RefersTo             Indicates that the source act refers to the target act            
 * @property {ActRelationship} relationship.Replaces             The source act replaces the target act            
 * @property {ActRelationship} relationship.StartsAfterStartOf             Indicates that the source act starts after the start of another act            
 * @property {ActRelationship} relationship.Transforms             Indicates that the source act transforms the target act            
 * @property {ActRelationship} relationship.$other Unclassified
 * @property {SecurityPolicyInstance} policy            Gets or sets the security policy instances associated with the act            
 * @property {object} extension            Gets a list of all extensions associated with the act            
 * @property {string} extension.classifier  where classifier is from {@link Extension} extensionType
 * @property {string} note            Gets a list of all notes associated with the act            
 * @property {object} tag            Gets a list of all tags associated with the act            
 * @property {string} tag.classifier  where classifier is from {@link Tag} key
 * @property {ActProtocol} protocol            Identifies protocols attached to the act            
 * @property {object} participation            Gets or sets the entities and participations they play in the act            
 * @property {ActParticipation} participation.Admitter             The player entity was the person who was responsible for admitting the patient into a facility or care scenario.            
 * @property {ActParticipation} participation.Attender             The player entity represents the attending physician for the patient            
 * @property {ActParticipation} participation.Authenticator             The player entity represents an entity which authenticates the provision of care            
 * @property {ActParticipation} participation.Authororiginator             The player entity is responsible for the creation of data described in the act            
 * @property {ActParticipation} participation.Baby             The player is a resultant person in that it was the baby             
 * @property {ActParticipation} participation.Beneficiary             The player is a beneficiary of the act such a receiver of a financial instrument, or other good            
 * @property {ActParticipation} participation.CallbackContact             The player entity represents something that should be contacted upon completion of the act            
 * @property {ActParticipation} participation.CausativeAgent             The player entity is an agent which caused the act to occur            
 * @property {ActParticipation} participation.Consultant             The player entity is acting as a consult to the carrying out of the act            
 * @property {ActParticipation} participation.Consumable             The player entity was or is to be consumed during the process of carrying out the act.            
 * @property {ActParticipation} participation.CoverageTarget             The player entity represents the target coverage entity of the act            
 * @property {ActParticipation} participation.Custodian             The player entity is the data custodian of the act (is responsible for storing and securing the act)            
 * @property {ActParticipation} participation.DataEnterer             The player entity represents the person or device which phisically entered the data at the terminal            
 * @property {ActParticipation} participation.Destination             The player etity represents the ultimate destination of the goods/materials/services described in the act            
 * @property {ActParticipation} participation.Device             The player entity represents the device on which the act or data from the act was acquired or recorded            
 * @property {ActParticipation} participation.DirectTarget             The player entity represents the directed target of care provided in the act            
 * @property {ActParticipation} participation.Discharger             The player entity represents the person who is responsible for the discharging of the patient from an encounter            
 * @property {ActParticipation} participation.Distributor             The player entity is the source distribution point for the financial or material instruments contained in the message            
 * @property {ActParticipation} participation.Donor             The player entity represents the donor of tissue or materials used in the act            
 * @property {ActParticipation} participation.EntryLocation             The location where the act was entered.            
 * @property {ActParticipation} participation.Escort             The player entity was responsible for escorting the patient during the course of the act            
 * @property {ActParticipation} participation.Exposure             The player entity something to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureAgent             The player entity represents the agent (material) to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureSource             The player entity describes the source of the material to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureTarget             The player entity describes the target to which the agent was exposed            
 * @property {ActParticipation} participation.GuarantorParty             The player represents a party which is used as a financial guarantor for payment in the carrying out of the act            
 * @property {ActParticipation} participation.Holder             The player is responsible for holding the act            
 * @property {ActParticipation} participation.IndirectTarget             The entity not directly present in the act but which will be the focust of th act.            
 * @property {ActParticipation} participation.Informant             The player was a person or device which informed data presented in the act. (Example: A mother telling a nurse that their child had a reaction)            
 * @property {ActParticipation} participation.InformationRecipient             The player entity represents something that should be cc'ed on the act            
 * @property {ActParticipation} participation.LegalAuthenticator             The player entity is responsible for legally authenticating the content of the act            
 * @property {ActParticipation} participation.Location             The location where the service was performed.            
 * @property {ActParticipation} participation.NonreuseableDevice             The player represents a consumable that can no longer be used            
 * @property {ActParticipation} participation.Origin             The player represents the origin of the act            
 * @property {ActParticipation} participation.Participation             The player entity participates in the act in no particular classification            
 * @property {ActParticipation} participation.Performer             The player entity is responsible for performing the clinical steps documented in the act            
 * @property {ActParticipation} participation.PrimaryInformationRecipient             The player entity represents a high priority contact which should be informed or cc'ed on the act            
 * @property {ActParticipation} participation.PrimaryPerformer             The player entity was the primary performer of the act. This is used in procedures where more than one performer is present            
 * @property {ActParticipation} participation.Product             The player represents a product that is not necessarily consumed but informs the act            
 * @property {ActParticipation} participation.Receiver             The player represents the entity which is the intended receiver of the act            
 * @property {ActParticipation} participation.RecordTarget             The player represents the entity to which the act is recorded against            
 * @property {ActParticipation} participation.ReferredBy             The player represents the entity which referred the act or caused the act to be undertaken            
 * @property {ActParticipation} participation.ReferredTo             The player entity represents the entity which was referred to            
 * @property {ActParticipation} participation.Referrer             The player entity represents the person who was originally the referrer.            
 * @property {ActParticipation} participation.Remote             The player entity represents a remote portion of the act            
 * @property {ActParticipation} participation.ResponsibleParty             The player entity is ultimately responsible for the carrying out of the act            
 * @property {ActParticipation} participation.ReusableDevice             The player entity represents a device which can be reused in future acts            
 * @property {ActParticipation} participation.SecondaryPerformer             The secondary performing person (support clinician).            
 * @property {ActParticipation} participation.Specimen             The player entity represents a specimen collected for the purpose of testing and diagnosis            
 * @property {ActParticipation} participation.Subject             The player entity is the subject of an act, but not necessarily the record target (meaning the act is about a particular entity but not to be attached to their record)            
 * @property {ActParticipation} participation.Tracker             The player entity is responsible for tracking the progress of the act            
 * @property {ActParticipation} participation.Transcriber             The person who transcribed data from the original act.            
 * @property {ActParticipation} participation.UgentNotificationContact             The player entity represents a contact entity in case of an emergency occurs during the act.            
 * @property {ActParticipation} participation.Verifier             The player entity was responsible for verifying the accuracy of the data in the act            
 * @property {ActParticipation} participation.Via             The player entity represents an entity where the act occurred "via" this entity (i.e. in transport)            
 * @property {ActParticipation} participation.Witness             The player entity represents a legal witness to the act occurring.            
 * @property {ActParticipation} participation.$other Unclassified
 * @property {string} previousVersion
 * @property {string} version
 * @property {number} sequence
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {ControlAct} copyData Copy constructor (if present)
 */
function ControlAct (copyData) { 
	this.$type = 'ControlAct';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {number} */
	this.sequence = copyData.sequence;
	/** @type {string} */
	this.version = copyData.version;
	/** @type {string} */
	this.previousVersion = copyData.previousVersion;
	/** @type {object} */
	this.participation = copyData.participation;
	/** @type {ActProtocol} */
	this.protocol = copyData.protocol;
	/** @type {object} */
	this.tag = copyData.tag;
	/** @type {string} */
	this.note = copyData.note;
	/** @type {object} */
	this.extension = copyData.extension;
	/** @type {SecurityPolicyInstance} */
	this.policy = copyData.policy;
	/** @type {object} */
	this.relationship = copyData.relationship;
	/** @type {object} */
	this.identifier = copyData.identifier;
	/** @type {Concept} */
	this.typeConceptModel = copyData.typeConceptModel;
	/** @type {Concept} */
	this.statusConceptModel = copyData.statusConceptModel;
	/** @type {Concept} */
	this.reasonConceptModel = copyData.reasonConceptModel;
	/** @type {Concept} */
	this.moodConceptModel = copyData.moodConceptModel;
	/** @type {Concept} */
	this.classConceptModel = copyData.classConceptModel;
	/** @type {string} */
	this.typeConcept = copyData.typeConcept;
	/** @type {string} */
	this.statusConcept = copyData.statusConcept;
	/** @type {string} */
	this.reasonConcept = copyData.reasonConcept;
	/** @type {string} */
	this.moodConcept = copyData.moodConcept;
	/** @type {string} */
	this.classConcept = copyData.classConcept;
	/** @type {Date} */
	this.stopTime = copyData.stopTime;
	/** @type {Date} */
	this.startTime = copyData.startTime;
	/** @type {Date} */
	this.actTime = copyData.actTime;
	/** @type {TemplateDefinition} */
	this.templateModel = copyData.templateModel;
	/** @type {string} */
	this.template = copyData.template;
	/** @type {boolean} */
	this.isNegated = copyData.isNegated;
	}
}  // ControlAct 
// SanteDB.Core.Model.Acts.Observation, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!Observation)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends Act
 * @summary             Represents a act () which is an observation            
 * @description 
 *             The observation class itself is an abstract class which is generically used to represent something that is observed about a patient.
 *             
 *             It is not recommended to use this class directly, rather one of its sub classes based on the type of observation being made such as:
 *             Coded observation  for observations whose values are codified (example: blood type, presentation, etc.), Quantity observations  for observations whose values are quantified values (example: weight, height, etc.), Text observations  for observations whose values are textual in nature.
 *             No matter what type of value an observation carries (coded, quantity, text) it is always classified by the type concept .
 *             
 * @property {string} interpretationConcept            Gets or sets the interpretation concept            
 * @property {string} valueType            Value type            
 * @property {Concept} interpretationConceptModel [Delay loaded from interpretationConcept],             Gets or sets the concept which indicates the interpretation of the observtion            
 * @property {boolean} isNegated            Gets or sets an indicator which identifies whether the act actually occurred, or            specifically did not occur            
 * @property {string} template            Gets the template key            
 * @property {TemplateDefinition} templateModel [Delay loaded from template],             Gets or sets the template definition            
 * @property {Date} actTime            Gets or sets the creation time in XML format            
 * @property {Date} startTime            Gets or sets the creation time in XML format            
 * @property {Date} stopTime            Gets or sets the creation time in XML format            
 * @property {string} classConcept            Gets or sets the key of the concept which classifies the act.            (see: {@link ActClassKeys} for values)
 * @property {string} moodConcept            Gets or sets the key of the concept which specifies the mood of the act.            (see: {@link ActMoodKeys} for values)
 * @property {string} reasonConcept            Gets or sets the key of the concept which defines the reason why the act is or didn't occur            (see: {@link ActReasonKeys} for values)
 * @property {string} statusConcept            Gets or sets the key of the concept which describes the current status of the act            (see: {@link StatusKeys} for values)
 * @property {string} typeConcept            Gets or sets the key of the conccept which further classifies the type of act occurring            
 * @property {Concept} classConceptModel [Delay loaded from classConcept],             Gets or sets the concept which classifies the type of act            
 * @property {Concept} moodConceptModel [Delay loaded from moodConcept],             Gets or sets the concept which specifies the mood of the act            
 * @property {Concept} reasonConceptModel [Delay loaded from reasonConcept],             Gets or sets the concept which indicates the reason of the act            
 * @property {Concept} statusConceptModel [Delay loaded from statusConcept],             Gets or sets the current status concept of the act            
 * @property {Concept} typeConceptModel [Delay loaded from typeConcept],             Type concept identifier            
 * @property {object} identifier            Gets or sets the identifiers by which this act is known as in other systems            
 * @property {ActIdentifier} identifier.classifier  where classifier is from {@link IdentifierBase} authority
 * @property {object} relationship            Gets a list of all associated acts for this act            
 * @property {ActRelationship} relationship.Appends             Indicates that the source act appends information contained in the target act            
 * @property {ActRelationship} relationship.Arrival             Links the transortation act from another act            
 * @property {ActRelationship} relationship.Departure             Links a transporation act from another act indicating departure of the subject            
 * @property {ActRelationship} relationship.Documents             The source act documents the target act            
 * @property {ActRelationship} relationship.EpisodeLink             Links two instances of the same act over time (example: chronic conditions)            
 * @property {ActRelationship} relationship.Evaluates             Used to link a goal to an observation            
 * @property {ActRelationship} relationship.Fulfills             Indicates that the source act fulfills the target act            
 * @property {ActRelationship} relationship.HasAuthorization             Indicates that the target act authorizes the source act            
 * @property {ActRelationship} relationship.HasComponent             Indicates that the target act is a component of the source act            
 * @property {ActRelationship} relationship.HasControlVariable             Relationship from an act to one or more control variables (for example: device settings, or environment)            
 * @property {ActRelationship} relationship.HasManifestation             The assertion that a new observation may be a manifestation of another            
 * @property {ActRelationship} relationship.HasPrecondition             Indicates that the target act is a pre-condition of the source act            
 * @property {ActRelationship} relationship.HasReason             Indicates a reasoning as to why the source act is occurring            
 * @property {ActRelationship} relationship.HasReferenceValues             Indicates that the source act contains reference values from the target            
 * @property {ActRelationship} relationship.HasSubject             Indicates the subject of a particular act (example: clinical act is a subject of a control act)            
 * @property {ActRelationship} relationship.HasSupport             Indicates an existing act is suggesting evidence for a new observation.            
 * @property {ActRelationship} relationship.IsCauseOf             Indicates that the source act is the cause of the target act            
 * @property {ActRelationship} relationship.IsDerivedFrom             Indicates the source act is derived from information contained in the target act            
 * @property {ActRelationship} relationship.IsExcerptOf             Indicates that the source act is an excerpt of the target act            
 * @property {ActRelationship} relationship.RefersTo             Indicates that the source act refers to the target act            
 * @property {ActRelationship} relationship.Replaces             The source act replaces the target act            
 * @property {ActRelationship} relationship.StartsAfterStartOf             Indicates that the source act starts after the start of another act            
 * @property {ActRelationship} relationship.Transforms             Indicates that the source act transforms the target act            
 * @property {ActRelationship} relationship.$other Unclassified
 * @property {SecurityPolicyInstance} policy            Gets or sets the security policy instances associated with the act            
 * @property {object} extension            Gets a list of all extensions associated with the act            
 * @property {string} extension.classifier  where classifier is from {@link Extension} extensionType
 * @property {string} note            Gets a list of all notes associated with the act            
 * @property {object} tag            Gets a list of all tags associated with the act            
 * @property {string} tag.classifier  where classifier is from {@link Tag} key
 * @property {ActProtocol} protocol            Identifies protocols attached to the act            
 * @property {object} participation            Gets or sets the entities and participations they play in the act            
 * @property {ActParticipation} participation.Admitter             The player entity was the person who was responsible for admitting the patient into a facility or care scenario.            
 * @property {ActParticipation} participation.Attender             The player entity represents the attending physician for the patient            
 * @property {ActParticipation} participation.Authenticator             The player entity represents an entity which authenticates the provision of care            
 * @property {ActParticipation} participation.Authororiginator             The player entity is responsible for the creation of data described in the act            
 * @property {ActParticipation} participation.Baby             The player is a resultant person in that it was the baby             
 * @property {ActParticipation} participation.Beneficiary             The player is a beneficiary of the act such a receiver of a financial instrument, or other good            
 * @property {ActParticipation} participation.CallbackContact             The player entity represents something that should be contacted upon completion of the act            
 * @property {ActParticipation} participation.CausativeAgent             The player entity is an agent which caused the act to occur            
 * @property {ActParticipation} participation.Consultant             The player entity is acting as a consult to the carrying out of the act            
 * @property {ActParticipation} participation.Consumable             The player entity was or is to be consumed during the process of carrying out the act.            
 * @property {ActParticipation} participation.CoverageTarget             The player entity represents the target coverage entity of the act            
 * @property {ActParticipation} participation.Custodian             The player entity is the data custodian of the act (is responsible for storing and securing the act)            
 * @property {ActParticipation} participation.DataEnterer             The player entity represents the person or device which phisically entered the data at the terminal            
 * @property {ActParticipation} participation.Destination             The player etity represents the ultimate destination of the goods/materials/services described in the act            
 * @property {ActParticipation} participation.Device             The player entity represents the device on which the act or data from the act was acquired or recorded            
 * @property {ActParticipation} participation.DirectTarget             The player entity represents the directed target of care provided in the act            
 * @property {ActParticipation} participation.Discharger             The player entity represents the person who is responsible for the discharging of the patient from an encounter            
 * @property {ActParticipation} participation.Distributor             The player entity is the source distribution point for the financial or material instruments contained in the message            
 * @property {ActParticipation} participation.Donor             The player entity represents the donor of tissue or materials used in the act            
 * @property {ActParticipation} participation.EntryLocation             The location where the act was entered.            
 * @property {ActParticipation} participation.Escort             The player entity was responsible for escorting the patient during the course of the act            
 * @property {ActParticipation} participation.Exposure             The player entity something to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureAgent             The player entity represents the agent (material) to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureSource             The player entity describes the source of the material to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureTarget             The player entity describes the target to which the agent was exposed            
 * @property {ActParticipation} participation.GuarantorParty             The player represents a party which is used as a financial guarantor for payment in the carrying out of the act            
 * @property {ActParticipation} participation.Holder             The player is responsible for holding the act            
 * @property {ActParticipation} participation.IndirectTarget             The entity not directly present in the act but which will be the focust of th act.            
 * @property {ActParticipation} participation.Informant             The player was a person or device which informed data presented in the act. (Example: A mother telling a nurse that their child had a reaction)            
 * @property {ActParticipation} participation.InformationRecipient             The player entity represents something that should be cc'ed on the act            
 * @property {ActParticipation} participation.LegalAuthenticator             The player entity is responsible for legally authenticating the content of the act            
 * @property {ActParticipation} participation.Location             The location where the service was performed.            
 * @property {ActParticipation} participation.NonreuseableDevice             The player represents a consumable that can no longer be used            
 * @property {ActParticipation} participation.Origin             The player represents the origin of the act            
 * @property {ActParticipation} participation.Participation             The player entity participates in the act in no particular classification            
 * @property {ActParticipation} participation.Performer             The player entity is responsible for performing the clinical steps documented in the act            
 * @property {ActParticipation} participation.PrimaryInformationRecipient             The player entity represents a high priority contact which should be informed or cc'ed on the act            
 * @property {ActParticipation} participation.PrimaryPerformer             The player entity was the primary performer of the act. This is used in procedures where more than one performer is present            
 * @property {ActParticipation} participation.Product             The player represents a product that is not necessarily consumed but informs the act            
 * @property {ActParticipation} participation.Receiver             The player represents the entity which is the intended receiver of the act            
 * @property {ActParticipation} participation.RecordTarget             The player represents the entity to which the act is recorded against            
 * @property {ActParticipation} participation.ReferredBy             The player represents the entity which referred the act or caused the act to be undertaken            
 * @property {ActParticipation} participation.ReferredTo             The player entity represents the entity which was referred to            
 * @property {ActParticipation} participation.Referrer             The player entity represents the person who was originally the referrer.            
 * @property {ActParticipation} participation.Remote             The player entity represents a remote portion of the act            
 * @property {ActParticipation} participation.ResponsibleParty             The player entity is ultimately responsible for the carrying out of the act            
 * @property {ActParticipation} participation.ReusableDevice             The player entity represents a device which can be reused in future acts            
 * @property {ActParticipation} participation.SecondaryPerformer             The secondary performing person (support clinician).            
 * @property {ActParticipation} participation.Specimen             The player entity represents a specimen collected for the purpose of testing and diagnosis            
 * @property {ActParticipation} participation.Subject             The player entity is the subject of an act, but not necessarily the record target (meaning the act is about a particular entity but not to be attached to their record)            
 * @property {ActParticipation} participation.Tracker             The player entity is responsible for tracking the progress of the act            
 * @property {ActParticipation} participation.Transcriber             The person who transcribed data from the original act.            
 * @property {ActParticipation} participation.UgentNotificationContact             The player entity represents a contact entity in case of an emergency occurs during the act.            
 * @property {ActParticipation} participation.Verifier             The player entity was responsible for verifying the accuracy of the data in the act            
 * @property {ActParticipation} participation.Via             The player entity represents an entity where the act occurred "via" this entity (i.e. in transport)            
 * @property {ActParticipation} participation.Witness             The player entity represents a legal witness to the act occurring.            
 * @property {ActParticipation} participation.$other Unclassified
 * @property {string} previousVersion
 * @property {string} version
 * @property {number} sequence
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {Observation} copyData Copy constructor (if present)
 */
function Observation (copyData) { 
	this.$type = 'Observation';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {number} */
	this.sequence = copyData.sequence;
	/** @type {string} */
	this.version = copyData.version;
	/** @type {string} */
	this.previousVersion = copyData.previousVersion;
	/** @type {object} */
	this.participation = copyData.participation;
	/** @type {ActProtocol} */
	this.protocol = copyData.protocol;
	/** @type {object} */
	this.tag = copyData.tag;
	/** @type {string} */
	this.note = copyData.note;
	/** @type {object} */
	this.extension = copyData.extension;
	/** @type {SecurityPolicyInstance} */
	this.policy = copyData.policy;
	/** @type {object} */
	this.relationship = copyData.relationship;
	/** @type {object} */
	this.identifier = copyData.identifier;
	/** @type {Concept} */
	this.typeConceptModel = copyData.typeConceptModel;
	/** @type {Concept} */
	this.statusConceptModel = copyData.statusConceptModel;
	/** @type {Concept} */
	this.reasonConceptModel = copyData.reasonConceptModel;
	/** @type {Concept} */
	this.moodConceptModel = copyData.moodConceptModel;
	/** @type {Concept} */
	this.classConceptModel = copyData.classConceptModel;
	/** @type {string} */
	this.typeConcept = copyData.typeConcept;
	/** @type {string} */
	this.statusConcept = copyData.statusConcept;
	/** @type {string} */
	this.reasonConcept = copyData.reasonConcept;
	/** @type {string} */
	this.moodConcept = copyData.moodConcept;
	/** @type {string} */
	this.classConcept = copyData.classConcept;
	/** @type {Date} */
	this.stopTime = copyData.stopTime;
	/** @type {Date} */
	this.startTime = copyData.startTime;
	/** @type {Date} */
	this.actTime = copyData.actTime;
	/** @type {TemplateDefinition} */
	this.templateModel = copyData.templateModel;
	/** @type {string} */
	this.template = copyData.template;
	/** @type {boolean} */
	this.isNegated = copyData.isNegated;
	/** @type {Concept} */
	this.interpretationConceptModel = copyData.interpretationConceptModel;
	/** @type {string} */
	this.valueType = copyData.valueType;
	/** @type {string} */
	this.interpretationConcept = copyData.interpretationConcept;
	}
}  // Observation 
// SanteDB.Core.Model.Acts.QuantityObservation, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!QuantityObservation)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends Observation
 * @summary             Represents an observation that contains a quantity            
 * @description 
 *             The quantity observation class should be used whenever you wish to store an observation which carries a numerical value 
 *             and an optional unit of measure (example: length = 3.2 ft, weight = 1.2 kg, etc.)
 *             
 * @property {number} value            Gets or sets the observed quantity            
 * @property {string} valueType            Value type            
 * @property {string} unitOfMeasure            Gets or sets the key of the uom concept            
 * @property {Concept} unitOfMeasureModel [Delay loaded from unitOfMeasure],             Gets or sets the unit of measure            
 * @property {string} interpretationConcept            Gets or sets the interpretation concept            
 * @property {Concept} interpretationConceptModel [Delay loaded from interpretationConcept],             Gets or sets the concept which indicates the interpretation of the observtion            
 * @property {boolean} isNegated            Gets or sets an indicator which identifies whether the act actually occurred, or            specifically did not occur            
 * @property {string} template            Gets the template key            
 * @property {TemplateDefinition} templateModel [Delay loaded from template],             Gets or sets the template definition            
 * @property {Date} actTime            Gets or sets the creation time in XML format            
 * @property {Date} startTime            Gets or sets the creation time in XML format            
 * @property {Date} stopTime            Gets or sets the creation time in XML format            
 * @property {string} classConcept            Gets or sets the key of the concept which classifies the act.            (see: {@link ActClassKeys} for values)
 * @property {string} moodConcept            Gets or sets the key of the concept which specifies the mood of the act.            (see: {@link ActMoodKeys} for values)
 * @property {string} reasonConcept            Gets or sets the key of the concept which defines the reason why the act is or didn't occur            (see: {@link ActReasonKeys} for values)
 * @property {string} statusConcept            Gets or sets the key of the concept which describes the current status of the act            (see: {@link StatusKeys} for values)
 * @property {string} typeConcept            Gets or sets the key of the conccept which further classifies the type of act occurring            
 * @property {Concept} classConceptModel [Delay loaded from classConcept],             Gets or sets the concept which classifies the type of act            
 * @property {Concept} moodConceptModel [Delay loaded from moodConcept],             Gets or sets the concept which specifies the mood of the act            
 * @property {Concept} reasonConceptModel [Delay loaded from reasonConcept],             Gets or sets the concept which indicates the reason of the act            
 * @property {Concept} statusConceptModel [Delay loaded from statusConcept],             Gets or sets the current status concept of the act            
 * @property {Concept} typeConceptModel [Delay loaded from typeConcept],             Type concept identifier            
 * @property {object} identifier            Gets or sets the identifiers by which this act is known as in other systems            
 * @property {ActIdentifier} identifier.classifier  where classifier is from {@link IdentifierBase} authority
 * @property {object} relationship            Gets a list of all associated acts for this act            
 * @property {ActRelationship} relationship.Appends             Indicates that the source act appends information contained in the target act            
 * @property {ActRelationship} relationship.Arrival             Links the transortation act from another act            
 * @property {ActRelationship} relationship.Departure             Links a transporation act from another act indicating departure of the subject            
 * @property {ActRelationship} relationship.Documents             The source act documents the target act            
 * @property {ActRelationship} relationship.EpisodeLink             Links two instances of the same act over time (example: chronic conditions)            
 * @property {ActRelationship} relationship.Evaluates             Used to link a goal to an observation            
 * @property {ActRelationship} relationship.Fulfills             Indicates that the source act fulfills the target act            
 * @property {ActRelationship} relationship.HasAuthorization             Indicates that the target act authorizes the source act            
 * @property {ActRelationship} relationship.HasComponent             Indicates that the target act is a component of the source act            
 * @property {ActRelationship} relationship.HasControlVariable             Relationship from an act to one or more control variables (for example: device settings, or environment)            
 * @property {ActRelationship} relationship.HasManifestation             The assertion that a new observation may be a manifestation of another            
 * @property {ActRelationship} relationship.HasPrecondition             Indicates that the target act is a pre-condition of the source act            
 * @property {ActRelationship} relationship.HasReason             Indicates a reasoning as to why the source act is occurring            
 * @property {ActRelationship} relationship.HasReferenceValues             Indicates that the source act contains reference values from the target            
 * @property {ActRelationship} relationship.HasSubject             Indicates the subject of a particular act (example: clinical act is a subject of a control act)            
 * @property {ActRelationship} relationship.HasSupport             Indicates an existing act is suggesting evidence for a new observation.            
 * @property {ActRelationship} relationship.IsCauseOf             Indicates that the source act is the cause of the target act            
 * @property {ActRelationship} relationship.IsDerivedFrom             Indicates the source act is derived from information contained in the target act            
 * @property {ActRelationship} relationship.IsExcerptOf             Indicates that the source act is an excerpt of the target act            
 * @property {ActRelationship} relationship.RefersTo             Indicates that the source act refers to the target act            
 * @property {ActRelationship} relationship.Replaces             The source act replaces the target act            
 * @property {ActRelationship} relationship.StartsAfterStartOf             Indicates that the source act starts after the start of another act            
 * @property {ActRelationship} relationship.Transforms             Indicates that the source act transforms the target act            
 * @property {ActRelationship} relationship.$other Unclassified
 * @property {SecurityPolicyInstance} policy            Gets or sets the security policy instances associated with the act            
 * @property {object} extension            Gets a list of all extensions associated with the act            
 * @property {string} extension.classifier  where classifier is from {@link Extension} extensionType
 * @property {string} note            Gets a list of all notes associated with the act            
 * @property {object} tag            Gets a list of all tags associated with the act            
 * @property {string} tag.classifier  where classifier is from {@link Tag} key
 * @property {ActProtocol} protocol            Identifies protocols attached to the act            
 * @property {object} participation            Gets or sets the entities and participations they play in the act            
 * @property {ActParticipation} participation.Admitter             The player entity was the person who was responsible for admitting the patient into a facility or care scenario.            
 * @property {ActParticipation} participation.Attender             The player entity represents the attending physician for the patient            
 * @property {ActParticipation} participation.Authenticator             The player entity represents an entity which authenticates the provision of care            
 * @property {ActParticipation} participation.Authororiginator             The player entity is responsible for the creation of data described in the act            
 * @property {ActParticipation} participation.Baby             The player is a resultant person in that it was the baby             
 * @property {ActParticipation} participation.Beneficiary             The player is a beneficiary of the act such a receiver of a financial instrument, or other good            
 * @property {ActParticipation} participation.CallbackContact             The player entity represents something that should be contacted upon completion of the act            
 * @property {ActParticipation} participation.CausativeAgent             The player entity is an agent which caused the act to occur            
 * @property {ActParticipation} participation.Consultant             The player entity is acting as a consult to the carrying out of the act            
 * @property {ActParticipation} participation.Consumable             The player entity was or is to be consumed during the process of carrying out the act.            
 * @property {ActParticipation} participation.CoverageTarget             The player entity represents the target coverage entity of the act            
 * @property {ActParticipation} participation.Custodian             The player entity is the data custodian of the act (is responsible for storing and securing the act)            
 * @property {ActParticipation} participation.DataEnterer             The player entity represents the person or device which phisically entered the data at the terminal            
 * @property {ActParticipation} participation.Destination             The player etity represents the ultimate destination of the goods/materials/services described in the act            
 * @property {ActParticipation} participation.Device             The player entity represents the device on which the act or data from the act was acquired or recorded            
 * @property {ActParticipation} participation.DirectTarget             The player entity represents the directed target of care provided in the act            
 * @property {ActParticipation} participation.Discharger             The player entity represents the person who is responsible for the discharging of the patient from an encounter            
 * @property {ActParticipation} participation.Distributor             The player entity is the source distribution point for the financial or material instruments contained in the message            
 * @property {ActParticipation} participation.Donor             The player entity represents the donor of tissue or materials used in the act            
 * @property {ActParticipation} participation.EntryLocation             The location where the act was entered.            
 * @property {ActParticipation} participation.Escort             The player entity was responsible for escorting the patient during the course of the act            
 * @property {ActParticipation} participation.Exposure             The player entity something to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureAgent             The player entity represents the agent (material) to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureSource             The player entity describes the source of the material to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureTarget             The player entity describes the target to which the agent was exposed            
 * @property {ActParticipation} participation.GuarantorParty             The player represents a party which is used as a financial guarantor for payment in the carrying out of the act            
 * @property {ActParticipation} participation.Holder             The player is responsible for holding the act            
 * @property {ActParticipation} participation.IndirectTarget             The entity not directly present in the act but which will be the focust of th act.            
 * @property {ActParticipation} participation.Informant             The player was a person or device which informed data presented in the act. (Example: A mother telling a nurse that their child had a reaction)            
 * @property {ActParticipation} participation.InformationRecipient             The player entity represents something that should be cc'ed on the act            
 * @property {ActParticipation} participation.LegalAuthenticator             The player entity is responsible for legally authenticating the content of the act            
 * @property {ActParticipation} participation.Location             The location where the service was performed.            
 * @property {ActParticipation} participation.NonreuseableDevice             The player represents a consumable that can no longer be used            
 * @property {ActParticipation} participation.Origin             The player represents the origin of the act            
 * @property {ActParticipation} participation.Participation             The player entity participates in the act in no particular classification            
 * @property {ActParticipation} participation.Performer             The player entity is responsible for performing the clinical steps documented in the act            
 * @property {ActParticipation} participation.PrimaryInformationRecipient             The player entity represents a high priority contact which should be informed or cc'ed on the act            
 * @property {ActParticipation} participation.PrimaryPerformer             The player entity was the primary performer of the act. This is used in procedures where more than one performer is present            
 * @property {ActParticipation} participation.Product             The player represents a product that is not necessarily consumed but informs the act            
 * @property {ActParticipation} participation.Receiver             The player represents the entity which is the intended receiver of the act            
 * @property {ActParticipation} participation.RecordTarget             The player represents the entity to which the act is recorded against            
 * @property {ActParticipation} participation.ReferredBy             The player represents the entity which referred the act or caused the act to be undertaken            
 * @property {ActParticipation} participation.ReferredTo             The player entity represents the entity which was referred to            
 * @property {ActParticipation} participation.Referrer             The player entity represents the person who was originally the referrer.            
 * @property {ActParticipation} participation.Remote             The player entity represents a remote portion of the act            
 * @property {ActParticipation} participation.ResponsibleParty             The player entity is ultimately responsible for the carrying out of the act            
 * @property {ActParticipation} participation.ReusableDevice             The player entity represents a device which can be reused in future acts            
 * @property {ActParticipation} participation.SecondaryPerformer             The secondary performing person (support clinician).            
 * @property {ActParticipation} participation.Specimen             The player entity represents a specimen collected for the purpose of testing and diagnosis            
 * @property {ActParticipation} participation.Subject             The player entity is the subject of an act, but not necessarily the record target (meaning the act is about a particular entity but not to be attached to their record)            
 * @property {ActParticipation} participation.Tracker             The player entity is responsible for tracking the progress of the act            
 * @property {ActParticipation} participation.Transcriber             The person who transcribed data from the original act.            
 * @property {ActParticipation} participation.UgentNotificationContact             The player entity represents a contact entity in case of an emergency occurs during the act.            
 * @property {ActParticipation} participation.Verifier             The player entity was responsible for verifying the accuracy of the data in the act            
 * @property {ActParticipation} participation.Via             The player entity represents an entity where the act occurred "via" this entity (i.e. in transport)            
 * @property {ActParticipation} participation.Witness             The player entity represents a legal witness to the act occurring.            
 * @property {ActParticipation} participation.$other Unclassified
 * @property {string} previousVersion
 * @property {string} version
 * @property {number} sequence
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {QuantityObservation} copyData Copy constructor (if present)
 */
function QuantityObservation (copyData) { 
	this.$type = 'QuantityObservation';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {number} */
	this.sequence = copyData.sequence;
	/** @type {string} */
	this.version = copyData.version;
	/** @type {string} */
	this.previousVersion = copyData.previousVersion;
	/** @type {object} */
	this.participation = copyData.participation;
	/** @type {ActProtocol} */
	this.protocol = copyData.protocol;
	/** @type {object} */
	this.tag = copyData.tag;
	/** @type {string} */
	this.note = copyData.note;
	/** @type {object} */
	this.extension = copyData.extension;
	/** @type {SecurityPolicyInstance} */
	this.policy = copyData.policy;
	/** @type {object} */
	this.relationship = copyData.relationship;
	/** @type {object} */
	this.identifier = copyData.identifier;
	/** @type {Concept} */
	this.typeConceptModel = copyData.typeConceptModel;
	/** @type {Concept} */
	this.statusConceptModel = copyData.statusConceptModel;
	/** @type {Concept} */
	this.reasonConceptModel = copyData.reasonConceptModel;
	/** @type {Concept} */
	this.moodConceptModel = copyData.moodConceptModel;
	/** @type {Concept} */
	this.classConceptModel = copyData.classConceptModel;
	/** @type {string} */
	this.typeConcept = copyData.typeConcept;
	/** @type {string} */
	this.statusConcept = copyData.statusConcept;
	/** @type {string} */
	this.reasonConcept = copyData.reasonConcept;
	/** @type {string} */
	this.moodConcept = copyData.moodConcept;
	/** @type {string} */
	this.classConcept = copyData.classConcept;
	/** @type {Date} */
	this.stopTime = copyData.stopTime;
	/** @type {Date} */
	this.startTime = copyData.startTime;
	/** @type {Date} */
	this.actTime = copyData.actTime;
	/** @type {TemplateDefinition} */
	this.templateModel = copyData.templateModel;
	/** @type {string} */
	this.template = copyData.template;
	/** @type {boolean} */
	this.isNegated = copyData.isNegated;
	/** @type {Concept} */
	this.interpretationConceptModel = copyData.interpretationConceptModel;
	/** @type {string} */
	this.interpretationConcept = copyData.interpretationConcept;
	/** @type {Concept} */
	this.unitOfMeasureModel = copyData.unitOfMeasureModel;
	/** @type {string} */
	this.unitOfMeasure = copyData.unitOfMeasure;
	/** @type {string} */
	this.valueType = copyData.valueType;
	/** @type {number} */
	this.value = copyData.value;
	}
}  // QuantityObservation 
// SanteDB.Core.Model.Acts.TextObservation, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!TextObservation)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends Observation
 * @summary             Represents an observation with a text value            
 * @description 
 *             The text observation type represents an observation made with a textual value. This is done whenever an observation type 
 *             cannot be quantified or classified using either a coded or observed value. Please note that this type should not be used
 *             for taking notes, rather it is a specific type of thing observed about a patient. For example: Interpretation of patient's mood
 *             
 * @property {string} valueType            Value type            
 * @property {string} value            Gets or sets the textual value            
 * @property {string} interpretationConcept            Gets or sets the interpretation concept            
 * @property {Concept} interpretationConceptModel [Delay loaded from interpretationConcept],             Gets or sets the concept which indicates the interpretation of the observtion            
 * @property {boolean} isNegated            Gets or sets an indicator which identifies whether the act actually occurred, or            specifically did not occur            
 * @property {string} template            Gets the template key            
 * @property {TemplateDefinition} templateModel [Delay loaded from template],             Gets or sets the template definition            
 * @property {Date} actTime            Gets or sets the creation time in XML format            
 * @property {Date} startTime            Gets or sets the creation time in XML format            
 * @property {Date} stopTime            Gets or sets the creation time in XML format            
 * @property {string} classConcept            Gets or sets the key of the concept which classifies the act.            (see: {@link ActClassKeys} for values)
 * @property {string} moodConcept            Gets or sets the key of the concept which specifies the mood of the act.            (see: {@link ActMoodKeys} for values)
 * @property {string} reasonConcept            Gets or sets the key of the concept which defines the reason why the act is or didn't occur            (see: {@link ActReasonKeys} for values)
 * @property {string} statusConcept            Gets or sets the key of the concept which describes the current status of the act            (see: {@link StatusKeys} for values)
 * @property {string} typeConcept            Gets or sets the key of the conccept which further classifies the type of act occurring            
 * @property {Concept} classConceptModel [Delay loaded from classConcept],             Gets or sets the concept which classifies the type of act            
 * @property {Concept} moodConceptModel [Delay loaded from moodConcept],             Gets or sets the concept which specifies the mood of the act            
 * @property {Concept} reasonConceptModel [Delay loaded from reasonConcept],             Gets or sets the concept which indicates the reason of the act            
 * @property {Concept} statusConceptModel [Delay loaded from statusConcept],             Gets or sets the current status concept of the act            
 * @property {Concept} typeConceptModel [Delay loaded from typeConcept],             Type concept identifier            
 * @property {object} identifier            Gets or sets the identifiers by which this act is known as in other systems            
 * @property {ActIdentifier} identifier.classifier  where classifier is from {@link IdentifierBase} authority
 * @property {object} relationship            Gets a list of all associated acts for this act            
 * @property {ActRelationship} relationship.Appends             Indicates that the source act appends information contained in the target act            
 * @property {ActRelationship} relationship.Arrival             Links the transortation act from another act            
 * @property {ActRelationship} relationship.Departure             Links a transporation act from another act indicating departure of the subject            
 * @property {ActRelationship} relationship.Documents             The source act documents the target act            
 * @property {ActRelationship} relationship.EpisodeLink             Links two instances of the same act over time (example: chronic conditions)            
 * @property {ActRelationship} relationship.Evaluates             Used to link a goal to an observation            
 * @property {ActRelationship} relationship.Fulfills             Indicates that the source act fulfills the target act            
 * @property {ActRelationship} relationship.HasAuthorization             Indicates that the target act authorizes the source act            
 * @property {ActRelationship} relationship.HasComponent             Indicates that the target act is a component of the source act            
 * @property {ActRelationship} relationship.HasControlVariable             Relationship from an act to one or more control variables (for example: device settings, or environment)            
 * @property {ActRelationship} relationship.HasManifestation             The assertion that a new observation may be a manifestation of another            
 * @property {ActRelationship} relationship.HasPrecondition             Indicates that the target act is a pre-condition of the source act            
 * @property {ActRelationship} relationship.HasReason             Indicates a reasoning as to why the source act is occurring            
 * @property {ActRelationship} relationship.HasReferenceValues             Indicates that the source act contains reference values from the target            
 * @property {ActRelationship} relationship.HasSubject             Indicates the subject of a particular act (example: clinical act is a subject of a control act)            
 * @property {ActRelationship} relationship.HasSupport             Indicates an existing act is suggesting evidence for a new observation.            
 * @property {ActRelationship} relationship.IsCauseOf             Indicates that the source act is the cause of the target act            
 * @property {ActRelationship} relationship.IsDerivedFrom             Indicates the source act is derived from information contained in the target act            
 * @property {ActRelationship} relationship.IsExcerptOf             Indicates that the source act is an excerpt of the target act            
 * @property {ActRelationship} relationship.RefersTo             Indicates that the source act refers to the target act            
 * @property {ActRelationship} relationship.Replaces             The source act replaces the target act            
 * @property {ActRelationship} relationship.StartsAfterStartOf             Indicates that the source act starts after the start of another act            
 * @property {ActRelationship} relationship.Transforms             Indicates that the source act transforms the target act            
 * @property {ActRelationship} relationship.$other Unclassified
 * @property {SecurityPolicyInstance} policy            Gets or sets the security policy instances associated with the act            
 * @property {object} extension            Gets a list of all extensions associated with the act            
 * @property {string} extension.classifier  where classifier is from {@link Extension} extensionType
 * @property {string} note            Gets a list of all notes associated with the act            
 * @property {object} tag            Gets a list of all tags associated with the act            
 * @property {string} tag.classifier  where classifier is from {@link Tag} key
 * @property {ActProtocol} protocol            Identifies protocols attached to the act            
 * @property {object} participation            Gets or sets the entities and participations they play in the act            
 * @property {ActParticipation} participation.Admitter             The player entity was the person who was responsible for admitting the patient into a facility or care scenario.            
 * @property {ActParticipation} participation.Attender             The player entity represents the attending physician for the patient            
 * @property {ActParticipation} participation.Authenticator             The player entity represents an entity which authenticates the provision of care            
 * @property {ActParticipation} participation.Authororiginator             The player entity is responsible for the creation of data described in the act            
 * @property {ActParticipation} participation.Baby             The player is a resultant person in that it was the baby             
 * @property {ActParticipation} participation.Beneficiary             The player is a beneficiary of the act such a receiver of a financial instrument, or other good            
 * @property {ActParticipation} participation.CallbackContact             The player entity represents something that should be contacted upon completion of the act            
 * @property {ActParticipation} participation.CausativeAgent             The player entity is an agent which caused the act to occur            
 * @property {ActParticipation} participation.Consultant             The player entity is acting as a consult to the carrying out of the act            
 * @property {ActParticipation} participation.Consumable             The player entity was or is to be consumed during the process of carrying out the act.            
 * @property {ActParticipation} participation.CoverageTarget             The player entity represents the target coverage entity of the act            
 * @property {ActParticipation} participation.Custodian             The player entity is the data custodian of the act (is responsible for storing and securing the act)            
 * @property {ActParticipation} participation.DataEnterer             The player entity represents the person or device which phisically entered the data at the terminal            
 * @property {ActParticipation} participation.Destination             The player etity represents the ultimate destination of the goods/materials/services described in the act            
 * @property {ActParticipation} participation.Device             The player entity represents the device on which the act or data from the act was acquired or recorded            
 * @property {ActParticipation} participation.DirectTarget             The player entity represents the directed target of care provided in the act            
 * @property {ActParticipation} participation.Discharger             The player entity represents the person who is responsible for the discharging of the patient from an encounter            
 * @property {ActParticipation} participation.Distributor             The player entity is the source distribution point for the financial or material instruments contained in the message            
 * @property {ActParticipation} participation.Donor             The player entity represents the donor of tissue or materials used in the act            
 * @property {ActParticipation} participation.EntryLocation             The location where the act was entered.            
 * @property {ActParticipation} participation.Escort             The player entity was responsible for escorting the patient during the course of the act            
 * @property {ActParticipation} participation.Exposure             The player entity something to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureAgent             The player entity represents the agent (material) to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureSource             The player entity describes the source of the material to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureTarget             The player entity describes the target to which the agent was exposed            
 * @property {ActParticipation} participation.GuarantorParty             The player represents a party which is used as a financial guarantor for payment in the carrying out of the act            
 * @property {ActParticipation} participation.Holder             The player is responsible for holding the act            
 * @property {ActParticipation} participation.IndirectTarget             The entity not directly present in the act but which will be the focust of th act.            
 * @property {ActParticipation} participation.Informant             The player was a person or device which informed data presented in the act. (Example: A mother telling a nurse that their child had a reaction)            
 * @property {ActParticipation} participation.InformationRecipient             The player entity represents something that should be cc'ed on the act            
 * @property {ActParticipation} participation.LegalAuthenticator             The player entity is responsible for legally authenticating the content of the act            
 * @property {ActParticipation} participation.Location             The location where the service was performed.            
 * @property {ActParticipation} participation.NonreuseableDevice             The player represents a consumable that can no longer be used            
 * @property {ActParticipation} participation.Origin             The player represents the origin of the act            
 * @property {ActParticipation} participation.Participation             The player entity participates in the act in no particular classification            
 * @property {ActParticipation} participation.Performer             The player entity is responsible for performing the clinical steps documented in the act            
 * @property {ActParticipation} participation.PrimaryInformationRecipient             The player entity represents a high priority contact which should be informed or cc'ed on the act            
 * @property {ActParticipation} participation.PrimaryPerformer             The player entity was the primary performer of the act. This is used in procedures where more than one performer is present            
 * @property {ActParticipation} participation.Product             The player represents a product that is not necessarily consumed but informs the act            
 * @property {ActParticipation} participation.Receiver             The player represents the entity which is the intended receiver of the act            
 * @property {ActParticipation} participation.RecordTarget             The player represents the entity to which the act is recorded against            
 * @property {ActParticipation} participation.ReferredBy             The player represents the entity which referred the act or caused the act to be undertaken            
 * @property {ActParticipation} participation.ReferredTo             The player entity represents the entity which was referred to            
 * @property {ActParticipation} participation.Referrer             The player entity represents the person who was originally the referrer.            
 * @property {ActParticipation} participation.Remote             The player entity represents a remote portion of the act            
 * @property {ActParticipation} participation.ResponsibleParty             The player entity is ultimately responsible for the carrying out of the act            
 * @property {ActParticipation} participation.ReusableDevice             The player entity represents a device which can be reused in future acts            
 * @property {ActParticipation} participation.SecondaryPerformer             The secondary performing person (support clinician).            
 * @property {ActParticipation} participation.Specimen             The player entity represents a specimen collected for the purpose of testing and diagnosis            
 * @property {ActParticipation} participation.Subject             The player entity is the subject of an act, but not necessarily the record target (meaning the act is about a particular entity but not to be attached to their record)            
 * @property {ActParticipation} participation.Tracker             The player entity is responsible for tracking the progress of the act            
 * @property {ActParticipation} participation.Transcriber             The person who transcribed data from the original act.            
 * @property {ActParticipation} participation.UgentNotificationContact             The player entity represents a contact entity in case of an emergency occurs during the act.            
 * @property {ActParticipation} participation.Verifier             The player entity was responsible for verifying the accuracy of the data in the act            
 * @property {ActParticipation} participation.Via             The player entity represents an entity where the act occurred "via" this entity (i.e. in transport)            
 * @property {ActParticipation} participation.Witness             The player entity represents a legal witness to the act occurring.            
 * @property {ActParticipation} participation.$other Unclassified
 * @property {string} previousVersion
 * @property {string} version
 * @property {number} sequence
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {TextObservation} copyData Copy constructor (if present)
 */
function TextObservation (copyData) { 
	this.$type = 'TextObservation';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {number} */
	this.sequence = copyData.sequence;
	/** @type {string} */
	this.version = copyData.version;
	/** @type {string} */
	this.previousVersion = copyData.previousVersion;
	/** @type {object} */
	this.participation = copyData.participation;
	/** @type {ActProtocol} */
	this.protocol = copyData.protocol;
	/** @type {object} */
	this.tag = copyData.tag;
	/** @type {string} */
	this.note = copyData.note;
	/** @type {object} */
	this.extension = copyData.extension;
	/** @type {SecurityPolicyInstance} */
	this.policy = copyData.policy;
	/** @type {object} */
	this.relationship = copyData.relationship;
	/** @type {object} */
	this.identifier = copyData.identifier;
	/** @type {Concept} */
	this.typeConceptModel = copyData.typeConceptModel;
	/** @type {Concept} */
	this.statusConceptModel = copyData.statusConceptModel;
	/** @type {Concept} */
	this.reasonConceptModel = copyData.reasonConceptModel;
	/** @type {Concept} */
	this.moodConceptModel = copyData.moodConceptModel;
	/** @type {Concept} */
	this.classConceptModel = copyData.classConceptModel;
	/** @type {string} */
	this.typeConcept = copyData.typeConcept;
	/** @type {string} */
	this.statusConcept = copyData.statusConcept;
	/** @type {string} */
	this.reasonConcept = copyData.reasonConcept;
	/** @type {string} */
	this.moodConcept = copyData.moodConcept;
	/** @type {string} */
	this.classConcept = copyData.classConcept;
	/** @type {Date} */
	this.stopTime = copyData.stopTime;
	/** @type {Date} */
	this.startTime = copyData.startTime;
	/** @type {Date} */
	this.actTime = copyData.actTime;
	/** @type {TemplateDefinition} */
	this.templateModel = copyData.templateModel;
	/** @type {string} */
	this.template = copyData.template;
	/** @type {boolean} */
	this.isNegated = copyData.isNegated;
	/** @type {Concept} */
	this.interpretationConceptModel = copyData.interpretationConceptModel;
	/** @type {string} */
	this.interpretationConcept = copyData.interpretationConcept;
	/** @type {string} */
	this.value = copyData.value;
	/** @type {string} */
	this.valueType = copyData.valueType;
	}
}  // TextObservation 
// SanteDB.Core.Model.Acts.CodedObservation, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!CodedObservation)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends Observation
 * @summary             Represents an observation with a concept value            
 * @description 
 *             A coded observation represents an observation whose value is classified using a coded concept. For example: fetal presentation, 
 *             stage of pregnancy, etc.
 *             
 * @property {string} valueType            Value type            
 * @property {string} value            Gets or sets the key of the uom concept            
 * @property {Concept} valueModel [Delay loaded from value],             Gets or sets the coded value of the observation            
 * @property {string} interpretationConcept            Gets or sets the interpretation concept            
 * @property {Concept} interpretationConceptModel [Delay loaded from interpretationConcept],             Gets or sets the concept which indicates the interpretation of the observtion            
 * @property {boolean} isNegated            Gets or sets an indicator which identifies whether the act actually occurred, or            specifically did not occur            
 * @property {string} template            Gets the template key            
 * @property {TemplateDefinition} templateModel [Delay loaded from template],             Gets or sets the template definition            
 * @property {Date} actTime            Gets or sets the creation time in XML format            
 * @property {Date} startTime            Gets or sets the creation time in XML format            
 * @property {Date} stopTime            Gets or sets the creation time in XML format            
 * @property {string} classConcept            Gets or sets the key of the concept which classifies the act.            (see: {@link ActClassKeys} for values)
 * @property {string} moodConcept            Gets or sets the key of the concept which specifies the mood of the act.            (see: {@link ActMoodKeys} for values)
 * @property {string} reasonConcept            Gets or sets the key of the concept which defines the reason why the act is or didn't occur            (see: {@link ActReasonKeys} for values)
 * @property {string} statusConcept            Gets or sets the key of the concept which describes the current status of the act            (see: {@link StatusKeys} for values)
 * @property {string} typeConcept            Gets or sets the key of the conccept which further classifies the type of act occurring            
 * @property {Concept} classConceptModel [Delay loaded from classConcept],             Gets or sets the concept which classifies the type of act            
 * @property {Concept} moodConceptModel [Delay loaded from moodConcept],             Gets or sets the concept which specifies the mood of the act            
 * @property {Concept} reasonConceptModel [Delay loaded from reasonConcept],             Gets or sets the concept which indicates the reason of the act            
 * @property {Concept} statusConceptModel [Delay loaded from statusConcept],             Gets or sets the current status concept of the act            
 * @property {Concept} typeConceptModel [Delay loaded from typeConcept],             Type concept identifier            
 * @property {object} identifier            Gets or sets the identifiers by which this act is known as in other systems            
 * @property {ActIdentifier} identifier.classifier  where classifier is from {@link IdentifierBase} authority
 * @property {object} relationship            Gets a list of all associated acts for this act            
 * @property {ActRelationship} relationship.Appends             Indicates that the source act appends information contained in the target act            
 * @property {ActRelationship} relationship.Arrival             Links the transortation act from another act            
 * @property {ActRelationship} relationship.Departure             Links a transporation act from another act indicating departure of the subject            
 * @property {ActRelationship} relationship.Documents             The source act documents the target act            
 * @property {ActRelationship} relationship.EpisodeLink             Links two instances of the same act over time (example: chronic conditions)            
 * @property {ActRelationship} relationship.Evaluates             Used to link a goal to an observation            
 * @property {ActRelationship} relationship.Fulfills             Indicates that the source act fulfills the target act            
 * @property {ActRelationship} relationship.HasAuthorization             Indicates that the target act authorizes the source act            
 * @property {ActRelationship} relationship.HasComponent             Indicates that the target act is a component of the source act            
 * @property {ActRelationship} relationship.HasControlVariable             Relationship from an act to one or more control variables (for example: device settings, or environment)            
 * @property {ActRelationship} relationship.HasManifestation             The assertion that a new observation may be a manifestation of another            
 * @property {ActRelationship} relationship.HasPrecondition             Indicates that the target act is a pre-condition of the source act            
 * @property {ActRelationship} relationship.HasReason             Indicates a reasoning as to why the source act is occurring            
 * @property {ActRelationship} relationship.HasReferenceValues             Indicates that the source act contains reference values from the target            
 * @property {ActRelationship} relationship.HasSubject             Indicates the subject of a particular act (example: clinical act is a subject of a control act)            
 * @property {ActRelationship} relationship.HasSupport             Indicates an existing act is suggesting evidence for a new observation.            
 * @property {ActRelationship} relationship.IsCauseOf             Indicates that the source act is the cause of the target act            
 * @property {ActRelationship} relationship.IsDerivedFrom             Indicates the source act is derived from information contained in the target act            
 * @property {ActRelationship} relationship.IsExcerptOf             Indicates that the source act is an excerpt of the target act            
 * @property {ActRelationship} relationship.RefersTo             Indicates that the source act refers to the target act            
 * @property {ActRelationship} relationship.Replaces             The source act replaces the target act            
 * @property {ActRelationship} relationship.StartsAfterStartOf             Indicates that the source act starts after the start of another act            
 * @property {ActRelationship} relationship.Transforms             Indicates that the source act transforms the target act            
 * @property {ActRelationship} relationship.$other Unclassified
 * @property {SecurityPolicyInstance} policy            Gets or sets the security policy instances associated with the act            
 * @property {object} extension            Gets a list of all extensions associated with the act            
 * @property {string} extension.classifier  where classifier is from {@link Extension} extensionType
 * @property {string} note            Gets a list of all notes associated with the act            
 * @property {object} tag            Gets a list of all tags associated with the act            
 * @property {string} tag.classifier  where classifier is from {@link Tag} key
 * @property {ActProtocol} protocol            Identifies protocols attached to the act            
 * @property {object} participation            Gets or sets the entities and participations they play in the act            
 * @property {ActParticipation} participation.Admitter             The player entity was the person who was responsible for admitting the patient into a facility or care scenario.            
 * @property {ActParticipation} participation.Attender             The player entity represents the attending physician for the patient            
 * @property {ActParticipation} participation.Authenticator             The player entity represents an entity which authenticates the provision of care            
 * @property {ActParticipation} participation.Authororiginator             The player entity is responsible for the creation of data described in the act            
 * @property {ActParticipation} participation.Baby             The player is a resultant person in that it was the baby             
 * @property {ActParticipation} participation.Beneficiary             The player is a beneficiary of the act such a receiver of a financial instrument, or other good            
 * @property {ActParticipation} participation.CallbackContact             The player entity represents something that should be contacted upon completion of the act            
 * @property {ActParticipation} participation.CausativeAgent             The player entity is an agent which caused the act to occur            
 * @property {ActParticipation} participation.Consultant             The player entity is acting as a consult to the carrying out of the act            
 * @property {ActParticipation} participation.Consumable             The player entity was or is to be consumed during the process of carrying out the act.            
 * @property {ActParticipation} participation.CoverageTarget             The player entity represents the target coverage entity of the act            
 * @property {ActParticipation} participation.Custodian             The player entity is the data custodian of the act (is responsible for storing and securing the act)            
 * @property {ActParticipation} participation.DataEnterer             The player entity represents the person or device which phisically entered the data at the terminal            
 * @property {ActParticipation} participation.Destination             The player etity represents the ultimate destination of the goods/materials/services described in the act            
 * @property {ActParticipation} participation.Device             The player entity represents the device on which the act or data from the act was acquired or recorded            
 * @property {ActParticipation} participation.DirectTarget             The player entity represents the directed target of care provided in the act            
 * @property {ActParticipation} participation.Discharger             The player entity represents the person who is responsible for the discharging of the patient from an encounter            
 * @property {ActParticipation} participation.Distributor             The player entity is the source distribution point for the financial or material instruments contained in the message            
 * @property {ActParticipation} participation.Donor             The player entity represents the donor of tissue or materials used in the act            
 * @property {ActParticipation} participation.EntryLocation             The location where the act was entered.            
 * @property {ActParticipation} participation.Escort             The player entity was responsible for escorting the patient during the course of the act            
 * @property {ActParticipation} participation.Exposure             The player entity something to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureAgent             The player entity represents the agent (material) to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureSource             The player entity describes the source of the material to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureTarget             The player entity describes the target to which the agent was exposed            
 * @property {ActParticipation} participation.GuarantorParty             The player represents a party which is used as a financial guarantor for payment in the carrying out of the act            
 * @property {ActParticipation} participation.Holder             The player is responsible for holding the act            
 * @property {ActParticipation} participation.IndirectTarget             The entity not directly present in the act but which will be the focust of th act.            
 * @property {ActParticipation} participation.Informant             The player was a person or device which informed data presented in the act. (Example: A mother telling a nurse that their child had a reaction)            
 * @property {ActParticipation} participation.InformationRecipient             The player entity represents something that should be cc'ed on the act            
 * @property {ActParticipation} participation.LegalAuthenticator             The player entity is responsible for legally authenticating the content of the act            
 * @property {ActParticipation} participation.Location             The location where the service was performed.            
 * @property {ActParticipation} participation.NonreuseableDevice             The player represents a consumable that can no longer be used            
 * @property {ActParticipation} participation.Origin             The player represents the origin of the act            
 * @property {ActParticipation} participation.Participation             The player entity participates in the act in no particular classification            
 * @property {ActParticipation} participation.Performer             The player entity is responsible for performing the clinical steps documented in the act            
 * @property {ActParticipation} participation.PrimaryInformationRecipient             The player entity represents a high priority contact which should be informed or cc'ed on the act            
 * @property {ActParticipation} participation.PrimaryPerformer             The player entity was the primary performer of the act. This is used in procedures where more than one performer is present            
 * @property {ActParticipation} participation.Product             The player represents a product that is not necessarily consumed but informs the act            
 * @property {ActParticipation} participation.Receiver             The player represents the entity which is the intended receiver of the act            
 * @property {ActParticipation} participation.RecordTarget             The player represents the entity to which the act is recorded against            
 * @property {ActParticipation} participation.ReferredBy             The player represents the entity which referred the act or caused the act to be undertaken            
 * @property {ActParticipation} participation.ReferredTo             The player entity represents the entity which was referred to            
 * @property {ActParticipation} participation.Referrer             The player entity represents the person who was originally the referrer.            
 * @property {ActParticipation} participation.Remote             The player entity represents a remote portion of the act            
 * @property {ActParticipation} participation.ResponsibleParty             The player entity is ultimately responsible for the carrying out of the act            
 * @property {ActParticipation} participation.ReusableDevice             The player entity represents a device which can be reused in future acts            
 * @property {ActParticipation} participation.SecondaryPerformer             The secondary performing person (support clinician).            
 * @property {ActParticipation} participation.Specimen             The player entity represents a specimen collected for the purpose of testing and diagnosis            
 * @property {ActParticipation} participation.Subject             The player entity is the subject of an act, but not necessarily the record target (meaning the act is about a particular entity but not to be attached to their record)            
 * @property {ActParticipation} participation.Tracker             The player entity is responsible for tracking the progress of the act            
 * @property {ActParticipation} participation.Transcriber             The person who transcribed data from the original act.            
 * @property {ActParticipation} participation.UgentNotificationContact             The player entity represents a contact entity in case of an emergency occurs during the act.            
 * @property {ActParticipation} participation.Verifier             The player entity was responsible for verifying the accuracy of the data in the act            
 * @property {ActParticipation} participation.Via             The player entity represents an entity where the act occurred "via" this entity (i.e. in transport)            
 * @property {ActParticipation} participation.Witness             The player entity represents a legal witness to the act occurring.            
 * @property {ActParticipation} participation.$other Unclassified
 * @property {string} previousVersion
 * @property {string} version
 * @property {number} sequence
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {CodedObservation} copyData Copy constructor (if present)
 */
function CodedObservation (copyData) { 
	this.$type = 'CodedObservation';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {number} */
	this.sequence = copyData.sequence;
	/** @type {string} */
	this.version = copyData.version;
	/** @type {string} */
	this.previousVersion = copyData.previousVersion;
	/** @type {object} */
	this.participation = copyData.participation;
	/** @type {ActProtocol} */
	this.protocol = copyData.protocol;
	/** @type {object} */
	this.tag = copyData.tag;
	/** @type {string} */
	this.note = copyData.note;
	/** @type {object} */
	this.extension = copyData.extension;
	/** @type {SecurityPolicyInstance} */
	this.policy = copyData.policy;
	/** @type {object} */
	this.relationship = copyData.relationship;
	/** @type {object} */
	this.identifier = copyData.identifier;
	/** @type {Concept} */
	this.typeConceptModel = copyData.typeConceptModel;
	/** @type {Concept} */
	this.statusConceptModel = copyData.statusConceptModel;
	/** @type {Concept} */
	this.reasonConceptModel = copyData.reasonConceptModel;
	/** @type {Concept} */
	this.moodConceptModel = copyData.moodConceptModel;
	/** @type {Concept} */
	this.classConceptModel = copyData.classConceptModel;
	/** @type {string} */
	this.typeConcept = copyData.typeConcept;
	/** @type {string} */
	this.statusConcept = copyData.statusConcept;
	/** @type {string} */
	this.reasonConcept = copyData.reasonConcept;
	/** @type {string} */
	this.moodConcept = copyData.moodConcept;
	/** @type {string} */
	this.classConcept = copyData.classConcept;
	/** @type {Date} */
	this.stopTime = copyData.stopTime;
	/** @type {Date} */
	this.startTime = copyData.startTime;
	/** @type {Date} */
	this.actTime = copyData.actTime;
	/** @type {TemplateDefinition} */
	this.templateModel = copyData.templateModel;
	/** @type {string} */
	this.template = copyData.template;
	/** @type {boolean} */
	this.isNegated = copyData.isNegated;
	/** @type {Concept} */
	this.interpretationConceptModel = copyData.interpretationConceptModel;
	/** @type {string} */
	this.interpretationConcept = copyData.interpretationConcept;
	/** @type {Concept} */
	this.valueModel = copyData.valueModel;
	/** @type {string} */
	this.value = copyData.value;
	/** @type {string} */
	this.valueType = copyData.valueType;
	}
}  // CodedObservation 
// SanteDB.Core.Model.Acts.PatientEncounter, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!PatientEncounter)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends Act
 * @summary              Represents an encounter a patient has with the health system             
 * @description An encounter is a special type of act which represents an episode of care which a patient experiences with the health system. 
 *             An encounter is used to document things like hospital visits, inpatient care encounters, or any longer running series of actions which 
 *             are linked by the admit -> discharge workflow.
 * @property {string} dischargeDisposition            Gets or sets the key of discharge disposition            
 * @property {Concept} dischargeDispositionModel [Delay loaded from dischargeDisposition],             Gets or sets the discharge disposition (how the patient left the encounter            
 * @property {boolean} isNegated            Gets or sets an indicator which identifies whether the act actually occurred, or            specifically did not occur            
 * @property {string} template            Gets the template key            
 * @property {TemplateDefinition} templateModel [Delay loaded from template],             Gets or sets the template definition            
 * @property {Date} actTime            Gets or sets the creation time in XML format            
 * @property {Date} startTime            Gets or sets the creation time in XML format            
 * @property {Date} stopTime            Gets or sets the creation time in XML format            
 * @property {string} classConcept            Gets or sets the key of the concept which classifies the act.            (see: {@link ActClassKeys} for values)
 * @property {string} moodConcept            Gets or sets the key of the concept which specifies the mood of the act.            (see: {@link ActMoodKeys} for values)
 * @property {string} reasonConcept            Gets or sets the key of the concept which defines the reason why the act is or didn't occur            (see: {@link ActReasonKeys} for values)
 * @property {string} statusConcept            Gets or sets the key of the concept which describes the current status of the act            (see: {@link StatusKeys} for values)
 * @property {string} typeConcept            Gets or sets the key of the conccept which further classifies the type of act occurring            
 * @property {Concept} classConceptModel [Delay loaded from classConcept],             Gets or sets the concept which classifies the type of act            
 * @property {Concept} moodConceptModel [Delay loaded from moodConcept],             Gets or sets the concept which specifies the mood of the act            
 * @property {Concept} reasonConceptModel [Delay loaded from reasonConcept],             Gets or sets the concept which indicates the reason of the act            
 * @property {Concept} statusConceptModel [Delay loaded from statusConcept],             Gets or sets the current status concept of the act            
 * @property {Concept} typeConceptModel [Delay loaded from typeConcept],             Type concept identifier            
 * @property {object} identifier            Gets or sets the identifiers by which this act is known as in other systems            
 * @property {ActIdentifier} identifier.classifier  where classifier is from {@link IdentifierBase} authority
 * @property {object} relationship            Gets a list of all associated acts for this act            
 * @property {ActRelationship} relationship.Appends             Indicates that the source act appends information contained in the target act            
 * @property {ActRelationship} relationship.Arrival             Links the transortation act from another act            
 * @property {ActRelationship} relationship.Departure             Links a transporation act from another act indicating departure of the subject            
 * @property {ActRelationship} relationship.Documents             The source act documents the target act            
 * @property {ActRelationship} relationship.EpisodeLink             Links two instances of the same act over time (example: chronic conditions)            
 * @property {ActRelationship} relationship.Evaluates             Used to link a goal to an observation            
 * @property {ActRelationship} relationship.Fulfills             Indicates that the source act fulfills the target act            
 * @property {ActRelationship} relationship.HasAuthorization             Indicates that the target act authorizes the source act            
 * @property {ActRelationship} relationship.HasComponent             Indicates that the target act is a component of the source act            
 * @property {ActRelationship} relationship.HasControlVariable             Relationship from an act to one or more control variables (for example: device settings, or environment)            
 * @property {ActRelationship} relationship.HasManifestation             The assertion that a new observation may be a manifestation of another            
 * @property {ActRelationship} relationship.HasPrecondition             Indicates that the target act is a pre-condition of the source act            
 * @property {ActRelationship} relationship.HasReason             Indicates a reasoning as to why the source act is occurring            
 * @property {ActRelationship} relationship.HasReferenceValues             Indicates that the source act contains reference values from the target            
 * @property {ActRelationship} relationship.HasSubject             Indicates the subject of a particular act (example: clinical act is a subject of a control act)            
 * @property {ActRelationship} relationship.HasSupport             Indicates an existing act is suggesting evidence for a new observation.            
 * @property {ActRelationship} relationship.IsCauseOf             Indicates that the source act is the cause of the target act            
 * @property {ActRelationship} relationship.IsDerivedFrom             Indicates the source act is derived from information contained in the target act            
 * @property {ActRelationship} relationship.IsExcerptOf             Indicates that the source act is an excerpt of the target act            
 * @property {ActRelationship} relationship.RefersTo             Indicates that the source act refers to the target act            
 * @property {ActRelationship} relationship.Replaces             The source act replaces the target act            
 * @property {ActRelationship} relationship.StartsAfterStartOf             Indicates that the source act starts after the start of another act            
 * @property {ActRelationship} relationship.Transforms             Indicates that the source act transforms the target act            
 * @property {ActRelationship} relationship.$other Unclassified
 * @property {SecurityPolicyInstance} policy            Gets or sets the security policy instances associated with the act            
 * @property {object} extension            Gets a list of all extensions associated with the act            
 * @property {string} extension.classifier  where classifier is from {@link Extension} extensionType
 * @property {string} note            Gets a list of all notes associated with the act            
 * @property {object} tag            Gets a list of all tags associated with the act            
 * @property {string} tag.classifier  where classifier is from {@link Tag} key
 * @property {ActProtocol} protocol            Identifies protocols attached to the act            
 * @property {object} participation            Gets or sets the entities and participations they play in the act            
 * @property {ActParticipation} participation.Admitter             The player entity was the person who was responsible for admitting the patient into a facility or care scenario.            
 * @property {ActParticipation} participation.Attender             The player entity represents the attending physician for the patient            
 * @property {ActParticipation} participation.Authenticator             The player entity represents an entity which authenticates the provision of care            
 * @property {ActParticipation} participation.Authororiginator             The player entity is responsible for the creation of data described in the act            
 * @property {ActParticipation} participation.Baby             The player is a resultant person in that it was the baby             
 * @property {ActParticipation} participation.Beneficiary             The player is a beneficiary of the act such a receiver of a financial instrument, or other good            
 * @property {ActParticipation} participation.CallbackContact             The player entity represents something that should be contacted upon completion of the act            
 * @property {ActParticipation} participation.CausativeAgent             The player entity is an agent which caused the act to occur            
 * @property {ActParticipation} participation.Consultant             The player entity is acting as a consult to the carrying out of the act            
 * @property {ActParticipation} participation.Consumable             The player entity was or is to be consumed during the process of carrying out the act.            
 * @property {ActParticipation} participation.CoverageTarget             The player entity represents the target coverage entity of the act            
 * @property {ActParticipation} participation.Custodian             The player entity is the data custodian of the act (is responsible for storing and securing the act)            
 * @property {ActParticipation} participation.DataEnterer             The player entity represents the person or device which phisically entered the data at the terminal            
 * @property {ActParticipation} participation.Destination             The player etity represents the ultimate destination of the goods/materials/services described in the act            
 * @property {ActParticipation} participation.Device             The player entity represents the device on which the act or data from the act was acquired or recorded            
 * @property {ActParticipation} participation.DirectTarget             The player entity represents the directed target of care provided in the act            
 * @property {ActParticipation} participation.Discharger             The player entity represents the person who is responsible for the discharging of the patient from an encounter            
 * @property {ActParticipation} participation.Distributor             The player entity is the source distribution point for the financial or material instruments contained in the message            
 * @property {ActParticipation} participation.Donor             The player entity represents the donor of tissue or materials used in the act            
 * @property {ActParticipation} participation.EntryLocation             The location where the act was entered.            
 * @property {ActParticipation} participation.Escort             The player entity was responsible for escorting the patient during the course of the act            
 * @property {ActParticipation} participation.Exposure             The player entity something to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureAgent             The player entity represents the agent (material) to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureSource             The player entity describes the source of the material to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureTarget             The player entity describes the target to which the agent was exposed            
 * @property {ActParticipation} participation.GuarantorParty             The player represents a party which is used as a financial guarantor for payment in the carrying out of the act            
 * @property {ActParticipation} participation.Holder             The player is responsible for holding the act            
 * @property {ActParticipation} participation.IndirectTarget             The entity not directly present in the act but which will be the focust of th act.            
 * @property {ActParticipation} participation.Informant             The player was a person or device which informed data presented in the act. (Example: A mother telling a nurse that their child had a reaction)            
 * @property {ActParticipation} participation.InformationRecipient             The player entity represents something that should be cc'ed on the act            
 * @property {ActParticipation} participation.LegalAuthenticator             The player entity is responsible for legally authenticating the content of the act            
 * @property {ActParticipation} participation.Location             The location where the service was performed.            
 * @property {ActParticipation} participation.NonreuseableDevice             The player represents a consumable that can no longer be used            
 * @property {ActParticipation} participation.Origin             The player represents the origin of the act            
 * @property {ActParticipation} participation.Participation             The player entity participates in the act in no particular classification            
 * @property {ActParticipation} participation.Performer             The player entity is responsible for performing the clinical steps documented in the act            
 * @property {ActParticipation} participation.PrimaryInformationRecipient             The player entity represents a high priority contact which should be informed or cc'ed on the act            
 * @property {ActParticipation} participation.PrimaryPerformer             The player entity was the primary performer of the act. This is used in procedures where more than one performer is present            
 * @property {ActParticipation} participation.Product             The player represents a product that is not necessarily consumed but informs the act            
 * @property {ActParticipation} participation.Receiver             The player represents the entity which is the intended receiver of the act            
 * @property {ActParticipation} participation.RecordTarget             The player represents the entity to which the act is recorded against            
 * @property {ActParticipation} participation.ReferredBy             The player represents the entity which referred the act or caused the act to be undertaken            
 * @property {ActParticipation} participation.ReferredTo             The player entity represents the entity which was referred to            
 * @property {ActParticipation} participation.Referrer             The player entity represents the person who was originally the referrer.            
 * @property {ActParticipation} participation.Remote             The player entity represents a remote portion of the act            
 * @property {ActParticipation} participation.ResponsibleParty             The player entity is ultimately responsible for the carrying out of the act            
 * @property {ActParticipation} participation.ReusableDevice             The player entity represents a device which can be reused in future acts            
 * @property {ActParticipation} participation.SecondaryPerformer             The secondary performing person (support clinician).            
 * @property {ActParticipation} participation.Specimen             The player entity represents a specimen collected for the purpose of testing and diagnosis            
 * @property {ActParticipation} participation.Subject             The player entity is the subject of an act, but not necessarily the record target (meaning the act is about a particular entity but not to be attached to their record)            
 * @property {ActParticipation} participation.Tracker             The player entity is responsible for tracking the progress of the act            
 * @property {ActParticipation} participation.Transcriber             The person who transcribed data from the original act.            
 * @property {ActParticipation} participation.UgentNotificationContact             The player entity represents a contact entity in case of an emergency occurs during the act.            
 * @property {ActParticipation} participation.Verifier             The player entity was responsible for verifying the accuracy of the data in the act            
 * @property {ActParticipation} participation.Via             The player entity represents an entity where the act occurred "via" this entity (i.e. in transport)            
 * @property {ActParticipation} participation.Witness             The player entity represents a legal witness to the act occurring.            
 * @property {ActParticipation} participation.$other Unclassified
 * @property {string} previousVersion
 * @property {string} version
 * @property {number} sequence
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {PatientEncounter} copyData Copy constructor (if present)
 */
function PatientEncounter (copyData) { 
	this.$type = 'PatientEncounter';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {number} */
	this.sequence = copyData.sequence;
	/** @type {string} */
	this.version = copyData.version;
	/** @type {string} */
	this.previousVersion = copyData.previousVersion;
	/** @type {object} */
	this.participation = copyData.participation;
	/** @type {ActProtocol} */
	this.protocol = copyData.protocol;
	/** @type {object} */
	this.tag = copyData.tag;
	/** @type {string} */
	this.note = copyData.note;
	/** @type {object} */
	this.extension = copyData.extension;
	/** @type {SecurityPolicyInstance} */
	this.policy = copyData.policy;
	/** @type {object} */
	this.relationship = copyData.relationship;
	/** @type {object} */
	this.identifier = copyData.identifier;
	/** @type {Concept} */
	this.typeConceptModel = copyData.typeConceptModel;
	/** @type {Concept} */
	this.statusConceptModel = copyData.statusConceptModel;
	/** @type {Concept} */
	this.reasonConceptModel = copyData.reasonConceptModel;
	/** @type {Concept} */
	this.moodConceptModel = copyData.moodConceptModel;
	/** @type {Concept} */
	this.classConceptModel = copyData.classConceptModel;
	/** @type {string} */
	this.typeConcept = copyData.typeConcept;
	/** @type {string} */
	this.statusConcept = copyData.statusConcept;
	/** @type {string} */
	this.reasonConcept = copyData.reasonConcept;
	/** @type {string} */
	this.moodConcept = copyData.moodConcept;
	/** @type {string} */
	this.classConcept = copyData.classConcept;
	/** @type {Date} */
	this.stopTime = copyData.stopTime;
	/** @type {Date} */
	this.startTime = copyData.startTime;
	/** @type {Date} */
	this.actTime = copyData.actTime;
	/** @type {TemplateDefinition} */
	this.templateModel = copyData.templateModel;
	/** @type {string} */
	this.template = copyData.template;
	/** @type {boolean} */
	this.isNegated = copyData.isNegated;
	/** @type {Concept} */
	this.dischargeDispositionModel = copyData.dischargeDispositionModel;
	/** @type {string} */
	this.dischargeDisposition = copyData.dischargeDisposition;
	}
}  // PatientEncounter 
// SanteDB.Core.Model.Acts.Procedure, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!Procedure)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends Act
 * @summary             Represents a class which has an immediate and primary outcome and is an alteration             of the physical condition of the subject.            
 * @property {string} method            Gets or sets te method/technique used to perform the procedure            
 * @property {string} approachSite            Gets or sets the anatomical site or system through which the procedure was performed            
 * @property {string} targetSite            Gets or sets the anatomical site or system which is the target of the procedure            
 * @property {Concept} methodModel [Delay loaded from method],             Gets or sets te method/technique used to perform the procedure            
 * @property {Concept} approachSiteModel [Delay loaded from approachSite],             Gets or sets the anatomical site or system which is the target of the procedure            
 * @property {Concept} targetSiteModel [Delay loaded from targetSite],             Gets or sets te method/technique used to perform the procedure            
 * @property {boolean} isNegated            Gets or sets an indicator which identifies whether the act actually occurred, or            specifically did not occur            
 * @property {string} template            Gets the template key            
 * @property {TemplateDefinition} templateModel [Delay loaded from template],             Gets or sets the template definition            
 * @property {Date} actTime            Gets or sets the creation time in XML format            
 * @property {Date} startTime            Gets or sets the creation time in XML format            
 * @property {Date} stopTime            Gets or sets the creation time in XML format            
 * @property {string} classConcept            Gets or sets the key of the concept which classifies the act.            (see: {@link ActClassKeys} for values)
 * @property {string} moodConcept            Gets or sets the key of the concept which specifies the mood of the act.            (see: {@link ActMoodKeys} for values)
 * @property {string} reasonConcept            Gets or sets the key of the concept which defines the reason why the act is or didn't occur            (see: {@link ActReasonKeys} for values)
 * @property {string} statusConcept            Gets or sets the key of the concept which describes the current status of the act            (see: {@link StatusKeys} for values)
 * @property {string} typeConcept            Gets or sets the key of the conccept which further classifies the type of act occurring            
 * @property {Concept} classConceptModel [Delay loaded from classConcept],             Gets or sets the concept which classifies the type of act            
 * @property {Concept} moodConceptModel [Delay loaded from moodConcept],             Gets or sets the concept which specifies the mood of the act            
 * @property {Concept} reasonConceptModel [Delay loaded from reasonConcept],             Gets or sets the concept which indicates the reason of the act            
 * @property {Concept} statusConceptModel [Delay loaded from statusConcept],             Gets or sets the current status concept of the act            
 * @property {Concept} typeConceptModel [Delay loaded from typeConcept],             Type concept identifier            
 * @property {object} identifier            Gets or sets the identifiers by which this act is known as in other systems            
 * @property {ActIdentifier} identifier.classifier  where classifier is from {@link IdentifierBase} authority
 * @property {object} relationship            Gets a list of all associated acts for this act            
 * @property {ActRelationship} relationship.Appends             Indicates that the source act appends information contained in the target act            
 * @property {ActRelationship} relationship.Arrival             Links the transortation act from another act            
 * @property {ActRelationship} relationship.Departure             Links a transporation act from another act indicating departure of the subject            
 * @property {ActRelationship} relationship.Documents             The source act documents the target act            
 * @property {ActRelationship} relationship.EpisodeLink             Links two instances of the same act over time (example: chronic conditions)            
 * @property {ActRelationship} relationship.Evaluates             Used to link a goal to an observation            
 * @property {ActRelationship} relationship.Fulfills             Indicates that the source act fulfills the target act            
 * @property {ActRelationship} relationship.HasAuthorization             Indicates that the target act authorizes the source act            
 * @property {ActRelationship} relationship.HasComponent             Indicates that the target act is a component of the source act            
 * @property {ActRelationship} relationship.HasControlVariable             Relationship from an act to one or more control variables (for example: device settings, or environment)            
 * @property {ActRelationship} relationship.HasManifestation             The assertion that a new observation may be a manifestation of another            
 * @property {ActRelationship} relationship.HasPrecondition             Indicates that the target act is a pre-condition of the source act            
 * @property {ActRelationship} relationship.HasReason             Indicates a reasoning as to why the source act is occurring            
 * @property {ActRelationship} relationship.HasReferenceValues             Indicates that the source act contains reference values from the target            
 * @property {ActRelationship} relationship.HasSubject             Indicates the subject of a particular act (example: clinical act is a subject of a control act)            
 * @property {ActRelationship} relationship.HasSupport             Indicates an existing act is suggesting evidence for a new observation.            
 * @property {ActRelationship} relationship.IsCauseOf             Indicates that the source act is the cause of the target act            
 * @property {ActRelationship} relationship.IsDerivedFrom             Indicates the source act is derived from information contained in the target act            
 * @property {ActRelationship} relationship.IsExcerptOf             Indicates that the source act is an excerpt of the target act            
 * @property {ActRelationship} relationship.RefersTo             Indicates that the source act refers to the target act            
 * @property {ActRelationship} relationship.Replaces             The source act replaces the target act            
 * @property {ActRelationship} relationship.StartsAfterStartOf             Indicates that the source act starts after the start of another act            
 * @property {ActRelationship} relationship.Transforms             Indicates that the source act transforms the target act            
 * @property {ActRelationship} relationship.$other Unclassified
 * @property {SecurityPolicyInstance} policy            Gets or sets the security policy instances associated with the act            
 * @property {object} extension            Gets a list of all extensions associated with the act            
 * @property {string} extension.classifier  where classifier is from {@link Extension} extensionType
 * @property {string} note            Gets a list of all notes associated with the act            
 * @property {object} tag            Gets a list of all tags associated with the act            
 * @property {string} tag.classifier  where classifier is from {@link Tag} key
 * @property {ActProtocol} protocol            Identifies protocols attached to the act            
 * @property {object} participation            Gets or sets the entities and participations they play in the act            
 * @property {ActParticipation} participation.Admitter             The player entity was the person who was responsible for admitting the patient into a facility or care scenario.            
 * @property {ActParticipation} participation.Attender             The player entity represents the attending physician for the patient            
 * @property {ActParticipation} participation.Authenticator             The player entity represents an entity which authenticates the provision of care            
 * @property {ActParticipation} participation.Authororiginator             The player entity is responsible for the creation of data described in the act            
 * @property {ActParticipation} participation.Baby             The player is a resultant person in that it was the baby             
 * @property {ActParticipation} participation.Beneficiary             The player is a beneficiary of the act such a receiver of a financial instrument, or other good            
 * @property {ActParticipation} participation.CallbackContact             The player entity represents something that should be contacted upon completion of the act            
 * @property {ActParticipation} participation.CausativeAgent             The player entity is an agent which caused the act to occur            
 * @property {ActParticipation} participation.Consultant             The player entity is acting as a consult to the carrying out of the act            
 * @property {ActParticipation} participation.Consumable             The player entity was or is to be consumed during the process of carrying out the act.            
 * @property {ActParticipation} participation.CoverageTarget             The player entity represents the target coverage entity of the act            
 * @property {ActParticipation} participation.Custodian             The player entity is the data custodian of the act (is responsible for storing and securing the act)            
 * @property {ActParticipation} participation.DataEnterer             The player entity represents the person or device which phisically entered the data at the terminal            
 * @property {ActParticipation} participation.Destination             The player etity represents the ultimate destination of the goods/materials/services described in the act            
 * @property {ActParticipation} participation.Device             The player entity represents the device on which the act or data from the act was acquired or recorded            
 * @property {ActParticipation} participation.DirectTarget             The player entity represents the directed target of care provided in the act            
 * @property {ActParticipation} participation.Discharger             The player entity represents the person who is responsible for the discharging of the patient from an encounter            
 * @property {ActParticipation} participation.Distributor             The player entity is the source distribution point for the financial or material instruments contained in the message            
 * @property {ActParticipation} participation.Donor             The player entity represents the donor of tissue or materials used in the act            
 * @property {ActParticipation} participation.EntryLocation             The location where the act was entered.            
 * @property {ActParticipation} participation.Escort             The player entity was responsible for escorting the patient during the course of the act            
 * @property {ActParticipation} participation.Exposure             The player entity something to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureAgent             The player entity represents the agent (material) to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureSource             The player entity describes the source of the material to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureTarget             The player entity describes the target to which the agent was exposed            
 * @property {ActParticipation} participation.GuarantorParty             The player represents a party which is used as a financial guarantor for payment in the carrying out of the act            
 * @property {ActParticipation} participation.Holder             The player is responsible for holding the act            
 * @property {ActParticipation} participation.IndirectTarget             The entity not directly present in the act but which will be the focust of th act.            
 * @property {ActParticipation} participation.Informant             The player was a person or device which informed data presented in the act. (Example: A mother telling a nurse that their child had a reaction)            
 * @property {ActParticipation} participation.InformationRecipient             The player entity represents something that should be cc'ed on the act            
 * @property {ActParticipation} participation.LegalAuthenticator             The player entity is responsible for legally authenticating the content of the act            
 * @property {ActParticipation} participation.Location             The location where the service was performed.            
 * @property {ActParticipation} participation.NonreuseableDevice             The player represents a consumable that can no longer be used            
 * @property {ActParticipation} participation.Origin             The player represents the origin of the act            
 * @property {ActParticipation} participation.Participation             The player entity participates in the act in no particular classification            
 * @property {ActParticipation} participation.Performer             The player entity is responsible for performing the clinical steps documented in the act            
 * @property {ActParticipation} participation.PrimaryInformationRecipient             The player entity represents a high priority contact which should be informed or cc'ed on the act            
 * @property {ActParticipation} participation.PrimaryPerformer             The player entity was the primary performer of the act. This is used in procedures where more than one performer is present            
 * @property {ActParticipation} participation.Product             The player represents a product that is not necessarily consumed but informs the act            
 * @property {ActParticipation} participation.Receiver             The player represents the entity which is the intended receiver of the act            
 * @property {ActParticipation} participation.RecordTarget             The player represents the entity to which the act is recorded against            
 * @property {ActParticipation} participation.ReferredBy             The player represents the entity which referred the act or caused the act to be undertaken            
 * @property {ActParticipation} participation.ReferredTo             The player entity represents the entity which was referred to            
 * @property {ActParticipation} participation.Referrer             The player entity represents the person who was originally the referrer.            
 * @property {ActParticipation} participation.Remote             The player entity represents a remote portion of the act            
 * @property {ActParticipation} participation.ResponsibleParty             The player entity is ultimately responsible for the carrying out of the act            
 * @property {ActParticipation} participation.ReusableDevice             The player entity represents a device which can be reused in future acts            
 * @property {ActParticipation} participation.SecondaryPerformer             The secondary performing person (support clinician).            
 * @property {ActParticipation} participation.Specimen             The player entity represents a specimen collected for the purpose of testing and diagnosis            
 * @property {ActParticipation} participation.Subject             The player entity is the subject of an act, but not necessarily the record target (meaning the act is about a particular entity but not to be attached to their record)            
 * @property {ActParticipation} participation.Tracker             The player entity is responsible for tracking the progress of the act            
 * @property {ActParticipation} participation.Transcriber             The person who transcribed data from the original act.            
 * @property {ActParticipation} participation.UgentNotificationContact             The player entity represents a contact entity in case of an emergency occurs during the act.            
 * @property {ActParticipation} participation.Verifier             The player entity was responsible for verifying the accuracy of the data in the act            
 * @property {ActParticipation} participation.Via             The player entity represents an entity where the act occurred "via" this entity (i.e. in transport)            
 * @property {ActParticipation} participation.Witness             The player entity represents a legal witness to the act occurring.            
 * @property {ActParticipation} participation.$other Unclassified
 * @property {string} previousVersion
 * @property {string} version
 * @property {number} sequence
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {Procedure} copyData Copy constructor (if present)
 */
function Procedure (copyData) { 
	this.$type = 'Procedure';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {number} */
	this.sequence = copyData.sequence;
	/** @type {string} */
	this.version = copyData.version;
	/** @type {string} */
	this.previousVersion = copyData.previousVersion;
	/** @type {object} */
	this.participation = copyData.participation;
	/** @type {ActProtocol} */
	this.protocol = copyData.protocol;
	/** @type {object} */
	this.tag = copyData.tag;
	/** @type {string} */
	this.note = copyData.note;
	/** @type {object} */
	this.extension = copyData.extension;
	/** @type {SecurityPolicyInstance} */
	this.policy = copyData.policy;
	/** @type {object} */
	this.relationship = copyData.relationship;
	/** @type {object} */
	this.identifier = copyData.identifier;
	/** @type {Concept} */
	this.typeConceptModel = copyData.typeConceptModel;
	/** @type {Concept} */
	this.statusConceptModel = copyData.statusConceptModel;
	/** @type {Concept} */
	this.reasonConceptModel = copyData.reasonConceptModel;
	/** @type {Concept} */
	this.moodConceptModel = copyData.moodConceptModel;
	/** @type {Concept} */
	this.classConceptModel = copyData.classConceptModel;
	/** @type {string} */
	this.typeConcept = copyData.typeConcept;
	/** @type {string} */
	this.statusConcept = copyData.statusConcept;
	/** @type {string} */
	this.reasonConcept = copyData.reasonConcept;
	/** @type {string} */
	this.moodConcept = copyData.moodConcept;
	/** @type {string} */
	this.classConcept = copyData.classConcept;
	/** @type {Date} */
	this.stopTime = copyData.stopTime;
	/** @type {Date} */
	this.startTime = copyData.startTime;
	/** @type {Date} */
	this.actTime = copyData.actTime;
	/** @type {TemplateDefinition} */
	this.templateModel = copyData.templateModel;
	/** @type {string} */
	this.template = copyData.template;
	/** @type {boolean} */
	this.isNegated = copyData.isNegated;
	/** @type {Concept} */
	this.targetSiteModel = copyData.targetSiteModel;
	/** @type {Concept} */
	this.approachSiteModel = copyData.approachSiteModel;
	/** @type {Concept} */
	this.methodModel = copyData.methodModel;
	/** @type {string} */
	this.targetSite = copyData.targetSite;
	/** @type {string} */
	this.approachSite = copyData.approachSite;
	/** @type {string} */
	this.method = copyData.method;
	}
}  // Procedure 
// SanteDB.Core.Model.Acts.Protocol, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!Protocol)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @summary             Represents the model of a clinical protocol            
 * @description The protocol type is used to store and retrieve the particular definition of a clinical protocol. In 
 *             SanteDB, a clinical protocol represents a series of steps that *should* be taken by a clinician when caring for 
 *             a patient.
 *             A series of proposed steps generated by these protocol definitions are used to represent a care plan .
 *             
 * @property {string} name            Gets or sets the name of the protocol            
 * @property {string} handlerClass            Gets or sets the handler class AQN            
 * @property {string} oid            Gets or sets the OID            
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {Protocol} copyData Copy constructor (if present)
 */
function Protocol (copyData) { 
	this.$type = 'Protocol';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {string} */
	this.oid = copyData.oid;
	/** @type {string} */
	this.handlerClass = copyData.handlerClass;
	/** @type {string} */
	this.name = copyData.name;
	}
}  // Protocol 
// SanteDB.Core.Model.Acts.SubstanceAdministration, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!SubstanceAdministration)
/**
 * @class
 * @constructor
 * @memberof SanteDBModel
 * @public
 * @extends Act
 * @summary             Represents an act whereby a substance is administered to the patient            
 * @description The substance administration act is used whenever a clinician administers, plans to administer or should administer to a patient, a substance. 
 *             The substance that is administered is open but should be represented as either a Consumable (something that was consumed in the act of administration 
 *             like a manufactured material  or a product (if proposing or planning)).
 *             The type of administration (immunization, drug therapy, treatment, etc.) is classified by the substance administration's type concept . In some cases
 *             the dose quantity or dose measure are not required (when giving just "a dose") however it is recommended that implementations accurately track
 *             how much of the substance was administered.
 *             
 * @property {string} route            Gets or sets the key for route            
 * @property {string} doseUnit            Gets or sets the key for dosing unit            
 * @property {Concept} routeModel [Delay loaded from route],             Gets or sets a concept which indicates the route of administration (eg: Oral, Injection, etc.)            
 * @property {Concept} doseUnitModel [Delay loaded from doseUnit],             Gets or sets a concept which indicates the unit of measure for the dose (eg: 5 mL, 10 mL, 1 drop, etc.)            
 * @property {number} doseQuantity            Gets or sets the amount of substance administered            
 * @property {number} doseSequence            The sequence of the dose (i.e. OPV 0 = 0 , OPV 1 = 1, etc.)            
 * @property {string} site            Gets or sets the site            
 * @property {Concept} siteModel [Delay loaded from site],             Gets or sets a concept which indicates the site of administration            
 * @property {boolean} isNegated            Gets or sets an indicator which identifies whether the act actually occurred, or            specifically did not occur            
 * @property {string} template            Gets the template key            
 * @property {TemplateDefinition} templateModel [Delay loaded from template],             Gets or sets the template definition            
 * @property {Date} actTime            Gets or sets the creation time in XML format            
 * @property {Date} startTime            Gets or sets the creation time in XML format            
 * @property {Date} stopTime            Gets or sets the creation time in XML format            
 * @property {string} classConcept            Gets or sets the key of the concept which classifies the act.            (see: {@link ActClassKeys} for values)
 * @property {string} moodConcept            Gets or sets the key of the concept which specifies the mood of the act.            (see: {@link ActMoodKeys} for values)
 * @property {string} reasonConcept            Gets or sets the key of the concept which defines the reason why the act is or didn't occur            (see: {@link ActReasonKeys} for values)
 * @property {string} statusConcept            Gets or sets the key of the concept which describes the current status of the act            (see: {@link StatusKeys} for values)
 * @property {string} typeConcept            Gets or sets the key of the conccept which further classifies the type of act occurring            
 * @property {Concept} classConceptModel [Delay loaded from classConcept],             Gets or sets the concept which classifies the type of act            
 * @property {Concept} moodConceptModel [Delay loaded from moodConcept],             Gets or sets the concept which specifies the mood of the act            
 * @property {Concept} reasonConceptModel [Delay loaded from reasonConcept],             Gets or sets the concept which indicates the reason of the act            
 * @property {Concept} statusConceptModel [Delay loaded from statusConcept],             Gets or sets the current status concept of the act            
 * @property {Concept} typeConceptModel [Delay loaded from typeConcept],             Type concept identifier            
 * @property {object} identifier            Gets or sets the identifiers by which this act is known as in other systems            
 * @property {ActIdentifier} identifier.classifier  where classifier is from {@link IdentifierBase} authority
 * @property {object} relationship            Gets a list of all associated acts for this act            
 * @property {ActRelationship} relationship.Appends             Indicates that the source act appends information contained in the target act            
 * @property {ActRelationship} relationship.Arrival             Links the transortation act from another act            
 * @property {ActRelationship} relationship.Departure             Links a transporation act from another act indicating departure of the subject            
 * @property {ActRelationship} relationship.Documents             The source act documents the target act            
 * @property {ActRelationship} relationship.EpisodeLink             Links two instances of the same act over time (example: chronic conditions)            
 * @property {ActRelationship} relationship.Evaluates             Used to link a goal to an observation            
 * @property {ActRelationship} relationship.Fulfills             Indicates that the source act fulfills the target act            
 * @property {ActRelationship} relationship.HasAuthorization             Indicates that the target act authorizes the source act            
 * @property {ActRelationship} relationship.HasComponent             Indicates that the target act is a component of the source act            
 * @property {ActRelationship} relationship.HasControlVariable             Relationship from an act to one or more control variables (for example: device settings, or environment)            
 * @property {ActRelationship} relationship.HasManifestation             The assertion that a new observation may be a manifestation of another            
 * @property {ActRelationship} relationship.HasPrecondition             Indicates that the target act is a pre-condition of the source act            
 * @property {ActRelationship} relationship.HasReason             Indicates a reasoning as to why the source act is occurring            
 * @property {ActRelationship} relationship.HasReferenceValues             Indicates that the source act contains reference values from the target            
 * @property {ActRelationship} relationship.HasSubject             Indicates the subject of a particular act (example: clinical act is a subject of a control act)            
 * @property {ActRelationship} relationship.HasSupport             Indicates an existing act is suggesting evidence for a new observation.            
 * @property {ActRelationship} relationship.IsCauseOf             Indicates that the source act is the cause of the target act            
 * @property {ActRelationship} relationship.IsDerivedFrom             Indicates the source act is derived from information contained in the target act            
 * @property {ActRelationship} relationship.IsExcerptOf             Indicates that the source act is an excerpt of the target act            
 * @property {ActRelationship} relationship.RefersTo             Indicates that the source act refers to the target act            
 * @property {ActRelationship} relationship.Replaces             The source act replaces the target act            
 * @property {ActRelationship} relationship.StartsAfterStartOf             Indicates that the source act starts after the start of another act            
 * @property {ActRelationship} relationship.Transforms             Indicates that the source act transforms the target act            
 * @property {ActRelationship} relationship.$other Unclassified
 * @property {SecurityPolicyInstance} policy            Gets or sets the security policy instances associated with the act            
 * @property {object} extension            Gets a list of all extensions associated with the act            
 * @property {string} extension.classifier  where classifier is from {@link Extension} extensionType
 * @property {string} note            Gets a list of all notes associated with the act            
 * @property {object} tag            Gets a list of all tags associated with the act            
 * @property {string} tag.classifier  where classifier is from {@link Tag} key
 * @property {ActProtocol} protocol            Identifies protocols attached to the act            
 * @property {object} participation            Gets or sets the entities and participations they play in the act            
 * @property {ActParticipation} participation.Admitter             The player entity was the person who was responsible for admitting the patient into a facility or care scenario.            
 * @property {ActParticipation} participation.Attender             The player entity represents the attending physician for the patient            
 * @property {ActParticipation} participation.Authenticator             The player entity represents an entity which authenticates the provision of care            
 * @property {ActParticipation} participation.Authororiginator             The player entity is responsible for the creation of data described in the act            
 * @property {ActParticipation} participation.Baby             The player is a resultant person in that it was the baby             
 * @property {ActParticipation} participation.Beneficiary             The player is a beneficiary of the act such a receiver of a financial instrument, or other good            
 * @property {ActParticipation} participation.CallbackContact             The player entity represents something that should be contacted upon completion of the act            
 * @property {ActParticipation} participation.CausativeAgent             The player entity is an agent which caused the act to occur            
 * @property {ActParticipation} participation.Consultant             The player entity is acting as a consult to the carrying out of the act            
 * @property {ActParticipation} participation.Consumable             The player entity was or is to be consumed during the process of carrying out the act.            
 * @property {ActParticipation} participation.CoverageTarget             The player entity represents the target coverage entity of the act            
 * @property {ActParticipation} participation.Custodian             The player entity is the data custodian of the act (is responsible for storing and securing the act)            
 * @property {ActParticipation} participation.DataEnterer             The player entity represents the person or device which phisically entered the data at the terminal            
 * @property {ActParticipation} participation.Destination             The player etity represents the ultimate destination of the goods/materials/services described in the act            
 * @property {ActParticipation} participation.Device             The player entity represents the device on which the act or data from the act was acquired or recorded            
 * @property {ActParticipation} participation.DirectTarget             The player entity represents the directed target of care provided in the act            
 * @property {ActParticipation} participation.Discharger             The player entity represents the person who is responsible for the discharging of the patient from an encounter            
 * @property {ActParticipation} participation.Distributor             The player entity is the source distribution point for the financial or material instruments contained in the message            
 * @property {ActParticipation} participation.Donor             The player entity represents the donor of tissue or materials used in the act            
 * @property {ActParticipation} participation.EntryLocation             The location where the act was entered.            
 * @property {ActParticipation} participation.Escort             The player entity was responsible for escorting the patient during the course of the act            
 * @property {ActParticipation} participation.Exposure             The player entity something to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureAgent             The player entity represents the agent (material) to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureSource             The player entity describes the source of the material to which the patient was exposed            
 * @property {ActParticipation} participation.ExposureTarget             The player entity describes the target to which the agent was exposed            
 * @property {ActParticipation} participation.GuarantorParty             The player represents a party which is used as a financial guarantor for payment in the carrying out of the act            
 * @property {ActParticipation} participation.Holder             The player is responsible for holding the act            
 * @property {ActParticipation} participation.IndirectTarget             The entity not directly present in the act but which will be the focust of th act.            
 * @property {ActParticipation} participation.Informant             The player was a person or device which informed data presented in the act. (Example: A mother telling a nurse that their child had a reaction)            
 * @property {ActParticipation} participation.InformationRecipient             The player entity represents something that should be cc'ed on the act            
 * @property {ActParticipation} participation.LegalAuthenticator             The player entity is responsible for legally authenticating the content of the act            
 * @property {ActParticipation} participation.Location             The location where the service was performed.            
 * @property {ActParticipation} participation.NonreuseableDevice             The player represents a consumable that can no longer be used            
 * @property {ActParticipation} participation.Origin             The player represents the origin of the act            
 * @property {ActParticipation} participation.Participation             The player entity participates in the act in no particular classification            
 * @property {ActParticipation} participation.Performer             The player entity is responsible for performing the clinical steps documented in the act            
 * @property {ActParticipation} participation.PrimaryInformationRecipient             The player entity represents a high priority contact which should be informed or cc'ed on the act            
 * @property {ActParticipation} participation.PrimaryPerformer             The player entity was the primary performer of the act. This is used in procedures where more than one performer is present            
 * @property {ActParticipation} participation.Product             The player represents a product that is not necessarily consumed but informs the act            
 * @property {ActParticipation} participation.Receiver             The player represents the entity which is the intended receiver of the act            
 * @property {ActParticipation} participation.RecordTarget             The player represents the entity to which the act is recorded against            
 * @property {ActParticipation} participation.ReferredBy             The player represents the entity which referred the act or caused the act to be undertaken            
 * @property {ActParticipation} participation.ReferredTo             The player entity represents the entity which was referred to            
 * @property {ActParticipation} participation.Referrer             The player entity represents the person who was originally the referrer.            
 * @property {ActParticipation} participation.Remote             The player entity represents a remote portion of the act            
 * @property {ActParticipation} participation.ResponsibleParty             The player entity is ultimately responsible for the carrying out of the act            
 * @property {ActParticipation} participation.ReusableDevice             The player entity represents a device which can be reused in future acts            
 * @property {ActParticipation} participation.SecondaryPerformer             The secondary performing person (support clinician).            
 * @property {ActParticipation} participation.Specimen             The player entity represents a specimen collected for the purpose of testing and diagnosis            
 * @property {ActParticipation} participation.Subject             The player entity is the subject of an act, but not necessarily the record target (meaning the act is about a particular entity but not to be attached to their record)            
 * @property {ActParticipation} participation.Tracker             The player entity is responsible for tracking the progress of the act            
 * @property {ActParticipation} participation.Transcriber             The person who transcribed data from the original act.            
 * @property {ActParticipation} participation.UgentNotificationContact             The player entity represents a contact entity in case of an emergency occurs during the act.            
 * @property {ActParticipation} participation.Verifier             The player entity was responsible for verifying the accuracy of the data in the act            
 * @property {ActParticipation} participation.Via             The player entity represents an entity where the act occurred "via" this entity (i.e. in transport)            
 * @property {ActParticipation} participation.Witness             The player entity represents a legal witness to the act occurring.            
 * @property {ActParticipation} participation.$other Unclassified
 * @property {string} previousVersion
 * @property {string} version
 * @property {number} sequence
 * @property {Date} creationTimeModel [Delay loaded from creationTime],             Gets or sets the time at which the data was created            
 * @property {Date} creationTime            Gets or sets the creation time in XML format            
 * @property {Date} obsoletionTimeModel [Delay loaded from obsoletionTime],             Gets or sets the time when the data is or will become invalid            
 * @property {Date} obsoletionTime            Gets or sets the creation time in XML format            
 * @property {SecurityUser} createdByModel [Delay loaded from createdBy],             Gets or sets the user that created this base data            
 * @property {Date} modifiedOn            Gets the time that the object was last modified (from base data, default to CreationTime)            
 * @property {SecurityUser} obsoletedByModel [Delay loaded from obsoletedBy],             Gets or sets the user that obsoleted this base data            
 * @property {string} createdBy            Gets or sets the identifier of the user which created the data            
 * @property {string} obsoletedBy            Gets or sets the identifier of the user which obsoleted the data            
 * @property {string} id            The internal primary key value of the entity            
 * @property {string} $type            Gets the type            
 * @param {SubstanceAdministration} copyData Copy constructor (if present)
 */
function SubstanceAdministration (copyData) { 
	this.$type = 'SubstanceAdministration';
	if(copyData) {
	/** @type {string} */
	this.id = copyData.id;
	/** @type {string} */
	this.obsoletedBy = copyData.obsoletedBy;
	/** @type {string} */
	this.createdBy = copyData.createdBy;
	/** @type {SecurityUser} */
	this.obsoletedByModel = copyData.obsoletedByModel;
	/** @type {Date} */
	this.modifiedOn = copyData.modifiedOn;
	/** @type {SecurityUser} */
	this.createdByModel = copyData.createdByModel;
	/** @type {Date} */
	this.obsoletionTime = copyData.obsoletionTime;
	/** @type {Date} */
	this.obsoletionTimeModel = copyData.obsoletionTimeModel;
	/** @type {Date} */
	this.creationTime = copyData.creationTime;
	/** @type {Date} */
	this.creationTimeModel = copyData.creationTimeModel;
	/** @type {number} */
	this.sequence = copyData.sequence;
	/** @type {string} */
	this.version = copyData.version;
	/** @type {string} */
	this.previousVersion = copyData.previousVersion;
	/** @type {object} */
	this.participation = copyData.participation;
	/** @type {ActProtocol} */
	this.protocol = copyData.protocol;
	/** @type {object} */
	this.tag = copyData.tag;
	/** @type {string} */
	this.note = copyData.note;
	/** @type {object} */
	this.extension = copyData.extension;
	/** @type {SecurityPolicyInstance} */
	this.policy = copyData.policy;
	/** @type {object} */
	this.relationship = copyData.relationship;
	/** @type {object} */
	this.identifier = copyData.identifier;
	/** @type {Concept} */
	this.typeConceptModel = copyData.typeConceptModel;
	/** @type {Concept} */
	this.statusConceptModel = copyData.statusConceptModel;
	/** @type {Concept} */
	this.reasonConceptModel = copyData.reasonConceptModel;
	/** @type {Concept} */
	this.moodConceptModel = copyData.moodConceptModel;
	/** @type {Concept} */
	this.classConceptModel = copyData.classConceptModel;
	/** @type {string} */
	this.typeConcept = copyData.typeConcept;
	/** @type {string} */
	this.statusConcept = copyData.statusConcept;
	/** @type {string} */
	this.reasonConcept = copyData.reasonConcept;
	/** @type {string} */
	this.moodConcept = copyData.moodConcept;
	/** @type {string} */
	this.classConcept = copyData.classConcept;
	/** @type {Date} */
	this.stopTime = copyData.stopTime;
	/** @type {Date} */
	this.startTime = copyData.startTime;
	/** @type {Date} */
	this.actTime = copyData.actTime;
	/** @type {TemplateDefinition} */
	this.templateModel = copyData.templateModel;
	/** @type {string} */
	this.template = copyData.template;
	/** @type {boolean} */
	this.isNegated = copyData.isNegated;
	/** @type {Concept} */
	this.siteModel = copyData.siteModel;
	/** @type {string} */
	this.site = copyData.site;
	/** @type {number} */
	this.doseSequence = copyData.doseSequence;
	/** @type {number} */
	this.doseQuantity = copyData.doseQuantity;
	/** @type {Concept} */
	this.doseUnitModel = copyData.doseUnitModel;
	/** @type {Concept} */
	this.routeModel = copyData.routeModel;
	/** @type {string} */
	this.doseUnit = copyData.doseUnit;
	/** @type {string} */
	this.route = copyData.route;
	}
}  // SubstanceAdministration 
// SanteDB.Core.Model.Warehouse.SchemaPropertyType, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!SchemaPropertyType)
/**
 * @enum {string}
 * @memberof SanteDBModel
 * @public
 * @readonly
 * @summary             Identifies the type which a schema property carries            
 */
var SchemaPropertyType = { 
	/** 
	 *             The object represents a string            
	 */
	String : 'String',
	/** 
	 *             The object represents an integer            
	 */
	Integer : 'Integer',
	/** 
	 *             The object represents a floating point number            
	 */
	Float : 'Float',
	/** 
	 *             Date            
	 */
	Date : 'Date',
	/** 
	 *             Identifies the column is a boolean            
	 */
	Boolean : 'Boolean',
	/** 
	 *             Identifies the column is a UUID            
	 */
	Uuid : 'Uuid',
	/** 
	 *             Identifies the column as binary            
	 */
	Binary : 'Binary',
	/** 
	 *             Decimal            
	 */
	Decimal : 'Decimal',
	/** 
	 *             Identifies the column is an object which has other data            
	 */
	Object : 'Object',
	/** 
	 *             Identifies a column has a date and a time            
	 */
	DateTime : 'DateTime',
	/** 
	 *             Represents a timestamp (with timezone)            
	 */
	TimeStamp : 'TimeStamp',
}  // SchemaPropertyType 
// SanteDB.Core.Model.Warehouse.SchemaPropertyAttributes, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!SchemaPropertyAttributes)
/**
 * @enum {string}
 * @memberof SanteDBModel
 * @public
 * @readonly
 * @summary             Identifies the type which a schema property carries            
 */
var SchemaPropertyAttributes = { 
	/** 
	 *             No attributes            
	 */
	None : 'None',
	/** 
	 *             Indexed            
	 */
	Indexed : 'Indexed',
	/** 
	 *             Not null            
	 */
	NotNull : 'NotNull',
	/** 
	 *             Unique            
	 */
	Unique : 'Unique',
}  // SchemaPropertyAttributes 
// SanteDB.Core.Model.Constants.UserClassKeys, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!UserClassKeys)
/**
 * @enum {string}
 * @memberof SanteDBModel
 * @public
 * @readonly
 * @summary             Represents user classification keys            
 */
var UserClassKeys = { 
	/** 
	 *             Represents a user which is an application            
	 */
	ApplicationUser : 'e9cd4dad-2759-4022-ab07-92fcfb236a98',
	/** 
	 *             Represents a user which is a human            
	 */
	HumanUser : '33932b42-6f4b-4659-8849-6aca54139d8e',
	/** 
	 *             Represents a user which is a system user            
	 */
	SystemUser : '9f71bb34-9691-440f-8249-9c831ea16d58',
}  // UserClassKeys 
// SanteDB.Core.Model.DataTypes.DatePrecision, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!DatePrecision)
/**
 * @enum {string}
 * @memberof SanteDBModel
 * @public
 * @readonly
 * @summary             Represents a date precision object            
 */
var DatePrecision = { 
	/** 
	 *             Represents full date precision.            
	 */
	Full : 'Full',
	/** 
	 *             Represents year date precision.            
	 */
	Year : 'Year',
	/** 
	 *             Represents month date precision.            
	 */
	Month : 'Month',
	/** 
	 *             Represents day date precision.            
	 */
	Day : 'Day',
	/** 
	 *             Represents hour date precision.            
	 */
	Hour : 'Hour',
	/** 
	 *             Represents minute date precision.            
	 */
	Minute : 'Minute',
	/** 
	 *             Represents second date precision.            
	 */
	Second : 'Second',
}  // DatePrecision 
// SanteDB.Core.Model.Constants.AddressUseKeys, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!AddressUseKeys)
/**
 * @enum {string}
 * @memberof SanteDBModel
 * @public
 * @readonly
 * @summary             Address use keys            
 */
var AddressUseKeys = { 
	/** 
	 *             Represents an alphabetic address used for matching             
	 */
	Alphabetic : '71d1c07c-6ee6-4240-8a95-19f96583512e',
	/** 
	 *             Represents a bad address, i.e. an address which is old or invalid.            
	 */
	BadAddress : 'f3132fc0-aadd-40b7-b875-961c40695389',
	/** 
	 *             Represents a workplace address that reaches the person directly without intermediaries.            
	 */
	Direct : 'd0db6edb-6cdc-4671-8bc2-00f1c808e188',
	/** 
	 *             The home address            
	 */
	HomeAddress : '493c3e9d-4f65-4e4d-9582-c9008f4f2eb4',
	/** 
	 *             Represents an address expressed in an ideographic manner (example: Kanji)            
	 */
	Ideographic : '09000479-4672-44f8-bb4a-72fb25f7356a',
	/** 
	 *             Represents an address expressed as a phonetic spelling of an ideographic address            
	 */
	Phonetic : '2b085d38-3308-4664-9f89-48d8ef4daba7',
	/** 
	 *             The address is a physical place where visits should occur            
	 */
	PhysicalVisit : '5724a9b6-24b6-43b7-8075-7a0d61fcb814',
	/** 
	 *             The address is a postal address used for the delivery of mail and materials            
	 */
	PostalAddress : '7246e98d-20c6-4ae6-85ad-4aa09649feb7',
	/** 
	 *             Represents a primary address to reach a contact after business hours.            
	 */
	PrimaryHome : 'c4faafd8-fc90-4330-8b4b-e4e64c86b87b',
	/** 
	 *             Represents an address that is a standard address that may be subject to a switchboard or operator prior to reaching the intended entity.            
	 */
	Public : 'ec35ea7c-55d2-4619-a56b-f7a986412f7f',
	/** 
	 *             Represents an address used for soundex matching purposes.            
	 */
	Soundex : 'e5794e3b-3025-436f-9417-5886feead55a',
	/** 
	 *             Represents a syllabic address.            
	 */
	Syllabic : 'b4ca3bf0-a7fc-44f3-87d5-e126beda93ff',
	/** 
	 *             Represents a temporary address that may be good for visiting or mailing.            
	 */
	TemporaryAddress : 'cef6ea31-a097-4f59-8723-a38c727c6597',
	/** 
	 *             Represents a vacation home to reach a person while on vacation.            
	 */
	VacationHome : '5d69534c-4597-4d11-bb98-56a9918f5238',
	/** 
	 *             Represents an office address, should be used for business communications            
	 */
	WorkPlace : 'eaa6f08e-bb8e-4457-9dc0-3a1555fadf5c',
}  // AddressUseKeys 
// SanteDB.Core.Model.Constants.EntityClassKeys, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!EntityClassKeys)
/**
 * @enum {string}
 * @memberof SanteDBModel
 * @public
 * @readonly
 * @summary             Entity class concept keys            
 */
var EntityClassKeys = { 
	/** 
	 *             Animal            
	 */
	Animal : '61fcbf42-b5e0-4fb5-9392-108a5c6dbec7',
	/** 
	 *             Chemical Substance            
	 */
	ChemicalSubstance : '2e9fa332-9391-48c6-9fc8-920a750b25d3',
	/** 
	 *             City or town            
	 */
	CityOrTown : '79dd4f75-68e8-4722-a7f5-8bc2e08f5cd6',
	/** 
	 *             Container            
	 */
	Container : 'b76ff324-b174-40b7-a6ac-d1fdf8e23967',
	/** 
	 *             Country or nation            
	 */
	Country : '48b2ffb3-07db-47ba-ad73-fc8fb8502471',
	/** 
	 *             County or parish            
	 */
	CountyOrParish : 'd9489d56-ddac-4596-b5c6-8f41d73d8dc5',
	/** 
	 *             Device            
	 */
	Device : '1373ff04-a6ef-420a-b1d0-4a07465fe8e8',
	/** 
	 *             Entity            
	 */
	Entity : 'e29fcfad-ec1d-4c60-a055-039a494248ae',
	/** 
	 *             Food            
	 */
	Food : 'e5a09cc2-5ae5-40c2-8e32-687dba06715d',
	/** 
	 *             Living Subject            
	 */
	LivingSubject : '8ba5e5c9-693b-49d4-973c-d7010f3a23ee',
	/** 
	 *             Manufactured material            
	 */
	ManufacturedMaterial : 'fafec286-89d5-420b-9085-054aca9d1eef',
	/** 
	 *             Material            
	 */
	Material : 'd39073be-0f8f-440e-b8c8-7034cc138a95',
	/** 
	 *             Non living subject            
	 */
	NonLivingSubject : '9025e5c9-693b-49d4-973c-d7010f3a23ee',
	/** 
	 *             Organization            
	 */
	Organization : '7c08bd55-4d42-49cd-92f8-6388d6c4183f',
	/** 
	 *             Patient            
	 */
	Patient : 'bacd9c6f-3fa9-481e-9636-37457962804d',
	/** 
	 *             Person            
	 */
	Person : '9de2a846-ddf2-4ebc-902e-84508c5089ea',
	/** 
	 *             Place            
	 */
	Place : '21ab7873-8ef3-4d78-9c19-4582b3c40631',
	/** 
	 *             Service delivery location            
	 */
	Provider : '6b04fed8-c164-469c-910b-f824c2bda4f0',
	/** 
	 *             Service delivery location            
	 */
	ServiceDeliveryLocation : 'ff34dfa7-c6d3-4f8b-bc9f-14bcdc13ba6c',
	/** 
	 *             State            
	 */
	State : '8cf4b0b0-84e5-4122-85fe-6afa8240c218',
}  // EntityClassKeys 
// SanteDB.Core.Model.Constants.DeterminerKeys, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!DeterminerKeys)
/**
 * @enum {string}
 * @memberof SanteDBModel
 * @public
 * @readonly
 * @summary             Determiner codes classify an entity into one of three categories.             
 */
var DeterminerKeys = { 
	/** 
	 *             Indicates the entity is not a particular instance of a thing, rather a type of thing            
	 */
	Described : 'ad28a7ac-a66b-42c4-91b4-de40a2b11980',
	/** 
	 *             Indicates the entity is a type of thing that has been qualified further            
	 */
	DescribedQualified : '604cf1b7-8891-49fb-b95f-3e4e875691bc',
	/** 
	 *             Indicates the entity is a specific instance of a thing            
	 */
	Specific : 'f29f08de-78a7-4a5e-aeaf-7b545ba19a09',
}  // DeterminerKeys 
// SanteDB.Core.Model.Constants.NameUseKeys, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!NameUseKeys)
/**
 * @enum {string}
 * @memberof SanteDBModel
 * @public
 * @readonly
 * @summary             Name use keys            
 */
var NameUseKeys = { 
	/** 
	 *             The name used is an alphabetic representation of the name (ex: romaji in Japanese)            
	 */
	Alphabetic : '71d1c07c-6ee6-4240-8a95-19f96583512e',
	/** 
	 *             The name is an anonymous name for the object (not the real name but a name used for care delivery)            
	 */
	Anonymous : '95e6843a-26ff-4046-b6f4-eb440d4b85f7',
	/** 
	 *             The name represents an artist name or stage name            
	 */
	Artist : '4a7bf199-f33b-42f9-8b99-32433ea67bd7',
	/** 
	 *             The name represents an assigned name (given or bestowed by an authority)            
	 */
	Assigned : 'a87a6d21-2ca6-4aea-88f3-6135cceb58d1',
	/** 
	 *             THe name represents an ideographic representation of the name            
	 */
	Ideographic : '09000479-4672-44f8-bb4a-72fb25f7356a',
	/** 
	 *             The name is an indigenous name or tribal name for the patient            
	 */
	Indigenous : 'a3fb2a05-5ebe-47ae-afd0-4c1b22336090',
	/** 
	 *             The name represents the current legal name of an object (such as a corporate name)            
	 */
	Legal : 'effe122d-8d30-491d-805d-addcb4466c35',
	/** 
	 *             The name represents a name as displayed on a license or known to a license authority            
	 */
	License : '48075d19-7b29-4ca5-9c73-0cbd31248446',
	/** 
	 *             THe name is a maiden name (name of a patient before marriage)            
	 */
	MaidenName : '0674c1c8-963a-4658-aff9-8cdcd308fa68',
	/** 
	 *             The name as it appears on an official record            
	 */
	OfficialRecord : '1ec9583a-b019-4baa-b856-b99caf368656',
	/** 
	 *             The name represents a phonetic representation of a name such as a SOUNDEX code            
	 */
	Phonetic : '2b085d38-3308-4664-9f89-48d8ef4daba7',
	/** 
	 *             The name is a pseudonym for the object or an synonym name            
	 */
	Pseudonym : 'c31564ef-ca8d-4528-85a8-88245fcef344',
	/** 
	 *             The name is to be used for religious purposes (such as baptismal name)            
	 */
	Religious : '15207687-5290-4672-a7df-2880a23dcbb5',
	/** 
	 *             The name is to be used in the performing of matches only            
	 */
	Search : '87964bff-e442-481d-9749-69b2a84a1fbe',
	/** 
	 *             The name represents the computed soundex code of a name            
	 */
	Soundex : 'e5794e3b-3025-436f-9417-5886feead55a',
	/** 
	 *             The name represents a syllabic name.            
	 */
	Syllabic : 'b4ca3bf0-a7fc-44f3-87d5-e126beda93ff',
}  // NameUseKeys 
// SanteDB.Core.Model.Constants.ActParticipationKey, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ActParticipationKey)
/**
 * @enum {string}
 * @memberof SanteDBModel
 * @public
 * @readonly
 * @summary             Represents the participation concepts which an entity can participate in an act            
 */
var ActParticipationKey = { 
	/** 
	 *             The player entity was the person who was responsible for admitting the patient into a facility or care scenario.            
	 */
	Admitter : 'a0174216-6439-4351-9483-a241a48029b7',
	/** 
	 *             The player entity represents the attending physician for the patient            
	 */
	Attender : '6cbf29ad-ac51-48c9-885a-cfe3026ecf6e',
	/** 
	 *             The player entity represents an entity which authenticates the provision of care            
	 */
	Authenticator : '1b2dbf82-a503-4cf4-9ecb-a8e111b4674e',
	/** 
	 *             The player entity is responsible for the creation of data described in the act            
	 */
	Authororiginator : 'f0cb3faf-435d-4704-9217-b884f757bc14',
	/** 
	 *             The player is a resultant person in that it was the baby             
	 */
	Baby : '479896b0-35d5-4842-8109-5fdbee14e8a4',
	/** 
	 *             The player is a beneficiary of the act such a receiver of a financial instrument, or other good            
	 */
	Beneficiary : '28c744df-d889-4a44-bc1a-2e9e9d64af13',
	/** 
	 *             The player entity represents something that should be contacted upon completion of the act            
	 */
	CallbackContact : '9c4c40ae-2c15-4581-a496-be1abfe4eb66',
	/** 
	 *             The player entity is an agent which caused the act to occur            
	 */
	CausativeAgent : '7f81b83e-0d78-4685-8ba4-224eb315ce54',
	/** 
	 *             The player entity is acting as a consult to the carrying out of the act            
	 */
	Consultant : '0a364ad7-f961-4d8a-93f0-1fd4176548b3',
	/** 
	 *             The player entity was or is to be consumed during the process of carrying out the act.            
	 */
	Consumable : 'a5cac7f7-e3b7-4dd8-872c-db0e7fcc2d84',
	/** 
	 *             The player entity represents the target coverage entity of the act            
	 */
	CoverageTarget : '4b5471d4-e3fe-45f7-85a2-ae2b4f224757',
	/** 
	 *             The player entity is the data custodian of the act (is responsible for storing and securing the act)            
	 */
	Custodian : '649d6d69-139c-4006-ae45-aff4649d6079',
	/** 
	 *             The player entity represents the person or device which phisically entered the data at the terminal            
	 */
	DataEnterer : 'c50d66d2-e5da-4a34-b2b7-4cd4fe4ef2c4',
	/** 
	 *             The player etity represents the ultimate destination of the goods/materials/services described in the act            
	 */
	Destination : '727b3624-ea62-46bb-a68b-b9e49e302eca',
	/** 
	 *             The player entity represents the device on which the act or data from the act was acquired or recorded            
	 */
	Device : '1373ff04-a6ef-420a-b1d0-4a07465fe8e8',
	/** 
	 *             The player entity represents the directed target of care provided in the act            
	 */
	DirectTarget : 'd9f63423-ba9b-48d9-ba38-c404b784b670',
	/** 
	 *             The player entity represents the person who is responsible for the discharging of the patient from an encounter            
	 */
	Discharger : 'a2594e6e-e8fe-4c68-82a5-d3a46dbec87d',
	/** 
	 *             The player entity is the source distribution point for the financial or material instruments contained in the message            
	 */
	Distributor : '693f08fa-625a-40d2-b928-6856099c0349',
	/** 
	 *             The player entity represents the donor of tissue or materials used in the act            
	 */
	Donor : 'be1235ee-710a-4732-88fd-6e895de7c56d',
	/** 
	 *             The location where the act was entered.            
	 */
	EntryLocation : 'ac05185b-5a80-47a8-b924-060deb6d0eb2',
	/** 
	 *             The player entity was responsible for escorting the patient during the course of the act            
	 */
	Escort : '727a61ed-2f35-4e09-8bb6-6d09e2ba8fec',
	/** 
	 *             The player entity something to which the patient was exposed            
	 */
	Exposure : '5a6a6766-8e1d-4d36-ae50-9b7d82d8a182',
	/** 
	 *             The player entity represents the agent (material) to which the patient was exposed            
	 */
	ExposureAgent : 'ea60a5a9-e971-4f0d-bb5d-dc7a0c74a2c9',
	/** 
	 *             The player entity describes the source of the material to which the patient was exposed            
	 */
	ExposureSource : 'cbb6297b-743c-453c-8476-ba4c10a1c965',
	/** 
	 *             The player entity describes the target to which the agent was exposed            
	 */
	ExposureTarget : 'ec401b5c-4c33-4229-9c72-428fc5db37ff',
	/** 
	 *             The player represents a party which is used as a financial guarantor for payment in the carrying out of the act            
	 */
	GuarantorParty : '28fb791e-179e-461a-b16c-cac13a04bd0a',
	/** 
	 *             The player is responsible for holding the act            
	 */
	Holder : '2452b691-f122-4121-b9df-76d990b43f35',
	/** 
	 *             The entity not directly present in the act but which will be the focust of th act.            
	 */
	IndirectTarget : '3a9f0c2f-e322-4639-a8e7-0df67cac761b',
	/** 
	 *             The player was a person or device which informed data presented in the act. (Example: A mother telling a nurse that their child had a reaction)            
	 */
	Informant : '39604248-7812-4b60-bc54-8cc1fffb1de6',
	/** 
	 *             The player entity represents something that should be cc'ed on the act            
	 */
	InformationRecipient : '9790b291-b8a3-4c85-a240-c2c38885ad5d',
	/** 
	 *             The player entity is responsible for legally authenticating the content of the act            
	 */
	LegalAuthenticator : '0716a333-cd46-439d-bfd6-bf788f3885fa',
	/** 
	 *             The location where the service was performed.            
	 */
	Location : '61848557-d78d-40e5-954f-0b9c97307a04',
	/** 
	 *             The player represents a consumable that can no longer be used            
	 */
	NonreuseableDevice : '6792db6c-fd5c-4ab8-96f5-ace5665bdcb9',
	/** 
	 *             The player represents the origin of the act            
	 */
	Origin : '5d175f21-1963-4589-a400-b5ef5f64842c',
	/** 
	 *             The player entity participates in the act in no particular classification            
	 */
	Participation : 'c704a23d-86ef-4e11-9050-f8aa10919ff2',
	/** 
	 *             The player entity is responsible for performing the clinical steps documented in the act            
	 */
	Performer : 'fa5e70a4-a46e-4665-8a20-94d4d7b86fc8',
	/** 
	 *             The player entity represents a high priority contact which should be informed or cc'ed on the act            
	 */
	PrimaryInformationRecipient : '02bb7934-76b5-4cc5-bd42-58570f15eb4d',
	/** 
	 *             The player entity was the primary performer of the act. This is used in procedures where more than one performer is present            
	 */
	PrimaryPerformer : '79f6136c-1465-45e8-917e-e7832bc8e3b2',
	/** 
	 *             The player represents a product that is not necessarily consumed but informs the act            
	 */
	Product : '99e77288-cb09-4050-a8cf-385513f32f0a',
	/** 
	 *             The player represents the entity which is the intended receiver of the act            
	 */
	Receiver : '53c694b8-27d8-43dd-95a4-bb318431d17c',
	/** 
	 *             The player represents the entity to which the act is recorded against            
	 */
	RecordTarget : '3f92dbee-a65e-434f-98ce-841feeb02e3f',
	/** 
	 *             The player represents the entity which referred the act or caused the act to be undertaken            
	 */
	ReferredBy : '6da3a6ca-2ab0-4d32-9588-e094f277f06d',
	/** 
	 *             The player entity represents the entity which was referred to            
	 */
	ReferredTo : '353f9255-765e-4336-8007-1d61ab09aad6',
	/** 
	 *             The player entity represents the person who was originally the referrer.            
	 */
	Referrer : '5e8e0f8b-bc23-4847-82ab-49b8dd79981e',
	/** 
	 *             The player entity represents a remote portion of the act            
	 */
	Remote : '3c1225de-194e-49ce-a41a-0f9376b04c11',
	/** 
	 *             The player entity is ultimately responsible for the carrying out of the act            
	 */
	ResponsibleParty : '64474c12-b978-4bb6-a584-46dadec2d952',
	/** 
	 *             The player entity represents a device which can be reused in future acts            
	 */
	ReusableDevice : '76990d3d-3f27-4b39-836b-ba87eeba3328',
	/** 
	 *             The secondary performing person (support clinician).            
	 */
	SecondaryPerformer : '4ff91e06-2e39-44e3-9fbe-0d828fe318fe',
	/** 
	 *             The player entity represents a specimen collected for the purpose of testing and diagnosis            
	 */
	Specimen : 'bce17b21-05b2-4f02-bf7a-c6d3561aa948',
	/** 
	 *             The player entity is the subject of an act, but not necessarily the record target (meaning the act is about a particular entity but not to be attached to their record)            
	 */
	Subject : '03067700-ce37-405f-8ed3-e4965ba2f601',
	/** 
	 *             The player entity is responsible for tracking the progress of the act            
	 */
	Tracker : 'c3be013a-20c5-4c20-840c-d9dbb15d040e',
	/** 
	 *             The person who transcribed data from the original act.            
	 */
	Transcriber : 'de3f7527-e3c9-45ef-8574-00ca4495f767',
	/** 
	 *             The player entity represents a contact entity in case of an emergency occurs during the act.            
	 */
	UgentNotificationContact : '01b87999-85a7-4f5c-9b7e-892f1195cfe3',
	/** 
	 *             The player entity was responsible for verifying the accuracy of the data in the act            
	 */
	Verifier : 'f9dc5787-dd4d-42c6-a082-ac7d11956fda',
	/** 
	 *             The player entity represents an entity where the act occurred "via" this entity (i.e. in transport)            
	 */
	Via : '5b0fac74-5ac6-44e6-99a4-6813c0e2f4a9',
	/** 
	 *             The player entity represents a legal witness to the act occurring.            
	 */
	Witness : '0b82357f-5ae0-4543-ab8e-a33e9b315bab',
}  // ActParticipationKey 
// SanteDB.Core.Model.Constants.EntityRelationshipTypeKeys, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!EntityRelationshipTypeKeys)
/**
 * @enum {string}
 * @memberof SanteDBModel
 * @public
 * @readonly
 * @summary             Base entity relationship type keys            
 */
var EntityRelationshipTypeKeys = { 
	/** 
	 *             The access            
	 */
	Access : 'ddc1b705-c768-4c7a-8f69-76ad4b167b40',
	/** 
	 *             The active moiety            
	 */
	ActiveMoiety : '212b1b6b-b074-4a75-862d-e4e194252044',
	/** 
	 *             The administerable material            
	 */
	AdministerableMaterial : 'b52c7e95-88b8-4c4c-836a-934277afdb92',
	/** 
	 *             The adopted child            
	 */
	AdoptedChild : '8fa25b69-c9c2-4c40-84c1-0ea9641a12ec',
	/** 
	 *             The adopted daughter            
	 */
	AdoptedDaughter : '2b4b2ed8-f90c-4193-870a-f48bc39657c1',
	/** 
	 *             The adopted son            
	 */
	AdoptedSon : 'ce50ba92-cd21-43c4-8582-34e7fbb3170f',
	/** 
	 *             The affiliate            
	 */
	Affiliate : '8de7b5e7-c941-42bd-b735-52d750efc5e6',
	/** 
	 *             The agent            
	 */
	Agent : '867fd445-d490-4619-804e-75c04b8a0e57',
	/** 
	 *             The aliquot            
	 */
	Aliquot : 'cff670e4-965e-4288-b966-47a44479d2ad',
	/** 
	 *             The assigned            
	 */
	Assigned : 'a87a6d21-2ca6-4aea-88f3-6135cceb58d1',
	/** 
	 *             The assigned entity            
	 */
	AssignedEntity : '77b7a04b-c065-4faf-8ec0-2cdad4ae372b',
	/** 
	 *             The aunt            
	 */
	Aunt : '0ff2ab03-6e0a-40d1-8947-04c4937b4cc4',
	/** 
	 *             The birthplace            
	 */
	Birthplace : 'f3ef7e48-d8b7-4030-b431-aff7e0e1cb76',
	/** 
	 *             The brother            
	 */
	Brother : '24380d53-ea22-4820-9f06-8671f774f133',
	/** 
	 *             The brotherinlaw            
	 */
	Brotherinlaw : '0a4c87e2-16c3-4361-be3c-dd765ee4bc7d',
	/** 
	 *             The caregiver            
	 */
	Caregiver : '31b0dfcb-d7ba-452a-98b9-45ebccd30732',
	/** 
	 *             The case subject            
	 */
	CaseSubject : 'd7ad48c0-889d-41e2-99e9-be5e6c5327b2',
	/** 
	 *             The child            
	 */
	Child : '739457d0-835a-4a9c-811c-42b5e92ed1ca',
	/** 
	 *             The child inlaw            
	 */
	ChildInlaw : '8bf23192-de75-48eb-abee-81a9a15332f8',
	/** 
	 *             The citizen            
	 */
	Citizen : '35b13152-e43c-4bcb-8649-a9e83bee33a2',
	/** 
	 *             The claimant            
	 */
	Claimant : '9d256279-f1ac-46b3-a974-dd13e2ad4f72',
	/** 
	 *             The clinical research investigator            
	 */
	ClinicalResearchInvestigator : '43ad7bc0-2ed8-4b27-97e5-b3db00a07d17',
	/** 
	 *             The clinical research sponsor            
	 */
	ClinicalResearchSponsor : '66c96ae6-c5c4-4d66-9bd0-a00c56e831da',
	/** 
	 *             The commissioning party            
	 */
	CommissioningParty : '33bd1401-dfdb-40e7-a914-0a695ad5186e',
	/** 
	 *             The contact            
	 */
	Contact : 'b1d2148d-bb35-4337-8fe6-021f5a3ac8a3',
	/** 
	 *             The cousin            
	 */
	Cousin : '1c0f931c-9c49-4a52-8fbf-5217c52ea778',
	/** 
	 *             The coverage sponsor            
	 */
	CoverageSponsor : '8ff9d9a5-a206-4566-82cd-67b770d7ce8a',
	/** 
	 *             The covered party            
	 */
	CoveredParty : 'd4844672-c0d7-434c-8377-6dd0655b0532',
	/** 
	 *             The daughter            
	 */
	Daughter : '8165b43f-8103-4ed3-bac6-4fc0df8c1a84',
	/** 
	 *             The daughter inlaw            
	 */
	DaughterInlaw : '76fdf0e7-cfe0-47b4-9630-c645f254cdfd',
	/** 
	 *             The dedicated service delivery location            
	 */
	DedicatedServiceDeliveryLocation : '455f1772-f580-47e8-86bd-b5ce25d351f9',
	/** 
	 *             The dependent            
	 */
	Dependent : 'f28ed78f-85ab-47a1-ba08-b5051e62d6c3',
	/** 
	 *             The distributed material            
	 */
	DistributedMaterial : 'f5547ada-1eb9-40bb-b163-081567d869e7',
	/** 
	 *             The domestic partner            
	 */
	DomesticPartner : '3db182e2-653b-4bfd-a300-32f23345d1c0',
	/** 
	 *             The emergency contact            
	 */
	EmergencyContact : '25985f42-476a-4455-a977-4e97a554d710',
	/** 
	 *             The employee            
	 */
	Employee : 'b43c9513-1c1c-4ed0-92db-55a904c122e6',
	/** 
	 *             The exposed entity            
	 */
	ExposedEntity : 'ab39087c-17d3-421a-a1e3-2de4e0ab9faf',
	/** 
	 *             The family member            
	 */
	FamilyMember : '38d66ec7-0cc8-4609-9675-b6ff91ede605',
	/** 
	 *             The father            
	 */
	Father : '40d18ecc-8ff8-4e03-8e58-97a980f04060',
	/** 
	 *             The fatherinlaw            
	 */
	Fatherinlaw : 'b401dd81-931c-4aad-8fd8-22a6ac2ea3dc',
	/** 
	 *             The foster child            
	 */
	FosterChild : 'abfe2637-d338-4090-b3a5-3ec19a47be6a',
	/** 
	 *             The foster daughter            
	 */
	FosterDaughter : 'e81d6773-97e3-4b2d-b6a3-a4624ba5c6a9',
	/** 
	 *             The foster son            
	 */
	FosterSon : 'decd6250-7e8b-4b77-895d-31953cf1387a',
	/** 
	 *             The grandchild            
	 */
	Grandchild : 'c33adda2-a4ed-4092-8d9c-b8e3fbd5d90b',
	/** 
	 *             The granddaughter            
	 */
	Granddaughter : '3cb1993f-3703-453f-87be-21b606db7631',
	/** 
	 *             The grandfather            
	 */
	Grandfather : '48c59444-fec0-43b8-aa2c-7aedb70733ad',
	/** 
	 *             The grandmother            
	 */
	Grandmother : 'b630ba2c-8a00-46d8-bf64-870d381d8917',
	/** 
	 *             The grandparent            
	 */
	Grandparent : 'fa646df9-7d64-4d1f-ae9a-6261fd5fd6ae',
	/** 
	 *             The grandson            
	 */
	Grandson : 'f7a64463-bc75-44d4-a8ca-c9fbc2c87175',
	/** 
	 *             The great grandfather            
	 */
	GreatGrandfather : 'bfe24b5d-9c32-4df3-ad7b-eaa19e7d4afb',
	/** 
	 *             The great grandmother            
	 */
	GreatGrandmother : '02fbc345-1a25-4f78-aeea-a12584a1eec3',
	/** 
	 *             The great grandparent            
	 */
	GreatGrandparent : '528feb11-ae81-426a-be1f-ce74c83009eb',
	/** 
	 *             The guarantor            
	 */
	Guarantor : 'f5b10c57-3ae1-41ea-8649-1cf8d9848ae1',
	/** 
	 *             The guard            
	 */
	GUARD : '845120de-e6f7-4cec-94aa-e6e943c91367',
	/** 
	 *             The guardian            
	 */
	Guardian : '3b8e2334-4ccc-4f24-8aae-37341ea03d3e',
	/** 
	 *             The halfbrother            
	 */
	Halfbrother : '25cae2f2-d1ec-4efe-a92f-d479785f7d8a',
	/** 
	 *             The halfsibling            
	 */
	Halfsibling : '8452ecb9-d762-4c4a-96b2-81d130cb729b',
	/** 
	 *             The halfsister            
	 */
	Halfsister : 'ce42c680-a783-4cde-bcd1-e261d6fd68a0',
	/** 
	 *             The healthcare provider            
	 */
	HealthcareProvider : '6b04fed8-c164-469c-910b-f824c2bda4f0',
	/** 
	 *             The health chart            
	 */
	HealthChart : '5b0f8c93-57c9-4dff-b59a-9564739ef445',
	/** 
	 *             The held entity            
	 */
	HeldEntity : '9c02a621-8565-46b4-94ff-a2bd210989b1',
	/** 
	 *             The husband            
	 */
	Husband : '62aca44c-b57c-44fd-9703-fcdff97c04b6',
	/** 
	 *             The identified entity            
	 */
	IdentifiedEntity : 'c5c8b935-294f-4c90-9d81-cbf914bf5808',
	/** 
	 *             The incidental service delivery location            
	 */
	IncidentalServiceDeliveryLocation : '41baf7aa-5ffd-4421-831f-42d4ab3de38a',
	/** 
	 *             The individual            
	 */
	Individual : '47049b0f-f189-4e19-9aa8-7c38adb2491a',
	/** 
	 *             The investigation subject            
	 */
	InvestigationSubject : '0c522bd1-dfa2-43cb-a98e-f6ff137968ae',
	/** 
	 *             The invoice payor            
	 */
	InvoicePayor : '07c922d2-12c9-415a-95d4-9b3fed4959d6',
	/** 
	 *             The isolate            
	 */
	Isolate : '020c28a0-7c52-42f4-a046-db9e329d5a42',
	/** 
	 *             The licensed entity            
	 */
	LicensedEntity : 'b9fe057e-7f57-42eb-89d7-67c69646c0c4',
	/** 
	 *             The maintained entity            
	 */
	MaintainedEntity : '77b6d8cd-05a0-4b1f-9e14-b895203bf40c',
	/** 
	 *             The manufactured product            
	 */
	ManufacturedProduct : '6780df3b-afbd-44a3-8627-cbb3dc2f02f6',
	/** 
	 *             The maternal aunt            
	 */
	MaternalAunt : '96ea355d-0c68-481f-8b6f-1b00a101ab8f',
	/** 
	 *             The maternal cousin            
	 */
	MaternalCousin : 'd874cde5-7d76-4f1d-97e6-db7e82bac958',
	/** 
	 *             The maternal grandfather            
	 */
	MaternalGrandfather : '360f6a77-fdb5-4fb6-b223-3cd1047fd08e',
	/** 
	 *             The maternal grandmother            
	 */
	MaternalGrandmother : 'ea13832b-2e38-4bb6-b55d-ae749ccaba95',
	/** 
	 *             The maternal grandparent            
	 */
	MaternalGrandparent : '66e0dbd1-9065-4af8-808d-89edd302f264',
	/** 
	 *             The maternal greatgrandfather            
	 */
	MaternalGreatgrandfather : 'abe6d0d1-4e37-4b7c-9acc-eedb2c36f9cd',
	/** 
	 *             The maternal greatgrandmother            
	 */
	MaternalGreatgrandmother : 'fe4f72e6-84f8-4276-ae64-2ef1f2ff406f',
	/** 
	 *             The maternal greatgrandparent            
	 */
	MaternalGreatgrandparent : '59bc87d3-1618-4f14-81d2-71072c1f37e9',
	/** 
	 *             The maternal uncle            
	 */
	MaternalUncle : '4e299c46-f06f-4efc-b3c0-b7b659a120f2',
	/** 
	 *             The military person            
	 */
	MilitaryPerson : '1bcfb08d-c6fa-41dd-98bf-06336a33a3b7',
	/** 
	 *             The mother            
	 */
	Mother : '29ff64e5-b564-411a-92c7-6818c02a9e48',
	/** 
	 *             The motherinlaw            
	 */
	Motherinlaw : 'f941988a-1c55-4408-ab57-e9ed35b2a24d',
	/** 
	 *             The named insured            
	 */
	NamedInsured : '3d907f37-085c-4c26-b59b-62e40621dafd',
	/** 
	 *             The natural brother            
	 */
	NaturalBrother : 'daf11eb1-fcc2-4521-a1c0-daebaf0a923a',
	/** 
	 *             The natural child            
	 */
	NaturalChild : '80097e75-a232-4a9f-878f-7e60ec70f921',
	/** 
	 *             The natural daughter            
	 */
	NaturalDaughter : '6a181a3c-7241-4325-b011-630d3ca6dc4a',
	/** 
	 *             The natural father            
	 */
	NaturalFather : '233d890b-04ef-4365-99ad-26cb4e1f75f3',
	/** 
	 *             The natural father of fetus            
	 */
	NaturalFatherOfFetus : '8e88debc-d175-46f3-9b48-106f9c151cd2',
	/** 
	 *             The natural mother            
	 */
	NaturalMother : '059d689a-2392-4ffb-b6ae-682c9ded8da2',
	/** 
	 *             The natural parent            
	 */
	NaturalParent : 'e6851b39-a771-4a5e-8aa8-9ba140b3dca3',
	/** 
	 *             The natural sibling            
	 */
	NaturalSibling : '0b89fb65-ca8e-4a4d-9d25-0bae3f4d7a59',
	/** 
	 *             The natural sister            
	 */
	NaturalSister : '8ea21d7d-6ee9-449b-a1dc-c4aa0ff7f5b9',
	/** 
	 *             The natural son            
	 */
	NaturalSon : '9f17d4cf-a67f-4ac6-8c50-718af6e264ee',
	/** 
	 *             The nephew            
	 */
	Nephew : '5c5af1d2-0e6d-458f-9574-3ad61c393a90',
	/** 
	 *             The next of kin            
	 */
	NextOfKin : '1ee4e74f-542d-4544-96f6-266a6247f274',
	/** 
	 *             The niece            
	 */
	Niece : '0a50962a-60b4-44d8-a7f6-1eb2aa5967cc',
	/** 
	 *             The niece nephew            
	 */
	NieceNephew : 'a907e4d8-d823-478f-9c5a-6facae6b4b5b',
	/** 
	 *             The notary public            
	 */
	NotaryPublic : 'f1ef6c46-05eb-4482-baeb-eaf0a8e5ffef',
	/** 
	 *             The owned entity            
	 */
	OwnedEntity : '117da15c-0864-4f00-a987-9b9854cba44e',
	/** 
	 *             The parent            
	 */
	Parent : 'bfcbb345-86db-43ba-b47e-e7411276ac7c',
	/** 
	 *             The parent inlaw            
	 */
	ParentInlaw : '5e2b0afe-724e-41cd-9be2-9030646f2529',
	/** 
	 *             The part            
	 */
	Part : 'b2feb552-8eaf-45fe-a397-f789d6f4728a',
	/** 
	 *             The paternal aunt            
	 */
	PaternalAunt : '6a1e9e8b-d0c3-44f0-9906-a6458685e269',
	/** 
	 *             The paternal cousin            
	 */
	PaternalCousin : '60affe56-126d-43ee-9fde-5f117e41c7a8',
	/** 
	 *             The paternal grandfather            
	 */
	PaternalGrandfather : '2fd5c939-c508-4250-8efb-13b772e56b7f',
	/** 
	 *             The paternal grandmother            
	 */
	PaternalGrandmother : 'bfdb07db-9721-4ec3-94e1-4bd9f0d6985c',
	/** 
	 *             The paternal grandparent            
	 */
	PaternalGrandparent : 'a3d362a4-4931-4bef-af18-ac59dd092981',
	/** 
	 *             The paternal greatgrandfather            
	 */
	PaternalGreatgrandfather : '0aeec758-c20f-43e4-9789-8c44629f5941',
	/** 
	 *             The paternal greatgrandmother            
	 */
	PaternalGreatgrandmother : '0fcba203-1238-4001-beb7-19a667506ade',
	/** 
	 *             The paternal greatgrandparent            
	 */
	PaternalGreatgrandparent : '08a98950-3391-4a66-a1c8-421c6fd82911',
	/** 
	 *             The paternal uncle            
	 */
	PaternalUncle : '853c85de-4817-4328-a121-6a3bdafbf82e',
	/** 
	 *             The patient            
	 */
	Patient : 'bacd9c6f-3fa9-481e-9636-37457962804d',
	/** 
	 *             The payee            
	 */
	Payee : '734551e1-2960-4a68-93a2-b277db072a43',
	/** 
	 *             The personal relationship            
	 */
	PersonalRelationship : 'abfd3fe8-9526-48fb-b366-35baca9bd170',
	/** 
	 *             The place of death            
	 */
	PlaceOfDeath : '9bbe0cfe-faab-4dc9-a28f-c001e3e95e6e',
	/** 
	 *             The policy holder            
	 */
	PolicyHolder : 'cec017ef-4e49-41af-8596-abad1a91c9d0',
	/** 
	 *             The program eligible            
	 */
	ProgramEligible : 'cbe2a00c-e1d5-44e9-aae3-d7d03e3c2efa',
	/** 
	 *             The qualified entity            
	 */
	QualifiedEntity : '6521dd09-334b-4fbf-9c89-1ad5a804326c',
	/** 
	 *             The regulated product            
	 */
	RegulatedProduct : '20e98d17-e24d-4c64-b09e-521a177ccd05',
	/** 
	 *             The research subject            
	 */
	ResearchSubject : 'ef597ffe-d965-4398-b55a-650530ebb997',
	/** 
	 *             The retailed material            
	 */
	RetailedMaterial : '703df8f4-b124-44c5-9506-1ab74ddfd91d',
	/** 
	 *             The roomate            
	 */
	Roomate : 'bbfac1ed-5464-4100-93c3-8685b052a2cf',
	/** 
	 *             The service delivery location            
	 */
	ServiceDeliveryLocation : 'ff34dfa7-c6d3-4f8b-bc9f-14bcdc13ba6c',
	/** 
	 *             The sibling            
	 */
	Sibling : '685eb506-6b97-41c1-b201-b6b932a3f3aa',
	/** 
	 *             The sibling inlaw            
	 */
	SiblingInlaw : 'fd892cf8-db4f-4e4e-a13b-4eb3bdde5be5',
	/** 
	 *             The significant other            
	 */
	SignificantOther : '2eab5298-bc83-492c-9004-ed3499246afe',
	/** 
	 *             The signing authority or officer            
	 */
	SigningAuthorityOrOfficer : '757f98df-14e0-446a-bd50-bb0affb34f09',
	/** 
	 *             The sister            
	 */
	Sister : 'cd1e8904-31dc-4374-902d-c91f1de23c46',
	/** 
	 *             The sisterinlaw            
	 */
	Sisterinlaw : 'dcae9718-ab81-4737-b071-36cf1175804d',
	/** 
	 *             The son            
	 */
	Son : 'f115c204-8485-4cf3-8815-3c6738465e30',
	/** 
	 *             The son inlaw            
	 */
	SonInlaw : '34f7bc11-2288-471a-af38-553ae6b8410c',
	/** 
	 *             The specimen            
	 */
	Specimen : 'bce17b21-05b2-4f02-bf7a-c6d3561aa948',
	/** 
	 *             The spouse            
	 */
	Spouse : '89bdc57b-d85c-4e85-94e8-c17049540a0d',
	/** 
	 *             The stepbrother            
	 */
	Stepbrother : '5951097b-1a13-4bce-bbf2-9abf52f98dc8',
	/** 
	 *             The step child            
	 */
	StepChild : '4cdef917-4fb0-4cdf-b44d-b73486c41845',
	/** 
	 *             The stepdaughter            
	 */
	Stepdaughter : 'f71e193a-0562-46e9-99dd-437d23663ec3',
	/** 
	 *             The stepfather            
	 */
	Stepfather : 'bb437e4d-7472-48c1-a6e7-576545a782fa',
	/** 
	 *             The stepmother            
	 */
	Stepmother : '5a0539cc-093b-448e-aec6-0d529ed0087f',
	/** 
	 *             The step parent            
	 */
	StepParent : 'f172eee7-7f4b-4022-81d0-76393a1200ae',
	/** 
	 *             The step sibling            
	 */
	StepSibling : '7e6bc25d-5dea-4645-af3d-aa854b7b6f2f',
	/** 
	 *             The stepsister            
	 */
	Stepsister : 'cb73d085-026c-4bc7-a1de-356bfd636246',
	/** 
	 *             The stepson            
	 */
	Stepson : 'cfa978f4-140c-430d-82f8-1e6f2d74f48d',
	/** 
	 *             The student            
	 */
	Student : '0c157566-d1e9-4976-8542-473caa9ba2a4',
	/** 
	 *             The subscriber            
	 */
	Subscriber : 'f31a2a5b-ce13-47e1-a0fb-d704f31547db',
	/** 
	 *             The territory of authority            
	 */
	TerritoryOfAuthority : 'c6b92576-1d62-4896-8799-6f931f8ab607',
	/** 
	 *             The therapeutic agent            
	 */
	TherapeuticAgent : 'd6657fdb-4ef3-4131-af79-14e01a21faca',
	/** 
	 *             The uncle            
	 */
	Uncle : 'cdd99260-107c-4a4e-acaf-d7c9c7e90fdd',
	/** 
	 *             The underwriter            
	 */
	Underwriter : 'a8fcd83f-808b-494b-8a1c-ec2c6dbc3dfa',
	/** 
	 *             The used entity            
	 */
	UsedEntity : '08fff7d9-bac7-417b-b026-c9bee52f4a37',
	/** 
	 *             The warranted product            
	 */
	WarrantedProduct : '639b4b8f-afd3-4963-9e79-ef0d3928796a',
	/** 
	 *             The wife            
	 */
	Wife : 'a3ff423e-81d5-4571-8edf-03c295189a23',
	/** 
	 *             The replaces            
	 */
	Replaces : 'd1578637-e1cb-415e-b319-4011da033813',
	/** 
	 *             The target entity represents an instance of the scoper entity            
	 */
	Instance : 'ac45a740-b0c7-4425-84d8-b3f8a41fef9f',
	/** 
	 *             Relates the target entity to a source location            
	 */
	LocatedEntity : '4f6273d3-8223-4e18-8596-c718ad029deb',
}  // EntityRelationshipTypeKeys 
// SanteDB.Core.Model.Constants.StatusKeys, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!StatusKeys)
/**
 * @enum {string}
 * @memberof SanteDBModel
 * @public
 * @readonly
 * @summary             Status concepts represent the current status of entities, acts, and concepts.            
 */
var StatusKeys = { 
	/** 
	 *             When an entity or act is active, it means the information or entity is currently correct and ongoing            
	 */
	Active : 'c8064cbd-fa06-4530-b430-1a52f1530c27',
	/** 
	 *             Indicates that an act has been completed and now represents an act in the past            
	 */
	Completed : 'afc33800-8225-4061-b168-bacc09cdbae3',
	/** 
	 *             Indicates that the data is new, and may require additional verification or actions            
	 */
	New : 'c34fcbf1-e0fe-4989-90fd-0dc49e1b9685',
	/** 
	 *             Indicates that the entity or act never existed, and was entered in error            
	 */
	Nullified : 'cd4aa3c4-02d5-4cc9-9088-ef8f31e321c5',
	/** 
	 *             Indicates that the act was cancelled before being completed            
	 */
	Cancelled : '3efd3b6e-02d5-4cc9-9088-ef8f31e321c5',
	/** 
	 *             Indicates that the entity or act did exist at one point, however it no longer exists            
	 */
	Obsolete : 'bdef5f90-5497-4f26-956c-8f818cce2bd2',
}  // StatusKeys 
// SanteDB.Core.Model.Constants.TelecomAddressUseKeys, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!TelecomAddressUseKeys)
/**
 * @enum {string}
 * @memberof SanteDBModel
 * @public
 * @readonly
 * @summary             Telecommunications address use keys            
 */
var TelecomAddressUseKeys = { 
	/** 
	 *             answering service            
	 */
	AnsweringService : '1ecd7b17-b5ff-4cae-9c3b-c1258132d137',
	/** 
	 *             Emergency contact            
	 */
	EmergencyContact : '25985f42-476a-4455-a977-4e97a554d710',
	/** 
	 *             Mobile phone contact            
	 */
	MobileContact : 'e161f90e-5939-430e-861a-f8e885cc353d',
	/** 
	 *             pager            
	 */
	Pager : '788000b4-e37a-4055-a2aa-c650089ce3b1',
	/** 
	 *             public (800 number example) contact            
	 */
	Public : 'ec35ea7c-55d2-4619-a56b-f7a986412f7f',
	/** 
	 *             temporary contact            
	 */
	TemporaryAddress : 'cef6ea31-a097-4f59-8723-a38c727c6597',
	/** 
	 *             For use in the workplace            
	 */
	WorkPlace : 'eaa6f08e-bb8e-4457-9dc0-3a1555fadf5c',
}  // TelecomAddressUseKeys 
// SanteDB.Core.Model.Patch.PatchOperationType, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!PatchOperationType)
/**
 * @enum {string}
 * @memberof SanteDBModel
 * @public
 * @readonly
 * @summary             Represents a patch operation type            
 */
var PatchOperationType = { 
	/** 
	 *             Patch operation adds the specified value to the array            
	 */
	Add : 'Add',
	/** 
	 *             Patch operation removes the specified value from the array            
	 */
	Remove : 'Remove',
	/** 
	 *             Patch operation replaces the specified item at the path             
	 */
	Replace : 'Replace',
	/** 
	 *             Patch should test value before proceeding            
	 */
	Test : 'Test',
}  // PatchOperationType 
// SanteDB.Core.Model.Constants.AddressComponentKeys, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!AddressComponentKeys)
/**
 * @enum {string}
 * @memberof SanteDBModel
 * @public
 * @readonly
 * @summary             Represents address component types            
 */
var AddressComponentKeys = { 
	/** 
	 *             An additional locator (example: Beside the red barn).            
	 */
	AdditionalLocator : 'd2312b8e-bdfb-4012-9397-f14336f8d206',
	/** 
	 *             An address line as would appear on an address (example: 123 Main Street West)            
	 */
	AddressLine : '4f342d28-8850-4daf-8bca-0b44a255f7ed',
	/** 
	 *             Identifies a particular building on a street (example: A23 Building)            
	 */
	BuildingNumber : 'f3c86e99-8afc-4947-9dd8-86412a34b1c7',
	/** 
	 *             Identifies a numeric identifier for a building (example: 123)            
	 */
	BuildingNumberNumeric : '3258b4d6-e4dc-43e6-9f29-fd8423a2ae12',
	/** 
	 *             Identifies a suffix to the building number (example: 123 *SECTOR 7*)            
	 */
	BuildingNumberSuffix : 'b2dbf05c-584d-46db-8cbf-026a6ea30d81',
	/** 
	 *             Identifies the person where deliveries should be care-of (example: c/o Bob Smith)            
	 */
	CareOf : '8c89a89e-08c5-4374-87f9-adb3c9261df6',
	/** 
	 *             The census tract which is used for political counting of the census            
	 */
	CensusTract : '4b3a347c-28fa-4560-a1a9-3795c9db3d3b',
	/** 
	 *             The town or city (example: Toronto)            
	 */
	City : '05b85461-578b-4988-bca6-e3e94be9db76',
	/** 
	 *             The country in which the address resides (example: Canada)            
	 */
	Country : '48b2ffb3-07db-47ba-ad73-fc8fb8502471',
	/** 
	 *             The county or sub-division of a sub-national unit (example: Clark County)            
	 */
	County : 'd9489d56-ddac-4596-b5c6-8f41d73d8dc5',
	/** 
	 *             Represents a meaningless delimiter such as dash, or newline            
	 */
	Delimiter : '4c6b9519-a493-44a9-80e6-32d85109b04b',
	/** 
	 *             Represents an address line to be used for delivery rather than physical location (example: Loading Dock #4)            
	 */
	DeliveryAddressLine : 'f6139b21-3a36-4a3f-b498-0c661f06df59',
	/** 
	 *             Represents the area where the delivery should take place            
	 */
	DeliveryInstallationArea : 'ec9d5ab8-3be1-448f-9346-6a08253f9dea',
	/** 
	 *             The delivery installation qualifier.            
	 */
	DeliveryInstallationQualifier : '78fb6eed-6549-4f22-ab3e-f3696da050bc',
	/** 
	 *             The delivery installation type.            
	 */
	DeliveryInstallationType : '684fb800-145c-47c5-98c5-e7aa53802b69',
	/** 
	 *             The delivery mode.            
	 */
	DeliveryMode : '12608636-910d-4bac-b849-7f999de20332',
	/** 
	 *             The delivery mode identifier.            
	 */
	DeliveryModeIdentifier : '08bd6027-47eb-43de-8454-59b7a5d00a3e',
	/** 
	 *             Represents a directory such as north, south, east, or west            
	 */
	Direction : '1f678716-ab8f-4856-9f76-d82fe3165c22',
	/** 
	 *             A codified adminsitrative unit used to locate the address (zip code or postal code)            
	 */
	PostalCode : '78a47122-f9bf-450f-a93f-90a103c5f1e8',
	/** 
	 *             Represents a PO box where delivery of mail should take place            
	 */
	PostBox : '2047f216-f41e-4cfb-a024-05d4d3de52f5',
	/** 
	 *             Represents a precinct or sub-division of a city such as a burrogh            
	 */
	Precinct : 'acafe0f2-e209-43bb-8633-3665fd7c90ba',
	/** 
	 *             Represents a state or province, or a sub-division of a national boundary            
	 */
	State : '8cf4b0b0-84e5-4122-85fe-6afa8240c218',
	/** 
	 *             Represents a physical street delivery line (example: 123 Main Street West)            
	 */
	StreetAddressLine : 'f69dcfa8-df18-403b-9217-c59680bad99e',
	/** 
	 *             Represents the name portion of a street address (example: Main St.)            
	 */
	StreetName : '0432d671-abc3-4249-872c-afd5274c2298',
	/** 
	 *             The street name base portion of a street address (Example: Main)            
	 */
	StreetNameBase : '37c7dbc8-4ac6-464a-af65-d65fcba60238',
	/** 
	 *             The street type (example: Street, Road, Hwy)            
	 */
	StreetType : '121953f6-0465-41de-8f7a-b0e08204c771',
	/** 
	 *             Identifies the type of unit (example: Suite, Apartment, Unit)            
	 */
	UnitDesignator : 'b18e71cb-203c-4640-83f0-cc86debbbbc0',
	/** 
	 *             The identifier of the unit (example: 820)            
	 */
	UnitIdentifier : '908c09df-81fe-45ac-9233-0881a278a401',
}  // AddressComponentKeys 
// SanteDB.Core.Model.Constants.NameComponentKeys, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!NameComponentKeys)
/**
 * @enum {string}
 * @memberof SanteDBModel
 * @public
 * @readonly
 * @summary             Name component type keys            
 */
var NameComponentKeys = { 
	/** 
	 *             The name component represents a delimeter in a name such as hyphen or space            
	 */
	Delimiter : '4c6b9519-a493-44a9-80e6-32d85109b04b',
	/** 
	 *             The name component represents the surname            
	 */
	Family : '29b98455-ed61-49f8-a161-2d73363e1df0',
	/** 
	 *             The name component represents the given name            
	 */
	Given : '2f64bde2-a696-4b0a-9690-b21ebd7e5092',
	/** 
	 *             The name component represents the prefix such as Von or Van            
	 */
	Prefix : 'a787187b-6be4-401e-8836-97fc000c5d16',
	/** 
	 *             The name component represents a suffix such as III or Esq.            
	 */
	Suffix : '064523df-bb03-4932-9323-cdf0cc9590ba',
	/** 
	 *             The name component represents a formal title like Mr, Dr, Capt.            
	 */
	Title : '4386d92a-d81b-4033-b968-01e57e20d5e0',
}  // NameComponentKeys 
// SanteDB.Core.Model.Constants.PhoneticAlgorithmKeys, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!PhoneticAlgorithmKeys)
/**
 * @enum {string}
 * @memberof SanteDBModel
 * @public
 * @readonly
 * @summary             Phonetic algorithm keys for built in phonetic algorithms in SanteDB            
 */
var PhoneticAlgorithmKeys = { 
	/** 
	 *             Represents the metaphone phonetic algorithm            
	 */
	Metaphone : 'd79a4dc6-66a6-4602-8fcb-7dc09a895793',
	/** 
	 *             Represents the null phonetic algorithm            
	 */
	None : '402cd339-d0e4-46ce-8fc2-12a4b0e17226',
	/** 
	 *             Represents the soundex algorithm            
	 */
	Soundex : '3352a79a-d2e0-4e0c-9b48-6fd2a202c681',
}  // PhoneticAlgorithmKeys 
// SanteDB.Core.Model.Constants.ConceptRelationshipTypeKeys, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ConceptRelationshipTypeKeys)
/**
 * @enum {string}
 * @memberof SanteDBModel
 * @public
 * @readonly
 * @summary             Reference type identifiers            
 */
var ConceptRelationshipTypeKeys = { 
	/** 
	 *             The source concept has the inverse meaning of the target concept            
	 */
	InverseOf : 'ad27293d-433c-4b75-88d2-b5360cd95450',
	/** 
	 *             The source concept is a member of the target concept            
	 */
	MemberOf : 'a159d45b-3c34-4e1b-9b75-9193a7528ced',
	/** 
	 *             The source concept is a negation of the target concept            
	 */
	NegationOf : 'ae8b4f2f-009f-4e0d-b35e-5a89555c5947',
	/** 
	 *             The source concept has the same meaning as the target concept            
	 */
	SameAs : '2c4dafc2-566a-41ae-9ebc-3097d7d22f4a',
}  // ConceptRelationshipTypeKeys 
// SanteDB.Core.Model.Constants.ConceptClassKeys, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ConceptClassKeys)
/**
 * @enum {string}
 * @memberof SanteDBModel
 * @public
 * @readonly
 * @summary             Concept classification identifiers for built-in concept classes            
 */
var ConceptClassKeys = { 
	/** 
	 *             Classification codes            
	 */
	ClassCode : '17fd5254-8c25-4abb-b246-083fbe9afa15',
	/** 
	 *             Diagnosis codes            
	 */
	Diagnosis : '92cdea39-b9a3-4a5b-bc88-a6646c74240d',
	/** 
	 *             Clinical findings            
	 */
	Finding : 'e445e207-60a3-401a-9b81-a8ac2479f4a6',
	/** 
	 *             Form codes (shape, texture, etc.)            
	 */
	Form : '17ee5254-8c25-4abb-b246-083fbe9afa15',
	/** 
	 *             Material classifications            
	 */
	Material : 'dc9cbc32-b8ea-4144-bef1-dc618e28f4d7',
	/** 
	 *             Mood classifications            
	 */
	Mood : 'bba99722-23ce-469a-8fa5-10deba853d35',
	/** 
	 *             Other classifications            
	 */
	Other : '0d6b3439-c9be-4480-af39-eeb457c052d0',
	/** 
	 *             Problems or condition codes            
	 */
	Problem : '4bd7f8e6-e4b8-4dbc-93a7-cf14fbaf9700',
	/** 
	 *             Relationship class identifier            
	 */
	Relationship : 'f51dfdcd-039b-4e1f-90be-3cf56aef8da4',
	/** 
	 *             Routes of adminstration class identifier            
	 */
	Route : 'a8a900d3-a07e-4e02-b45f-580d09baf047',
	/** 
	 *             Status codes             
	 */
	Status : '54b93182-fc19-47a2-82c6-089fd70a4f45',
	/** 
	 *             Stock classification codes            
	 */
	Stock : 'ffd8304a-43ec-4ebc-95fc-fb4a4f2338f0',
	/** 
	 *             Unit of measure classification            
	 */
	UnitOfMeasure : '1ef69347-ef03-4ff7-b3c5-6334448845e6',
}  // ConceptClassKeys 
// SanteDB.Core.Model.Constants.CodeSystemKeys, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!CodeSystemKeys)
/**
 * @enum {string}
 * @memberof SanteDBModel
 * @public
 * @readonly
 * @summary             Code system identifiers            
 */
var CodeSystemKeys = { 
	/** 
	 *             Commonn Vaccination Codes (CDC)            
	 */
	CVX : 'eba4f94a-2cad-4bb3-aca7-f4e54eaac4bd',
	/** 
	 *             International Classification of Diseases Version 10            
	 */
	ICD10 : 'f7a5cbd8-5425-415e-8308-d14b94f56917',
	/** 
	 *             International Classification of Diseases Version 10 - Clinical Management             
	 */
	ICD10CM : 'ed9742e5-fa5b-4644-9fb5-2f935ed08b1e',
	/** 
	 *             International Classification of Diseases Version 9            
	 */
	ICD9 : '51ea1e1b-edc0-455a-a72b-9076860e284d',
	/** 
	 *             ISO-639-1 (Language Codes)            
	 */
	ISO6391 : 'eb04fe20-bbbc-4c70-9eef-045bc4f70982',
	/** 
	 *             ISO639-2 (3 letter Language Codes)            
	 */
	ISO6392 : '089044ea-dd41-4258-a497-e6247dd364f6',
	/** 
	 *             Logical Observations Identifiers Names and Codes (maintained by Regenstrief Institute)            
	 */
	LOINC : '08c59397-706b-456a-aeb1-9e7d5a2adc94',
	/** 
	 *             Systematized Nomenclature of Medicine-Clinical Terms (maintained by IHTSDO)            
	 */
	SNOMEDCT : 'b3030751-d4db-420b-b765-e837607820cd',
	/** 
	 *             Universal Codes for the Unit Of Measure            
	 */
	UCUM : '4853a702-fff3-4efb-8dd7-54aacca53664',
	/** 
	 *             The postal address use code system key.            
	 */
	PostalAddressUse : '0c4d091e-8701-4953-b16d-b8ca8e85de46',
	/** 
	 *             The entity name use code system key.            
	 */
	EntityNameUse : '77816823-9392-4ca7-83dd-6e7d4b4164e7',
	/** 
	 *             The administrative gender code system key.            
	 */
	AdministrativeGender : '7a3a7139-b93e-4a99-bd54-749e30fe712a',
}  // CodeSystemKeys 
// SanteDB.Core.Model.Constants.ActClassKeys, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ActClassKeys)
/**
 * @enum {string}
 * @memberof SanteDBModel
 * @public
 * @readonly
 * @summary             Represents a series of class keys for use on acts.            
 */
var ActClassKeys = { 
	/** 
	 *             The act represents generic account management such as adjudications, financial adjustments, stock counting, etc.            
	 */
	AccountManagement : 'ca44a469-81d7-4484-9189-ca1d55afecbc',
	/** 
	 *             The act represents a generic act which has no special classification            
	 */
	Act : 'd874424e-c692-4fd8-b94e-642e1cbf83e9',
	/** 
	 *             The act represents a simple battery of procedures/administrations/tests/etc.            
	 */
	Battery : '676de278-64aa-44f2-9b69-60d61fc1f5f5',
	/** 
	 *             The act represents some provision of care such as the seeking out services.            
	 */
	CareProvision : '1071d24e-6fe9-480f-8a20-b1825ae4d707',
	/** 
	 *             The act represents a problem or condition which the patient is suffering from.            
	 */
	Condition : '1987c53c-7ab8-4461-9ebc-0d428744a8c0',
	/** 
	 *             The control act event key is used to describe an infrastructural act which has no clinical meaning but can be used to wrap technical details.            
	 */
	ControlAct : 'b35488ce-b7cd-4dd4-b4de-5f83dc55af9f',
	/** 
	 *             The act represents an encounter such as the patient presenting for care and receiving services during a visit.            
	 */
	Encounter : '54b52119-1709-4098-8911-5df6d6c84140',
	/** 
	 *             The act represents an attempt to provide additional clinical information.            
	 */
	Inform : '192f1768-d39e-409d-87be-5afd0ee0d1fe',
	/** 
	 *             The act represents an observation that is made about a patient such as a vital sign, an allergy, cause of death, etc..            
	 */
	Observation : '28d022c6-8a8b-47c4-9e6a-2bc67308739e',
	/** 
	 *             The act represents a procedure (something done to a patient).            
	 */
	Procedure : '8cc5ef0d-3911-4d99-937f-6cfdc2a27d55',
	/** 
	 *             The act represents a registration event such as the registration of a patient.            
	 */
	Registration : '6be8d358-f591-4a3a-9a57-1889b0147c7e',
	/** 
	 *             The act represents that a substance (medication, or otherwise) was, should, or will be administered to the patient.            
	 */
	SubstanceAdministration : '932a3c7e-ad77-450a-8a1f-030fc2855450',
	/** 
	 *             The act represents a supply of some material or financial instrument between entities.            
	 */
	Supply : 'a064984f-9847-4480-8bea-dddf64b3c77c',
	/** 
	 *             The physical transporting of materials or people from one place to another.            
	 */
	Transport : '61677f76-dc05-466d-91de-47efc8e7a3e6',
}  // ActClassKeys 
// SanteDB.Core.Model.Constants.ActMoodKeys, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ActMoodKeys)
/**
 * @enum {string}
 * @memberof SanteDBModel
 * @public
 * @readonly
 * @summary             Act Mood keys            
 */
var ActMoodKeys = { 
	/** 
	 *             The ACT represents an appointment that was made to do something            
	 */
	Appointment : 'c46eee70-5612-473f-8d24-595ea15c9c39',
	/** 
	 *             The ACT represents a special type of request to create an appointment            
	 */
	AppointmentRequest : '0395f357-6821-4562-8192-49ac3c94f548',
	/** 
	 *             The ACT represents a definition of a type of act            
	 */
	Definition : '3b14a426-6337-4f2a-b83b-e6be7dbcd5a5',
	/** 
	 *             The ACT represents something that has occurred            
	 */
	Eventoccurrence : 'ec74541f-87c4-4327-a4b9-97f325501747',
	/** 
	 *             The ACT represents some sort of GOAL            
	 */
	Goal : '13925967-e748-4dd6-b562-1e1da3ddfb06',
	/** 
	 *             The ACT represents an intent made by a human to do something            
	 */
	Intent : '099bcc5e-8e2f-4d50-b509-9f9d5bbeb58e',
	/** 
	 *             The ACT represents a promise to do something            
	 */
	Promise : 'b389dedf-be61-456b-aa70-786e1a5a69e0',
	/** 
	 *             The ACT represents a proposal that a human should do something            
	 */
	Propose : 'acf7baf2-221f-4bc2-8116-ceb5165be079',
	/** 
	 *             The ACT represents a request to do something            
	 */
	Request : 'e658ca72-3b6a-4099-ab6e-7cf6861a5b61',
}  // ActMoodKeys 
// SanteDB.Core.Model.Constants.ActReasonKeys, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ActReasonKeys)
/**
 * @enum {string}
 * @memberof SanteDBModel
 * @public
 * @readonly
 * @summary             Represents act reasons (reasons for an act)            
 */
var ActReasonKeys = { 
	/** 
	 *             The patient started too late for the therapy            
	 */
	StartedTooLate : 'b75bf533-9804-4450-83c7-23f0332f87b8',
	/** 
	 *             The patient is allergic or intolerant to the consumable            
	 */
	AllergyOrIntolerance : '4ff3617b-bb91-4f3f-b4d2-2425f477037f',
	/** 
	 *             The vaccine or drug was expired            
	 */
	Expired : '4b518938-b1ea-44e3-b837-31617fa188a4',
	/** 
	 *             The vaccine was considered unsafe            
	 */
	VaccineSafety : 'c6718df8-c8c0-49fd-a73d-52f6981ccbf7',
	/** 
	 *             The vaccine was not performed per the professional judgement of the provider            
	 */
	ProfessionalJudgement : '9d947e6d-8406-42f3-bb8a-634fb3c81a08',
	/** 
	 *             The patient had a religious objection            
	 */
	ReligiousObjecton : '0d40c2b6-7ceb-4492-ab2a-6e7c730eaf22',
	/** 
	 *             The patient refused the treatment            
	 */
	PatientRefused : '42351a36-f60f-4687-b334-7a41b091bae1',
	/** 
	 *             There was insufficient stock to perform the action            
	 */
	OutOfStock : 'c7469fad-f190-40a2-a28d-f97d1863e8cf',
	/** 
	 *             The items are broken and can no longer be used to deliver care            
	 */
	Broken : 'dcff308d-cca5-4eb3-ad92-770917d88e56',
	/** 
	 *             There was a cold-storage failure which resulted in the material being unusable.            
	 */
	ColdStorageFailure : '06922eac-0cae-49af-a33c-fc7096349e4a',
}  // ActReasonKeys 
// SanteDB.Core.Model.Constants.ActRelationshipTypeKeys, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!ActRelationshipTypeKeys)
/**
 * @enum {string}
 * @memberof SanteDBModel
 * @public
 * @readonly
 * @summary             Act relationship types            
 */
var ActRelationshipTypeKeys = { 
	/** 
	 *             Indicates that the source act appends information contained in the target act            
	 */
	Appends : 'dc3df205-18ef-4854-ac00-68c295c9c744',
	/** 
	 *             Links the transortation act from another act            
	 */
	Arrival : '26fe590c-3684-4574-9359-057fdd06ba61',
	/** 
	 *             Links a transporation act from another act indicating departure of the subject            
	 */
	Departure : '28c81cdc-ca56-4c92-b691-094e89630642',
	/** 
	 *             The source act documents the target act            
	 */
	Documents : '0f4ba634-5107-4eab-9658-25be293cd831',
	/** 
	 *             Links two instances of the same act over time (example: chronic conditions)            
	 */
	EpisodeLink : 'ebf9ac10-b5c9-407a-91a4-360bfb7e0fb9',
	/** 
	 *             Used to link a goal to an observation            
	 */
	Evaluates : '8dbeac94-cccb-4412-a990-09bab26dd048',
	/** 
	 *             Indicates that the source act fulfills the target act            
	 */
	Fulfills : '646542bc-72e4-488b-bbf4-865d452e62ec',
	/** 
	 *             Indicates that the target act authorizes the source act            
	 */
	HasAuthorization : '29894070-a76b-47ef-8c16-d84e0acd9ea6',
	/** 
	 *             Indicates that the target act is a component of the source act            
	 */
	HasComponent : '78b9540f-438b-4b6f-8d83-aaf4979dbc64',
	/** 
	 *             Relationship from an act to one or more control variables (for example: device settings, or environment)            
	 */
	HasControlVariable : '85f68168-2a43-4532-bc79-191fa0b47c8b',
	/** 
	 *             The assertion that a new observation may be a manifestation of another            
	 */
	HasManifestation : '22918d17-d3dc-4135-a003-4c1c52e57e75',
	/** 
	 *             Indicates that the target act is a pre-condition of the source act            
	 */
	HasPrecondition : '5a280fc0-8c26-4191-b204-b1b1e4e19462',
	/** 
	 *             Indicates a reasoning as to why the source act is occurring            
	 */
	HasReason : '55da61a2-7b86-47f3-9b0b-ba47dc99c950',
	/** 
	 *             Indicates that the source act contains reference values from the target            
	 */
	HasReferenceValues : '99488a1d-6d97-4013-8c91-ded6ad3b8e89',
	/** 
	 *             Indicates the subject of a particular act (example: clinical act is a subject of a control act)            
	 */
	HasSubject : '9871c3bc-b57a-479d-a031-7b56cb06fa84',
	/** 
	 *             Indicates an existing act is suggesting evidence for a new observation.            
	 */
	HasSupport : '3209e3f1-2258-4b63-8182-2c888da66cf0',
	/** 
	 *             Indicates that the source act is the cause of the target act            
	 */
	IsCauseOf : '57d81685-e399-4abd-8744-96454188a9fa',
	/** 
	 *             Indicates the source act is derived from information contained in the target act            
	 */
	IsDerivedFrom : '81b6a0f8-b86a-495f-9d5d-8a4073fdd882',
	/** 
	 *             Indicates that the source act is an excerpt of the target act            
	 */
	IsExcerptOf : 'ffc6e905-161d-4c0b-8cde-a04e9e9d0cd5',
	/** 
	 *             Indicates that the source act refers to the target act            
	 */
	RefersTo : '8fce259a-b859-4ae3-8160-0221f6ab1650',
	/** 
	 *             The source act replaces the target act            
	 */
	Replaces : 'd1578637-e1cb-415e-b319-4011da033813',
	/** 
	 *             Indicates that the source act starts after the start of another act            
	 */
	StartsAfterStartOf : 'c66d7ca9-c6c2-46b1-9276-ad76baf04b07',
	/** 
	 *             Indicates that the source act transforms the target act            
	 */
	Transforms : 'db2ae02a-ff12-4c1b-9c5b-ecdd41af8583',
}  // ActRelationshipTypeKeys 
// SanteDB.Core.Model.Constants.NullReasonKeys, SanteDB.Core.Model, Version=1.1.0.35405, Culture=neutral, PublicKeyToken=null
if(!NullReasonKeys)
/**
 * @enum {string}
 * @memberof SanteDBModel
 * @public
 * @readonly
 * @summary             In SanteDB, any concept can be replaced with a null reason. A null reason indicates why a particular field is not present rather than being null            
 */
var NullReasonKeys = { 
	/** 
	 *             The reason that the requested value was not provided is that it is not available            
	 */
	Unavailable : '31e01921-82dc-4622-b3db-21429ea9e406',
	/** 
	 *             The reason that the requested value was not provided is that it is not applicable (for example last menstrual period of a male)            
	 */
	NotApplicable : 'fea2cfb1-f231-413d-b113-372779092e56',
	/** 
	 *             The reason that the value is not provided is that it can be derived from other information            
	 */
	Derived : '8ef137b3-e717-492b-8d8f-3817c99aed88',
	/** 
	 *             The value was not provided because it does not fall within the acceptable values             
	 */
	Other : '6052712a-340e-4480-ad6b-409ba320db4f',
	/** 
	 *             The value was asked for but the target did not know that answer            
	 */
	AskedUnknown : '21b0ffc8-ca4e-408d-a104-41fc924d3a39',
	/** 
	 *             The value was entered but it is invalid according to business rules            
	 */
	Invalid : 'd3f92eb1-fece-4dea-bed2-515af2b0fb38',
	/** 
	 *             There is a value present, but the quantity of the value is so small that it cannot be registered            
	 */
	Trace : '085069d8-0ca8-4771-986b-5eb3466580ff',
	/** 
	 *             The value is not prvovided because it is negative infinity            
	 */
	NegativeInfinity : 'fed3fe1b-b2c7-480b-b0af-5fd2e0200ce5',
	/** 
	 *             The exact value is not known, but there is sufficient quantity to perform an act            
	 */
	SufficientQuantity : 'c139841a-7d5a-40ba-9ac7-7628a7cdf443',
	/** 
	 *             The value is available however it cannot be encoded in the desired format            
	 */
	UnEncoded : '7da45c51-eb8e-4c75-a40b-7db66cb3f3cb',
	/** 
	 *             The value is unavailable because it was not asked for            
	 */
	NotAsked : '09919a72-808c-44c4-8b44-86fd3725f100',
	/** 
	 *             The value may have been asked for and was not known or is unknown (this differes from AskedUnknown)            
	 */
	Unknown : '70fe34ce-caff-4f46-b6e6-9cd6d8f289d6',
	/** 
	 *             The value is not provided because it is positive infinity            
	 */
	PositiveInfinity : 'e6d6fee2-fa53-4027-8eb8-9dd0f35d053d',
	/** 
	 *             The value is not provided because there is no available information            
	 */
	NoInformation : '61d8f65c-747e-4a99-982f-a42ac5437473',
	/** 
	 *             The value is available however it has been masked due to privacy concerns            
	 */
	Masked : '9b16bf12-073e-4ea4-b6c5-e1b93e8fd490',
}  // NullReasonKeys 

// Empty guid
if(!EmptyGuid)
    var EmptyGuid = "00000000-0000-0000-0000-000000000000";

if(!Exception)
    /**
    * @class
    * @summary Represents a simple exception class
    * @constructor
    * @memberof OpenIZModel
    * @property {string} message Informational message about the exception
    * @property {any} details Any detail / diagnostic information
    * @property {Exception} cause The cause of the exception
    * @param {string} type The type of exception
    * @param {string} message Informational message about the exception
    * @param {any} detail Any detail / diagnostic information
    * @param {Exception} cause The cause of the exception
    */
    function Exception (type, message, detail, cause, stack, policy, rules, data) {
        _self = this;
        /** @type {string} */
        this.$type = type;
        /** @type {string} */
        this.message = message;
        /** @type {string} */
        this.detail = detail;
        /** @type {Exception} */
		this.cause = cause;
		/** @type {string} */
		this.stack = stack;
		/** @type {string} */
		this.policy = policy;
		/** @type {Array} */
		this.rules = rules;
		/** @type {Array} */
		this.data = data;
    }

