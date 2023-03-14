# santempi
SanteDB MPI Project - For more information see [Our Wiki](https://help.santesuite.org/product-overview/santesuite-products/master-patient-index-santempi)

[![Build Status](https://jenkins.fyfesoftware.ca/job/santedb-mpi-master/badge/icon)](https://jenkins.fyfesoftware.ca/job/santedb-mpi-master/)

# Building

To build this project:

```
msbuild /p:Configuration=Release /p:VersionNumber=3.0.revision /t:Clean /t:Restore /t:Build santempi.sln
```
