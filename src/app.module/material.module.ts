import {NgModule} from '@angular/core';
import {
    MatDatepickerModule,
    MatNativeDateModule,
    DateAdapter
} from '@angular/material';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NativeDateAdapter} from '@angular/material';
import {Injectable} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
@Injectable()
export class MyDateAdapter extends NativeDateAdapter {

  getFirstDayOfWeek(): number {
    return 1;
  }

}

@NgModule({
  exports: [
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    {provide: DateAdapter, useClass: MyDateAdapter}
  ],
})
export class MaterialModule {}
