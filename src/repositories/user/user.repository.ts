import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { UserModel, UserModelWithoutPassword } from '../../core/models/user.model';
import { IUserRepository } from '../../core/repositories/user.repository.interface';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @Inject("USER_REPO_MAPPER")
        private userMapper: UserMapper
    ) {}

    async getAll(): Promise<UserModelWithoutPassword[]> {
        const userEntity = await this.userRepository.find();
        return userEntity.map(user => this.userMapper.mapToUserModel(user));
    }

    async getOneById(id: number): Promise<UserModelWithoutPassword> {
        const userEntity = await this.userRepository.findOne({ where: { id } });
        return this.userMapper.mapToUserModel(userEntity);
    }

    async insert(userModel: UserModel): Promise<void> {
        await this.userRepository.insert(this.userMapper.mapToEntity(userModel));
    }

    async update(id: number, user: Partial<UserModel>): Promise<void> {
        await this.userRepository.update({ id }, user);
    }

    async deleteById(id: number): Promise<void> {
        await this.userRepository.delete({ id });
    }
}
