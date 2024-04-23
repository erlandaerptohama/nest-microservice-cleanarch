import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmModule } from '../../modules/typeorm/typeorm.module';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { UserMapper } from './user.mapper';

@Module({
    imports: [TypeOrmModule, NestTypeOrmModule.forFeature([UserEntity])],
    providers: [UserRepository, { provide: "USER_REPO_MAPPER", useClass: UserMapper }],
    exports: [UserRepository],
})

export class UserRepositoryModule {}
