import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../Redux/authSlice";
import instImg from "../../assets/images/instagram-white (1).svg";
import { Link } from "react-router-dom";

const LogIn = () => {
  const baseUrl = useSelector((state) => state.url.url);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tryLogIn = async (username, password) => {
    try {
      const { data } = await axios.post(`${baseUrl}/api/users/login`, {
        username,
        password,
      });

      // Store token and user in sessionStorage
      sessionStorage.setItem("authToken", data.token);
      // sessionStorage.setItem("user", JSON.stringify(data.user)); // Convert user object to JSON string

      // Save user data to Redux
      dispatch(login({ token: data.token, user: data.user }));

      console.log("Login successful:", data);

      // Navigate to homepage
      navigate("/homepage");
    } catch (error) {
      setWrongPassword(true);
      console.error("Login failed:", error);
    }
  };

  const isValidLogIn = username.trim() && password.trim();

  const inputCss =
    "bg-[rgb(18,18,18)] border border-slate-300 rounded-sm  px-[8px] pt-[9px] pb-[7px] m-1 text-xs";

  const divContainer =
    "border border-slate-500 flex flex-col items-center p-4 w-[425px]";

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-screen">
      <div className={divContainer}>
        <img
          src={instImg}
          alt="instagram"
          className="inline-block w-[175px] h-[150px]"
        />
        <div className="w-64 flex flex-col text-sm text-xs text-[#a8a8a8] text-center">
          <input
            className={inputCss}
            type="text"
            placeholder="Phone number, username or email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={inputCss}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            disabled={!isValidLogIn}
            onClick={() => tryLogIn(username, password)}
            className={`font-bold text-sm border-0 rounded-md mt-4 text-white py-2 w-[248px]  ${
              isValidLogIn ? "bg-[#0095f6]" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Log In
          </button>

          {wrongPassword && (
            <p className="text-red-500 m-4">
              Sorry, one or more of your details are incorrect. Please try again
            </p>
          )}
        </div>
      </div>
      <div className={divContainer}>
        Don't have an account?
        <Link to="/signup">
          <button className="text-blue-500 font-bold">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default LogIn;
