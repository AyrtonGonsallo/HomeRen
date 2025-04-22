import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';
import { Equipement } from '../../../../Models/Equipement';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';

interface MaxValues {
  hauteur: number;
  longueur: number;
  profondeur: number;
  quantite: number;
}
@Component({
  selector: 'app-dimensions-depose-cuisine',
  templateUrl: './dimensions-depose-cuisine.component.html',
  styleUrl: './dimensions-depose-cuisine.component.css'
})
export class DimensionsDeposeCuisineComponent {
  isclicked=false
 
   @Input() triggerSubmitDimensionForm!: boolean;
 modele: any;
 appareilGroup: any;
   ngOnChanges(changes: SimpleChanges): void {
     if (changes['triggerSubmitDimensionForm']) {
       console.log("trigger de soumission: ",this.triggerSubmitDimensionForm)
       if(this.triggerSubmitDimensionForm==true){
         
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
       gammes_depose_form: this.fb.array([])
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
       this.gestiondesdevisService.addFormulaire("dimensions-pose-elementcuisines",2,this.poseCuisineForm.value)
   }
   }
   
   prec_formulaire_gamme:any
   constructor(private fb: FormBuilder,private userService: ApiConceptsEtTravauxService,private gestiondesdevisService: GestionDesDevisService) {
     
  
     this.prec_formulaire_gamme=this.gestiondesdevisService.getFormulaireByName("dimensions-pose-elementcuisines")
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
 
 
   ngOnInit(): void {
     this.loadAppareils()
   }
 
   gammes_depose: any[] = [];
    // Getter pour accéder à la FormArray "gammes"
    get gammes_depose_form(): FormArray {
     return this.poseCuisineForm.get('gammes_depose_form') as FormArray;
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
     
    
 
 
     this.userService.getGammesByTravailAndType(2, 'depose-cuisine').subscribe(
       (response: any) => {
         this.gammes_depose = response
         console.log("réponse de la requette  get depose salle de bain",this.gammes_depose);
         let i=0
 
         this.gammes_depose.forEach(gamme => {
         
           let quantite=0
           let longueur=0
           let titre=gamme.Label
           let prix=gamme.Prix
           if(this.prec_formulaire_gamme){
             let form=this.prec_formulaire_gamme.formulaire
             longueur=form?.gammes_depose_form[i]?.longueur
             quantite=form?.gammes_depose_form[i]?.quantite
             titre=form?.gammes_depose_form[i]?.titre
             prix=form?.gammes_depose_form[i]?.prix
           }
         
              // Créer un FormGroup pour chaque appareil
           const appareilGroup = this.fb.group({});
               
           appareilGroup.addControl("longueur", this.fb.control(longueur, ));
           appareilGroup.addControl("quantite", this.fb.control(quantite, ));
           appareilGroup.addControl("titre", this.fb.control(titre, ));
           appareilGroup.addControl("prix", this.fb.control(prix, ));
          
 
           // Obtenez les contrôles pour pouvoir les manipuler
           const quantiteControl = appareilGroup.get('quantite');
           const longueurControl = appareilGroup.get('longueur');
           longueurControl?.setValidators([Validators.required, Validators.min(0), Validators.max(5000)]);
           quantiteControl?.setValidators([Validators.required, Validators.min(0), Validators.max(50)]);
           // Mettre à jour la validation pour forcer la vérification des erreurs
           quantiteControl?.updateValueAndValidity();
           longueurControl?.updateValueAndValidity();
          
            
 
           // Ajouter le FormGroup de l'appareil au FormArray
           (this.poseCuisineForm.get('gammes_depose_form') as FormArray).push(appareilGroup);
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
   
