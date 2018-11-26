import { Indicator } from "./Indicator";
import { IndicatorValue } from "./IndicatorValue";

interface IValueState{
    (value: InfoCard) : string;
}

export class InfoCard{
    constructor(
        readonly name: string,
        readonly type: string,
        readonly indicator: Indicator,
        readonly indicatorValue: IndicatorValue<any>,
        ){}
}
