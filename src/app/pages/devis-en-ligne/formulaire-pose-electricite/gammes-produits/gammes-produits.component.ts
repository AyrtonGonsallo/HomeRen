import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { Equipement } from '../../../../Models/Equipement';
import { app } from '../../../../../../server';

@Component({
  selector: 'app-gammes-produits-pose-electricite',
  templateUrl: './gammes-produits.component.html',
  styleUrl: '../formulaire-pose-electricite.component.css'
})
export class PoseElectriciteGammesProduitsComponent {
  isclicked=false

  @Input() triggerSubmitGammesProduitsForm!: boolean;
  modele: any;
  appareilGroup: any;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitGammesProduitsForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitGammesProduitsForm)
      if(this.triggerSubmitGammesProduitsForm==true){
        
          this.onPoseInstallationElectriqueSubmit()
        
        this.isclicked=true
      }
      
    }
  }
  @Output() formValidityChange = new EventEmitter<boolean>();
  poseInstallationElectriqueForm: FormGroup;
  
  createPoseInstallationElectriqueGroup(): FormGroup {
    return this.fb.group({
      appareils_electrique: this.fb.array([])
    });
  }
  onPoseInstallationElectriqueSubmit(): void {
    this.formValidityChange.emit(this.poseInstallationElectriqueForm.valid);
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
          appareilGroup.addControl("checked", this.fb.control(false, ));
          appareilGroup.addControl("id", this.fb.control(appareil.ID,));
          appareilGroup.addControl("titre", this.fb.control(appareil.Titre,));
          appareilGroup.addControl("appareillage", this.fb.control('', ));
          appareilGroup.addControl("cables", this.fb.control('', ));
          appareilGroup.addControl("goulotte", this.fb.control('', ));
          appareilGroup.addControl("encastre_cloison_legere", this.fb.control('', ));
          appareilGroup.addControl("encastre_beton", this.fb.control('', ));
          appareilGroup.addControl("protection", this.fb.control('', ));
          
    
          // Ajouter le FormGroup de l'appareil au FormArray
          (this.poseInstallationElectriqueForm.get('appareils_electrique') as FormArray).push(appareilGroup);
        });
      },
      (error) => {
        console.error('Erreur lors de la recuperation des getEquipementsByPiece:cuisine :', error);
      }
    );
    
  }

  get appareils(): FormArray {
    return this.poseInstallationElectriqueForm.get('appareils_electrique') as FormArray;
  }
}
