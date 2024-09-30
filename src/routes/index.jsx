import LayoutDefault from "../layout/LayoutDefault";
import BookingDetail from "../pages/BookingDetail";
import Error404 from "../pages/Error404";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Salary from "../pages/Salary";
export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
        {
            path: "/",
            element:  <Home />
        },
        { 
            path: "bookingDetail/:id",
            element:  <BookingDetail />
        },
        { 
            path: "profile",
            element:  <Profile />
        },
        { 
            path: "salary",
            element:  <Salary />
        },
        { 
            path: "error",
            element:  <Error404 />
        }
    ],
  },
];