

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