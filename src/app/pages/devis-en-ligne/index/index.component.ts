import { Component, Renderer2 } from '@angular/core';
import { ApiConceptsEtTravauxService } from '../../../services/api-concepts-et-travaux.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Piece } from '../../../Models/Piece';
import { environment } from '../../../environments/environment';
import { Travail } from '../../../Models/Travail';
import { GestionDesDevisService } from '../../../services/gestion-des-devis.service';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { exit } from 'process';
import { AuthServiceService } from '../../../services/auth-service.service';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  etapes:any
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

  loadEtapes(): void {
    this.userService.get_etapes_devis().subscribe(
      (response) => {
        this.etapes = response;
        console.log("réponse de la requette get_etapes_devis",this.etapes);
       
      },
      (error) => {
        console.error('Erreur lors de la recuperation des etapes :', error);
      }
    );
  }
  ngOnInit(): void {
    this.loadPieces()
    this.loadEtapes()
    this.getIpAddress();
    this.getBrowserInfo();
   

    const savedPieceId = sessionStorage.getItem('selectedPieceId');
    if (savedPieceId) {
    
      setTimeout(() => {
        this.selectedPieceId = parseInt(savedPieceId) ;
        this.selectPiece(this.selectedPieceId)
        this.current = 1; // Restaurer d'autres états si nécessaire
        console.log('Rechargement: pièce restaurée', savedPieceId);
        // Supprimer la valeur après récupération
        sessionStorage.removeItem('selectedPieceId');

      }, 100); 
    }
  }


  registrationForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    deviceID: FormControl<string>;
    checkPassword: FormControl<string>;
    agree: FormControl<boolean>;
  }>;
  loginForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }>;
  passwordVisible = false;

  constructor(private fb: NonNullableFormBuilder,private renderer: Renderer2,private authService:AuthServiceService,private message: NzMessageService,private userService: ApiConceptsEtTravauxService,private gestiondesdevisService: GestionDesDevisService,private panier:ShoppingCartService) {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      remember: this.fb.control(true)
    });

    this.registrationForm = this.fb.group({
      email: this.fb.control('', [Validators.email, Validators.required]),
      password: this.fb.control('', [Validators.required]),
      checkPassword: this.fb.control('', [Validators.required, this.confirmationValidator]),
      deviceID: this.panier
        .getUniqueDeviceId(),
      agree: this.fb.control(false)
    });
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
    this.is_one_piece_selected=true
    this.userService.getPiece(this.selectedPieceId).subscribe(
      (response) => {
        this.selectedPiece = response;
        console.log("réponse de la requette getPiece",this.travaux);
       
      },
      (error) => {
        console.error('Erreur lors de la recuperation des details de la piece choisie :', error);
      }
    );
    this.userService.getValidatedTravauxByPieceId(this.selectedPieceId).subscribe(
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

  selectPieceAndRedirect(pieceID: number): void {
    if (this.selectedPieceId !== null) {
      const previousElement = document.getElementById(`piece-${this.selectedPieceId}`);
      if (previousElement) {
        this.renderer.setStyle(previousElement, 'border', 'none');
        this.renderer.setStyle(previousElement, 'filter', 'brightness(1');

      }
    }
    this.selectedPieceId = pieceID;
    this.is_one_piece_selected=true

    this.userService.getPiece(this.selectedPieceId).subscribe(
      (response) => {
        this.selectedPiece = response;
        console.log("réponse de la requette getPiece",this.travaux);
       
      },
      (error) => {
        console.error('Erreur lors de la recuperation des details de la piece choisie :', error);
      }
    );


    this.userService.getValidatedTravauxByPieceId(this.selectedPieceId).subscribe(
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
    this.current=1
    this.triggerSubmitDimensionForm= false;
    this.triggerSubmitEtatSurfacesForm= false;
    this.triggerSubmitGammesProduitsForm= false;
    this.hide_finalisation_message=false
    this.gestiondesdevisService.clearFormulaires()
  }
  radioValue = 'A';
  selectTravail(travailID: number){
    if(this.filteredTravail){
      const prevElement = document.getElementById(`tache-${this.filteredTravail.ID}`);
      const prevElementRadio = document.getElementById(`radio-${this.filteredTravail.ID}`);
      if (prevElement) {
        this.renderer.setStyle(prevElement, 'border-bottom', '1px solid #55555538');
        this.renderer.setStyle(prevElement, 'border-top', 'none');
        this.renderer.setStyle(prevElement, 'border-left', 'none');
        this.renderer.setStyle(prevElement, 'border-right', 'none');
        this.renderer.setStyle(prevElement, 'filter', 'brightness(1)');

      }
      if (prevElementRadio) {
        //prevElementRadio.prop('checked', false);  // Décoche le radio bouton du précédent
      }
      console.log("precedent",this.filteredTravail.ID)
    }
    this.is_one_travail_selected=true
    this.filteredTravail = this.travaux.filter(travail => travail.ID === travailID)[0];
    const selectedElement = document.getElementById(`tache-${travailID}`);
    if (selectedElement) {
      this.renderer.setStyle(selectedElement, 'border', '2px solid #FFC736');
      this.renderer.setStyle(selectedElement, 'filter', 'brightness(0.8)');
    }
    //console.log(this.filteredTravail)
  }

// chargement des travaux a faire dans la piece
  travaux:Travail[]=[]
  filteredTravail: any ;
  
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
   is_travail_selected(id: number): boolean {
    return this.filteredTravail.ID == id
  }
  is_one_piece_selected=false
  is_one_travail_selected=false
  is_formulaire_dimensions_valid=false
  is_formulaire_surfaces_valid=false
  is_formulaire_gammes_valid=false

  disable_next():boolean{
    let value=true;
    if(this.current==0 ){
      value= !this.is_one_piece_selected
    }
    if(this.current==1){
      value= !this.is_one_travail_selected
    }else if (this.current>=2){
      value=false
    }

    return value
    
  }
  // gestion des etapes du formulaire
  current = 0;
  index = 'First-content';
  pre(): void {
    if(this.jump_back()){

    }else{
      switch (this.current) {
        case 3:
          this.triggerSubmitDimensionForm = !this.triggerSubmitDimensionForm;
          break;
    
        case 4:
          this.triggerSubmitEtatSurfacesForm = !this.triggerSubmitEtatSurfacesForm;
          break;
    
        case 5:
          this.triggerSubmitGammesProduitsForm = false;
          break;
    
        default:
          this.current -= 1;
          this.changeContent();
          return; // Exit the function if no form submission is triggered
      }
    
      // If we reach here, it means a form submission was triggered.
      // Wait for 2 seconds, then proceed to the next step.
      setTimeout(() => {
        this.current -= 1;
        this.changeContent();
      }, 2000);
    
  }
    
  }
  addtask(): void {
    this.current = 1;
    this.triggerSubmitDimensionForm= false;
    this.triggerSubmitEtatSurfacesForm= false;
    this.triggerSubmitGammesProduitsForm= false;
    this.changeContent();
  }
  public triggerSubmitDimensionForm: boolean = false;
  public triggerSubmitEtatSurfacesForm: boolean = false;
  public triggerSubmitGammesProduitsForm: boolean = false;
  next(): void {
    
   if(this.jump()){

   }else{

    switch (this.current) {
      case 2:
        this.triggerSubmitDimensionForm = !this.triggerSubmitDimensionForm;
        break;
  
      case 3:
        this.triggerSubmitEtatSurfacesForm = !this.triggerSubmitEtatSurfacesForm;
        break;
  
      case 4:
        this.triggerSubmitGammesProduitsForm = !this.triggerSubmitGammesProduitsForm;
        break;
      case 5:
        this.done()
        break;
  
      default:
        this.current += 1;
        this.changeContent();
        return; // Exit the function if no form submission is triggered
    }
    
    // If we reach here, it means a form submission was triggered.
    // Wait for 2 seconds, pour que le formulaire soit soumit et enregistré
    setTimeout(() => {
      if(this.current==2 ){
        console.log("formulaire dim valide ? ",this.is_formulaire_dimensions_valid)
        if(this.is_formulaire_dimensions_valid){
          if( this.filteredTravail.ID==2 ){
            this.current=4
          }else if(  this.filteredTravail.ID==3 || this.filteredTravail.ID==4){
            this.current=5
          }
          else{
            this.current += 1;
          }
          this.changeContent();
        }else{
          this.triggerSubmitDimensionForm=!this.triggerSubmitDimensionForm
        }
        
      }else if(this.current==3){
        if(this.is_formulaire_surfaces_valid){
          this.current += 1;
          this.changeContent();
        }else{
          this.triggerSubmitEtatSurfacesForm=!this.triggerSubmitEtatSurfacesForm
        }
        
      }
      else if(this.current==4){
        console.log("formulaire gammes valide ? ",this.is_formulaire_gammes_valid)
        if(this.is_formulaire_gammes_valid){
          this.current += 1;
          this.changeContent();
        }else{
          this.triggerSubmitGammesProduitsForm=!this.triggerSubmitGammesProduitsForm
        }
        
      }
      else{
        if(this.current<=5 && !this.isconnected){
          this.current += 0;
        }else if(this.current==5 && this.isconnected){
          this.current +=0;
        }
        else{
          this.current += 1;
        }
        
        this.changeContent();
      }
    
      
    }, 2000);
   }
  
    
    
  }
  jump(): boolean {//pour les cas ou on doit sauter des etapes
    if(this.is_one_travail_selected && this.filteredTravail.ID==2 && this.current<=2){
      this.current=4
      return true
    }
    if(this.is_one_travail_selected && this.filteredTravail.ID==11 && this.current<=2){
      this.current=4
      return true
    }
    
    if(this.is_one_travail_selected && this.filteredTravail.ID==10 && this.current<=2){
      this.current=4
      return true
    }
   
    if(this.is_one_travail_selected && this.filteredTravail.ID==13 && this.current<=2){
      this.current=4
      return true
    }
    if(this.is_one_travail_selected && this.filteredTravail.ID==15 && this.current<=2){
      this.current=4
      return true
    }
    if(this.is_one_travail_selected && this.filteredTravail.ID==16 && this.current<=2){
      this.current=4
      return true
    }
    
    
   return false
    
  }
  jump_back(): boolean {//pour les cas ou on doit sauter des etapes
    if(this.is_one_travail_selected && this.filteredTravail.ID==11 && this.current==4){
      this.current=1
      return true
    }
    if(this.is_one_travail_selected && this.filteredTravail.ID==10 && this.current==4){
      this.current=1
      return true
    }
    if(this.is_one_travail_selected && this.filteredTravail.ID==4 && this.current==5){
      this.current=2
      return true
    }
    if(this.is_one_travail_selected && this.filteredTravail.ID==13 && this.current==4){
      this.current=1
      return true
    }
    if(this.is_one_travail_selected && this.filteredTravail.ID==3 && this.current>=4){
      this.current=2
      return true
    }
    if(this.is_one_travail_selected && this.filteredTravail.ID==2 && this.current==4){
      this.current=1
      return true
    }
    if(this.is_one_travail_selected && this.filteredTravail.ID==15 && this.current==4){
      this.current=1
      return true
    }
    if(this.is_one_travail_selected && this.filteredTravail.ID==16 && this.current==4){
      this.current=1
      return true
    }
    
   return false
    
  }

  display_modal_connection=false
 

  isconnected=false
  done(): void {
    this.authService.getIsConnected().subscribe((isConnected) => {
      this.isconnected = isConnected;
    
      if (this.isconnected) {
        console.log('L\'utilisateur est connecté :', this.isconnected," id : ",this.authService.getUser().Id);
        this.gestiondesdevisService.clearDEGFormulaires()
        const formulaires = this.gestiondesdevisService.getFormulaires();
        const json = {
          username: this.browserInfo,
          ip: this.userIp,
          piece:this.selectedPiece,
          liste_des_travaux: formulaires,
          deviceID:this.panier
          .getUniqueDeviceId(),
          UtilisateurID:this.authService.getUser().Id
        };
        console.log('Formulaires soumis :', json);
        this.userService.addDevisPiece(json).subscribe(
          (response) => {
            console.log('reponse de l\'api :', response);
            this.current=6
            console.log('etape courrante :', this.current);
            let devis=response.devis
            this.panier.addItem(devis)
            
          },
          (error) => {
            console.error('Erreur lors de la récupération de l\'ajout du devis :', error);
          }
        );
       
      } else {
        console.log('L\'utilisateur n\'est pas connecté.');
        this.display_modal_connection=true
        
      }
    });

    
  }
  modal_connection_handleOk(): void {
    this.display_modal_connection = false;
  }

  modal_connection_handleCancel(): void {
    this.display_modal_connection = false;
  }
  
  error_msg=""
  has_error=false
  submitLoginForm(): void {
    if (this.loginForm.valid) {
      console.log('submit', this.loginForm.value);
      this.userService.loginFrontUtilisateur(this.loginForm.value).subscribe(
        (response: any) => {
          console.log('connexion reussie :', response);
          this.authService.setUserWithoutRedirect(response)
          this.modal_connection_handleCancel()
        },
        (error: any) => {
          console.error('Erreur lors de la connexion :', error.error.error);
          this.error_msg=error.error.error
          this.has_error=true
        }
      );
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  submitRegistrationForm(): void {
    if (this.registrationForm.valid) {
      console.log('submit', this.registrationForm.value);
      this.userService.addFrontUtilisateurWithData(this.registrationForm.value).subscribe(
        (response: any) => {
          console.log('inscription reussie:', response);
          this.s_inscrire=false
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

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
      if (!control.value) {
        return { required: true };
      } else if (control.value !== this.registrationForm.controls.password.value) {
        return { confirm: true, error: true };
      }
      return {};
    };
    
  se_connecter=true
  s_inscrire=false
  switch_form(){
    this.se_connecter = !this.se_connecter
    this.s_inscrire = !this.s_inscrire
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
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }
  reloadPage() {
    const currentPiece = this.selectedPieceId??0;

    // Sauvegarder l'état
    sessionStorage.setItem('selectedPieceId', currentPiece.toString());
    window.location.reload();
   
  }


  userIp: string = '';
  browserInfo: string = '';
  getIpAddress() {
    this.gestiondesdevisService.getIp().subscribe(
      (response) => {
        this.userIp = response.ip;
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'adresse IP :', error);
      }
    );
  }
  getBrowserInfo() {
    this.browserInfo = navigator.userAgent;
  }
  hide_finalisation_message=false;
  submit_devis_and_choose_piece(){
    this.done()
    this.current+=1
    this.hide_finalisation_message=true
  }

  get_max():number{
    if(this.selectedPieceId==4){
      return 50;
    }else if(this.selectedPieceId==6){
      return 50;
    }
    return 100;
  }

  getNotaBene(): string {
    const currentStep = this.etapes?.find(
      (etape:any) =>
        etape.Etape === this.getStepName(this.current) &&
        (this.current <= 1 || this.current >= 5 || etape.TravailID === this.filteredTravail.ID)
    );
  
    if (!currentStep) {
      return 'Pas de description pour cette étape';
    }
  
    // Si current est 0, 1, 5, ou 6, on prend la description générale
    if (this.current === 0 || this.current === 1 || this.current === 5 || this.current === 6) {
      return currentStep.Description || 'Pas de description pour cette étape';
    }
  
    // Sinon, on prend la description de la pièce correspondante
    switch (this.selectedPieceId) {
      case 4:
        return currentStep.Description_chambre || currentStep.Description;
      case 3:
        return currentStep.Description_sdb || currentStep.Description;
      case 9:
        return currentStep.Description_salle_manger || currentStep.Description;
      case 8:
        return currentStep.Description_wc || currentStep.Description;
      case 7:
        return currentStep.Description_cuisine || currentStep.Description;
      case 6:
        return currentStep.Description_salon || currentStep.Description;
      default:
        return currentStep.Description || 'Pas de description pour cette étape';
    }
  }
  
  // Fonction pour récupérer le nom de l'étape en fonction du numéro
  getStepName(stepNumber: number): string {
    const steps = [
      'Choix de la pièce',
      'Travaux',
      'Dimensions',
      'Etat de surfaces',
      'Gamme de produits',
      'Recapitulatif',
      'Finalisation'
    ];
    return steps[stepNumber] || '';
  }
  


}
