import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Modal({ imageModalUrl, setimageModalUrl }) {
  return (
    <div className="my-modal">
      <div className="img-container">
        <label>
          <button
            onClick={() => setimageModalUrl(null)}
            style={{ display: "none" }}
          ></button>
          <div className="icon-container">
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </label>
        <img src={imageModalUrl} alt="modal" />
      </div>
    </div>
  );
}
