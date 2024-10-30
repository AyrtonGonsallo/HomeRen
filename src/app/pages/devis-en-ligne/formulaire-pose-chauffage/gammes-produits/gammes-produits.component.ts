import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-gammes-produits-pose-chauffage',
  templateUrl: './gammes-produits.component.html',
  styleUrl: '../formulaire-pose-chauffage.component.css'
})
export class PoseChauffageGammesProduitsComponent {
  @Input() triggerSubmitGammesProduitsForm!: boolean;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitGammesProduitsForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitGammesProduitsForm)
      if(this.triggerSubmitGammesProduitsForm==true){
        this.isclicked=true
        this.onPoseRadiateursSubmit();
      }
      
    }
  }
  @Output() formValidityChange = new EventEmitter<boolean>();
  baseurl=environment.imagesUrl
  isclicked=false
//formulaires des poses et deposes
poseRadiateursForm: FormGroup;
formulaire_dimensions:any
formulaire_dimensions_length:number=0
// les radiateurs dynamiques du formulaire de pose radiateurs
get radiateurs(): FormArray {
  return this.poseRadiateursForm.get('radiateurs') as FormArray;
}

addRadiateurGroup(): void {
  if (this.radiateurs.length < 4) {
    this.radiateurs.push(this.createposeRadiateurGroup());
  }
}

removeRadiateurGroup(index: number): void {
  if (this.radiateurs.length > 1) {
    this.radiateurs.removeAt(index);
  }
}

onPoseRadiateursSubmit(): void {
  this.formValidityChange.emit(this.poseRadiateursForm.valid);
  if (this.poseRadiateursForm.valid) {
    //console.log(this.poseRadiateursForm.value);
    this.gestiondesdevisService.addFormulaire('gammes-produits-pose-chauffage',12, this.poseRadiateursForm.value);
    // Envoyer les données au backend ou traiter comme nécessaire
    this.gestiondesdevisService.groupform('pose-chauffage',12, 'dimensions-pose-chauffage','etat-surfaces-pose-chauffage','gammes-produits-pose-chauffage')
    console.log(this.gestiondesdevisService.getFormulaireByName("pose-chauffage"));
  }
}
createposeRadiateurGroup(): FormGroup {
  return this.fb.group({
    gamme: ["", Validators.required]
  });
}
constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {
  
  
  const prev_form = this.gestiondesdevisService.getFormulaireByName('gammes-produits-pose-chauffage');
    if (prev_form) {
      console.log("formulaire existant",prev_form)
      this.poseRadiateursForm = this.fb.group({
        radiateurs: this.fb.array([this.createposeRadiateurGroup()])
      });
      let formulaire_dimensions_length=prev_form.formulaire.radiateurs.length
      for(let i=0;i<(formulaire_dimensions_length-1);i++){
        this.addRadiateurGroup()
      }
      
      this.poseRadiateursForm.patchValue(prev_form.formulaire);

    } else {
      console.log("formulaire non existant")
      this.poseRadiateursForm = this.fb.group({
        radiateurs: this.fb.array([this.createposeRadiateurGroup()])
      });
      this.formulaire_dimensions=this.gestiondesdevisService.getFormulaireByName("etat-surfaces-pose-chauffage")
      this.formulaire_dimensions_length=this.formulaire_dimensions.formulaire.radiateurs.length
      for(let i=0;i<(this.formulaire_dimensions_length-1);i++){
        this.addRadiateurGroup()
      }
      console.log("longueur: ",this.formulaire_dimensions_length)
      console.log("formulaire: ",this.formulaire_dimensions)
    }
  this.load_gammes()
 
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
gammes_radiateurs:any
load_gammes(){
  this.userService.getGammesByTravailAndType(12,"radiateur").subscribe(
    (response: any) => {
      console.log('recuperation des gammes radiateur:', response);
      this.gammes_radiateurs=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes radiateur :', error);
    }
  );
}

}
