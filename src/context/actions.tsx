import React from 'react'
import { IdirType } from "../types"

export type ActionType = 
  | {type: 'fetch', payload: IdirType[]}
  | {type: 'create', payload: IdirType}
  | {type: 'delete', payload: string}
  | {type: 'update', payload: IdirType}
  | {type: 'show-modal', payload: React.ReactNode}
  | {type: 'close-modal'}
  | {type: 'show-error', payload: string}


export const fetchData = (dispatch: React.Dispatch<ActionType>) => {
  fetch(`${process.env.REACT_APP_API_HOST}/dir`)
    .then(res => res.json())
    .then((data: IdirType[]) => {
      dispatch({
        type: 'fetch',
        payload: data
      })
    })
}

export const createDir = (dispatch: React.Dispatch<ActionType>, body: IdirType) => {
  fetch(`${process.env.REACT_APP_API_HOST}/dir`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(body)
  })
  .then(res => res.ok && res.json())
  .then((data: IdirType) => dispatch({
    type: 'create',
    payload: data
  }))
}

export const deleteDir = (dispatch: React.Dispatch<ActionType>, id: string) => {
  fetch(`${process.env.REACT_APP_API_HOST}/dir/${id}`, {
    method: 'DELETE',
  })
  .then(res => res.ok && dispatch({
    type: 'delete',
    payload: id
  }))
}

export const updateDir = (dispatch: React.Dispatch<ActionType>, id: string, updatedDir: IdirType) => {
  fetch(`${process.env.REACT_APP_API_HOST}/dir/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(updatedDir)
  })
  .then(res => res.ok && res.json())
  .then((data: IdirType) => dispatch({
    type: 'update',
    payload: data
  }))
}

export const showModal = (dispatch: React.Dispatch<ActionType>, content: React.ReactNode) => {
  dispatch({
    type: 'show-modal',
    payload: content
  })
}

export const closeModal = (dispatch: React.Dispatch<ActionType>) => {
  dispatch({
    type: 'close-modal'
  })
}

export const showError = (dispatch: React.Dispatch<ActionType>, payload: string) => {
  dispatch({
    type: 'close-modal'
  })
  dispatch({
    type: 'show-modal',
    payload
  })
}