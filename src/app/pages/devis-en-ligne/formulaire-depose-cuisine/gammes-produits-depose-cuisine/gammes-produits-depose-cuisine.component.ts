import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';
import { Equipement } from '../../../../Models/Equipement';

@Component({
  selector: 'app-gammes-produits-depose-cuisine',
  templateUrl: './gammes-produits-depose-cuisine.component.html',
  styleUrl: './gammes-produits-depose-cuisine.component.css'
})
export class GammesProduitsDeposeCuisineComponent implements OnInit {
  isclicked=false

  @Input() triggerSubmitGammesProduitsForm!: boolean;
modele: any;
appareilGroup: any;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitGammesProduitsForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitGammesProduitsForm)
      if(this.triggerSubmitGammesProduitsForm==true){
        
          this.onPoseCuisineSubmit()
        
        this.isclicked=true
      }
      
    }
  }
  @Output() formValidityChange = new EventEmitter<boolean>();
  disabled = true;
  baseurl=environment.imagesUrl
  @Input() selectedPiece: any; // Déclaration de l'entrée selectedPiece
  poseCuisineForm: FormGroup;
  // le formulaire de pose plafond
 

  createPoseCuisineGroup(): FormGroup {
    return this.fb.group({
      appareils_cuisine: this.fb.array([]),
    });
  }
  get getposeCuisineForm(): FormArray {
    return this.poseCuisineForm.get('appareils_cuisine') as FormArray;
  }
  onPoseCuisineSubmit(): void {
    this.formValidityChange.emit(this.poseCuisineForm.valid);
    if (this.poseCuisineForm.invalid) {
      this.markFormGroupTouched(this.poseCuisineForm);
      return;
    }
    if (this.poseCuisineForm.valid) {
      this.gestiondesdevisService.addFormulaire("etat-surfaces-pose-elementcuisines",2,this.poseCuisineForm.value)
      this.gestiondesdevisService.addFormulaire("gammes-produits-pose-elementcuisines",2,this.poseCuisineForm.value)
    // Envoyer les données au backend ou traiter comme nécessaire
    this.gestiondesdevisService.groupform('pose-elementcuisines',2, 'dimensions-pose-elementcuisines','etat-surfaces-pose-elementcuisines','gammes-produits-pose-elementcuisines')
    console.log(this.gestiondesdevisService.getFormulaireByName("pose-elementcuisines"));
      // Envoyer les données au backend ou traiter comme nécessaire
    }
  }
  
  prec_formulaire_gamme:any
  constructor(private fb: FormBuilder,private userService: ApiConceptsEtTravauxService,private gestiondesdevisService: GestionDesDevisService) {
    
 
    this.prec_formulaire_gamme=this.gestiondesdevisService.getFormulaireByName("gammes-produits-pose-elementcuisines")
    if(this.prec_formulaire_gamme){
      let form=this.prec_formulaire_gamme.formulaire
      console.log("formulaire existant",form)
    }else{
      console.log("formulaire non existant")
    }
    this.poseCuisineForm = this.createPoseCuisineGroup();
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
  getAppareilActiveState(index: number): boolean {
    return (this.poseCuisineForm.get('appareils_cuisine') as FormArray)?.at(index).get('active')?.value;
  }
  getAppareilModeleState(index: number): boolean {
    const appareilsFormArray = this.poseCuisineForm.get('appareils_cuisine') as FormArray;
    const modeleValue = appareilsFormArray.at(index).get('modele')?.value;
    let res=modeleValue !== null && modeleValue !== '';
    // Vérifie que les valeurs de 'nombre' et 'modele' ne sont pas vides ou nulles
    return !res;
  }
  active_Tp(index: number): void {
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

 

  need_quantite(id: number): boolean {
    const validIds = [103, 104, 116, 117, 118]; // Liste des IDs valides
  
    // Vérifie si l'ID est dans la liste des IDs valides
    if (!validIds.includes(id)) {
      return false;
    }
  
    return true;
  }

  need_longueur(id: number): boolean {
    const validIds = [102, 115,]; // Liste des IDs valides
  
    // Vérifie si l'ID est dans la liste des IDs valides
    if (!validIds.includes(id)) {
      return false;
    }
  
    return true;
  }

  loadAppareils(){
    
    this.userService.getEquipementsByPiece(7).subscribe(
      (response: Equipement[]) => {
        this.appareils_cuisine = response.filter(equipement => equipement.ModeleEquipements && equipement.ModeleEquipements.length > 0);
        console.log("réponse de la requette  getEquipementsByPiece:Cuisine",this.appareils_cuisine);
        let i=0

        this.appareils_cuisine.forEach(appareil => {

          let modele=""
          let titre=appareil.Titre
          let active=false
          let longueur=0
          let largeur=0
          let nombre_de_vasque=0
          if(this.prec_formulaire_gamme){
            let form=this.prec_formulaire_gamme.formulaire
            modele=form?.appareils_cuisine[i]?.modele
            active=form?.appareils_cuisine[i]?.active
            longueur=form?.appareils_cuisine[i]?.longueur
          }
        
             // Créer un FormGroup pour chaque appareil
          const appareilGroup = this.fb.group({});
              
          appareilGroup.addControl("longueur", this.fb.control(longueur, ));
          appareilGroup.addControl("active", this.fb.control(active, ));
          appareilGroup.addControl("titre", this.fb.control(titre, ));
          appareilGroup.addControl("modele", this.fb.control(modele, ));
         

          // Obtenez les contrôles pour pouvoir les manipuler
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
          (this.poseCuisineForm.get('appareils_cuisine') as FormArray).push(appareilGroup);
          i++
          
        });
      },
      (error) => {
        console.error('Erreur lors de la recuperation des  getEquipementsByPiece:Cuisine :', error);
      }
    );


   


  }
  blockComma(event: KeyboardEvent) {
    if (event.key === ',') {
      event.preventDefault();
    }
  }
  }
  
  
