import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { environment } from '../../../../environments/environment';
import { Equipement } from '../../../../Models/Equipement';

@Component({
  selector: 'app-gammes-produits-renovation-electrique',
  templateUrl: './gammes-produits-renovation-electrique.component.html',
  styleUrl: './gammes-produits-renovation-electrique.component.css'
})
export class GammesProduitsRenovationElectriqueComponent {
  isclicked=false
  baseurl=environment.imagesUrl
  @Input() triggerSubmitGammesProduitsForm!: boolean;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitGammesProduitsForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitGammesProduitsForm)
      if(this.triggerSubmitGammesProduitsForm==true){
        this.isclicked=true
        this.onRenovationElectriqueSubmit();
      }
      
    }
  }
  @Output() formValidityChange = new EventEmitter<boolean>();
  renovationElectriqueForm: FormGroup;
  
  // le formulaire de pose plafond
  createRenovationElectriqueGroup(): FormGroup {
    return this.fb.group({
      chauffage_exist: [false,Validators.required],
      surface: ["",Validators.required],
      quantite_chauffage: [1,],
      renovation_conforme: [false,Validators.required],
      mise_en_securite: [false,Validators.required],

    });
  }



 
  onRenovationElectriqueSubmit(): void {
    this.formValidityChange.emit(this.renovationElectriqueForm.valid);
    if (this.renovationElectriqueForm.invalid) {
      return;
    }
    if (this.renovationElectriqueForm.valid) {
      const fusion = {
        ...this.renovationElectriqueForm.value,  // Valeurs du formulaire du haut
       
      };
      console.log(fusion);
      // Envoyer les données au backend ou traiter comme nécessaire
      this.gestiondesdevisService.addFormulaire('dimensions-renovation-electrique',15, fusion);
      this.gestiondesdevisService.addFormulaire('etat-surfaces-renovation-electrique',15, fusion);
      this.gestiondesdevisService.addFormulaire('gammes-produits-renovation-electrique',15, fusion);
    // Envoyer les données au backend ou traiter comme nécessaire
    this.gestiondesdevisService.groupform('renovation-electrique',15, 'dimensions-renovation-electrique','etat-surfaces-renovation-electrique','gammes-produits-renovation-electrique')
    console.log(this.gestiondesdevisService.getFormulaireByName("renovation-electrique"));
  
    }
  }
  
  prec_formulaire_gamme:any
  constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {
    this.load_gammes()
    
    this.prec_formulaire_gamme = this.gestiondesdevisService.getFormulaireByName('gammes-produits-renovation-electrique');
    if (this.prec_formulaire_gamme) {
      
      let form=this.prec_formulaire_gamme.formulaire
      console.log("formulaire existant",form)
      this.renovationElectriqueForm = this.fb.group({
        chauffage_exist: [form.chauffage_exist,],
        surface: [form.surface,],
        quantite_chauffage: [form.quantite_chauffage,],
        renovation_conforme: [form.renovation_conforme,Validators.required],
        mise_en_securite: [form.mise_en_securite,Validators.required],
      });

     
    } else {
      console.log("formulaire non existant")
      this.renovationElectriqueForm = this.createRenovationElectriqueGroup();
     
    }
  }
 
 
 
  gammes_materiaux:any
  load_gammes(){

    this.userService.getGammesByTravailAndType(15,"materiaux").subscribe(
      (response: any) => {
        console.log('recuperation des gammes materiaux:', response);
        this.gammes_materiaux=response
      },
      (error: any) => {
        console.error('Erreur lors de la recuperation des  gammes_materiaux :', error);
      }
    );
    
  
  }


  }
  
