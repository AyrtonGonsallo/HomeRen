import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';

@Component({
  selector: 'app-gammes-produits-pose-plafond',
  templateUrl: './gammes-produits.component.html',
   styleUrl: '../formulaire-pose-plafond.component.css'
})
export class GammesProduitsPosePlafondComponent {
  posePlafondForm: FormGroup;
  
  // le formulaire de pose plafond
  createPosePlafondGroup(): FormGroup {
    return this.fb.group({
      carrelage: [0, ],
      papier: [0, ],
      enduit: [0, ],
      peinture: [0, ]
    });
  }
  onPosePlafondSubmit(): void {
    if (this.posePlafondForm.invalid) {
      this.markFormGroupTouched(this.posePlafondForm);
      return;
    }
    if (this.posePlafondForm.valid) {
      //console.log(this.posePlafondForm.value);
      // Envoyer les données au backend ou traiter comme nécessaire
      this.gestiondesdevisService.addFormulaire('gammes-produits-pose-plafond',8, this.posePlafondForm.value);
    // Envoyer les données au backend ou traiter comme nécessaire
    this.gestiondesdevisService.groupform('pose-plafond',8, 'dimensions-pose-plafond','etat-surfaces-pose-plafond','gammes-produits-pose-plafond')
    console.log(this.gestiondesdevisService.getFormulaireByName("pose-plafond"));
  
    }
  }
  
  constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {
    this.load_gammes()
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
  
  
gammes_peinture:any
gammes_enduit:any
gammes_papier:any
gammes_carrelage:any
load_gammes(){
  this.userService.getGammesByTravailAndType(8,"peinture").subscribe(
    (response: any) => {
      console.log('recuperation des gammes peinture:', response);
      this.gammes_peinture=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes peinture :', error);
    }
  );
  this.userService.getGammesByTravailAndType(8,"enduit-decoratif").subscribe(
    (response: any) => {
      console.log('recuperation des gammes enduit-decoratif:', response);
      this.gammes_enduit=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes enduit-decoratif :', error);
    }
  );
  this.userService.getGammesByTravailAndType(8,"papier-peint").subscribe(
    (response: any) => {
      console.log('recuperation des gammes papier-peint:', response);
      this.gammes_papier=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes papier-peint :', error);
    }
  );
  this.userService.getGammesByTravailAndType(8,"carrelage").subscribe(
    (response: any) => {
      console.log('recuperation des gammes carrelage:', response);
      this.gammes_carrelage=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes carrelage :', error);
    }
  );
}
  }
  