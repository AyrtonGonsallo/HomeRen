import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';

@Component({
  selector: 'app-formulaire-pose-porte',
  templateUrl: './formulaire-pose-porte.component.html',
  styleUrl: './formulaire-pose-porte.component.css'
})
export class FormulairePosePorteComponent {
  //formulaires des poses et deposes
 posePortesForm: FormGroup;
 
 // les portes dynamiques du formulaire de pose portes
 get portes(): FormArray {
   return this.posePortesForm.get('portes') as FormArray;
 }
 
 addPortesGroup(): void {
   if (this.portes.length < 8) {
     this.portes.push(this.createposePortesGroup());
   }
 }
 
 removePortesGroup(index: number): void {
   if (this.portes.length > 1) {
     this.portes.removeAt(index);
   }
 }
 
 onPosePortesSubmit(): void {
   if (this.posePortesForm.valid) {
     console.log(this.posePortesForm.value);
     // Envoyer les données au backend ou traiter comme nécessaire
   }
 }
 createposePortesGroup(): FormGroup {
   return this.fb.group({
     type: ['', Validators.required],//select avec valeurs Porte alveolaire simple,Porte alveolaire double,Porte pleine double,Porte pleine simple, Porte vitrée simple,Porte vitrée double
     type2: ['', Validators.required],// select avec valeurs a peindre, stratifiee, bois, autre 
     type3: ['', Validators.required],//select avec valeurs porte simple, porte double
     finition: ['', Validators.required],//select avec valeurs a Finition à peindre, finition stratifiee,finition bois,autre. Preciser
     infos_comp_type: ['', ],//text area
     infos_comp_finition: ['', ],//text area
   });
 }
 constructor(private fb: FormBuilder,private userService: ApiConceptsEtTravauxService) {
   this.posePortesForm = this.fb.group({
     portes: this.fb.array([this.createposePortesGroup()])
   });
  
  
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
 
  