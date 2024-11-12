import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';

@Component({
  selector: 'app-dimensions-depose-cuisine',
  templateUrl: './dimensions-depose-cuisine.component.html',
  styleUrl: './dimensions-depose-cuisine.component.css'
})
export class DimensionsDeposeCuisineComponent {
  isclicked=false
  @Input() triggerSubmitDimensionForm!: boolean;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitDimensionForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitDimensionForm)
      if(this.triggerSubmitDimensionForm==true){
        this.onPoseElementCuisinesSubmit();
        this.isclicked=true
      }
      
    }
  }
  @Output() formValidityChange = new EventEmitter<boolean>();
//formulaires des deposes 
deposeElementCuisinesHautForm: FormGroup;
deposeElementCuisinesBasForm: FormGroup;
 
// les elementcuisines dynamiques du formulaire de depose elementcuisines
get elementcuisines_haut(): FormArray {
  return this.deposeElementCuisinesHautForm.get('elementcuisines_haut') as FormArray;
}
get elementcuisines_bas(): FormArray {
  return this.deposeElementCuisinesBasForm.get('elementcuisines_bas') as FormArray;
}

addElementCuisine_hautGroup(): void {
  if (this.elementcuisines_haut.length < 4) {
    this.elementcuisines_haut.push(this.createdeposeElementCuisineGroup());
  }
}
addElementCuisine_basGroup(): void {
  if (this.elementcuisines_bas.length < 4) {
    this.elementcuisines_bas.push(this.createdeposeElementCuisineGroup());
  }
}

removeElementCuisine_hautGroup(index: number): void {
  if (this.elementcuisines_haut.length > 1) {
    this.elementcuisines_haut.removeAt(index);
  }
}
removeElementCuisine_basGroup(index: number): void {
  if (this.elementcuisines_bas.length > 1) {
    this.elementcuisines_bas.removeAt(index);
  }
}

onPoseElementCuisinesSubmit(): void {
  if (this.deposeElementCuisinesHautForm.valid && this.deposeElementCuisinesBasForm.valid) {
    // Fusionner les deux formulaires
    const fusion = {
      ...this.deposeElementCuisinesHautForm.value,  // Valeurs du formulaire du haut
      ...this.deposeElementCuisinesBasForm.value    // Valeurs du formulaire du bas
    };
    this.formValidityChange.emit(true);
    console.log('Fusion des formulaires:', fusion);

    // Ajouter le formulaire fusionné via le service
    this.gestiondesdevisService.addFormulaire('dimensions-depose-elementcuisines', 14, fusion);
  }
}
createdeposeElementCuisineGroup(): FormGroup {
  return this.fb.group({
    hauteur: ['', Validators.required],
    longueur: ['', Validators.required],
    profondeur: ['', Validators.required],
    quantite: ['', Validators.required],
    image: [null]
  });
}
constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService) {
  
  const prev_form_haut = this.gestiondesdevisService.getFormulaireByName('dimensions-depose-elementcuisines_haut');
  const prev_form_bas = this.gestiondesdevisService.getFormulaireByName('dimensions-depose-elementcuisines_bas');
  if (prev_form_haut) {
    console.log("formulaire existant",prev_form_haut)
    this.deposeElementCuisinesHautForm = this.fb.group({
      elementcuisines: this.fb.array([this.createdeposeElementCuisineGroup()])
    });
    let formulaire_dimensions_length=prev_form_haut.formulaire.elementcuisines.length
    for(let i=0;i<(formulaire_dimensions_length-1);i++){
      this.addElementCuisine_hautGroup()
    }
    
    this.deposeElementCuisinesHautForm.patchValue(prev_form_haut.formulaire);

  } 
  else {
    console.log("formulaire non existant")
    this.deposeElementCuisinesHautForm = this.fb.group({
      elementcuisines_haut: this.fb.array([this.createdeposeElementCuisineGroup()])
    });
  }

  if (prev_form_bas) {
    console.log("formulaire existant",prev_form_bas)
    this.deposeElementCuisinesBasForm = this.fb.group({
      elementcuisines: this.fb.array([this.createdeposeElementCuisineGroup()])
    });
    let formulaire_dimensions_length=prev_form_bas.formulaire.elementcuisines.length
    for(let i=0;i<(formulaire_dimensions_length-1);i++){
      this.addElementCuisine_basGroup()
    }
    
    this.deposeElementCuisinesBasForm.patchValue(prev_form_bas.formulaire);

  } 
  else {
    console.log("formulaire non existant")
    
    this.deposeElementCuisinesBasForm = this.fb.group({
      elementcuisines_bas: this.fb.array([this.createdeposeElementCuisineGroup()])
    });
  }
 
}
//upload des images sur tous les formulaires
maxFileSize = 10 * 1024 * 1024; // 10 MB en octets
onElementCuisines_hautFileChange(event: Event, index: number): void {
  const inputElement = event.target as HTMLInputElement;
  const file: File = (inputElement.files as FileList)[0];
  if (file.size <= this.maxFileSize && file.type.startsWith('image/')) {
    this.elementcuisines_haut.at(index).patchValue({
      image: file
    });
  } else {
    console.log('Please upload an image file less than 10 MB.');
    inputElement.value = ''; // Reset the input if the file is invalid
  }
  
}

onElementCuisines_basFileChange(event: Event, index: number): void {
  const inputElement = event.target as HTMLInputElement;
  const file: File = (inputElement.files as FileList)[0];
  if (file.size <= this.maxFileSize && file.type.startsWith('image/')) {
    this.elementcuisines_bas.at(index).patchValue({
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

