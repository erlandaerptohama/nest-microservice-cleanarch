import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserModel, UserModelWithoutPassword } from '../../core/models/user.model';

@Injectable()
export class UserMapper {
    
    mapToUserModel(userEntity: UserEntity) {

        const user = new UserModelWithoutPassword();
        user.id = userEntity.id;
        user.username = userEntity.username;
        user.name = userEntity.name;
        user.role = userEntity.role;

        return user;
    }

    mapToEntity(userModel: UserModel) {

        const user = new UserEntity();
        user.username = userModel.username;
        user.name = userModel.name;
        user.password = userModel.password;
        user.role = userModel.role;

        return user;
    }
}
