import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { environment } from '../../../../environments/environment';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';

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
        this.onSubmit();
        this.isclicked=true
      }
      
    }
  }


  onSubmit(): void {
    var bool=this.onPoseMursNonPorteursSubmit()  

    if(this.is_active_Tp3){
      bool=this.onPoseMursNonPorteursSubmit()  && this.onPosePortesSubmit() 

    }

    this.formValidityChange.emit(bool);
    if (bool) {
      const fusion = {
        ...this.portesForm.value,  // Valeurs du formulaire du haut
        ...this.poseMursNonPorteursForm.value,
        "has_portes":this.is_active_Tp3,
      };
      console.log("booleen",bool);
      console.log("formulaire",fusion);
      this.gestiondesdevisService.addFormulaire('dimensions-creation-murs-non-porteurs--murs',4, fusion);
      this.gestiondesdevisService.addFormulaire('etat-surfaces-creation-murs-non-porteurs--murs',4, fusion);

      this.gestiondesdevisService.addFormulaire("gammes-produits-creation-murs-non-porteurs--portes",4,fusion)
      // Envoyer les données au backend ou traiter comme nécessaire
      this.gestiondesdevisService.groupform('creation-murs-non-porteurs',4, 'dimensions-creation-murs-non-porteurs--murs','etat-surfaces-creation-murs-non-porteurs--murs','gammes-produits-creation-murs-non-porteurs--portes')
      console.log(this.gestiondesdevisService.getFormulaireByName("creation-murs-non-porteurs"));
      // Envoyer les données au backend ou traiter comme nécessaire
    }
  }


  @Output() formValidityChange = new EventEmitter<boolean>();

  glob_err_form1:string=""
  exist_glob_err_form1:boolean=false
  glob_err_form2:string=""
  exist_glob_err_form2:boolean=false
  is_active_Tp3=false
  active_Tp3(){
    this.is_active_Tp3=!this.is_active_Tp3
    this.updateValidatorsForPortes()
  }
  
//formulaires des poses et deposes
poseMursNonPorteursForm: FormGroup;
portesForm: FormGroup;
get portes(): FormArray {
  return this.portesForm.get('portes') as FormArray;
}
createportesGroup(): FormGroup {
  return this.fb.group({
    gamme: ['', this.is_active_Tp3 ? Validators.required : null],
    largeur: ['', this.is_active_Tp3 ? Validators.required : null],
  });
}
addportesGroup(): void {
  if (this.portes.length < this.murs_non_porteurs.length) {
    this.portes.push(this.createportesGroup());
  }
  this.updateValidatorsForPortes()
}
updateValidatorsForPortes(): void {
  this.portes.controls.forEach((group: AbstractControl) => {
    if (group instanceof FormGroup) {
      Object.keys(group.controls).forEach((key) => {
        const control = group.get(key);
        if (control) {
          control.setValidators(
            this.is_active_Tp3 ? Validators.required : null
          );
          control.updateValueAndValidity();
        }
      });
    }
  });
}
removeportesGroup(index: number): void {
  if (this.portes.length > 1) {
    this.portes.removeAt(index);
  }
}
 
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

onPoseMursNonPorteursSubmit(): boolean {
 
  this.glob_err_form1=""
  const murs_non_porteursArray = this.poseMursNonPorteursForm.get('murs_non_porteurs') as FormArray;
  let res=true
  for (let i = 0; i < murs_non_porteursArray.length; i++) {
    const group = murs_non_porteursArray.at(i) as FormGroup;
    const controls = group.controls;

    if (
      controls['longueur'].value === '' ||
      controls['hauteur'].value === '' ||
      controls['epaisseur'].value === '' ||
      controls['longueur'].value > 3000 || controls['longueur'].value < 100 ||
      controls['hauteur'].value > 500 || controls['hauteur'].value < 100
    ) {
      //console.error(`Tous les champs doivent être remplis pour la démolition partielle du mur ${i + 1}`);
      //group.markAllAsTouched();
      this.exist_glob_err_form1=true
      this.glob_err_form1+=`Tous les champs doivent être remplis pour le mur ${i + 1}. `
      res=res && false
    }
  }



  return res;
}
onPosePortesSubmit(): boolean {
   this.glob_err_form2=""
  const portesArray = this.portesForm.get('portes') as FormArray;
  let res=true
  for (let i = 0; i < portesArray.length; i++) {
    const group = portesArray.at(i) as FormGroup;
    const controls = group.controls;

    if (
      controls['gamme'].value === '' ||
      controls['largeur'].value === ''
    ) {
      //console.error(`Tous les champs doivent être remplis pour la démolition partielle du mur ${i + 1}`);
      //group.markAllAsTouched();
      this.exist_glob_err_form2=true
      this.glob_err_form2+=`Tous les champs doivent être remplis pour la porte ${i + 1}. `
      res=res && false
    }
  }

 

  return res;
}
createposeMurNonPorteurroup(): FormGroup {
  return this.fb.group({
    hauteur: ['',  [Validators.required, Validators.min(100), Validators.max(500)]],
    longueur: ['',  [Validators.required, Validators.min(100), Validators.max(3000)]],
    epaisseur: ['', Validators.required],
  });
}

prec_formulaire_dimensions:any
constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {
 
  this.load_types()
  this.prec_formulaire_dimensions=this.gestiondesdevisService.getFormulaireByName("dimensions-creation-murs-non-porteurs--murs")
  if(this.prec_formulaire_dimensions){
    let form=this.prec_formulaire_dimensions.formulaire

    this.is_active_Tp3=form.has_portes



    this.poseMursNonPorteursForm = this.fb.group({
      murs_non_porteurs: this.fb.array([])
    });
    const mursArray = this.poseMursNonPorteursForm.get('murs_non_porteurs') as FormArray;
    form.murs_non_porteurs.forEach((mursNonporteur: any) => {
      mursArray.push(this.fb.group({
        longueur: [mursNonporteur.longueur, Validators.required ],
        hauteur: [mursNonporteur.hauteur, Validators.required],
        epaisseur: [mursNonporteur.epaisseur, Validators.required],
      }));
    });

    this.portesForm = this.fb.group({
      portes: this.fb.array([])
    });
    const porteArray = this.portesForm.get('portes') as FormArray;
    form.portes.forEach((porte: any) => {
        porteArray.push(this.fb.group({
          gamme: [porte.gamme, this.is_active_Tp3 ? Validators.required : null],
          largeur: [porte.largeur, this.is_active_Tp3 ? Validators.required : null],
         
        }));
    });


  }else{
    this.poseMursNonPorteursForm = this.fb.group({
      murs_non_porteurs: this.fb.array([this.createposeMurNonPorteurroup()])
    });
    this.portesForm = this.fb.group({
      portes: this.fb.array([this.createportesGroup()])
    });
  }

  
 
 
}


type_epaisseur:any
load_types(){
  this.userService.getGammesByTravailAndTypeOrdered(4,"epaisseur-creation-mur-non-porteur").subscribe(
    (response: any) => {
      console.log('recuperation des types service-depose-murs	:', response);
      this.type_epaisseur=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des types service-depose-murs	 :', error);
    }
  );
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

 
blockComma(event: KeyboardEvent) {
  if (event.key === ',') {
    event.preventDefault();
  }
}

}