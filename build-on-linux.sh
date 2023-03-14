#!/bin/sh
msbuild /p:Configuration=Release /p:VersionNumber=$1 /t:Clean /t:Restore /t:Build santempi.sln
