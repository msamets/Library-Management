"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEntitiesInitialMigration1735045561566 = void 0;
class CreateEntitiesInitialMigration1735045561566 {
    constructor() {
        this.name = 'CreateEntitiesInitialMigration1735045561566';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('CUSTOMER', 'LIBRARY_MANAGER') NOT NULL DEFAULT 'CUSTOMER', UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`borrows\` (\`id\` int NOT NULL AUTO_INCREMENT, \`borrowedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`returnedAt\` timestamp NULL, \`score\` float NULL, \`userId\` int NULL, \`bookId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`books\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`author\` varchar(255) NOT NULL, \`publishedYear\` int NULL, \`averageScore\` float NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`ALTER TABLE \`borrows\` ADD CONSTRAINT \`FK_334b88778ded92ea179e2b1bfce\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`borrows\` ADD CONSTRAINT \`FK_43e09073c8aa2ba20a669c465dc\` FOREIGN KEY (\`bookId\`) REFERENCES \`books\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`borrows\` DROP FOREIGN KEY \`FK_43e09073c8aa2ba20a669c465dc\``);
            yield queryRunner.query(`ALTER TABLE \`borrows\` DROP FOREIGN KEY \`FK_334b88778ded92ea179e2b1bfce\``);
            yield queryRunner.query(`DROP TABLE \`books\``);
            yield queryRunner.query(`DROP TABLE \`borrows\``);
            yield queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
            yield queryRunner.query(`DROP TABLE \`users\``);
        });
    }
}
exports.CreateEntitiesInitialMigration1735045561566 = CreateEntitiesInitialMigration1735045561566;
