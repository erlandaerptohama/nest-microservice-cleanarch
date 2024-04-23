import { Module } from '@nestjs/common';

import { UserController } from './controllers/user/user.controller';
import { UserUsecaseModule } from './usecases/user/user.usecase.module';

@Module({
  imports: [
    UserUsecaseModule,
  ],
  controllers: [ UserController ],
  providers: [],
})

export class AppModule {}
