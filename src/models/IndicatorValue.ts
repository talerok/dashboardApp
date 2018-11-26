import { Status } from './Status'

export class IndicatorValue<T>{
    constructor(
        readonly Plan: number,
        readonly Prev: number,
        readonly Value: number,
        readonly Status: Status,
        readonly Object: T
    ){}
}