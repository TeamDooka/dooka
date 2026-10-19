# Polices de la page d'accueil

Trois fichiers WOFF2, sous-ensemble latin, servis depuis le site plutôt que
depuis Google Fonts : la page se charge sur des réseaux de bar, et une
requête vers un domaine tiers de moins, c'est un premier affichage plus
rapide.

| Fichier                     | Famille             | Rôle                                                   |
| --------------------------- | ------------------- | ------------------------------------------------------ |
| `bricolage-grotesque.woff2` | Bricolage Grotesque | les titres, comme dans l'app (police des titres 3.12)  |
| `geist.woff2`               | Geist               | le texte courant et les boutons                        |
| `geist-mono.woff2`          | Geist Mono          | quelques chiffres et numéros de version                |

Toutes trois sont des polices variables (axe de graisse, plus l'axe de
taille optique pour Bricolage), récupérées le 2026-10-19 sur
fonts.gstatic.com. Licence : SIL Open Font License 1.1 (Bricolage
Grotesque : Mathieu Triay ; Geist et Geist Mono : Vercel).
