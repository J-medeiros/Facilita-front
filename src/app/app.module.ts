import { AppRoutingModule } from './app.routes';
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { DxDataGridModule } from 'devextreme-angular';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        RouterOutlet,
        HttpClientModule,


        //Aplicação


    ],
    exports: [],
    bootstrap: []
})
export class AppModule {

}