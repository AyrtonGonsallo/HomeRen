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
 
  is_active_Tp3=false
  active_Tp1(){
    this.is_active_Tp1=!this.is_active_Tp1
  }

  active_Tp3(){
    this.is_active_Tp3=!this.is_active_Tp3
  }
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
    var bool=false
    if(this.is_active_Tp1){
      bool=this.onSubmitform1()
    }
    if(this.is_active_Tp3){
      bool= this.onSubmitform3() && bool
    }
    this.formValidityChange.emit(bool);
    if (bool) {
      const fusion = {
        ...this.mursNonporteursForm.value,  // Valeurs du formulaire du haut
        ...this.ouverturePartielleForm.value,
        "tp1":this.is_active_Tp1,
        
        "tp3":this.is_active_Tp3,
      };
      console.log(fusion);
      this.gestiondesdevisService.addFormulaire('dimensions-murs-non-porteurs',3, fusion);
      this.gestiondesdevisService.addFormulaire('etat-surfaces-murs-non-porteurs',3, fusion);
      // Envoyer les données au backend ou traiter comme nécessaire
    }
  }
  onSubmitform1(): boolean {
    this.glob_err_form1=""
    const mursNonporteursArray = this.mursNonporteursForm.get('mursNonporteurs') as FormArray;
  console.log("nombre de murs ",mursNonporteursArray.length)
  let res=true
    // Vérifier que chaque groupe du FormArray est correctement rempli
    for (let i = 0; i < mursNonporteursArray.length; i++) {
      const group = mursNonporteursArray.at(i) as FormGroup;
      const controls = group.controls;
  
      if (
        controls['longueur'].value === '' ||
        controls['hauteur'].value === '' ||
        controls['epaisseur'].value === '' ||
        controls['epaisseur'].invalid  ||
        controls['ndp'].value === ''
      ) {
        //console.error(`Tous les champs doivent être remplis pour la démolition du mur ${i + 1}`);
        this.exist_glob_err_form1=true
        this.glob_err_form1+=`Tous les champs doivent être remplis pour la démolition du mur ${i + 1}. `
        //group.markAllAsTouched(); // Affiche les erreurs pour ce groupe
        res=res && false
      }
    }
  
   
  
    return res;
  }
  glob_err_form1:string=""
  glob_err_form2:string=""
  exist_glob_err_form1:boolean=false
  exist_glob_err_form2:boolean=false
  
  onSubmitform3(): boolean {
    this.glob_err_form2=""
    const ouverturePartielleArray = this.ouverturePartielleForm.get('ouverturePartielle') as FormArray;
    let res=true
    for (let i = 0; i < ouverturePartielleArray.length; i++) {
      const group = ouverturePartielleArray.at(i) as FormGroup;
      const controls = group.controls;
  
      if (
        controls['longueur'].value === '' ||
        controls['hauteur'].value === '' ||
        controls['epaisseur'].value === '' ||
        controls['epaisseur'].invalid ||
        controls['longueur_ouverture'].value === '' ||
        controls['hauteur_ouverture'].value === '' ||
        controls['hauteur_depuis_le_sol'].value === '' ||
        controls['hauteur_depuis_le_plafond'].value === ''
      ) {
        //console.error(`Tous les champs doivent être remplis pour la démolition partielle du mur ${i + 1}`);
        //group.markAllAsTouched();
        this.exist_glob_err_form2=true
        this.glob_err_form2+=`Tous les champs doivent être remplis pour la démolition partielle du mur ${i + 1}. `
        res=res && false
      }
    }
  
    
  
    return res;
  }
  
  
  mursNonporteursForm: FormGroup;
  ouverturePartielleForm: FormGroup;
  get mursNonporteurs(): FormArray {
    return this.mursNonporteursForm.get('mursNonporteurs') as FormArray;
  }
  get ouverturePartielle(): FormArray {
    return this.ouverturePartielleForm.get('ouverturePartielle') as FormArray;
  }
  
  createmursNonporteursGroup(): FormGroup {
    return this.fb.group({
      longueur: ['', this.is_active_Tp1 ? Validators.required : null],
      hauteur: ['', this.is_active_Tp1 ? Validators.required : null],
      epaisseur: ['', this.is_active_Tp1 ? Validators.required : null],
      ndp: [0, this.is_active_Tp1 ? Validators.required : null],
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
      longueur_ouverture: ['', this.is_active_Tp3 ? Validators.required : null],
      hauteur_ouverture : ['', this.is_active_Tp3 ? Validators.required : null],
      hauteur_depuis_le_sol: ['', this.is_active_Tp3 ? Validators.required : null],
      hauteur_depuis_le_plafond : ['', this.is_active_Tp3 ? Validators.required : null],
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


  prec_formulaire_dimensions:any
  constructor(private fb: FormBuilder,private gestiondesdevisService: GestionDesDevisService) {
  
    this.prec_formulaire_dimensions=this.gestiondesdevisService.getFormulaireByName("dimensions-murs-non-porteurs")
    if(this.prec_formulaire_dimensions){
      let form=this.prec_formulaire_dimensions.formulaire
      console.log("formulaire existant",form)
      this.is_active_Tp1=form.tp1
      this.is_active_Tp3=form.tp3
      
      // Handling `mursNonporteursForm`
      this.mursNonporteursForm = this.fb.group({
        mursNonporteurs: this.fb.array([])
      });
      const mursArray = this.mursNonporteursForm.get('mursNonporteurs') as FormArray;
      form.mursNonporteurs.forEach((mursNonporteur: any) => {
        mursArray.push(this.fb.group({
          longueur: [mursNonporteur.longueur, this.is_active_Tp1 ? Validators.required : null],
          hauteur: [mursNonporteur.hauteur, this.is_active_Tp1 ? Validators.required : null],
          epaisseur: [mursNonporteur.epaisseur, this.is_active_Tp1 ? Validators.required : null],
          ndp: [mursNonporteur.ndp, this.is_active_Tp1 ? Validators.required : null],
          image: [mursNonporteur.image]
        }));
      });

      // Handling `ouverturePartielleForm`
      this.ouverturePartielleForm = this.fb.group({
        ouverturePartielle: this.fb.array([])
      });
      const ouvertureArray = this.ouverturePartielleForm.get('ouverturePartielle') as FormArray;
      form.ouverturePartielle.forEach((ouverture: any) => {
        ouvertureArray.push(this.fb.group({
          longueur: [ouverture.longueur, this.is_active_Tp3 ? Validators.required : null],
          hauteur: [ouverture.hauteur, this.is_active_Tp3 ? Validators.required : null],
          epaisseur: [ouverture.epaisseur, this.is_active_Tp3 ? Validators.required : null],
          longueur_ouverture: [ouverture.longueur_ouverture, this.is_active_Tp3 ? Validators.required : null],
          hauteur_ouverture : [ouverture.hauteur_ouverture, this.is_active_Tp3 ? Validators.required : null],
          hauteur_depuis_le_sol: [ouverture.hauteur_depuis_le_sol, this.is_active_Tp3 ? Validators.required : null],
          hauteur_depuis_le_plafond : [ouverture.hauteur_depuis_le_plafond, this.is_active_Tp3 ? Validators.required : null],
          image: [ouverture.image]
        }));
      });

    }else{
      console.log("formulaire non existant")
      
      this.mursNonporteursForm = this.fb.group({
        mursNonporteurs: this.fb.array([this.createmursNonporteursGroup()])
      });
      this.ouverturePartielleForm = this.fb.group({
        ouverturePartielle: this.fb.array([this.createouverturePartielleGroup()])
      });
    }
    
    
   
   
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
