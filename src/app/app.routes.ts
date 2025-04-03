import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { ReportesComponent } from './shared/reportes/reportes.component';
import { BilleterasComponent } from './shared/billeteras/billeteras.component';
import { ConversionComponent } from './shared/conversion/conversion.component';
import { BienvenidoComponent } from './shared/bienvenido/bienvenido.component';
import { MetasComponent } from './shared/metas/metas.component';


export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'billeteras', component: BilleterasComponent },
  { path: 'conversion', component: ConversionComponent },
  { path: 'bienvenido', component: BienvenidoComponent },
  { path: 'metas', component: MetasComponent },
  { path: '', redirectTo: '/bienvenido', pathMatch: 'full' }
];
