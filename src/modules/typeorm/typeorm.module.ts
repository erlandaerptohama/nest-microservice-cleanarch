import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule as NestTypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmModuleOptions = (): TypeOrmModuleOptions =>
    ({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE_NAME,
        entities: [__dirname + './../../**/*.entity{.ts,.js}'],
        migrationsRun: true,
        migrations: [__dirname + 'migrations/**/*{.ts,.js}'],
        cli: {
            migrationsDir: 'migrations',
        },
    } as TypeOrmModuleOptions);

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: process.env.NODE_ENV === 'production' ? true : false,
            isGlobal: true,
        }),
        NestTypeOrmModule.forRootAsync({
            useFactory: getTypeOrmModuleOptions,
        }),
    ],
})

export class TypeOrmModule {}
