import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

    validateForm: FormGroup<{
      userName: FormControl<string>;
      Email: FormControl<string>;
      
      Telephone: FormControl<string>;
      Message: FormControl<string>;
    }>;
  
    submitForm(): void {
      console.log('submit', this.validateForm.value);
    }
  
    resetForm(e: MouseEvent): void {
      e.preventDefault();
      this.validateForm.reset();
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
  
    
  
    constructor(private fb: NonNullableFormBuilder) {
      this.validateForm = this.fb.group({
        userName: ['', [Validators.required], [this.userNameAsyncValidator]],
        Email: ['', [Validators.email, Validators.required]],
        Telephone: ['', [Validators.required]],
        
        Message: ['', [Validators.required]]
      });
    }
}
