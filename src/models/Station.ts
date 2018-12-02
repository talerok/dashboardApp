import { Indicator } from "./Indicator";

export class BaseStationObject{
    constructor(
        readonly Id: string, // GUID
        readonly Name: string,
        readonly Indicators : Indicator[]
    ) {}
}

export class StationBlock extends BaseStationObject{
    constructor(
        Id: string,
        readonly StationId: string, 
        Name: string,
        Indicators : Indicator[]
    ){
        super(Id,Name,Indicators);
    }
}

export class Station extends BaseStationObject{
    constructor(
        Id: string, // GUID
        Name: string,
        readonly Type: string,
        Indicators: Indicator[],
        readonly XCord: number,
        readonly YCord: number,
        readonly Blocks: StationBlock[]
    ){
        super(Id,Name,Indicators);
    }
}

export class BlockCollection extends BaseStationObject{

    constructor(readonly Blocks: StationBlock[], readonly Indicators: Indicator[]) {
        super("null", "Группа блоков", Indicators);
    }

}