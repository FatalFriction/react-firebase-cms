import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../context/Redux/Users/users_actions";

const Datatable = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          const data = doc.data();
          const timeStamp = data.timeStamp.toDate(); // Convert Firebase Timestamp to JavaScript Date object
          const formattedDate = timeStamp.toISOString().split('T')[0]; // Convert Date object to "yyyy-mm-dd" format
          list.push({ id: doc.id, ...data, timeStamp: formattedDate });
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
      await deleteDoc(doc(db, "users", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleView = async (id) => {
    try {
      await dispatch(fetchUsers(id));
      // Navigate to '/product/test' route using React Router
      navigate('/users/' + id);
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
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

          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Manage User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        autoPageSize={true}
        density='comfortable'
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
