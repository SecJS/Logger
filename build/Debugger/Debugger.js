"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debugger = void 0;
const debug_1 = __importDefault(require("debug"));
const color_1 = require("../utils/color");
const getTimestamp_1 = require("../utils/getTimestamp");
class Debugger {
    constructor(namespace) {
        this.d = debug_1.default.debug(namespace);
    }
    error(message, context) {
        this.printMessage(message, color_1.Color.red, context);
    }
    debug(message, context) {
        this.printMessage(message, color_1.Color.purple, context);
    }
    warn(message, context) {
        this.printMessage(message, color_1.Color.orange, context);
    }
    printMessage(message, color, context) {
        let output = color(message);
        if (typeof message === 'object') {
            output = `${color.bold('Object:')} ${color(JSON.stringify(message, null, 2))}\n`;
        }
        const pid = color(`[SecJS Debugger] ${process.pid}`);
        const messageCtx = context ? color_1.Color.yellow(`[${context}] `) : '';
        const timestamp = color_1.Color.white(getTimestamp_1.getTimestamp());
        this.d(`${pid} - ${timestamp} ${messageCtx}${output}\n`);
    }
}
exports.Debugger = Debugger;
