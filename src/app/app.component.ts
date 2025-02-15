import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { ReportesComponent } from './shared/reportes/reportes.component';
import { BilleterasComponent } from './shared/billeteras/billeteras.component'; 
import { ConversionComponent } from './shared/conversion/conversion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardComponent, ReportesComponent,BilleterasComponent,ConversionComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'ProyectoDesarrolloWebP1';
}

