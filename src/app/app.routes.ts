import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { ListarHoteisComponent } from './pages/listar-hoteis/listar-hoteis.component';
import { HotelQuartosComponent } from './pages/hotel-quartos/hotel-quartos.component';
import { LoginDatabaseComponent } from './pages/login-database/login-database.component';

export const routes: Routes = [
    { path: '', component: LoginDatabaseComponent },
    { path: 'Listar', component: ListarHoteisComponent },
    { path: 'Reserva', component: ReservaComponent },
    { path: 'hotel/:id', component: HotelQuartosComponent }

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    // providers: [ActivatedRoute]
})
export class AppRoutingModule { }
