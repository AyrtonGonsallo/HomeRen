import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';

@Component({
  selector: 'app-dimensions-pose-murs',
  templateUrl: './dimensions.component.html',
  styleUrl: '../formulaire-pose-murs.component.css'
})
export class DimensionsComponent {
  isclicked=false
  @Input() triggerSubmitDimensionForm!: boolean;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitDimensionForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitDimensionForm)
      if(this.triggerSubmitDimensionForm==true){
        this.onPoseMursSubmit();
        this.isclicked=true
      }
      
    }
  }
  @Output() formValidityChange = new EventEmitter<boolean>();
  disabled = true;
  radioValue = 'A';
//formulaires des poses et deposes
poseMursForm: FormGroup;
@Input() surfacemax: number=0; 
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
  this.formValidityChange.emit(this.poseMursForm.valid);
  if (this.poseMursForm.valid) {
    console.log(this.poseMursForm.value);
    this.gestiondesdevisService.addFormulaire('dimensions-pose-murs',5, this.poseMursForm.value);
    // Envoyer les données au backend ou traiter comme nécessaire
  }
}
createposeMurGroup(): FormGroup {
  return this.fb.group({
    hauteur: ['', Validators.required],
    longueur: ['', Validators.required],
    image: [null]
  });
}
constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService) {
  
  const prev_form = this.gestiondesdevisService.getFormulaireByName('dimensions-pose-murs');
  if (prev_form) {
    console.log("formulaire existant",prev_form)
    this.poseMursForm = this.fb.group({
      murs: this.fb.array([this.createposeMurGroup()])
    });
    let formulaire_dimensions_length=prev_form.formulaire.murs.length
    for(let i=0;i<(formulaire_dimensions_length-1);i++){
      this.addMurGroup()
    }
    
    this.poseMursForm.patchValue(prev_form.formulaire);

  } else {
    console.log("formulaire non existant")
    this.poseMursForm = this.fb.group({
    murs: this.fb.array([this.createposeMurGroup()])
  });
  }
 
 
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

