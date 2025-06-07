import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Login } from "../pages/auth/Login";
import { ProtectedAuth } from "./ProtectedAuth";

// Import Pages
import { Dashboard } from "../pages/Dashboard";
import { Users } from "../pages/Users";
import { ListPages } from "../pages/ListPages";
import { Profil } from "../pages/Profil";
import { Keunggulan } from "../pages/Keunggulan";
import { Portfolio } from "../pages/Portofolio";
import { Layanan } from "../pages/Layanan";
import { CategoryBlog } from "../pages/CategoryBlog";
import { Article } from "../pages/Article";
import { CategoryFaq } from "../pages/CategoryFaq";
import { ListFaq } from "../pages/ListFaq";
import { Kontak } from "../pages/Kontak";

// import Form
import { FormUser } from "../pages/form/FormUser";
import { FormPage } from "../pages/form/FormPage";
import { FormProfil } from "../pages/form/FormProfil";
import { FormKeunggulan } from "../pages/form/FormKeunggulan";
import { FormPortofolio } from "../pages/form/FormPortofolio";
import { FormLayanan } from "../pages/form/FormLayanan";
import { FormCategoryBlog } from "../pages/form/FormCategoryBlog";
import { FormArticle } from "../pages/form/FormArticle";
import { FormCategoryFaq } from "../pages/form/FormCategoryFaq";
import { FormFaq } from "../pages/form/FormFaq";
import { FormKontak } from "../pages/form/FormKontak";

export default function index() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedAuth />}>

          {/* Route Pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/pages" element={<ListPages />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/keunggulan" element={<Keunggulan />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/layanan" element={<Layanan />} />
          <Route path="/kategori-blog" element={<CategoryBlog />} />
          <Route path="/artikel" element={<Article />} />
          <Route path="/kategori-faq" element={<CategoryFaq />} />
          <Route path="/pertanyaan" element={<ListFaq />} />
          <Route path="/kontak" element={<Kontak />} />


          {/* Route Form */}
          <Route path="/form-user" element={<FormUser />} />
          <Route path="/form-user/:id" element={<FormUser />} />
          <Route path="/form-page" element={<FormPage />} />
          <Route path="/form-page/:id" element={<FormPage />} />
          <Route path="/form-profil" element={<FormProfil />} />
          <Route path="/form-profil/:id" element={<FormProfil />} />
          <Route path="/form-keunggulan" element={<FormKeunggulan />} />
          <Route path="/form-keunggulan/:id" element={<FormKeunggulan />} />
          <Route path="/form-portofolio" element={<FormPortofolio />} />
          <Route path="/form-portofolio/:id" element={<FormPortofolio />} />
          <Route path="/form-layanan" element={<FormLayanan />} />
          <Route path="/form-layanan/:id" element={<FormLayanan />} />
          <Route path="/form-kategori-blog" element={<FormCategoryBlog />} />
          <Route path="/form-kategori-blog/:id" element={<FormCategoryBlog />} />
          <Route path="/form-article" element={<FormArticle />} />
          <Route path="/form-article/:id" element={<FormArticle />} />
          <Route path="/form-kategori-faq" element={<FormCategoryFaq />} />
          <Route path="/form-kategori-faq/:id" element={<FormCategoryFaq />} />
          <Route path="/form-pertanyaan" element={<FormFaq />} />
          <Route path="/form-pertanyaan/:id" element={<FormFaq />} />
          <Route path="/form-kontak" element={<FormKontak />} />
          <Route path="/form-kontak/:id" element={<FormKontak />} />
        </Route>
      </Routes>
    </Router>
  );
}
