import { Component } from "react";
import User from "./User";
// import User from './User';
import UserClass from "./UserClass";
import React from "react";

class About extends React.Component {
  constructor(props) {
    super(props);
    console.log("Parent Constructor");
    // console.log('Parent Constructor');
  }
  componentDidMount() {
    // it is used to make API Calls
    console.log("Parent Component Did Mount");
    // console.log('Parent Component Did Mount');
  }
  render() {
    console.log("Parent Render");
    // console.log('Parent Render');
    return (
      <div className="about-page min-h-[60vh] flex justify-center px-4 py-10">
        <div className="w-full max-w-2xl rounded-2xl bg-white shadow-lg ring-1 ring-black/5 p-6 md:p-8">
          <h1 className="text-3xl font-bold tracking-tight">About Us</h1>
          <h2 className="mt-2 text-gray-600">This is about section of namaste react</h2>
          {/* <h1>About Class Component</h1>
        <h2>This is About Page</h2> */}
          <div className="mt-6">
            <UserClass name={"Jasmeet (class)"} location={"Ghaziabad class"} />
          </div>
          {/* <UserClass name={'Second'} location={'Badvel class'} /> */}
          {/* <UserClass name={'Third'} location={'Badvel class'} /> */}
        </div>
      </div>
    );
  }
}

export default About;

// * RENDER CYCLE OF CLASS BASED COMPONENTS WHEN THE CLASS HAS TWO CHLIDREN

/* 
*  - Parent Constructor()              -- Render Phase
*  - Parent Render()

*    - First Child Constructor()
*    - First Child Render()
*                                      -- Render Phase
*    - Second Child Constructor()
*    - Second Child Render()

*     <DOM UPDATED - IN SINGLE BATCH> -> Optimizes the Performance of App  -- Commit Phase
*    - First Child ComponentDidMount()
*    - Second Child ComponentDidMount()

*  - Parent ComponentDidMount()=
*/

// const About = () => {
//   return (
//     <div>
//       <h1>About Us</h1>
//       <h2>This is About Page</h2>
//       <UserClass name={'Vasu (class)'} location={'Badvel class'} />
//     </div>
//   );
// };
