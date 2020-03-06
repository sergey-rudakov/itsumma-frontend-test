import React from 'react'

export const EditIcon = ({ size='18', color='#fff', onClick }) => {
  return (
    <div className="svg-icon edit-icon" onClick={ onClick || null }>
      <svg xmlns="http://www.w3.org/2000/svg" height={ size } viewBox="0 0 24 24" width={ size }><path fill={ color } d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
    </div>
  )
}

export const DeleteIcon = ({ size='18', color='#fff', onClick }) => {
  return (
    <div className="svg-icon delete-icon" onClick={ onClick || null }>
      <svg xmlns="http://www.w3.org/2000/svg" height={ size } viewBox="0 0 24 24" width={ size }><path fill={ color } d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
    </div>
  )
}

export const AddIcon = ({ size='18', color='#fff', onClick }) => {
  return (
    <div className="svg-icon add-icon" onClick={ onClick || null }>
      <svg xmlns="http://www.w3.org/2000/svg" height={ size } viewBox="0 0 24 24" width={ size }><path fill={ color } d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
    </div>
  )
}

export const CollapseIcon = ({ size='18', color='#fff', onClick }) => {
  return (
    <div className="svg-icon collapse-icon" onClick={ onClick || null }>
      <svg xmlns="http://www.w3.org/2000/svg" height={ size } viewBox="0 0 24 24" width={ size }><path fill={ color } d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
    </div>
  )
}

export const CloseIcon = ({ size='18', color='#fff', onClick }) => {
  return (
    <div className="svg-icon close-icon" onClick={ onClick || null }>
      <svg xmlns="http://www.w3.org/2000/svg" height={ size } viewBox="0 0 24 24" width={ size }><path fill={ color } d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
    </div>
  )
}