import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importar FormsModu

import { RecursosService } from './servicios/recursos.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HttpClientModule, FormsModule ],
  providers: [RecursosService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'ProyectoDesarrolloWebP1';
}

