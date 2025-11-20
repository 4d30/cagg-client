#!/usr/bin/env python

"""
cagg-client example script.

Fetches job postings from the Cagg API (Career Aggregator) for multiple
titles, countries, and pages. Demonstrates how to construct requests
and iterate over multiple parameter combinations.

Replace 'YOUR_API_KEY' with your RapidAPI key before running.
"""

from urllib import parse, request
from itertools import product, repeat


def main():
    """
    Queries the Cagg API for all combinations of job titles, countries,
    and pages defined in this script. Prints each JSON response.
    """

    # API key obtained from RapidAPI
    headers = {
        'X-RapidAPI-Key': "YOUR_API_KEY",  # <-- replace with your key
        'X-RapidAPI-Host': "career-aggregator.p.rapidapi.com"
    }

    keys = ('title', 'country', 'page',)
    # Define parameter combinations
    titles = ('Web Developer', 'Software Engineer',)
    countries = ('US', 'CA',)
    pages = (1, 2, 3,)

    # Generate parameter combinations and encode them
    params = product(titles, countries, pages)
    params = map(zip, repeat(keys), params)
    params = map(tuple, params)
    encoded_params = map(parse.urlencode, params)

    url = "https://career-aggregator.p.rapidapi.com/cagg/v1/q"
    for query_string in encoded_params:
        req = request.Request('?'.join((url, query_string,)),
                              method='GET', headers=headers)
        resp = request.urlopen(req)
        content = resp.read().decode('utf-8')
        print(content)
        breakpoint()


if __name__ == '__main__':
    main()
