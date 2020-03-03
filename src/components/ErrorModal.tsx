import React, { useContext } from 'react'
import AppContext from '../context/AppContext'
import { closeModal } from '../context/actions'

type ErrorModalProps = {
  text: string
}

const ErrorModal: React.FC<ErrorModalProps> = ({ text }) => {
  const AppState = useContext(AppContext)
  const dispatch = AppState!.dispatch

  return (
    <>
      <p className="error">
        { text }
      </p>
      <button type="button" onClick={ () => closeModal(dispatch) }>Закрыть</button>
    </>
  )
}

export default ErrorModal
