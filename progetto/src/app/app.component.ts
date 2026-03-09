import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Prenotazioni } from '../models/prenotazioni.models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListaPrenotazioniComponent } from './lista-prenotazioni/lista-prenotazioni.component';
import { HtmlParser } from '@angular/compiler';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListaPrenotazioniComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'progetto';
  vettPrenotazioni: Prenotazioni[] = []

  loading!: boolean
  o_vettPrenotazioni!: Observable<Prenotazioni[]>
  http!: HttpClient

  o!: Observable<Object>
  data!: Object
  datiPost : Object = JSON.stringify({})

  constructor(http : HttpClient) {this.http = http}

  salva(nome : HTMLInputElement, cognome : HTMLInputElement, indirizzo : HTMLInputElement, telefono : HTMLInputElement, email : HTMLInputElement, data : HTMLInputElement, ora : HTMLInputElement)
  {
    this.loading = true
    this.datiPost = JSON.stringify({
      nome: nome.value,
      cognome: cognome.value,
      indirizzo: indirizzo.value,
      telefono: telefono.value,
      email: email.value,
      data: data.value,
      ora: ora.value
    })
    this.o = this.http.post("https://my-json-server.typicode.com/malizia-g/verificaPrenotazioni/prenotazioni", this.datiPost)
    this.o.subscribe(this.postData)
    this.vettPrenotazioni.push(new Prenotazioni(nome.value, cognome.value, indirizzo.value, telefono.value, email.value, data.value, ora.value))
    console.log(this.vettPrenotazioni)
  }
  postData = (d : object) =>
  {
    this.data = d
    this.loading = false 
    console.log(this.data)
  }

  makeGet(){
    this.loading = true
    this.o_vettPrenotazioni = this.http.get<Prenotazioni[]>("https://my-json-server.typicode.com/malizia-g/verificaPrenotazioni/prenotazioni")
    this.o_vettPrenotazioni.subscribe(this.getData)
  }

  getData = (dati: Prenotazioni[]) =>
  {
    this.vettPrenotazioni = dati
    this.loading = false
  }

  ngOnInit() {
    this.makeGet()
  }
}
