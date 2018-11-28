import { Component, ElementRef } from '@angular/core';

import * as L from "leaflet";

@Component({
    selector: 'station-map',
    templateUrl: './StationMap.component.html',
    styleUrls: ['./StationMap.component.less'],
})
export class StationMap { 

    private _map: L.Map;

    private _generateMap(){
        let mapDiv = this._elementRef.nativeElement.getElementsByClassName("map")[0];
        console.log(this._elementRef);
        this._map = L.map(mapDiv).setView([55.75370, 37.6198], 13);

        L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        {
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3']
        }).addTo(this._map);
    }

    constructor(private _elementRef: ElementRef){
    }


    ngOnInit() {
        this._generateMap();
    }

}