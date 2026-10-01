import StampBadge from './StampBadge.jsx';

export default function BrandPanel({ ticketLine, heading, body, gauges, wordSub }) {
  return (
    <aside className="auth-brand">
      <div className="rows-bg" aria-hidden="true"></div>

      <div className="brand-mark">
        <StampBadge />
        <div className="word"><b>AgriDose</b>{wordSub}</div>
      </div>

      <div className="brand-copy">
        <p className="ticket-line">{ticketLine}</p>
        <h1>{heading}</h1>
        <p>{body}</p>

        <div className="gauge-row">
          {gauges.map((g, i) => (
            <div className="gauge" key={i}>
              <div className="num">{g.num}</div>
              <div className="lbl">{g.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
