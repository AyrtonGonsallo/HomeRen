import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dimensions-pose-plafond',
  templateUrl: './dimensions.component.html',
   styleUrl: '../formulaire-pose-plafond.component.css'
})
export class DimensionsPosePlafondComponent {
  baseurl=environment.imagesUrl
  isclicked=false
  @Input() triggerSubmitDimensionForm!: boolean;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitDimensionForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitDimensionForm)
      if(this.triggerSubmitDimensionForm==true){
        this.isclicked=true
        this.onPosePlafondSubmit();
      }
      
    }
  }
  @Output() formValidityChange = new EventEmitter<boolean>();
  posePlafondForm: FormGroup;
  @Input() surfacemax: number=0; 
  // le formulaire de pose plafond
  createPosePlafondGroup(): FormGroup {
    return this.fb.group({
      hauteur: ['', Validators.required],
      longueur: ['', Validators.required],
      largeur: ['', Validators.required],
      depose: ["", ],
      image: [null]
    });
  }
  onPosePlafondSubmit(): void {
    this.formValidityChange.emit(this.posePlafondForm.valid);
    if (this.posePlafondForm.invalid) {
      this.markFormGroupTouched(this.posePlafondForm);
      return;
    }
    if (this.posePlafondForm.valid) {
      console.log(this.posePlafondForm.value);
      // Envoyer les données au backend ou traiter comme nécessaire
      this.gestiondesdevisService.addFormulaire('dimensions-pose-plafond',8, this.posePlafondForm.value);
    }
  }
  
  constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {
    this.load_gamme()
    const prev_form = this.gestiondesdevisService.getFormulaireByName('dimensions-pose-plafond');
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
  gammes_depose:any
  load_gamme(){
    this.userService.getGammesByTravailAndType(8,"depose-revetement-plafond").subscribe(
      (response: any) => {
        console.log('recuperation des gammes gammes_depose:', response);
        this.gammes_depose=response
      },
      (error: any) => {
        console.error('Erreur lors de la recuperation des gammes gammes_depose :', error);
      }
    );
  }
  }
  
