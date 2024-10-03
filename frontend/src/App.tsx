import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import RecentAds from "./components/RecentAds";
import AboutPage from "./pages/AboutPage";
import AdDetailsPage from "./pages/AdDetailsPage";
import NewAdFormPage from "./pages/NewAdFormPage";
import NewCategoryFormPage from "./pages/NewCategoryFormPage";
import AdSearchPage from "./pages/AdSearchPage";
import AdFilterPage from "./pages/AdFilterPage";
import AdModificationPage from "./pages/AdModificationPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<RecentAds />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="/ad/search/:keyword" element={<AdSearchPage />} />
          <Route path="ad/filter/:name" element={<AdFilterPage />} />
          <Route path="ad/modify/:id" element={<AdModificationPage />} />
          <Route path="ad/new" element={<NewAdFormPage />} />
          <Route path="ad/:id" element={<AdDetailsPage />} />
          <Route path="categorie/new" element={<NewCategoryFormPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
