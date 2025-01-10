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
exports.BookController = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const GetBookDetailRequestDTO_1 = require("./../entities/DTOs/GetBookDetailRequestDTO");
const BookDetailWithBorrowsResponseDTO_1 = require("./../entities/DTOs/BookDetailWithBorrowsResponseDTO");
class BookController {
    constructor(bookService) {
        this.bookService = bookService;
        this.listAllBooks = this.listAllBooks.bind(this);
        this.getBookDetail = this.getBookDetail.bind(this);
        this.getBookDetailWithBorrows = this.getBookDetailWithBorrows.bind(this);
    }
    listAllBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield this.bookService.listAllBooks();
                res.status(200).json(books);
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    }
    ;
    getBookDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = (0, class_transformer_1.plainToInstance)(GetBookDetailRequestDTO_1.GetBookDetailRequestDTO, { bookId: Number(req.params.bookId) });
                const errors = yield (0, class_validator_1.validate)(dto);
                if (errors.length > 0) {
                    const messages = errors.map((err) => Object.values(err.constraints || {}).join(', '));
                    res.status(400).json({ errors: messages });
                    return;
                }
                const detail = yield this.bookService.getBookDetail(dto.bookId);
                res.status(200).json(detail);
            }
            catch (err) {
                if (err.message === 'Book not found') {
                    res.status(404).json({ error: err.message });
                    return;
                }
                res.status(500).json({ error: err.message });
            }
        });
    }
    ;
    getBookDetailWithBorrows(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = (0, class_transformer_1.plainToInstance)(GetBookDetailRequestDTO_1.GetBookDetailRequestDTO, { bookId: Number(req.params.bookId) });
                const errors = yield (0, class_validator_1.validate)(dto);
                if (errors.length > 0) {
                    const messages = errors.map((err) => Object.values(err.constraints || {}).join(', '));
                    res.status(400).json({ errors: messages });
                    return;
                }
                const detailWithBorrows = yield this.bookService.getBookDetailWithBorrows(dto.bookId);
                const responseDTO = (0, class_transformer_1.plainToInstance)(BookDetailWithBorrowsResponseDTO_1.BookDetailWithBorrowsResponseDTO, detailWithBorrows);
                const validationErrors = yield (0, class_validator_1.validate)(responseDTO);
                if (validationErrors.length > 0) {
                    const messages = validationErrors.map((err) => Object.values(err.constraints || {}).join(', '));
                    res.status(500).json({ errors: messages });
                    return;
                }
                res.status(200).json(responseDTO);
            }
            catch (err) {
                if (err.message === 'Book not found') {
                    res.status(404).json({ error: err.message });
                    return;
                }
                res.status(500).json({ error: err.message });
            }
        });
    }
    ;
}
exports.BookController = BookController;
