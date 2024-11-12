import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  
  validateForm: FormGroup<{
    AdressePostale: FormControl<string>;
    Nom: FormControl<string>;
    Prenom: FormControl<string>;
    Email: FormControl<string>;
    Password: FormControl<string>;
    Telephone: FormControl<string>;
    checkPassword: FormControl<string>;
    RoleId: FormControl<number>;
    Agree: FormControl<boolean>;
  }>;
  
  

  submitForm(): void {
    if (this.validateForm.valid) {
       // Écrasez les valeurs des champs spécifiés avant la soumission
       
      console.log('submit', this.validateForm.value);
      this.userService.addParticulier(this.validateForm.value).subscribe(
        (response) => {
          console.log('Utilisateur ajouté avec succès :', response);
          this.message.create('success', `Utilisateur ajouté avec succès`);
              //this.router.navigate(['/administration/comptes']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
        }
      );
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.Password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  isArtisan(){
    return this.validateForm.value.RoleId==2
  }
  isParticulier(){
    return this.validateForm.value.RoleId==3
  }
  isArtisanorParticulier(){
    return ((this.validateForm.value.RoleId==2) || (this.validateForm.value.RoleId==3))
  }

  constructor(private fb: NonNullableFormBuilder,private http: HttpClient,private userService: ApiConceptsEtTravauxService,private message: NzMessageService, private router: Router) {
    this.validateForm = this.fb.group({
      AdressePostale:['', [Validators.required]],
      Email: ['', [Validators.email, Validators.required]],
      Password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
      Nom: ['', [Validators.required]],
      Prenom: ['', [Validators.required]],
      Telephone: ['', [Validators.required]],
      Agree: [false, [this.requiredTrueValidator()]], // Utilisation du validateur personnalisé
      RoleId: [2, []],
    });

    // Watch for changes to RoleId and update validators accordingly
    this.validateForm.get('RoleId')!.valueChanges.subscribe(roleId => {
      this.updateValidators(roleId);
    });
  }
  requiredTrueValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value === true ? null : { requiredTrue: { value: control.value } };
    };
  }
   // Function to update validators based on RoleId value
   updateValidators(roleId: number): void {
    if (roleId === 3) {
      this.validateForm.get('CodePostal')!.setValidators([Validators.required]);
      this.validateForm.get('CommunePostale')!.setValidators([Validators.required]);
      this.validateForm.get('AdressePostale')!.setValidators([Validators.required]);
    } else {
      this.validateForm.get('CodePostal')!.clearValidators();
      this.validateForm.get('CommunePostale')!.clearValidators();
      this.validateForm.get('AdressePostale')!.clearValidators();
    }

    // Update the validity of the form controls
    this.validateForm.get('CodePostal')!.updateValueAndValidity();
    this.validateForm.get('CommunePostale')!.updateValueAndValidity();
    this.validateForm.get('AdressePostale')!.updateValueAndValidity();
  }
  
  ngOnInit(): void {
    
  }


}
