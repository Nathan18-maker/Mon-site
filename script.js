document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rendezvousForm");
  const liste = document.getElementById("listeRendezvous");
  const stats = document.getElementById("stats");

  // Charger les rendez-vous depuis localStorage
  let rendezvous = JSON.parse(localStorage.getItem("rendezvous")) || [];

  // Afficher les rendez-vous existants
  if (liste) {
    rendezvous.forEach((r, index) => ajouterRendezvous(r, index));
  }

  // Formulaire de rendez-vous manuel
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const r = {
        nom: document.getElementById("nom").value,
        email: document.getElementById("email").value,
        entreprise: document.getElementById("entreprise").value,
        date: document.getElementById("date").value,
        heure: document.getElementById("heure").value,
        poste: document.getElementById("poste").value
      };
      rendezvous.push(r);
      localStorage.setItem("rendezvous", JSON.stringify(rendezvous));
      ajouterRendezvous(r, rendezvous.length - 1);
      form.reset();
      updateStats();
    });
  }

  // Fonction pour ajouter un rendez-vous dans la liste
  function ajouterRendezvous(r, index) {
    if (liste) {
      const li = document.createElement("li");
      li.textContent = `${r.date} ${r.heure} - ${r.nom} (${r.email}) avec ${r.entreprise} pour le poste : ${r.poste}`;

      // Bouton supprimer
      const btn = document.createElement("button");
      btn.textContent = "Supprimer";
      btn.style.marginLeft = "10px";
      btn.addEventListener("click", () => {
        supprimerRendezvous(index);
      });

      li.appendChild(btn);
      liste.appendChild(li);
    }
  }

  // Fonction pour supprimer un rendez-vous
  function supprimerRendezvous(index) {
    rendezvous.splice(index, 1); // Retirer du tableau
    localStorage.setItem("rendezvous", JSON.stringify(rendezvous));
    rafraichirListe();
    updateStats();
  }

  // Rafraîchir la liste après suppression
  function rafraichirListe() {
    if (liste) {
      liste.innerHTML = "";
      rendezvous.forEach((r, index) => ajouterRendezvous(r, index));
    }
  }

  // Fonction pour mettre à jour les statistiques
  function updateStats() {
    if (stats) {
      stats.textContent = `Total de rendez-vous programmés : ${rendezvous.length}`;
    }
  }

  // Mise à jour initiale des stats
  updateStats();

  // Fonction pour réserver automatiquement depuis une offre
  window.reserverOffre = function(poste, entreprise) {
    const r = {
      nom: "Candidat",
      email: "candidat@example.com",
      entreprise: entreprise,
      date: new Date().toISOString().split("T")[0], // date du jour
      heure: "09:00",
      poste: poste
    };
    rendezvous.push(r);
    localStorage.setItem("rendezvous", JSON.stringify(rendezvous));
    alert(`Rendez-vous créé pour le poste ${poste} chez ${entreprise}`);
    updateStats();
  };
});