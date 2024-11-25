import instImg from "../../assets/images/instagram-white (1).svg";

// Links
import { Link } from "react-router-dom";

const SignIn = () => {
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
        <div className="w-64 flex flex-col text-sm ">
          <p className="text-center">
            Sign up to see photos and videos from your friends.
          </p>
          <input
            className={inputCss}
            type="text"
            placeholder="Mobile Number or Email"
          ></input>
          <input
            className={inputCss}
            type="password"
            placeholder="Password"
          ></input>
          <input
            className={inputCss}
            type="text"
            placeholder="Full Name"
          ></input>
          <input
            className={inputCss}
            type="text"
            placeholder="Username"
          ></input>
          <p className="text-center">
            People who use our service may have uploaded your contact
            information to Instagram.
            <span>
              <a href="https://www.facebook.com/help/instagram/261704639352628">
                Learn More
              </a>
            </span>
          </p>
          <p className="text-center">
            By signing up, you agree to our &nbsp;
            <span>
              <a
                className={links}
                href="https://help.instagram.com/581066165581870/?locale=en_US"
              >
                Terms,&nbsp;
              </a>
              <a
                className={links}
                href="https://www.facebook.com/privacy/policy"
              >
                Privacy Policy &nbsp;
              </a>
              and &nbsp;
              <a
                className={links}
                href="https://privacycenter.instagram.com/policies/cookies/"
              >
                Cookies Policy.
              </a>
            </span>
          </p>
          <button
            type="submit"
            className="bg-blue-500 font-bold px-4 border-0 rounded-md"
          >
            Sign Up
          </button>
        </div>
      </div>
      <div className={divContainer}>
        Have an account?
        <Link to="/">
          <button className="text-blue-500 font-bold">Log In</button>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
