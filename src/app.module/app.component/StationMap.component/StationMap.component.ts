import { Component, ElementRef, ViewEncapsulation, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';

import * as L from "leaflet";
import { IndicatorValue } from '../../../models/IndicatorValue';
import { InfoCard } from '../../../models/InfoCard';
import { Station } from '../../../models/Station';

@Component({
    selector: 'station-map',
    templateUrl: './StationMap.component.html',
    styleUrls: ['./StationMap.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class StationMap { 

    private _map: L.Map;

    @Input() Value: InfoCard<Station>[];
    @Input() Selected: InfoCard<Station>;
    @Output() MarkerClick: EventEmitter<InfoCard<Station>> = new EventEmitter<InfoCard<Station>>();

    private _generateIconHtml(info : InfoCard<Station>) : string {
        let value = info.indicatorValue.Value + " " + info.indicator.Unit;
        return "<div class='leaflet-station-icon'><div class='leaflet-station-icon-value'>" + value + "</div><div class='leaflet-station-icon-point-container'><div class='leaflet-station-icon-point " + info.indicatorValue.Status + "'></div></div><div class='leaflet-station-icon-name'>" + info.name + "</div></div>"
    }

    private _generateActiveIconHtml(info: InfoCard<Station>) : string{
        let value = info.indicatorValue.Value + " " + info.indicator.Unit;
        let station = info.indicatorValue.Object as Station;
        return "<div class='leaflet-station-icon active'><div class='leaflet-station-icon-value'>" + value + "</div><div class='leaflet-station-icon-point-container icon-" + station.Type + "-reverse'><div class='leaflet-station-icon-point " + info.indicatorValue.Status + "'></div></div><div class='leaflet-station-icon-name'>" + info.name + "</div></div>"
    }

    private _generateIcon(info: InfoCard<Station>) : L.DivIcon {
        if(info === this.Selected)
            return L.divIcon({
                iconSize: new L.Point(200,124),
                html: this._generateActiveIconHtml(info)
            });
        else
            return L.divIcon({
                iconSize: new L.Point(200,70),
                html: this._generateIconHtml(info)
            });
    }

    private _initMap(){
        let mapDiv = this._elementRef.nativeElement.getElementsByClassName("leaflet-station-map")[0];
        this._map = L.map(mapDiv).setView([55.92566680908203, 65.5495994162747], 4);

        L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	        maxZoom: 18
        }).addTo(this._map);
    }

    private _cleanMap(){
        this._map.eachLayer(function (layer : L.Layer) {
            if(layer instanceof L.Marker)
                this._map.removeLayer(layer);
        }.bind(this));
    }

    private _initMarkers(){
        if(!this._map || !this.Value)
            return;
        this._cleanMap();

        this.Value.forEach((e) => {
            let station = e.indicatorValue.Object as Station;
            let marker = L.marker([station.XCord, station.YCord], {
                icon: this._generateIcon(e),
                zIndexOffset: e === this.Selected ? 1000 : 0
            }).addTo(this._map).on("click", function(){
                this.MarkerClick.emit(e);
            }.bind(this));
         
        });

        if(this.Selected){
            let station = this.Selected.indicatorValue.Object as Station;
            this._map.setView([station.XCord, station.YCord], 6);
        }
    }


    constructor(private _elementRef: ElementRef){
    }

    
    ngOnChanges(changes: SimpleChanges) {
        if(!this._map)
            this._initMap();
        this._initMarkers();
    }


}