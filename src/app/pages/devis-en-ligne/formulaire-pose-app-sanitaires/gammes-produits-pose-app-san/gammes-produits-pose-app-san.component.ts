import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { Equipement } from '../../../../Models/Equipement';

@Component({
  selector: 'app-gammes-produits-pose-app-san',
  templateUrl: './gammes-produits-pose-app-san.component.html',
  styleUrl: './gammes-produits-pose-app-san.component.css'
})
export class GammesProduitsPoseAppSanComponent {
  isclicked=false

  @Input() triggerSubmitGammesProduitsForm!: boolean;
modele: any;
appareilGroup: any;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitGammesProduitsForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitGammesProduitsForm)
      if(this.triggerSubmitGammesProduitsForm==true){
        
          this.onPoseSalleDeBainSubmit()
        
        this.isclicked=true
      }
      
    }
  }
  @Output() formValidityChange = new EventEmitter<boolean>();
  disabled = true;
  baseurl=environment.imagesUrl
  @Input() selectedPiece: any; // Déclaration de l'entrée selectedPiece
  poseCuisineForm: FormGroup;
  poseSalleDeBainForm: FormGroup;
  // le formulaire de pose plafond
  createPoseCuisineGroup(): FormGroup {
    return this.fb.group({
      appareils_cuisine: this.fb.array([])
    });
  }
  

  createPoseSalleDeBainGroup(): FormGroup {
    return this.fb.group({
      appareils_salle_de_bain: this.fb.array([])
    });
  }
  get getposeSalleDeBainForm(): FormArray {
    return this.poseSalleDeBainForm.get('appareils_salle_de_bain') as FormArray;
  }
  onPoseSalleDeBainSubmit(): void {
    this.formValidityChange.emit(this.poseSalleDeBainForm.valid);
    if (this.poseSalleDeBainForm.invalid) {
      this.markFormGroupTouched(this.poseSalleDeBainForm);
      return;
    }
    if (this.poseSalleDeBainForm.valid) {
      this.gestiondesdevisService.addFormulaire("dimensions-pose-app-san",16,this.poseSalleDeBainForm.value)
      this.gestiondesdevisService.addFormulaire("etat-surfaces-pose-app-san",16,this.poseSalleDeBainForm.value)
      this.gestiondesdevisService.addFormulaire("gammes-produits-pose-app-san",16,this.poseSalleDeBainForm.value)
    // Envoyer les données au backend ou traiter comme nécessaire
    this.gestiondesdevisService.groupform('pose-app-san',16, 'dimensions-pose-app-san','etat-surfaces-pose-app-san','gammes-produits-pose-app-san')
    console.log(this.gestiondesdevisService.getFormulaireByName("pose-app-san"));
      // Envoyer les données au backend ou traiter comme nécessaire
    }
  }
  
  constructor(private fb: FormBuilder,private userService: ApiConceptsEtTravauxService,private gestiondesdevisService: GestionDesDevisService) {
    
    this.poseCuisineForm = this.createPoseCuisineGroup();
    this.poseSalleDeBainForm = this.createPoseSalleDeBainGroup();
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

  appareils_cuisine:Equipement[]=[]
  appareils_salle_de_bain:Equipement[]=[]

  ngOnInit(): void {
    this.loadAppareils()
  }
  loadAppareils(){
    
    this.userService.getEquipementsByPiece(5).subscribe(
      (response: Equipement[]) => {
        this.appareils_salle_de_bain = response.filter(equipement => equipement.ModeleEquipements && equipement.ModeleEquipements.length > 0);
        console.log("réponse de la requette  getEquipementsByPiece:salledebain",this.appareils_salle_de_bain);
        this.appareils_salle_de_bain.forEach(appareil => {
        const modeleEquipements = appareil.ModeleEquipements;
        
          // Créer un FormGroup pour chaque appareil
          const appareilGroup = this.fb.group({});
              
         
            appareilGroup.addControl("depose", this.fb.control(false, ));
            appareilGroup.addControl("modele", this.fb.control("", Validators.required));
           

          // Ajouter le FormGroup de l'appareil au FormArray
          (this.poseSalleDeBainForm.get('appareils_salle_de_bain') as FormArray).push(appareilGroup);
        
          
        });
       
      },
      (error) => {
        console.error('Erreur lors de la recuperation des  getEquipementsByPiece:salledebain :', error);
      }
    );
  }
  


  }
  