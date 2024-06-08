import "./invoiceInfo.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import leftArrow from "/assets/icon-arrow-left.svg";
import PaidStatus from "../paidStatus/PaidStatus";
import { useDispatch, useSelector } from "react-redux";
import invoiceSlice from "../../features/invoiceSlice";
import formatDate from "../../utils/formatDate";
import DeleteModal from "../deleteModal/DeleteModal";
import CreateInvoice from "../createInvoice/CreateInvoice";

function InvoiceInfo({ onDelete }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const invoiceId = location.search.substring(1);
  const onMakePaidClick = () => {
    dispatch(
      invoiceSlice.actions.updateInvoiceStatus({
        id: invoiceId,
        status: "paid",
      })
    );
    dispatch(invoiceSlice.actions.getInvoiceById({ id: invoiceId }));
  };

  useEffect(() => {
    dispatch(invoiceSlice.actions.getInvoiceById({ id: invoiceId }));
  }, [invoiceId, onMakePaidClick]);

  const onDeleteButtonClick = () => {
    navigate("/");
    setIsDeleteModalOpen(false);
    onDelete(invoiceId);
  };

  const invoice = useSelector((state) => state.invoices.invoiceById);


  return (
    <div style={{backgroundColor: 'var(--light-bg)'}}>
      {invoice ? (
        <div className="invoice-info">
          <div>
            <button onClick={() => navigate(-1)} className="go-back-btn">
              <img src={leftArrow} alt="" />
              <p className="go-back-text">Go back</p>
            </button>

            <div className="invoice-info-top">
              <div className="invoice-info-status-container">
                <h1 className="invoice-info-status-title">Status</h1>
                <PaidStatus type={invoice.status} />
              </div>
              <div className="invoice-info-btn-wrapper">
                <button
                  className="invoice-info-edit-btn"
                  onClick={() => setIsEditOpen(true)}
                >
                  Edit
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="invoice-info-delete-btn"
                >
                  Delete
                </button>
                {invoice.status === "pending" && (
                  <button
                    onClick={onMakePaidClick}
                    className="invoice-info-make-btn"
                  >
                    Make As Paid
                  </button>
                )}
              </div>
            </div>
            <div className="invoice-info-content">
              <div className="invoice-info-content-top">
                <div className="invoice-content-top-text-wrapper">
                  <h1 className="invoice-info-content-id">
                    <span className="invoice-info-content-heshteg">#</span>
                    {invoice.id}
                  </h1>
                  <p className="invoice-info-client-name">
                    {invoice.description}
                  </p>
                </div>
                <div className="invoice-info-sender-address-wrapper">
                  <p>{invoice.senderAddress.street}</p>
                  <p>{invoice.senderAddress.city}</p>
                  <p>{invoice.senderAddress.postCode}</p>
                  <p>{invoice.senderAddress.country}</p>
                </div>
              </div>
              <div className="invoice-info-content-middle">
                <div className="invoice-info-content-date-wrapper">
                    <div>
                        <h3 className="invoice-info-invoice-date-text">
                            Invoice Date
                        </h3>
                        <h1 className="invoice-info-invoice-date">
                          {formatDate(invoice.createdAt)}
                        </h1>
                    </div>
                    <div>
                        <h3 className="invoice-info-incoice-payment-due-text">
                            Payment Due
                        </h3>
                        <h1 className="invoice-info-invoice-payment-due">
                          {formatDate(invoice.paymentDue)}
                        </h1>
                    </div>
                </div>
                <div>
                    <p className="invoice-info-bill-to">
                        Bill To
                    </p>
                    <h1 className="invoice-info-content-client-name">
                        {invoice.clientName}
                    </h1>
                    <p className="invoice-info-content-street">
                        {invoice.clientAddress.street}
                    </p>
                    <p className="invoice-info-content-city">
                        {invoice.clientAddress.city}
                    </p>
                    <p className="invoice-info-content-post-code">
                        {invoice.clientAddress.postCode}
                    </p>
                    <p className="invoice-info-content-country">
                        {invoice.clientAddress.country}
                    </p>
                </div>
                <div className="invoice-info-content-sent-to-wrapper">
                    <p className="invoice-info-content-sent-to-text">
                        Sent to
                    </p>
                    <h1 className="invoice-info-content-invoice-email">
                        {invoice.clientEmail}
                    </h1>
                </div>
              </div>
              <div className="invoice-info-content-item-info-wrapper">
                {invoice.items.map(item => (
                    <div key={item.name} className="invoice-info-content-items-info">
                        <div className="invoice-info-content-item-name-wrapper">
                            <p className="invoice-info-content-item-name-text">
                                Item name
                            </p>
                            <h1 className="invoice-info-content-item-name-title">
                                {item.name}
                            </h1>
                        </div>
                        <div className="invoice-info-content-item-quantity-wrapper">
                            <p className="invoice-info-content-item-qty">
                                Qty.
                            </p>
                            <h1 className="invoice-content-item-quantity">
                                {item.quantity}
                            </h1>  
                        </div>
                        <div className="invoice-info-content-item-price-wrapper">
                            <p className="invoice-info-content-item-price-text">
                                Item Price
                            </p>
                            <h1 className="invoice-info-content-item-price">
                                £{item.price}
                            </h1>
                        </div>
                        <div className="invoice-info-content-item-total-wrapper">
                            <p className="invoice-info-content-item-total-text">
                             Total
                            </p>
                            <h1 className="invoice-info-content-item-total">
                                £{item.total}
                            </h1>
                        </div>
                    </div>
                ))}
              </div>
              <div className="invoice-info-content-amount-due">
                <h3 className="invoice-info-content-amount-due-text">
                    Amount Due
                </h3>
                <h1 className="invoice-info-content-amount">
                    £  {invoice.total}
                </h1>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>Loading...</>
      )}
        {isDeleteModalOpen && <DeleteModal onDeleteButtonClick={onDeleteButtonClick} setIsDeleteModalOpen={setIsDeleteModalOpen} invoiceId={invoice.id} />}
        {isEditOpen && <CreateInvoice invoice={invoice} type='edit' setOpenCreateInvoice={setIsEditOpen} />}
    </div>
  );
}

export default InvoiceInfo;
