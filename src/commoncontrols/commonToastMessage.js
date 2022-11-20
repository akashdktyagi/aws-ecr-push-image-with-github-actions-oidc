import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

const StackingToast = ({ showToast, toastData, showHideToast }) => {
  const [showA, setShowA] = useState(true);

  const toggleShowA = () => setShowA(!showA);

  return (
    <>
      <Toast show={showToast} onClose={showHideToast}>
        <Toast.Header>
          <strong className="me-auto">{toastData.toastHeader}</strong>
        </Toast.Header>
        <Toast.Body>{toastData.toastBody}</Toast.Body>
      </Toast>
    </>
  );
}

export default StackingToast;