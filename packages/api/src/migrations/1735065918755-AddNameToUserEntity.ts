import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNameToUserEntity1735065918755 implements MigrationInterface {
    name = 'AddNameToUserEntity1735065918755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`name\``);
    }

}
