import { Unit } from "./unit";

interface IValueState{
    (value: InfoCard) : string;
}

export class InfoCard{
    constructor(
        readonly name: string,
        readonly type: string,
        readonly unit: Unit,
        readonly value: number,
        readonly planValue: number,
        readonly prevValue: number,
        readonly valueStateFunc: IValueState
        ){}
}
