import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../utils/loader/loader.component';
import { TrusthtmlPipe } from '../pipe/trusthtml.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from "ngx-spinner";
import { NotifierModule } from 'angular-notifier';
import { Angular4PaystackModule } from 'angular4-paystack';

@NgModule({
  declarations: [LoaderComponent, TrusthtmlPipe],
  imports: [
    CommonModule,
    NgSelectModule,
    NgxSpinnerModule,
    NotifierModule.withConfig({}),
    Angular4PaystackModule.forRoot('pk_test_9a8895ede03716b9a0474fea6da11ec5bc1c7033'),
  ],
  exports: [LoaderComponent, TrusthtmlPipe, NgSelectModule, NgxSpinnerModule, NotifierModule, Angular4PaystackModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
