import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import TextForm from "./Components/TextForm";
import About from "./Components/About";
import { Routes, Route, useLocation } from "react-router-dom";
import PageNotFound from "./Components/PageNotFound";

function App() {

  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('gray');
      document.body.style.backgroundColor = "#171a20";
    } else {
      setMode('light');
      document.body.style.backgroundColor = "white";
    }
  };

  const location = useLocation();
  console.log(location);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const validRoutes = ["/", "/about"];
    setIsNotFound(!validRoutes.includes(location.pathname));
  }, [location.pathname]);


  return (
    <>

      {!isNotFound && <Navbar title="TextifyIt" aboutText="About" mode={mode} toggleMode={toggleMode} />}

      <Routes>
        <Route path="/" element={<TextForm heading="Enter the Text to analyze" mode={mode} />} />
        <Route path="/about" element={<About mode={mode} />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
