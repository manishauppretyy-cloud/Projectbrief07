function Card({ title, description, children, className = "" }) {
  return (
    <div className={`custom-card ${className}`}>
      {title && <h3>{title}</h3>}

      {description && (
        <p className="card-description">
          {description}
        </p>
      )}

      {children}
    </div>
  );
}

export default Card;