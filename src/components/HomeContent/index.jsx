import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import { useRef } from "react";

function Content() {
  const [date, setDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dateRef = useRef("");

  const handleClick = (id) => {
    navigate(`bookingDetail/${id}`);
  };

  // test
  const [bookings, setBookings] = useState([
    {
      bookingID: "G001",
      name: "Nguyen Van A",
      phone: "09123123123",
      bookingDate: "24/09/2024",
      serviceDate: "28/09/2024",
      stylist: "Ho Van A",
      totalPrice: "99$",
      status: "Pending",
    },
    {
      bookingID: "C002",
      name: "Nguyen Van B",
      phone: "09123123124",
      bookingDate: "24/09/2024",
      serviceDate: "27/09/2024",
      stylist: "Ho Van B",
      totalPrice: "89$",
      status: "Completed",
    },
    {
      bookingID: "C003",
      name: "Nguyen Van C",
      phone: "09123123125",
      bookingDate: "25/09/2024",
      serviceDate: "29/09/2024",
      stylist: "Ho Van C",
      totalPrice: "79$",
      status: "Pending",
    },
    {
      bookingID: "G004",
      name: "Nguyen Van A",
      phone: "09123123123",
      bookingDate: "24/09/2024",
      serviceDate: "28/09/2024",
      stylist: "Ho Van A",
      totalPrice: "99$",
      status: "Pending",
    },
  ]);

  const handleStatus = (status, id) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) => {
        if (booking.bookingID === id) {
          return {
            ...booking,
            status: status === "ACCEPT" ? "Confirmed" : "Rejected",
          };
        }
        return booking;
      })
    );
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    const isPhone = /^[0-9]+$/.test(value);

    if (isPhone) {
      onSearch({ type: "phone", query: value });
    } else {
      onSearch({ type: "name", query: value });
    }
  };

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

  const [filteredBookings, setFilteredBookings] = useState([]);

  const handleFilterStatus = (status) => {
    const params = new URLSearchParams(searchParams);
    if (status === "All") {
      params.delete("status");
      setFilteredBookings(bookings);
    } else {
      params.set("status", status);
      setSearchParams(params);
    }
    
  };
  useEffect(() => {
  const status = searchParams.get("status") || ""; 
    if (status === "All") {
      setFilteredBookings(bookings); // Hiển thị tất cả bookings khi trạng thái là "All"
    } else {
      const filteredBookings = bookings.filter((item) =>
        status === "" || item.status === status
      );
      setFilteredBookings(filteredBookings); // Cập nhật danh sách đã lọc
    }
  }, [searchParams, bookings]);

  return (
    <>
      <div className="container">
        <div className="card mb-3">
          <div className="card-header">Filter & Search</div>
          <div className="card-body row">
            <div className="col-md-6">
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
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search by phone or name"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        <div className="row mt-3 justify-content-end align-items-center row-custom">
          <div className="col-md-6 result-found">
            <h6>{bookings.length} results found</h6>
          </div>
          <div className="col-md-3">
            <div className="input-group mb-3">
              <label htmlFor="bookingDate">Search by booking date</label>
              <DatePicker
                ref={dateRef}
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
                className="card mb-3 hover-card"
                onClick={() => handleClick(item.bookingID)}
              >
                <div className="row g-0">
                  <div className="col-md-3">
                    <div className="card-body">
                      <h5 className="card-title">
                        AppoinmentID: {item.bookingID}
                      </h5>
                      <p className="card-text">Contact Phone: {item.phone}</p>
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
                      <span
                        className={`badge ${
                          item.status === "Pending"
                            ? "bg-warning"
                            : "bg-success"
                        }`}
                      >
                        {item.status}
                      </span>
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
                              handleStatus("ACCEPT", item.bookingID);
                            }}
                          >
                            ACCEPT
                          </a>
                          <a
                            className="deny"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatus("DENY", item.bookingID);
                            }}
                          >
                            DENY
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
