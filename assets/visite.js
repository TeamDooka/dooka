// Compteur de pages vues de dooka.fr, lu dans le tableau de bord admin.
//
// Envoie à la base (fonction compter_visite, migration 0137 de l'app) la
// page vue et, pour une arrivée depuis l'extérieur, une provenance parmi
// cinq : direct, moteur, reseaux, store, autre. Rien d'autre : pas de
// cookie, pas de stockage local, pas d'identifiant, pas de ressource
// tierce. La base ne garde qu'un total par page et par jour.
//
// Rien n'est envoyé si le navigateur demande à ne pas être suivi (GPC ou
// Do Not Track), ni hors de dooka.fr (aperçu local, copie du site).
(function () {
  'use strict';
  try {
    var host = location.hostname;
    if (host !== 'dooka.fr' && host !== 'www.dooka.fr') return;
    if (navigator.globalPrivacyControl === true || navigator.doNotTrack === '1' || window.doNotTrack === '1') return;
    // Navigateurs pilotés (robots de test, captures d'écran).
    if (navigator.webdriver) return;

    // Provenance : seulement le nom de domaine de la page précédente, ramené
    // à une famille. Une navigation interne au site n'est pas une entrée.
    var ref = '';
    try { ref = document.referrer ? new URL(document.referrer).hostname : ''; } catch (e) { ref = '?'; }
    var source = null;
    if (ref.replace(/^www\./, '') !== host.replace(/^www\./, '')) {
      if (!ref) source = 'direct';
      else if (/(^|\.)(play\.google\.com|apps\.apple\.com|testflight\.apple\.com)$/.test(ref)) source = 'store';
      else if (/(^|\.)(google|bing|duckduckgo|qwant|ecosia|yahoo|startpage|search\.brave|lilo)\./.test(ref)) source = 'moteur';
      else if (/(^|\.)(facebook|instagram|messenger|whatsapp|snapchat|tiktok|linkedin|reddit|discord|telegram|threads|bsky|x|twitter|t)\.(com|co|app|net|org|me|gg)$/.test(ref)) source = 'reseaux';
      else source = 'autre';
    }

    // Même projet et même clé publique que l'app et que la page admin : elle
    // n'ouvre que ce que la base autorise, ici une seule fonction.
    var url = 'https://ybnacpzicldzsmmypupj.supabase.co/rest/v1/rpc/compter_visite';
    var key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibmFjcHppY2xkenNtbXlwdXBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyODg4OTAsImV4cCI6MjA5OTg2NDg5MH0.zk6cs62vw1Xx2IfL5UX88XWmXFYMdxU75qCkp_f7DCs';
    fetch(url, {
      method: 'POST',
      keepalive: true,
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
      headers: { apikey: key, Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_page: location.pathname, p_source: source })
    }).catch(function () { /* un compteur en panne ne gêne pas la lecture */ });
  } catch (e) { /* idem */ }
})();
