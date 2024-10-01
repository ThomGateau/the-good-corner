import { useState } from "react";
import AdCart, { AdCartProps } from "./AdCard";

const RecentAds = () => {
  const ads: AdCartProps[] = [
    {
      title: "Table",
      imgUrl: "/images/table.webp",
      price: 120,
      link: "/ads/table",
    },
    {
      title: "Dame-jeanne",
      imgUrl: "/images/dame-jeanne.webp",
      price: 75,
      link: "/ads/dame-jeanne",
    },
    {
      title: "Vide-poche",
      imgUrl: "/images/vide-poche.webp",
      price: 4,
      link: "/ads/vide-poche",
    },
    {
      title: "Vaisselier",
      imgUrl: "/images/vaisselier.webp",
      price: 900,
      link: "/ads/vaisselier",
    },
    {
      title: "Bougie",
      imgUrl: "/images/bougie.webp",
      price: 8,
      link: "/ads/bougie",
    },
    {
      title: "Porte-magazine",
      imgUrl: "/images/porte-magazine.webp",
      price: 45,
      link: "/ads/porte-magazine",
    },
  ];
  const [total, setTotal] = useState(0);
  const [color, setColor] = useState("rgb(100,100,100)");
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
          <div>
            <AdCart
              imgUrl={el.imgUrl}
              link={el.link}
              price={el.price}
              title={el.title}
              key={el.title}
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
