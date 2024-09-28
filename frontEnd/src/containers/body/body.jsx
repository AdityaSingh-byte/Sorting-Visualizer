import "../../styling/body.css";
function Body({ text }) {
  return (
    <div className="main-section">
      <div className="text">{text}</div>
    </div>
  );
}
export default Body;
