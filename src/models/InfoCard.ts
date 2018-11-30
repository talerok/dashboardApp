import { Indicator } from "./Indicator";
import { IndicatorValue } from "./IndicatorValue";

export class InfoCard<T>{

    public Active: boolean = false;

    constructor(
        readonly name: string,
        readonly type: string,
        readonly indicator: Indicator,
        readonly indicatorValue: IndicatorValue<T>,
        ){}
}
