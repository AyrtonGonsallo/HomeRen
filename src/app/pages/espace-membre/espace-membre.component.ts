import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { ApiConceptsEtTravauxService } from '../../services/api-concepts-et-travaux.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-espace-membre',
  templateUrl: './espace-membre.component.html',
  styleUrl: './espace-membre.component.css'
})
export class EspaceMembreComponent {
isconnected=false;
  user_id=0
  user:any
  currentYear: number = new Date().getFullYear();
  espace_membre_stats:any
  async ngOnInit(): Promise<void> {
    this.authService.getIsConnected().subscribe((isConnected) => {
      this.isconnected = isConnected;
      if (this.isconnected) {
        this.user_id=this.authService.getUser().Id
        console.log('L\'utilisateur est connecté :', this.isconnected," id : ",this.user_id);
        this.user=this.authService.getUser()
       
      } else {
        console.log('L\'utilisateur n\'est pas connecté.');
        this.router.navigate(['/connexion']);
      }
    });
    await this.get_espace_membre_stats();
  }

  
  get_espace_membre_stats(): Promise<void> {
    
    return new Promise((resolve, reject) => {
      this.userService.get_espace_membre_stats(this.user_id).subscribe(
        (items) => {
          
          this.espace_membre_stats = items;
          console.log('espace_membre_stats', this.espace_membre_stats);
          
         
         
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


  getLabel(count: number, singular: string, plural: string): string {
    return count <= 1 ? singular : plural;
  }
}
