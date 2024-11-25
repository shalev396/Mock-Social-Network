import instImg from "../../assets/images/instagram-white (1).svg";

// Links
import { Link } from "react-router-dom";

const LogIn = () => {
  const inputCss =
    "bg-[rgb(18,18,18)] border border-slate-300 rounded-sm  px-[8px] pt-[9px] pb-[7px] m-1 ";
  const links = "text-blue-500 hover:text-blue-700";
  const divContainer =
    "border border-slate-500 flex flex-col items-center p-4 ";

  return (
    <div>
      <div className={divContainer}>
        <img
          src={instImg}
          alt="instagram"
          className="inline-block w-[175px] h-[150px]"
        />
        <input
          className={inputCss}
          type="text"
          placeholder="Phone Number, Username or Email"
        ></input>
        <input
          className={inputCss}
          type="password"
          placeholder="Password"
        ></input>
        <button
          type="submit"
          className="bg-blue-500 font-bold px-4 border-0 rounded-md"
        >
          Log In
        </button>
      </div>
      <div className={divContainer}>
        Don't have an account?
        <Link to="/signup">
          <button className="text-blue-500 font-bold">Sign up</button>
        </Link>
      </div>
    </div>
  );
};

export default LogIn;
