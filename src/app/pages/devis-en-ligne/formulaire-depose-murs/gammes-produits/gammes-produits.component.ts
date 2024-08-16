import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';

@Component({
  selector: 'app-gammes-produits-depose-murs',
  templateUrl: './gammes-produits.component.html',
  styleUrl: '../form-depose-mur.css'
})
export class DeposeMursGammesProduitsComponent {
//formulaires des deposes et dedeposes
deposeMursForm: FormGroup;
formulaire_dimensions:any
formulaire_dimensions_length:number=0
// les murs dynamiques du formulaire de depose murs
get murs(): FormArray {
  return this.deposeMursForm.get('murs') as FormArray;
}

addMurGroup(): void {
  if (this.murs.length < 4) {
    this.murs.push(this.createdeposeMurGroup());
  }
}

removeMurGroup(index: number): void {
  if (this.murs.length > 1) {
    this.murs.removeAt(index);
  }
}

onPoseMursSubmit(): void {
  if (this.deposeMursForm.valid) {
    //console.log(this.deposeMursForm.value);
    this.gestiondesdevisService.addFormulaire('gammes-produits-depose-murs',14, this.deposeMursForm.value);
    // Envoyer les données au backend ou traiter comme nécessaire
    this.gestiondesdevisService.groupform('depose-murs',14, 'dimensions-depose-murs','etat-surfaces-depose-murs','gammes-produits-depose-murs')
    console.log(this.gestiondesdevisService.getFormulaireByName("depose-murs"));
  }
}
createdeposeMurGroup(): FormGroup {
  return this.fb.group({
   
    carrelage: [false, ],
    papier: [false, ],
    gamme: [false, ],
    enduit: [false, ],
    peinture: [false, ],
    lambris: [false, ],
    tissus: [false, ],
    autre: ["", ],
    isAutreType: [false]
  });
}
isAutreType: boolean = false;
onTypeChange(value: string, index: number) {
  const murForm = this.murs.at(index);
  if (murForm) {
    const autreTypeControl = murForm.get('isAutreType');
    if (autreTypeControl) {
      autreTypeControl.setValue(value === 'autre');
    }
  }
}
constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {
  this.deposeMursForm = this.fb.group({
    murs: this.fb.array([this.createdeposeMurGroup()])
  });
  this.formulaire_dimensions=this.gestiondesdevisService.getFormulaireByName("dimensions-depose-murs")
  this.formulaire_dimensions_length=this.formulaire_dimensions.formulaire.murs.length
  for(let i=0;i<(this.formulaire_dimensions_length-1);i++){
    this.addMurGroup()
  }
  console.log(this.formulaire_dimensions)
  
 
}
//upload des images sur tous les formulaires
maxFileSize = 10 * 1024 * 1024; // 10 MB en octets
onMursFileChange(event: Event, index: number): void {
  const inputElement = event.target as HTMLInputElement;
  const file: File = (inputElement.files as FileList)[0];
  if (file.size <= this.maxFileSize && file.type.startsWith('image/')) {
    this.murs.at(index).patchValue({
      image: file
    });
  } else {
    console.log('Please upload an image file less than 10 MB.');
    inputElement.value = ''; // Reset the input if the file is invalid
  }
  
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
