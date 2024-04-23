import { UserModel, UserModelWithoutPassword } from "../models/user.model";

export interface IUserRepository {
    getAll(): Promise<Array<UserModelWithoutPassword>>;
    getOneById(id: number): Promise<UserModelWithoutPassword>;
    insert(user: UserModel): Promise<void>;
    update(id: number, user: Partial<UserModel>): Promise<void>;
    deleteById(id: number): Promise<void>;
}
