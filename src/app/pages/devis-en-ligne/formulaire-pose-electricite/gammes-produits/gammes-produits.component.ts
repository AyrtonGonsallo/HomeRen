import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { Equipement } from '../../../../Models/Equipement';

@Component({
  selector: 'app-gammes-produits-pose-electricite',
  templateUrl: './gammes-produits.component.html',
  styleUrl: '../formulaire-pose-electricite.component.css'
})
export class PoseElectriciteGammesProduitsComponent {
  poseInstallationElectriqueForm: FormGroup;
  
  createPoseInstallationElectriqueGroup(): FormGroup {
    return this.fb.group({
      appareils_electrique: this.fb.array([])
    });
  }
  onPoseInstallationElectriqueSubmit(): void {
    if (this.poseInstallationElectriqueForm.invalid) {
      this.markFormGroupTouched(this.poseInstallationElectriqueForm);
      return;
    }
    if (this.poseInstallationElectriqueForm.valid) {
      console.log(this.poseInstallationElectriqueForm.value);
      // Envoyer les données au backend ou traiter comme nécessaire
      this.gestiondesdevisService.addFormulaire("dimensions-pose-electricite",13,this.poseInstallationElectriqueForm.value)

      this.gestiondesdevisService.addFormulaire("etat-surfaces-pose-electricite",13,this.poseInstallationElectriqueForm.value)

      this.gestiondesdevisService.addFormulaire("gammes-produits-pose-electricite",13,this.poseInstallationElectriqueForm.value)
      // Envoyer les données au backend ou traiter comme nécessaire
     this.gestiondesdevisService.groupform('pose-electricite',13, 'dimensions-pose-electricite','etat-surfaces-pose-electricite','gammes-produits-pose-electricite')
     console.log(this.gestiondesdevisService.getFormulaireByName("pose-electricite"));
    }
  }

  
  constructor(private fb: FormBuilder,private userService: ApiConceptsEtTravauxService,private gestiondesdevisService: GestionDesDevisService) {
    
    this.poseInstallationElectriqueForm = this.createPoseInstallationElectriqueGroup();
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

  appareils_electrique:Equipement[]=[]

  ngOnInit(): void {
    this.loadAppareils()
  }

  loadAppareils(){
    this.userService.getEquipementsByType("electrique").subscribe(
      (response) => {
        this.appareils_electrique = response;
        console.log("réponse de la requette getEquipementsBytype:electrique ",this.appareils_electrique);
        this.appareils_electrique.forEach(appareil => {
          const modeleEquipements = appareil.ModeleEquipements;
    
          // Créer un FormGroup pour chaque appareil
          const appareilGroup = this.fb.group({});
          appareilGroup.addControl("appareillage_"+appareil.Titre, this.fb.control(false, ));
          appareilGroup.addControl("cables_"+appareil.Titre, this.fb.control(false, ));
          appareilGroup.addControl("goulotte_"+appareil.Titre, this.fb.control(false, ));
          appareilGroup.addControl("encastre_cloison_legere_"+appareil.Titre, this.fb.control(false, ));
          appareilGroup.addControl("encastre_beton_"+appareil.Titre, this.fb.control(false, ));
          appareilGroup.addControl("protection_"+appareil.Titre, this.fb.control(false, ));
          
    
          // Ajouter le FormGroup de l'appareil au FormArray
          (this.poseInstallationElectriqueForm.get('appareils_electrique') as FormArray).push(appareilGroup);
        });
      },
      (error) => {
        console.error('Erreur lors de la recuperation des getEquipementsByPiece:cuisine :', error);
      }
    );
    
  }
}
