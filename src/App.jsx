import './App.css'


// import PageContainer from './components/PageContainer';
import AppRouter from "./routers";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {

  return (
    <div className="container max-w-full">
      <AppRouter />
    </div>
  )
}

export default App
