import { Chalk } from 'chalk';
export declare class Debugger {
    private readonly d;
    constructor(namespace: string);
    error(message: any, context?: string): void;
    debug(message: any, context?: string): void;
    warn(message: any, context?: string): void;
    printMessage(message: any, color: Chalk, context?: string): void;
}
