# HOMEREN

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

TRUNCATE `DevisPiece`; TRUNCATE `DevisTache`; TRUNCATE `Paiement`; TRUNCATE `Projet`; TRUNCATE `ProjetDevis`; TRUNCATE `Visite`;

---

# Documentation technique des pages Angular (`src/app/pages`)

Cette section décrit le rôle des pages du dossier `src/app/pages` ainsi que les logiques métier les plus importantes du parcours devis / paiement observées dans les composants Angular du projet HomeRen.

## 1) Vue d’ensemble des pages

Les dossiers de `src/app/pages` correspondent aux écrans fonctionnels de l’application et sont structurés comme de vrais modules Angular : chaque dossier contient un `module.ts`, un `routing.module.ts` et souvent un composant principal associé.

- `accueil` : page d’introduction du site / point d’entrée marketing.
- `connexion` : formulaire de connexion utilisateur.
- `contact` : formulaire de contact et informations de contact.
- `devis-en-ligne` : parcours de création de devis en ligne, guidé par étapes.
- `espace-membre` : espace client avec projets, paiements, visites, projet détaillé.
- `faq` : FAQ / informations d’aide.
- `form-artisan` : formulaire pour artisan.
- `form-particulier` : formulaire pour particulier.
- `home` : page d’accueil ou landing spécifique selon structure du projet.
- `mentions-legales` : informations légales.
- `panier` : liste des devis à payer / à visiter.
- `pieces` : sélection ou affichage des pièces de logement.
- `qui-somme-nous` : présentation de l’entreprise.
- `realisations` : galerie de projets / exemples.

### Routes importantes

Le fichier `src/app/pages/devis-en-ligne/devis-en-ligne-routing.module.ts` contient :

- `path: ''` → `IndexComponent`

Le fichier `src/app/pages/panier/panier-routing.module.ts` contient :

- `path: ''` → `ListeDesDevisComponent`

Le fichier `src/app/pages/espace-membre/espace-membre-routing.module.ts` contient :

- `''` → `EspaceMembreComponent`
- `'projets-en-cours'` → `CurrentProjectsComponent`
- `'projets-finis'` → `EndProjectsComponent`
- `'visites-technicien'` → `DevisListeToVisitComponent`
- `'paiements'` → `PaiementsComponent`
- `'projet/:id'` → `ProjetDetailsComponent`

---

## 2) Processus de devis en ligne (`src/app/pages/devis-en-ligne`)

Le cœur du parcours est `src/app/pages/devis-en-ligne/index/index.component.ts`.

### 2.1 Chargement initial

Au démarrage, `ngOnInit()` appelle :

- `loadPieces()` : récupère les pièces via `this.userService.get_pieces_par_categories()`
- `loadEtapes()` : récupère les étapes de devis via `this.userService.get_etapes_devis()`
- `getIpAddress()` : récupère l’IP via `GestionDesDevisService.getIp()`
- `getBrowserInfo()` : prend le `navigator.userAgent`

Les données sont ensuite stockées dans :

- `pieces_par_categories`
- `etapes`
- `userIp`
- `browserInfo`

Si une pièce était sélectionnée avant un rechargement, elle est restaurée depuis `sessionStorage` :

- `selectedPieceId = sessionStorage.getItem('selectedPieceId')`
- puis `selectPiece(this.selectedPieceId)`

### 2.2 Étape 1 : choix de la pièce

La fonction `selectPiece(pieceID: number)` fait plusieurs choses :

1. Met à jour le style visuel de la pièce sélectionnée.
2. Appelle `this.userService.getPiece(this.selectedPieceId)` pour récupérer les détails de la pièce.
3. Appelle `this.userService.getValidatedTravauxByPieceId(this.selectedPieceId)` pour récupérer les travaux associés.
4. Stocke le résultat dans `this.selectedPiece` et `this.travaux`.
5. Active les classes visuelles de sélection via `Renderer2`.
6. Déclenche automatiquement la suite du parcours avec `this.next()` après 700 ms.

La fonction `selectPieceAndRedirect()` fait le même travail, mais la différence est qu’elle remet explicitement à zéro les formulaires et réinitialise `current = 1` pour lancer la suite du process.

### 2.3 Étape 2 : choix du type de travail

La fonction `selectTravail(travailID: number)` fait :

- vaut `this.filteredTravail = this.travaux.filter(travail => travail.ID === travailID)[0]`
- met en évidence visuellement la tâche choisie
- positionne `this.is_one_travail_selected = true`

La logique d’étapes est pilotée par `current`, avec les valeurs clés suivantes :

- `0` : choix de la pièce
- `1` : choix du travail
- `2` : étape dimensions
- `3` : étape état des surfaces
- `4` : étape gamme de produits
- `5` : récapitulatif
- `6` : finalisation

Le composant utilise aussi :

- `jump()` : sauté des étapes selon le type de travail (cas spécifiques)
- `jump_back()` : revient à une étape précédente si le parcours exige un retour
- `disable_next()` : verrouille l’action suivante tant que l’étape n’est pas validée

### 2.4 Validation des formulaires

Chaque formulaire est déclenché par un booléen de soumission :

- `triggerSubmitDimensionForm`
- `triggerSubmitEtatSurfacesForm`
- `triggerSubmitGammesProduitsForm`

La progression de `next()` se fait ainsi :

- si `current === 2`, on déclenche la soumission du formulaire dimensions
- si `current === 3`, on déclenche la soumission de l’état des surfaces
- si `current === 4`, on déclenche la soumission de la gamme de produits
- si `current === 5`, on appelle `done()`

La validation se base sur :

- `is_formulaire_dimensions_valid`
- `is_formulaire_surfaces_valid`
- `is_formulaire_gammes_valid`

La logique essaye ensuite une progression adaptative : certains travaux sautent des étapes selon leur ID. Exemple dans le code :

- Travaux 2, 16 → on remonte à l’étape 4
- Travaux 3, 4 → on va directement à l’étape 5
- Certains travaux déclenchent un saut spécifique à l’étape 1 ou 2

### 2.5 Génération du rappel / aide contextuelle

Les fonctions :

- `getNotaBene()`
- `getNotaBeneSubtitle()`
- `getStepName()`

permettent de récupérer le libellé et la description associés à l’étape en cours en fonction :

- du travail sélectionné
- de la pièce sélectionnée
- de l’étape (`current`)

Cela rend le parcours très dynamiquement adapté selon la pièce et le type de travaux.

### 2.6 Finalisation et enregistrement du devis

La méthode `done()` est le point d’entrée de l’enregistrement final.

Elle vérifie :

- `this.authService.getIsConnected()`
- si l’utilisateur est connecté : on continue
- sinon : `display_modal_connection = true`

Ensuite elle bloque les doubles soumissions via `this.isSubmitting`.

Le JSON envoyé au service contient :

- `username`: `this.browserInfo`
- `ip`: `this.userIp`
- `piece`: `this.selectedPiece`
- `liste_des_travaux`: `this.gestiondesdevisService.getFormulaires()`
- `deviceID`: `this.panier.getUniqueDeviceId()`
- `UtilisateurID`: `this.authService.getUser().Id`

Puis le service appelle :

- `this.userService.addDevisPiece(json)`

En cas de succès :

- `this.current = 6`
- `this.panier.addItem(response.devis)`
- `this.gestiondesdevisService.clearFormulaires()`

Il existe aussi une variante avec `done_but_another_piece()`, qui enregistre le devis courant puis remet le parcours à l’étape 0 pour choisir une autre pièce.

### 2.7 Connexion / inscription dans le parcours

Le composant gère aussi le scénario connexion au moment de finaliser :

- `submitLoginForm()`
- `submitRegistrationForm()`
- `switch_form()`
- `modal_connection_handleOk()` / `modal_connection_handleCancel()`

Après authentification, `get_action_finale()` décide l’action suivant la logique de flux :

- `same_room`
- `other_room`
- `finish`

---

## 3) Paiement depuis `espace-membre/projet-details`

Le composant ciblé est :

- `src/app/pages/espace-membre/projet-details/projet-details.component.ts`

Cette page est ouverte via la route :

- `espace-membre/projet/:id`

### 3.1 Chargement des paramètres de calcul

`load_parametres()` fait un `forkJoin` sur :

- TVA : `get_parametre_by_id_or_nom(6, "TVA")`
- coefficient : `get_parametre_by_id_or_nom(1, "coefficient")`
- acompte : `getParametreById(2)`
- prix visite : `getParametreById(3)`

Puis il mémorise :

- `this.tva = 1 + result.tva.Valeur / 100`
- `this.coefficient = result.coefficient.Valeur`
- `this.taux_acompte = result.acompte.Valeur`
- `this.prix_visite = result.prixVisite.Valeur`

Ensuite il appelle :

- `this.getprojetDetails(this.projetId)`

### 3.2 Récupération du projet et de ses devis

`getprojetDetails(id)` appelle :

- `this.userService.get_projet(parseInt(id, 10))`

Ensuite il :

- récupère `this.projet`
- active `doit_payer_visite` si `Status === 'visite à régler'`
- active `doit_payer_acompte` si `Status === 'projet validé'`
- boucle sur `this.projet.Devis` pour calculer :
  - `total_visite += calculerPrixTTC(...)`
  - `total_acompte += calculerPrixTTC(...)`
- calcule `this.prix_acompte = this.taux_acompte * this.total_acompte / 100`

La formule de calcul :

- `calculerPrixTTC(prix, tva)` → `prix * coefficient * (1 + tva/100)`
- puis arrondi à 2 décimales

### 3.3 Historique des paiements

`get_all_projet_paiements()` récupère les paiements de ce projet avec :

- `this.userService.get_all_projet_paiements(parseInt(this.projetId))`

Ensuite il parcourt la réponse et :

- cumule `solde`
- ne conserve qu’un seul paiement de type `'visite'` dans `visiteAdded`
- alimente `this.paiements` et `this.solde`

### 3.4 Checkout Stripe

Les méthodes :

- `Check_login_and_send_mails_details_to_pay_visite()`
- `Check_login_and_send_mails_details_to_pay_acompte()`

vérifient le statut de connexion.

Si l’utilisateur est connecté, elles lancent :

- `this.checkout(false)` pour la visite
- `this.checkout(true)` pour l’acompte

Sinon, elles redirigent vers `/connexion`.

La logique de `checkout(faire_acompte)` fait ceci :

- si paiement d’acompte :
  - `amount = parseFloat(this.prix_acompte.toFixed(2))`
  - `liste = this.projet.Devis`
  - `id_paiement = acompte?.ID ?? null`
- sinon :
  - `amount = this.prix_visite`
  - `liste = this.projet.Devis`
  - `id_paiement = visite?.ID ?? null`

Puis il construit :

```ts
const datas = {
  montant: amount,
  liste_devis: liste,
  url_de_retour: environment.url_de_retour,
  payer_visite: !faire_acompte,
  payer_acompte: faire_acompte,
  projet_id: this.projet.Id,
  id_paiement: id_paiement
};
```

Puis il appelle :

- `this.userService.createCheckoutSession(datas)`

et redirige sur `response.url` :

```ts
window.location.href = response.url;
```

C’est le cœur du flux de paiement projet / acompte / visite depuis la page détail de projet.

---

## 4) Paiement de la visite et de l’acompte dans `panier/liste-des-devis`

Le composant clé est :

- `src/app/pages/panier/liste-des-devis/liste-des-devis.component.ts`

Il sert à présenter les devis à payer pour :

- la visite technique
- l’acompte
- les projets en attente de visite

### 4.1 Chargement des paramètres et calcul du TTC

Les fonctions :

- `get_params()`
- `load_parametres()`
- `calculerPrixTTC()`

chargent :

- le taux d’acompte
- le prix de visite
- la TVA courante
- le coefficient de calcul

La formule est la même que dans le détail projet :

```ts
const total = prix * this.coefficient * (1 + tva / 100);
return Math.round(total * 100) / 100;
```

### 4.2 Récupération des devis à payer

Le composant appelle :

- `get_devis_to_visit_datas()`
- `get_devis_to_pay_datas()`
- `get_devis_en_attente_de_visite()`

Les services utilisés sont :

- `this.panierService.getProjectToPayVisit()`
- `this.panierService.getProjectToPayAcompte()`
- `this.panierService.getProjectEnAttenteDeVisite()`

Cela sert à répartir les projets dans plusieurs états :

- `faire_visite_technicien`
- `visite_payee`
- `faire_acompte`
- `visite_faite`
- `acompte_paye`

Pour les devis à payer en acompte :

```ts
this.prix_acompte = this.taux_acompte * this.total_acompte / 100;
```

Pour les devis à payer pour la visite :

- le montant est le prix fixe `this.prix_visite`

### 4.3 Vérification d’authentification avant paiement

Les méthodes :

- `Check_login_and_send_mails_details_to_pay_visite()`
- `Check_login_and_send_mails_details_to_pay_acompte()`

vérifient si l’utilisateur est connecté avec `this.authService.getIsConnected()`. Si non, redirection vers `/connexion`. Sinon, elles lancent `this.checkout(false)` / `this.checkout(true)`.

### 4.4 Checkout Stripe côté panier

La fonction `checkout(faire_acompte: boolean)` construit les données suivantes :

```ts
const datas = {
  montant: amount,
  liste_devis: liste,
  url_de_retour: environment.url_de_retour,
  payer_visite: !faire_acompte,
  payer_acompte: faire_acompte,
};
```

Selon le cas :

- si paiement de visite : `amount = this.prix_visite`, `liste = this.listOfDevisToPayVisit`
- si paiement d’acompte : `amount = parseFloat(this.prix_acompte.toFixed(2))`, `liste = this.listOfDevisToPayAcompt`

Puis on appelle :

- `this.userService.createCheckoutSession(datas)`

et on redirige sur le `response.url` Stripe.

### 4.5 Retour après paiement et mise à jour du statut

Dans `ngOnInit()`, le composant lit readonly les query params :

- `checkout`
- `visite`
- `acompte`

Si `checkout === 1`, cela veut dire que le paiement a réussi, et le composant :

1. vérifie la connexion
2. détermine s’il s’agit d’un paiement visite ou acompte
3. envoie un email métier avec :
   - `sendAllVisitedDevisPiecetoUserAsync(...)`
   - `sendAllPayedDevisPiecetoUserAsync(...)`
4. met à jour les devis avec :
   - `updateVisitedDevisAsync(datas)`
   - `updatePayedDevisAsync(datas)`
5. affiche un message de succès
6. redirige vers `/espace-membre/projets-en-cours`
7. rafraîchit les données du panier via `this.panierService.refresh()`

Le flux complet est donc :

- panier → vérification auth → checkout Stripe → retour URL → actualisation des devis → redirection vers espace membre.

---

## 5) Synthèse fonctionnelle

Les pages du dossier `src/app/pages` forment le cœur de l’expérience HomeRen :

- `devis-en-ligne` permet à l’utilisateur de choisir une pièce, un type de travaux, remplir les détails du chantier, valider et enregistrer un devis.
- `espace-membre/projet-details` permet ensuite de suivre le projet, calculer les montants de visite / acompte, et lancer un paiement à partir du détail du projet.
- `panier/liste-des-devis` centralise la logique de paiement de la visite et de l’acompte, avec calcul des montants, validation côté front, génération de la session Stripe et mise à jour des projets après paiement.

Le point commun de ces écrans est l’usage systématique des services de l’application pour :

- récupérer les paramètres de TVA / coefficient / taux d’acompte / prix de visite
- convertir les devis en objets de paiement
- lancer l’initiation Stripe
- synchroniser les états du projet après validation du paiement

C’est le cœur métier de la partie “devis + paiement” de HomeRen.

---

## 6) Références de fichiers clés

- `src/app/pages/devis-en-ligne/index/index.component.ts`
- `src/app/pages/devis-en-ligne/devis-en-ligne-routing.module.ts`
- `src/app/pages/espace-membre/espace-membre-routing.module.ts`
- `src/app/pages/espace-membre/projet-details/projet-details.component.ts`
- `src/app/pages/panier/panier-routing.module.ts`
- `src/app/pages/panier/liste-des-devis/liste-des-devis.component.ts`

Ces fichiers représentent le centre logique des parcours de devis et de paiement dans l’application.
