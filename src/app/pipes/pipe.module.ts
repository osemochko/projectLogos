import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from './currency.pipe';
import { WeightPipe } from './weight.pipe';

@NgModule({
  declarations: [
    CurrencyPipe,
    WeightPipe
  ],
  exports: [
    CurrencyPipe,
    WeightPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipeModule { }
