import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/tableu/Table";
import { useSelector } from "react-redux";

const Single = () => {
  const userData = useSelector(state => state.users.users);
  
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={userData.img}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{userData.displayName}</h1>
                <div className="detailItem">
                  <span className="itemKey">Sign in Provider: </span>
                  <span className="itemValue">{userData.SignInprovider}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email: </span>
                  <span className="itemValue">{userData.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone Number: </span>
                  <span className="itemValue">{userData.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address: </span>
                  <span className="itemValue">{userData.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country: </span>
                  <span className="itemValue">
                    {userData.country}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">User Registered at: </span>
                  <span className="itemValue">
                    {userData.timeStamp?.toDate().toString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default Single;
