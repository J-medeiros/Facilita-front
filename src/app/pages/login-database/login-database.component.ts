import { Component } from '@angular/core';
import { LoginService } from '../../Service/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DxFormModule, DxButtonModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';

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

  constructor(private serviceLoginApi: LoginService) {}

  login() {
    console.log(this.credenciais);
    this.serviceLoginApi.login(this.credenciais).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.log('Erro ao fazer login:', error);
      }
    );
  }
}
