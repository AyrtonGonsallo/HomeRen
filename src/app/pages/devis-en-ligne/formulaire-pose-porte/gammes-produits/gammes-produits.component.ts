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
    type: ['', Validators.required],//select avec valeurs Porte alveolaire simple,Porte alveolaire double,Porte pleine double,Porte pleine simple, Porte vitrée simple,Porte vitrée double
    type2: ['', Validators.required],// select avec valeurs a peindre, stratifiee, bois, autre 
    type3: ['', Validators.required],//select avec valeurs porte simple, porte double
    finition: ['', Validators.required],//select avec valeurs a Finition à peindre, finition stratifiee,finition bois,autre. Preciser
    infos_comp_type: ['', ],//text area
    infos_comp_finition: ['', ],//text area
    creation_ou_remplacement: ['',Validators.required ],//boolean
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
          type: [porte.type, Validators.required],//select avec valeurs Porte alveolaire simple,Porte alveolaire double,Porte pleine double,Porte pleine simple, Porte vitrée simple,Porte vitrée double
          type2: [porte.type2, Validators.required],// select avec valeurs a peindre, stratifiee, bois, autre 
          type3: [porte.type3, Validators.required],//select avec valeurs porte simple, porte double
          finition: [porte.finition, Validators.required],//select avec valeurs a Finition à peindre, finition stratifiee,finition bois,autre. Preciser
          infos_comp_type: [porte.infos_comp_type, ],//text area
          infos_comp_finition: [porte.infos_comp_finition, ],//text area
          creation_ou_remplacement: [porte.creation_ou_remplacement,Validators.required ],//boolean
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
types_de_materiau:any
types_de_porte_finition:any
types_de_finitions:any
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
  this.userService.getGammesByTravailAndType(10,"type-de-materiau-porte").subscribe(
    (response: any) => {
      console.log('recuperation des gammes type-de-materiau-porte:', response);
      this.types_de_materiau=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes type-de-materiau-porte :', error);
    }
  );
  this.userService.getGammesByTravailAndType(10,"type-de-porte-finition").subscribe(
    (response: any) => {
      console.log('recuperation des gammes type-de-porte-finition:', response);
      this.types_de_porte_finition=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes type-de-porte-finition :', error);
    }
  );
  this.userService.getGammesByTravailAndType(10,"finition-de-porte").subscribe(
    (response: any) => {
      console.log('recuperation des gammes finition-de-porte:', response);
      this.types_de_finitions=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes finition-de-porte :', error);
    }
  );
}
}

 

