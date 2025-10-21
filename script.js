// ---- CONFIG : change la date si besoin ----
  // Date cible (8 novembre 2025 à minuit, heure locale)
  const targetDate = new Date('2025-11-08T00:00:00');

  // Sélection des éléments DOM
  const btn = document.getElementById('countdownBtn');
  const text = document.getElementById('countdownText');

  // Fonction utilitaire : ajouter un 0 devant si < 10 (pour l'affichage)
  function pad(n) {
    return n.toString().padStart(2, '0');
  }

  // Fonction principale : calcule la différence et met à jour l'interface
  function updateCountdown() {
    const now = new Date();                 // moment présent
    const diffMs = targetDate - now;        // différence en millisecondes

    if (diffMs <= 0) {
      // Décompte terminé (ou date passée)
      clearInterval(intervalId);           // stop l'intervalle qui met à jour toutes les secondes
      text.textContent = 'Disponible maintenant 🚀';
      btn.disabled = false;
      btn.classList.remove('bg-gray-400', 'opacity-80', 'cursor-not-allowed');
      btn.classList.add('bg-green-600', 'hover:bg-green-700', 'shadow-lg', 'cursor-pointer');

      // Action au clic : descendre à la section #photos (smooth scroll)
      btn.addEventListener('click', () => {
        document.getElementById('photos').scrollIntoView({ behavior: 'smooth' });
      });

      return;
    }

    // Calculs (jours, heures, minutes, secondes)
    const sec = Math.floor(diffMs / 1000);
    const days = Math.floor(sec / (60 * 60 * 24));
    const hours = Math.floor((sec % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((sec % (60 * 60)) / 60);
    const seconds = Math.floor(sec % 60);

    // Mise à jour du texte (format lisible)
    text.textContent = `${days}j ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  }

  // Lancer la mise à jour immédiatement, puis toutes les secondes
  updateCountdown();
  const intervalId = setInterval(updateCountdown, 1000);