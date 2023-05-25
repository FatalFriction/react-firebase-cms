import "./table.scss";
import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, onSnapshot, where, doc } from "firebase/firestore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { db } from "../../firebase";
import TablePagination from "@mui/material/TablePagination";
import { useParams } from "react-router-dom";

const List = () => {
  const { ordersId } = useParams();
  const [realdata, setRealData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      const unsubscribe = onSnapshot(
        query(
          collection(db, "order"),
          orderBy("timeStamp", "desc"),
          limit(rowsPerPage)
        ),
        async (snapshot) => {
          const orders = [];
          snapshot.forEach((doc) => {
            if (ordersId === doc.id) {
              orders.push({ id: doc.id, ...doc.data() });
            }
          });
          setRealData(orders);
        }
      );
  
      return () => unsubscribe();
    };
  
    fetchData();
  }, [ordersId, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Customer</TableCell>
              <TableCell className="tableCell">Product</TableCell>
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
            {(rowsPerPage > 0
              ? realdata.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : realdata
            ).map((order) =>
              order.carts.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="tableCell">
                    {order.userName}
                  </TableCell>
                  <TableCell className="tableCell">
                    <div className="cellWrapper">
                      <img src={row.image} alt="" className="image" />
                      {row.name}
                    </div>
                  </TableCell>
                  <TableCell className="tableCell">{row.size}</TableCell>
                  <TableCell className="tableCell">
                    {row.quantity.toString()}
                  </TableCell>
                  <TableCell className="tableCell">
                    {row.startDate.toDate().toString()}
                  </TableCell>
                  <TableCell className="tableCell">
                    {row.endDate.toDate().toString()}
                  </TableCell>
                  <TableCell className="tableCell">
                    {row.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </TableCell>
                  <TableCell className="tableCell">
                    <span className={`status ${row.status}`}>
                      {row.availability}
                    </span>
                  </TableCell>
                  <TableCell className="tableCell">
                    {row.UsershipmentMethod}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[2, 5, 10]}
        count={realdata.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default List;
