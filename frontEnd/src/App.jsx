import "./App.css";
import NavBarStatful from "./stateful/navbar/navbar";
import Footer from "./stateless/footer/footer";
import BodyStateful from "../src/stateful/body/bodyStateful";
import CodeSnippet from "./common/snippets/bodySnippet/bodyCodeSnippet";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
function App() {
  return (
    <>
    <div >
    <NavBarStatful />
      <BodyStateful />
      <CodeSnippet/>
      <Footer />
    </div>

    </>
  );
}

export default App;
