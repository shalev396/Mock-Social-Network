import axios from "axios";
import { Link } from "react-router-dom";
import instImg from "../../assets/images/Screenshot 2024-11-28 at 16.06.49.jpg";

import { useSelector, useDispatch } from "react-redux";
import { setBirthday } from "../../Redux/userSlice.js";
import { useState } from "react";

const BirthDate = () => {
  const [isValidAge, setIsValidAge] = useState(true);
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);
  console.log("Current Redux State:", userState);
  const trySignUp = async (
    username,
    password,
    email,
    phoneNumber,
    birthday
  ) => {
    try {
      console.log(birthday, username);
      const { data } = await axios.post(
        "http://85.250.95.96:3006/api/users/signup",
        {
          username: username,
          password: password,
          email: email,
          phoneNumber: phoneNumber,
          birthday: birthday,
        }
      );
      console.log(data);
      return { data };
    } catch (error) {
      console.error("Log In failed, try again:", error);
      return null;
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    dispatch(setBirthday(selectedDate));

    const calculateAge = (birthDate) => {
      const today = new Date();
      const birthDateObj = new Date(birthDate);
      let age = today.getFullYear() - birthDateObj.getFullYear();
      const month = today.getMonth();
      const day = today.getDate();

      if (
        month < birthDateObj.getMonth() ||
        (month === birthDateObj.getMonth() && day < birthDateObj.getDate())
      ) {
        age--;
      }
      return age;
    };
    const userAge = calculateAge(selectedDate);
    setIsValidAge(userAge >= 13);
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
          <p className="text-center text-sm font-bold pb-4 text-white">
            Add Your Birthday
          </p>

          <p className="pt-4">
            This won't be a part of your public profile.
            <br />
            <span>
              <a
                className={links}
                href="https://help.instagram.com/366075557613433/?helpref=related_articles"
              >
                Why do I need to provide my birthday?
              </a>
            </span>
          </p>
          <input
            type="date"
            id="birthday"
            onChange={handleDateChange}
            className={inputCss}
            placeholder="DD/MM/YYYY"
            min="1900-01-01"
            max={new Date().toISOString().split("T")[0]}
          />
          <p>You need to enter the date you were born.</p>
          <br />
          <p>
            Use your own birthday, even if this account is for business, a pet
            or something else
          </p>
          <button
            onClick={() => {
              console.log(userState.birthday);
              trySignUp(
                userState.username,
                userState.password,
                userState.email,
                userState.phoneNumber,
                userState.birthday
              );
            }}
            className="bg-[#0095f6] font-bold text-sm border-0 rounded-md mt-4 text-white py-2"
          >
            Next
          </button>
          {!isValidAge && (
            <p className="text-red-500 text-xs">
              You must be 13 years or older to sign up.
            </p>
          )}
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

export default BirthDate;
