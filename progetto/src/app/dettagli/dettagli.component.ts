import { Component, Input } from '@angular/core';
import { Prenotazioni } from '../../models/prenotazioni.models';

@Component({
  selector: 'app-dettagli',
  imports: [],
  templateUrl: './dettagli.component.html',
  styleUrl: './dettagli.component.css'
})
export class DettagliComponent {
@Input() prenotazione! : Prenotazioni;
}
