import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';

@Component({
  selector: 'app-gammes-produits-creation-murs-non-porteurs',
  templateUrl: './gammes-produits.component.html',
  styleUrl: '../formulaire-creation-murs-non-porteurs.component.css'
})
export class MursNonPorteursGammesProduitsComponent {
  @Input() triggerSubmitGammesProduitsForm!: boolean;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitGammesProduitsForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitGammesProduitsForm)
      if(this.triggerSubmitGammesProduitsForm==true){
        this.isclicked=true
        this.onPosePortesSubmit();
      }
      
    }
  }
  @Output() formValidityChange = new EventEmitter<boolean>();
  disabled = true;
  radioValue = 'A';
  isclicked=false
  formulaire_dimensions:any
  formulaire_dimensions_length:number=0
  prec_formulaire_gammes:any
constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {
 
  this.prec_formulaire_gammes=this.gestiondesdevisService.getFormulaireByName("gammes-produits-creation-murs-non-porteurs--portes")
  if(this.prec_formulaire_gammes){
    let form=this.prec_formulaire_gammes.formulaire
    this.posePortesForm = this.fb.group({
      portes: this.fb.array([])
    });
    const mursArray = this.posePortesForm.get('portes') as FormArray;
    form.portes.forEach((porte: any) => {
      mursArray.push(this.fb.group({
        type: [porte.type, Validators.required ],
      }));
    });

    this.load_types()
  }else{ 
    this.posePortesForm = this.fb.group({
      portes: this.fb.array([this.createposePortesGroup()])
    });
    this.formulaire_dimensions=this.gestiondesdevisService.getFormulaireByName("dimensions-creation-murs-non-porteurs--murs")
    this.formulaire_dimensions_length=this.formulaire_dimensions.formulaire.portes.length
    for(let i=0;i<(this.formulaire_dimensions_length-1);i++){
      this.addPortesGroup()
    }
   
    this.load_types()
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

//portes 
//formulaires des poses et deposes
posePortesForm: FormGroup;
 
// les portes dynamiques du formulaire de pose portes
get portes(): FormArray {
  return this.posePortesForm.get('portes') as FormArray;
}

addPortesGroup(): void {
  if (this.portes.length < 5) {
    this.portes.push(this.createposePortesGroup());
  }
}

removePortesGroup(index: number): void {
  if (this.portes.length > 1) {
    this.portes.removeAt(index);
  }
}

onPosePortesSubmit(): void {
  this.formValidityChange.emit(this.posePortesForm.valid);
  if (this.posePortesForm.valid) {
    console.log(this.posePortesForm.value);
    // Envoyer les données au backend ou traiter comme nécessaire
    
    this.gestiondesdevisService.addFormulaire("gammes-produits-creation-murs-non-porteurs--portes",4,this.posePortesForm.value)
    // Envoyer les données au backend ou traiter comme nécessaire
    this.gestiondesdevisService.groupform('creation-murs-non-porteurs',4, 'dimensions-creation-murs-non-porteurs--murs','etat-surfaces-creation-murs-non-porteurs--murs','gammes-produits-creation-murs-non-porteurs--portes')
    console.log(this.gestiondesdevisService.getFormulaireByName("creation-murs-non-porteurs"));
  }
}
createposePortesGroup(): FormGroup {
  return this.fb.group({
    type: ['', Validators.required],//select avec valeurs Porte alveolaire simple,Porte alveolaire double,Porte pleine double,Porte pleine simple, Porte vitrée simple,Porte vitrée double
   
  });
}

types:any[]=[]
load_types(){
  this.userService.getGammesByTravailAndType(4,"type-de-porte-creation-murs-non-porteurs").subscribe(
    (response: any) => {
      console.log('recuperation des types type-de-porte-creation-murs-non-porteurs:', response);
      this.types=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des types type-de-porte-creation-murs-non-porteurs :', error);
    }
  );
}


}