export class AuthUser {
    constructor(
        public id: string,
        public email: string,
        private token: string,
        private expirationDate: Date,
        public refreshToken: string
    ) {

    }

    public getToken(): string | null {
        if (!this.expirationDate || new Date() > this.expirationDate) {
            return null;
        }
        return this.token;
    }
}
