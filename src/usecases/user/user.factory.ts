import { Injectable } from '@nestjs/common';
import { AddUserDto, UpdateUserDto } from '../../controllers/user/user.dto';
import { UserModel } from '../../core/models/user.model';

@Injectable()
export class UserFactory {
    
    addUser(addUserDto: AddUserDto) {
        const newUser = new UserModel();
        
        newUser.username = addUserDto.username;
        newUser.name = addUserDto.name;
        newUser.password = addUserDto.password;
        newUser.role = addUserDto.role;

        return newUser;
    }

    updateUser(updateUserDto: UpdateUserDto) {
        const newUser = new UserModel();

        if (updateUserDto.name) { newUser.name = updateUserDto.name; }
        if (updateUserDto.password) { newUser.password = updateUserDto.password; }
        if (updateUserDto.role) { newUser.role = updateUserDto.role; }

        return newUser;
    }
}
