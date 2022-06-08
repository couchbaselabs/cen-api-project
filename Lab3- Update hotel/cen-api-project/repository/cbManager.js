import couchbase from "couchbase"

export async function couchbaseConnect() {
    return couchbase.connect('couchbases://cb.odbc5w1eszwo6wps.cloud.couchbase.com?ssl=no_verify', {
        username: 'cbuser', password: 'Password123!'
    }); // Move credentials to config file & remove ssl=no_verify for production
}