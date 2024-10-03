import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { categorie } from "../components/Header";
import { AdCardProps } from "../components/AdCard";

const AdModificationPage = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([] as categorie[]);
  const [ad, setAd] = useState<AdCardProps>();

  useEffect(() => {
    const fetchAd = async () => {
      const ad = await axios.get(`http://localhost:3000/ads?id=${param.id}`);
      console.log(ad);
      setAd(ad.data);
    };
    fetchAd();
    const fetchCategories = async () => {
      try {
        const result = await axios.get("http://localhost:3000/categorie");
        setCategories(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  if (ad) {
    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const form = e.target;
          const formdata = new FormData(form as HTMLFormElement);

          const formJson = Object.fromEntries(formdata.entries());
          const result = await axios.put(
            `http://localhost:3000/ads/${ad.id}`,
            formJson
          );
          console.log(result);
          if (result.status == 200) {
            navigate(`/ad/${param.id}`);
          }
        }}
      >
        <label>
          Titre de l'annonce :
          <br />
          <input
            className="text-field"
            type="text"
            name="title"
            defaultValue={ad.title}
          />
        </label>
        <br />
        <label>
          Description :
          <br />
          <input
            className="text-field"
            type="text"
            name="description"
            defaultValue={ad.description}
          />
        </label>
        <br />
        <label>
          Owner :
          <br />
          <input
            className="text-field"
            type="text"
            name="owner"
            defaultValue={ad.owner}
          />
        </label>
        <br />
        <label>
          Price :
          <br />
          <input
            className="text-field"
            type="number"
            name="price"
            defaultValue={ad.price}
          />
        </label>
        <br />
        <label>
          Picture :
          <br />
          <input
            className="text-field"
            type="text"
            name="picture"
            defaultValue={ad.picture}
          />
        </label>
        <br />
        <label>
          Location :
          <br />
          <input
            className="text-field"
            type="text"
            name="location"
            defaultValue={ad.location}
          />
        </label>
        <br />
        <select name="categorie" defaultValue={ad.categorie.id}>
          {categories.map((el) => (
            <option key={el.id} value={el.id}>
              {el.name}
            </option>
          ))}
        </select>
        <button className="button">Submit</button>
      </form>
    );
  } else {
    return <p>Error adresse</p>;
  }
};
export default AdModificationPage;
