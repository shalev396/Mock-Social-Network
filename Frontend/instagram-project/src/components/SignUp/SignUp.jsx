import { useState } from "react";
import instImg from "../../assets/images/instagram-white (1).svg";

// Links
import { Link, Outlet } from "react-router-dom";

const SignUp = () => {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhNumber, setNewPhNumber] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");

  const handleEmailOfPhone = (e) => {
    const value = e.target.value;
    setEmailOrPhone(value);
    if (value.includes("@")) {
      setNewEmail(value);
    } else {
      setNewPhNumber(value);
    }
  };

  const saveToStorage = () => {
    sessionStorage.setItem("username", newUsername);
    sessionStorage.setItem("password", newPassword);
    sessionStorage.setItem("email", newEmail);
    sessionStorage.setItem("phone", newPhNumber);
    sessionStorage.setItem("emailOrPhone", emailOrPhone);
    console.log("Data saved to sessionStorage");
  };

  const inputCss =
    "bg-[rgb(18,18,18)] border border-slate-300 rounded-sm  px-[8px] pt-[9px] pb-[7px] m-1 text-xs";
  const links = "text-[#e0f1ff]";
  const divContainer =
    "border border-slate-500 flex flex-col items-center p-4 w-[425px]";

  return (
    <div className="flex flex-col items-center justify-center gap-4  h-screen">
      <div className={divContainer}>
        <img
          src={instImg}
          alt="instagram"
          className="inline-block w-[175px] h-[150px]"
        />
        <div className="w-64 flex flex-col text-sm text-xs text-[#a8a8a8] text-center">
          <p className="text-center text-sm font-bold pb-4">
            Sign up to see photos and videos from your friends.
          </p>
          <input
            className={inputCss}
            type="text"
            placeholder="Mobile Number or Email"
            value={emailOrPhone}
            onChange={handleEmailOfPhone}
          ></input>
          <input
            className={inputCss}
            type="password"
            placeholder="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          ></input>
          <p className="pt-4">
            People who use our service may have uploaded your contact
            information to Instagram.
            <span>
              <a
                className={links}
                href="https://www.facebook.com/help/instagram/261704639352628"
              >
                Learn More
              </a>
            </span>
          </p>
          <p className="pt-4">
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

          <Link to="birthdate">
            <button
              onClick={saveToStorage}
              type="submit"
              className="bg-[#0095f6] font-bold text-sm border-0 rounded-md mt-4 text-white py-2 w-[248px]"
            >
              Sign Up
            </button>
          </Link>
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

export default SignUp;
