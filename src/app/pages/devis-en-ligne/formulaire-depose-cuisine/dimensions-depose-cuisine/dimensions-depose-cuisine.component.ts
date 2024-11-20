import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
interface MaxValues {
  hauteur: number;
  longueur: number;
  profondeur: number;
  quantite: number;
}
@Component({
  selector: 'app-dimensions-depose-cuisine',
  templateUrl: './dimensions-depose-cuisine.component.html',
  styleUrl: './dimensions-depose-cuisine.component.css'
})
export class DimensionsDeposeCuisineComponent {
  maxValues: MaxValues = {
    hauteur: 500,
    longueur: 9000,
    profondeur: 8000,
    quantite: 50,
  };
  is_active_Ecb=false
  is_active_Ech=false
  active_Ech(){
    this.is_active_Ech=!this.is_active_Ech
    const elements = this.deposeElementCuisinesHautForm.get('elementcuisines_haut') as FormArray;
    elements.controls.forEach(formGroup => {
      if (formGroup instanceof FormGroup) {
        // Appliquez ou supprimez les validateurs pour chaque contrôle
        ['hauteur', 'longueur', 'profondeur', 'quantite'].forEach(field => {
          const max = this.maxValues[field as keyof MaxValues]; // Récupère le maximum spécifique pour le champ
          const control = formGroup.get(field);
          if (this.is_active_Ech) {
            control?.setValidators([Validators.required, Validators.min(1), Validators.max(max)]);
          } else {
            control?.clearValidators();
          }
          control?.updateValueAndValidity();
        });
      }
    });
  }
  active_Ecb(){
    this.is_active_Ecb=!this.is_active_Ecb
    const elements = this.deposeElementCuisinesBasForm.get('elementcuisines_bas') as FormArray;
    elements.controls.forEach(formGroup => {
      if (formGroup instanceof FormGroup) {
        // Appliquez ou supprimez les validateurs pour chaque contrôle
        ['hauteur', 'longueur', 'profondeur', 'quantite'].forEach(field => {
          const max = this.maxValues[field as keyof MaxValues]; 
          const control = formGroup.get(field);
          if (this.is_active_Ecb) {
            control?.setValidators([Validators.required, Validators.min(1), Validators.max(max)]);
          } else {
            control?.clearValidators();
          }
          control?.updateValueAndValidity();
        });
      }
    });
  }
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
    this.elementcuisines_haut.push(this.createdeposeElementHautCuisineGroup());
  }
}
addElementCuisine_basGroup(): void {
  if (this.elementcuisines_bas.length < 4) {
    this.elementcuisines_bas.push(this.createdeposeElementBasCuisineGroup());
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
      ...this.deposeElementCuisinesBasForm.value,    // Valeurs du formulaire du bas
      "is_active_Ecb":this.is_active_Ecb,
      "is_active_Ech":this.is_active_Ech,
    };
    this.formValidityChange.emit(true);
  
    // Ajouter le formulaire fusionné via le service
    this.gestiondesdevisService.addFormulaire('dimensions-depose-elementcuisines', 2, fusion);
    console.log('Formulaire soumis: ',this.gestiondesdevisService.getFormulaireByName('dimensions-depose-elementcuisines'));
  }
}
createdeposeElementHautCuisineGroup(): FormGroup {
  return this.fb.group({
    hauteur: ['', this.is_active_Ech
      ? [Validators.required, Validators.min(1), Validators.max(this.maxValues["hauteur"])]
      : [Validators.min(1), Validators.max(this.maxValues["hauteur"])] // Seulement les contraintes min/max si non actif
  ],
    longueur: ['', this.is_active_Ech
      ? [Validators.required, Validators.min(1), Validators.max(this.maxValues["longueur"])]
      : [Validators.min(1), Validators.max(this.maxValues["longueur"])] // Seulement les contraintes min/max si non actif
  ],
    profondeur: ['', this.is_active_Ech
      ? [Validators.required, Validators.min(1), Validators.max(this.maxValues["profondeur"])]
      : [Validators.min(1), Validators.max(this.maxValues["profondeur"])] // Seulement les contraintes min/max si non actif
  ],
    quantite: [1, this.is_active_Ech
      ? [Validators.required, Validators.min(1), Validators.max(this.maxValues["profondeur"])]
      : [Validators.min(1), Validators.max(this.maxValues["profondeur"])] // Seulement les contraintes min/max si non actif
  ],
    image: [null]
  });
}
createdeposeElementBasCuisineGroup(): FormGroup {
  return this.fb.group({
    hauteur: ['', this.is_active_Ecb ? [Validators.required, Validators.min(1), Validators.max(this.maxValues["hauteur"])]
      : [Validators.min(1), Validators.max(this.maxValues["hauteur"])]
    ],
    longueur: ['', this.is_active_Ecb ? [Validators.required, Validators.min(1), Validators.max(this.maxValues["longueur"])]
      : [Validators.min(1), Validators.max(this.maxValues["longueur"])]
    ],
    profondeur: ['', this.is_active_Ecb ? [Validators.required, Validators.min(1), Validators.max(this.maxValues["profondeur"])]
      : [Validators.min(1), Validators.max(this.maxValues["profondeur"])]
    ],
    quantite: [1, this.is_active_Ecb ? [Validators.required, Validators.min(1), Validators.max(this.maxValues["profondeur"])]
      : [Validators.min(1), Validators.max(this.maxValues["profondeur"])]
    ],
    image: [null]
  });
}


prev_form:any
constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService) {
  

  this.prev_form = this.gestiondesdevisService.getFormulaireByName('dimensions-depose-elementcuisines');
  let prev_form_haut = this.prev_form?this.prev_form.formulaire.elementcuisines_haut:null;
  let prev_form_bas = this.prev_form?this.prev_form.formulaire.elementcuisines_bas:null;

  this.is_active_Ecb=(this.prev_form)?this.prev_form.formulaire.is_active_Ecb:false
  this.is_active_Ech=(this.prev_form)?this.prev_form.formulaire.is_active_Ech:false
  if (prev_form_haut) {
    let elementsHauts=prev_form_haut
    console.log("formulaire haut existant",elementsHauts)
    this.deposeElementCuisinesHautForm = this.fb.group({
      elementcuisines_haut: this.fb.array([])
    });
    const elementsHaut = this.deposeElementCuisinesHautForm.get('elementcuisines_haut') as FormArray;
    elementsHauts.forEach((el: any) => {
      elementsHaut.push(this.fb.group({
        hauteur: [el.hauteur, this.is_active_Ech ? [Validators.required, Validators.min(1), Validators.max(this.maxValues["hauteur"])]
      : [Validators.min(1), Validators.max(this.maxValues["hauteur"])]
    ],
        longueur: [el.longueur, this.is_active_Ech ? [Validators.required, Validators.min(1), Validators.max(this.maxValues["longueur"])]
      : [Validators.min(1), Validators.max(this.maxValues["longueur"])]
    ],
        profondeur: [el.profondeur, this.is_active_Ech ? [Validators.required, Validators.min(1), Validators.max(this.maxValues["profondeur"])]
      : [Validators.min(1), Validators.max(this.maxValues["profondeur"])]
    ],
        quantite: [el.quantite, this.is_active_Ech ? [Validators.required, Validators.min(1), Validators.max(this.maxValues["profondeur"])]
      : [Validators.min(1), Validators.max(this.maxValues["profondeur"])]
    ],
        image: [el.image]
      }));
    });

  } 
  else {
    console.log("formulaire non existant")
    this.deposeElementCuisinesHautForm = this.fb.group({
      elementcuisines_haut: this.fb.array([this.createdeposeElementHautCuisineGroup()])
    });
  }

  if (prev_form_bas) {
    let elementsBas=prev_form_bas
    console.log("formulaire bas existant",elementsBas)
    this.deposeElementCuisinesBasForm = this.fb.group({
      elementcuisines_bas: this.fb.array([])
    });
    const elementsBass = this.deposeElementCuisinesBasForm.get('elementcuisines_bas') as FormArray;
    elementsBas.forEach((el: any) => {
      elementsBass.push(this.fb.group({
        hauteur: [el.hauteur, this.is_active_Ech ? [Validators.required, Validators.min(1), Validators.max(this.maxValues["hauteur"])]
      : [Validators.min(1), Validators.max(this.maxValues["hauteur"])]
    ],
        longueur: [el.longueur, this.is_active_Ech ? [Validators.required, Validators.min(1), Validators.max(this.maxValues["longueur"])]
      : [Validators.min(1), Validators.max(this.maxValues["longueur"])]
    ],
        profondeur: [el.profondeur, this.is_active_Ech ? [Validators.required, Validators.min(1), Validators.max(this.maxValues["profondeur"])]
      : [Validators.min(1), Validators.max(this.maxValues["profondeur"])]
    ],
        quantite: [el.quantite, this.is_active_Ech ? [Validators.required, Validators.min(1), Validators.max(this.maxValues["profondeur"])]
      : [Validators.min(1), Validators.max(this.maxValues["profondeur"])]
    ],
        image: [el.image]
      }));
    });

  } 
  else {
    console.log("formulaire non existant")
    
    this.deposeElementCuisinesBasForm = this.fb.group({
      elementcuisines_bas: this.fb.array([this.createdeposeElementBasCuisineGroup()])
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

