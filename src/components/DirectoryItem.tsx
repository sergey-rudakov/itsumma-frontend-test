import React, { useContext, useState } from 'react'
import AppContext from '../context/AppContext'
import { showModal } from '../context/actions'
import { IdirType } from '../types'

import ConfirmModal from './ConfirmModal'
import EditDirForm from './EditDirForm'
import CreateForm from './CreateForm'
import { EditIcon, DeleteIcon, AddIcon, CollapseIcon } from '../UI/svgIcons'

type DirectoryItemProps = {
  data: {
    id: string
    name: string
    parent_id: string
    children: IdirType[]
  }
}

const DirectoryItem: React.FC<DirectoryItemProps> = ({ data: { id, name, parent_id, children }}) => {
  const AppState = useContext(AppContext)
  const dispatch = AppState!.dispatch
  const [isHidden, setIshidden] = useState(false)

  const toggleHidden = () => {
    setIshidden(!isHidden)
  }

  const classes = ['directory', isHidden ? 'collapse' : null]

  const childrens = children.length > 0 && children.map((dir: any) => <DirectoryItem key={ dir.id } data={ dir } />)
  const childList = children.length > 0 && <ul className={ isHidden ? 'hidden' : undefined }>{ childrens }</ul>

  return (
    <li className={ classes.join(' ') }>
      <div className="directory__inner">
        { children.length > 0 && <CollapseIcon onClick={ toggleHidden }/>}
        <div className="directory__name">{ name }</div>
        <AddIcon onClick={ () => showModal(dispatch, <CreateForm id={ id }/>) }/>
        <EditIcon onClick={ () => showModal(dispatch, <EditDirForm name={ name } id={ id } parent_id={ parent_id }/>) }/>
        <DeleteIcon onClick={ () => showModal(dispatch, <ConfirmModal name={ name } id={ id }/>) }/>
      </div>
      { childList }
    </li>
  )
}

export default DirectoryItem