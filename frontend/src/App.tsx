import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import RecentAds from "./components/RecentAds";
import AboutPage from "./pages/AboutPage";
import AdDetailsPage from "./pages/AdDetailsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<RecentAds />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="ad/:id" element={<AdDetailsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
