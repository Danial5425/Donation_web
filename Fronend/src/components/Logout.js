import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Logout = ({ setIsUserSignedIn}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Axios.post("http://localhost:1000/auth/logout")
      .then((res) => {
        if (res.data.status) {
          setIsUserSignedIn(false);
          alert("Logged out successfully");
          navigate("/mainlogin"); // Redirect to login
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default Logout;
