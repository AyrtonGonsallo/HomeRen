import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { environment } from '../../../../environments/environment';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';

@Component({
  selector: 'app-etat-surfaces-pose-sol',
  templateUrl: './etat-surfaces.component.html',
  styleUrl: '../formulaire-pose-sol.component.css'
})
export class PoseSolEtatSurfacesComponent {
  assetsUrl=environment.assetsUrl
  isclicked=false
  @Input() triggerSubmitEtatSurfacesForm!: boolean;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitEtatSurfacesForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitEtatSurfacesForm)
      if(this.triggerSubmitEtatSurfacesForm==true){
        this.isclicked=true
        this.onPoseSolSubmit();
      }
      
    }
  }
  @Output() formValidityChange = new EventEmitter<boolean>();
  disabled = true;
  radioValue = 'A';
  poseSolForm: FormGroup;
  
  //le formulaire de pose sol
  createPoseSolGroup(): FormGroup {
    return this.fb.group({
      
      etat: ['', Validators.required],
     
    });
  }
  onPoseSolSubmit(): void {
    this.formValidityChange.emit(this.poseSolForm.valid);
    if (this.poseSolForm.invalid) {
      this.markFormGroupTouched(this.poseSolForm);
      return;
    }
    if (this.poseSolForm.valid) {
      console.log(this.poseSolForm.value);
      // Envoyer les données au backend ou traiter comme nécessaire
      this.gestiondesdevisService.addFormulaire("etat-surfaces-pose-sol",9,this.poseSolForm.value)
    }
  }
  
  constructor(private fb: FormBuilder,private userService:ApiConceptsEtTravauxService,private gestiondesdevisService: GestionDesDevisService) {
  
    this.load_types()
    const prev_form = this.gestiondesdevisService.getFormulaireByName('etat-surfaces-pose-sol');
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


    etat_des_surfaces:any
load_types(){
  this.userService.getGammesByTravailAndTypeOrdered(9,"etat-des-surfaces-sol").subscribe(
    (response: any) => {
      console.log('recuperation des etat-des-surfaces-murs	:', response);
      this.etat_des_surfaces=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des etat-des-surfaces-murs	 :', error);
    }
  );
}
  }
  