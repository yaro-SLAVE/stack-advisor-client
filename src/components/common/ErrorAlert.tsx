import React from 'react';
import { Alert, Button } from 'react-bootstrap';

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
  variant?: 'danger' | 'warning' | 'info';
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ 
  message, 
  onRetry, 
  variant = 'danger' 
}) => {
  return (
    <Alert variant={variant} className="my-3">
      <div className="d-flex justify-content-between align-items-center">
        <span>{message}</span>
        {onRetry && (
          <Button variant="outline-danger" size="sm" onClick={onRetry}>
            Повторить
          </Button>
        )}
      </div>
    </Alert>
  );
};

export default ErrorAlert;