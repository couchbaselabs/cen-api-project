import couchbase from "couchbase"

export async function couchbaseConnect() {
    return couchbase.connect('couchbases://copy_endpoint_here?ssl=no_verify', {
        username: 'copy_username_here', password: 'copy_password_here'
    }); // Move credentials to config file & remove ssl=no_verify for production
}