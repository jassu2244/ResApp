import { useState } from "react";
import { useParams } from "react-router-dom";
// import Shimmer from './Shimmer';
import useRestaurantMenu from "../utils/useRestaurantMenu";
import ShimmerMenu from "./ShimmerMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const dummy = "Dummy Data";

  const resInfo = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) return <ShimmerMenu />;

  // Try multiple possible locations for restaurant info (different API structures)
  const restaurantInfo = resInfo?.cards[2]?.card?.card?.info || resInfo?.cards[0]?.card?.card?.info || {};

  const { name, cuisines, costForTwoMessage, cloudinaryImageId, avgRating, sla } = restaurantInfo;

  const deliveryTime = sla?.deliveryTime;

  // Try multiple possible locations for menu categories
  const regularCards =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards ||
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards ||
    resInfo?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards ||
    [];

  const categories = regularCards.filter(
    (c) => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
  );

  // console.log(categories);

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name || "Restaurant Menu"}</h1>
      <p className="font-bold text-lg">
        {cuisines?.join(", ") || "Various cuisines"} - {costForTwoMessage || "₹350 for two"}
      </p>

      {/* categories accordions */}
      {categories.length > 0 ? (
        categories.map((category, index) => (
          // Controlled Component
          <RestaurantCategory
            key={category?.card?.card.title}
            data={category?.card?.card}
            showItems={index === showIndex ? true : false}
            setShowIndex={() => setShowIndex(showIndex === index ? null : index)}
            dummy={dummy}
          />
        ))
      ) : (
        <div className="my-8 p-4">
          <h2 className="text-lg text-gray-600">Menu categories not available</h2>
          <p className="text-sm text-gray-400 mt-2">The Swiggy API may be blocking requests. Please try again later.</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
