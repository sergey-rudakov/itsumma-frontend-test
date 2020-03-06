import React, { useState, useContext, useRef, useEffect } from 'react'
import AppContext from '../context/AppContext'
import { updateDir, closeModal } from '../context/actions'

type EditDirFormProps = {
  id: string
  name: string
  parent_id: string
}

const EditDirForm: React.FC<EditDirFormProps> = ({ id, name, parent_id }) => {
  const AppState = useContext(AppContext)
  const dispatch = AppState!.dispatch
  const inputElement = useRef<HTMLInputElement>(null)
  const [updatedDir, setUpdatedDir] = useState({
    name,
    parent_id
  })

  useEffect(() => {
    if (inputElement.current) {
      requestAnimationFrame(() => {
        inputElement.current!.focus()
      })
    }
  })

  return (
    <form>
      <div className="form-group">
        <input type="text" ref={ inputElement } value={ updatedDir.name } onChange={ (e) => setUpdatedDir({...updatedDir, name: e.target.value}) }/>
      </div>
      <button type="button" onClick={ () => updateDir(dispatch, id, updatedDir) }>Изменить</button>
      <button type="button" onClick={ () => closeModal(dispatch) }>Отмена</button>
    </form>
  )
}

export default EditDirForm