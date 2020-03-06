export type IdirType =  {
  id?: string
  name: string
  parent_id?: string,
  children?: IdirType[]
}

export type StateType = {
  data: IdirType[]
  modal: {
    isOpen: boolean,
    content?: React.ReactNode
  }
}
