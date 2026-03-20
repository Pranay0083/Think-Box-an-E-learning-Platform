import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, SearchX, BookX, LogIn } from 'lucide-react';
import './EmptyState.css';

const iconMap = {
  error: AlertTriangle,
  empty: SearchX,
  'not-found': BookX,
  auth: LogIn,
};

const EmptyState = ({
  variant = 'empty',
  title,
  message,
  actionLabel,
  actionTo,
  onAction,
}) => {
  const navigate = useNavigate();
  const Icon = iconMap[variant] || SearchX;

  const handleAction = () => {
    if (onAction) return onAction();
    if (actionTo) navigate(actionTo);
  };

  return (
    <div className="es-container">
      <div className="es-card">
        <div className={`es-icon es-icon--${variant}`}>
          <Icon size={32} />
        </div>
        <h2 className="es-title">{title || 'Nothing here yet'}</h2>
        {message && <p className="es-message">{message}</p>}
        {(actionLabel && (actionTo || onAction)) && (
          <button className="es-action" onClick={handleAction}>
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
