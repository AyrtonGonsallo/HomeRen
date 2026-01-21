import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dimensions-pose-sol',
  templateUrl: './dimensions.component.html',
   styleUrl: '../formulaire-pose-sol.component.css'
})
export class PoseSolDimensionsComponent {
  baseurl=environment.imagesUrl
  assetsUrl=environment.assetsUrl
  isclicked=false
  poseSolForm: FormGroup;
  @Input() selectedPiece: any; // Déclaration de l'entrée selectedPiece
  @Input() surfacemax: number=0; 
  @Input() triggerSubmitDimensionForm!: boolean;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitDimensionForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitDimensionForm)
      if(this.triggerSubmitDimensionForm==true){
        this.isclicked=true
        this.onPoseSolSubmit();
      }
      
    }
  }
  @Output() formValidityChange = new EventEmitter<boolean>();
  //le formulaire de pose sol
  createPoseSolGroup(): FormGroup {
    return this.fb.group({
      longueur: ['', Validators.required],
      largeur: ['', Validators.required],
      depose: ["", Validators.required],
      image: [null]
    });
  }
  get_designation(){
    let titre=this.selectedPiece.Titre
    let id=this.selectedPiece.ID
    if(id ==6){
      return 'du '+titre 
    }else{
      return 'de la '+titre 
    }
  }
  onPoseSolSubmit(): void {
    this.formValidityChange.emit(this.poseSolForm.valid);
    if (this.poseSolForm.invalid) {
      this.markFormGroupTouched(this.poseSolForm);
      return;
    }
    if (this.poseSolForm.valid) {
      console.log(this.poseSolForm.value);
      // Envoyer les données au backend ou traiter comme nécessaire
      this.gestiondesdevisService.addFormulaire("dimensions-pose-sol",9,this.poseSolForm.value)
    }
  }
  
  constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {
    this.load_gammes()
    const prev_form = this.gestiondesdevisService.getFormulaireByName('dimensions-pose-sol');
    if (prev_form) {
      console.log("formulaire existant",prev_form)
      this.poseSolForm = this.createPoseSolGroup();
      this.poseSolForm.patchValue(prev_form.formulaire);

    } else {
      console.log("formulaire non existant")
      this.poseSolForm = this.createPoseSolGroup();
    }
  }
  
  
    //upload des images sur tous les formulaires
    maxFileSize = 10 * 1024 * 1024; // 10 MB en octets
    
    
    
    onFileChange(event: Event,form:FormGroup): void {
      const inputElement = event.target as HTMLInputElement;
      const file: File = (inputElement.files as FileList)[0];
      if (file.size <= this.maxFileSize && file.type.startsWith('image/')) {
        form.patchValue({
          image: file
        });
      } else {
        console.log('Please upload an image file less than 10 MB.');
        inputElement.value = ''; // Reset the input if the file is invalid
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


    gammes_depose:any
    load_gammes(){
     
      this.userService.getGammesByTravailAndTypeOrdered(9,"service-depose-revetement-sol").subscribe(
        (response: any) => {
          console.log('recuperation des gammes gamme_depose:', response);
          this.gammes_depose=response
        },
        (error: any) => {
          console.error('Erreur lors de la recuperation des gammes gamme_depose :', error);
        }
      );

    }

    blockComma(event: KeyboardEvent) {
      if (event.key === ',') {
        event.preventDefault();
      }
    }
  }
  