# Mistify Frontend 𖤐

[ @yanis26x ](https://github.com/yanis26x)
[ @el24s ](https://github.com/el24s)
[ @rym31 ](https://github.com/rym31)

Mistify est une application React pour consulter et acheter des parfums.
Le frontend communique avec une API backend lancée en local sur `http://localhost:3000`.


## Installation
```bash
npm install
```
Lancer le projet en dev :
```bash
npm run dev
```

> Backend doit être lancé simultanément pour fonctionner

ADMIN mail:yanis@mail.com mdp:123
USER mail:sora26@mail.com mdp 123

## Fonctionnalités
- Création et connexion de compte
- Page d'accueil avec parfum du moment
- Recherche de parfums
- Page détail d'un parfum
- Affichage des notes olfactives :
  - `topNotes`
  - `middleNotes`
  - `baseNotes`
- Ajout au panier
- Ajout, modification et suppression de parfums pour les admins
- Commentaires et notes sur les parfums
- Et bien + encore..
## Routes frontend

- `/` : accueil
- `/vendreParfum` : ajouter des parfums
- `/compte` : connexion / inscription
- `/parfum/:id` : détails d'un parfum
- `/panier` : panier
- `/payment`: paiement
- `/profil` : profil
- `/contact` : contact

## Format d'un parfum

Exemple de données attendues par le frontend :

```js
{
  name: "Sauvage",
  brand: "Dior",
  price: 120,
  volume: 100,
  imageUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539",
  description: "Un parfum frais et puissant.",
}
```
> Pour ajouter des parfums run node seedParfums.js dans Backend

## Structure du projet

```txt
src/
  components/        Composants reutilisables
  pages/             Pages principales
  utils/             Helpers frontend
  App.jsx            Routes de l'application
  main.jsx           Point d'entree React
public/              Images et assets statiques
```
