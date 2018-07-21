import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import * as $ from 'jquery';
// import {ToastrModule} from 'ngx-toastr';
import {BrowserModule} from '@angular/platform-browser';
import { MainComponent } from './main/main.component';
import { FieldComponent } from './field/field.component';
import {Web3NativeService} from "./web3/web3.native.service";

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        FieldComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NgbModule.forRoot(),
        // ToastrModule.forRoot(),
    ],
    providers: [
      Web3NativeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
