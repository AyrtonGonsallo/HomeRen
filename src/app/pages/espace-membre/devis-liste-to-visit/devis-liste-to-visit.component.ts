import { Component } from '@angular/core';
import { AuthServiceService } from '../../../services/auth-service.service';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devis-liste-to-visit',
  templateUrl: './devis-liste-to-visit.component.html',
  styleUrl: './devis-liste-to-visit.component.css'
})
export class DevisListeToVisitComponent {
 isconnected=false;
  user_id=0
  currentYear: number = new Date().getFullYear();
  listOfVisits:any
  async ngOnInit(): Promise<void> {
    this.authService.getIsConnected().subscribe((isConnected) => {
      this.isconnected = isConnected;
      if (this.isconnected) {
        this.user_id=this.authService.getUser().Id
        console.log('L\'utilisateur est connecté :', this.isconnected," id : ",this.user_id);
       
      } else {
        console.log('L\'utilisateur n\'est pas connecté.');
        this.router.navigate(['/connexion']);
      }
    });
    await this.get_current_projects();
  }

  
  get_current_projects(): Promise<void> {
    
    return new Promise((resolve, reject) => {
      this.userService.getVisitByUserId(this.user_id).subscribe(
        (items) => {
          
          this.listOfVisits = items;
          console.log('visites en cours ', this.listOfVisits);
          
         
         
          resolve(); //  Fin de la méthode (permet de continuer l'exécution)
        },
        (error) => {
          console.error('Erreur lors de la récupération des devis :', error);
          reject(error); //  Bloque l'exécution si une erreur survient
        }
      );

    });
  }


  constructor(private router: Router,private authService:AuthServiceService,private userService: ApiConceptsEtTravauxService) {
     
    }
}
