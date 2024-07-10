import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { GestionDesDevisService } from '../../../services/gestion-des-devis.service';

@Component({
  selector: 'app-formulaire-pose-plafond',
  templateUrl: './formulaire-pose-plafond.component.html',
  styleUrl: './formulaire-pose-plafond.component.css'
})
export class FormulairePosePlafondComponent {
  posePlafondForm: FormGroup;
  
// le formulaire de pose plafond
createPosePlafondGroup(): FormGroup {
  return this.fb.group({
    hauteur: ['', Validators.required],
    surface: ['', Validators.required],
    longueur: ['', Validators.required],
    largeur: ['', Validators.required],
    etat: ['', Validators.required],
    carrelage: ['', ],
    papier: ['', ],
    enduit: ['', ],
    peinture: ['', ],
    image: [null]
  });
}
onPosePlafondSubmit(): void {
  if (this.posePlafondForm.invalid) {
    this.markFormGroupTouched(this.posePlafondForm);
    return;
  }
  if (this.posePlafondForm.valid) {
    console.log(this.posePlafondForm.value);
    // Envoyer les données au backend ou traiter comme nécessaire
    this.gestiondesdevisService.addFormulaire('pose-plafond', this.posePlafondForm.value);

  }
}

constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService) {
  
  this.posePlafondForm = this.createPosePlafondGroup();
}
 //upload des images sur tous les formulaires
 maxFileSize = 10 * 1024 * 1024; // 10 MB en octets

 onFileChange(event: Event,form:FormGroup): void {
   const inputElement = event.target as HTMLInputElement;
   const file: File = (inputElement.files as FileList)[0];
   if (file.size <= this.maxFileSize && file.type.startsWith('image/')) {
     form.patchValue({
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
