"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const color_1 = require("../utils/color");
const getTimestamp_1 = require("../utils/getTimestamp");
class Logger {
    constructor(context) {
        this.context = context;
    }
    error(message, trace, context, isTimeDiffEnabled = true) {
        Logger.printMessage(message, color_1.Color.red, context || this.context, 'stderr', isTimeDiffEnabled);
        Logger.printStackTrace(trace);
    }
    log(message, context, isTimeDiffEnabled = true) {
        Logger.printMessage(message, color_1.Color.green, context || this.context, 'stdout', isTimeDiffEnabled);
    }
    warn(message, context, isTimeDiffEnabled = true) {
        Logger.printMessage(message, color_1.Color.orange, context || this.context, 'stdout', isTimeDiffEnabled);
    }
    static getTimestampDiff(isTimeDiffEnabled) {
        let result = '';
        if (Logger.lastTimestamp && isTimeDiffEnabled) {
            result = color_1.Color.yellow(` +${Date.now() - Logger.lastTimestamp}ms`);
        }
        Logger.lastTimestamp = Date.now();
        return result;
    }
    static printMessage(message, color, context, writeStreamType = 'stdout', isTimeDiffEnabled) {
        let output = color(message);
        if (typeof message === 'object') {
            output = `${color.bold('Object:')} ${color(JSON.stringify(message, null, 2))}\n`;
        }
        const pid = color(`[SecJS] ${process.pid}`);
        const timestamp = color_1.Color.white(getTimestamp_1.getTimestamp());
        const messageCtx = color_1.Color.yellow(`[${context}] `);
        const timestampDiff = Logger.getTimestampDiff(isTimeDiffEnabled);
        process[writeStreamType].write(`${pid} - ${timestamp} ${messageCtx}${output}${timestampDiff}\n`);
    }
    static printStackTrace(trace) {
        if (!trace) {
            return;
        }
        process.stderr.write(`${trace}\n`);
    }
}
exports.Logger = Logger;
