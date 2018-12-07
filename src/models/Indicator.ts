export class IndicatorInfo{
    constructor(
        readonly Id: string,
        readonly ParentId: string,
    ) {}
}

export class Indicator extends IndicatorInfo {
    constructor(
        id: string,
        parentId: string,
        readonly Name: string,
        readonly Unit: string,
        readonly Type: string
    ) {
        super(id,parentId);
    }
}