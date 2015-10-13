#!/usr/bin/env bash

cd "$(dirname "$0")"

r.js -o baseUrl=www/js name=main out=www/script.js
