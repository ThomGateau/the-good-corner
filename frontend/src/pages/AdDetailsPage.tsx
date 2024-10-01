import { useParams } from "react-router-dom";

const AdDetailPage = () => {
  const { id } = useParams();
  return <p>Details of ad {id}</p>;
};
export default AdDetailPage;
