import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { DxoDetailsModule } from 'devextreme-angular/ui/nested';
import { ReservaService } from '../../Service/reserva.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
  standalone: true,
  imports:
    [
      CommonModule,
      HttpClientModule,
      DxDataGridModule,
      DxoDetailsModule

    ],
  providers: [ReservaService]
})
export class ReservaComponent implements OnInit {
  shippersData: any;
  customersData: any;
  dataSource: any;

  constructor(private service: ReservaService) {
    this.dataSource = service.getDataSource();
  }

  ngOnInit() {
  }

}
