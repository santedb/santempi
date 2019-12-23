@ECHO OFF


	PUSHD applet
		IF EXIST "manifest.xml" (
			sdb-pakr --compile --optimize --source=.\ --output=..\bin\org.santedb.smpi.pak --keyFile=..\..\keys\community.santesuite.net.pfx --keyPassword=..\..\keys\community.santesuite.net.pass --embedcert
		)
		POPD

sdb-pakr --compile --optimize --source=..\santedb-server\SanteDB.Messaging.HL7\applet --output=.\bin\org.santedb.hl7.pak --keyFile=..\keys\community.santesuite.net.pfx --keyPassword=..\keys\community.santesuite.net.pass --embedcert
sdb-pakr --compile --optimize --source=..\santeguard\applet --output=.\bin\org.santedb.sg.pak --keyFile=..\keys\community.santesuite.net.pfx --keyPassword=..\keys\community.santesuite.net.pass --embedcert

PUSHD bin

copy ..\..\applets\bin\org.santedb.core.pak /y
copy ..\..\applets\bin\org.santedb.bicore.pak /y
copy ..\..\applets\bin\org.santedb.uicore.pak /y
copy ..\..\applets\bin\org.santedb.config.pak /y
copy ..\..\applets\bin\org.santedb.admin.pak /y
copy ..\..\applets\bin\org.santedb.i18n.en.pak /y

sdb-pakr --compose --source=..\santempi.sln.xml -o santempi.sln.pak --keyFile=..\..\keys\community.santesuite.net.pfx --embedCert --keyPassword=..\..\keys\community.santesuite.net.pass --embedcert

del org.santedb.core.pak 
del org.santedb.bicore.pak 
del org.santedb.uicore.pak 
del org.santedb.config.pak 
del org.santedb.admin.pak 
del org.santedb.i18n.en.pak 
POPD

