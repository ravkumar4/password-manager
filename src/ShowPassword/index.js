import './index.css'

const ShowPassword = props => {
  const {usersDetails, isPasswordEncrypted, deleteItemFromList} = props
  const {id, website, username, password} = usersDetails
  const initial = username.slice(0, 1)

  const onDeleteItem = () => {
    deleteItemFromList(id)
  }

  const renderRealPassword = () => {
    console.log('real password')
    return <p className="name">{password}</p>
  }

  const renderEncryptedPassword = () => {
    console.log('encrypted password')
    return (
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
        alt="stars"
        className="star-image"
      />
    )
  }

  return (
    <li>
      <div className="initial-container">
        <h1 className="initial-text">{initial}</h1>
      </div>
      <div className="user-details-container">
        <p className="name">{website}</p>
        <p className="name">{username}</p>
        {isPasswordEncrypted ? renderRealPassword() : renderEncryptedPassword()}
      </div>
      <button
        className="delete-button"
        type="button"
        onClick={onDeleteItem}
        testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-item"
        />
      </button>
    </li>
  )
}
export default ShowPassword
