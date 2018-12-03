import { IndicatorValue } from "./IndicatorValue";
import { Indicator } from "./Indicator";

export class StationObjectIndicatorValues{
    constructor(
        readonly values: IndicatorValue<Indicator>[]
    ){}
}