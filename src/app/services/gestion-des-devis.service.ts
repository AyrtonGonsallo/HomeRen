import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GestionDesDevisService {

  private apiUrl = 'https://api.ipify.org?format=json';

  constructor(private http: HttpClient) { }

  getIp(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  private formulairesSubject = new BehaviorSubject<any[]>([]);
  formulaires$ = this.formulairesSubject.asObservable();

  addFormulaire(nom: string, formulaire: any) {
    const formulaires = this.formulairesSubject.value;
    formulaires.push({ nom, formulaire });
    this.formulairesSubject.next(formulaires);
  }

  getFormulaires() {
    return this.formulairesSubject.value;
  }

  clearFormulaires() {
    this.formulairesSubject.next([]);
  }
}
