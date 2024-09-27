
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import './style.css';
import { useState } from "react";

function Content() {
  const [date, setDate] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`appoinmentDetail/${id}`)
  };
// test
  const bookings = [
    {
      appoinmentID: "G001",
      name: "Nguyen Van A",
      phone: "09123123123",
      bookingDate: "24/09/2024",
      serviceDate: "28/09/2024",
      stylist: "Ho Van A",
      totalPrice: "99$",
      status: "Pending",
    },
    {
      appoinmentID: "C002",
      name: "Nguyen Van B",
      phone: "09123123124",
      bookingDate: "24/09/2024",
      serviceDate: "27/09/2024",
      stylist: "Ho Van B",
      totalPrice: "89$",
      status: "Completed",
    },
    {
      appoinmentID: "C003",
      name: "Nguyen Van C",
      phone: "09123123125",
      bookingDate: "25/09/2024",
      serviceDate: "29/09/2024",
      stylist: "Ho Van C",
      totalPrice: "79$",
      status: "Pending",
    },
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    const isPhone = /^[0-9]+$/.test(value);
    
    if (isPhone) {
      onSearch({ type: 'phone', query: value });
    } else {
      onSearch({ type: 'name', query: value });
    }
  };

  const handleSubmitDate = () => {

  }
  return (
    <>
            <div className="container">
              <div className="row mt-3">
                <div className="col-md-3">
                  <div className="input-group mb-3">
                    <DatePicker 
                      selected={date}
                      onChange={(date) => setDate(date)}
                      placeholderText="DD/MM/YYYY"
                      className="form-control-Date"
                      dateFormat="dd/MM/yyyy" />
                      <button onClick={handleSubmitDate} className="dateFind">Find</button>
                  </div>
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
                {bookings.map((item, index) => (
                  <div key={index}>
                    <div className="card mb-3 hover-card" onClick={() => handleClick(item.appoinmentID)}>
                      <div className="row g-0">
                        <div className="col-md-5">
                          <div className="card-body">
                            <h5 className="card-title">AppoinmentID: {item.appoinmentID}</h5>
                            <p className="card-text">Contact Phone: {item.phone}</p>
                          </div>
                        </div>
                        <div className="col-md-7 text-center">
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
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
