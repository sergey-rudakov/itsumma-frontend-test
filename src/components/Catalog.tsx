import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { actionAddCatalog, actionDeleteCatalogs, actionSetCatalog } from "../actions/catalogs";
import { actionNewMessage } from "../actions/message";
import { ContextCatalogs } from "../reducers/catalogs";
import { ContextMessage } from "../reducers/message";
import { ICatalog } from "../types";
import CatalogForm from "./CatalogForm";

const Catalog: FunctionComponent<ICatalog> = ({
  id,
  name,
  parent_id,
}) => {
  const [catalogsState, catalogsDispatch] = useContext(ContextCatalogs);
  const [, messageDispatch] = useContext(ContextMessage);
  const [openChild, setOpenChild] = useState(false);
  const [сhangeName, setChangeName] = useState(false);
  const [childs, setChild] = useState<ICatalog[]>([]);

  useEffect(() => {
    const filterCatalogs = () => {
      const result: ICatalog[] = [];

      catalogsState.forEach((catalog) => {
        if (catalog.parent_id === id) {
          result.push(catalog);
        }
      });

      setChild(result);
    };

    filterCatalogs();
  }, [catalogsState, id]);
  const addCatalog = (value: string) => {
    for (const catalog of catalogsState) {
      if (catalog.parent_id === id && catalog.name === value) {
        return;
      }
    }

    messageDispatch(actionNewMessage({
      fun: () => {
        const data: ICatalog = {
          id: String(new Date()),
          name: value,
          parent_id: id,
        };
        const header = {
          body: JSON.stringify(data),
          headers: {"Content-Type": "application/json"},
          method: "POST",
        };

        fetch("http://localhost:3050/dir", header)
          .then((response) => response.ok && catalogsDispatch(actionAddCatalog(data)));
      },
      value: `New catalog ${value}?`,
    }));
  };
  const setCatalog = (value: string) => {
    for (const catalog of catalogsState) {
      if (catalog.parent_id === parent_id && catalog.name === value) {
        return;
      }
    }

    messageDispatch(actionNewMessage({
      fun: () => {
        const data = {name: value, parent_id};
        const header = {
          body: JSON.stringify(data),
          headers: {"Content-Type": "application/json"},
          method: "PUT",
        };

        fetch("http://localhost:3050/dir/" + id, header)
          .then((response) => {
            if (response.ok) {
              setChangeName(false);
              catalogsDispatch(actionSetCatalog({ id, name: value }));
            }
          });
      },
      value: `Change ${name} to ${value}`,
    }));
  };
  const deleteCatalog = () => {
    const fun = () => {
      const regress = (catalogId: string) => {
        fetch("http://localhost:3050/dir/" + catalogId, {method: "DELETE"})
          .then((response) => {
            if (response.ok) {
              catalogsDispatch(actionDeleteCatalogs(catalogId));

              catalogsState.forEach((catalog) => {
                if (catalog.parent_id === catalogId) {
                  setTimeout(() => regress(catalog.id), 10000);
                }
              });
            }
          });
      };

      regress(id);
    };

    messageDispatch(actionNewMessage({ fun, value: `Delete catalog ${name}?` }));
  };

  return (
    <div className="container">
      <div className={childs.length !== 0 ? "container__catalog container__catalog--parent" : "container__catalog"}>
        {childs.length !== 0 && (
          <button className="container__button" onClick={() => setOpenChild(!openChild)}>
            <i className="material-icons">
              {openChild ? "keyboard_arrow_up" : "keyboard_arrow_down"}
            </i>
          </button>
        )}

        {сhangeName ? <CatalogForm method={setCatalog} name={name} /> : <p>{name}</p>}

        <div className="container__buttons">
          <button onClick={() => setChangeName(!сhangeName)}>
            <i className="material-icons">edit</i>
          </button>
          <button onClick={() => deleteCatalog()}>
            <i className="material-icons">delete</i>
          </button>
        </div>

        <CatalogForm method={addCatalog} />
      </div>

      {openChild && childs.map((catalog) => <Catalog key={catalog.id} {...catalog} />)}
    </div>
  );
};

export default Catalog;
