/// <reference path="../.ref/js/santedb.js"/>

/**
 * @method
 * @summary Registers the asset viewers
 * @param {*} $state The context on which to register the reports
 */
function registerAssetsViewers($state) {

    // Set the view handlers
    if(!SanteDB.application.getResourceViewer("Patient")) {
        SanteDB.application.addResourceViewer("Patient", function (parms) { $state.transitionTo("santedb-admin.mpi.patients.view", parms); return true; });
        SanteDB.application.addResourceViewer("DiagnosticReport", function (parms) {
            $state.transitionTo("santedb-admin.system.bug");
            return true;
        });
    }
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
        toastr.success(SanteDB.locale.getString("ui.matches.attach.success"));
    }
    catch(e) {
        toastr.error(SanteDB.locale.getString("ui.mpi.matches.attach.error"));
        throw e;
    }
}