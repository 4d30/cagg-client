# cagg-client
Example scripts and client library for the Cagg API, a multi-source career aggregator. Fetch curated job postings from multiple sources in a consistent JSON format. Includes Python, Node.js, and curl examples for easy integration!


### *Query with Criteria* --  Endpoint: `GET /cagg/v1/q`
Returns a list of job postings.

#### Query Parameters
- **title** *(string, optional)* — Filter by job title.
- **country** *(string, optional)* — ISO 3166-1 alpha-2 country code (US, UK, CA, AU, JP, etc).
- **posted_after** *(string, optional)* — Filter by posting date in `YYYY-MM-DD` format.
- **page** *(integer, optional)* — Page number. Default is `1`.

### Pagination
Each page returns 10 job postings. Pagination is controlled using the `page` query parameter.

**Note:** The API currently does not return total document counts or next/prev pagination links.

### Response Model
The `Role` object returned by this endpoint has the following fields:

- **title** *(string)* — Job title.
- **location** *(string, optional)* — City or region, if available.
- **country** *(string, optional)* — ISO 3166-1 alpha-2 country code.
- **department** *(string, optional)* — Department or team name.
- **type** *(string, optional)* — Employment type (e.g., Full-time, Part-time, Contract).
- **description** *(string, optional)* — Short text description of the role.
- **hostedurl** *(string)* — Canonical URL of the job posting.
- **applyurl** *(string)* — URL where the candidate applies.
- **posted_at** *(timestamp)* — When the job was posted by the employer.

### Example Request
```bash
GET /v1/q?title=data&country=US&posted_after=2024-01-01&page=1
```

### Example Response
```
[
  {
    "title": "Data Scientist",
    "location": "New York, NY",
    "country": "US",
    "department": "Analytics",
    "type": "Full-time",
    "description": "Analyze data and build predictive models...",
    "hostedurl": "https://example.com/jobs/12345",
    "applyurl": "https://example.com/jobs/12345/apply",
    "posted_at": "2025-11-15T10:00:00Z"
  },
  {
    "title": "Machine Learning Engineer",
    "location": "San Francisco, CA",
    "country": "US",
    "department": "AI",
    "type": "Full-time",
    "description": "Develop ML models and pipelines...",
    "hostedurl": "https://example.com/jobs/12346",
    "applyurl": "https://example.com/jobs/12346/apply",
    "posted_at": "2025-11-14T15:30:00Z"
  },
...
]
```

### Rate Limiting
To ensure fair use and reliable service, we ask that clients make no more than **30 requests per minute**. Excessive usage may result in throttling or temporary request rejection.

### Getting Started / Quickstart

Python Example:
```python
import http.client

conn = http.client.HTTPSConnection("career-aggregator.p.rapidapi.com")

headers = {
           'X-RapidAPI-Key': "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
           'X-RapidAPI-Host': "career-aggregator.p.rapidapi.com"
          }

conn.request("GET", "/cagg/v1/q?title=Data%20Scientist&country=US", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
```

### Versioning
Current API version: v1.
Breaking changes will be introduced in v2 and documented accordingly.
