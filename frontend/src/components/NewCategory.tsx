import { useState, useEffect } from "react";
import axios from "axios";
import AdCategory, { AdCategoryProps } from "./AdCategory";

const NewCategory = () => {
  const [cats, setCats] = useState<AdCategoryProps[]> ([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get<AdCategoryProps[]>(
          "http://localhost:4000/category"
        );
        setCats (result.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, []);

  const ad: AdCategoryProps[] = [
  ];

  return (
    <>
       <nav className="categories-navigation">
        {cats.map((cat) => (
            <div >
            <AdCategory
                key={cat.id}
                name={cat.name}
            />
            </div>
        ))}
      </nav>
    </>
  );
};

export default NewCategory;