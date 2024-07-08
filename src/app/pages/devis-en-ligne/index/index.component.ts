import { Component, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
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
  mursForm: FormGroup;
  plafondForm: FormGroup;
  constructor(private _iconService: IconService,private renderer: Renderer2,private fb: FormBuilder,private router: Router,private message: NzMessageService,private userService: ApiConceptsEtTravauxService) {
    this.mursForm = this.fb.group({
      murs: this.fb.array([this.createMurGroup()])
    });
    this.plafondForm = this.createPlafondGroup();
  }
  ngOnInit(): void {
    this.loadPieces()
  }
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
  travaux:Travail[]=[]
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





  get murs(): FormArray {
    return this.mursForm.get('murs') as FormArray;
  }

  createMurGroup(): FormGroup {
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

  createPlafondGroup(): FormGroup {
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
  onPlafondFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file: File = (inputElement.files as FileList)[0];
    if (file.size <= this.maxFileSize && file.type.startsWith('image/')) {
      this.plafondForm.patchValue({
        image: file
      });
    } else {
      console.log('Please upload an image file less than 10 MB.');
      inputElement.value = ''; // Reset the input if the file is invalid
    }
    
  }
  addMurGroup(): void {
    if (this.murs.length < 4) {
      this.murs.push(this.createMurGroup());
    }
  }

  removeMurGroup(index: number): void {
    if (this.murs.length > 1) {
      this.murs.removeAt(index);
    }
  }

  onMursSubmit(): void {
    if (this.mursForm.valid) {
      console.log(this.mursForm.value);
      // Envoyer les données au backend ou traiter comme nécessaire
    }
  }
  onPlafondSubmit(): void {
    if (this.plafondForm.valid) {
      console.log(this.plafondForm.value);
      // Envoyer les données au backend ou traiter comme nécessaire
    }
  }

  
}
