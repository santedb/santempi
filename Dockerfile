FROM santesuite/santedb-icdr:2.1.21
MAINTAINER "SanteSuite Contributors"
COPY ./bin/Release/SanteMPI.Messaging.IHE.dll /santedb/SanteMPI.Messaging.IHE.dll
COPY ./bin/Release/SanteMPI.Persistence.ADO.dll /santedb/SanteMPI.Persistence.ADO.dll
COPY ./dist/santempi.sln.pak /santedb/applets/santempi.sln.pak
RUN mkdir /santedb/matching
COPY ./matching/DefaultPatientMatching.xml /santedb/match/default.xml
WORKDIR /santedb
ENV SDB_FEATURE=RAMCACHE;ADO;PUBSUB_ADO;SEC;LOG;FHIR;HL7;HDSI;AMI;BIS;SWAGGER;AUDIT_REPO;OPENID;MDM;MATCHING
ENV SDB_MDM_RESOURCE=Patient=org.santedb.matching.patient.default
ENV SDB_MDM_AUTO_MERGE=false
ENV SDB_MATCHING_MODE=WEIGHTED