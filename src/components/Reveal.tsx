import type { ElementType, ReactNode } from 'react';

/**
 * Révélations au scroll — approche CSS d'abord.
 *
 * Principe : le contenu est TOUJOURS visible dans le HTML. L'état masqué n'est
 * appliqué que si la classe `js` est présente sur <html> (ajoutée par un script
 * inline avant le premier paint) ET si l'observateur a pu faire son travail.
 * Conséquence : si JavaScript échoue, est lent, ou si IntersectionObserver ne
 * déclenche pas, les titres et les CTA restent lisibles.
 *
 * Ces composants sont volontairement rendus côté serveur : aucun coût de bundle.
 */

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Décalage en ms appliqué à l'entrée */
  delay?: number;
  as?: ElementType;
};

export function Reveal({ children, className, delay = 0, as: Tag = 'div' }: RevealProps) {
  return (
    <Tag
      data-reveal=""
      className={className}
      style={delay ? ({ ['--rd' as string]: `${Math.round(delay)}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

/**
 * Titre révélé ligne par ligne derrière un masque.
 * Chaque ligne est un bloc à `overflow: hidden` contenant un enfant translaté.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  return (
    <span
      data-reveal="lines"
      className={className}
      style={delay ? ({ ['--rd' as string]: `${Math.round(delay)}ms` } as React.CSSProperties) : undefined}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <span
            className={`reveal-line block ${lineClassName ?? ''}`}
            style={{ ['--li' as string]: String(i) } as React.CSSProperties}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}

/** Conteneur dont les enfants directs entrent en cascade. */
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div data-reveal="stagger" className={className}>
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <div
      className={`reveal-child ${className ?? ''}`}
      style={{ ['--li' as string]: String(index) } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
