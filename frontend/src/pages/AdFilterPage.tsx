import { useEffect, useState } from "react";
import AdCart, { AdCardProps } from "../components/AdCard";
import { useParams } from "react-router-dom";
import axios from "axios";

const AdFilterPage = () => {
  const param = useParams();
  const [ads, setAds] = useState<AdCardProps[]>();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:3000/ads?categorie=${param.name}`
      );
      setAds(result.data);
    };
    fetchData();
  }, [param]);

  return (
    <>
      <h2>{param.name}</h2>
      {ads ? (
        ads.length > 0 ? (
          ads.map((el) => (
            <div key={el.id}>
              <AdCart
                id={el.id}
                picture={el.picture}
                price={el.price}
                title={el.title}
                categorie={el.categorie}
              />
            </div>
          ))
        ) : (
          <p>No ad</p>
        )
      ) : (
        <p>Nothing found</p>
      )}
    </>
  );
};
export default AdFilterPage;
