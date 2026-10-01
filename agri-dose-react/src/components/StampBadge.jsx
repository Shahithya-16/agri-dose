let idCounter = 0;

export default function StampBadge({ className = '' }) {
  const pathId = `stampCircle-${++idCounter}`;
  return (
    <svg className={`stamp-badge ${className}`} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <path id={pathId} d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
      </defs>
      <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="50" cy="50" r="27" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <text fontSize="6.4" letterSpacing="2" fill="currentColor">
        <textPath href={`#${pathId}`} startOffset="2%">
          AGRIDOSE • FIELD VERIFIED • AGRIDOSE • FIELD VERIFIED •
        </textPath>
      </text>
      <text x="50" y="47" textAnchor="middle" fontWeight="700" fontSize="13" fill="currentColor" fontFamily="Space Grotesk, sans-serif">AGRI</text>
      <text x="50" y="61" textAnchor="middle" fontWeight="700" fontSize="13" fill="currentColor" fontFamily="Space Grotesk, sans-serif">DOSE</text>
    </svg>
  );
}
