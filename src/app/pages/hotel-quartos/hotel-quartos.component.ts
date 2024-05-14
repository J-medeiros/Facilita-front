import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReservaService } from './../../Service/reserva.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-hotel-quartos',
  templateUrl: './hotel-quartos.component.html',
  styleUrls: ['./hotel-quartos.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    DxDataGridModule,
  ],
  providers: [ReservaService]
})
export class HotelQuartosComponent implements OnInit {
  hotelId!: number;
  dataSource!: DataSource;

  constructor(
    private route: ActivatedRoute,
    private service: ReservaService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.hotelId = +id;
        this.loadData();
      } else {
        console.error('Hotel ID is null');
      }
    });
  }

  loadData(): void {
    this.service.getReservationsByHotelId(this.hotelId).subscribe(
      (data: any) => {
        this.dataSource = new DataSource({
          store: {
            type: 'array',
            data: data.data, // O tipo de retorno da API parece ser um objeto com a propriedade 'data'
            key: 'id'
          }
        });
        console.log('Reservations loaded:', data);
      },
      (error: any) => {
        console.error('Error loading reservations', error);
      }
    );
  }
}
