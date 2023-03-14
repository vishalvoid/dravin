import React, { useState, useRef, useEffect } from "react";
import { createNewPost } from "../../actions/postAction";
import "./UploadBar.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

export default function UploadBar(props) {
  const [image, setimage] = useState(null);
  const [caption, setcaption] = useState("");

  const { loading, error, message } = useSelector((state) => state.like);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();

  const handleImageChange = async (e) => {
    const file = await e.target.files[0];

    const Reader = new FileReader();

    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setimage(Reader.result);
      }
    };
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message, alert]);

  const myRefname = useRef(null);
  const handleClick = () => {
    myRefname.current.click();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNewPost(caption, image));
  };

  return (
    <>
      <div className={`mainUB ${props.theme}`}>
        <div className="UB">
          <figure className="userImg">
            <img src={user.avatar.url} alt="avatar" />
          </figure>
        </div>
        <form onSubmit={submitHandler}>
          <div className="col-3">
            <input
              className="effect-1"
              type="text"
              placeholder="what&#39;s happening?"
              size={50}
              value={caption}
              onChange={(e) => setcaption(e.target.value)}
            />
            <span className="focus-border"></span>
          </div>
          <div className="post-area">
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
              ref={myRefname}
            />
            <i onClick={handleClick} class="bi bi-images"></i>

            <button disabled={loading} id="post-button">
              Post
            </button>
          </div>
        </form>
      </div>
      {image && (
        <div className="imagepreview">
          <marquee className="preview__text">This is a Preview Image </marquee>
          <img src={image} alt="" />
        </div>
      )}
    </>
  );
}
