//------ COURS
/*

# pensez à créer un fichier .gitignore avant d'effectuer les commandes suivantes 

# si ce n'est pas déjà fait pour ce projet
-> git init 

# ici, remplacez URL par celle fournie par GitHub
-> git remote add origin https://github.com/KM78700/MyProjLoc.git

# pour sélectionner des fichiers à sauvegarder
-> git add . 

# pour effectuer une sauvegarde
-> git commit -m "Message" 

# pour envoyer vos fichiers sur GitHub
# git push -u origin master 
-> git push -f origin master

Seul le premier push utilisera la commande git push -u origin master. 
Tous les prochains push de ce projet devront être effectués avec la commande git push

*/

// ------ APRES

/*

-> git add . 
-> git commit -m "Message" 
-> git push -f origin master

*/

// ------- MODIF UTILE

/*

# pour supprimer les liens avec le dossier et faire un push de toutes les dossiers vers un nouveau dossier
-> git remote -v 

# pour supprimer le .git et faire un nouveau push dans un nouveau dossier(refaire la procédure)
-> rm -rf .git 

# pour lister les fichiers 
-> ls -la 

*/

//----------- FeedBack Kriddina
/*

# Pour faire un push de ma branche vers la branche principale 
-> git branch (pour vérifier sur quelle branche je suis)
-> git status 
-> git add .
-> git commit -m "User_teaser"
-> git push

# Pour crée une nouvelle branche 
-> git checkout -b "screen details"
-> git fetch 
-> git checkout master ?
-> git pull 
-> npm i

*/

//----------- FeedBack Eric
/*
// Récupérer les branches
git fetch 

// Aller sur la branche master
git checkout master 

// Récupérer les données de master
git pull 

// installer les dépendances
npm install

// Créer une nouvelle
git checkout -b ma_branche

//  Checker le status 
git status

// Ajouter les fichiers modifier
git add .

// Ajouter un commentaire dans le commit
git commit -m "Commentaire"

// Pousser dans la branche ma_branche
git push

*/
