import { Link } from "react-router-dom";

export type AdCardProps = {
  id: number;
  title: string;
  picture: string;
  price: number;
  description?: string;
  createdAt?: string;
  owner?: string;
  location?: string;
  categorie: {
    id: number;
    name: string;
  };
};

const AdCart = ({ title, id, price, picture, categorie }: AdCardProps) => (
  <div className="ad-card-container">
    <Link className="ad-card-link" to={`/ad/${id}`}>
      <img className="ad-card-image" src={picture} />
      <div className="ad-card-text">
        <div className="ad-card-title">{title}</div>
        <div className="ad-card-price">{price} €</div>
        <div className="button button-primary">{categorie.name}</div>
      </div>
    </Link>
  </div>
);

export default AdCart;
