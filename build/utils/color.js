"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
const chalk_1 = __importDefault(require("chalk"));
class Color {
    static get purple() {
        return chalk_1.default.hex('#7059C1');
    }
    static get yellow() {
        return chalk_1.default.hex('#ffe600');
    }
    static get cyan() {
        return chalk_1.default.hex('#00ffff');
    }
    static get white() {
        return chalk_1.default.hex('#ffffff');
    }
    static get orange() {
        return chalk_1.default.hex('#f18b0e');
    }
    static get green() {
        return chalk_1.default.hex('#0ef12c');
    }
    static get darkGreen() {
        return chalk_1.default.hex('#1cb70b');
    }
    static get red() {
        return chalk_1.default.hex('#f10e0e');
    }
    static get log() {
        return this.green.bold;
    }
    static get debug() {
        return this.orange.bold;
    }
    static get error() {
        return this.red.bold;
    }
    static get warning() {
        return this.yellow.bold;
    }
    static httpMethod(method) {
        return this[method];
    }
    static get GET() {
        return this.purple.bold('GET 🔍');
    }
    static get PUT() {
        return this.yellow.bold('PUT 🛠');
    }
    static get POST() {
        return this.green.bold('POST 🧱');
    }
    static get DELETE() {
        return this.red.bold('DELETE ❌');
    }
}
exports.Color = Color;
