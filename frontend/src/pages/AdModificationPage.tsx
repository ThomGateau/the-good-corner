import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { categorie } from "../components/Header";
import { AdCardProps } from "../components/AdCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const AdModificationPage = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([] as categorie[]);
  const [ad, setAd] = useState<AdCardProps>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

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
      <>
        <form
          onSubmit={handleSubmit(async (data) => {
            const result = await axios.put(
              `http://localhost:3000/ads/${ad.id}`,
              data
            );
            if (result.status == 200) {
              toast.success("🦄 Wow so easy!");
              navigate(`/ad/${param.id}`);
            }
          })}
        >
          <label>
            Titre de l'annonce :
            <br />
            <input
              className="text-field"
              type="text"
              {...register("title", {
                required: "This is require",
                minLength: { value: 5, message: "Minimum 5" },
              })}
              defaultValue={ad.title}
            />
          </label>
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => {
                console.log(message);
                return (
                  <Fragment key={type}>
                    <br />
                    <span className="error-message">{message}</span>
                  </Fragment>
                );
              })
            }
          />
          <br />
          <label>
            Description :
            <br />
            <input
              className="text-field"
              type="text"
              {...register("description", {
                required: "This is require",
                minLength: { value: 10, message: "Minimum 10" },
              })}
              defaultValue={ad.description}
            />
            <span style={{ color: "red" }}>
              {" "}
              {errors.description?.message as string}
            </span>
          </label>
          <br />
          <label>
            Owner :
            <br />
            <input
              className="text-field"
              type="text"
              {...register("owner")}
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
              {...register("price")}
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
              {...register("picture")}
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
              {...register("location")}
              defaultValue={ad.location}
            />
          </label>
          <br />
          <select {...register("categorie")} defaultValue={ad.categorie.id}>
            {categories.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </select>
          <button className="button">Submit</button>
        </form>
      </>
    );
  } else {
    return <p>Error adresse</p>;
  }
};
export default AdModificationPage;
