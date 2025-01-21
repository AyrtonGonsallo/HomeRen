import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
 se_connecter=true
 has_error=false
 error_msg=""
 switch_form(){
    this.se_connecter=!this.se_connecter
 }
  loginForm: FormGroup<{
    
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  submitloginForm(): void {
    if(this.loginForm.valid){
      console.log('submit', this.loginForm.value);
      this.userService.loginFrontUtilisateur(this.loginForm.value).subscribe(
        (response: any) => {
          console.log('connexion reussie :', response);
          this.authService.setUser(response)
        },
        (error: any) => {
          console.error('Erreur lors de la connexion :', error.error.error);
          this.error_msg=error.error.error
          this.has_error=true
        }
      );
    }else{
      console.log("formulaire non valide");
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.loginForm.reset();
  }

 

  userNameAsyncValidator: AsyncValidatorFn = (control: AbstractControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

    mustBeTrueValidator(control: any) {
      return control.value === true ? null : { mustBeTrue: true };
    }
    differentfromzeroValidator(control: any) {
      return control.value !== 0 ? null : { mustBeDifferentFromZero: true };
    }
    

  constructor(private fb: NonNullableFormBuilder,private shop:ShoppingCartService,private userService:ApiConceptsEtTravauxService,private authService:AuthServiceService,private router:Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(3),Validators.required]],
    });

    this.registrationForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
      nom: ['', [Validators.required]],
      roleId:[0, [Validators.required,this.differentfromzeroValidator]],
      CommunePostale:['', []],
      AdressePostale:['', []],
      CodePostal:['', []],
      phoneNumber: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      agree: [false, [this.mustBeTrueValidator]],
      deviceID: [this.shop.getUniqueDeviceId()]
    });
    
    this.passforgotForm= this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      
    });

    
  }
    role=0
    roleChange(value: number): void {
      this.role=value
    }









  registrationForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    checkPassword: FormControl<string>;
    nom: FormControl<string>;
    CodePostal: FormControl<string>;
    CommunePostale: FormControl<string>;
    AdressePostale: FormControl<string>;
    roleId: FormControl<number>;
    prenom: FormControl<string>;
    phoneNumber: FormControl<string>;
    agree: FormControl<boolean>;
    deviceID: FormControl<string>;
  }>;

  registration_done=false
  registrate(): void {
    if (this.registrationForm.valid) {
      console.log('submit', this.registrationForm.value);
      this.userService.addFrontUtilisateur(this.registrationForm.value).subscribe(
        (response: any) => {
          console.log('inscription reussie:', response);
          this.registration_done=true
          this.se_connecter=true
          
        },
        (error: any) => {
          console.error('Erreur lors de l\'inscription\' :', error);
        }
      );
    } else {
      Object.values(this.registrationForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.registrationForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.registrationForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  isVisible = false;
  
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.submitpassForgotForm()
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  passforgotForm: FormGroup<{
    email: FormControl<string>;
  }>;
  recup_reussie=false
  recup_echouee=false
  submitpassForgotForm(): void {
    if (this.passforgotForm.valid) {
      console.log('submit', this.passforgotForm.value);
      this.userService.restaurepassword(this.passforgotForm.value.email??'').subscribe(
        (response: any) => {
          console.log('restauration de mot de passe reussie:', response);
          this.recup_reussie=true
          setTimeout(() => {
            this.isVisible=false
          }, 5000);

         
        },
        (error: any) => {
          console.error('Erreur lors de la restauration de mot de passe :', error);
          this.recup_echouee=true
        }
      );
    } else {
      Object.values(this.passforgotForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
