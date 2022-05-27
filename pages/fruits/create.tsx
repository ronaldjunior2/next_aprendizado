import axios from "axios";
import type { NextPage } from "next";
import { useState } from "react";

const CreateFruit: NextPage = () => {
  type FormData = {
    name: string;
    description: string;
  };
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
  });

  async function CustomOnChange(e: any) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleAddResource(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await axios.post("/api/fruits", formData);
  }

  return (
    <div className="font-bold">
      <h1 className="text-xl py-5">PAGINA DE CRIAÇAO DE FRUTAS</h1>
      <form onSubmit={handleAddResource}>
        <div className="w-full flex flex-col gap-2 mb-5">
          <label htmlFor="title" className="text-base text-gray-500">
            Nome
          </label>
          <input
            id="title"
            type="text"
            name="name"
            className="w-full border-[1px] h-9 rounded-lg shadow-sm p-2 outline-none focus:outline-offset-0 focus:outline-gray-400 focus:outline-[3px] transition-all"
            onChange={CustomOnChange}
            value={formData.name}
          />
          <label htmlFor="description" className="text-base text-gray-500">
            Descrição
          </label>
          <textarea
            value={formData.description}
            onChange={CustomOnChange}
            id="description"
            name="description"
            className="w-full border-[1px] h-32 rounded-lg shadow-sm p-2 outline-none focus:outline-offset-0 focus:outline-gray-400 focus:outline-[3px] transition-all"
          ></textarea>
          <button
            type="submit"
            className="px-6 py-3 bg-sky-700 text-white rounded-lg ml-right outline-none focus:outline-offset-0 focus:outline-sky-300 focus:outline-[3px] transition-all"
          >
            criar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFruit;
