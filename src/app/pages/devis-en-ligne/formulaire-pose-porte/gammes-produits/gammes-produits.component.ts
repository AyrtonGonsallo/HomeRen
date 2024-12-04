import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-gammes-produits-pose-porte',
  templateUrl: './gammes-produits.component.html',
  styleUrl: '../formulaire-pose-porte.component.css'
})
export class PosePorteGammesProduitsComponent {
  baseurl=environment.imagesUrl
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

//formulaires des poses et deposes
posePortesForm: FormGroup;
formulaire_dimensions:any
formulaire_dimensions_length:number=0
// les portes dynamiques du formulaire de pose portes
get portes(): FormArray {
  return this.posePortesForm.get('portes') as FormArray;
}

addPortesGroup(): void {
  if (this.portes.length < 8) {
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
    //console.log(this.posePortesForm.value);
    // Envoyer les données au backend ou traiter comme nécessaire
    this.gestiondesdevisService.addFormulaire("dimensions-pose-portes",10,this.posePortesForm.value)
    this.gestiondesdevisService.addFormulaire("etat-surfaces-pose-portes",10,this.posePortesForm.value)
    this.gestiondesdevisService.addFormulaire("gammes-produits-pose-portes",10,this.posePortesForm.value)
     // Envoyer les données au backend ou traiter comme nécessaire
     this.gestiondesdevisService.groupform('pose-portes',10, 'dimensions-pose-portes','etat-surfaces-pose-portes','gammes-produits-pose-portes')
     console.log(this.gestiondesdevisService.getFormulaireByName("pose-portes"));
  }
}
createposePortesGroup(): FormGroup {
  return this.fb.group({
    gamme: ['', Validators.required],//select avec valeurs Porte alveolaire simple,Porte alveolaire double,Porte pleine double,Porte pleine simple, Porte vitrée simple,Porte vitrée double
    nature_porte: ['', Validators.required],// select avec valeurs a peindre, stratifiee, bois, autre 
    type_porte: ['', Validators.required],//select avec valeurs porte simple, porte double
    nature_mur: ['', Validators.required],//select avec valeurs a Finition à peindre, finition stratifiee,finition bois,autre. Preciser
    epaisseur_mur: ['', Validators.required],
  });
}

prec_formulaire_dimensions:any
constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {
  
  this.prec_formulaire_dimensions=this.gestiondesdevisService.getFormulaireByName("gammes-produits-pose-portes")
    if(this.prec_formulaire_dimensions){
      let form=this.prec_formulaire_dimensions.formulaire
      console.log("formulaire existant",form)
     
      

      // Handling `portes`
      this.posePortesForm = this.fb.group({
        portes: this.fb.array([])
      });
      const ouvertureArray = this.posePortesForm.get('portes') as FormArray;
      form.portes.forEach((porte: any) => {
        ouvertureArray.push(this.fb.group({
          gamme: [porte.gamme, Validators.required],//select avec valeurs Porte alveolaire simple,Porte alveolaire double,Porte pleine double,Porte pleine simple, Porte vitrée simple,Porte vitrée double
          nature_porte: [porte.nature_porte, Validators.required],// select avec valeurs a peindre, stratifiee, bois, autre 
          type_porte: [porte.type_porte, Validators.required],//select avec valeurs porte simple, porte double
          nature_mur: [porte.nature_mur, Validators.required],//select avec valeurs a Finition à peindre, finition stratifiee,finition bois,autre. Preciser
          epaisseur_mur: [porte.epaisseur_mur, ],//text area
        }));
      });

    }else{
      console.log("formulaire non existant")
      this.posePortesForm = this.fb.group({
        portes: this.fb.array([this.createposePortesGroup()])
      });
     
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



  
types_de_portes:any
natures_porte:any
gammes:any
load_gammes(){
  this.userService.getGammesByTravailAndType(10,"type-de-porte").subscribe(
    (response: any) => {
      console.log('recuperation des gammes type-de-porte:', response);
      this.types_de_portes=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes type-de-porte :', error);
    }
  );
  this.userService.getGammesByTravailAndType(10,"nature-porte").subscribe(
    (response: any) => {
      console.log('recuperation des gammes nature-porte:', response);
      this.natures_porte=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes nature-porte :', error);
    }
  );

  this.userService.getGammesByTravailAndType(10,"gamme-de-porte").subscribe(
    (response: any) => {
      console.log('recuperation des gammes :', response);
      this.gammes=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes  :', error);
    }
  );
  
}
}

 

