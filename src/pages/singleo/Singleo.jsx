import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/tableo/Table";
import { useSelector } from "react-redux";

const Singleo = () => {
  
  const orderData = useSelector(state => state.orders.orders);
  
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
                  src={orderData.userPhotoURL}
                  alt=""
                  className="itemImg"
                />
              <div className="details">
                <h1 className="itemTitle">{orderData.userName}</h1>
                <div className="detailItem">
                  <span className="itemKey">Client Email: </span>
                  <span className="itemValue">{orderData.useremail}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone Number: </span>
                  <span className="itemValue">{orderData.userPhonenumber}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Client Address: </span>
                  <span className="itemValue">{orderData.userAddress}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Order Created: </span>
                  <span className="itemValue">{orderData.timeStamp.toDate().toString()}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Total Purchase: </span>
                  <span className="itemValue">{orderData.totalCart.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="Customer Transaction Trend ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Orders Details</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default Singleo;
