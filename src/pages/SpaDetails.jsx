import { useParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";

function SpaDetails() {
  let { id } = useParams();

  return (
    <div className="page">
      <h1>Detalles del Spa {id}</h1>
      <p>Descripción y características del spa.</p>
      <BookingForm />
    </div>
  );
}

export default SpaDetails;
