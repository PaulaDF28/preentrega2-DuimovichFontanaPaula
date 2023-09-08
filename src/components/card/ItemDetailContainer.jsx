import { useParams } from "react-router-dom";
import data from "../../api/data.json";
import { useEffect, useState } from "react";

function ItemDetailContainer() {
  const [producto, setProducto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const productoById = data.find(
          (producto) => producto.id === parseInt(id)
        );
        resolve(productoById);
      }, 2000);
    });

    promise
      .then((data) => {
        setProducto(data);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="details">
      <div className="details-image">
        <img src={producto.image} alt={producto.name} />
      </div>

      <div className="details-info">
        <h4>Descripción</h4>
        <p>{producto.descriptionDetails}</p>
        <h4>Categoría</h4>
        <p>{producto.categorys}</p>
      </div>
    </div>
  );
}

export default ItemDetailContainer;
