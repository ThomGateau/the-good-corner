import { useParams } from "react-router-dom";
import AdCart, { AdCardProps } from "../components/AdCard";
import { useEffect, useState } from "react";
import axios from "axios";

const AdDetailPage = () => {
  const { id } = useParams();
  const [ad, setAd] = useState<AdCardProps>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/ads/${id}`);
        console.log(result.data);
        setAd(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  return (
    <>
      <h2>Details of ad {id}</h2>
      <section className="recent-ads">
        {ad ? (
          <AdCart
            id={ad.id}
            picture={ad.picture}
            price={ad.price}
            title={ad.title}
            link={ad.link}
            categorie={ad.categorie}
          />
        ) : (
          <p>Ad not found</p>
        )}
      </section>
    </>
  );
};
export default AdDetailPage;
