export declare class Logger {
    private readonly context;
    constructor(context: string);
    private static lastTimestamp?;
    error(message: any, trace?: any, context?: string, isTimeDiffEnabled?: boolean): void;
    log(message: any, context?: string, isTimeDiffEnabled?: boolean): void;
    warn(message: any, context?: string, isTimeDiffEnabled?: boolean): void;
    private static getTimestampDiff;
    private static printMessage;
    private static printStackTrace;
}
