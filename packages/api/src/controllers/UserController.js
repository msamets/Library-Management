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
exports.UserController = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const GetUserDetailRequestDTO_1 = require("./../entities/DTOs/GetUserDetailRequestDTO");
const BorrowBookRequestDTO_1 = require("./../entities/DTOs/BorrowBookRequestDTO");
const ReturnBookRequestDTO_1 = require("./../entities/DTOs/ReturnBookRequestDTO");
class UserController {
    constructor(userService) {
        this.userService = userService;
        this.listAllUsers = this.listAllUsers.bind(this);
        this.getUserDetail = this.getUserDetail.bind(this);
        this.returnBook = this.returnBook.bind(this);
        this.borrowBook = this.borrowBook.bind(this);
    }
    listAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.listAllUsers();
                res.status(200).json(users);
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    }
    ;
    getUserDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = (0, class_transformer_1.plainToInstance)(GetUserDetailRequestDTO_1.GetUserDetailRequestDTO, { userId: Number(req.params.userId) });
                const errors = yield (0, class_validator_1.validate)(dto);
                if (errors.length > 0) {
                    const messages = errors.map((err) => Object.values(err.constraints || {}).join(', '));
                    res.status(400).json({ errors: messages });
                    return;
                }
                const detail = yield this.userService.getUserDetail(dto.userId);
                res.status(200).json(detail);
            }
            catch (err) {
                if (err.message === 'User not found') {
                    res.status(404).json({ error: err.message });
                    return;
                }
                res.status(500).json({ error: err.message });
            }
        });
    }
    ;
    returnBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = (0, class_transformer_1.plainToInstance)(ReturnBookRequestDTO_1.ReturnBookRequestDTO, {
                    userId: Number(req.params.userId),
                    bookId: Number(req.params.bookId),
                    score: req.body.score,
                });
                const errors = yield (0, class_validator_1.validate)(dto);
                if (errors.length > 0) {
                    const messages = errors.map((err) => Object.values(err.constraints || {}).join(', '));
                    res.status(400).json({ errors: messages });
                    return;
                }
                yield this.userService.returnBook(dto.userId, dto.bookId, dto.score);
                res.status(200).json({ message: 'Book returned successfully.' });
            }
            catch (err) {
                if (err.message.includes('not found')) {
                    res.status(404).json({ error: err.message });
                    return;
                }
                res.status(500).json({ error: err.message });
            }
        });
    }
    ;
    borrowBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = (0, class_transformer_1.plainToInstance)(BorrowBookRequestDTO_1.BorrowBookRequestDTO, {
                    userId: Number(req.params.userId),
                    bookId: Number(req.params.bookId),
                });
                const errors = yield (0, class_validator_1.validate)(dto);
                if (errors.length > 0) {
                    const messages = errors.map((err) => Object.values(err.constraints || {}).join(', '));
                    res.status(400).json({ errors: messages });
                    return;
                }
                yield this.userService.borrowBook(dto.bookId, dto.userId);
                res.status(201).json({ message: 'Book borrowed successfully.' });
            }
            catch (err) {
                if (err.message === 'Book is already borrowed' ||
                    err.message === 'User not found' ||
                    err.message === 'Book not found') {
                    res.status(400).json({ error: err.message });
                    return;
                }
                res.status(500).json({ error: err.message });
            }
        });
    }
    ;
}
exports.UserController = UserController;
