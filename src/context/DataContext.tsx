import { createContext } from 'react'

const initialContext = {
  data: [],
  modal: {
    isOpen: false,
    content: null
  }
}

const DataContext = createContext(initialContext)

export default DataContext