import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';
import { ApiConceptsEtTravauxService } from '../../../../services/api-concepts-et-travaux.service';

@Component({
  selector: 'app-gammes-produits-pose-murs',
  templateUrl: './gammes-produits.component.html',
  styleUrl: '../formulaire-pose-murs.component.css'
})
export class GammesProduitsComponent {
//formulaires des poses et deposes
poseMursForm: FormGroup;
formulaire_dimensions:any
formulaire_dimensions_length:number=0
// les murs dynamiques du formulaire de pose murs
get murs(): FormArray {
  return this.poseMursForm.get('murs') as FormArray;
}

addMurGroup(): void {
  if (this.murs.length < 4) {
    this.murs.push(this.createposeMurGroup());
  }
}

removeMurGroup(index: number): void {
  if (this.murs.length > 1) {
    this.murs.removeAt(index);
  }
}

onPoseMursSubmit(): void {
  if (this.poseMursForm.valid) {
    //console.log(this.poseMursForm.value);
    this.gestiondesdevisService.addFormulaire('gammes-produits-pose-murs',5, this.poseMursForm.value);
    // Envoyer les données au backend ou traiter comme nécessaire
    this.gestiondesdevisService.groupform('pose-murs',5, 'dimensions-pose-murs','etat-surfaces-pose-murs','gammes-produits-pose-murs')
    console.log(this.gestiondesdevisService.getFormulaireByName("pose-murs"));
  }
}
createposeMurGroup(): FormGroup {
  return this.fb.group({
   
    carrelage: [0, ],
    papier: [0, ],
    enduit: [0, ],
    peinture: [0, ]
  });
}
constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService,private userService:ApiConceptsEtTravauxService) {
  this.poseMursForm = this.fb.group({
    murs: this.fb.array([this.createposeMurGroup()])
  });
  this.formulaire_dimensions=this.gestiondesdevisService.getFormulaireByName("dimensions-pose-murs")
  this.formulaire_dimensions_length=this.formulaire_dimensions.formulaire.murs.length
  for(let i=0;i<(this.formulaire_dimensions_length-1);i++){
    this.addMurGroup()
  }
  console.log(this.formulaire_dimensions)
  this.load_gammes()
 
}
//upload des images sur tous les formulaires
maxFileSize = 10 * 1024 * 1024; // 10 MB en octets
onMursFileChange(event: Event, index: number): void {
  const inputElement = event.target as HTMLInputElement;
  const file: File = (inputElement.files as FileList)[0];
  if (file.size <= this.maxFileSize && file.type.startsWith('image/')) {
    this.murs.at(index).patchValue({
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
gammes_peinture:any
gammes_enduit:any
gammes_papier:any
gammes_carrelage:any
load_gammes(){
  this.userService.getGammesByTravailAndType(5,"peinture").subscribe(
    (response: any) => {
      console.log('recuperation des gammes peinture:', response);
      this.gammes_peinture=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes peinture :', error);
    }
  );
  this.userService.getGammesByTravailAndType(5,"enduit-decoratif").subscribe(
    (response: any) => {
      console.log('recuperation des gammes enduit-decoratif:', response);
      this.gammes_enduit=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes enduit-decoratif :', error);
    }
  );
  this.userService.getGammesByTravailAndType(5,"papier-peint").subscribe(
    (response: any) => {
      console.log('recuperation des gammes papier-peint:', response);
      this.gammes_papier=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes papier-peint :', error);
    }
  );
  this.userService.getGammesByTravailAndType(5,"carrelage").subscribe(
    (response: any) => {
      console.log('recuperation des gammes carrelage:', response);
      this.gammes_carrelage=response
    },
    (error: any) => {
      console.error('Erreur lors de la recuperation des gammes carrelage :', error);
    }
  );
}

}
