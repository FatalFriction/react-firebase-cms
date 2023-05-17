import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { productsColumns } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Box, Modal } from "@mui/material";
import Editprod from "../../pages/edit_products/Editprod";
import { productInputs } from "../../formSource";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../context/Redux/Products/products_actions";

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

const Datatableprod = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    
    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "products"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleView = async (id) => {
    try {
      await dispatch(fetchProducts(id));
      // Navigate to '/product/test' route using React Router
      navigate('/products/' + id);
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
            <div
              className="editButton"
              onClick={handleOpen}
            >
              Edit
            </div>
            <Modal
              keepMounted
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Editprod id={params.row.id} inputs={productInputs} title={"Edit Product"} handleClose={handleClose}/>
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
        Manage Products
        <Link to="/products/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={productsColumns.concat(actionColumn)}
        autoPageSize={true}
        density="comfortable"
        pageSize={11}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatableprod;
