import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-listar-hoteis',
  templateUrl: './listar-hoteis.component.html',
  styleUrls: ['./listar-hoteis.component.css'],
  standalone: true,
  imports: [CommonModule],

})
export class ListarHoteisComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
