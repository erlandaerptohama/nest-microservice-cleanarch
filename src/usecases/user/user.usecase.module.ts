import { Module } from '@nestjs/common';
import { UserFactory } from './user.factory';
import { UserUseCase } from './user.usecase';
import { UserRepositoryModule } from '../../repositories/user/user.repository.module';
import { ExceptionModule } from '../../modules/exception/exception.module';
import { LoggerModule } from '../../modules/logger/logger.module';

@Module({
    imports: [UserRepositoryModule, ExceptionModule, LoggerModule],
    providers: [UserUseCase, { provide: "USER_FACTORY", useClass: UserFactory }],
    exports: [UserUseCase],
})

export class UserUsecaseModule {}
