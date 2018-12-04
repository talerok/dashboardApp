import { Component, Input, ElementRef, SimpleChanges } from '@angular/core';
import { CustomSelectOption } from '../../../models/CustomSelectOption'

import { Chart, ChartData } from "chart.js"
import { MultiIndicatorValue } from '../../../models/MultiIndicatorValue';

@Component({
    selector: 'indicator-chart',
    templateUrl: './IndicatorChart.component.html',
    styleUrls: ['./IndicatorChart.component.less'],
})

export class IndicatorChart { 
    @Input() Value: MultiIndicatorValue;

    private _chart: Chart;

    constructor(private _elementRef : ElementRef){

    }

    private _generateData() : ChartData{
        return {
            labels: this.Value.Labels,
            datasets: [{
                label: "План",
                backgroundColor: "#94a8d1",
                data: this.Value.Plan,
                hidden: true
            }, {
                label: "Сравнение с предыдущим периодом",
                backgroundColor: "#486bb1",
                data: this.Value.Prev,
                hidden: true
            }, {
                label: "Факт",
                backgroundColor: "#283f6e",
                data: this.Value.Values
            }]
        };
    }

    private _initChart(){
        let ctx = this._elementRef.nativeElement.getElementsByTagName("canvas")[0].getContext("2d"); 

        let options = {
            barValueSpacing: 20,
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                    }
                }]
            }
        }

        this._chart = new Chart(ctx, {
            type: 'bar',
            data: this._generateData(),
            options: options
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if(!this._chart)
            this._initChart();
        else{
            this._chart.data = this._generateData();
            this._chart.update();
        }
    }

}