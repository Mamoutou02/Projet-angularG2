import {Component, Input} from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-idee-projet',
  imports: [CommonModule, DatePipe],
  templateUrl: './detail-idee-projet.html',
  standalone: true,
  styleUrl: './detail-idee-projet.css'
})
export class DetailIdeeProjet {
  @Input() projet: any;

}
