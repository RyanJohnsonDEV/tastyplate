import './Loading.css';

function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="loading-spinner__circle1"></div>
        <div className="loading-spinner__circle2"></div>
      </div>
    </div>
  );
}

export default Loading;
