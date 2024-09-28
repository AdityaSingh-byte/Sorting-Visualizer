import "./App.css";
import NavBarStateful from "./containers/navbar/navbar";
import Footer from "./containers/footer/footer";
import BodyStateful from "./containers/body/bodyStateful";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
function App() {
  return (
    <>
    <div >
    <NavBarStateful />
      <BodyStateful />
      <Footer />

    </div>

    </>
  );
}

export default App;
