import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Users from "./pages/Users";
import Professions from "./pages/Professions";
import Hobbies from "./pages/Hobbies";
import Policies from "./pages/Policies";
import HealthDetails from "./pages/HealthDetails";
import PremiumCalculator from "./pages/PremiumCalculator";
import PremiumHistory from "./pages/PremiumHistroy";
import UserDetails from "./pages/UserDetails";




export default function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/professions" element={<Professions />} />
          <Route path="/hobbies" element={<Hobbies />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/calculate" element={<PremiumCalculator />} />
          <Route path="/health/:userId" element={<HealthDetails />} />
          <Route path="/history/:userId" element={<PremiumHistory />} />
          <Route path="/users/:id" element={<UserDetails/>}/>
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
