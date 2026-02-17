import { Component } from '@angular/core';
import { AuthServiceService } from '../../../services/auth-service.service';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-paiements',
  templateUrl: './paiements.component.html',
  styleUrl: './paiements.component.css'
})
export class PaiementsComponent {

  paiements:any

   isconnected=false;
  user_id=0
  currentYear: number = new Date().getFullYear();
  listOfCurrentProjects:any
  listOfCurrentpaiements:any


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


 constructor(private router: Router,private authService:AuthServiceService,private userService: ApiConceptsEtTravauxService) {
     
    }

  async get_current_projects(): Promise<void> {

    try {

      // 1️⃣ Récupérer les projets
      const projets = await firstValueFrom(
        this.userService.getCurrentsProjetsByUserId(this.user_id)
      );

      this.listOfCurrentProjects = projets;
      console.log('Projets en cours', projets);

      // 2️⃣ Récupérer tous les paiements en parallèle
      const paiementsParProjet = await Promise.all(
        projets.map((projet: { Id: number }) =>
          firstValueFrom(
            this.userService.get_all_projet_paiements(projet.Id)
          )
        )
      );

      // 3️⃣ Fusionner tous les paiements dans un seul tableau
      this.listOfCurrentpaiements = paiementsParProjet.flat();

      console.log('Tous les paiements cumulés', this.listOfCurrentpaiements);

    } catch (error) {
      console.error('Erreur récupération projets/paiements', error);
      throw error;
    }
  }

  
  copiedRef: string | null = null;

copy_ref(referenceVirement: string) {

  if (!referenceVirement) return;

  if (!navigator.clipboard) {
    console.error("Clipboard non supporté");
    return;
  }

  navigator.clipboard.writeText(referenceVirement)
    .then(() => {

      this.copiedRef = referenceVirement;

      console.log('Référence copiée');

      // Réinitialise le message après 2 secondes
      setTimeout(() => {
        this.copiedRef = null;
      }, 2000);

    })
    .catch(err => {
      console.error('Erreur copie', err);
    });
}

}
