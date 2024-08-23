import { Component, Input, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';

@Component({
  selector: 'app-dimensions-pose-sol',
  templateUrl: './dimensions.component.html',
   styleUrl: '../formulaire-pose-sol.component.css'
})
export class PoseSolDimensionsComponent {
  poseSolForm: FormGroup;
  @Input() triggerSubmitDimensionForm!: boolean;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitDimensionForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitDimensionForm)
      if(this.triggerSubmitDimensionForm==true){
        this.onPoseSolSubmit();
      }
      
    }
  }
  //le formulaire de pose sol
  createPoseSolGroup(): FormGroup {
    return this.fb.group({
      surface: ['', Validators.required],
      image: [null]
    });
  }
  onPoseSolSubmit(): void {
    if (this.poseSolForm.invalid) {
      this.markFormGroupTouched(this.poseSolForm);
      return;
    }
    if (this.poseSolForm.valid) {
      console.log(this.poseSolForm.value);
      // Envoyer les données au backend ou traiter comme nécessaire
      this.gestiondesdevisService.addFormulaire("dimensions-pose-sol",9,this.poseSolForm.value)
    }
  }
  
  constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService) {
  
    const prev_form = this.gestiondesdevisService.getFormulaireByName('dimensions-pose-sol');
    if (prev_form) {
      console.log("formulaire existant",prev_form)
      this.poseSolForm = this.createPoseSolGroup();
      this.poseSolForm.patchValue(prev_form.formulaire);

    } else {
      console.log("formulaire non existant")
      this.poseSolForm = this.createPoseSolGroup();
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
  