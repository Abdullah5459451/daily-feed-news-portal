import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Article from "./pages/Article";

function App() {
  return (
    <div className="min-h-screen bg-paper font-body">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/article/:id" element={<Article />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
