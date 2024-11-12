import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dimensions-creation-murs-non-porteurs',
  templateUrl: './dimensions.component.html',
  styleUrl: '../formulaire-creation-murs-non-porteurs.component.css'
})
export class MursNonPorteursDimensionsComponent {
  baseurl=environment.imagesUrl
  isclicked=false
  @Input() triggerSubmitDimensionForm!: boolean;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitDimensionForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitDimensionForm)
      if(this.triggerSubmitDimensionForm==true){
        this.onPoseMursNonPorteursSubmit();
        this.isclicked=true
      }
      
    }
  }
  @Output() formValidityChange = new EventEmitter<boolean>();



//formulaires des poses et deposes
poseMursNonPorteursForm: FormGroup;
 
// les murs_non_porteurs dynamiques du formulaire de pose murs_non_porteurs
get murs_non_porteurs(): FormArray {
  return this.poseMursNonPorteursForm.get('murs_non_porteurs') as FormArray;
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
    this.gestiondesdevisService.addFormulaire("dimensions-creation-murs-non-porteurs--murs",4,this.poseMursNonPorteursForm.value)
  }
}
createposeMurNonPorteurroup(): FormGroup {
  return this.fb.group({
    hauteur: ['', Validators.required],
    surface: ['', Validators.required],
  });
}

prec_formulaire_dimensions:any
constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService) {
  this.prec_formulaire_dimensions=this.gestiondesdevisService.getFormulaireByName("dimensions-creation-murs-non-porteurs--murs")
  if(this.prec_formulaire_dimensions){
    let form=this.prec_formulaire_dimensions.formulaire
    this.poseMursNonPorteursForm = this.fb.group({
      murs_non_porteurs: this.fb.array([])
    });
    const mursArray = this.poseMursNonPorteursForm.get('murs_non_porteurs') as FormArray;
    form.murs_non_porteurs.forEach((mursNonporteur: any) => {
      mursArray.push(this.fb.group({
        surface: [mursNonporteur.surface, Validators.required ],
        hauteur: [mursNonporteur.hauteur, Validators.required],
      }));
    });


  }else{
    this.poseMursNonPorteursForm = this.fb.group({
      murs_non_porteurs: this.fb.array([this.createposeMurNonPorteurroup()])
    });
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


 


}