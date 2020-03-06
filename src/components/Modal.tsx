import React, { useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import AppContext from '../context/AppContext'
import { CloseIcon } from '../UI/svgIcons'

const Modal: React.FC = () => {
  const AppState = useContext(AppContext)
  const state = AppState!.state
  const dispatch = AppState!.dispatch
  const modalRoot = document.createElement('div')

  useEffect(() => {
    document.body.appendChild(modalRoot)
    return () => {
      document.body.removeChild(modalRoot)
    };
  })

  const content = state.modal.isOpen && 
  ReactDOM.createPortal(
    <div className="modal">
      <div className="modal__backdrop">
        <div className="modal__content">
          { state.modal.content }
          <CloseIcon color='#000' size='24' onClick={ () => dispatch({ type: 'close-modal'}) }/>
        </div>
      </div>
    </div>,
    modalRoot
  )

  return (
    <>
      { content }
    </>
  )
}

export default Modal