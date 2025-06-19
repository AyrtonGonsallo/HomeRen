import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';
import { environment } from '../../../../environments/environment';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-gammes-produits-pose-sol',
  templateUrl: './gammes-produits.component.html',
  styleUrl: '../formulaire-pose-sol.component.css'
})
export class PoseSolGammesProduitsComponent {
  baseurl=environment.imagesUrl
  isclicked=false
  @Input() triggerSubmitGammesProduitsForm!: boolean;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitGammesProduitsForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitGammesProduitsForm)
      if(this.triggerSubmitGammesProduitsForm==true){
        this.isclicked=true
        this.onPoseSolSubmit();
      }
      
    }
  }
  @Output() formValidityChange = new EventEmitter<boolean>();
  poseSolForm: FormGroup;
  
  //le formulaire de pose sol
  createPoseSolGroup(): FormGroup {
    return this.fb.group({
      gamme: ["", Validators.required],
      autre_gamme: ["", ],
      lineaire: [0, Validators.required],
      plinthes: ["",],
      has_plinthes: [false,],
    });
  }

  onPoseSolSubmit(): void {
    this.formValidityChange.emit(this.poseSolForm.valid);
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
  
  constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {
    this.load_gammes()
    const prev_form = this.gestiondesdevisService.getFormulaireByName('gammes-produits-pose-sol');
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

gammes_peinture_sol:any
gammes_parquet_massif:any
gammes_sol_souple:any
gammes_parquet_flottant:any
gammes_carrelage_sol:any
gammes_plithes_carrelage:any
gammes_plithes_bois:any
gamme_resine_decorative:any
gamme_moquette_sol:any
/*
{ slug: 'peinture-de-sol', label: 'Peinture de sol' },
{ slug: 'moquette-de-sol', label: 'Moquette (sol)' },
{ slug: 'sol-souple', label: 'Sol souple (sol)' },
{ slug: 'resine-decorative-de-sol', label: 'Résine décorative (sol)' },
{ slug: 'carrelage-sol', label: 'Carrelage (sol)' },
{ slug: 'papier-massif-sol', label: 'Parquet Massif (sol)' },
{ slug: 'parquet-flottant-sol', label: 'Parquet Flottant (sol)' },
{ slug: 'plinthes-carrelage-sol', label: 'Plinthes carrelage (sol)' },
{ slug: 'plinthes-bois-sol', label: 'Plinthes bois (sol)' },
 */
load_gammes(){
  this.userService.getGammesByTravailAndType(9,"peinture-de-sol").subscribe(
    (response: any) => {
      console.log('recuperation des gammes peinture-de-sol:', response);
      this.gammes_peinture_sol=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes peinture-de-sol :', error);
    }
  );
  this.userService.getGammesByTravailAndType(9,"papier-massif-sol").subscribe(
    (response: any) => {
      console.log('recuperation des gammes papier-massif-sol:', response);
      this.gammes_parquet_massif=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes papier-massif-sol :', error);
    }
  );
  this.userService.getGammesByTravailAndType(9,"parquet-flottant-sol").subscribe(
    (response: any) => {
      console.log('recuperation des gammes parquet-flottant-sol:', response);
      this.gammes_parquet_flottant=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes parquet-flottant-finition-bois :', error);
    }
  );
  this.userService.getGammesByTravailAndType(9,"sol-souple").subscribe(
    (response: any) => {
      console.log('recuperation des gammes sol-souple:', response);
      this.gammes_sol_souple=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes sol-souple :', error);
    }
  );
  this.userService.getGammesByTravailAndType(9,"carrelage-sol").subscribe(
    (response: any) => {
      console.log('recuperation des gammes carrelage-sol:', response);
      this.gammes_carrelage_sol=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes carrelage-sol :', error);
    }
  );
  this.userService.getGammesByTravailAndType(9,"plinthes-carrelage-sol").subscribe(
    (response: any) => {
      console.log('recuperation des gammes plinthes-carrelage:', response);
      this.gammes_plithes_carrelage=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes plinthes :', error);
    }
  );
  this.userService.getGammesByTravailAndType(9,"plinthes-bois-sol").subscribe(
    (response: any) => {
      console.log('recuperation des gammes plinthes-bois:', response);
      this.gammes_plithes_bois=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes plinthes :', error);
    }
  );
  this.userService.getGammesByTravailAndType(9,"resine-decorative-de-sol").subscribe(
    (response: any) => {
      console.log('recuperation des gammes resine-decorative-de-sol:', response[0]);
      this.gamme_resine_decorative=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes resine-decorative-de-sol :', error);
    }
  );
  this.userService.getGammesByTravailAndType(9,"moquette-de-sol").subscribe(
    (response: any) => {
      console.log('recuperation des gammes moquette-de-sol:', response[0]);
      this.gamme_moquette_sol=response
      
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes moquette-de-sol :', error);
    }
  );
}


blockComma(event: KeyboardEvent) {
  if (event.key === ',') {
    event.preventDefault();
  }
}
  }
  
