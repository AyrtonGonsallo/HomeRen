import { Component, Renderer2 } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Piece } from '../../../Models/Piece';
import { environment } from '../../../environments/environment';
import { IconService } from '@ant-design/icons-angular';
import { Travail } from '../../../Models/Travail';
interface ItemData {
  ID: number;
  Titre: string;
  Description: string;
  Pieces: Piece[]
}


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  baseurl=environment.imagesUrl

//chargement des pieces
  pieces_par_categories: any
  loadPieces(): void {
    this.userService.get_pieces_par_categories().subscribe(
      (response) => {
        this.pieces_par_categories = response;
        console.log("réponse de la requette getPiecesparcategories",this.pieces_par_categories);
       
      },
      (error) => {
        console.error('Erreur lors de la recuperation des pieces :', error);
      }
    );
  }
  ngOnInit(): void {
    this.loadPieces()
  }


  //formulaires des poses et deposes
  poseMursForm: FormGroup;
  posePlafondForm: FormGroup;
  poseSolForm: FormGroup;
  
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
    console.log(this.poseMursForm.value);
    // Envoyer les données au backend ou traiter comme nécessaire
  }
}
createposeMurGroup(): FormGroup {
  return this.fb.group({
    hauteur: ['', Validators.required],
    surface: ['', Validators.required],
    longueur: ['', Validators.required],
    etat: ['', Validators.required],
    carrelage: ['', ],
    papier: ['', ],
    enduit: ['', ],
    peinture: ['', ],
    image: [null]
  });
}

// le formulaire de pose plafond
createPosePlafondGroup(): FormGroup {
  return this.fb.group({
    hauteur: ['', Validators.required],
    surface: ['', Validators.required],
    longueur: ['', Validators.required],
    largeur: ['', Validators.required],
    etat: ['', Validators.required],
    carrelage: ['', ],
    papier: ['', ],
    enduit: ['', ],
    peinture: ['', ],
    image: [null]
  });
}
onPosePlafondSubmit(): void {
  if (this.posePlafondForm.invalid) {
    this.markFormGroupTouched(this.posePlafondForm);
    return;
  }
  if (this.posePlafondForm.valid) {
    console.log(this.posePlafondForm.value);
    // Envoyer les données au backend ou traiter comme nécessaire
  }
}

//le formulaire de pose sol
createPoseSolGroup(): FormGroup {
  return this.fb.group({
    surface: ['', Validators.required],
    longueur_piece: ['', Validators.required],
    largeur_piece: ['', Validators.required],
    etat: ['', Validators.required],
    parquet_massif: ['', ],
    paquet_flottant_finition_bois: ['', ],
    parquet_flottant_finition_stratifiee: ['', ],
    sol_pvc: ['', ],
    moquette: ['', ],
    carrelage: ['', ],
    plinthes: ['', ],
    image: [null]
  });
}
onPoseSolSubmit(): void {
  if (this.poseSolForm.invalid) {
    this.markFormGroupTouched(this.poseSolForm);
    return;
  }
  if (this.poseSolForm.valid) {
    console.log(this.poseSolForm.value);
    // Envoyer les données au backend ou traiter comme nécessaire
  }
}




  constructor(private _iconService: IconService,private renderer: Renderer2,private fb: FormBuilder,private router: Router,private message: NzMessageService,private userService: ApiConceptsEtTravauxService) {
    this.poseMursForm = this.fb.group({
      murs: this.fb.array([this.createposeMurGroup()])
    });
    this.posePlafondForm = this.createPosePlafondGroup();
    this.poseSolForm = this.createPoseSolGroup();
  }

 


  //etape 1 choix de la piece
  selectedPiece:any
  selectedPieceId: number | null = null;
  selectPiece(pieceID: number): void {
    if (this.selectedPieceId !== null) {
      const previousElement = document.getElementById(`piece-${this.selectedPieceId}`);
      if (previousElement) {
        this.renderer.setStyle(previousElement, 'border', 'none');
        this.renderer.setStyle(previousElement, 'filter', 'brightness(1');

      }
    }
    this.selectedPieceId = pieceID;
    this.userService.getPiece(this.selectedPieceId).subscribe(
      (response) => {
        this.selectedPiece = response;
        console.log("réponse de la requette getPiece",this.travaux);
       
      },
      (error) => {
        console.error('Erreur lors de la recuperation des details de la piece choisie :', error);
      }
    );
    this.userService.getTravauxByPieceId(this.selectedPieceId).subscribe(
      (response) => {
        this.travaux = response;
        this.listOfData =response;
        this.listOfCurrentPageData=response
        console.log("réponse de la requette getTravauxByPieceId",this.travaux);
       
      },
      (error) => {
        console.error('Erreur lors de la recuperation des travaux par pieces :', error);
      }
    );
    const selectedElement = document.getElementById(`piece-${pieceID}`);
    if (selectedElement) {
      this.renderer.setStyle(selectedElement, 'border', '2px solid #FFC736');
      this.renderer.setStyle(selectedElement, 'filter', 'brightness(0.8)');
    }
  }

// chargement des travaux a faire dans la piece
  travaux:Travail[]=[]
 
  filteredTravaux: Travail[] = [];
  filterTravaux() {
    this.filteredTravaux = this.travaux.filter(travail => this.setOfCheckedId.has(travail.ID));
  }

  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.ID, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.ID, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly ItemData[] = [];
  listOfData: readonly ItemData[] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.ID, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly ItemData[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.ID));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.ID)) && !this.checked;
  }

   // New function to check if a travail exists in filteredTravaux by ID
   travailExists(id: number): boolean {
    return this.filteredTravaux.some(travail => travail.ID === id);
  }


  // gestion des etapes du formulaire
  current = 0;
  index = 'First-content';
  pre(): void {
    this.current -= 1;
    this.changeContent();
  }
  next(): void {
    this.current += 1;
    this.changeContent();
  }
  done(): void {
    console.log('done');
  }
  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = `d`;
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        this.filterTravaux()
        console.log("travaux choisis",this.filteredTravaux)
        break;
      }
      default: {
        this.index = 'error';
      }
    }
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
 

  
}
