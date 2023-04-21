#!/bin/sh
msbuild /p:Configuration=Release /p:VersionNumber=$1 /t:Clean /t:Restore santempi.sln
msbuild /p:Configuration=Release /p:VersionNumber=$1 /t:Build santempi.sln
