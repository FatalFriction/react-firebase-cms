import { useContext, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, metaprovider, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext"
import { toast } from "react-toastify";
import { Button, ThemeProvider } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { createTheme } from "@mui/material";
import leaf_01 from "../../asset/leaf_01.png";
import leaf_02 from "../../asset/leaf_02.png";
import leaf_03 from "../../asset/leaf_03.png";
import leaf_04 from "../../asset/leaf_04.png";
import bg from "../../asset/bg.jpg";
import girl from "../../asset/girl.png";
import trees from "../../asset/trees.png";

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#fff',
      darker: '#fff',
    },
    neutral: {
      main: '#8f2c24',
      contrastText: '#fff',
    },
  },
});

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()
  const {dispatch} = useContext(AuthContext)

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const checkUid = (id) => {
    const uid = "X0z4xWSRqUco2O9UaPsYPN0HTit2";

    if(id === uid ) {
      return true;
    }
    else {
      return false;
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { user } = result;

      if (checkUid(user.uid) === true ) {
      const idTokenResult = await user.getIdTokenResult();

      const userData = {
        userEmailAddress: user.email,
        userDisplayName: user.displayName,
        userPhotoUrl: user.photoURL,
        token: idTokenResult.token,
      }

      dispatch({
        type: 'LOGIN',
        payload: userData,
      });
      
      // Store user data in local storage
      localStorage.setItem('credentials', JSON.stringify(userData));

      navigate('/');
    } else {
      toast("Please Contact Administrator to give you permissions");
    }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogle = async () => {
    
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      if (checkUid(user.uid) === true ) {

      // console.log("it is login page still",user)
      const idTokenResult = await user.getIdTokenResult();
      
      const userData = {
        userEmailAddress: user.email,
        userDisplayName: user.displayName,
        userPhotoUrl: user.photoURL,
        token: idTokenResult.token,
      }

      dispatch({
        type: 'LOGIN',
        payload: userData,
      });
      
      // Store user data in local storage
      localStorage.setItem('credentials', JSON.stringify(userData));

      navigate('/');
    } else {
      toast("Please Contact Administrator to give you permissions");
    } 
    } catch (error) {
      toast.error(error.message);
    }
    
  };
  
  const handleFacebook = async () => {
  
    try {
      const result = await signInWithPopup(auth, metaprovider);
      const { user } = result;
      
      if (checkUid(user.uid) === true ) {
      const idTokenResult = await user.getIdTokenResult();
      
      const userData = {
        userEmailAddress: user.email,
        userDisplayName: user.displayName,
        userPhotoUrl: user.photoURL,
        token: idTokenResult.token,
      }

      dispatch({
        type: 'LOGIN',
        payload: userData,
      });
      
      // Store user data in local storage
      localStorage.setItem('credentials', JSON.stringify(userData));

      navigate('/');
    } else {
      toast("Please Contact Administrator to give you permissions");
    }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section>
    <ThemeProvider theme={theme}>

      <div className="leaves">
        <div className="set">
          <div><img src={leaf_01} alt=""/></div>
          <div><img src={leaf_02} alt=""/></div>
          <div><img src={leaf_03} alt=""/></div>
          <div><img src={leaf_04} alt=""/></div>
          <div><img src={leaf_01} alt=""/></div>
          <div><img src={leaf_02} alt=""/></div>
          <div><img src={leaf_03} alt=""/></div>
          <div><img src={leaf_04} alt=""/></div>
        </div>
      </div>
      <img src={bg} className="bg" alt="bg"/>
      <img src={girl} className="girl" alt="girl"/>

      <div className="login">
        <h2 className="signin">Sign In</h2>
        <form onSubmit={handleLogin}>

        <div className="inputBox">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div className="inputBox">
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <div className="hide-show">
          {isPasswordVisible ? (
            <VisibilityOffIcon onClick={togglePasswordVisibility} />
            ) : (
            <VisibilityIcon onClick={togglePasswordVisibility} />
            )}
          </div>
        </div>

        <div className="inputBox">
          <input type="submit" id="btn" value={"Login"}/>
        </div>

        </form>
        
          <Button color="neutral" className="Button" variant="contained" onClick={handleGoogle} size="large">
                <GoogleIcon color="primary" size={25}/><span className="text">Sign In With Google</span>
          </Button>
      
          <br />

          <Button color="neutral" className="Button" variant="contained" onClick={handleFacebook} size="large">
                <FacebookIcon color="primary" size={25}/> <span className="text">Sign In With Facebook</span>
          </Button>

      </div>
      
      <img src={trees} className="trees" alt="trees"/>

      </ThemeProvider>
    </section>
  );
};

export default Login;
