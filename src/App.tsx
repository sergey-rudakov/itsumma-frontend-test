import React from "react";
import DirManager from "./DirManager/DirManager";
import "./DirManager/style/style.css";

const url: string = "http://localhost:3050/dir";

// let x: IDir[];
// fetch(url)
//     .then((res) => res.json())
//     .then((res) => {console.log(res); })
//
// ;

const App = () => {
    return (
    <>
        <nav className={"nav-wrapper red accent-4"}>
        <a href="https://www.itsumma.ru/"
           className={"brand-logo center"}>
            Material.DM
        </a>
        </nav>

      <main>
          <DirManager/>
          <section>
              {/*{x.map((item) => {return <p>{item.id}</p>; )}*/}
          </section>
      </main>
    </>
  );
};

export default App;
