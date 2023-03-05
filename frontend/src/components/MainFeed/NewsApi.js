import React from "react";
import "./MainFeed.css";
import axios from "axios";
import { useEffect, useState } from "react";

function NewsApi(props) {
  const [apidata, setapiData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios
      .get(
        "https://api.nytimes.com/svc/topstories/v2/world.json?api-key=MbAGWpZtPD4vOmTpoFwONWeEbTLVlWmP"
      )
      .then((res) => setapiData(res.data.results));
  }, []);

  useEffect(() => {
    const lastIndex = apidata.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, apidata]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);
  return (
    <div className="tile-2-child">
      <div className={`side-box ${props.theme}`}>
        <div className={`sb-header ${props.theme}`}>
          <p className={`sb-head ${props.theme}`}>
            {" "}
            <i
              className="bi bi-chevron-double-left"
              onClick={() => {
                setIndex(index - 1);
              }}
            ></i>
            # News Headlines
            <i
              className="bi bi-chevron-double-right"
              onClick={() => {
                setIndex(index + 1);
              }}
            ></i>
          </p>
        </div>

        <div className="sb-content">
          {apidata.map((a, indexNews) => {
            const { multimedia, title, published_date, created_date, url } = a;
            let position = "nextSlide";
            if (indexNews === index) {
              position = "activeSlide";
            }
            if (indexNews === index - 1) {
              position = "lastSlide";
            }

            return (
              <article className={position} key={indexNews}>
                <div className="image-container">
                  <img
                    src={
                      multimedia === null ? (
                        <h1>Image not availavle</h1>
                      ) : (
                        multimedia[1].url
                      )
                    }
                    alt=" Image not Available for this News"
                  />
                </div>
                <div className="title">
                  <p className="title-head">
                    {title == ""
                      ? "Get Realtime Updated News from all Around the World. ~ New York Times "
                      : title}
                  </p>
                  <p className="time">
                    {published_date == ""
                      ? "Date Not Availabe"
                      : published_date}
                  </p>
                  <a
                    href={url == "" ? "404" : url}
                    target="_blank"
                    className="title-body"
                  >
                    read more...
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NewsApi;
