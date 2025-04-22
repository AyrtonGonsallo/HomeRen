import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { Equipement } from '../../../../Models/Equipement';

@Component({
  selector: 'app-dimensions-pose-app-san',
  templateUrl: './dimensions-pose-app-san.component.html',
  styleUrl: './dimensions-pose-app-san.component.css'
})
export class DimensionsPoseAppSanComponent {
 isclicked=false

  @Input() triggerSubmitDimensionForm!: boolean;
modele: any;
appareilGroup: any;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitDimensionForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitDimensionForm)
      if(this.triggerSubmitDimensionForm==true){
        
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
      gammes_depose_form: this.fb.array([])
    });
  }
 
  onPoseSalleDeBainSubmit(): void {
    console.log("form dim",this.poseSalleDeBainForm.value)
    this.formValidityChange.emit(this.poseSalleDeBainForm.valid);
    if (this.poseSalleDeBainForm.invalid) {
      this.markFormGroupTouched(this.poseSalleDeBainForm);
      return;
    }
    if (this.poseSalleDeBainForm.valid) {
      this.gestiondesdevisService.addFormulaire("dimensions-pose-app-san",16,this.poseSalleDeBainForm.value)
   
    }
  }
  
  prec_formulaire_gamme:any
  constructor(private fb: FormBuilder,private userService: ApiConceptsEtTravauxService,private gestiondesdevisService: GestionDesDevisService) {
    
    this.poseCuisineForm = this.createPoseCuisineGroup();

    this.prec_formulaire_gamme=this.gestiondesdevisService.getFormulaireByName("dimensions-pose-app-san")
    if(this.prec_formulaire_gamme){
      let form=this.prec_formulaire_gamme.formulaire
      console.log("formulaire existant",form)
    }else{
      console.log("formulaire non existant")
    }
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
 
  ngOnInit(): void {
    this.loadAppareils()
  }

  gammes_depose: any[] = [];
   // Getter pour accéder à la FormArray "gammes"
   get gammes_depose_form(): FormArray {
    return this.poseSalleDeBainForm.get('gammes_depose_form') as FormArray;
  }
tableauIds = [9, 37, 10, 2,35,38,6,36,34,42,39,40,41,];

  loadAppareils(){
    
   


    this.userService.getGammesByTravailAndTypeOrdered(16, 'depose-salle-de-bain-salle-d-eau').subscribe(
      (response: any) => {
        this.gammes_depose = response
        console.log("réponse de la requette  get depose salle de bain",this.gammes_depose);
        let i=0

        this.gammes_depose.forEach(gamme => {
        
          let quantite=0
          let titre=gamme.Label
          let prix=gamme.Prix
          if(this.prec_formulaire_gamme){
            let form=this.prec_formulaire_gamme.formulaire
            quantite=form?.gammes_depose_form[i]?.quantite
            titre=form?.gammes_depose_form[i]?.titre
            prix=form?.gammes_depose_form[i]?.prix
          }
        
             // Créer un FormGroup pour chaque appareil
          const appareilGroup = this.fb.group({});
              
         
          appareilGroup.addControl("quantite", this.fb.control(quantite, ));
          appareilGroup.addControl("titre", this.fb.control(titre, ));
          appareilGroup.addControl("prix", this.fb.control(prix, ));
         

          // Obtenez les contrôles pour pouvoir les manipuler
          const quantiteControl = appareilGroup.get('quantite');
          quantiteControl?.setValidators([Validators.required, Validators.min(0), Validators.max(50)]);
          // Mettre à jour la validation pour forcer la vérification des erreurs
          quantiteControl?.updateValueAndValidity();

         
           

          // Ajouter le FormGroup de l'appareil au FormArray
          (this.poseSalleDeBainForm.get('gammes_depose_form') as FormArray).push(appareilGroup);
          i++
          
        });
      },
      (error) => {
        console.error('Erreur lors de la recuperation des gammes_depose :', error);
      }
    );


  }
  

  blockComma(event: KeyboardEvent) {
    if (event.key === ',') {
      event.preventDefault();
    }
  }
  }
  