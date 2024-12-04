import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-etat-surfaces-creation-murs-non-porteurs',
  templateUrl: './etat-surfaces.component.html',
  styleUrl: '../formulaire-creation-murs-non-porteurs.component.css'
})
export class MursNonPorteursEtatSurfacesComponent {
  @Input() triggerSubmitEtatSurfacesForm!: boolean;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitEtatSurfacesForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitEtatSurfacesForm)
      if(this.triggerSubmitEtatSurfacesForm==true){
        this.isclicked=true
        this.onPoseMursNonPorteursSubmit();
      }
      
    }
  }
  @Output() formValidityChange = new EventEmitter<boolean>();
  disabled = true;
  isclicked =false

  baseurl=environment.imagesUrl


//formulaires des poses et deposes
poseMursNonPorteursForm: FormGroup;
formulaire_dimensions:any
formulaire_dimensions_length:number=0
// les murs_non_porteurs dynamiques du formulaire de pose murs_non_porteurs
get murs_non_porteurs(): FormArray {
  return this.poseMursNonPorteursForm.get('murs_non_porteurs') as FormArray;
}
 // Check if "Autre type de cloison" is selected
 isAutreType(index: number): boolean {
  const mur = this.murs_non_porteurs.at(index);
  return mur.get('type_cloison')?.value === '0:0:autre';
}

addMurNonPorteurroup(): void {
  if (this.murs_non_porteurs.length < 5) {
    this.murs_non_porteurs.push(this.createposeMurNonPorteurroup());
  }
}

removeMurNonPorteurroup(index: number): void {
  if (this.murs_non_porteurs.length > 1) {
    this.murs_non_porteurs.removeAt(index);
  }
}

onPoseMursNonPorteursSubmit(): void {
  this.formValidityChange.emit(this.poseMursNonPorteursForm.valid);
  if (this.poseMursNonPorteursForm.valid) {
    console.log(this.poseMursNonPorteursForm.value);
    // Envoyer les données au backend ou traiter comme nécessaire
    this.gestiondesdevisService.addFormulaire("etat-surfaces-creation-murs-non-porteurs--murs",4,this.poseMursNonPorteursForm.value)
  }
}
createposeMurNonPorteurroup(): FormGroup {
  return this.fb.group({
    
    type_cloison: ['', Validators.required],
    autre_type_cloison: ['', ],
  });
}
prec_formulaire_etat_surfaces:any
constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {

  this.prec_formulaire_etat_surfaces=this.gestiondesdevisService.getFormulaireByName("etat-surfaces-creation-murs-non-porteurs--murs")
  if(this.prec_formulaire_etat_surfaces){
    let form=this.prec_formulaire_etat_surfaces.formulaire
    this.poseMursNonPorteursForm = this.fb.group({
      murs_non_porteurs: this.fb.array([])
    });
    const mursArray = this.poseMursNonPorteursForm.get('murs_non_porteurs') as FormArray;
    form.murs_non_porteurs.forEach((mursNonporteur: any) => {
      mursArray.push(this.fb.group({
        type_cloison: [mursNonporteur.type_cloison, Validators.required ],
        autre_type_cloison: [mursNonporteur.autre_type_cloison, ],
      }));
    });
    this.load_types()

  }else{
    this.poseMursNonPorteursForm = this.fb.group({
      murs_non_porteurs: this.fb.array([this.createposeMurNonPorteurroup()])
    });
    this.formulaire_dimensions=this.gestiondesdevisService.getFormulaireByName("dimensions-creation-murs-non-porteurs--murs")
    this.formulaire_dimensions_length=this.formulaire_dimensions.formulaire.murs_non_porteurs.length
    for(let i=0;i<(this.formulaire_dimensions_length-1);i++){
      this.addMurNonPorteurroup()
    }
    this.load_types()
    console.log("longueur: ",this.formulaire_dimensions_length)
    console.log("formulaire: ",this.formulaire_dimensions)
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

types:any[]=[]
load_types(){
  this.userService.getGammesByTravailAndType(4,"type-de-cloison-murs-non-porteurs").subscribe(
    (response: any) => {
      console.log('recuperation des types type-de-cloison-murs-non-porteurs:', response);
      this.types=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des types type-de-cloison-murs-non-porteurs :', error);
    }
  );
}

}