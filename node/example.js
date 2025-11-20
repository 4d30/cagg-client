#!/usr/bin/env node
/**
 * cagg-client Node.js example
 *
 * Fetches job postings from the Cagg API for multiple titles, countries, and pages.
 * Replace 'YOUR_API_KEY_HERE' with your RapidAPI key before running.
 */

const https = require('https');
const { URL } = require('url');

// Parameter combinations
const titles = ['Web Developer', 'Software Engineer'];
const countries = ['US', 'CA'];
const pages = [1, 2, 3];
const keys = ['title', 'country', 'page'];

const apiHost = 'career-aggregator.p.rapidapi.com';
const apiKey = 'YOUR_API_KEY_HERE';
const baseUrl = `https://${apiHost}/cagg/v1/q`;

// Generate all combinations of parameters
function* paramCombinations() {
  for (const title of titles) {
    for (const country of countries) {
      for (const page of pages) {
        yield { title, country, page };
      }
    }
  }
}

// Helper to make HTTPS GET request and return a Promise
function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'X-RapidAPI-Key': apiKey, 'X-RapidAPI-Host': apiHost } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  for (const params of paramCombinations()) {
    const url = new URL(baseUrl);
    Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
    const response = await fetch(url);
    console.log(response);
  }
}

main();
