import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-gammes-produits-renovation-electrique',
  templateUrl: './gammes-produits-renovation-electrique.component.html',
  styleUrl: './gammes-produits-renovation-electrique.component.css'
})
export class GammesProduitsRenovationElectriqueComponent {
  isclicked=false
  baseurl=environment.imagesUrl
  @Input() triggerSubmitGammesProduitsForm!: boolean;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitGammesProduitsForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitGammesProduitsForm)
      if(this.triggerSubmitGammesProduitsForm==true){
        this.isclicked=true
        this.onRenovationElectriqueSubmit();
      }
      
    }
  }
  @Output() formValidityChange = new EventEmitter<boolean>();
  renovationElectriqueForm: FormGroup;
  
  // le formulaire de pose plafond
  createRenovationElectriqueGroup(): FormGroup {
    return this.fb.group({
      gamme: ["",Validators.required ],
      image_tableau_elec: ["",],
      remplacer_tab: [false,]
    });
  }
  onRenovationElectriqueSubmit(): void {
    this.formValidityChange.emit(this.renovationElectriqueForm.valid);
    if (this.renovationElectriqueForm.invalid) {
      return;
    }
    if (this.renovationElectriqueForm.valid) {
      //console.log(this.renovationElectriqueForm.value);
      // Envoyer les données au backend ou traiter comme nécessaire
      this.gestiondesdevisService.addFormulaire('dimensions-renovation-electrique',15, this.renovationElectriqueForm.value);
      this.gestiondesdevisService.addFormulaire('etat-surfaces-renovation-electrique',15, this.renovationElectriqueForm.value);
      this.gestiondesdevisService.addFormulaire('gammes-produits-renovation-electrique',15, this.renovationElectriqueForm.value);
    // Envoyer les données au backend ou traiter comme nécessaire
    this.gestiondesdevisService.groupform('renovation-electrique',15, 'dimensions-renovation-electrique','etat-surfaces-renovation-electrique','gammes-produits-renovation-electrique')
    console.log(this.gestiondesdevisService.getFormulaireByName("renovation-electrique"));
  
    }
  }
  
  constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {
    this.load_gammes()
    const prev_form = this.gestiondesdevisService.getFormulaireByName('gammes-produits-renovation-electrique');
    if (prev_form) {
      console.log("formulaire existant",prev_form)
      this.renovationElectriqueForm = this.createRenovationElectriqueGroup();
      this.renovationElectriqueForm.patchValue(prev_form.formulaire);

    } else {
      console.log("formulaire non existant")
      this.renovationElectriqueForm = this.createRenovationElectriqueGroup();
    }
  }
  
  
  gammes:any
  load_gammes(){
    this.userService.getGammesByTravailAndType(15,"renovation-electrique-complete").subscribe(
      (response: any) => {
        console.log('recuperation des gammes rec:', response);
        this.gammes=response
      },
      (error: any) => {
        console.error('Erreur lors de la recuperation des gammes rec :', error);
      }
    );
  
  }

  //upload des images sur tous les formulaires
maxFileSize = 10 * 1024 * 1024; // 10 MB en octets
onFileChange(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const file: File = (inputElement.files as FileList)[0];
  if (file.size <= this.maxFileSize && file.type.startsWith('image/')) {
    this.renovationElectriqueForm.patchValue({
      image_tableau_elec: file
    });
  } else {
    console.log('Please upload an image file less than 10 MB.');
    inputElement.value = ''; // Reset the input if the file is invalid
  }
  
}
  }
  
