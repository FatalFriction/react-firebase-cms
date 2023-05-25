import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/tablep/Table";
import { useSelector } from "react-redux";

const Singlep = () => {
  
  const productData = useSelector(state => state.products.products);

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
                src={productData.img}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{productData.title}</h1>
                <div className="detailItem">
                  <span className="itemKey">Category: </span>
                  <span className="itemValue">{productData.category}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Brand: </span>
                  <span className="itemValue">{productData.brand}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Stock: </span>
                  <span className="itemValue">
                    {productData.availability}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Authentic: </span>
                  <span className="itemValue">
                    {productData.authenticity === "on" ? "Original" : "Fan Art"}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Sizes: </span>
                  <span className="itemValue">
                    {productData.size}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price: </span>
                  <span className="itemValue">{parseInt(productData.price).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="Product Trend ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <>
            <List/>
          </>
        </div>
      </div>
    </div>
  );
};

export default Singlep;
