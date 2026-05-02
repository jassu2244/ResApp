import { useEffect, useState, useContext } from "react";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  // * React Hook -> A normal JavaScript function which is given to us by React (or) Normal JS utility functions
  // * useState() - Super Powerful variable
  // * useEffect() -

  // * State Variable - Super Powerful variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  // * Whenever a state variable updates or changes, react triggers a reconciliation cycle(re-renders the component)
  console.log("Body Rendered", listOfRestaurants);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch("/api/restaurants");

    const json = await data.json();

    // console.log(json);
    // * optional chaining
    // Your API structure
    const restaurants = json?.data?.cards?.filter(
      (card) => card?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.Restaurant",
    );
    setListOfRestaurants(restaurants);
    setFilteredRestaurant(restaurants);
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1 style={{ textAlign: "center", marginTop: "100px" }}>
        Looks like you're offline! Please check your internet connection
      </h1>
    );

  const { loggedInUser, setUserName } = useContext(UserContext);

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      {/* <div className="search-container">
        <input type="text" placeholder="Search Food or Restaurant" />
        <button>Search</button>
      </div> */}
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input
            type="text"
            placeholder="Search a Restaurant"
            className="searchBox border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-lg"
            onClick={() => {
              // * Filter the restaurant cards and update the UI
              // * searchText
              console.log(searchText);

              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.card.card.info.name.toLowerCase().includes(searchText.toLowerCase()),
              );

              setFilteredRestaurant(filteredRestaurant);
            }}>
            Search
          </button>
        </div>
        <div className="search m-4 p-4 flex items-center">
          <button
            className="px-4 py-2 bg-gray-100 m-4 rounded-lg"
            onClick={() => {
              // * Filter logic
              const filteredList = listOfRestaurants.filter((res) => res.card.card.info.avgRating > 4);

              setFilteredRestaurant(filteredList);
              console.log(filteredList);
            }}>
            Top Rated Restaurants
          </button>
        </div>
        <div className="search m-4 p-4 flex items-center">
          <label htmlFor="name">User Name: </label>
          <input
            id="name"
            className="border border-black p-2"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-center flex-wrap">
        {/* // * looping through the <RestaurentCard /> components Using Array.map() method */}

        {filteredRestaurant.map((restaurant) => (
          <Link
            style={{
              textDecoration: "none",
              color: "#000",
            }}
            key={restaurant.card.card.info.id}
            to={"/restaurants/" + restaurant.card.card.info.id}>
            {restaurant.card.card.info.promoted ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
