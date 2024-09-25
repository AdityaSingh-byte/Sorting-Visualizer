import './App.css'
import NavBarStatful from './stateful/navbar/navbar'
import Footer from './stateless/footer/footer'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
function App() {


  return (
    <>
     <NavBarStatful/>
      <Footer/>
    </>
  )
}

export default App
