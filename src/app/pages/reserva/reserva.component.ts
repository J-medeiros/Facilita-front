import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { DxoDetailsModule } from 'devextreme-angular/ui/nested';
import { ReservaService } from '../../Service/reserva.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    DxDataGridModule,
    DxoDetailsModule,
    FormsModule,

  ],
  providers: [ReservaService]
})
export class ReservaComponent implements OnInit {
  quartoId!: number;
  infoQuarto!: string
  tipo!: string;
  andar!: string;

  nomeHospede: string = '';
  email: string = '';
  cpf: string = '';
  checkin: string = '';
  checkout: string = '';

  constructor(
    private route: ActivatedRoute,
    private reservaService: ReservaService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.quartoId = +id;
        this.loadQuartoInfo();
      } else {
        console.error('Quarto ID is null');
      }
    });

  }

  loadQuartoInfo() {
    this.reservaService.getQuartoById(this.quartoId).subscribe(
      (data: any) => {
        this.infoQuarto = data.data[0].info_quarto;
        this.tipo = data.data[0].tipo;
        this.andar = data.data[0].andar;

      },
      (error: any) => {
        console.error('Error loading quarto info', error);
      }
    );
  }

  onSubmit(): void {
    const formData = {
      id_quarto: this.quartoId,
      nome_hospede: this.nomeHospede,
      email: this.email,
      cpf: this.cpf,
      checkin: this.checkin,
      checkout: this.checkout
    };

    this.reservaService.reservarQuarto(formData).subscribe(
      (response: any) => {
        console.log('Reserva realizada com sucesso', response);
        Swal.fire({
          icon: 'success',
          title: 'Reserva realizada com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error: any) => {
        console.error('Error making reservation', error);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao realizar a reserva.',
          text: error.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }


}
