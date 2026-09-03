'use client';

import { useEffect } from 'react';

/**
 * Observateur unique pour toutes les révélations de la page.
 *
 * Monté une seule fois dans le layout : évite d'embarquer une librairie
 * d'animation dans le bundle pour du simple « entre dans le viewport ».
 *
 * Garde-fous :
 * - si IntersectionObserver est absent, tout est révélé immédiatement ;
 * - si l'utilisateur demande un mouvement réduit, on ne masque rien ;
 * - un filet de sécurité révèle tout après 2,5 s, pour qu'aucun contenu ne
 *   puisse rester invisible à cause d'un cas limite (onglet en arrière-plan,
 *   capture headless, navigateur exotique).
 */
export default function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || typeof IntersectionObserver === 'undefined') {
      root.classList.remove('js');
      return;
    }

    // Active les états masqués seulement maintenant qu'on sait pouvoir les lever.
    root.classList.add('js');

    const revealAll = () => {
      document
        .querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)')
        .forEach((el) => el.classList.add('is-in'));
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 }
    );

    const observe = () => {
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)').forEach((el) => {
        // Déjà au-dessus ou dans le viewport au chargement : on révèle tout de suite.
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92) el.classList.add('is-in');
        else io.observe(el);
      });
    };

    observe();

    // Contenu ajouté après coup (changement d'étape de formulaire, etc.)
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });

    const safety = window.setTimeout(revealAll, 2500);

    return () => {
      io.disconnect();
      mo.disconnect();
      clearTimeout(safety);
    };
  }, []);

  return null;
}
