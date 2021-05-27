"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const color_1 = require("../utils/color");
const getTimestamp_1 = require("../utils/getTimestamp");
function Log(message, context) {
    let output = color_1.Color.green(message);
    if (typeof message === 'object') {
        output = `${color_1.Color.log('Object:')} ${color_1.Color.green(JSON.stringify(message, null, 2))}\n`;
    }
    const timestamp = color_1.Color.white(getTimestamp_1.getTimestamp());
    const pid = color_1.Color.green(`[SecJS] ${process.pid}`);
    const messageCtx = context ? color_1.Color.yellow(`[${context}] `) : '';
    process.stdout.write(`${pid} - ${timestamp} ${messageCtx}${output}\n`);
}
exports.Log = Log;
