@ECHO OFF


	PUSHD applet
		IF EXIST "manifest.xml" (
			pakman --compile --source=.\ --output=..\bin\org.santedb.smpi.pak --keyFile=..\..\keys\community.santesuite.net.pfx --keyPassword=..\..\keys\community.santesuite.net.pass --embedcert --install
		)
		POPD

mkdir dist
pakman --compile --source=..\santedb-server\SanteDB.Messaging.HL7\applet --output=.\bin\org.santedb.hl7.pak --keyFile=..\keys\community.santesuite.net.pfx --keyPassword=..\keys\community.santesuite.net.pass --embedcert --install


pakman --compose --source=santempi.sln.xml -o dist\santempi.sln.pak --keyFile=..\keys\community.santesuite.net.pfx --embedCert --keyPassword=..\keys\community.santesuite.net.pass 

