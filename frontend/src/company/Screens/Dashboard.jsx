import React from "react";
import VerticalTabs from "../Components/VerticalTabs";
import NavbarRc from "../Components/NavbarRc";
import PrimarySearchAppBar from "../../Components/Header/Header";

function Dashboard() {

  const verticalTabsStyles = {
    // Add your styles here
    width: "100%",
    backgroundColor: "#ffffff", // White background color
    borderRight: "1px solid #ccc",
    padding: "1rem",
    overflowY: "auto", // Make the container scrollable
   // maxHeight: "calc(100vh - 100px)", // Adjust as needed
  };

  return (
    <div>
      <NavbarRc/>
      {/* <main className="mt-5">
        <div style={{ top: "0px", position: "relative", marginRight: "15px" }}>
          <VerticalTabs />
        </div>
      </main> */}
      <main style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-start", alignItems: "center", overflowY: "auto", width:"100%" }}>
  <div style={{ marginRight: "0px" }}>
    <VerticalTabs style={verticalTabsStyles} />
  </div>
</main>

    </div>
  );
}

export default Dashboard;
