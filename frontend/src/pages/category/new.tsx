import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import AdCategory, { AdCategoryProps } from "/Users/ludivine/Documents/JS/the-good-corner/frontend/src/components/AdCategory";

type category = 
{
  id: number;
  name: string;
};

const NewCategory = () => {

  const [ categories, setCategories] = useState<category[]>([]);
  useEffect (() => {
    const fetchCategories = async () => {
      const result = await axios.get<category[]>(
        "http://localhost:4000/category"
      );
      setCategories(result.data);
    };
    fetchCategories(); // éxécuter la fonction 
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AdCategoryProps>()
  
  const onSubmit: SubmitHandler<AdCategoryProps> = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/category", data);
    } catch (err) {
        console.log("error", err);
    }
  };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Nom de la catégorie<br />
          <input className="text-field" 
          {...register("name", { required: true})} />
        </label>
        <br />
        <button className="button">Submit</button>
      </form>
    );
  };
  
  export default NewCategory;
