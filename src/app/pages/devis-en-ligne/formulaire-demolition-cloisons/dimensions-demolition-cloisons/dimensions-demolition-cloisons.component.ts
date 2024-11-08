import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionDesDevisService } from '../../../../services/gestion-des-devis.service';

@Component({
  selector: 'app-dimensions-demolition-cloisons',
  templateUrl: './dimensions-demolition-cloisons.component.html',
  styleUrl: './dimensions-demolition-cloisons.component.css'
})
export class DimensionsDemolitionCloisonsComponent {
  is_active_Tp1=false
  is_active_Tp2=false
  is_active_Tp3=false
  isclicked=false
  @Input() triggerSubmitDimensionForm!: boolean;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerSubmitDimensionForm']) {
      console.log("trigger de soumission: ",this.triggerSubmitDimensionForm)
      if(this.triggerSubmitDimensionForm==true){
        this.onSubmit();
        this.isclicked=true
      }
      
    }
  }
  @Output() formValidityChange = new EventEmitter<boolean>();
  onSubmit(): void {
    this.formValidityChange.emit(this.onSubmitform1() && this.onSubmitform2() && this.onSubmitform3());
    if (this.onSubmitform1() && this.onSubmitform2() && this.onSubmitform3()) {
      const fusion = {
        ...this.mursNonporteursForm.value,  // Valeurs du formulaire du haut
        ...this.deposePorteForm.value,   // Valeurs du formulaire du bas
        ...this.ouverturePartielleForm.value,
        "tp1":this.is_active_Tp1,
        "tp2":this.is_active_Tp2,
        "tp3":this.is_active_Tp3,
      };
      console.log(fusion);
      this.gestiondesdevisService.addFormulaire('dimensions-murs-non-porteurs',3, fusion);
      this.gestiondesdevisService.addFormulaire('etat-surfaces-murs-non-porteurs',3, fusion);
      // Envoyer les données au backend ou traiter comme nécessaire
    }
  }
  onSubmitform1(): boolean {
    if (this.mursNonporteursForm.valid) {
      return true
    }
    return false
  }
  onSubmitform2(): boolean {
    if (this.deposePorteForm.valid) {
      return true
    }
    return false
  }
  onSubmitform3(): boolean {
    if (this.ouverturePartielleForm.valid) {
      return true
    }
    return false
  }
  mursNonporteursForm: FormGroup;
  deposePorteForm: FormGroup;
  ouverturePartielleForm: FormGroup;
  get mursNonporteurs(): FormArray {
    return this.mursNonporteursForm.get('mursNonporteurs') as FormArray;
  }
  get ouverturePartielle(): FormArray {
    return this.ouverturePartielleForm.get('ouverturePartielle') as FormArray;
  }
  createdeposePorteGroup(): FormGroup {
    return this.fb.group({
      quantite_portes_simples_creuse: [0, this.is_active_Tp2 ? Validators.required : null],
      quantite_portes_doubles_creuses: [0, this.is_active_Tp2 ? Validators.required : null],
      quantite_porte_simple_plein: [0, this.is_active_Tp2 ? Validators.required : null],
      quantite_porte_double_pleine: [0, this.is_active_Tp2 ? Validators.required : null],
     
    });
  }
  createmursNonporteursGroup(): FormGroup {
    return this.fb.group({
      longueur: ['', this.is_active_Tp1 ? Validators.required : null],
      hauteur: ['', this.is_active_Tp1 ? Validators.required : null],
      epaisseur: ['', this.is_active_Tp1 ? Validators.required : null],
      volume: ['', this.is_active_Tp1 ? Validators.required : null],
      image: [null]
    });
    
  }
  addmursNonporteursGroup(): void {
    if (this.mursNonporteurs.length < 4) {
      this.mursNonporteurs.push(this.createmursNonporteursGroup());
    }
  }
  
  removemursNonporteursGroup(index: number): void {
    if (this.mursNonporteurs.length > 1) {
      this.mursNonporteurs.removeAt(index);
    }
  }
  createouverturePartielleGroup(): FormGroup {
    return this.fb.group({
      longueur: ['', this.is_active_Tp3 ? Validators.required : null],
      hauteur: ['', this.is_active_Tp3 ? Validators.required : null],
      epaisseur: ['', this.is_active_Tp3 ? Validators.required : null],
      volume: ['', this.is_active_Tp3 ? Validators.required : null],
      longueur_du_mur : ['', this.is_active_Tp3 ? Validators.required : null],
      image: [null]
    });
  }
  addouverturePartielleGroup(): void {
    if (this.ouverturePartielle.length < 4) {
      this.ouverturePartielle.push(this.createouverturePartielleGroup());
    }
  }
  
  removeouverturePartielleGroup(index: number): void {
    if (this.ouverturePartielle.length > 1) {
      this.ouverturePartielle.removeAt(index);
    }
  }
  constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService) {
  
    this.mursNonporteursForm = this.fb.group({
      mursNonporteurs: this.fb.array([this.createmursNonporteursGroup()])
    });
    this.ouverturePartielleForm = this.fb.group({
      ouverturePartielle: this.fb.array([this.createouverturePartielleGroup()])
    });
    this.deposePorteForm = this.createdeposePorteGroup();
    
   
   
  }



  //upload des images sur tous les formulaires
  maxFileSize = 10 * 1024 * 1024; // 10 MB en octets
  onmursNonporteursFileChange(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    const file: File = (inputElement.files as FileList)[0];
    if (file.size <= this.maxFileSize && file.type.startsWith('image/')) {
      this.mursNonporteurs.at(index).patchValue({
        image: file
      });
    } else {
      console.log('Please upload an image file less than 10 MB.');
      inputElement.value = ''; // Reset the input if the file is invalid
    }
  }

  onouverturePartielleFileChange(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    const file: File = (inputElement.files as FileList)[0];
    if (file.size <= this.maxFileSize && file.type.startsWith('image/')) {
      this.ouverturePartielle.at(index).patchValue({
        image: file
      });
    } else {
      console.log('Please upload an image file less than 10 MB.');
      inputElement.value = ''; // Reset the input if the file is invalid
    }
  }

}
