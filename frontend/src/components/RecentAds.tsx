import { useEffect, useState } from "react";
import AdCart, { AdCardProps } from "./AdCard";
import axios from "axios";

const RecentAds = () => {
  const [total, setTotal] = useState(0);
  const [color, setColor] = useState("rgb(100,100,100)");
  const [ads, setAds] = useState<AdCardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get<AdCardProps[]>(
          "http://localhost:3000/ads"
        );
        console.log(result);
        setAds(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h2>Annonces récentes</h2>
      <p style={{ color: color }}>
        Total : {total} €
        <button
          onClick={() => {
            setTotal(0);
            setColor("rgb(0,0,0)");
          }}
        >
          Clear cart
        </button>
      </p>

      <section className="recent-ads">
        {ads.map((el) => (
          <div key={el.id}>
            <AdCart
              id={el.id}
              picture={el.picture}
              price={el.price}
              title={el.title}
              categorie={el.categorie}
            />
            <button
              onClick={() => {
                setTotal(total + el.price);
                const blue = Math.floor(Math.random() * 256);
                const red = Math.floor(Math.random() * 256);
                const green = Math.floor(Math.random() * 256);
                setColor(`rgb(${red}, ${green}, ${blue})`);
              }}
            >
              Add to cart
            </button>
          </div>
        ))}
      </section>
    </>
  );
};

export default RecentAds;
