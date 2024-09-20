import { useState, useEffect } from "react";
import { getItem } from "../../services/items"; // Import getItems and editItem
import { useParams } from "react-router-dom";
import ItemEdit from "../../components/ItemEdit/ItemEdit";
import ProfileButton from "../../components/NavButtons/ProfileButton";
import LogoutButton from "../../components/NavButtons/LogoutButton";
import "./Item.css";

const Item = ({ setIsSignedIn }) => {
  const { locationId, itemId } = useParams();
  const [item, setItem] = useState(null); // State for the selected item
  const [showEditForm, setShowEditForm] = useState(false); // State to show/hide the edit form

  useEffect(() => {
    const fetchItem = async () => {
      const item = await getItem(locationId, itemId);
      setItem(item);
    };
    fetchItem();
  }, [locationId, itemId]);

  return (
    <div>
      {item ? (
        <div className="item-container">
          <div className="nav-buttons">
            <ProfileButton />
            <LogoutButton setIsSignedIn={setIsSignedIn} />
          </div>
          <h1>Displaying Item: {item.name}</h1>
          <h2>Item Details</h2>
          <p>Description: {item.description}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Storage Area: {item.storage_area}</p>

          {showEditForm && (
            <ItemEdit
              locationId={locationId}
              itemId={itemId}
              setItem={setItem}
              showEditForm={showEditForm}
              setShowEditForm={setShowEditForm}
            />
          )}
          <button onClick={() => setShowEditForm(!showEditForm)}>
            {showEditForm ? "Cancel" : "Edit Item"}
          </button>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default Item;
