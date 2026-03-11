// environment.ts

export const environment = {
    production: false,
    apiUrl: 'http://localhost:3000', // URL de l'API locale
    //apiUrl: 'https://dev.homeren.fr/api-concepts-et-travaux', // URL de l'API sur le dev
    //apiUrl: 'https://homeren.fr/api-concepts-et-travaux', // URL de l'API en prod
    
    imagesUrl: 'https://homeren.fr/api-concepts-et-travaux/files/', 
    //imagesUrl: 'https://dev.homeren.fr/api-concepts-et-travaux/files/', // URL de l'API sur le dev

    //assetsUrl: 'https://homeren.fr/assets/', 
    //assetsUrl: 'https://dev.homeren.fr/assets/', // URL de assets sur le dev
    assetsUrl: 'http://localhost:4300/assets/', // URL de assets en local

    //url_de_retour:"https://dev.homeren.fr/",
    //url_de_retour:"https://homeren.fr/",
    url_de_retour:"http://localhost:4300/",


    stripePublicKey:'pk_test_51R9q3v2LlVGoDCjrxz4Ivi2x9jcTR5uR0eHItkmfmW2r4GFBlx9i1cHSYnObuWm9YTFz2CapFwWCHXdUkg5KXOSJ00kZluesGa',
    stripePrivateKey:'sk_test_51R9q3v2LlVGoDCjr1a0HQSAIjHnKzSbVEE0c87jtrYmlZwo5FiYNuVSfrbGbT1mCpt5ZhSAW22ikIeuhEnfnO2aD00p19fARLQ'
  
    //stripePublicKey:'pk_test_51R1pR3EDZMIS8WcN1uhuqtPviA3Dd8pEF4zJXY81VSTzZ70jGXGhLjavOwfXgkC3FI0fgF4ENGdcdIosDGFrUF4S00Z8IjZq4N',
    //stripePrivateKey:'sk_test_51R1pR3EDZMIS8WcNRA3mfHVgdM9I7UzIimfm00XwUcHMVeAu3jUIy2EFKtESsm9Ees8hCwO7j7SIuYFXqvdMOO0V00O02dyg9A'
  };
