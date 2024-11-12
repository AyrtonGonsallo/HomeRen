import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';

@Component({
  selector: 'app-etat-surfaces-pose-chauffage',
  templateUrl: './etat-surfaces.component.html',
  styleUrl: '../formulaire-pose-chauffage.component.css'
})
export class PoseChauffageEtatSurfacesComponent {
  @Input() triggerSubmitEtatSurfacesForm!: boolean;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitEtatSurfacesForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitEtatSurfacesForm)
      if(this.triggerSubmitEtatSurfacesForm==true){
        this.isclicked=true
        this.onPoseRadiateursSubmit();
      }
      
    }
  }
  @Output() formValidityChange = new EventEmitter<boolean>();
  disabled = true;
  radioValue = 'A';
  isclicked =false
//formulaires des poses et deposes
poseRadiateursForm: FormGroup;
formulaire_dimensions:any
formulaire_dimensions_length:number=0
// les radiateurs dynamiques du formulaire de pose radiateurs
get radiateurs(): FormArray {
  return this.poseRadiateursForm.get('radiateurs') as FormArray;
}

addRadiateurGroup(): void {
  if (this.radiateurs.length < 4) {
    this.radiateurs.push(this.createposeRadiateurGroup());
  }
}

removeRadiateurGroup(index: number): void {
  if (this.radiateurs.length > 1) {
    this.radiateurs.removeAt(index);
  }
}

onPoseRadiateursSubmit(): void {
  this.formValidityChange.emit(this.poseRadiateursForm.valid);
  if (this.poseRadiateursForm.valid) {
    console.log(this.poseRadiateursForm.value);
    this.gestiondesdevisService.addFormulaire('etat-surfaces-pose-chauffage',12, this.poseRadiateursForm.value);
    // Envoyer les données au backend ou traiter comme nécessaire
  }
}
createposeRadiateurGroup(): FormGroup {
  return this.fb.group({
    etat: ['', Validators.required],
  });
}
prev_form:any
constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService) {
  
    this.prev_form = this.gestiondesdevisService.getFormulaireByName('etat-surfaces-pose-chauffage');
    if (this.prev_form) {
      let form=this.prev_form.formulaire
      console.log("formulaire existant",this.prev_form)
      this.poseRadiateursForm = this.fb.group({
        radiateurs: this.fb.array([])
      });
      
      const mursArray = this.poseRadiateursForm.get('radiateurs') as FormArray;
      form.radiateurs.forEach((rad: any) => {
        mursArray.push(this.fb.group({
          etat: [rad.etat, Validators.required],
        }));
      });
      
      

    } else {
      console.log("formulaire non existant")
      this.poseRadiateursForm = this.fb.group({
        radiateurs: this.fb.array([this.createposeRadiateurGroup()])
      });
      
      
    }
  
 
}
//upload des images sur tous les formulaires
maxFileSize = 10 * 1024 * 1024; // 10 MB en octets
onRadiateursFileChange(event: Event, index: number): void {
  const inputElement = event.target as HTMLInputElement;
  const file: File = (inputElement.files as FileList)[0];
  if (file.size <= this.maxFileSize && file.type.startsWith('image/')) {
    this.radiateurs.at(index).patchValue({
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
