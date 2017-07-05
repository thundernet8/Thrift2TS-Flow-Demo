/**
 * Auto generated by Thrift2Ts.
 *
 * Wed Jul 05 2017 23:51:41 GMT+0800 (CST)
 */

import Request from "../RequestSample/request1";

export const INT32CONSTANT: number = 9853; 

export const MAPCONSTANT: {[key: string]: string} = {"hello": "world", "goodnight": "moon"}; 

export enum Operation {
    ADD = 1,
    SUBTRACT = 2,
    MULTIPLY = 3,
    DIVIDE = 4
}

export interface InvalidOperation {
    whatOp: number;
    why: string;
}

export interface Work {
    num1: number;
    num2: number;
    op: Operation;
    comment?: string;
}

export function ping(): Promise<string> {
    return Request<string>("Calculator.ping", {  })
}

export function add(num1: number, num2?: number): Promise<number> {
    return Request<number>("Calculator.add", { num1, num2 })
}

export function calculate(logid: number, w: Work): Promise<number> {
    return Request<number>("Calculator.calculate", { logid, w })
}

export function zip(): Promise<void> {
    return Request<void>("Calculator.zip", {  })
}


export default {
    ping,
    add,
    calculate,
    zip
}
