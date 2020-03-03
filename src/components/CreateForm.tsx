import React, { useState, useContext, useEffect, useRef } from 'react'
import AppContext from '../context/AppContext'
import { createDir, closeModal, showModal } from '../context/actions'
import ErrorModal from './ErrorModal'

type CreateFormProps = {
  id: string
}

const CreateForm: React.FC<CreateFormProps> = ({ id }) => {
  const AppState = useContext(AppContext)
  const state = AppState!.state
  const dispatch = AppState!.dispatch
  const inputElement = useRef<HTMLInputElement>(null)
  const [newDir, setNewDir] = useState({
    name: '',
    parent_id: id
  })

  useEffect(() => {
    if (inputElement.current) {
      requestAnimationFrame(() => {
        inputElement.current!.focus()
      })
    }
  })
  
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    if (!state.data.filter(dir => dir.parent_id === id && dir.name === newDir.name).length) {
      createDir(dispatch, newDir)
    } else {
      showModal(dispatch, <ErrorModal text="Директория с таким именем уже существует"/>)
    }
    event.preventDefault()
  }

  return (
    <form onSubmit={ submitHandler }>
      <div className="form-group">
        <input type="text" ref={ inputElement } value={ newDir.name } onChange={ (event) => setNewDir({...newDir, name: event.target.value})}/>
      </div>
      <button type="submit" disabled={ newDir.name.length === 0 }>Создать</button>
      <button type="button" onClick={ () => closeModal(dispatch) }>Отмена</button>
      
    </form>
  )
}

export default CreateForm