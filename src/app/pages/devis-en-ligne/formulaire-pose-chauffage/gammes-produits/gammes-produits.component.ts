import { Component } from '@angular/core';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gammes-produits-pose-chauffage',
  templateUrl: './gammes-produits.component.html',
  styleUrl: '../formulaire-pose-chauffage.component.css'
})
export class PoseChauffageGammesProduitsComponent {
  poseChauffageForm: FormGroup;
  
  // le formulaire de pose plafond
  createPoseChauffageGroup(): FormGroup {
    return this.fb.group({
      pose_de_radiateur_existant: ['', ],
      creation_de_canalisations: ['', ],
     
    });
  }
  onPoseChauffageSubmit(): void {
    if (this.poseChauffageForm.invalid) {
      this.markFormGroupTouched(this.poseChauffageForm);
      return;
    }
    if (this.poseChauffageForm.valid) {
     // console.log(this.poseChauffageForm.value);
      // Envoyer les données au backend ou traiter comme nécessaire
      this.gestiondesdevisService.addFormulaire("gammes-produits-pose-chauffage",12,this.poseChauffageForm.value)
    // Envoyer les données au backend ou traiter comme nécessaire
    this.gestiondesdevisService.groupform('pose-chauffage',12, 'dimensions-pose-chauffage','etat-surfaces-pose-chauffage','gammes-produits-pose-chauffage')
    console.log(this.gestiondesdevisService.getFormulaireByName("pose-chauffage"));
    }
  }
  
  constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService) {
    
    this.poseChauffageForm = this.createPoseChauffageGroup();
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
  
  }
  
