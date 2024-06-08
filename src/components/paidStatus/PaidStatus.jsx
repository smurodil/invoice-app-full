import './paidStatus.css'

function PaidStatus({type}) {
  const classNemes = {
    paid: ['paid-text-color', 'paid-bg-color'],
    pending: ['pending-text-color', 'pending-bg-color'],
    draft: ['draft-text-color', 'draft-bg-color']
  }
  return (
    <div className={`${type === "paid" ? classNemes.paid[0] : type === 'pending' ? classNemes.pending[0] : classNemes.draft[0]} paid-status-wrapper`}>
      <div className={`paid-status ${type === "paid" ?  classNemes.paid[1] : type === "pending" ? classNemes.pending[1] : classNemes.draft[1]}`}>
        <p className='type-text'>
          {type}
        </p>
      </div>
    </div>
  )
}

export default PaidStatus