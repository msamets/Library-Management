import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntitiesInitialMigration1735045561566 implements MigrationInterface {
    name = 'CreateEntitiesInitialMigration1735045561566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('CUSTOMER', 'LIBRARY_MANAGER') NOT NULL DEFAULT 'CUSTOMER', UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`borrows\` (\`id\` int NOT NULL AUTO_INCREMENT, \`borrowedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`returnedAt\` timestamp NULL, \`score\` float NULL, \`userId\` int NULL, \`bookId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`books\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`author\` varchar(255) NOT NULL, \`publishedYear\` int NULL, \`averageScore\` float NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`borrows\` ADD CONSTRAINT \`FK_334b88778ded92ea179e2b1bfce\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`borrows\` ADD CONSTRAINT \`FK_43e09073c8aa2ba20a669c465dc\` FOREIGN KEY (\`bookId\`) REFERENCES \`books\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`borrows\` DROP FOREIGN KEY \`FK_43e09073c8aa2ba20a669c465dc\``);
        await queryRunner.query(`ALTER TABLE \`borrows\` DROP FOREIGN KEY \`FK_334b88778ded92ea179e2b1bfce\``);
        await queryRunner.query(`DROP TABLE \`books\``);
        await queryRunner.query(`DROP TABLE \`borrows\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
