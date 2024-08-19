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

  addFormulaire(nomtache: string,idtache: number, formulaire: any) {
    this.clearFormulaire(nomtache)
    const formulaires = this.formulairesSubject.value;
    formulaires.push({ nomtache,idtache, formulaire });
    this.formulairesSubject.next(formulaires);
  }

  getFormulaires() {
    return this.formulairesSubject.value;
  }

  clearFormulaires() {
    this.formulairesSubject.next([]);
  }
  clearDEGFormulaires() {
    const filteredFormulaires = this.formulairesSubject.value.filter(formulaire => {
      return !(
        formulaire.nomtache.startsWith('dimensions-') ||
        formulaire.nomtache.startsWith('etat-surfaces-') ||
        formulaire.nomtache.startsWith('gammes-produits-')
      );
    });  
    this.formulairesSubject.next(filteredFormulaires);
  }

   // Method to retrieve a form by its name
   getFormulaireByName(nomtache: string): any {
    return this.formulairesSubject.value.find(formulaire => formulaire.nomtache === nomtache);
  }

  // Method to get the length of forms by their name
  getFormulaireLengthByName(nomtache: string): number {
    return this.formulairesSubject.value.filter(formulaire => formulaire.nomtache === nomtache).length;
  }
  groupform(nomtache: string,idtache: number,nom_dimensions:string,nom_etat:string,nom_gamme:string){
    const dimensionForm = this.getFormulaireByName(nom_dimensions);
    const etatForm = this.getFormulaireByName(nom_etat);
    const gammeForm = this.getFormulaireByName(nom_gamme);

    if (dimensionForm && etatForm && gammeForm) {
      const groupedForm = {
        nomtache,
        idtache,
        [nom_dimensions]: dimensionForm.formulaire,
        [nom_etat]: etatForm.formulaire,
        [nom_gamme]: gammeForm.formulaire
      };

      this.addFormulaire(nomtache, idtache, groupedForm);
  }
}
clearFormulaire(nomtache: string) {
  const formulaires = this.formulairesSubject.value.filter(formulaire => formulaire.nomtache !== nomtache);
  this.formulairesSubject.next(formulaires);
}
}