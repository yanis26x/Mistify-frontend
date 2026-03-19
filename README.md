# Mistify Frontend

## POUR TESTER LANCE DABBORD LE BACKEND ET LANCE LE FRONTEND EN MEME TEMPS !

#### dans le backend 
```bash
npm run start:dev
```

#### dnas le frontend (ici)
```bash
npm i
```
```bash
npm run dev
```

### fait avec axios













const parfums = [
  {
    name: "Sauvage",
    brand: "Dior",
    price: 120,
    imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f"
  },
  {
    name: "Bleu de Chanel",
    brand: "Chanel",
    price: 135,
    imageUrl: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd"
  },
  {
    name: "Acqua di Gio",
    brand: "Armani",
    price: 110,
    imageUrl: "https://images.unsplash.com/photo-1585386959984-a4155228c1c9"
  },
  {
    name: "Le Male",
    brand: "Jean Paul Gaultier",
    price: 95,
    imageUrl: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
  },
  {
    name: "Eros",
    brand: "Versace",
    price: 105,
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601"
  }
];

async function ajouterParfums() {
  for (const parfum of parfums) {
    const res = await fetch("http://localhost:3000/parfums", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(parfum)
    });

    const data = await res.json();
    console.log("Ajouté :", data);
  }

  console.log("Tous les parfums ont été ajoutés");
}

ajouterParfums();