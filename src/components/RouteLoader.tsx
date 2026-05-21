import './RouteLoader.css';

/**
 * RouteLoader · placeholder editorial enquanto chunk lazy carrega.
 * Skeleton de header + dois blocos com shimmer navy sutil.
 */
export default function RouteLoader() {
  return (
    <div className="vds-route-loader" role="status" aria-live="polite" aria-label="Carregando">
      <div className="vds-route-loader__eyebrow" />
      <div className="vds-route-loader__title" />
      <div className="vds-route-loader__title vds-route-loader__title--short" />
      <div className="vds-route-loader__lede" />
      <div className="vds-route-loader__lede vds-route-loader__lede--short" />

      <div className="vds-route-loader__block" />
      <div className="vds-route-loader__block vds-route-loader__block--alt" />
      <span className="vds-route-loader__sr">Carregando…</span>
    </div>
  );
}
