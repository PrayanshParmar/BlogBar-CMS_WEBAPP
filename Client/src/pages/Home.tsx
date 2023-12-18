import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import TwoColLayout from "../components/TwoColLayout";
import bg from "../assets/Background-Image.svg";
import Loader from "../components/Loader";
import { TabTitle } from "../utils/TabTitle";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  TabTitle("BlogBar");

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const Auth: any = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUser(Auth.getAuth());
      } catch (error) {
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 550);
      }
    };

    fetchData();
  }, [setUser, Auth]);

  const unDownload: any = {
    pointerEvents: "none",
  };

  return (
    <>
      <div className="w-ful ">
        {loading ? (
          <Loader />
        ) : user ? (
          <>
            <NavBar />
            <TwoColLayout userTopic={true} />
          </>
        ) : (
          <>
            <div className=" relative top-0 left-0 ">
              <img
                style={unDownload}
                src={bg}
                alt="bg"
                className="w-full h-[600px] object-cover"
              />
              <NavBar />
              <div className="absolute top-[250px] left-2 sm:left-[166px] h-[340px] w-auto block text-white font-serif  ">
                <h2 className=" text-[45px] sm:text-6xl ">Stay Curious.</h2>
                <p className=" text-xl mt-3 break-words">
                  Discover stories, thinking, and expertise from writers on any
                  topic.
                </p>
                <div className=" mt-6">
                  <button
                    onClick={() => navigate("/login")}
                    className="h-12 w-32 text-white bg-transparent border-2  border-white hover:bg-white hover:text-[#9147d1]  hover:border-[#9147d1]"
                  >
                    <span>Start reading</span>
                  </button>
                </div>
              </div>
            </div>

            <TwoColLayout userTopic={false} />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
