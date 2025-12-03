export type Profil = {
  id: number;
  intitule: string;
  tjm: number;
};

export type Collaborateur = {
  id: number;
  nom: string;
  prenom: string;
  cout: number;
  profilId: number | null;
};

export const BASE_PROFILS: Profil[] = [
  { id: 1, intitule: 'Pilotage', tjm: 590 },
  { id: 2, intitule: 'Expert Tech', tjm: 560 },
  { id: 3, intitule: 'Dev', tjm: 450 },
];

export const BASE_COLLABORATEURS: Collaborateur[] = [
  { id: 1, nom: 'Durand', prenom: 'Alice', cout: 520, profilId: 1 },
  { id: 2, nom: 'Martin', prenom: 'Bob', cout: 480, profilId: 3 },
  { id: 3, nom: 'Bernard', prenom: 'Chloe', cout: 560, profilId: 2 },
];
