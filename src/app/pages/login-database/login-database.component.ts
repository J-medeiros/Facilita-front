import { Component } from '@angular/core';
import { LoginService } from '../../Service/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DxFormModule, DxButtonModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-database',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    //DevExtreme
    DxFormModule,
    DxButtonModule,
  ],
  providers: [LoginService],
  templateUrl: './login-database.component.html',
  styleUrl: './login-database.component.scss',
})
export class LoginDatabaseComponent {
  credenciais = {}; // dados do formulario

  constructor(private serviceLoginApi: LoginService, private router: Router) { }

  login() {
    console.log(this.credenciais);
    this.serviceLoginApi.login(this.credenciais).subscribe(
      (response: any) => {
        if (response.success) {
          Swal.fire({
            icon: 'success',
            title: 'Login realizado com sucesso!',
            text: response.message,
            showConfirmButton: true
          }).then(() => {
            this.router.navigate(['/Listar']);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao fazer login',
            text: response.message,
            showConfirmButton: true
          });
        }
      },
      (error: any) => {
        console.log('Erro ao fazer login:', error);
        let errorMessage = 'Erro desconhecido';
        if (error.error instanceof ErrorEvent) {
          // Erro do lado do cliente
          errorMessage = `Erro: ${error.error.message}`;
        } else {
          // Erro do lado do servidor
          errorMessage = `Erro ${error.status}: ${error.message}`;
        }
        Swal.fire({
          icon: 'error',
          title: 'Erro ao fazer login',
          text: errorMessage,
          showConfirmButton: true
        });
      }
    );
  }
}