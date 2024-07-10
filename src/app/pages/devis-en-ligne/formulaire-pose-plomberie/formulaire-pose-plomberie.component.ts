import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { Equipement } from '../../../Models/Equipement';
import { GestionDesDevisService } from '../../../services/gestion-des-devis.service';

@Component({
  selector: 'app-formulaire-pose-plomberie',
  templateUrl: './formulaire-pose-plomberie.component.html',
  styleUrl: './formulaire-pose-plomberie.component.css'
})
export class FormulairePosePlomberieComponent {

  @Input() selectedPiece: any; // Déclaration de l'entrée selectedPiece
  poseCuisineForm: FormGroup;
  poseSalleDeBainForm: FormGroup;
  // le formulaire de pose plafond
  createPoseCuisineGroup(): FormGroup {
    return this.fb.group({
      appareils_cuisine: this.fb.array([])
    });
  }
  onPoseCuisineSubmit(): void {
    if (this.poseCuisineForm.invalid) {
      this.markFormGroupTouched(this.poseCuisineForm);
      return;
    }
    if (this.poseCuisineForm.valid) {
      console.log(this.poseCuisineForm.value);
      // Envoyer les données au backend ou traiter comme nécessaire
      this.gestiondesdevisService.addFormulaire("pose-plomberie",11,this.poseCuisineForm.value)
    }
  }

  createPoseSalleDeBainGroup(): FormGroup {
    return this.fb.group({
      appareils_salle_de_bain: this.fb.array([])
    });
  }
  onPoseSalleDeBainSubmit(): void {
    if (this.poseSalleDeBainForm.invalid) {
      this.markFormGroupTouched(this.poseSalleDeBainForm);
      return;
    }
    if (this.poseSalleDeBainForm.valid) {
      console.log(this.poseSalleDeBainForm.value);
      // Envoyer les données au backend ou traiter comme nécessaire
    }
  }
  
  constructor(private fb: FormBuilder,private userService: ApiConceptsEtTravauxService,private gestiondesdevisService: GestionDesDevisService) {
    
    this.poseCuisineForm = this.createPoseCuisineGroup();
    this.poseSalleDeBainForm = this.createPoseSalleDeBainGroup();
  }
   
   //code de validation des formulaires
   markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      const abstractControl = control as AbstractControl;
      abstractControl.markAsTouched();
      if (abstractControl instanceof FormGroup) {
        this.markFormGroupTouched(abstractControl);
      }
    });
  }

  appareils_cuisine:Equipement[]=[]
  appareils_salle_de_bain:Equipement[]=[]

  ngOnInit(): void {
    this.loadAppareils()
  }
  loadAppareils(){
    this.userService.getEquipementsByPiece(7).subscribe(
      (response) => {
        this.appareils_cuisine = response;
        console.log("réponse de la requette getEquipementsByPiece:cuisine ",this.appareils_cuisine);
        this.appareils_cuisine.forEach(appareil => {
          const modeleEquipements = appareil.ModeleEquipements;
    
          // Créer un FormGroup pour chaque appareil
          const appareilGroup = this.fb.group({});
    
          // Ajouter dynamiquement les contrôles pour chaque modèle d'équipement
          modeleEquipements.forEach((modele, index) => {
            appareilGroup.addControl(appareil.Titre+" "+modele.Titre, this.fb.control(false, ));
            // Ajoutez d'autres contrôles selon vos besoins pour chaque modèle
          });
    
          // Ajouter le FormGroup de l'appareil au FormArray
          (this.poseCuisineForm.get('appareils_cuisine') as FormArray).push(appareilGroup);
        });
      },
      (error) => {
        console.error('Erreur lors de la recuperation des getEquipementsByPiece:cuisine :', error);
      }
    );
    this.userService.getEquipementsByPiece(5).subscribe(
      (response) => {
        this.appareils_salle_de_bain = response;
        console.log("réponse de la requette  getEquipementsByPiece:salledebain",this.appareils_salle_de_bain);
        this.appareils_salle_de_bain.forEach(appareil => {
          const modeleEquipements = appareil.ModeleEquipements;
    
          // Créer un FormGroup pour chaque appareil
          const appareilGroup = this.fb.group({});
    
          // Ajouter dynamiquement les contrôles pour chaque modèle d'équipement
          modeleEquipements.forEach((modele, index) => {
            appareilGroup.addControl(appareil.Titre+" "+modele.Titre, this.fb.control(false, ));
            // Ajoutez d'autres contrôles selon vos besoins pour chaque modèle
          });
    
          // Ajouter le FormGroup de l'appareil au FormArray
          (this.poseSalleDeBainForm.get('appareils_salle_de_bain') as FormArray).push(appareilGroup);
        });
       
      },
      (error) => {
        console.error('Erreur lors de la recuperation des  getEquipementsByPiece:salledebain :', error);
      }
    );
  }
  
  }
  