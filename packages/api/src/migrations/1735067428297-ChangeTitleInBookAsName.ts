import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTitleInBookAsName1735067428297 implements MigrationInterface {
    name = 'ChangeTitleInBookAsName1735067428297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` CHANGE \`title\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`books\` ADD \`name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`books\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`books\` CHANGE \`name\` \`title\` varchar(255) NOT NULL`);
    }

}
