# Organization Tracker.

## uses the unicorn-froyo express-ts-starter-kit

This is backend api service in node.js that serves two endpoints for an organization tracker. This project uses yarn for package management and assumes you have _node.js_, _yarn_, and _docker_.

**Endpoint 1: Create Organization**

API: POST api/v1/organizations
Allow an organization to be added to the database
Acceptes: content-type/json with the following example:

"name": "jeetorg", \
"createDate": "2021-05-01", || Must be in format 'YYYY-MM-DD' \
"employees": 400, \
"isPublic": false

All values are required.

**Endpoint 2: Search organization**

API: GET api/v1/organizations
Return results from the tracker for all organizations that match the search criteria

You can search by any of the information listed above using query params:

`/api/v1/organizations?name=random&employees[gte]=100`

This will search for all organizations with `random` in their name and employees greater than or equal to 100.
You can search using `gte` (greater than or equal to), `gt` (greater than), `lte` (less than or equal to), or `lt` (less than)
on `createDate` and `employees`.

You can also pass in no query params and retrieve every organization.

### Testing

Testing is executed via the Jest runner and uses Supertest.
In order to test:

1. Ensure all dependencies are installed with `yarn`
2. run `yarn test`

### Running Locally:

1. First execute `yarn && yarn build`
2. Ensure you have docker on your computer
3. Use command `yarn docker` to run the API server as well as a dockerized postgres db
4. Once the API is up and running, open up postman and hit `127.0.0.1:5000/api/v1/healthcheck` to verify health
5. Then hit one of the two endpoints described above
