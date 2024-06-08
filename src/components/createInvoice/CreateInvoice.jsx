import "./createInvoice.css";
import AddItem from "../addItem/addItem";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import invoiceSlice from "../../features/invoiceSlice";
import {
  validateSenderStreetAddress,
  validateSenderPostCode,
  validateSenderCity,
  validateCLientEmail,
  validateCLientName,
  validateClientCity,
  validateClientPostCode,
  validateClientStreetAddress,
  validateItemCount,
  validateItemName,
  validateItemPrice,
  validateSenderCountry,
  validateClientCountry,
} from "../../utils/createInvoiceValidator";
import { useState } from "react";

function CreateInvoice({ setOpenCreateInvoice, invoice, type }) {
  const dispatch = useDispatch();

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValidatorActive, setIsValidatorActive] = useState(false);

  const [filterValue, setfilterValue] = useState("");
  const deliveryTimes = [
    { text: "Next 1 day", value: 1 },
    { text: "Next 7 days", value: 7 },
    { text: "Next 14 days", value: 14 },
    { text: "Next 30 days", value: 30 },
  ];
  const [senderStreet, setSenderStreet] = useState("");
  const [senderCity, setSenderCity] = useState("");
  const [senderPostCode, setSenderPostCode] = useState("");
  const [senderCountry, setSenderCountry] = useState("");

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const [clientStreet, setClientStreet] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientPostCode, setClientPostCode] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [description, setDescription] = useState("");

  const [selectDeliveryDate, setSelectDeliveryDate] = useState("");
  const [paymentTerms, setpaymentTerms] = useState(deliveryTimes[0].value);

  const [item, setItem] = useState([
    {
      name: "",
      quantity: 1,
      price: 0,
      total: 0,
      id: uuidv4(),
    },
  ]);
  const onDelete = (id) => {
    setItem((prevState) => prevState.filter((el) => el.id !== id));
  };

  const handleOnChange = (id, e) => {
    let data = [...item];

    let foundData = data.find((el) => el.id === id);

    if (e.target.name === "quantity" || "price") {
      foundData[e.target.name] = e.target.value;
      foundData["total"] = (
        Number(foundData.quantity) * Number(foundData.price)
      ).toFixed(2);
    } else {
      foundData[e.target.name] = e.target.value;
    }

    setItem(data);
  };

  const onSubmit = () => {
    if (type === "edit") {
      dispatch(
        invoiceSlice.actions.editInvoice({
          description,
          paymentTerms,
          clientName,
          clientEmail,
          senderStreet,
          senderCity,
          senderPostCode,
          senderCountry,
          clientStreet,
          clientCity,
          clientPostCode,
          clientCountry,
          item,
          id: invoice.id,
        })
      );
      setOpenCreateInvoice(false);
    } else {
      dispatch(
        invoiceSlice.actions.addInvoice({
          description,
          paymentTerms,
          clientName,
          clientEmail,
          senderStreet,
          senderCity,
          senderPostCode,
          senderCountry,
          clientStreet,
          clientCity,
          clientPostCode,
          clientCountry,
          item,
        })
      );
      dispatch(invoiceSlice.actions.filterInvoice({ status: filterValue }));
    }
  };

  if (type === "edit" && isFirstLoad) {
    const updatedItemsArray = invoice.items.map((obj, index) => {
      return { ...obj, id: index + 1 };
    });
    setClientName(invoice.clientName);
    setClientCity(invoice.clientAddress.city);
    setClientStreet(invoice.clientAddress.street);
    setClientPostCode(invoice.clientAddress.postCode);
    setClientCountry(invoice.clientAddress.country);
    setClientEmail(invoice.clientEmail);
    setpaymentTerms(invoice.paymentTerms);
    setDescription(invoice.description);
    setSenderCity(invoice.senderAddress.city);
    setSenderStreet(invoice.senderAddress.street);
    setSenderCountry(invoice.senderAddress.country);
    setSenderPostCode(invoice.senderAddress.postCode);
    setItem(updatedItemsArray);
    setIsFirstLoad(false);
  }

  function itemsValidator() {
    const itemName = item.map((i) => validateItemName(i.name));
    const itemCount = item.map((i) => validateItemCount(i.quantity));
    const itemPrice = item.map((i) => validateItemPrice(i.price));

    const allItemsElement = itemCount.concat(itemPrice, itemName);
    return allItemsElement.includes(false) === true ? false : true;
  }

  function validator() {
    if (
      validateSenderStreetAddress(senderStreet) &&
      validateSenderPostCode(senderPostCode) &&
      validateSenderCity(senderCity) &&
      validateCLientEmail(clientEmail) &&
      validateCLientName(clientName) &&
      validateClientCity(clientCity) &&
      validateClientPostCode(clientPostCode) &&
      validateClientStreetAddress(clientStreet) &&
      validateSenderCountry(senderCountry) &&
      validateClientCountry(clientCountry) &&
      itemsValidator()
    ) {
      return true;
    }
    return false;
  }

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenCreateInvoice(false);
      }}
      className="create-invoice"
    >
      <div className="create-invoice-sidebar">
        <h1 className="create-invoice-title">
          {type === "edit" ? "Edit" : "Create"} Invoice
        </h1>

        <div className="create-invoice-inputs-wrapper">
          <h1 className="create-invoice-bill-form">Bill Form</h1>

          <div className="create-invoice-adress-wrapper">
            <div className="street-adress-top-wrapper">
              <label className="street-top-adress-label">Street Address</label>
              <input
                type="text"
                value={senderStreet}
                id="senderStreet"
                onChange={(e) => setSenderStreet(e.target.value)}
                className={`street-adress-top-input ${
                  isValidatorActive &&
                  !validateClientStreetAddress(senderStreet) &&
                  "create-invoice-sender-street-input-error"
                } `}
              />
            </div>
            <div className="city-top-wrapper">
              <label className="city-top-label">City</label>
              <input
                type="text"
                value={senderCity}
                onChange={(e) => setSenderCity(e.target.value)}
                className={`city-top-input ${
                  isValidatorActive &&
                  !validateSenderCity(senderCity) &&
                  "create-invoice-sender-city-input-error"
                }`}
              />
            </div>
            <div className="post-code-top-wrapper">
              <label className="post-code-top-label">Post Code</label>
              <input
                type="text"
                value={senderPostCode}
                onChange={(e) => setSenderPostCode(e.target.value)}
                className={`post-code-top-input ${
                  isValidatorActive &&
                  !validateSenderPostCode(senderPostCode) &&
                  "create-invoice-input-error"
                }`}
              />
            </div>
            <div className="country-top-wrapper">
              <label className="country-top-label">Country</label>
              <input
                type="text"
                value={senderCountry}
                onChange={(e) => setSenderCountry(e.target.value)}
                className={`country-top-input ${
                  isValidatorActive &&
                  !validateSenderCountry(senderCountry) &&
                  "create-invoice-input-error"
                }`}
              />
            </div>
          </div>
          <h1 className="create-invoice-content-title">Bill To</h1>
          <div className="create-invoice-client-wrapper">
            <div className="client-name-wrapper">
              <label className="client-name-wrapper-label">Client's Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className={`client-name-input ${
                  isValidatorActive &&
                  !validateCLientName(clientName) &&
                  "create-invoice-input-error"
                }`}
              />
            </div>
            <div className="client-email-wrapper">
              <label className="client-email-label">Client Email</label>
              <input
                type="text"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className={`client-email-input ${
                  isValidatorActive &&
                  !validateCLientEmail(clientEmail) &&
                  "create-invoice-input-error"
                } `}
              />
            </div>
            <div className="street-address-wrapper">
              <label className="street-address-label">Street Address</label>
              <input
                type="text"
                value={clientStreet}
                onChange={(e) => setClientStreet(e.target.value)}
                className={`street-address-input ${
                  isValidatorActive &&
                  !validateClientStreetAddress(clientStreet) &&
                  "create-invoice-input-error"
                }`}
              />
            </div>
            <div className="city-wrapper">
              <label className="city-label">City</label>
              <input
                type="text"
                value={clientCity}
                onChange={(e) => setClientCity(e.target.value)}
                className={`city-input   ${
                  isValidatorActive &&
                  !validateClientCity(clientCity) &&
                  "create-invoice-input-error"
                }`}
              />
            </div>
            <div className="post-code-wrapper">
              <label className="post-code-label">Post Code</label>
              <input
                type="text"
                value={clientPostCode}
                onChange={(e) => setClientPostCode(e.target.value)}
                className={`post-code-input ${
                  isValidatorActive &&
                  !validateClientPostCode(clientPostCode) &&
                  "create-invoice-input-error"
                }`}
              />
            </div>
            <div className="country-wrapper">
              <label className="country-label">Country</label>
              <input
                type="text"
                value={clientCountry}
                onChange={(e) => setClientCountry(e.target.value)}
                className={`country-input ${
                  isValidatorActive &&
                  !validateClientCountry(clientCountry) &&
                  "create-invoice-input-error"
                }`}
              />
            </div>
          </div>
          <div className="create-invoice-date-wrapper">
            <div className="invoice-date-wrapper">
              <label className="invoice-date-label">Invoice Date</label>
              <input
                type="date"
                value={selectDeliveryDate}
                onChange={(e) => setSelectDeliveryDate(e.target.value)}
                className="invoice-date-input"
              />
            </div>
            <div className="payment-terms-wrapper">
              <label className="payment-terms-label">Payment Terms</label>
              <select
                value={paymentTerms}
                onChange={(e) => setpaymentTerms(e.target.value)}
                className="payment-terms-select"
              >
                {deliveryTimes.map((time) => (
                  <option key={time} value={time.value}>
                    {time.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="description">
            <label className="description-label">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="description-input"
            />
          </div>
          <h2 className="create-invoice-item-list">Item List</h2>
          {item.map((itemDetails, index) => (
            <div key={index} className="create-invoice-add-item-wrapper">
              <AddItem
                isValidatorActive={isValidatorActive}
                key={index}
                handleOnChange={handleOnChange}
                setItem={setItem}
                onDelete={onDelete}
                itemDetails={itemDetails}
              />
            </div>
          ))}

          <button
            onClick={() => {
              setItem((state) => [
                ...state,
                {
                  name: "",
                  quantity: 1,
                  price: 0,
                  total: 0,
                  id: uuidv4(),
                },
              ]);
            }}
            className="add-item-btn"
          >
            + Add Item
          </button>
        </div>
        <div className="create-invoice-bottom-btn">
          <div>
            <button
              onClick={() => {
                setOpenCreateInvoice(false);
              }}
              className="discard-btn"
            >
              Discard
            </button>
          </div>

          <div>
            <button
              className="save-sent-btn"
              onClick={() => {
                const isValid = validator();
                setIsValidatorActive(true);
                if (isValid) {
                  onSubmit();
                  setOpenCreateInvoice(false);
                }
              }}
            >
              Save & Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateInvoice;
