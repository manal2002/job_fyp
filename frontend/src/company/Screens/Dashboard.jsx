import React from "react";
import VerticalTabs from "../Components/VerticalTabs";
import PrimarySearchAppBar from "../../Components/Header/Header";

function Dashboard() {
  return (
    <div>
      <header>{/* <PrimarySearchAppBar /> */}</header>
      <main className="mt-5">
        <div style={{ top: "0px", position: "absolute" }}>
          <VerticalTabs />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
