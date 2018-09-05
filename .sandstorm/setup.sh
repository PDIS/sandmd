#!/bin/bash

# When you change this file, you must take manual action. Read this doc:
# - https://docs.sandstorm.io/en/latest/vagrant-spk/customizing/#setupsh

set -euo pipefail

apt-get -y install git
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
apt-get install -y nodejs
apt-get install -y build-essential
npm install -g npm
npm install -g concurrently

# saml-idp setup
cd /opt/app/saml-idp
rm -f package-lock.json
mkdir -p /var/saml_node_modules
mkdir -p node_modules
mount --bind /var/saml_node_modules /opt/app/saml-idp/node_modules
echo 'mount --bind /var/saml_node_modules /opt/app/saml-idp/node_modules' >> ~/.bashrc
npm install

# codimd setup
cd /opt/app/codimd
rm -f package-lock.json

# Avoid massive I/O caused by VirtualBox file sharing
mkdir -p /var/codimd_node_modules
mkdir -p /var/codimd_public_build
mkdir -p /var/codimd_public_views_build
mkdir -p node_modules
mkdir -p public/build
mkdir -p public/views/build
mount --bind /var/codimd_node_modules /opt/app/codimd/node_modules
mount --bind /var/codimd_public_build /opt/app/codimd/public/build
mount --bind /var/codimd_public_views_build /opt/app/codimd/public/views/build
echo 'mount --bind /var/codimd_node_modules /opt/app/codimd/node_modules' >> ~/.bashrc
echo 'mount --bind /var/codimd_public_build /opt/app/codimd/public/build' >> ~/.bashrc
echo 'mount --bind /var/codimd_public_views_build /opt/app/codimd/public/views/build'  >> ~/.bashrc
bin/setup
npm run build

# reverse proxy
cd /opt/app
mkdir -p /var/app_node_modules
mkdir -p node_modules
mount --bind /var/app_node_modules /opt/app/node_modules
echo 'mount --bind /var/app_node_modules /opt/app/node_modules' >> ~/.bashrc
rm -f package-lock.json
npm install

