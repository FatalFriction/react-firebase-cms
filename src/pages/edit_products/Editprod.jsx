import "./edit.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

const Editprod = ({ id, inputs, title, handleClose }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const productData = docSnap.data();
        setData(productData);
      } else {
        console.log("No such document!");
      }
      
    };
    
    fetchData();
  }, [id]);

  useEffect(() => {
    const uploadFile = () => {
      if (!file) {
        return;
      }
    
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
    
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          toast.info("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              toast.warning("Upload is paused");
              break;
            case "running":
              toast.info("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    uploadFile();
  }, [file]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.type === "checkbox" ? (e.target.checked ? "on" : "off"): e.target.value;

    setData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    
    try {
      // Check if any required fields are missing
      if (!e.target.checkValidity()) {
        // form is invalid
        return;
      }

      await updateDoc(doc(db, "products", id), {
        ...data,
      });
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleEdit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" type="button" />
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ opacity: 0 }}
                  required
                  accept="image/*"
                />
              </div>
              
              {inputs.map((input) => (
              <div className="formInput" key={input.id}>
                {input.id === 6 ? (
                  <label htmlFor={input.id}>
                    {input.label}
                    <input
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={handleInput}
                      required
                    />
                  </label>
                ) : input.type === "select" ? (
                  <>
                  <div className={input.id === 8 ? "single" : ""}>
                  <label htmlFor={input.id}>{input.label}</label>
                  <select 
                    id={input.id} 
                    onChange={handleInput}
                    required
                    >
                    <option value="">{input.placeholder}</option>
                      {input.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                    ))}
                  </select>
                  </div>
                  </>
                ) : input.type === "checkbox" ? (
                  <>
                    <label>{input.label}</label>
                    <input
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={handleInput}
                    />
                  </>
                ) : (
                  <>
                    <label>{input.label}</label>
                    <input
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={handleInput}
                      required
                    />
                  </>
                )}
              </div>
            ))}

              <button disabled={per !== null && per < 100} type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editprod;
