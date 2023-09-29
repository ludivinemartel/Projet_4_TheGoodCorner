export type AdCategoryProps = {
    id?: number;
    name: string;
  };
  
  const AdCategory = ({ id, name }: AdCategoryProps) => {
    return (
      <a href="" className="category-navigation-link">
        {id}
        {name}
      </a>
    );
  };

  export default AdCategory;