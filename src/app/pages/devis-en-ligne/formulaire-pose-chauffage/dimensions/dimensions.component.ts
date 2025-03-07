import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';


@Component({
  selector: 'app-dimensions-pose-chauffage',
  templateUrl: './dimensions.component.html',
  styleUrl: '../formulaire-pose-chauffage.component.css'
})
export class PoseChauffageDimensionsComponent {
 
  isclicked=false
  @Input() triggerSubmitDimensionForm!: boolean;
  @Input() surfacemax: number=0; 
  modele: any;
  appareilGroup: any;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitDimensionForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitDimensionForm)
      if(this.triggerSubmitDimensionForm==true){
        
          this.onPoseChauffageSubmit()
        
        this.isclicked=true
      }
      
    }
  }
  @Output() formValidityChange = new EventEmitter<boolean>();
  poseChauffageForm: FormGroup;
  
  // le formulaire de pose plafond
  createPoseChauffageGroup(): FormGroup {
    return this.fb.group({
      surface: ['',Validators.required ],
      hauteur: ['',Validators.required ],
    });
  }
  onPoseChauffageSubmit(): void {
    this.formValidityChange.emit(this.poseChauffageForm.valid);
    if (this.poseChauffageForm.invalid) {
      this.markFormGroupTouched(this.poseChauffageForm);
      return;
    }
    if (this.poseChauffageForm.valid) {
     // console.log(this.poseChauffageForm.value);
      // Envoyer les données au backend ou traiter comme nécessaire
      this.gestiondesdevisService.addFormulaire("dimensions-pose-chauffage",12,this.poseChauffageForm.value)
    console.log(this.poseChauffageForm.value);
    }
  }
  prec_formulaire_dimensions:any
  constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService) {
    
 
    
    this.prec_formulaire_dimensions=this.gestiondesdevisService.getFormulaireByName("dimensions-pose-chauffage")
    if(this.prec_formulaire_dimensions){
      let form=this.prec_formulaire_dimensions.formulaire
      console.log("formulaire existant",form)
      this.poseChauffageForm = this.createPoseChauffageGroup();
      this.poseChauffageForm.patchValue(form)
    }
    else{
      console.log("formulaire inexistant")
      this.poseChauffageForm = this.createPoseChauffageGroup();
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

  blockComma(event: KeyboardEvent) {
    if (event.key === ',') {
      event.preventDefault();
    }
  }
  }
  
