import './deleteModal.css'

function DeleteModal({ invoiceId, onDeleteButtonClick, setIsDeleteModalOpen }) {
  return (
    <div onClick={(e) => {
      if (e.target !== e.currentTarget) {
        return;
    }
    setIsDeleteModalOpen(false);
    }} className='delete-modal'>
      <div className='delete-modal-wrapper'>
        <h3 className='delete-modal-title'>
          Confirm Deletion
        </h3>
        <p className='delete-modal-req'>
          Are you sure you want to delete invoice {invoiceId}? This action cannot be undone.
        </p>
        <div className='delete-modal-content'>
          <button onClick={onDeleteButtonClick} className='delete-modal-delete-btn'>
            Delete
          </button>
          <button onClick={() => setIsDeleteModalOpen(false)} className='delete-modal-cancel-btn'>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal