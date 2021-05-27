"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimestamp = void 0;
function getTimestamp() {
    const localeStringOptions = {
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        day: '2-digit',
        month: '2-digit',
    };
    return new Date(Date.now()).toLocaleString(undefined, localeStringOptions);
}
exports.getTimestamp = getTimestamp;
