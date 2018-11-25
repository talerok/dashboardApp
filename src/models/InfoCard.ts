import { Indicator } from "./Indicator";

interface IValueState{
    (value: InfoCard) : string;
}

export class InfoCard{
    constructor(
        readonly name: string,
        readonly type: string,
        readonly indicator: Indicator,
        readonly value: number,
        readonly planValue: number,
        readonly prevValue: number,
        readonly valueStateFunc: IValueState
        ){}
}
