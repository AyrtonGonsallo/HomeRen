import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-gammes-produits-pose-murs',
  templateUrl: './gammes-produits.component.html',
  styleUrl: '../formulaire-pose-murs.component.css'
})
export class GammesProduitsComponent {
  @Input() triggerSubmitGammesProduitsForm!: boolean;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitGammesProduitsForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitGammesProduitsForm)
      if(this.triggerSubmitGammesProduitsForm==true){
        this.isclicked=true
        this.onPoseMursSubmit();
      }
      
    }
  }
  @Output() formValidityChange = new EventEmitter<boolean>();
  baseurl=environment.imagesUrl
  isclicked=false
//formulaires des poses et deposes
poseMursForm: FormGroup;
formulaire_dimensions:any
formulaire_dimensions_length:number=0
// les murs dynamiques du formulaire de pose murs
get murs(): FormArray {
  return this.poseMursForm.get('murs') as FormArray;
}

addMurGroup(): void {
  if (this.murs.length < 4) {
    this.murs.push(this.createposeMurGroup());
  }
}

removeMurGroup(index: number): void {
  if (this.murs.length > 1) {
    this.murs.removeAt(index);
  }
}

onPoseMursSubmit(): void {
  this.formValidityChange.emit(this.poseMursForm.valid);
  if (this.poseMursForm.valid) {
    //console.log(this.poseMursForm.value);
    this.gestiondesdevisService.addFormulaire('gammes-produits-pose-murs',5, this.poseMursForm.value);
    // Envoyer les données au backend ou traiter comme nécessaire
    this.gestiondesdevisService.groupform('pose-murs',5, 'dimensions-pose-murs','etat-surfaces-pose-murs','gammes-produits-pose-murs')
    console.log(this.gestiondesdevisService.getFormulaireByName("pose-murs"));
  }
}
createposeMurGroup(): FormGroup {
  return this.fb.group({
    gamme: ["", Validators.required],
    carrelage: [0, ],
    papier: [0, ],
    enduit: [0, ],
    peinture: [0, ]
  });
}
constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {
  
  
  const prev_form = this.gestiondesdevisService.getFormulaireByName('gammes-produits-pose-murs');
    if (prev_form) {
      console.log("formulaire existant",prev_form)
      this.poseMursForm = this.fb.group({
        murs: this.fb.array([this.createposeMurGroup()])
      });
      let formulaire_dimensions_length=prev_form.formulaire.murs.length
      for(let i=0;i<(formulaire_dimensions_length-1);i++){
        this.addMurGroup()
      }
      
      this.poseMursForm.patchValue(prev_form.formulaire);

    } else {
      console.log("formulaire non existant")
      this.poseMursForm = this.fb.group({
        murs: this.fb.array([this.createposeMurGroup()])
      });
      this.formulaire_dimensions=this.gestiondesdevisService.getFormulaireByName("dimensions-pose-murs")
      this.formulaire_dimensions_length=this.formulaire_dimensions.formulaire.murs.length
      for(let i=0;i<(this.formulaire_dimensions_length-1);i++){
        this.addMurGroup()
      }
      console.log("longueur: ",this.formulaire_dimensions_length)
      console.log("formulaire: ",this.formulaire_dimensions)
    }
  this.load_gammes()
 
}
//upload des images sur tous les formulaires
maxFileSize = 10 * 1024 * 1024; // 10 MB en octets
onMursFileChange(event: Event, index: number): void {
  const inputElement = event.target as HTMLInputElement;
  const file: File = (inputElement.files as FileList)[0];
  if (file.size <= this.maxFileSize && file.type.startsWith('image/')) {
    this.murs.at(index).patchValue({
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
gammes_bois:any
gammes_tissus:any
load_gammes(){
  this.userService.getGammesByTravailAndType(5,"peinture").subscribe(
    (response: any) => {
      console.log('recuperation des gammes peinture:', response);
      this.gammes_peinture=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes peinture :', error);
    }
  );
  this.userService.getGammesByTravailAndType(5,"bois").subscribe(
    (response: any) => {
      console.log('recuperation des gammes bois:', response);
      this.gammes_bois=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes bois :', error);
    }
  );
  this.userService.getGammesByTravailAndType(5,"tissus").subscribe(
    (response: any) => {
      console.log('recuperation des gammes tissus:', response);
      this.gammes_tissus=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes tissus :', error);
    }
  );
  this.userService.getGammesByTravailAndType(5,"enduit-decoratif").subscribe(
    (response: any) => {
      console.log('recuperation des gammes enduit-decoratif:', response);
      this.gammes_enduit=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes enduit-decoratif :', error);
    }
  );
  this.userService.getGammesByTravailAndType(5,"papier-peint").subscribe(
    (response: any) => {
      console.log('recuperation des gammes papier-peint:', response);
      this.gammes_papier=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes papier-peint :', error);
    }
  );
  this.userService.getGammesByTravailAndType(5,"carrelage").subscribe(
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
