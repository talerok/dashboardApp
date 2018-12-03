import { BaseStationObject } from "./Station";

export class StateTableRow{
    constructor(
        readonly Date: Date,
        readonly Object: BaseStationObject,
        readonly Comment: string,
        readonly State: boolean
        ){}
}

export class StateTable{
    constructor(
        readonly Rows: StateTableRow[]
    ) {}
}