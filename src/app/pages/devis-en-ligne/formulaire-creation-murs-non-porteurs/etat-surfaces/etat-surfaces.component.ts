import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';

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




//formulaires des poses et deposes
poseMursNonPorteursForm: FormGroup;
formulaire_dimensions:any
formulaire_dimensions_length:number=0
// les murs_non_porteurs dynamiques du formulaire de pose murs_non_porteurs
get murs_non_porteurs(): FormArray {
  return this.poseMursNonPorteursForm.get('murs_non_porteurs') as FormArray;
}
isAutreType: boolean = false;
onTypeChange(value: string) {
  this.isAutreType = (value === 'Autre type de cloison');
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
constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService) {
  this.poseMursNonPorteursForm = this.fb.group({
    murs_non_porteurs: this.fb.array([this.createposeMurNonPorteurroup()])
  });
  this.formulaire_dimensions=this.gestiondesdevisService.getFormulaireByName("dimensions-creation-murs-non-porteurs--murs")
  this.formulaire_dimensions_length=this.formulaire_dimensions.formulaire.murs_non_porteurs.length
  for(let i=0;i<(this.formulaire_dimensions_length-1);i++){
    this.addMurNonPorteurroup()
  }
  console.log("longueur: ",this.formulaire_dimensions_length)
  console.log("formulaire: ",this.formulaire_dimensions)
 
 
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