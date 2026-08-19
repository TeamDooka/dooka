# Captures d'écran de la page d'accueil

Six fichiers, référencés par `index.html` :

| Fichier          | Écran capturé                          | Où il apparaît          |
| ---------------- | -------------------------------------- | ----------------------- |
| `carte.jpg`      | la carte des PMU, Rennes               | hero, téléphone central |
| `tickets.jpg`    | Tickets à gratter FDJ                  | hero, à gauche          |
| `classement.jpg` | le bilan d'une session, 3 joueurs      | hero, à droite          |
| `session.jpg`    | la feuille « Nouvelle session PMU »    | « 01 · Lancer »         |
| `bar.jpg`        | la fiche d'un bar avec ses pastilles   | « 02 · Trouver »        |
| `groupes.jpg`    | un groupe et son podium                | « 03 · Comparer »       |

Prises le 2026-08-20 sur un Pixel (1080 × 2424) en v2.98.1, puis réduites à
540 px de large et encodées en JPEG qualité 86. La chaîne complète :

```
adb exec-out screencap -p > carte.png
```

puis le redimensionnement (System.Drawing, bicubique haute qualité).

**Pourquoi 540 px et pas la taille d'origine.** Les cadres font 200 à
214 px de large dans la page : 540 px couvre le double densité avec de la
marge. Les six PNG d'origine pesaient 1,5 Mo à eux seuls, contre 500 Ko en
JPEG — sur un réseau de comptoir, c'est la différence entre une page qui
s'affiche et une page qu'on quitte.

**Cadrage.** Les cadres recoupent en `object-fit: cover` avec
`object-position: top` : le bas de la capture est rogné, ce qui compte doit
être dans la moitié haute.

**Vie privée.** `groupes.jpg` et `session.jpg` sont prises depuis le
compte de test « Joueur » dans « Groupe de test » : aucun tiers réel n'y
figure. Le code d'invitation du groupe a été masqué à l'aplat (#F5F3EE, la
couleur de fond de l'app) pour qu'un visiteur ne puisse pas s'y inviter.

La photo de profil de Dooka Master apparaît en revanche sur les six, dans
l'en-tête, et sur le podium de `groupes.jpg`. C'est un choix assumé du
propriétaire du site.
