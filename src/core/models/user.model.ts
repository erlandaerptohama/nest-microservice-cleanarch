
export class UserModelWithoutPassword {
    id?: number;
    username: string;
    name: string;
    role: number;
}

export class UserModel extends UserModelWithoutPassword {
    password: string;
}
