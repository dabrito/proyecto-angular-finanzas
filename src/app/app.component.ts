import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, RouterLink } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { ReportesComponent } from './shared/reportes/reportes.component';
import { BilleterasComponent } from './shared/billeteras/billeteras.component'; 
import { ConversionComponent } from './shared/conversion/conversion.component';
import { BienvenidoComponent } from './shared/bienvenido/bienvenido.component';
import { RecursosService } from './servicios/recursos.service';
import { Foto } from './interfaz/foto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, DashboardComponent, ReportesComponent,BilleterasComponent,ConversionComponent, BienvenidoComponent],
  providers: [RecursosService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'ProyectoDesarrolloWebP1';
}

