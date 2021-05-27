import { Chalk } from 'chalk';
declare type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';
export declare class Color {
    static get purple(): Chalk;
    static get yellow(): Chalk;
    static get cyan(): Chalk;
    static get white(): Chalk;
    static get orange(): Chalk;
    static get green(): Chalk;
    static get darkGreen(): Chalk;
    static get red(): Chalk;
    static get log(): any;
    static get debug(): any;
    static get error(): any;
    static get warning(): any;
    static httpMethod(method: Methods): any;
    static get GET(): any;
    static get PUT(): any;
    static get POST(): any;
    static get DELETE(): any;
}
export {};
