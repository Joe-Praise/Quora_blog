import React from "react";
import Description from "./Description";
import Activities from "./Activities";
const Dashboard = (props) => {
  return (
 <div className={props.className}>
    <Description onCurrentProfile ={props.onCurrentProfile} />
    <Activities onCurrentProfile ={props.onCurrentProfile}/>
 </div>
  );
};

export default Dashboard;
