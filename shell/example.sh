#!/usr/bin/env bash
# cagg-client shell example
# Fetches job postings from the Cagg API using curl
# Replace YOUR_API_KEY_HERE with your RapidAPI key

API_KEY="YOUR_API_KEY"
API_HOST="career-aggregator.p.rapidapi.com"
BASE_URL="https://$API_HOST/cagg/v1/q"

# Example parameters
TITLE="Web Developer"
COUNTRY="US"
PAGE=1

# Make the GET request
curl -s -G "$BASE_URL" \
  -H "X-RapidAPI-Key: $API_KEY" \
  -H "X-RapidAPI-Host: $API_HOST" \
  --data-urlencode "title=$TITLE" \
  --data-urlencode "country=$COUNTRY" \
  --data-urlencode "page=$PAGE"
