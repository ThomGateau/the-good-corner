import axios from "axios";
import { useEffect, useState } from "react";
import { categorie } from "../components/Header";
import { useNavigate } from "react-router-dom";

const NewAdFormPage = () => {
  const [categories, setCategories] = useState([] as categorie[]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axios.get("http://localhost:3000/categorie");
        console.log(result);
        setCategories(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const form = e.target;
        const formdata = new FormData(form as HTMLFormElement);

        const formJson = Object.fromEntries(formdata.entries());
        const result = await axios.post("http://localhost:3000/ads", formJson);
        console.log(result);
        if (result.status == 200) {
          navigate("/");
        }
      }}
    >
      <label>
        Titre de l'annonce :
        <br />
        <input className="text-field" type="text" name="title" />
      </label>
      <br />
      <label>
        Description :
        <br />
        <input className="text-field" type="text" name="description" />
      </label>
      <br />
      <label>
        Owner :
        <br />
        <input className="text-field" type="text" name="owner" />
      </label>
      <br />
      <label>
        Price :
        <br />
        <input className="text-field" type="number" name="price" />
      </label>
      <br />
      <label>
        Picture :
        <br />
        <input className="text-field" type="text" name="picture" />
      </label>
      <br />
      <label>
        Location :
        <br />
        <input className="text-field" type="text" name="location" />
      </label>
      <br />
      <label>
        Date :
        <br />
        <input className="text-field" type="date" name="createdAt" />
      </label>
      <br />
      <select name="categorie">
        {categories.map((el) => (
          <option key={el.id} value={el.id}>
            {el.name}
          </option>
        ))}
      </select>
      <button className="button">Submit</button>
    </form>
  );
};
export default NewAdFormPage;
