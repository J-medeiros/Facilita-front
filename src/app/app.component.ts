import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  DxCheckBoxModule,
  DxDataGridModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { HotelService } from './Service/hotel.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,

    DxDataGridModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [HotelService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  termoPesquisa: string = '';
  dados!: any[];
  filteredHotels!: any[];

  constructor(private service: HotelService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.service
      .getDataSource()
      .load()
      .then((result: any) => {
        this.dados = result.data;
        this.filtrarHotels(); // Filtra os hotéis após carregar os dados
      })
      .catch((error) => {
        console.error('Erro ao carregar os dados:', error);
      });
  }

  redirect(event: any) {
    console.log('oi', event);
  }

  filtrarHotels(): void {
    if (!this.dados || !this.termoPesquisa.trim()) {
      this.filteredHotels = this.dados;
      return;
    }

    const termo = this.termoPesquisa.toLowerCase().trim();
    this.filteredHotels = this.dados.filter(
      (hotel) =>
        hotel.nome.toLowerCase().includes(termo) ||
        hotel.cidade.toLowerCase().includes(termo) ||
        hotel.informacao_hotel.toLowerCase().includes(termo)
    );

    console.log('Hotéis filtrados:', this.filteredHotels); // Verifica os hotéis filtrados
  }
}
