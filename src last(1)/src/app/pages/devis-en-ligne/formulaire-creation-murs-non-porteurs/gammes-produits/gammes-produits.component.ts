import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';

@Component({
  selector: 'app-gammes-produits-creation-murs-non-porteurs',
  templateUrl: './gammes-produits.component.html',
  styleUrl: '../formulaire-creation-murs-non-porteurs.component.css'
})
export class MursNonPorteursGammesProduitsComponent {
  @Input() triggerSubmitGammesProduitsForm!: boolean;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitGammesProduitsForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitGammesProduitsForm)
      if(this.triggerSubmitGammesProduitsForm==true){
        this.isclicked=true
        this.onPosePortesSubmit();
      }
      
    }
  }
  @Output() formValidityChange = new EventEmitter<boolean>();
  disabled = true;
  radioValue = 'A';
  isclicked=false

constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService) {
 
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
  this.formValidityChange.emit(this.posePortesForm.valid);
  if (this.posePortesForm.valid) {
    console.log(this.posePortesForm.value);
    // Envoyer les données au backend ou traiter comme nécessaire
    
    this.gestiondesdevisService.addFormulaire("gammes-produits-creation-murs-non-porteurs--portes",4,this.posePortesForm.value)
    // Envoyer les données au backend ou traiter comme nécessaire
    this.gestiondesdevisService.groupform('creation-murs-non-porteurs',4, 'dimensions-creation-murs-non-porteurs--murs','etat-surfaces-creation-murs-non-porteurs--murs','gammes-produits-creation-murs-non-porteurs--portes')
    console.log(this.gestiondesdevisService.getFormulaireByName("creation-murs-non-porteurs"));
  }
}
createposePortesGroup(): FormGroup {
  return this.fb.group({
    type: ['', Validators.required],//select avec valeurs Porte alveolaire simple,Porte alveolaire double,Porte pleine double,Porte pleine simple, Porte vitrée simple,Porte vitrée double
   
  });
}

 


}