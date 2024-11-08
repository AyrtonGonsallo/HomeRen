import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';

@Component({
  selector: 'app-gammes-produits-demolition-cloisons',
  templateUrl: './gammes-produits-demolition-cloisons.component.html',
  styleUrl: './gammes-produits-demolition-cloisons.component.css'
})
export class GammesProduitsDemolitionCloisonsComponent {
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
ouverturepartiellesForm: FormGroup;
mursnonporteursForm: FormGroup;
formulaire_dimensions:any
formulaire_dimensions1_length:number=0
formulaire_dimensions2_length:number=0
// les murs dynamiques du formulaire de pose murs
get ouverturepartielles(): FormArray {
  return this.ouverturepartiellesForm.get('ouverturepartielles') as FormArray;
}
get mursnonporteurs(): FormArray {
  return this.mursnonporteursForm.get('mursnonporteurs') as FormArray;
}

addouverturepartielleGroup(): void {
  if (this.ouverturepartielles.length < 4) {
    this.ouverturepartielles.push(this.createouverturepartielleGroup());
  }
}

removeouverturepartielleGroup(index: number): void {
  if (this.ouverturepartielles.length > 1) {
    this.ouverturepartielles.removeAt(index);
  }
}

addmursnonporteurGroup(): void {
  if (this.mursnonporteurs.length < 4) {
    this.mursnonporteurs.push(this.createmursnonporteurGroup());
  }
}

removemursnonporteurGroup(index: number): void {
  if (this.mursnonporteurs.length > 1) {
    this.mursnonporteurs.removeAt(index);
  }
}
onSubmitForm1(): boolean {
 
  if (this.mursnonporteursForm.valid) {
   return true
  }
  return false
}
onSubmitForm2(): boolean {
  if (this.ouverturepartiellesForm.valid) {
    return true
   }
   return false
}
onPoseMursSubmit(): void {
  this.formValidityChange.emit(this.onSubmitForm1() && this.onSubmitForm2());
  if (this.onSubmitForm1() && this.onSubmitForm2()) {
    const fusion = {
      ...this.mursnonporteursForm.value,  // Valeurs du formulaire du haut
      ...this.ouverturepartiellesForm.value, 
      "mursnonporteurs_choisis":this.mursnonporteurs_choisis,
      "ouverturepartielles_choisis":this.ouverturepartielles_choisis,
      "portes_choisis":this.portes_choisis
    };
   // console.log(fusion);
    this.gestiondesdevisService.addFormulaire('gammes-produits-murs-non-porteurs',3, fusion);
    // Envoyer les données au backend ou traiter comme nécessaire
    this.gestiondesdevisService.groupform('murs-non-porteurs',3, 'dimensions-murs-non-porteurs','etat-surfaces-murs-non-porteurs','gammes-produits-murs-non-porteurs')
    console.log(this.gestiondesdevisService.getFormulaireByName("murs-non-porteurs"));
  }
}
createouverturepartielleGroup(): FormGroup {
  return this.fb.group({
    cloison: ["", this.ouverturepartielles_choisis ? Validators.required : null],
  });
}
createmursnonporteurGroup(): FormGroup {
  return this.fb.group({
    materiaux: ["", this.mursnonporteurs_choisis ? Validators.required : null],
  });
}
mursnonporteurs_choisis = false
ouverturepartielles_choisis = false
portes_choisis=false
constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {
  
  
      console.log("formulaire non existant")
      
      this.formulaire_dimensions=this.gestiondesdevisService.getFormulaireByName("dimensions-murs-non-porteurs")
      this.formulaire_dimensions1_length=this.formulaire_dimensions.formulaire.mursNonporteurs.length
      this.formulaire_dimensions2_length=this.formulaire_dimensions.formulaire.ouverturePartielle.length
      this.mursnonporteurs_choisis = this.formulaire_dimensions.formulaire.tp1
      this.portes_choisis = this.formulaire_dimensions.formulaire.tp2
      this.ouverturepartielles_choisis = this.formulaire_dimensions.formulaire.tp3
      console.log("murs non porteurs: ", this.mursnonporteurs_choisis)
      console.log("ouverture partielle: ", this.ouverturepartielles_choisis)
     
        this.mursnonporteursForm = this.fb.group({
          mursnonporteurs: this.fb.array([this.createmursnonporteurGroup()])
        });
      
      
        this.ouverturepartiellesForm = this.fb.group({
          ouverturepartielles: this.fb.array([this.createouverturepartielleGroup()])
        });
      
      
      
      
        for(let i=0;i<(this.formulaire_dimensions1_length-1);i++){
          this.addmursnonporteurGroup()
        }
      
      
        for(let i=0;i<(this.formulaire_dimensions2_length-1);i++){
          this.addouverturepartielleGroup()
        }
      
      
      console.log("longueur murs: ",this.formulaire_dimensions1_length)
      console.log("longueur ouvertures: ",this.formulaire_dimensions2_length)
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


gammes_cloison:any
gammes_materiaux:any

load_gammes(){
  this.userService.getGammesByTravailAndType(3,"cloison").subscribe(
    (response: any) => {
      console.log('recuperation des gammes cloison:', response);
      this.gammes_cloison=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes cloison :', error);
    }
  );
  this.userService.getGammesByTravailAndType(3,"materiaux").subscribe(
    (response: any) => {
      console.log('recuperation des gammes materiaux:', response);
      this.gammes_materiaux=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes materiaux:', error);
    }
  );
}
}
