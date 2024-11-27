import instImg from "../../assets/images/instagram-white (1).svg";

// Links
import { Link } from "react-router-dom";

const LogIn = () => {
  const inputCss =
    "bg-[rgb(18,18,18)] border border-slate-300 rounded-sm  px-[8px] pt-[9px] pb-[7px] m-1 text-xs";

  const divContainer =
    "border border-slate-500 flex flex-col items-center p-4  mb-4 ";

  return (
    <div className="width:">
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
          ></input>
          <input
            className={inputCss}
            type="password"
            placeholder="Password"
          ></input>

          <button
            type="submit"
            className="bg-[#0095f6] font-bold text-sm border-0 rounded-md mt-4 text-white py-2"
          >
            Log In
          </button>
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
