import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import { useEffect } from "react";

const Navbar = () => {
  
  const { dispatch } = useContext(DarkModeContext);
  
  const [userDisplayName, setUserDisplayName] = useState('');
  const [userPhotoUrl, setuserPhotoUrl] = useState('');

  useEffect(() => {
    // retrieve user data from local storage
    const user = JSON.parse(localStorage.getItem('credentials'));
    

    if (user) {
      //set user data in global state
      const { userDisplayName, userPhotoUrl } = user;
      setUserDisplayName(userDisplayName);
      setuserPhotoUrl(userPhotoUrl);
    } else {
      console.log("user not found here");
    }
  
    // add event listener to detect when the user is about to leave the website
    window.addEventListener('beforeunload', () => {
      localStorage.clear();
      console.log("this is cleanup from page")
    });

    // return a cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', () => {
        localStorage.clear();
        console.log("this is cleanup from components")
      });
    };
  }, []);
  
  
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon className="icon"/>
        </div>

        <div className="items">
        
          <div className="item">
              <p className="line-1 anim-typewriter">Hello, {userDisplayName}!</p>
          </div>

          <div className="item">
            <img
              src={userPhotoUrl}
              alt=""
              className="avatar"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />

          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
