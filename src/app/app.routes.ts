import { Routes } from '@angular/router';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { ReportesComponent } from './shared/reportes/reportes.component';
import { BilleterasComponent } from './shared/billeteras/billeteras.component';
import { ConversionComponent } from './shared/conversion/conversion.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'billeteras', component: BilleterasComponent },
  { path: 'conversion', component: ConversionComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
