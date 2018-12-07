import { Indicator } from "./Indicator";
import { IndicatorValue } from "./IndicatorValue";

export class InfoCard<T>{
    constructor(
        readonly name: string,
        readonly type: string,
        readonly indicator: Indicator,
        readonly indicatorValue: IndicatorValue<T>,
        ){}
}
