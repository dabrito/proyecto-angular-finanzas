import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http';

import { RecursosService } from './servicios/recursos.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HttpClientModule ],
  providers: [RecursosService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'ProyectoDesarrolloWebP1';
}

