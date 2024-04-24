import { MigrationInterface, QueryRunner } from "typeorm"

export class UsersTable1713934086000 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS users (id INT NOT NULL AUTO_INCREMENT, username VARCHAR(255), name VARCHAR(255), password VARCHAR(255), role INT, created_date DATETIME, updated_date DATETIME, PRIMARY KEY (id));`)
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`)
    }
}
