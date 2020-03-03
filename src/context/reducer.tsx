import { StateType, IdirType } from "../types"
import { ActionType } from "./actions"

const reducer = ( state: StateType, action: ActionType ) => {
  switch(action.type) {
    case 'fetch':
      return { ...state,
        data: action.payload
      }

    case 'create':
      return {
        ...state,
        data: [...state.data, action.payload],
        modal: {
          isOpen: false
        }
      }

    case 'delete':
      const id = action.payload
      const newData = state.data.filter((item: IdirType) => item.id !== id)
      return { ...state, data: newData, modal: { isOpen: false }}
    
    case 'update':
      return {
        ...state,
        data: state.data.map((item: IdirType) => {
          if (item.id === action.payload.id) {
            return Object.assign({}, item, {name: action.payload.name} )
          } else {
            return item
          }
        }),
        modal: {
          isOpen: false
        }
      }

    case 'show-modal':
      return {...state,
        modal: {
          ...state.modal,
          isOpen: true,
          content: action.payload
        }
      }

    case 'close-modal':
      return {...state,
        modal: {...state.modal, isOpen: false}
      }

    default:
      return state
  }
}

export default reducer