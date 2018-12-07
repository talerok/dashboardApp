import { Component, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { Indicator } from '../../../../../models/Indicator';
import { InfoCard } from '../../../../../models/InfoCard';
import { StationObjectIndicatorValues } from '../../../../../models/StationObjectIndicatorValues'

@Component({
    selector: 'indicator-cards-table',
    templateUrl: './IndicatorCards.component.html',
    styleUrls: ['./IndicatorCards.component.less'],
})
export class IndicatorCardsTable { 
    @Input() Data: StationObjectIndicatorValues;

    @Input() ActiveIndicator: string;
    @Output() CardClick: EventEmitter<InfoCard<Indicator>> = new EventEmitter<InfoCard<Indicator>>();

    private _cards: InfoCard<Indicator>[] = [];

    private _generateCards(soiv: StationObjectIndicatorValues) : InfoCard<Indicator>[]{
        return soiv.values.map((x) =>
            new InfoCard(x.Object.Name, "", x.Object, x)
        );
    }
    
    ngOnChanges(changes: SimpleChanges) {
        if(changes.Data)
            this._refreshCards();
    }

    private _cardClick(card: InfoCard<Indicator>){
        this.CardClick.emit(card);
    }

    private _refreshCards(){
        if(this.Data)
            this._cards = this._generateCards(this.Data);
    }
}