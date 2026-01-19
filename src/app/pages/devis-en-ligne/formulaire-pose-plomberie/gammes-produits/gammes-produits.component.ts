import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { Equipement } from '../../../../Models/Equipement';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-gammes-produits-pose-plomberie',
  templateUrl: './gammes-produits.component.html',
  styleUrl: '../formulaire-pose-plomberie.component.css'
})

export class PosePlomberieGammesProduitsComponent {
  isclicked=false

  @Input() triggerSubmitGammesProduitsForm!: boolean;
modele: any;
appareilGroup: any;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitGammesProduitsForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitGammesProduitsForm)
      if(this.triggerSubmitGammesProduitsForm==true){
        if(this.selectedPiece.ID==5 || this.selectedPiece.ID==8){
          this.onPoseSalleDeBainSubmit()
        }else if(this.selectedPiece.ID==7){
          this.onPoseCuisineSubmit()
        }
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
  onPoseCuisineSubmit(): void {
    this.formValidityChange.emit(this.poseCuisineForm.valid);
    if (this.poseCuisineForm.invalid) {
      this.markFormGroupTouched(this.poseCuisineForm);
      return;
    }
    if (this.poseCuisineForm.valid) {
      
      console.log(this.poseCuisineForm.value);
      // Envoyer les données au backend ou traiter comme nécessaire
      this.gestiondesdevisService.addFormulaire("dimensions-pose-plomberie-cuisine",11,this.poseCuisineForm.value)
      this.gestiondesdevisService.addFormulaire("etat-surfaces-pose-plomberie-cuisine",11,this.poseCuisineForm.value)
      this.gestiondesdevisService.addFormulaire("gammes-produits-pose-plomberie-cuisine",11,this.poseCuisineForm.value)
    // Envoyer les données au backend ou traiter comme nécessaire
    this.gestiondesdevisService.groupform('pose-plomberie-cuisine',11, 'dimensions-pose-plomberie-cuisine','etat-surfaces-pose-plomberie-cuisine','gammes-produits-pose-plomberie-cuisine')
    console.log(this.gestiondesdevisService.getFormulaireByName("pose-plomberie-cuisine"));
    }
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
      this.gestiondesdevisService.addFormulaire("dimensions-pose-plomberie-salle-de-bain",11,this.poseSalleDeBainForm.value)
      this.gestiondesdevisService.addFormulaire("etat-surfaces-pose-plomberie-salle-de-bain",11,this.poseSalleDeBainForm.value)
      this.gestiondesdevisService.addFormulaire("gammes-produits-pose-plomberie-salle-de-bain",11,this.poseSalleDeBainForm.value)
    // Envoyer les données au backend ou traiter comme nécessaire
    this.gestiondesdevisService.groupform('pose-plomberie-salle-de-bain',11, 'dimensions-pose-plomberie-salle-de-bain','etat-surfaces-pose-plomberie-salle-de-bain','gammes-produits-pose-plomberie-salle-de-bain')
    console.log(this.gestiondesdevisService.getFormulaireByName("pose-plomberie-salle-de-bain"));
      // Envoyer les données au backend ou traiter comme nécessaire
    }
  }
  

  prec_formulaire_cuisine_gamme:any
  prec_formulaire_salle_de_bain_gamme:any
  constructor(private fb: FormBuilder,private userService: ApiConceptsEtTravauxService,private gestiondesdevisService: GestionDesDevisService) {
    
    this.poseCuisineForm = this.createPoseCuisineGroup();
    this.poseSalleDeBainForm = this.createPoseSalleDeBainGroup();

    this.prec_formulaire_cuisine_gamme=this.gestiondesdevisService.getFormulaireByName("gammes-produits-pose-plomberie-cuisine")
    this.prec_formulaire_salle_de_bain_gamme=this.gestiondesdevisService.getFormulaireByName("gammes-produits-pose-plomberie-salle-de-bain")
    if(this.prec_formulaire_cuisine_gamme){
      let form=this.prec_formulaire_cuisine_gamme.formulaire
      console.log("formulaire existant",form)
    }else{
      console.log("formulaire non existant")
    }
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
  getAppareilSalledeBainActiveState(index: number): boolean {
    return (this.poseSalleDeBainForm.get('appareils_salle_de_bain') as FormArray)?.at(index).get('active')?.value;
  }
  getAppareilSalledeBainModeleState(index: number): boolean {
    const appareilsFormArray = this.poseSalleDeBainForm.get('appareils_salle_de_bain') as FormArray;
    const modeleValue = appareilsFormArray.at(index).get('modele')?.value;
    let res=modeleValue !== null && modeleValue !== '';
    // Vérifie que les valeurs de 'nombre' et 'modele' ne sont pas vides ou nulles
    return !res;
  }
  active_SalledeBain(index: number): void {
    const formArray = this.poseSalleDeBainForm.get('appareils_salle_de_bain') as FormArray;
    const control = formArray?.at(index).get('active');
  
    if (control) {
      // Toggle the value between true and false
      control.setValue(!control.value);
    }
  }


  getAppareilCuisineActiveState(index: number): boolean {
    return (this.poseCuisineForm.get('appareils_cuisine') as FormArray)?.at(index).get('active')?.value;
  }
  getAppareilCuisineModeleState(index: number): boolean {
    const appareilsFormArray = this.poseCuisineForm.get('appareils_cuisine') as FormArray;
    const modeleValue = appareilsFormArray.at(index).get('modele')?.value;
    let res=modeleValue !== null && modeleValue !== '';
    // Vérifie que les valeurs de 'nombre' et 'modele' ne sont pas vides ou nulles
    return !res;
  }
  active_Cuisine(index: number): void {
    const formArray = this.poseCuisineForm.get('appareils_cuisine') as FormArray;
    const control = formArray?.at(index).get('active');
  
    if (control) {
      // Toggle the value between true and false
      control.setValue(!control.value);
    }
  }
  ngOnInit(): void {
    this.loadAppareils()
  }
  loadAppareils(){
    this.userService.getEquipementsByPiece(7).subscribe(
      (response: Equipement[]) => {
        this.appareils_cuisine = response.filter(equipement => equipement.Modeles && equipement.Modeles.length > 0);
        console.log("réponse de la requette getEquipementsByPiece:cuisine ",this.appareils_cuisine);
        let i=0
        this.appareils_cuisine.forEach(appareil => {
          let modele=""
          let active=false
          let depose=false
          if(this.prec_formulaire_cuisine_gamme){
            let form=this.prec_formulaire_cuisine_gamme.formulaire
            modele=form?.appareils_cuisine[i]?.modele
            active=form?.appareils_cuisine[i]?.active
            depose=form?.appareils_cuisine[i]?.depose
          }
        
             // Créer un FormGroup pour chaque appareil
          const appareilGroup = this.fb.group({});
              
         
          appareilGroup.addControl("depose", this.fb.control(depose, ));
          appareilGroup.addControl("active", this.fb.control(active, ));
          appareilGroup.addControl("modele", this.fb.control(modele, ));
         

          // Obtenez les contrôles pour pouvoir les manipuler
          const nombreControl = appareilGroup.get('depose');
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
        
          i++
           
              
      
            // Ajouter le FormGroup de l'appareil au FormArray
            (this.poseCuisineForm.get('appareils_cuisine') as FormArray).push(appareilGroup);
          
          
        });
      },
      (error) => {
        console.error('Erreur lors de la recuperation des getEquipementsByPiece:cuisine :', error);
      }
    );
    this.userService.getEquipementsByPiece(5).subscribe(
      (response: Equipement[]) => {
        this.appareils_salle_de_bain = response.filter(equipement => equipement.Modeles && equipement.Modeles.length > 0);
        console.log("réponse de la requette  getEquipementsByPiece:salledebain",this.appareils_salle_de_bain);
        let i=0
        this.appareils_salle_de_bain.forEach(appareil => {
        
          let modele=""
          let active=false
          let depose=false
          if(this.prec_formulaire_salle_de_bain_gamme){
            let form=this.prec_formulaire_salle_de_bain_gamme.formulaire
            modele=form?.appareils_salle_de_bain[i]?.modele
            active=form?.appareils_salle_de_bain[i]?.active
            depose=form?.appareils_salle_de_bain[i]?.depose
          }
        
             // Créer un FormGroup pour chaque appareil
          const appareilGroup = this.fb.group({});
              
         
          appareilGroup.addControl("depose", this.fb.control(depose, ));
          appareilGroup.addControl("active", this.fb.control(active, ));
          appareilGroup.addControl("modele", this.fb.control(modele, ));
         

          // Obtenez les contrôles pour pouvoir les manipuler
          const nombreControl = appareilGroup.get('depose');
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
        
          i++
           

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
  
