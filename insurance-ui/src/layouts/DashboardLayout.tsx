import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }: any) => (
  <Box display="flex">
    <Sidebar />
    <Box flex={1} p={3} bgcolor="#f5f7fb">
      {children}
    </Box>
  </Box>
);

export default DashboardLayout;
