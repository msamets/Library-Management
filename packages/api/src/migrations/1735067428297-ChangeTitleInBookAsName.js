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
exports.ChangeTitleInBookAsName1735067428297 = void 0;
class ChangeTitleInBookAsName1735067428297 {
    constructor() {
        this.name = 'ChangeTitleInBookAsName1735067428297';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`books\` CHANGE \`title\` \`name\` varchar(255) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`name\``);
            yield queryRunner.query(`ALTER TABLE \`books\` ADD \`name\` varchar(255) NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`name\``);
            yield queryRunner.query(`ALTER TABLE \`books\` ADD \`name\` varchar(255) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`books\` CHANGE \`name\` \`title\` varchar(255) NOT NULL`);
        });
    }
}
exports.ChangeTitleInBookAsName1735067428297 = ChangeTitleInBookAsName1735067428297;
