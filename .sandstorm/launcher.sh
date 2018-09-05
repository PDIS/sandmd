#!/bin/bash
set -euo pipefail
export NODE_ENV=production
export DEBUG=false
concurrently --kill-others "cd /opt/app/codimd; node app.js" "cd /opt/app/saml-idp; node app.js --acs /auth/saml --aud /;" "cd /opt/app; node rproxy.js;"