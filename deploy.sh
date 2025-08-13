#!/bin/bash
npm run build && rsync -av --delete dist/ /var/www/fincaoaxaca.com/
