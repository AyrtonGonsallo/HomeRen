import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConceptsEtTravauxService {

  constructor(private http: HttpClient) { }

  addUserWithRole(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/add_utilisateur_with_role`, userData);
  }
  addParticulier(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/add_particulier`, userData);
  }
  upload_file(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/upload`, userData);
  }
  get_question(id: number): Observable<any> {
    const url = `${environment.apiUrl}/get_question/${id}`;
    return this.http.get<any>(url);
  }
  getPieces(): Observable<any> {
    const url = `${environment.apiUrl}/get_pieces`;
    return this.http.get<any>(url);
  }
  getRealisations(): Observable<any> {
    const url = `${environment.apiUrl}/get_realisations`;
    return this.http.get<any>(url);
  }
  getNbrPieces(total:number): Observable<any> {
    const url = `${environment.apiUrl}/get_nbr_pieces/${total}`;
    return this.http.get<any>(url);
  }
  get_questions_par_categorie(c_id:number): Observable<any> {
    const url = `${environment.apiUrl}/get_questions_par_categorie/${c_id}`;
    return this.http.get<any>(url);
  }
  get_questions_par_categories(): Observable<any> {
    const url = `${environment.apiUrl}/get_questions_par_categories/`;
    return this.http.get<any>(url);
  }
  getNbrRealisations(total:number): Observable<any> {
    const url = `${environment.apiUrl}/get_nbr_realisations/${total}`;
    return this.http.get<any>(url);
  }
  getRealisation(id:number): Observable<any> {
    const url = `${environment.apiUrl}/get_realisation/${id}`;
    return this.http.get<any>(url);
  }
  get_galerie(id: number): Observable<any> {
    const url = `${environment.apiUrl}/get_galerie/${id}`;
    return this.http.get<any>(url);
  }
  getRealisationsByPiece(pid:number): Observable<any> {
    const url = `${environment.apiUrl}/get_realisations_by_piece/${pid}`;
    return this.http.get<any>(url);
  }
  get_pieces_par_categories(): Observable<any> {
    const url = `${environment.apiUrl}/get_pieces_par_categories/`;
    return this.http.get<any>(url);
  }

  getAvis(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/get_all_avis`);
  }
  getPiece(id:number): Observable<any> {
    const url = `${environment.apiUrl}/get_piece/${id}`;
    return this.http.get<any>(url);
  }
  // Read all
  getFrontPages(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/get_pages`);
  }

  // Read one
  getFrontPageById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/get_page/${id}`);
  }

 // Read one
 getFrontPageByTitle(title: string): Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/get_page_by_title/${title}`);
}
// Méthode pour récupérer un travail par son ID avec les détails de la pièce associée
getTravauxByPieceId(pid: number): Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/get_travaux_by_piece/${pid}`);
}
// Read by PieceID
getEquipementsByPiece(pieceID: number): Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/get_equipements_by_piece/${pieceID}`);
}
// Read by Type
getEquipementsByType(type: string): Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/get_equipements_by_type/${type}`);
}
// Ajouter un nouveau modèle d'équipement
addDevisPiece(devis: any): Observable<any> {
  return this.http.post<any>(`${environment.apiUrl}/add_devis_piece`, devis);
}

getGammesByTravailAndType(travailID:number,type: string): Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/get_gammes_by_type_and_travailID/${travailID}/${type}`);
}
// Ajouter un nouveau modèle d'équipement
getAllDevisPiecebyUsernameAndIp(data: any): Observable<any> {
  return this.http.post<any>(`${environment.apiUrl}/get_devis_piece_by_username_and_ip`, data);
}
}
