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

set cwd=%cd%
echo Will build version %version%
echo Will use NUGET in %nuget%
echo Will use MSBUILD in %msbuild%

if exist "%msbuild%\msbuild.exe" (
	%msbuild%\msbuild santempi.sln /t:restore
	%msbuild%\msbuild santempi.sln /t:clean /t:rebuild /p:configuration=Release /m:1

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

	FOR /R "%cwd%\bin\Release" %%G IN (SanteDB*.exe) DO (
		echo Signing %%G
		"C:\Program Files (x86)\Windows Kits\8.1\bin\x86\signtool.exe" sign "%%G"
	)
	FOR /R "%cwd%\bin\Release" %%G IN (SanteDB*.dll) DO (
		echo Signing %%G
		"C:\Program Files (x86)\Windows Kits\8.1\bin\x86\signtool.exe" sign "%%G"
	)

	docker build --no-cache -t santesuite/santedb-mpi:%version% .
	docker build --no-cache -t santesuite/santedb-mpi .

) else (	
	echo Cannot find MSBUILD
)

:eof