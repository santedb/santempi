FROM santesuite/santedb-icdr:latest
MAINTAINER "SanteSuite Contributors"
COPY ./bin/Release/SanteMPI.Messaging.IHE.dll /santedb/SanteMPI.Messaging.IHE.dll
COPY ./bin/Release/SanteMPI.Persistence.ADO.dll /santedb/SanteMPI.Persistence.ADO.dll
COPY ./bin/Release/SanteMPI.i18n.dll /santedb/SanteMPI.i18n.dll

COPY ./dist/santempi.sln.pak /santedb/applets/santempi.sln.pak
COPY ./SanteMPI/match/04af8439-2234-4a81-ac3a-635c9a76b30c.xml /santedb/match/04af8439-2234-4a81-ac3a-635c9a76b30c.xml
WORKDIR /santedb
ENV SDB_FEATURE=RAMCACHE;ADO;PUBSUB_ADO;SEC;LOG;FHIR;HL7;HDSI;AMI;BIS;SWAGGER;AUDIT_REPO;OPENID;MDM;MATCHING;IHE_PIXM;IHE_PDQM;IHE_PMIR
ENV SDB_MDM_RESOURCE=Patient
ENV SDB_MDM_AUTO_MERGE=false
ENV SDB_MATCHING_MODE=WEIGHTED