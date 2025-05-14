import { Component } from '@angular/core';
import { AuthServiceService } from '../../../services/auth-service.service';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-projects',
  templateUrl: './current-projects.component.html',
  styleUrl: './current-projects.component.css'
})
export class CurrentProjectsComponent {
  isconnected=false;
  user_id=0
  listOfCurrentProjects:any
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
      this.userService.getProjetsByUserId(this.user_id).subscribe(
        (items) => {
          
          this.listOfCurrentProjects = items;
          console.log('Projets en cours ', this.listOfCurrentProjects);
          
         
         
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
