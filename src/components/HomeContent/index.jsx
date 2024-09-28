import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import { useRef } from "react";
import FilterStatus from "../FilterStatus";

function Content() {
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const dateRef = useRef("");
  const searchRef = useRef("");

  const handleClick = (id) => {
    navigate(`bookingDetail/${id}`);
  };

  const getBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning";
      case "Confirmed":
        return "bg-primary";
      case "Rejected":
        return "bg-danger";
      case "In-progress":
        return "bg-info";
      case "Completed":
        return "bg-success";
      case "Cancelled":
        return "bg-secondary";
      default:
        return "bg-light";
    }
  };

  // test
  const [bookings, setBookings] = useState([
    {
      bookingID: "G001",
      name: "Nguyen Van A",
      phone: "0919888333",
      bookingDate: "24/09/2024",
      serviceDate: "28/09/2024",
      stylist: "Ho Van A",
      totalPrice: "99$",
      status: "Pending",
    },
    {
      bookingID: "C002",
      name: "Nguyen Van B",
      phone: "0912312334",
      bookingDate: "24/09/2024",
      serviceDate: "27/09/2024",
      stylist: "Ho Van B",
      totalPrice: "89$",
      status: "Completed",
    },
    {
      bookingID: "C003",
      name: "Nguyen Van C",
      phone: "0912312312",
      bookingDate: "25/09/2024",
      serviceDate: "29/09/2024",
      stylist: "Ho Van C",
      totalPrice: "79$",
      status: "Pending",
    },
    {
      bookingID: "G004",
      name: "Nguyen Van A",
      phone: "0973645892",
      bookingDate: "24/09/2024",
      serviceDate: "28/09/2024",
      stylist: "Ho Van A",
      totalPrice: "99$",
      status: "Pending",
    },
  ]);

  // accept/deny booking
  const [filteredBookings, setFilteredBookings] = useState([]);
  const handleStatus = (status, id) => {
    setBookings((prevBookings) => {
      const updatedBookings = prevBookings.map((booking) => {
        if (booking.bookingID === id) {
          return {
            ...booking,
            status: status === "APROVE" ? "Confirmed" : "Rejected",
          };
        }
        return booking;
      });
      filterBookings(updatedBookings, status === "APROVE" ? "Confirmed" : "Rejected"); 

    return updatedBookings; 
    });
  };

  const filterBookings = (bookings, statusSet) => {
    const filtered = bookings.filter((item) => item.status === statusSet);
    setFilteredBookings(filtered);
  };

  // accept/deny 

  // start search
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSearch = () => {
    if(searchRef.current){
      const value = searchRef.current.value;
      const isValidPhone = /^0\d{9}$/.test(value);
      const param = new URLSearchParams(searchParams);
      if(isValidPhone){
        const filtered = bookings.filter((item) => item.phone === value);
        param.set("type", "phone");
        param.set("key", encodeURIComponent(value));
        setSearchParams(param);
        setFilteredBookings(filtered);
      }else if(value.trim() === "" || ""){
        console.log("space");
      }
      else{
        const filtered = bookings.filter((item) => item.name === value);
        param.set("type", "name");
        param.set("key", encodeURIComponent(value));
        setSearchParams(param);
        setFilteredBookings(filtered);
      }
    }
  };
  
  useEffect(() => {
    const type = searchParams.get("type");
    const key = searchParams.get("key");
    if (type && key) {
      searchRef.current.value = key;
      
      if (type === "phone") {
        const filtered = bookings.filter((item) => item.phone === key);
        setFilteredBookings(filtered);
      } else if (type === "name") {
        const filtered = bookings.filter((item) => item.name === key);
        setFilteredBookings(filtered);
      }
    } else {
      setFilteredBookings(bookings);
    }
  }, [searchParams, bookings]);

  // end search

  const handleSubmitDate = () => {
    const value = handleBlur;
    setBookings((prevBookings) =>
      prevBookings.map((booking) => {
        if (booking.bookingID === id) {
          return {
            ...booking,
          };
        }
        return booking;
      })
    );
  };

  const handleBlur = (e) => {
    return e.target.value;
  };
  

  return (
    <>
      <div className="container">
        <div className="card mb-3">
          <div className="card-header">Filter & Search</div>
          <div className="card-body row card-body-custom">
            <div className="col-md-6">
              <FilterStatus bookings={bookings} setFilteredBookings={setFilteredBookings} />
              </div>
            <div className="col-md-6">
              <input ref={searchRef}
                type="text"
                className="form-control"
                placeholder="Search by phone or name"
              />
              <input type="submit" className="searchSubmit" onClick={handleSearch}/>
            </div>
          </div>
        </div>
        <div className="row mt-3 justify-content-end align-items-center row-custom">
          <div className="col-md-6 result-found">
            <h6>{filteredBookings.length} results found</h6>
          </div>
          <div className="col-md-3">
            <div className="input-group mb-3">
              <label htmlFor="bookingDate">Search by booking date</label>
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                placeholderText="DD/MM/YYYY"
                onBlur={handleBlur}
                className="form-control-Date"
                dateFormat="dd/MM/yyyy"
                id="bookingdate"
              />
              <button onClick={handleSubmitDate} className="dateFind">
                Find
              </button>
            </div>
          </div>

          <div className="col-md-3">
            <select className="form-select mb-3">
              <option>Total Price - Low to High</option>
              <option>Total Price - High to Low</option>
              <option>Booking Date (Newest First)</option>
              <option>Booking Date (Oldest First)</option>
              <option>Service Date (Soonest First)</option>
              <option>Service Date (Latest First)</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          {filteredBookings.map((item, index) => (
            <div key={index}>
              <div
                className="card mb-3 hover-card card-custom-booking"
                onClick={() => handleClick(item.bookingID)}
              >
                <div className="row g-0">
                  <div className="col-md-3">
                    <div className="card-body">
                      <h5 className="card-title">
                        BookingID: {item.bookingID}
                      </h5>
                      <p className="card-text">Contact Phone: {item.phone}<br/>
                      Name: {item.name}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 text-center">
                    <div className="Stylist">
                      <h6>Stylist</h6>
                      <span className="block-span">{item.stylist}</span>
                    </div>
                    <div className="BookingDate">
                      <h6>Booking Date</h6>
                      <span className="block-span">{item.bookingDate}</span>
                    </div>
                    <div className="ServiceDate">
                      <h6>Service Date</h6>
                      <span className="block-span">{item.serviceDate}</span>
                    </div>
                    <div className="TotalPrice">
                      <h6>Total Price</h6>
                      <span className="block-span">{item.totalPrice}</span>
                    </div>
                    <div className="Status">
                      <h6>Status</h6>
                      <span className={`badge ${getBadgeClass(item.status)}`}>{item.status}</span>
                    </div>
                  </div>
                  {item.status == "Pending" ? (
                    <>
                      <div className="col-md-3 acceptDeny">
                        <center>
                          <br />
                          <a
                            className="accept"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatus("APROVE", item.bookingID);
                            }}
                          >
                            APROVE
                          </a>
                          <a
                            className="deny"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatus("REJECT", item.bookingID);
                            }}
                          >
                            REJECT
                          </a>
                        </center>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center custom-pagi">
            <li className="page-item">
              <a className="page-link" href="#">
                Previous
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Content;
