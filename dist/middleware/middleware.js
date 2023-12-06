"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const app = (0, express_1.default)();
exports.app = app;
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express_1.default.json());
//# sourceMappingURL=middleware.js.map