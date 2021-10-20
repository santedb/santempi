@echo off

set version=%1

if exist "C:\Program Files (x86)\Microsoft Visual Studio\2017\Enterprise\MSBuild\15.0\Bin\MSBuild.exe" (
        echo will use VS 2017 Enterprise build tools
        set msbuild="C:\Program Files (x86)\Microsoft Visual Studio\2017\Enterprise\MSBuild\15.0\Bin"
) else (
	if exist "C:\Program Files (x86)\Microsoft Visual Studio\2017\Professional\MSBuild\15.0\Bin\MSBuild.exe" (
        	echo will use VS 2017 Professional build tools
	        set msbuild="C:\Program Files (x86)\Microsoft Visual Studio\2017\Professional\MSBuild\15.0\Bin"
	) else (
		if exist "c:\Program Files (x86)\Microsoft Visual Studio\2017\Community\MSBuild\15.0\Bin\MSBuild.exe" (
	        	echo will use VS 2017 Community build tools
        		set msbuild="c:\Program Files (x86)\Microsoft Visual Studio\2017\Community\MSBuild\15.0\Bin"
		) else ( 
			if exist "c:\Program Files (x86)\Microsoft Visual Studio\2019\Professional\MSBuild\Current\Bin\MSBuild.exe" (
        			set msbuild="c:\Program Files (x86)\Microsoft Visual Studio\2019\Professional\MSBuild\Current\Bin"
	        		echo will use VS 2019 Pro build tools
			) else (
				echo Unable to locate VS 2017 or 2019 build tools, will use default build tools 
			)
		)
	)
)

if exist "c:\Program Files (x86)\Inno Setup 6\ISCC.exe" (
	set inno="c:\Program Files (x86)\Inno Setup 6\ISCC.exe"
) else (
	if exist "c:\Program Files (x86)\Inno Setup 5\ISCC.exe" (
		set inno="c:\Program Files (x86)\Inno Setup 5\ISCC.exe"
	) else (
		echo Can't Find INNO Setup Tools
		goto :eof
	)
)

set signtool="C:\Program Files (x86)\Windows Kits\10\bin\10.0.17763.0\x64\signtool.exe"
set cwd=%cd%
echo Will build version %version%
echo Will use NUGET in %nuget%
echo Will use MSBUILD in %msbuild%

if exist "%msbuild%\msbuild.exe" (
	%msbuild%\msbuild santempi.sln /t:restore
	%msbuild%\msbuild santempi.sln /t:clean /t:rebuild /p:configuration=Release /m:1

	PUSHD applet
		IF EXIST "manifest.xml" (
			"c:\Program Files\SanteSuite\SanteDB\SDK\pakman" --compile --optimize --source=.\ --version=%1 --output=..\bin\org.santedb.smpi.pak --sign --certHash=f3bea1ee156254656669f00c03eeafe8befc4441 --embedcert --install --publish --publish-server=https://packages.santesuite.net
		)
		POPD

	"c:\Program Files\SanteSuite\SanteDB\SDK\pakman" --compile --optimize --source=..\santedb-server\santedb-hl7\SanteDB.Messaging.HL7\applet --version=%1 --output=.\bin\org.santedb.hl7.pak --sign --certHash=f3bea1ee156254656669f00c03eeafe8befc4441 --embedcert --install --publish --publish-server=https://packages.santesuite.net

	"c:\Program Files\SanteSuite\SanteDB\SDK\pakman" --compose --version=%1 --source=santempi.sln.xml -o dist\santempi.sln.pak  --embedCert --sign --certHash=f3bea1ee156254656669f00c03eeafe8befc4441 

	FOR /R "%cwd%\bin\Release" %%G IN (SanteMPI*.exe) DO (
		echo Signing %%G
		%signtool% sign /sha1 a11164321e30c84bd825ab20225421434622c52a /d "SanteMPI"  "%%G"
	)
	FOR /R "%cwd%\bin\Release" %%G IN (SanteMPI*.dll) DO (
		echo Signing %%G
		%signtool% sign /sha1 a11164321e30c84bd825ab20225421434622c52a /d "SanteMPI" "%%G"
	)

	FOR /R "%cwd%" %%G IN (*.nuspec) DO (
		echo Packing %%~pG
		pushd "%%~pG"
		if [%2] == [] (
			%nuget% pack -OutputDirectory "%localappdata%\NugetStaging" -prop Configuration=Release  -msbuildpath %msbuild%
		) else (
			echo Publishing NUPKG
			%nuget% pack -prop Configuration=Release -msbuildpath %msbuild%
			FOR /R %%F IN (*.nupkg) do (
				%nuget% push "%%F" -Source https://api.nuget.org/v3/index.json -ApiKey %2 
			)
		) 
		popd
	)

	
	%inno% "/o.\bin\dist" ".\install\santempi-install.iss" /d"MyAppVersion=%version%"

	rem ################# TARBALLS 
	echo Building Linux Tarball

	 mkdir santedb-mpi-%version%
	cd santedb-mpi-%version%
	copy "..\bin\Release\SanteMPI*.dll"
	mkdir applets
	copy "..\dist\*.pak" applets\
	
	xcopy /I /S "..\bin\Release\Config\*.*" ".\config"
	cd ..
	"C:\program files\7-zip\7z" a -r -ttar .\bin\dist\santedb-mpi-%version%.tar .\santedb-mpi-%version%
	"C:\program files\7-zip\7z" a -r -tzip .\bin\dist\santedb-mpi-%version%.zip .\santedb-mpi-%version%
	"C:\program files\7-zip\7z" a -tbzip2 .\bin\dist\santedb-mpi-%version%.tar.bz2 .\bin\dist\santedb-mpi-%version%.tar
	"C:\program files\7-zip\7z" a -tgzip .\bin\dist\santedb-mpi-%version%.tar.gz .\bin\dist\santedb-mpi-%version%.tar
	del /q /s .\installsupp\*.* 
	del /q /s .\santedb-mpi-%version%\*.*
	rmdir /q /s .\santedb-mpi-%version%
	rmdir /q/s .\installsupp

	REM Re-Sign for Docker using internal certificates (since docker mono is odd)
	FOR /R "%cwd%\bin\Release" %%G IN (SanteMPI*.exe) DO (
		echo Signing %%G
		%signtool% sign /sha1 f3bea1ee156254656669f00c03eeafe8befc4441 /d "SanteMPI"  "%%G"
	)
	FOR /R "%cwd%\bin\Release" %%G IN (SanteMPI*.dll) DO (
		echo Signing %%G
		%signtool% sign /sha1 f3bea1ee156254656669f00c03eeafe8befc4441 /d "SanteMPI" "%%G"
	)

	docker build --no-cache -t santesuite/santedb-mpi:%version% .
	docker build --no-cache -t santesuite/santedb-mpi .

) else (	
	echo Cannot find MSBUILD
)

:eof