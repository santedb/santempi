/// <reference path="../.ref/js/santedb.js"/>

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
        var ignoreResult = await SanteDB.resources.patient.removeAssociatedAsync(recordA, "match-candidate", recordB, true);
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
        var ignoreResult = await SanteDB.resources.patient.removeAssociatedAsync(recordA, "match-ignore", recordB, true);
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
}
if(!SanteDB.application.getResourceViewer("Match")) {
    SanteDB.application.addResourceViewer("Match", function(state, parms) { state.transitionTo("santedb-admin.mpi.matches.view", parms); return true; });
}