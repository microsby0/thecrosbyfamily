#!/bin/bash

set -e

GCLOUD_PROJECT=${GOOGLE_PROJECT_ID}
# expecting the install directly in the home directory
GCLOUD=${HOME}/google-cloud-sdk/bin/gcloud
echo "Current GCLOUD location: ${GCLOUD_SDK_URL}"
if ${GCLOUD} version 2>&1 >> /dev/null; then
    echo "Cloud SDK is already installed"
else
    SDK_URL=${GCLOUD_SDK_URL}
    INSTALL_DIR=${HOME}

    cd ${INSTALL_DIR}
    wget ${SDK_URL} -O cloud-sdk.tar.gz
    tar -xzvf cloud-sdk.tar.gz

    ${GCLOUD} components install app-engine-java
fi

echo ${GCLOUD_SERVICE_KEY} | ${GCLOUD} auth activate-service-account --key-file=-
${GCLOUD} config set project ${GCLOUD_PROJECT}