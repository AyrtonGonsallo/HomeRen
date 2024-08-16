import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';

@Component({
  selector: 'app-etat-surfaces-pose-murs',
  templateUrl: './etat-surfaces.component.html',
  styleUrl: '../formulaire-pose-murs.component.css'
})
export class EtatSurfacesComponent {
  disabled = true;
  radioValue = 'A';
//formulaires des poses et deposes
poseMursForm: FormGroup;
formulaire_dimensions:any
formulaire_dimensions_length:number=0
// les murs dynamiques du formulaire de pose murs
get murs(): FormArray {
  return this.poseMursForm.get('murs') as FormArray;
}

addMurGroup(): void {
  if (this.murs.length < 4) {
    this.murs.push(this.createposeMurGroup());
  }
}

removeMurGroup(index: number): void {
  if (this.murs.length > 1) {
    this.murs.removeAt(index);
  }
}

onPoseMursSubmit(): void {
  if (this.poseMursForm.valid) {
    console.log(this.poseMursForm.value);
    this.gestiondesdevisService.addFormulaire('etat-surfaces-pose-murs',5, this.poseMursForm.value);
    // Envoyer les données au backend ou traiter comme nécessaire
  }
}
createposeMurGroup(): FormGroup {
  return this.fb.group({
    etat: ['', Validators.required]
  });
}
constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService) {
  this.poseMursForm = this.fb.group({
    murs: this.fb.array([this.createposeMurGroup()])
  });
  this.formulaire_dimensions=this.gestiondesdevisService.getFormulaireByName("dimensions-pose-murs")
  this.formulaire_dimensions_length=this.formulaire_dimensions.formulaire.murs.length
  for(let i=0;i<(this.formulaire_dimensions_length-1);i++){
    this.addMurGroup()
  }
  console.log("longueur: ",this.formulaire_dimensions_length)
  console.log("formulaire: ",this.formulaire_dimensions)
 
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
