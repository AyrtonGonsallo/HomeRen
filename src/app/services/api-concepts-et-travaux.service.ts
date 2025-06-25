import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConceptsEtTravauxService {

  constructor(private http: HttpClient) { }

  addUserWithRole(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/add_utilisateur_with_role`, userData);
  }
  restaurepassword(email:string): Observable<any> {
    const url = `${environment.apiUrl}/restore_user_password/${email}`;
    return this.http.get<any>(url);
  }  loginFrontUtilisateur(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/login_user`, userData);
  }
  addFrontUtilisateur(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/add_front_utilisateur`, userData);
  }
  addFrontUtilisateurWithData(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/add_front_utilisateur_with_datas`, userData);
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

getValidatedTravauxByPieceId(pid: number): Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/get_validated_travaux_by_piece/${pid}`);
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
getGammesByTravailAndTypeOrdered(travailID:number,type: string): Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/get_ordered_gammes_by_type_and_travailID/${travailID}/${type}`);
}
getGammeByID(id:number): Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/get_gamme/${id}`);
}
// Ajouter un nouveau modèle d'équipement
getAllDevisPiecebyUsernameAndIp(data: any): Observable<any> {
  return this.http.post<any>(`${environment.apiUrl}/get_devis_piece_by_username_and_ip`, data);
}
getAllPayedDevisPiecebyUsernameAndIp(data: any): Observable<any> {
  return this.http.post<any>(`${environment.apiUrl}/get_no_payed_devis_piece`, data);
}

createCheckoutSession(data: any): Observable<any> {
  return this.http.post<any>(`${environment.apiUrl}/create-checkout-session`, data);
}

updatePayedDevis(data: any): Observable<any> {
  return this.http.post<any>(`${environment.apiUrl}/update-payed-devis`, data);
}

updateVisitedDevis(data: any): Observable<any> {
  return this.http.post<any>(`${environment.apiUrl}/update-visited-devis`, data);
}

// Méthode asynchrone pour updatePayedDevis
async updatePayedDevisAsync(data: any): Promise<any> {
  return lastValueFrom(this.updatePayedDevis(data));
}

// Méthode asynchrone pour updateVisitedDevis
async updateVisitedDevisAsync(data: any): Promise<any> {
  return lastValueFrom(this.updateVisitedDevis(data));
}


getAllNoPayedProjectPiecebyUser(deviceid:string,userid:number): Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/get_no_payed_project_by_user/${userid}/${deviceid}`);
}
getAllProjectToPayAcomptbyUser(deviceid:string,userid:number): Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/get_all_project_to_pay_acompt_by_user/${userid}/${deviceid}`);
}
getAllProjectToPayVisitbyUser(deviceid:string,userid:number): Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/get_all_projects_to_pay_visit_by_user/${userid}/${deviceid}`);
}
getAllNoVisitedProjectPiecebyUser(deviceid:string,userid:number): Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/get_one_no_visited_project_by_user/${deviceid}/${userid}`);
}
getAllCurrentDevisPiecebyDeviceID(deviceid:string,userid:number): Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/get_current_project_piece_by_user/${deviceid}/${userid}`);
}
getAllPayedDevisPiecebyDeviceID(deviceid:string): Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/get_no_payed_project_piece_by_device_id/${deviceid}`);
}
getCurrentsProjetsByUserId(userId: number): Observable<any> {
  const url = `${environment.apiUrl}/get_current_user_projects/${userId}`;
  return this.http.get<any>(url);
}
getEndedProjetsByUserId(userId: number): Observable<any> {
  const url = `${environment.apiUrl}/get_ended_user_projects/${userId}`;
  return this.http.get<any>(url);
}
getVisitByUserId(userId: number): Observable<any> {
  const url = `${environment.apiUrl}/get_visits_by_user/${userId}`;
  return this.http.get<any>(url);
}

getParametreById(id: number): Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/get_parametre/${id}`);
}
sendAllPayedDevisPiecetoUser(deviceid:string,userid:number,total:number): Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/send_payed_devis_liste_to_user/${userid}/${deviceid}/${total}`);
}
sendAllVisitedDevisPiecetoUser(deviceid: string, userid: number, projet_id: number): Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/send_visited_devis_liste_to_user/${userid}/${deviceid}/${projet_id}`);
}

async sendAllVisitedDevisPiecetoUserAsync(deviceid: string, userid: number, projet_id: number): Promise<any> {
  return lastValueFrom(this.sendAllVisitedDevisPiecetoUser(deviceid, userid,projet_id));
}

async sendAllPayedDevisPiecetoUserAsync(deviceid: string, userid: number,total:number): Promise<any> {
  return lastValueFrom(this.sendAllPayedDevisPiecetoUser(deviceid, userid,total));
}
get_projet(userId: number): Observable<any> {
  const url = `${environment.apiUrl}/get_project/${userId}`;
  return this.http.get<any>(url);
}

getFichiersByProjet(devisId: number): Observable<any> {
  const url = `${environment.apiUrl}/get_fichiers_by_projet/${devisId}`;
  return this.http.get<any>(url);
}
get_all_projet_paiements(devisID: number): Observable<any> {
  const url = `${environment.apiUrl}/get_all_projet_paiements/${devisID}`;
  return this.http.get<any>(url);
}
validerDevisPiece(id:number,body: any): Observable<any> {
  return this.http.put<any>(`${environment.apiUrl}/valider_devis_piece/${id}`,body);
}

deleteDevisPiece(id:number): Observable<any> {
  return this.http.delete<any>(`${environment.apiUrl}/delete_devis_piece/${id}`);
}
get_etapes_devis(): Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/get_etapes_devis`);
}



}
