import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';

@Component({
  selector: 'app-gammes-produits-pose-sol',
  templateUrl: './gammes-produits.component.html',
  styleUrl: '../formulaire-pose-sol.component.css'
})
export class PoseSolGammesProduitsComponent {
  poseSolForm: FormGroup;
  
  //le formulaire de pose sol
  createPoseSolGroup(): FormGroup {
    return this.fb.group({
      
      parquet_massif: ['', ],
      paquet_flottant_finition_bois: ['', ],
      parquet_flottant_finition_stratifiee: ['', ],
      sol_pvc: ['', ],
      moquette: ['', ],
      carrelage: ['', ],
      plinthes: ['', ],
    });
  }
  onPoseSolSubmit(): void {
    if (this.poseSolForm.invalid) {
      this.markFormGroupTouched(this.poseSolForm);
      return;
    }
    if (this.poseSolForm.valid) {
      //console.log(this.poseSolForm.value);
      this.gestiondesdevisService.addFormulaire('gammes-produits-pose-sol',9, this.poseSolForm.value);
    // Envoyer les données au backend ou traiter comme nécessaire
    this.gestiondesdevisService.groupform('pose-sol',9, 'dimensions-pose-sol','etat-surfaces-pose-sol','gammes-produits-pose-sol')
    console.log(this.gestiondesdevisService.getFormulaireByName("pose-sol"));
    }
  }
  
  constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService) {
  
    this.poseSolForm = this.createPoseSolGroup();
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
  