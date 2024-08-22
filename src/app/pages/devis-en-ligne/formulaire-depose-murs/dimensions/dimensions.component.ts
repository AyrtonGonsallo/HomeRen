import { Component, Input, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';

@Component({
  selector: 'app-dimensions-depose-murs',
  templateUrl: './dimensions.component.html',
  styleUrl: '../form-depose-mur.css'
})
export class DeposeMursDimensionsComponent {
  @Input() triggerSubmitDimensionForm!: boolean;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitDimensionForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitDimensionForm)
      if(this.triggerSubmitDimensionForm==true){
        this.onPoseMursSubmit();
      }
      
    }
  }
//formulaires des deposes et dedeposes
deposeMursForm: FormGroup;
 
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
    console.log(this.deposeMursForm.value);
    this.gestiondesdevisService.addFormulaire('dimensions-depose-murs',14, this.deposeMursForm.value);
    // Envoyer les données au backend ou traiter comme nécessaire
  }
}
createdeposeMurGroup(): FormGroup {
  return this.fb.group({
    hauteur: ['', Validators.required],
    surface: ['', Validators.required],
    longueur: ['', Validators.required],
    image: [null]
  });
}
constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService) {
  
  const prev_form = this.gestiondesdevisService.getFormulaireByName('dimensions-depose-murs');
  if (prev_form) {
    console.log("formulaire existant",prev_form)
    this.deposeMursForm = this.fb.group({
      murs: this.fb.array([this.createdeposeMurGroup()])
    });
    let formulaire_dimensions_length=prev_form.formulaire.murs.length
    for(let i=0;i<(formulaire_dimensions_length-1);i++){
      this.addMurGroup()
    }
    
    this.deposeMursForm.patchValue(prev_form.formulaire);

  } else {
    console.log("formulaire non existant")
    this.deposeMursForm = this.fb.group({
    murs: this.fb.array([this.createdeposeMurGroup()])
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

