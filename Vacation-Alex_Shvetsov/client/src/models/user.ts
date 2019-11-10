export class User {
    public constructor(
        public id: number = 0,
        public firstName: string = "",
        public lastName: string = "",
        public username: string = "",
        public password: string = "",
        public isAdmin: number = 0
    ) { }
}

