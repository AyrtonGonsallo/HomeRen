import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { Equipement } from '../../../../Models/Equipement';
import { app } from '../../../../../../server';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-gammes-produits-pose-electricite',
  templateUrl: './gammes-produits.component.html',
  styleUrl: '../formulaire-pose-electricite.component.css'
})
export class PoseElectriciteGammesProduitsComponent {
  isclicked=false

  @Input() triggerSubmitGammesProduitsForm!: boolean;
modele: any;
appareilGroup: any;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitGammesProduitsForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitGammesProduitsForm)
      if(this.triggerSubmitGammesProduitsForm==true){
        
          this.submit()
        
        this.isclicked=true
      }
      
    }
  }
  @Output() formValidityChange = new EventEmitter<boolean>();
  disabled = true;
  baseurl=environment.imagesUrl
  @Input() selectedPiece: any; // Déclaration de l'entrée selectedPiece
  appareils_a_ajouter_form: FormGroup;
  appareils_a_remplacer_form: FormGroup;
  

  createAppareilsAAjouterGroup(): FormGroup {
    return this.fb.group({
      passage_fils_electique: [false, ],//boolean
      appareils_electrique: this.fb.array([])
    });
  }
  createAppareilsARemplacerGroup(): FormGroup {
    return this.fb.group({
      qte_prises: [0,],
      qte_eclairage_profond: [0,],
      qte_eclairage_applique: [0,],
      qte_convecteur_electrique: [0,],
    });
  }
  get getappareils_a_ajouter_form(): FormArray {
    return this.appareils_a_ajouter_form.get('appareils_electrique') as FormArray;
  }
  onAppareilsAAjouterSubmit(): boolean {
    
    if (this.appareils_a_ajouter_form.invalid) {
      this.markFormGroupTouched(this.appareils_a_ajouter_form);
      return false;
    }
    return this.appareils_a_ajouter_form.valid
   
  }

  onAppareilsARemplacerSubmit(): boolean {
    if (this.appareils_a_remplacer_form.invalid) {
      this.markFormGroupTouched(this.appareils_a_remplacer_form);
      return false;
    }
    return this.appareils_a_remplacer_form.valid;
    
  }

  submit(): void {
    this.isclicked=true
    let boolajouter=this.onAppareilsAAjouterSubmit()
    let boolremplacer=this.onAppareilsARemplacerSubmit()
    console.log("etat form a rempl",boolremplacer)
    console.log("etat form a ajouter",boolajouter)
    if (boolajouter && boolremplacer) {
      const fusionFormValues = {
        ...this.appareils_a_ajouter_form.value,
        ...this.appareils_a_remplacer_form.value
      };
      this.gestiondesdevisService.addFormulaire("dimensions-pose-electricite",13,fusionFormValues)
      this.gestiondesdevisService.addFormulaire("etat-surfaces-pose-electricite",13,fusionFormValues)
      this.gestiondesdevisService.addFormulaire("gammes-produits-pose-electricite",13,fusionFormValues)
    // Envoyer les données au backend ou traiter comme nécessaire
    this.gestiondesdevisService.groupform('pose-electricite',13, 'dimensions-pose-electricite','etat-surfaces-pose-electricite','gammes-produits-pose-electricite')
    console.log(this.gestiondesdevisService.getFormulaireByName("pose-electricite"));
      // Envoyer les données au backend ou traiter comme nécessaire
    }
    this.formValidityChange.emit(boolajouter && boolremplacer);
  }
  
  constructor(private fb: FormBuilder,private userService: ApiConceptsEtTravauxService,private gestiondesdevisService: GestionDesDevisService) {
    
 
    this.appareils_a_ajouter_form = this.createAppareilsAAjouterGroup();
    this.appareils_a_remplacer_form = this.createAppareilsARemplacerGroup();
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

  appareils_electrique:Equipement[]=[]
  getAppareilActiveState(index: number): boolean {
    return (this.appareils_a_ajouter_form.get('appareils_electrique') as FormArray)?.at(index).get('active')?.value;
  }
  getAppareilNombreState(index: number): boolean {
    const appareilsFormArray = this.appareils_a_ajouter_form.get('appareils_electrique') as FormArray;
    const nombreValue = appareilsFormArray.at(index).get('nombre')?.value;
    const modeleValue = appareilsFormArray.at(index).get('modele')?.value;
    let res=nombreValue !== null && nombreValue !== 0 && modeleValue !== null && modeleValue !== '';
    // Vérifie que les valeurs de 'nombre' et 'modele' ne sont pas vides ou nulles
    return !res;
  }
  
  ngOnInit(): void {
    this.loadAppareils()
  }
  loadAppareils(){
    
    this.userService.getEquipementsByType ("electrique").subscribe(
      (response: Equipement[]) => {
        this.appareils_electrique = response.filter(equipement => equipement.ModeleEquipements && equipement.ModeleEquipements.length > 0 && equipement.ID != 27);
        console.log("réponse de la requette  getEquipementsByType:electrique",this.appareils_electrique);
        let i=0
        this.appareils_electrique.forEach(appareil => {
        const modeleEquipements = appareil.ModeleEquipements;
        
          // Créer un FormGroup pour chaque appareil
          const appareilGroup = this.fb.group({});
              
         
            appareilGroup.addControl("nombre", this.fb.control(0, ));
            appareilGroup.addControl("active", this.fb.control(false, ));
            appareilGroup.addControl("modele", this.fb.control("", ));
           

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
          (this.appareils_a_ajouter_form.get('appareils_electrique') as FormArray).push(appareilGroup);
        
          i++
        });
       
      },
      (error) => {
        console.error('Erreur lors de la recuperation des  getEquipementsByPiece:salledebain :', error);
      }
    );
  }
  


  }
  