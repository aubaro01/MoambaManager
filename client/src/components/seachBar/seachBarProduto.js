import React from "react";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

const SeachBarProduto = ({ value, onChange }) => {
  return (
    <IconField iconPosition="left" className="w-full md:w-30rem mb-4">
      <InputIcon className="pi pi-search" />
      <InputText
        placeholder="Pesquisar por produto..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </IconField>
  );
};

export default SeachBarProduto;
