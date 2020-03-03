import { createContext } from 'react'
import { StateType } from '../types'
import { ActionType } from './actions'

export type AppStateType = {
  state: StateType,
  dispatch: React.Dispatch<ActionType>
}

const AppContext = createContext<AppStateType | null>(null)

export default AppContext