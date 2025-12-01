# Une application mobile FullStack, construite avec React Native pour le front-end et PHP Symfony pour le back-end, offre des fonctionnalités telles que la création de compte, la gestion de la connexion et déconnexion, ainsi que l'ajout, la modification et la suppression de notes.
# L'objectif de cette application est de s'entraîner à développer avec React Native, en se familiarisant avec la création d'une application et l'utilisation de ses composants principaux.

# Exécutez les commandes suivantes avant de démarrer le projet
# Configuration JWT (Requise après le clonage)

- cd ./front-end-notes-App/   
- npm install 
- npm update 

- cd  ./server-notes-mobile-App/   
- composer update 
- pour lancer le serveur  php -S 0.0.0.0:8000 -t public    
- Ce projet utilise l'authentification JWT.
- Les clés privée et publique n'étant pas stockées dans le dépôt, vous devez générer une nouvelle paire de clés après le clonage.
- Générer les clés JWT
- Exécutez la commande suivante : php bin/console lexik:jwt:generate-keypair
- Cela créera :
    - config/jwt/private.pem
    - config/jwt/public.pem
    - Assurez-vous que votre fichier .env contient les variables correctes :
        *  JWT_PASSPHRASE=votre_phrase_passe
        *  Après la génération des clés, l’authentification fonctionnera normalement.