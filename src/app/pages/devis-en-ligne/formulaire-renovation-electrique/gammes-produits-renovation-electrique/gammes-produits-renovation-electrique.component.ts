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
      appareils_electrique: this.fb.array([]),
      chauffage_exist: [false,]
    });
  }
  get getrenovationElectrique_form(): FormArray {
    return this.renovationElectriqueForm.get('appareils_electrique') as FormArray;
  }
  onRenovationElectriqueSubmit(): void {
    this.formValidityChange.emit(this.renovationElectriqueForm.valid);
    if (this.renovationElectriqueForm.invalid) {
      return;
    }
    if (this.renovationElectriqueForm.valid) {
      //console.log(this.renovationElectriqueForm.value);
      // Envoyer les données au backend ou traiter comme nécessaire
      this.gestiondesdevisService.addFormulaire('dimensions-renovation-electrique',15, this.renovationElectriqueForm.value);
      this.gestiondesdevisService.addFormulaire('etat-surfaces-renovation-electrique',15, this.renovationElectriqueForm.value);
      this.gestiondesdevisService.addFormulaire('gammes-produits-renovation-electrique',15, this.renovationElectriqueForm.value);
    // Envoyer les données au backend ou traiter comme nécessaire
    this.gestiondesdevisService.groupform('renovation-electrique',15, 'dimensions-renovation-electrique','etat-surfaces-renovation-electrique','gammes-produits-renovation-electrique')
    console.log(this.gestiondesdevisService.getFormulaireByName("renovation-electrique"));
  
    }
  }
  
  constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {
    this.load_gammes()
    const prev_form = this.gestiondesdevisService.getFormulaireByName('gammes-produits-renovation-electrique');
    if (prev_form) {
      console.log("formulaire existant",prev_form)
      this.renovationElectriqueForm = this.createRenovationElectriqueGroup();
      this.renovationElectriqueForm.patchValue(prev_form.formulaire);

    } else {
      console.log("formulaire non existant")
      this.renovationElectriqueForm = this.createRenovationElectriqueGroup();
    }
  }
  getAppareilActiveState(index: number): boolean {
    return (this.renovationElectriqueForm.get('appareils_electrique') as FormArray)?.at(index).get('active')?.value;
  }
  getAppareilNombreState(index: number): boolean {
    const appareilsFormArray = this.renovationElectriqueForm.get('appareils_electrique') as FormArray;
    const nombreValue = appareilsFormArray.at(index).get('nombre')?.value;
    const modeleValue = appareilsFormArray.at(index).get('modele')?.value;
    let res=nombreValue !== null && nombreValue !== 0 && modeleValue !== null && modeleValue !== '';
    // Vérifie que les valeurs de 'nombre' et 'modele' ne sont pas vides ou nulles
    return !res;
  }
  appareils_electrique:Equipement[]=[]
  load_gammes(){
    this.userService.getEquipementsByType ("electrique").subscribe(
      (response: Equipement[]) => {
        this.appareils_electrique = response.filter(equipement => 
          equipement.ModeleEquipements && 
          equipement.ModeleEquipements.length > 0 &&
          [24, 25, 26, 27].includes(equipement.ID)
        );        
        console.log("réponse de la requette  getEquipementsByType:electrique",this.appareils_electrique);
        this.appareils_electrique.forEach(appareil => {
          
            const modeleEquipements = appareil.ModeleEquipements;
            // Créer un FormGroup pour chaque appareil
            const appareilGroup = this.fb.group({});
            appareilGroup.addControl("nombre", this.fb.control(0, ));
            appareilGroup.addControl("modele", this.fb.control("", ));
            appareilGroup.addControl("active", this.fb.control(false, ));
           

            // Obtenez les contrôles pour pouvoir les manipuler
            const nombreControl = appareilGroup.get('nombre');
            const modeleControl = appareilGroup.get('modele');
            const activeControl = appareilGroup.get('active');

            // Abonnez-vous aux changements de la valeur de 'active'
            activeControl?.valueChanges.subscribe((isActive: boolean) => {
              if (isActive) {
                // Si 'active' est true, ajouter les validateurs
                nombreControl?.setValidators(Validators.required);
                modeleControl?.setValidators(Validators.required);
              } else {
                // Sinon, supprimer les validateurs
                nombreControl?.clearValidators();
                modeleControl?.clearValidators();
              }
              // Mettre à jour la validation pour forcer la vérification des erreurs
              nombreControl?.updateValueAndValidity();
              modeleControl?.updateValueAndValidity();
            });
            // Ajouter le FormGroup de l'appareil au FormArray
            (this.renovationElectriqueForm.get('appareils_electrique') as FormArray).push(appareilGroup);
          
            
        });
       
      },
      (error) => {
        console.error('Erreur lors de la recuperation des  getEquipementsByPiece:salledebain :', error);
      }
    );
  
  }


  }
  
