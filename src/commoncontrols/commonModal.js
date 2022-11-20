import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';

const CommonModal = ({showModal, children, modalData, onSaveChanges}) => {
  const modalSate = useSelector((state) => state.modalShowHide);
  const dispatchHide = useDispatch();

  const [show, setShow] = useState(modalSate);

  const handleClose = () => dispatchHide({type: "ISHIDE"});

  return (
    <>
      <Modal show={modalSate.isOpenHide} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          {modalData.modalClose}
          </Button>
          <Button variant="primary" onClick={onSaveChanges}>
          {modalData.modalSaveBtnTitle}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CommonModal;
