@ECHO OFF


	PUSHD applet
		IF EXIST "manifest.xml" (
			pakman --compile --optimize --source=.\ --output=..\bin\org.santedb.smpi.pak --keyFile=..\..\keys\community.santesuite.net.pfx --keyPassword=..\..\keys\community.santesuite.net.pass --embedcert --install --publish --publish-server=https://packages.santesuite.net
		)
		POPD

mkdir dist
pakman --compile --optimize --source=..\santedb-server\santedb-hl7\SanteDB.Messaging.HL7\applet --output=.\bin\org.santedb.hl7.pak --keyFile=..\keys\community.santesuite.net.pfx --keyPassword=..\keys\community.santesuite.net.pass --embedcert --install --publish --publish-server=https://packages.santesuite.net


pakman --compose --source=santempi.sln.xml -o dist\santempi.sln.pak --keyFile=..\keys\community.santesuite.net.pfx --embedCert --keyPassword=..\keys\community.santesuite.net.pass 

