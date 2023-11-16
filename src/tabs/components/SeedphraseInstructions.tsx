import { useNavigate } from "react-router-dom";

const SeedphraseInstructions = () => {
  const navigate = useNavigate();

  return (
    <div className="seedphrase-instructions">
      <h6 className="page-count">2/4</h6>
      <h1>Secure your Account</h1>
      <p>
        Before getting started, watch this short video to learn <br /> about
        your Secret Recovery Phrase and how to keep your account safe.
      </p>
      <div className="video-container">
        <iframe
          width="400"
          height="205"
          src="https://www.youtube.com/embed/-b1tQnOI-no"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="action-button">
        <button
          onClick={() => {
            navigate("/seed-generation");
          }}
          className="secure-my-wallet-btn"
        >
          Secure my Account
        </button>
      </div>
      <div className="info-section">
        <h3>What is a Secret Recovery Phrase?</h3>
        <p>
          Your Secret Recovery Phrase is a 12-word phrase that is the “master
          key” to your account and credentials
        </p>
        <h3>How do I save my Secret Recovery Phrase?</h3>
        <ul>
          <li>Save it in a password manager</li>
          <li>Store in a safe deposit box</li>
          <li>Write down and store in multiple secret places</li>
        </ul>
        <h3>Should I share my Secret Recovery Phrase?</h3>
        <p>
          Never, ever share your Secret Recovery Phrase, not even with osvauld!
        </p>
        <p className="warning-text">
          If someone asks for your recovery phrase they are likely <br />
          trying to scam you and steal your credentials.
        </p>
      </div>
    </div>
  );
};

export default SeedphraseInstructions;
