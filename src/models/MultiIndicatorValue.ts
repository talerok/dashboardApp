export class MultiIndicatorValue{
    constructor(
        readonly Plan: number[],
        readonly Prev: number[],
        readonly Values: number[],
        readonly Labels: string[]
    ){}
}