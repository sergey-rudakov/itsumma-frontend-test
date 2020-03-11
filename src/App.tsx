import React,{useState,createRef} from "react";
import "./App.css";
type Response = {
  name: string,
  id: string,
  parent: string
};

let listDir:Response[]=[{name: 'папка1', id: '1', parent: 'null' },
                        {name: 'папка2', id: '2', parent: 'null' ,},
                        {name: 'папка1.1', id: '3', parent: '1', },
                        {name: 'папка2.2', id: '4', parent: '2',},
                        {name: 'папка2.1', id: '5', parent: '2' },
                        {name: 'папка1.1.1', id: '6', parent: '3', }];
const App: React.FC = () => {
  const[state,setState]=useState("");
  const[stateDel,setStateDel]=useState("");
  const[openedFolder,setOpenedFolder]=useState([""]);
  const[stateDir,setStateDir]=useState("");
  //логика для отслеживания открытых компонентов списка
  const openFolder = (id: string) => {
    if(openedFolder.includes(id)){
      setOpenedFolder(openedFolder.filter(e => e !== id))}
    else {setOpenedFolder([...openedFolder,id]) }
  };
  //всплывающее окно для добавления элемента
  const Modal: React.FC<{item:string}> = (item) =>{
    const dontShow =()=>{setState('')}
    if(item.item){
      const add=()=>{
        const vel=(document.getElementById("vel") as HTMLTextAreaElement).value;
        let namber =listDir.length;
        listDir.push({name:vel,id:""+(+listDir[namber-1].id+1),parent:item.item});
        console.log(listDir);
        openFolder(item.item);
        setState('');
  }
  return (<div className="zatemnenie">
            <div className="modal">
              <div><p>Вы хотите добавить директорию?</p>
              </div>
              <textarea id="vel"></textarea>
            <div>
              <button onClick={add}>Добавить директорию</button>
              <button onClick={dontShow}>Отмена</button>
            </div>
            </div>
          </div>);}
  return null;
  }
  //всплывающее окно для удаления элемента
  const ModalDel: React.FC<{itemDel:string}> =(itemDel)=>{
    let item:Response = listDir.filter(elem=> elem.id==itemDel.itemDel)[0];

    function childrenDel(item:Response){//функция удаления всех дочерних элементов
      let children = listDir.filter(itemdir => itemdir.parent == item.id);
      listDir.splice(listDir.indexOf(item),1);
      if(listDir.filter(itemdel => itemdel.parent == item.id).length)
        children.map(childe => childrenDel(childe));//рекурсия по дочерним элементам
    }

    let removeModal= ()=>{
      setStateDel("");
    }
  if(item) {
    let deleteDir = () =>{
    if(listDir.filter(itemdir => itemdir.parent === item.id))
      childrenDel(item);
      openFolder(item.id);
    }
    return (<div className="zatemnenie"><div className="modal">
           <div className="ModalWindow">
           <div className='modalTitle'>Вы точно хотите удалить {item.name}</div>
           <div className="ModalFooter">
           <button className="ModalButon" onClick={deleteDir}>Удалить</button>
           <button onClick={removeModal}>Отмена</button>
           </div>
       </div>
    </div></div>);
  }return null;
  }
  // отрисовка списка
  const RenderFolder:React.FC< {
    item: string
  }> = (elem) => {
  const children = listDir.filter(dir => dir.parent === elem.item);
  let item = listDir.filter(list => list.id==elem.item)[0];
  return <li>
  <span onClick={() => children.length && openFolder(item.id)}>{item.name}</span>
  <button onClick={() =>setState(item.id)}>добавить в {item.name} элемент</button>
  <button onClick={() =>setStateDel(item.id)}>удалить {item.name}</button>
  {children.length && openedFolder.includes(item.id) && <ul>
  {children.map(child => <RenderFolder item={child.id} />)}
  </ul>}
  </li>;
}
  // основной див
  return (<div>
            <ul className="App">
              {listDir.filter(item => item.parent === 'null').map(item1 => <RenderFolder item={item1.id} />)}
            </ul>
            <Modal item={state}/>
            <ModalDel itemDel={stateDel}/>
          </div>)
}

export default App;

