export class RepositoryError extends Error {
    constructor(message, httpCode= 422) {
        super(message);
        this.status = httpCode;
    }
}