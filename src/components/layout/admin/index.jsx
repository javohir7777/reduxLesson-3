import { Outlet } from "react-router-dom";
import AdminLayoutHeader from "../../header";

const AdminLayout = () => {
  return (
    <div>
      <AdminLayoutHeader />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
