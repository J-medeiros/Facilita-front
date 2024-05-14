import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DxDataGridModule, DxCheckBoxModule, DxSelectBoxModule } from 'devextreme-angular';
import { HotelService } from '../../Service/hotel.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-listar-hoteis',
  templateUrl: './listar-hoteis.component.html',
  styleUrls: ['./listar-hoteis.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    DxDataGridModule,

    DxCheckBoxModule,
    DxSelectBoxModule,
    HttpClientModule,
    FormsModule,
    RouterOutlet,
  ],
  providers: [HotelService]

})
export class ListarHoteisComponent implements OnInit {
  termoPesquisa: string = '';
  dados!: any[];
  filteredHotels!: any[];

  constructor(private service: HotelService, private router: Router) { }

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

  redirect(hotelId: number) {
    this.router.navigate(['/hotel', hotelId]);
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


  }
}
