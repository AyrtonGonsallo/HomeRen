import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';

@Component({
  selector: 'app-gammes-produits-depose-cuisine',
  templateUrl: './gammes-produits-depose-cuisine.component.html',
  styleUrl: './gammes-produits-depose-cuisine.component.css'
})
export class GammesProduitsDeposeCuisineComponent implements OnInit {
  isclicked = false;
  baseurl = environment.imagesUrl;
  deposeElementCuisinesForm: FormGroup;
  gammes_depose: any[] = [];

  @Input() triggerSubmitGammesProduitsForm!: boolean;
  @Output() formValidityChange = new EventEmitter<boolean>();

  maxFileSize = 10 * 1024 * 1024; // 10 MB en octets
  prec_formulaire_gamme:any
  constructor(
    private fb: FormBuilder,
    private gestiondesdevisService: GestionDesDevisService,
    private userService: ApiConceptsEtTravauxService
  ) {

    this.prec_formulaire_gamme=this.gestiondesdevisService.getFormulaireByName("gammes-produits-depose-elementcuisines")
    if(this.prec_formulaire_gamme){
      let form=this.prec_formulaire_gamme.formulaire
      console.log("formulaire existant",form)
      this.deposeElementCuisinesForm = this.fb.group({
        gammes: this.fb.array([])
      });
      const gammes_array = this.deposeElementCuisinesForm.get('gammes') as FormArray;
      form.gammes.forEach((gamme: any) => {
        gammes_array.push(this.fb.group({
          active: [gamme.active, Validators.required],
          quantite: [gamme.quantite, Validators.required],
          titre: [gamme.titre, Validators.required],
          prix: [gamme.prix, Validators.required],
          image: [gamme.image]
        }));
      });
     

    }else{
      console.log("formulaire non existant")
      this.deposeElementCuisinesForm = this.fb.group({
        gammes: this.fb.array([])
      });
    }


    
  }


  getGammeActiveState(index: number): boolean {
    return (this.deposeElementCuisinesForm.get('gammes') as FormArray)?.at(index).get('active')?.value;
  }
  active_Tp(index: number): void {
    const formArray = this.deposeElementCuisinesForm.get('gammes') as FormArray;
    const control = formArray?.at(index).get('active');
  
    if (control) {
      // Toggle the value between true and false
      control.setValue(!control.value);
    }
  }
  getGammeNombreState(index: number): boolean {
    const appareilsFormArray = this.deposeElementCuisinesForm.get('gammes') as FormArray;
    const nombreValue = appareilsFormArray.at(index).get('quantite')?.value;
    let res=nombreValue !== null && nombreValue !== 0;
    // Vérifie que les valeurs de 'nombre' et 'modele' ne sont pas vides ou nulles
    return !res;
  }

  ngOnInit(): void {
    this.load_gammes();
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitGammesProduitsForm']) {
      if (this.triggerSubmitGammesProduitsForm) {
        this.isclicked = true;
        this.ondeposeElementCuisinesSubmit();
      }
    }
  }

  // Créer un groupe de champs pour chaque élément cuisine
  createdeposeElementCuisinesGroup(param_prix:number,param_label:string): FormGroup {
    return this.fb.group({
      active: [false, Validators.required],
      quantite: [1, Validators.required],
      titre: [param_label, Validators.required],
      prix: [param_prix, Validators.required],
      image: [null]
    });
  }

  // Soumission du formulaire
  ondeposeElementCuisinesSubmit(): void {
    this.formValidityChange.emit(this.deposeElementCuisinesForm.valid);
    if (this.deposeElementCuisinesForm.invalid) {
      this.markFormGroupTouched(this.deposeElementCuisinesForm);
      return;
    }

    if (this.deposeElementCuisinesForm.valid) {
      // Envoyer le formulaire au backend
      this.gestiondesdevisService.addFormulaire('etat-surfaces-depose-elementcuisines', 2, this.deposeElementCuisinesForm.value);
      this.gestiondesdevisService.addFormulaire('gammes-produits-depose-elementcuisines', 2, this.deposeElementCuisinesForm.value);
      this.gestiondesdevisService.groupform(
        'depose-elementcuisines',
        2,
        'dimensions-depose-elementcuisines',
        'etat-surfaces-depose-elementcuisines',
        'gammes-produits-depose-elementcuisines'
      );
      console.log(this.gestiondesdevisService.getFormulaireByName('depose-elementcuisines'));
    }
  }

  // Getter pour accéder à la FormArray "gammes"
  get gammes(): FormArray {
    return this.deposeElementCuisinesForm.get('gammes') as FormArray;
  }

  // Ajouter un groupe pour un nouvel élément cuisine
  addElementCuisine_gammeGroup(prix:number,label:string): void {
    this.gammes.push(this.createdeposeElementCuisinesGroup(prix,label));
  }

  // Chargement des gammes de dépôt depuis le service
  load_gammes(): void {
    this.userService.getGammesByTravailAndType(2, 'depose').subscribe(
      (response: any) => {
        this.gammes_depose = response;
        console.log("gammes depose: ",this.gammes_depose)
        this.initializeForm();
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des gammes :', error);
      }
    );
  }

  // Initialisation du formulaire après récupération des gammes
  initializeForm(): void {
    const prev_form = this.gestiondesdevisService.getFormulaireByName('gammes-produits-depose-elementcuisines');
    if (prev_form) {
      this.deposeElementCuisinesForm = this.fb.group({
        gammes: this.fb.array([])
      });
      prev_form.formulaire.gammes.forEach((gamme: any) => {
        this.gammes.push(this.fb.group(gamme));
      });
      this.deposeElementCuisinesForm.patchValue(prev_form.formulaire);
    } else {
      this.deposeElementCuisinesForm = this.fb.group({
        gammes: this.fb.array([])
      });
      this.gammes_depose.forEach((gamme) => {
        this.addElementCuisine_gammeGroup(gamme.Prix,gamme.Label);
      });
    }
  }

  // Gestion de la sélection des fichiers
  onGammeFileChange(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    const file: File = (inputElement.files as FileList)[0];
    if (file.size <= this.maxFileSize && file.type.startsWith('image/')) {
      this.gammes.at(index).patchValue({
        image: file
      });
    } else {
      console.log('Please upload an image file less than 10 MB.');
      inputElement.value = ''; // Reset the input if the file is invalid
    }
    
  }

  // Marquer tout le formulaire comme touché pour déclencher la validation
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      const abstractControl = control as AbstractControl;
      abstractControl.markAsTouched();
      if (abstractControl instanceof FormGroup) {
        this.markFormGroupTouched(abstractControl);
      }
    });
  }
}

  
