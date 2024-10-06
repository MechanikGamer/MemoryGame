import '@styles/components/Modal.scss'

import React from 'react'

interface ModalProps {
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button className="modal-close-button" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  )
}

export default Modal
