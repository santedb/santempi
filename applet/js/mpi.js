/// <reference path="../.ref/js/santedb.js"/>

/**
 * @method
 * @param {Patient} patient The patient to be rendered as a string
 * @param {String} preferredDomain The preferred identity domain for identity rendering
 */
function renderPatientAsString(patient, preferredDomain) {
    var retVal = '';

    retVal += "<span class='mr-1'>";
    if(patient.name) {
        retVal += SanteDB.display.renderEntityName(patient.name);
    }

    retVal += "</span><span class='mr-1 badge badge-secondary'>";

    if(patient.identifier) {
        if(preferredDomain && patient.identifier[preferredDomain])
            retVal += `<i class="fas fa-id-card"></i> ${SanteDB.display.renderIdentifier(patient.identifier, preferredDomain)}`;
        else {
            var key = Object.keys(patient.identifier)[0];
            retVal += `<i class="far fa-id-card"></i> ${SanteDB.display.renderIdentifier(patient.identifier, key)}`;
        }
    }
    
    retVal += "</span><span class='mr-1'>";

    if(patient.dateOfBirth)
        retVal += `<br/><i class='fas fa-birthday-cake'></i> ${SanteDB.display.renderDate(patient.dateOfBirth, patient.dateOfBirthPrecision)} `;
    // Deceased?
    if(patient.deceasedDate)
        retVal += `<span class='badge badge-dark'>${SanteDB.locale.getString("ui.model.patient.deceasedIndicator")}</span>`;

    retVal += "</span><span class='mr-1'>";
    
    // Gender
    if(patient.genderConceptModel) {
        switch(patient.genderConceptModel.mnemonic) {
            case 'Male':
                retVal += `<i class='fas fa-male' title="${SanteDB.display.renderConcept(patient.genderConceptModel)}"></i> ${SanteDB.display.renderConcept(patient.genderConceptModel)}`;
                break;
            case 'Female':
                retVal += `<i class='fas fa-female' title="${SanteDB.display.renderConcept(patient.genderConceptModel)}"></i> ${SanteDB.display.renderConcept(patient.genderConceptModel)}`;
                break;
            default:
                retVal += `<i class='fas fa-restroom' title="${SanteDB.display.renderConcept(patient.genderConceptModel)}"></i> ${SanteDB.display.renderConcept(patient.genderConceptModel)}`;
                break;
        }
    }
    retVal += "</span>";

   
    if(patient.tag &&
        patient.tag["$mdm.type"] &&
        patient.tag["$mdm.type"][0] == "T") {
            retVal += `<span class='badge badge-success'><i class='fas fa-gavel'></i> ${SanteDB.locale.getString("ui.mdm.type.T")} </span>`
        }
    return retVal;
}

/**
 * @method
 * @summary Ignore a candidate link
 * @param {string} recordA The holder record to add ignore relationship to
 * @param {string} recordB The target record to add ignore relationship to
 */
async function ignoreCandidateAsync(recordA, recordB) {
    // Confirm the action
    if(!confirm(SanteDB.locale.getString("ui.mpi.matches.ignore.confirm")))
        return;

    // Send the MDM-ignore post
    try {
        // We DELETE the candidate (ignore it)
        var ignoreResult = await SanteDB.resources.patient.removeAssociatedAsync(recordA, "mdm-candidate", recordB, true);
        toastr.success(SanteDB.locale.getString("ui.mpi.matches.ignore.success"));
    }
    catch(e) {
        toastr.error(SanteDB.locale.getString("ui.mpi.matches.ignore.error"));
        throw e;
    }
}


/**
 * @method
 * @summary Remove an ignore a candidate link
 * @param {string} recordA The holder from which the ignore relationship is to be removed
 * @param {string} recordB The target which the ignore should be removed
 */
 async function unIgnoreCandidateAsync(recordA, recordB) {
    // Confirm the action
    if(!confirm(SanteDB.locale.getString("ui.mpi.matches.unignore.confirm")))
        return;

    // Send the MDM-ignore post
    try {
        // We DELETE the candidate (ignore it)
        var ignoreResult = await SanteDB.resources.patient.removeAssociatedAsync(recordA, "mdm-ignore", recordB, true);
        toastr.success(SanteDB.locale.getString("ui.mpi.matches.unignore.success"));
    }
    catch(e) {
        toastr.error(SanteDB.locale.getString("ui.mpi.matches.unignore.error"));
        throw e;
    }
}

/**
 * @method
 * @summary Confirm/attach a candidate
 * @param {string} recordA The record to which the candidate is to be attached
 * @param {string} recordB The record which the candidate is being attached
 */
async function attachCandidateAsync(recordA, recordB) {

    // Confirm the action
    if(!confirm(SanteDB.locale.getString("ui.mpi.matches.attach.confirm")))
        return;
    
    // Send the MDM attach
    try {
        // We POST a new link
        var attachResult = await SanteDB.resources.patient.addAssociatedAsync(recordA, "mdm-link", {
            "$type" : "Reference",
            "id" : recordB
        }, true);
        toastr.success(SanteDB.locale.getString("ui.mpi.matches.attach.success"));
    }
    catch(e) {
        toastr.error(SanteDB.locale.getString("ui.mpi.matches.attach.error"));
        throw e;
    }
}

/**
 * @method
 * @summary Detach a local 
 * @param {string} recordA The master from which the candidate is to be detached
 * @param {string} recordB The record which is to be detached
 */
 async function detachLocalAsync(recordA, recordB) {

    // Confirm the action
    if(!confirm(SanteDB.locale.getString("ui.mpi.matches.detach.confirm")))
        return;
    
    // Send the MDM attach
    try {
        // We POST a new link
        var attachResult = await SanteDB.resources.patient.removeAssociatedAsync(recordA, "mdm-link", recordB, true);
        toastr.success(SanteDB.locale.getString("ui.mpi.matches.detach.success"));
    }
    catch(e) {
        toastr.error(SanteDB.locale.getString("ui.mpi.matches.detach.error"));
        throw e;
    }
}


// Set the view handlers
if(!SanteDB.application.getResourceViewer("Patient")) {
    SanteDB.application.addResourceViewer("Patient", function(state, parms) { state.transitionTo("santedb-admin.mpi.patients.view", parms); return true; });
    SanteDB.application.addResourceViewer("DiagnosticReport", function (state, parms) {
        state.transitionTo("santedb-admin.system.bug");
        return true;
    });
}