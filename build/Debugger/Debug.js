"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debug = void 0;
const debug_1 = require("debug");
const color_1 = require("../utils/color");
const getTimestamp_1 = require("../utils/getTimestamp");
function Debug(message, namespace = 'api:main', context) {
    let output = color_1.Color.purple(message);
    if (typeof message === 'object') {
        output = `${color_1.Color.purple.bold('Object:')} ${color_1.Color.purple(JSON.stringify(message, null, 2))}\n`;
    }
    const timestamp = color_1.Color.white(getTimestamp_1.getTimestamp());
    const pid = color_1.Color.purple(`[SecJS Debugger] ${process.pid}`);
    const messageCtx = context ? color_1.Color.yellow(`[${context}] `) : '';
    debug_1.debug(namespace)(`${pid} - ${timestamp} ${messageCtx}${output}\n`);
}
exports.Debug = Debug;
