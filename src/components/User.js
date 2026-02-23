import { useEffect, useState } from "react";

const User = ({ name, location }) => {
  const [count, setCount] = useState(0);
  const [count2] = useState(2);

  useEffect(() => {
    //API Calls
  }, []);
  return (
    <div className="user-card m-4 p-4 bg-gray-50 rounded-lg shadow-md">
      <h1>Count = {count}</h1>
      <h1>Count2 = {count2}</h1>
      <h2>Name: {name}</h2>
      <h2>Location: {location}</h2>
      <h2>Contact: @jassu2244</h2>
    </div>
  );
};

export default User;
