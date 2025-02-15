//import { Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { ReportesComponent } from './shared/reportes/reportes.component';
import { BilleterasComponent } from './shared/billeteras/billeteras.component';
import { ConversionComponent } from './shared/conversion/conversion.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'billeteras', component: BilleterasComponent },
  { path: 'conversion', component: ConversionComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' } // Redirección por defecto
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
