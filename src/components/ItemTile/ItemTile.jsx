import { Link } from "react-router-dom";
function ItemTile({locationId, item}) {
  return (
    <Link to={`/locations/${locationId}/items/${item.id}`}>
      <li>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <p>Quantity: {item.quantity}</p>
        <p>Storage Area: {item.storage_area}</p>
      </li>
    </Link>
  );
}

export default ItemTile;
