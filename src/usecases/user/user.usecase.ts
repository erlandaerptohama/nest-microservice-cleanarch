import { Inject, Injectable } from '@nestjs/common';

import { UserModelWithoutPassword } from '../../core/models/user.model';
import { AddUserDto, UpdateUserDto } from '../../controllers/user/user.dto';
import { UserFactory } from './user.factory';
import { UserRepository } from '../../repositories/user/user.repository';
import { ExceptionService } from '../../modules/exception/exception.service';
import { LoggerService } from '../../modules/logger/logger.service';

@Injectable()
export class UserUseCase {
    constructor(
        private userRepository: UserRepository,
        @Inject("USER_FACTORY")
        private userFactory: UserFactory,
        private exception: ExceptionService,
        private logger: LoggerService
    ) {}

    async getAllUser(): Promise<UserModelWithoutPassword[]> {
        return await this.userRepository.getAll();
    }

    async getOneUser(id: number): Promise<UserModelWithoutPassword> {
        return await this.userRepository.getOneById(id);
    }

    async insert(dto: AddUserDto): Promise<boolean> {
        const newUser = this.userFactory.addUser(dto);
        this.logger.log(`User Model: ${JSON.stringify(newUser)}`);

        try {
            await this.userRepository.insert(newUser);
    
            return true;
        } catch (error) {
            this.logger.error(`Insert User error = ${error}`)
            this.exception.internalServerErrorException()
        }
    }

    async update(id: number, dto: UpdateUserDto): Promise<boolean> {
        const newUser = this.userFactory.updateUser(dto);
        await this.userRepository.update(id, newUser);

        return true;
    }

    async delete(id: number): Promise<boolean> {
        await this.userRepository.deleteById(id);
        
        return true;
    }
}
