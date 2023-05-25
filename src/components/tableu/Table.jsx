import "./table.scss";
import { useEffect } from "react";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
import { useState } from "react";

const List = () => {

  const { userId } = useParams();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const unsubscribe = onSnapshot(
        query(
          collection(db, "order"),
          orderBy("timeStamp", "desc"),
          limit(200)
        ),
        (snapshot) => {
          snapshot.forEach((doc) => {
            const order = doc.data();
            if (order.userid === userId) {
              setOrderData({ id: doc.id, ...order });
            }
          });
        }
      );

      return () => unsubscribe();
    };
    fetchData();
  }, [userId]);

  if (!orderData || !orderData.carts) {
    return <><div>It might be Loading... or this user has not make any transactions</div></>; // or any loading state component/message
  }

  return (
    <>
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Product ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Size</TableCell>
            <TableCell className="tableCell">Quantity</TableCell>
            <TableCell className="tableCell">Price</TableCell>
            <TableCell className="tableCell">Start Date</TableCell>
            <TableCell className="tableCell">End Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Status</TableCell>
            <TableCell className="tableCell">Shipment Method</TableCell>
          </TableRow>
        </TableHead>
        <TableBody><>
          {orderData.carts.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.image} alt="" className="image" />
                  {row.name}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.size}</TableCell>
              <TableCell className="tableCell">{row.quantity.toString()}</TableCell>
              <TableCell className="tableCell">{row.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
              <TableCell className="tableCell">{row.startDate.toDate().toString()}</TableCell>
              <TableCell className="tableCell">{row.endDate.toDate().toString()}</TableCell>
              <TableCell className="tableCell">{row.subtotal.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.availability}</span>
              </TableCell>
              <TableCell className="tableCell">{row.UsershipmentMethod}</TableCell>
            </TableRow>
          ))}</>
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default List;
