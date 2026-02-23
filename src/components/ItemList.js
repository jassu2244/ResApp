import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";

const ItemList = ({ items, dummy }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    // Dispatch an action
    dispatch(addItem(item)); // whatever data is passing here, it creates an object out of it, it creates a payload out of it and then add data whatever added here like "pizza" and then it takes this object and passes it as second object over there(cartSlice.js file)
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={item.card.info.id + "_" + index} className="p-2 m-2 border-b-2 text-left flex justify-between">
          <div className="w-9/12">
            <div className="py-2">
              <span>{item.card.info.name}</span>
              <span>- ₹{item.card.info.price ? item.card.info.price / 100 : item.card.info.defaultPrice / 100}</span>
            </div>
            <p className="text-xs">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 p-4">
            <div className="absolute">
              <button
                className="p-2 ml-6 mt-17.5 rounded-lg bg-black text-white shadow-lg hover:bg-white  hover:text-black transition-all duration-300 cursor-pointer"
                onClick={() => handleAddItem(item)}>
                Add +
                {/* onClick={handleAddItem(item)} this means calling the function right away, but we need to pass a callback function */}
              </button>
            </div>
            <img src={CDN_URL + item.card.info.imageId} alt={item.card.info.name} className="w-full rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
