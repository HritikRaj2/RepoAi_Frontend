#!/bin/bash
cd /APIS_CHECKDONE/APIS/apis-main
echo "Building apis-main..."
mvn compile -DskipTests
echo "Build complete. Checking target/classes..."
ls -R target/classes
