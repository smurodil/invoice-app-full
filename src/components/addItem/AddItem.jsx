import './addItem.css'
import { validateItemCount, validateItemName, validateItemPrice } from '../../utils/createInvoiceValidator'
import { MdDelete } from "react-icons/md";

function AddItem({ itemDetails,  isValidatorActive, onDelete, handleOnChange }) {
  const { id, name, quantity, price, total } = itemDetails;
  return (
    <div>
      <div className='add-item-wrapper'>
        <div className='add-item-content'>
          <div className='add-item-content-name'>
            <h1>Item Name</h1>
            <input type="text" name="name" onChange={(e) => {handleOnChange(id, e)}} value={name} className={`item-name-input ${isValidatorActive && !validateItemName(name) && 'input-error' }` } />
          </div>
          <div className='add-item-content-qty'>
            <h1>
              Qty.
            </h1>
            <input type="text" name='quantity' onChange={(e) => {handleOnChange(id, e)}} value={quantity} min={0} className={`item-qty-input ${isValidatorActive && !validateItemCount(quantity) && 'input-error'}`} />
          </div>
          <div className='add-item-content-price'>
            <h1>
              Price
            </h1>
            <input type="text" name="price" onChange={(e) => {handleOnChange(id, e)}} value={price} min={0} className={`item-price-input ${isValidatorActive && !validateItemPrice(price) && 'input-error'} `} />
          </div>
          <div className='add-item-total'>
            <h1>
              Total
            </h1>
            <div className='item-details-total-wrapper'>
              <span>${total}</span>
            </div>
          </div>
        </div>
        <button className='delete-icon-wrapper' onClick={() => {onDelete(itemDetails.id)}}>
          <MdDelete className='delete-icon' />
        </button>
      </div>
    </div>
  )
}

export default AddItem