import {NgModule} from '@angular/core';
import {
    MatDatepickerModule,
    MatNativeDateModule,
    DateAdapter
} from '@angular/material';

import {NativeDateAdapter} from '@angular/material';
import {Injectable} from '@angular/core';

@Injectable()
export class MyDateAdapter extends NativeDateAdapter {

  getFirstDayOfWeek(): number {
    return 1;
  }

}

@NgModule({
  exports: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {provide: DateAdapter, useClass: MyDateAdapter}
  ],
})
export class MaterialModule {}
