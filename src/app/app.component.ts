import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { DxCheckBoxModule, DxDataGridModule, DxSelectBoxModule } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { HotelService } from './Service/hotel.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadResult } from 'devextreme/common/data/custom-store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports:
    [
      CommonModule,
      RouterOutlet,

      DxDataGridModule,
      DxCheckBoxModule,
      DxSelectBoxModule,
      HttpClientModule
    ],
  providers: [HotelService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Hoteis';
  dataSource!: CustomStore;
  dados: any[] = [];

  constructor(private service: HotelService) {
    this.dataSource = service.getDataSource();

  }

  ngOnInit(): void {
    this.dataSource.load().then((result: any) => {
      this.dados = result.data;
      console.log('Dados do dataSource:', this.dados);
      // Agora você pode manipular os dados como desejar
    }).catch((error) => {
      console.error('Erro ao carregar os dados:', error);
    });
  }
}