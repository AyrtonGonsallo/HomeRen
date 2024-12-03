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
      sol_pvc: [false, ],
      moquette: [false, ],
      sol_pvc_prix: [0, ],
      moquette_prix: [0, ],
      gamme: ["", Validators.required],
      autre_gamme: ["", ],
      depose: ["", Validators.required],
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
    
gammes_parquet_m:any
gammes_parquet_b:any
gammes_parquet_pffs:any
gammes_carrelage:any
gammes_plithes_carrelage:any
gammes_plithes_bois:any
gamme_pvc:any
gamme_moquette:any
gammes_depose:any
load_gammes(){
  this.userService.getGammesByTravailAndType(9,"parquet-massif").subscribe(
    (response: any) => {
      console.log('recuperation des gammes parquet-massif:', response);
      this.gammes_parquet_m=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes parquet-massif :', error);
    }
  );
  this.userService.getGammesByTravailAndType(9,"depose-revetement-sol").subscribe(
    (response: any) => {
      console.log('recuperation des gammes gamme_depose:', response);
      this.gammes_depose=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes gamme_depose :', error);
    }
  );
  this.userService.getGammesByTravailAndType(9,"parquet-flottant-finition-bois").subscribe(
    (response: any) => {
      console.log('recuperation des gammes parquet-flottant-finition-bois:', response);
      this.gammes_parquet_b=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes parquet-flottant-finition-bois :', error);
    }
  );
  this.userService.getGammesByTravailAndType(9,"parquet-flottant-finition-stratifiee").subscribe(
    (response: any) => {
      console.log('recuperation des gammes parquet-flottant-finition-stratifiee:', response);
      this.gammes_parquet_pffs=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes parquet-flottant-finition-stratifiee :', error);
    }
  );
  this.userService.getGammesByTravailAndType(9,"carrelage").subscribe(
    (response: any) => {
      console.log('recuperation des gammes carrelage:', response);
      this.gammes_carrelage=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes carrelage :', error);
    }
  );
  this.userService.getGammesByTravailAndType(9,"plinthes-carrelage").subscribe(
    (response: any) => {
      console.log('recuperation des gammes plinthes-carrelage:', response);
      this.gammes_plithes_carrelage=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes plinthes :', error);
    }
  );
  this.userService.getGammesByTravailAndType(9,"plinthes-bois").subscribe(
    (response: any) => {
      console.log('recuperation des gammes plinthes-bois:', response);
      this.gammes_plithes_bois=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes plinthes :', error);
    }
  );
  this.userService.getGammesByTravailAndType(9,"sol-pvc").subscribe(
    (response: any) => {
      console.log('recuperation des gammes sol-pvc:', response[0]);
      this.gamme_pvc=response[0]
      this.poseSolForm.patchValue({
        sol_pvc_prix: response[0].Prix
      })
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes sol-pvc :', error);
    }
  );
  this.userService.getGammesByTravailAndType(9,"moquette").subscribe(
    (response: any) => {
      console.log('recuperation des gammes moquette:', response[0]);
      this.gamme_moquette=response[0]
      this.poseSolForm.patchValue({
        moquette_prix: response[0].Prix
      })
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes moquette :', error);
    }
  );
}
  }
  
