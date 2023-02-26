import "./MainFeed.css";
import UploadBar from "../UserUpload/UploadBar";
import NewsApi from "./NewsApi";
import axios from "axios";
import { useEffect, useState } from "react";
import Friends from "./Friends";

function Home(props) {
  const [apiData, setapiData] = useState("");

  useEffect(() => {
    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((res) => setapiData(res.data));
  }, []);

  console.log(apiData);

  return (
    <>
      <div className="tile-container">
        {/* Main Feed is Starts From Here  */}
        <div className="tile-1">
          <UploadBar theme={props.theme} />

          {/* Box For main Feed  */}
          <div className={`box ${props.theme}`}>
            <div className={`box-header ${props.theme}`}>
              <figure>
                <img src={apiData.message} alt="avatar" />
              </figure>
              <p>Dillon Nair</p>
              <i className="bi bi-three-dots"></i>
            </div>
            <div className={`box-content ${props.theme}`}>
              <img src={apiData.message} alt="avatar" />
            </div>
            <div className={`box-footer ${props.theme}`}>
              <i className="bi bi-chat-right"></i>
              <i className="bi bi-heart"></i>
              <i className="bi bi-send"></i>
            </div>
          </div>

          {/* Box Being Repeated  */}
          <div className={`box ${props.theme}`}>
            <div className={`box-header ${props.theme}`}>
              <figure>
                <img src={apiData.message} alt="avatar" />
              </figure>
              <p>Dillon Nair</p>
              <i className="bi bi-three-dots"></i>
            </div>
            <div className={`box-content ${props.theme}`}>
              <img src={apiData.message} alt="avatar" />
            </div>
            <div className={`box-footer ${props.theme}`}>
              <i className="bi bi-chat-right"></i>
              <i className="bi bi-heart"></i>
              <i className="bi bi-send"></i>
            </div>
          </div>
        </div>

        {/* Side Box For News and Api Related Work  */}

        <div className="tile-2">
          <NewsApi theme={props.theme} />
          <Friends message={apiData.message}></Friends>
        </div>
      </div>
    </>
  );
}

export default Home;
