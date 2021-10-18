@ECHO OFF
IF [%1] == [] (
	echo Must specify key name - for example : pack.bat mykey
	goto end
)

	PUSHD applet
		IF EXIST "manifest.xml" (
			pakman --compile --optimize --source=.\ --output=..\bin\org.santedb.smpi.pak --keyFile=..\..\keys\%1.pfx --keyPassword=..\..\keys\%1.pass --embedcert --install --publish --publish-server=https://packages.santesuite.net
		)
		POPD

mkdir dist
pakman --compile --optimize --source=..\santedb-server\santedb-hl7\SanteDB.Messaging.HL7\applet --output=.\bin\org.santedb.hl7.pak --keyFile=..\keys\%1.pfx --keyPassword=..\keys\%1.pass --embedcert --install --publish --publish-server=https://packages.santesuite.net


pakman --compose --source=santempi.sln.xml -o dist\santempi.sln.pak --keyFile=..\keys\%1.pfx --embedCert --keyPassword=..\keys\%1.pass 

:end