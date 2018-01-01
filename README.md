# Library Book App ( Angular 5 / VueJS 2)


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).



#La bibliothèque de Henri Potier
 
Il était une fois, une collection de cinq livres racontant les histoires d’un formidable héros nommé Henri Potier. Tous les enfants du monde trouvaient les histoires de cet adolescent fantastiques. L’éditeur de cette collection, dans un immense élan de générosité (mais aussi pour booster ses ventes ;)), décida de mettre en place des offres commerciales aussi aléatoires que l’issue des sorts de Ron Weasley. 

#####Développer un site web  comprenant deux interfaces : 

● La première permet d’afficher les livres que l’on souhaite acheter et d’effectuer une recherche libre

● La seconde récapitule le panier où sera appliquée la meilleure offre commerciale possible. 


`Un exemple Calcul Pour deux livres (à 35 et 30€), la requête ressemblera à : 
`
"api/books/id1,id2/commercialOffers" Le service enverra les offres applicables à ce panier sous le format JSON suivant :

`{
  "offers": [

    {"type": "percentage", "value": 5},
    
    {"type": "minus", "value": 15},
    
    {"type": "slice", "sliceValue": 100, "value": 12}
  ]
}`


**_Le prix attendu pour ce panier devra être 50€._**


###
#####Quelques explications:
● La première offre identifiée par un type ‘percentage’ est une réduction s’appliquant sur le prix de l’ensemble des livres. Le montant de la réduction est dans ‘value’; 

● La deuxième offre identifiée par un type ‘minus’ est une déduction directement applicable en caisse d’un montant de ‘value’; 

● La troisième offre identifiée par un type ‘slice’ est un remboursement par tranche d’achat. Dans  cet exemple, on rembourse 12€ par tranche de 100€ d’achat. 
