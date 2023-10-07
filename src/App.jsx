import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/front/Login";
import NotFoundPage from "./pages/public/NotFoundPage";
import AdminLayout from "./components/layout/admin";
import DashboardPage from "./pages/admin/DashboardPage";
import SkillsPage from "./pages/admin/SkillsPage";
import UsersPage from "./pages/admin/UsersPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>
        {/* <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="posts" element={<AllPostsPage />} />
          <Route path="about" element={<AbouteUsPage />} />
          <Route path="blog/:id" element={<BlogPostPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="category/:id" element={<CategoryPage />} />
        </Route> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
