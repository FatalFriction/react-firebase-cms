import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { ordersColumns } from "../../datatablesource";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Box, Modal } from "@mui/material";
// import Editprod from "../../pages/edit_products/Editprod";
import { useDispatch } from "react-redux";
import { fetchorders } from "../../context/Redux/Orders/orders_actions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1150,
  height: 650,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Datatableorders = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    
    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "order"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          const data = doc.data();

          const timeStampss = data.timeStamp.toDate(); // Convert Firebase Timestamp to JavaScript Date object
          const formattedDate = timeStampss.toISOString().split('T')[0]; // Convert Date object to "yyyy-mm-dd" format
          
          list.push({ id: doc.id, ...doc.data(),timeStamp:formattedDate });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  console.log(data)

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "order", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleView = async (id) => {
    try {
      await dispatch(fetchorders(id));
      // Navigate to '/product/test' route using React Router
      navigate('/orders/' + id);
    } catch (err) {
      console.log(err);
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const actionColumn = [
    {
      field: "action",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div 
              className="viewButton" 
              onClick={()=> handleView(params.row.id)}>
                View
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
            {/* <div
              className="editButton"
              onClick={handleOpen}
            >
              Edit
            </div> */}
            <Modal
              keepMounted
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                {/* <Editprod id={params.row.id} inputs={productInputs} title={"Edit Product"} handleClose={handleClose}/> */}
              </Box>
            </Modal>
          </div>
        );
      },
    },
  ];
  
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Manage Orders
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={ordersColumns.concat(actionColumn)}
        autoPageSize={true}
        density="comfortable"
        pageSize={11}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatableorders;
