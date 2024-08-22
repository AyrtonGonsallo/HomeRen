import { Component, Input, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';

@Component({
  selector: 'app-etat-surfaces-pose-plafond',
  templateUrl: './etat-surfaces.component.html',
   styleUrl: '../formulaire-pose-plafond.component.css'
})
export class EtatSurfacesPosePlafondComponent {
  @Input() triggerSubmitEtatSurfacesForm!: boolean;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitEtatSurfacesForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitEtatSurfacesForm)
      if(this.triggerSubmitEtatSurfacesForm==true){
        this.onPosePlafondSubmit();
      }
      
    }
  }
  posePlafondForm: FormGroup;
  formulaire_dimensions:any
formulaire_dimensions_length:number=0
  // le formulaire de pose plafond
  createPosePlafondGroup(): FormGroup {
    return this.fb.group({
     
      etat: ['', Validators.required],
    
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
      this.gestiondesdevisService.addFormulaire('etat-surfaces-pose-plafond',8, this.posePlafondForm.value);
    }
  }
  
  constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService) {
    
    const prev_form = this.gestiondesdevisService.getFormulaireByName('etat-surfaces-pose-plafond');
    if (prev_form) {
      console.log("formulaire existant",prev_form)
      this.posePlafondForm = this.createPosePlafondGroup();
      this.posePlafondForm.patchValue(prev_form.formulaire);

    } else {
      console.log("formulaire non existant")
      this.posePlafondForm = this.createPosePlafondGroup();
    }
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