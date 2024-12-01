import { Link } from "react-router-dom";
import instImg from "../../assets/images/Screenshot 2024-11-28 at 16.06.49.jpg";
const BirthDate = () => {
  //   const CreateUser = async (
  //     username,
  //     password,
  //     email,
  //     fullName,
  //     phoneNumber
  //   ) => {
  //     try {
  //       const { data } = await axios.post(
  //         "http://85.250.87.24:3006/api/users/login",
  //         {
  //           username: username,
  //           password: password,
  //         }
  //       );
  //       console.log(data);
  //       return { data };
  //     } catch (error) {
  //       setWrongPassword(true);
  //       // console.error("Log In failed, try again:", error);
  //       return null;
  //     }
  //   };

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
          <p>You need to enter the date you were</p>
          <p>
            Use your own birthday, even if this account s for business, a pet or
            something else
          </p>

          <button
            type="submit"
            className="bg-[#0095f6] font-bold text-sm border-0 rounded-md mt-4 text-white py-2"
          >
            Next
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

export default BirthDate;
