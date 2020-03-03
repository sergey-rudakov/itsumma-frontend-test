import React, { useContext } from 'react'
import AppContext from '../context/AppContext'
import { deleteDir } from '../context/actions'

type ConfirmModalProps = {
  id: string
  name: string
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ id, name }) => {
  const AppState = useContext(AppContext)
  const dispatch = AppState!.dispatch

  return (
    <form>
      <p style={{color: '#000'}}>Удалить { name }?</p>
      <button type="button" onClick={ () => deleteDir(dispatch, id) }>Да</button>
      <button type="button" onClick={ () => dispatch({ type: 'close-modal' }) }>Отмена</button>
    </form>
  )
}

export default ConfirmModal