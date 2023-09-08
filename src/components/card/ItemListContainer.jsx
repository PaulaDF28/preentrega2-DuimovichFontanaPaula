import { useEffect, useState } from "react";
import Card from "./Card";
import { useParams } from "react-router-dom";

import data from "../../api/data.json";

function ItemListContainer() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(data), 2000);
    });

    promise
      .then((data) => {
        if (!category) {
          setItems(data);
        } else {
          const productosFiltrados = data.filter(
            (producto) => producto.categorys === category
          );

          setItems(productosFiltrados);
        }
      })
      .finally(() => setIsLoading(false));
  }, [category]);

  if (isLoading) return <div>Cargando...</div>;

  return (
    <section className="card-catalog">
      <h2>Lista de productos</h2>

      {items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </section>
  );
}

export default ItemListContainer;
