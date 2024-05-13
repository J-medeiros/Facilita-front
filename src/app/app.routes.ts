import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { ListarHoteisComponent } from './pages/listar-hoteis/listar-hoteis.component';

export const routes: Routes = [
    { path: 'Listar', component: ListarHoteisComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    // providers: [ActivatedRoute]
})
export class AppRoutingModule { }