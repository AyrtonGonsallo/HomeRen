import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';

@Component({
  selector: 'app-formulaire-pose-chauffage',
  templateUrl: './formulaire-pose-chauffage.component.html',
  styleUrl: './formulaire-pose-chauffage.component.css'
})
export class FormulairePoseChauffageComponent {
  poseChauffageForm: FormGroup;
  
  // le formulaire de pose plafond
  createPoseChauffageGroup(): FormGroup {
    return this.fb.group({
      pose_de_radiateur_existant: ['', ],
      creation_de_canalisations: ['', ],
     
    });
  }
  onPoseChauffageSubmit(): void {
    if (this.poseChauffageForm.invalid) {
      this.markFormGroupTouched(this.poseChauffageForm);
      return;
    }
    if (this.poseChauffageForm.valid) {
      console.log(this.poseChauffageForm.value);
      // Envoyer les données au backend ou traiter comme nécessaire
    }
  }
  
  constructor(private fb: FormBuilder,private userService: ApiConceptsEtTravauxService) {
    
    this.poseChauffageForm = this.createPoseChauffageGroup();
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
  
  }
  