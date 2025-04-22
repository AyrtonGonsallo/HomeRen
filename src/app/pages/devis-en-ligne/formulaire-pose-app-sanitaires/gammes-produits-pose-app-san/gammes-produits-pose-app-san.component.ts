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
      appareils_salle_de_bain: this.fb.array([]),
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
      this.gestiondesdevisService.addFormulaire("etat-surfaces-pose-app-san",16,this.poseSalleDeBainForm.value)
      this.gestiondesdevisService.addFormulaire("gammes-produits-pose-app-san",16,this.poseSalleDeBainForm.value)
    // Envoyer les données au backend ou traiter comme nécessaire
    this.gestiondesdevisService.groupform('pose-app-san',16, 'dimensions-pose-app-san','etat-surfaces-pose-app-san','gammes-produits-pose-app-san')
    console.log(this.gestiondesdevisService.getFormulaireByName("pose-app-san"));
      // Envoyer les données au backend ou traiter comme nécessaire
    }
  }
  
  prec_formulaire_gamme:any
  constructor(private fb: FormBuilder,private userService: ApiConceptsEtTravauxService,private gestiondesdevisService: GestionDesDevisService) {
    
    this.poseCuisineForm = this.createPoseCuisineGroup();

    this.prec_formulaire_gamme=this.gestiondesdevisService.getFormulaireByName("gammes-produits-pose-app-san")
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
  appareils_salle_de_bain:Equipement[]=[]
  getAppareilActiveState(index: number): boolean {
    return (this.poseSalleDeBainForm.get('appareils_salle_de_bain') as FormArray)?.at(index).get('active')?.value;
  }
  getAppareilModeleState(index: number): boolean {
    const appareilsFormArray = this.poseSalleDeBainForm.get('appareils_salle_de_bain') as FormArray;
    const modeleValue = appareilsFormArray.at(index).get('modele')?.value;
    let res=modeleValue !== null && modeleValue !== '';
    // Vérifie que les valeurs de 'nombre' et 'modele' ne sont pas vides ou nulles
    return !res;
  }
  active_Tp(index: number): void {
    const formArray = this.poseSalleDeBainForm.get('appareils_salle_de_bain') as FormArray;
    const control = formArray?.at(index).get('active');
  
    if (control) {
      // Toggle the value between true and false
      control.setValue(!control.value);
    }
  }
  ngOnInit(): void {
    this.loadAppareils()
  }

 
tableauIds = [9, 37, 10, 2,35,38,6,36,34,42,39,40,41,];

  loadAppareils(){
    
    this.userService.getEquipementsByPiece(5).subscribe(
      (response: Equipement[]) => {
        const tableauIds=this.tableauIds
        this.appareils_salle_de_bain = response.filter(equipement => equipement.ModeleEquipements && equipement.ModeleEquipements.length > 0).sort((a, b) => {
          // Trier selon l'ordre des IDs dans le tableau
          const indexA = tableauIds.indexOf(a.ID);
          const indexB = tableauIds.indexOf(b.ID);
          
          // Les éléments non présents dans le tableau seront mis à la fin
          return (indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA) - 
                 (indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB);
        });;
        console.log("réponse de la requette  getEquipementsByPiece:salledebain",this.appareils_salle_de_bain);
        let i=0

        this.appareils_salle_de_bain.forEach(appareil => {

          let titre=appareil.Titre
          let modele=""
          let active=false
          let longueur=0
          let largeur=0
          let nombre_de_vasque=0
          let encastre_ou_apparente=false
          if(this.prec_formulaire_gamme){
            let form=this.prec_formulaire_gamme.formulaire
            modele=form?.appareils_salle_de_bain[i]?.modele
            active=form?.appareils_salle_de_bain[i]?.active
            longueur=form?.appareils_salle_de_bain[i]?.longueur
            largeur=form?.appareils_salle_de_bain[i]?.largeur
            nombre_de_vasque=form?.appareils_salle_de_bain[i]?.nombre_de_vasque
            encastre_ou_apparente=form?.appareils_salle_de_bain[i]?.encastre_ou_apparente
          }
        
             // Créer un FormGroup pour chaque appareil
          const appareilGroup = this.fb.group({});
              
          appareilGroup.addControl("titre", this.fb.control(titre, ));
          appareilGroup.addControl("longueur", this.fb.control(longueur, ));
          appareilGroup.addControl("largeur", this.fb.control(largeur, ));
          appareilGroup.addControl("nombre_de_vasque", this.fb.control(nombre_de_vasque, ));
          appareilGroup.addControl("encastre_ou_apparente", this.fb.control(encastre_ou_apparente, ));
          appareilGroup.addControl("active", this.fb.control(active, ));
          appareilGroup.addControl("modele", this.fb.control(modele, ));
         

          // Obtenez les contrôles pour pouvoir les manipuler
          const nombre_de_vasqueControl = appareilGroup.get('nombre_de_vasque');
          const largeurControl = appareilGroup.get('largeur');
          const longueurControl = appareilGroup.get('longueur');
          const modeleControl = appareilGroup.get('modele');
          const activeControl = appareilGroup.get('active');

          // Abonnez-vous aux changements de la valeur de 'active'
          activeControl?.valueChanges.subscribe((isActive: boolean) => {
            if (isActive) {
              // Si 'active' est true, ajouter les validateurs
              modeleControl?.setValidators(Validators.required);
            } else {
              // Sinon, supprimer les validateurs
              modeleControl?.clearValidators();
            }
            // Mettre à jour la validation pour forcer la vérification des erreurs
            modeleControl?.updateValueAndValidity();
          });
           

          // Ajouter le FormGroup de l'appareil au FormArray
          (this.poseSalleDeBainForm.get('appareils_salle_de_bain') as FormArray).push(appareilGroup);
          i++
          
        });
      },
      (error) => {
        console.error('Erreur lors de la recuperation des  getEquipementsByPiece:salledebain :', error);
      }
    );


    


  }
  

  blockComma(event: KeyboardEvent) {
    if (event.key === ',') {
      event.preventDefault();
    }
  }
  }
  