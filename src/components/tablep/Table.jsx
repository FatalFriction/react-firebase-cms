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
import { useState } from "react";
import { useParams } from "react-router-dom";

const List = () => {

  const { productId } = useParams();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const unsubscribe = onSnapshot(
        query(
          collection(db, "order"),
          orderBy("timeStamp", "desc"),
          limit(200)
        ),
        async (snapshot) => {
          const data = [];
          snapshot.forEach((doc) => {
            const product = doc.data();
            const carts = product.carts;
  
            const filteredCarts = carts.filter((cart) => {
              return cart.id === productId;
            });
            const items = filteredCarts.map((cart) => ({
              ...cart,
              username: product.userName,
              docid: doc.id,
            }));
  
            data.push(...items);
          });
  
          setProductData(data);
        }
      );
  
      return () => unsubscribe();
    };
  
    fetchData();
  }, [productId]);

  if (!productData) {
    return <><div>It might be Loading... or this product does not have any transactions</div></>; // or any loading state component/message
  }

  return (
    <>
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Size</TableCell>
            <TableCell className="tableCell">Quantity</TableCell>
            <TableCell className="tableCell">Start Date</TableCell>
            <TableCell className="tableCell">End Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Status</TableCell>
            <TableCell className="tableCell">Shipment Method</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <>
          {productData.map((row) => (
            <TableRow key={row.docid}>
            <TableCell className="tableCell">{row.username}</TableCell>
              <TableCell className="tableCell">{row.size}</TableCell>
              <TableCell className="tableCell">{row.quantity.toString()}</TableCell>
              <TableCell className="tableCell">{row.startDate.toDate().toString()}</TableCell>
              <TableCell className="tableCell">{row.endDate.toDate().toString()}</TableCell>
              <TableCell className="tableCell">{row.subtotal.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.availability}</span>
              </TableCell>
              <TableCell className="tableCell">{row.UsershipmentMethod}</TableCell>
            </TableRow>
          ))}
          </>
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default List;
