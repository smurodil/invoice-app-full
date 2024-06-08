import "./invoiceCart.css";
import PostStatus from "../paidStatus/PaidStatus";
import rightArrow from "/assets/icon-arrow-right.svg";
import { Link } from "react-router-dom";

function InvoiceCard({ invoice }) {
  return (
    <Link to={`invoice?${invoice.id}`} className="invoice-link">
      <div className="invoice-card">
        <div className="invoice-card-top-wrapper">
          <h2 className="invoice-card-id">
            <span className="invoice-card-heshtag">#</span>
            {invoice.id}
          </h2>
          <h2 className="invoice-card-due">Due {invoice.paymentDue}</h2>
          <h2 className="invoice-card-clientname">{invoice.clientName}</h2>
        </div>
        <div className="invoice-card-content">
          <h1 className="invoice-card-price">£ {invoice.total}</h1>

          <div className="post-status-home-wrapper">
            <PostStatus type={invoice.status} />
            <img src={rightArrow} alt="" className="invoice-card-right-arrow" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default InvoiceCard;
