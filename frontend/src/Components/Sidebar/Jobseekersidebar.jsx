// import React from 'react';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import SearchIcon from '@mui/icons-material/Search';
// import WorkIcon from '@mui/icons-material/Work';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import '../../Screens/AllJob.css';

// const JobSeekerSidebar = ({ userData }) => { // Receive userData as props
//   return (
//     <div className="sidebarjobseeker">
//       <div className="menu-item">
//         <Link to={`/profile/${userData._id}`} className="menu-link"> {/* Use userData to construct profile link */}
//           <AccountCircleIcon className="menu-icon" />
//           Profile
//         </Link>
//       </div>
//       <div className="menu-item">
//         <Link to="/alljobs" className="menu-link"> {/* Add Link and href */}
//           <SearchIcon className="menu-icon" />
//           Explore Jobs
//         </Link>
//       </div>
//       <div className="menu-item">
//         <Link to="/myjobs" className="menu-link"> {/* Add Link and href */}
//           <WorkIcon className="menu-icon" />
//           Applied Jobs
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default JobSeekerSidebar;


import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import WorkIcon from '@mui/icons-material/Work';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../../Screens/AllJob.css';

const JobSeekerSidebar = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDataFromStorage = JSON.parse(localStorage.getItem("userData"));
    setUserData(userDataFromStorage);
  }, []);

  return (
    <div className="sidebarjobseeker">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {userData && (
        <div className="menu-item">
          <Link to={`/profile/${userData._id}`} className="menu-link">
            <AccountCircleIcon className="menu-icon" />
            Profile
          </Link>
        </div>
      )}
      <div className="menu-item">
        <Link to="/alljobs" className="menu-link">
          <SearchIcon className="menu-icon" />
          Explore Jobs
        </Link>
      </div>
      <div className="menu-item">
        <Link to="/myjobs" className="menu-link">
          <WorkIcon className="menu-icon" />
          Applied Jobs
        </Link>
      </div>
    </div>
  );
};

export default JobSeekerSidebar;
