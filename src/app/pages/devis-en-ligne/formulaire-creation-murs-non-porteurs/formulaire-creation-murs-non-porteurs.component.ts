import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { GestionDesDevisService } from '../../../services/gestion-des-devis.service';


@Component({
  selector: 'app-formulaire-creation-murs-non-porteurs',
  templateUrl: './formulaire-creation-murs-non-porteurs.component.html',
  styleUrl: './formulaire-creation-murs-non-porteurs.component.css'
})
export class FormulaireCreationMursNonPorteursComponent {
//formulaires des poses et deposes
poseMursNonPorteursForm: FormGroup;
 
// les murs_non_porteurs dynamiques du formulaire de pose murs_non_porteurs
get murs_non_porteurs(): FormArray {
  return this.poseMursNonPorteursForm.get('murs_non_porteurs') as FormArray;
}

addMurNonPorteurroup(): void {
  if (this.murs_non_porteurs.length < 5) {
    this.murs_non_porteurs.push(this.createposeMurNonPorteurroup());
  }
}

removeMurNonPorteurroup(index: number): void {
  if (this.murs_non_porteurs.length > 1) {
    this.murs_non_porteurs.removeAt(index);
  }
}

onPoseMursNonPorteursSubmit(): void {
  if (this.poseMursNonPorteursForm.valid) {
    console.log(this.poseMursNonPorteursForm.value);
    // Envoyer les données au backend ou traiter comme nécessaire
  }
}
createposeMurNonPorteurroup(): FormGroup {
  return this.fb.group({
    hauteur: ['', Validators.required],
    surface: ['', Validators.required],
    longueur: ['', Validators.required],
    type_cloison: ['', Validators.required],
    autre_type_cloison: ['', ],
  });
}
constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService) {
  this.poseMursNonPorteursForm = this.fb.group({
    murs_non_porteurs: this.fb.array([this.createposeMurNonPorteurroup()])
  });
  this.posePortesForm = this.fb.group({
    portes: this.fb.array([this.createposePortesGroup()])
  });
 
 
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

//portes 
//formulaires des poses et deposes
posePortesForm: FormGroup;
 
// les portes dynamiques du formulaire de pose portes
get portes(): FormArray {
  return this.posePortesForm.get('portes') as FormArray;
}

addPortesGroup(): void {
  if (this.portes.length < 5) {
    this.portes.push(this.createposePortesGroup());
  }
}

removePortesGroup(index: number): void {
  if (this.portes.length > 1) {
    this.portes.removeAt(index);
  }
}

onPosePortesSubmit(): void {
  if (this.posePortesForm.valid) {
    console.log(this.posePortesForm.value);
    // Envoyer les données au backend ou traiter comme nécessaire
    this.gestiondesdevisService.addFormulaire("creation-murs-non-porteurs--murs",4,this.poseMursNonPorteursForm.value)
    this.gestiondesdevisService.addFormulaire("creation-murs-non-porteurs--portes",4,this.posePortesForm.value)
  }
}
createposePortesGroup(): FormGroup {
  return this.fb.group({
    type: ['', Validators.required],//select avec valeurs Porte alveolaire simple,Porte alveolaire double,Porte pleine double,Porte pleine simple, Porte vitrée simple,Porte vitrée double
   
  });
}

 


}
