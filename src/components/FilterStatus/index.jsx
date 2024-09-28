import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function FilterStatus(props) {
    const {bookings, setFilteredBookings} = props;
    const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterStatus = (status) => {
    const params = new URLSearchParams(searchParams);
    if (status === "All") {
      params.delete("status");
      setFilteredBookings(bookings);
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
            <button
                className="btn btn-sm ml-1 btn-outline-success active"
                onClick={(e) => handleFilterStatus("All")}
              >
                All
              </button>
              <button
                className="btn btn-sm ml-1 btn-outline-warning"
                onClick={(e) => handleFilterStatus("Pending")}
              >
                Pending
              </button>
              <button
                className="btn btn-sm ml-1 btn-outline-primary"
                onClick={(e) => handleFilterStatus("Confirmed")}
              >
                Confirmed
              </button>
              <button
                className="btn btn-sm ml-1 btn-outline-danger"
                onClick={(e) => handleFilterStatus("Rejected")}
              >
                Rejected
              </button>
              <button
                className="btn btn-sm ml-1 btn-outline-info"
                onClick={(e) => handleFilterStatus("In-progress")}
              >
                In-progress
              </button>
              <button
                className="btn btn-sm ml-1 btn-outline-success"
                onClick={(e) => handleFilterStatus("Completed")}
              >
                Completed
              </button>
              <button
                className="btn btn-sm ml-1 btn-outline-secondary"
                onClick={(e) => handleFilterStatus("Cancelled")}
              >
                Cancelled
              </button>
        </>
    )
}

export default FilterStatus;