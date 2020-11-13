export class AuthUser {
    constructor(
        public id: string,
        public email: string,
        private token: string,
        public refreshToken: string,
        private expirationDate: Date,
    ) {

    }

    public getToken(): string | null {
        if (!this.expirationDate || new Date() > this.expirationDate) {
            return null;
        }
        return this.token;
    }
}
