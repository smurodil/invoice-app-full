import { useState, useEffect } from "react";
import "./home.css";
import arrowDown from "/assets/icon-arrow-down.svg";
import plus from "/assets/plus.png";
import InvoiceCard from "../../components/invoiceCart/InvoiceCard";
import { useDispatch, useSelector } from "react-redux";
import invoiceSlice from "../../features/invoiceSlice";
import CreateInvoice from "../../components/createInvoice/CreateInvoice";
import { useLocation } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const filter = ["paid", "pending", "draft"];
  const [isDropdown, setIsDropdown] = useState(false);
  const [openCreateInvoice, setOpenCreateInvoice] = useState(false);

  const [filterValue, setfilterValue] = useState("");

  const invoices = useSelector((state) => state.invoices.filteredInvoice);


  useEffect(() => {
    dispatch(invoiceSlice.actions.filterInvoice({ status: filterValue }));
  }, [filterValue, dispatch]);
  return (
    <div>
      <div className="hero-content">
        <div className="content-wrapper">
          <div className="content-top">
            <div>
              <h1 className="content-top-title">Invoices</h1>
              <p className="content-top-description">
                There are {invoices.length} invoices
              </p>
            </div>
            <div className="filter-wrapper">
              <div className="filter-status">
                <p className="filter-by-status">Filter by status</p>
                <p className="filter-label">Filter</p>
                <div
                  onClick={() => {
                    setIsDropdown((state) => !state);
                  }}
                  className="dropdown-wrapper"
                >
                  {<img src={arrowDown} />}
                </div>
              </div>
              {isDropdown && (
                <div
                  as="select"
                  className="filter-items"
                >
                  {filter.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        item === filterValue
                          ? setfilterValue("")
                          : setfilterValue(item);
                      }}
                      className="filter-items-wrapper"
                    >
                      <input
                        value={item}
                        checked={filterValue === item ? true : false}
                        type="checkbox"
                        className="filter-tems-checkbox"
                      />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => setOpenCreateInvoice(true)}
                className="new-invoice-btn"
              >
                <img src={plus} alt="" />
                <p className="new-invoice-text">New invoice</p>
                <p className="new-text">New</p>
              </button>
            </div>
          </div>

          <div className="invoice-card-home-wrapper">
            {invoices &&
              invoices.map((invoice, index) => (
                <div key={invoice.id}>
                  <InvoiceCard invoice={invoice} />
                </div>
              ))}
          </div>
        </div>
      </div>
      {openCreateInvoice && (
        <CreateInvoice
          openCreateInvoice={openCreateInvoice}
          setOpenCreateInvoice={setOpenCreateInvoice}
        />
      )}
    </div>
  );
}

export default Home;
