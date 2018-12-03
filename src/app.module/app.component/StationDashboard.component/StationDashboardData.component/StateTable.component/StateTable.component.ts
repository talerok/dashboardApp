import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { StateTable, StateTableRow } from '../../../../../models/StateTable';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'state-table',
    templateUrl: './StateTable.component.html',
    styleUrls: ['./StateTable.component.less'],
})
export class StateTableComponent { 
    @Input() Value: StateTable;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    private _dataSource: MatTableDataSource<StateTableRow>

    private _convertNumber(value: number) : string{
        return value < 10 ? "0" + value : value.toString();
    }

    private _getTime(value : Date) : string{
        return this._convertNumber(value.getHours()) + ":" + this._convertNumber(value.getMinutes()); 
    }

    private _getDate(value: Date) : string{
        let day : string = this._convertNumber(value.getDate());
        let month : string = this._convertNumber(value.getMonth() + 1);
        return day + "." + month  + "." + value.getFullYear() ;
    }


    ngOnInit() {
        this.paginator._intl.itemsPerPageLabel = 'Показывать по';
        this.paginator._intl.lastPageLabel = 'Последняя страница';
        this.paginator._intl.firstPageLabel = 'Первая страница';
        this.paginator._intl.nextPageLabel = 'Следующая страница';
        this.paginator._intl.previousPageLabel = 'Предыдущая страница';
        this.paginator._intl.getRangeLabel = (page, size, length) => {
            let pageStart = size * page + 1;
            let pageEnd = size * (page + 1);
            return pageStart  + "-" + (pageEnd > length ? length : pageEnd) + " из " + length;
        };
      }

    ngOnChanges(changes: SimpleChanges) {
        if(!this.Value)
            return;
        this._dataSource = new MatTableDataSource(this.Value.Rows);
        this._dataSource.paginator = this.paginator;
    }

}