
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function StatusFilter(props) {
    const { bookings, setFilteredBookings } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterStatus = (status) => {
    const params = new URLSearchParams(searchParams);
    if (status === "All") {
      params.delete("status");
    } else {
      params.set("status", status);
    }
    setSearchParams(params);
  };

  useEffect(() => {
    const status = searchParams.get("status") || ""; 
    const filteredBookings = bookings.filter((item) => 
      status === "" || item.status === status
    );
    setFilteredBookings(filteredBookings); 
  }, [searchParams, bookings, setFilteredBookings]);
  


  return (
    <>
      
    </>
  );
}

export default StatusFilter;
