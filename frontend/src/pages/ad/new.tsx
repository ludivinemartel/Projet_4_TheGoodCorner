import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import AdCard, { AdCardProps } from "/Users/ludivine/Documents/JS/the-good-corner/frontend/src/components/AdCard";
import { toast } from "react-toastify";

type category = 
{
  id: number;
  name: string;
};

const NewAd = () => {

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
  } = useForm<AdCardProps>()
  
  const onSubmit: SubmitHandler<AdCardProps> = async (data) => {
  try {
    const result = await axios.post("http://localhost:4000/ad", data);
    console.log("result", result);
    toast.success(result.data, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  } catch (err: any) {
    toast.error(err.response.data, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
};

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Titre de l&apos;annonce : <br />
          <input className="text-field" 
          {...register("title", { required: true, maxLength: 20 })}
          aria-invalid={errors.title ? "true" : "false"}
          />
          {errors.title?.type === "required" && (
        <p role="alert">Title is required</p>
      )}
        </label>
        <br /> 

        <label>
            Prix :<br /> 
          <input className="text-field" type="number" 
          {...register("price", { required: true, min: 1 })} 
          aria-invalid={errors.price ? "true" : "false"}
          />
        {errors.price?.type === "required" && (
        <p role="alert">Price is required</p>
      )}
       </label>
        <br /> 

        <label>
          Description :<br />
          <input className="text-field" 
          {...register("description", { required: true, maxLength: 200 })}
          aria-invalid={errors.description? "true" : "false"}
          />
        {errors.description?.type === "required" && (
        <p role="alert">Description is required</p>
      )}
        </label>
        <br /> 

        <label>
          Image :<br />
          <input className="text-field" 
          {...register("imageUrl", { required: true})} 
          aria-invalid={errors.imageUrl? "true" : "false"}
          />
          {errors.imageUrl?.type === "required" && (
        <p role="alert">Image is required</p>
      )}
        </label>
        <br />

        <label>
          Auteur :<br />
          <input className="text-field" 
          {...register("owner", { required: true})}
          aria-invalid={errors.owner? "true" : "false"}
          />
          {errors.owner?.type === "required" && (
        <p role="alert">Auteur is required</p>
      )}
        </label>
        <br />

        <label>
          Localisation :<br />
          <input className="text-field" 
          {...register("location", { required: true})}
          aria-invalid={errors.location? "true" : "false"}
          />
           {errors.location?.type === "required" && (
        <p role="alert">Location is required</p>
      )}
        </label>
        <br />

        <select name="category">
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name} 
          </option>
        ))}
      </select>

        <button className="button">Submit</button>
      </form>
    );
  };
  
  export default NewAd;

