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
      qte_prises: ["",],
      qte_eclairage_profond: ["",],
      qte_eclairage_applique: ["",],
      qte_convecteur_electrique: ["",],
    });
  }
  get getappareils_a_ajouter_form(): FormArray {
    return this.appareils_a_ajouter_form.get('appareils_electrique') as FormArray;
  }
  onAppareilsAAjouterSubmit(): boolean {
    this.formValidityChange.emit(this.appareils_a_ajouter_form.valid);
    if (this.appareils_a_ajouter_form.invalid) {
      this.markFormGroupTouched(this.appareils_a_ajouter_form);
      return false;
    }
    return this.appareils_a_ajouter_form.valid
   
  }

  onAppareilsARemplacerSubmit(): boolean {
    this.formValidityChange.emit(this.appareils_a_remplacer_form.valid);
    if (this.appareils_a_remplacer_form.invalid) {
      this.markFormGroupTouched(this.appareils_a_remplacer_form);
      return false;
    }
    return this.appareils_a_remplacer_form.valid;
    
  }

  submit(): void {
    let boolajouter=this.onAppareilsAAjouterSubmit()
    let boolremplacer=this.onAppareilsARemplacerSubmit()
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

  ngOnInit(): void {
    this.loadAppareils()
  }
  loadAppareils(){
    
    this.userService.getEquipementsByType ("electrique").subscribe(
      (response: Equipement[]) => {
        this.appareils_electrique = response.filter(equipement => equipement.ModeleEquipements && equipement.ModeleEquipements.length > 0 && equipement.ID != 27);
        console.log("réponse de la requette  getEquipementsByType:electrique",this.appareils_electrique);
        this.appareils_electrique.forEach(appareil => {
        const modeleEquipements = appareil.ModeleEquipements;
        
          // Créer un FormGroup pour chaque appareil
          const appareilGroup = this.fb.group({});
              
         
            appareilGroup.addControl("nombre", this.fb.control("", Validators.required));
            appareilGroup.addControl("modele", this.fb.control("", Validators.required));
           

          // Ajouter le FormGroup de l'appareil au FormArray
          (this.appareils_a_ajouter_form.get('appareils_electrique') as FormArray).push(appareilGroup);
        
          
        });
       
      },
      (error) => {
        console.error('Erreur lors de la recuperation des  getEquipementsByPiece:salledebain :', error);
      }
    );
  }
  


  }
  