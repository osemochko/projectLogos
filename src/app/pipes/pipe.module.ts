import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CurrencyPipe} from './currency.pipe';
import {YearPipe} from './year.pipe';



@NgModule({
  declarations: [
    CurrencyPipe,
    YearPipe,
  ],
  exports: [
    CurrencyPipe,
    YearPipe,
  ],
  imports: [
    CommonModule
  ]
})
export class PipeModule { }
