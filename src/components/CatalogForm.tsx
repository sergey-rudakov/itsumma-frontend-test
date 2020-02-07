import React, { FunctionComponent, useState } from "react";

interface ICatalogFormProps {
  method: (value: string) => void;
  name?: string;
}

const CatalogForm: FunctionComponent<ICatalogFormProps> = ({ method, name }) => {
  const [value, setValue] = useState<string>(name || "");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    method(value);
  };

  return (
    <form onSubmit={handleSubmit} className="catalogForm">
      <button>
        <i className="material-icons">add</i>
      </button>
      <input
        className="catalogForm__input"
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </form>
  );
};

export default CatalogForm;
