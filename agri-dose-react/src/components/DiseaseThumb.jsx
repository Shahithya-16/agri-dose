import { useState } from 'react';

export default function DiseaseThumb({ image, swatch, name }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="disease-thumb fallback" style={{ background: swatch }} aria-hidden="true">
        <span>🍃</span>
      </div>
    );
  }

  return (
    <img
      className="disease-thumb"
      src={image}
      alt={name}
      onError={() => setFailed(true)}
    />
  );
}
