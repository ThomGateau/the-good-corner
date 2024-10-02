import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdCart, { AdCardProps } from "../components/AdCard";

const AdSearchPage = () => {
  const { keyword } = useParams();
  const [ads, setAds] = useState<AdCardProps[]>();
  useEffect(() => {
    const fetchAdsForKeyword = async () => {
      const result = await axios.get(
        `http://localhost:3000/ads?title=${keyword}`
      );
      setAds(result.data);
    };
    fetchAdsForKeyword();
  }, [keyword]);

  return (
    <>
      <p>Search result for : {keyword}</p>
      {ads ? (
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
        <p>Nothing found</p>
      )}
    </>
  );
};
export default AdSearchPage;
