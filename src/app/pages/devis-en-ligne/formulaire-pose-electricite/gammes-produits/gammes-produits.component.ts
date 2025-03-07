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
  glob_err_form1:string=""
  glob_err_form2:string=""
  exist_glob_err_form1:boolean=false
  exist_glob_err_form2:boolean=false
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
  appareils_a_remplacer_form: FormGroup;
  

  createAppareilsAAjouterGroup(): FormGroup {
    return this.fb.group({
      
      appareils_electrique: this.fb.array([])
    });
  }
  createAppareilsARemplacerGroup(): FormGroup {
    return this.fb.group({
      appareils_electrique_a_remplacer: this.fb.array([]),
      remplacement_disjoncteur: [false, ],//boolean
      gamme: ["", Validators.required],
    });
  }

  get getappareils_a_remplacer_form(): FormArray {
    return this.appareils_a_remplacer_form.get('appareils_electrique_a_remplacer') as FormArray;
  }
  onAppareilsARemplacerSubmit(): boolean {
    this.glob_err_form2=""
    const gamme_invalide: boolean = !!this.appareils_a_remplacer_form.get('gamme')?.invalid;

    const appareils_electrique_a_remplacerArray = this.appareils_a_remplacer_form.get('appareils_electrique_a_remplacer') as FormArray;
    let res=true
    console.log("gammes ",this.appareils_a_remplacer_form.get('gamme')?.invalid)
    res=res && !gamme_invalide
    for (let i = 0; i < appareils_electrique_a_remplacerArray.length; i++) {
      const group = appareils_electrique_a_remplacerArray.at(i) as FormGroup;
      const controls = group.controls;
  
      if (
        controls['active'].value === true && (
          controls['nombre_a_remplacer'].value === '' ||
         
          controls['nombre_a_remplacer'].invalid ) ||
        controls['nombre_a_creer'].value === '' ||
       
        controls['nombre_a_creer'].invalid 
      ) {
        //console.error(`Tous les champs doivent être remplis pour la démolition partielle du mur ${i + 1}`);
        //group.markAllAsTouched();
        this.exist_glob_err_form2=true
        this.glob_err_form2+=`Tous les champs doivent être remplis pour le remplacement de l'appareil intitulé ${controls['titre'].value}. `
        res=res && false
      }
    }
  
    
  
    return res;
  }

  submit(): void {
    this.isclicked=true
    let boolremplacer=this.onAppareilsARemplacerSubmit()
    console.log("etat form a rempl",boolremplacer)
    if (boolremplacer) {
      const fusionFormValues = {
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
    this.formValidityChange.emit( boolremplacer);
  }
  prec_formulaire_gamme:any
  constructor(private fb: FormBuilder,private userService: ApiConceptsEtTravauxService,private gestiondesdevisService: GestionDesDevisService) {
    
    this.prec_formulaire_gamme=this.gestiondesdevisService.getFormulaireByName("gammes-produits-pose-electricite")
    if(this.prec_formulaire_gamme){
      let form=this.prec_formulaire_gamme.formulaire
      console.log("formulaire existant",form)
      this.appareils_a_remplacer_form = this.fb.group({
        appareils_electrique_a_remplacer: this.fb.array([]),
        gamme: [form.gamme, ],//boolean
      });
    


    }else{
      console.log("formulaire non existant")
      this.appareils_a_remplacer_form = this.createAppareilsARemplacerGroup();
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

  appareils_electrique:Equipement[]=[]
  appareils_electrique_a_remplacer:Equipement[]=[]


  getAppareilRemplActiveState(index: number): boolean {
    return (this.appareils_a_remplacer_form.get('appareils_electrique_a_remplacer') as FormArray)?.at(index).get('active')?.value;
  }


  active_Tp2(index: number): void {
    const formArray = this.appareils_a_remplacer_form.get('appareils_electrique_a_remplacer') as FormArray;
    const control = formArray?.at(index).get('active');
  
    if (control) {
      // Toggle the value between true and false
      control.setValue(!control.value);
    }
  }

  getAppareilNombreState2(index: number): boolean {
    const appareilsFormArray = this.appareils_a_remplacer_form.get('appareils_electrique_a_remplacer') as FormArray;
    const nombreValue = appareilsFormArray.at(index).get('nombre_a_creer')?.value;
    const nombreValue2 = appareilsFormArray.at(index).get('nombre_a_remplacer')?.value;
    let res=nombreValue !== null && nombreValue2 !== null ;
    // Vérifie que les valeurs de 'nombre' et 'creation_ou_remplacement' ne sont pas vides ou nulles
    return !res;
  }
  
  ngOnInit(): void {
    this.loadAppareils()
    this.load_gammes()
  }
  loadAppareils(){
   
    


    this.userService.getEquipementsByType ("electrique-a-remplacer").subscribe(
      (response: Equipement[]) => {
        this.appareils_electrique_a_remplacer = response;

        console.log("réponse de la requette  getEquipementsByType:electrique-a-remplacer",this.appareils_electrique_a_remplacer);
        let i=0
        this.appareils_electrique_a_remplacer.forEach(appareil => {
          let titre=appareil.Titre
          let active=false
          let nombre_a_creer=0
          let nombre_a_remplacer=0
          let id=appareil.ID
          if(this.prec_formulaire_gamme){
            let form=this.prec_formulaire_gamme.formulaire
            active=form?.appareils_electrique_a_remplacer[i]?.active
            nombre_a_creer=form?.appareils_electrique_a_remplacer[i]?.nombre_a_creer
            nombre_a_remplacer=form?.appareils_electrique_a_remplacer[i]?.nombre_a_remplacer

            titre=form?.appareils_electrique_a_remplacer[i]?.titre
            id=form?.appareils_electrique_a_remplacer[i]?.id
          }
        
          // Créer un FormGroup pour chaque appareil
          const appareilGroup2 = this.fb.group({});
          appareilGroup2.addControl("id", this.fb.control(id, ));
          appareilGroup2.addControl("titre", this.fb.control(titre, ));
            appareilGroup2.addControl("nombre_a_creer", this.fb.control(nombre_a_creer, ));
            appareilGroup2.addControl("nombre_a_remplacer", this.fb.control(nombre_a_remplacer, ));

            appareilGroup2.addControl("active", this.fb.control(active, ));
           

            // Obtenez les contrôles pour pouvoir les manipuler
            const nombre_a_creerControl = appareilGroup2.get('nombre_a_creer');
            const nombre_a_remplacerControl = appareilGroup2.get('nombre_a_remplacer');
            const activeControl = appareilGroup2.get('active');

            // Abonnez-vous aux changements de la valeur de 'active'
            activeControl?.valueChanges.subscribe((isActive: boolean) => {
              if (isActive) {
                // Si 'active' est true, ajouter les validateurs
                nombre_a_remplacerControl?.setValidators(Validators.required);
                nombre_a_creerControl?.setValidators(Validators.required);
              } else {
                // Sinon, supprimer les validateurs
                nombre_a_creerControl?.clearValidators();
                nombre_a_remplacerControl?.clearValidators();
              }
              // Mettre à jour la validation pour forcer la vérification des erreurs
              nombre_a_creerControl?.updateValueAndValidity();
              nombre_a_remplacerControl?.updateValueAndValidity();
            });

          // Ajouter le FormGroup de l'appareil au FormArray
          (this.appareils_a_remplacer_form.get('appareils_electrique_a_remplacer') as FormArray).push(appareilGroup2);
        
          i++
        });
       
      },
      (error) => {
        console.error('Erreur lors de la recuperation des  appareils_electrique_a_remplacer :', error);
      }
    );
  }
  

  gammes_appareillage:any
load_gammes(){
  this.userService.getGammesByTravailAndType(13,"renovation-electrique-partielle").subscribe(
    (response: any) => {
      console.log('recuperation des gammes appareillage:', response);
      this.gammes_appareillage=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes appareillage :', error);
    }
  );
}

blockComma(event: KeyboardEvent) {
  if (event.key === ',') {
    event.preventDefault();
  }
}

  }
  