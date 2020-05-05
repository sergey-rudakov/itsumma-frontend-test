import React from "react";
import "./App.css";
import Manager from "./Components/Manager";
const App: React.FC = () => {
  return (
    <div className="App">
        <header className={"main-header"}>
            <h1>ITSumma. Тестовое задание для фронтенд-разработчика
            </h1>
        </header>
      <Manager/>
      <footer className={'main-footer'}>
          <p className={"developer"}>Разработчик: <span>Денис Кривошапко</span></p>
          <a href="https://t.me/danzel123">t.me/danzel123</a>
      </footer>
    </div>
  );
};

export default App;
