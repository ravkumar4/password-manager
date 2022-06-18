import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import ShowPassword from '../ShowPassword'

import './index.css'

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    searchInput: '',
    usersList: [],
    isEncryptedPassword: false,
  }

  submitUserDetails = event => {
    event.preventDefault()
    const {website, username, password, isEncryptedPassword} = this.state

    const newUser = {
      id: uuidv4(),
      website,
      username,
      password,
      isEncryptedPassword,
    }

    this.setState(prevState => ({
      usersList: [...prevState.usersList, newUser],
      website: '',
      username: '',
      password: '',
    }))
  }

  onShowPasswords = () => {
    this.setState(prevState => ({
      isEncryptedPassword: !prevState.isEncryptedPassword,
    }))
  }

  deleteItemFromList = id => {
    const {usersList} = this.state
    this.setState({
      usersList: usersList.filter(each => each.id !== id),
    })
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {usersList, isEncryptedPassword, searchInput} = this.state
    const filteredResults = usersList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const searchResultsLen = filteredResults.length
    return (
      <div className="app-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
        </div>
        <div className="password-manager-container">
          <div className="add-password-container">
            <h1 className="add-new-password-heading"> Add New Password</h1>
            <form className="password-form" onSubmit={this.submitUserDetails}>
              <div className="input-container">
                <button type="button" className="input-button">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="icon"
                  />
                </button>
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input-bar"
                  onChange={this.onChangeWebsite}
                />
              </div>
              <div className="input-container">
                <button type="button" className="input-button">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="icon"
                  />
                </button>
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input-bar"
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="input-container">
                <button type="button" className="input-button">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="icon"
                  />
                </button>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input-bar"
                  onChange={this.onChangePassword}
                />
              </div>
              <div className="add-button-align">
                <button type="submit" className="add-button" testid="button">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="add-password-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-icon"
            />
          </div>
        </div>
        <div className="show-password-container">
          <div className="password-count-search-bar-container">
            <div className="password-count-container">
              <h1 className="your-password-text">Your Passwords</h1>
              <p className="your-password-count"> {filteredResults.length}</p>
            </div>
            <div className="search-password-container">
              <button type="button" className="search-button">
                <img
                  type="search"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                  onChange={this.searchedInput}
                />
              </button>
              <input
                type="search"
                placeholder="Search"
                className="search-bar"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr />
          <div className="password-show-container">
            <input
              id="checkbox"
              type="checkbox"
              className="checkbox"
              onChange={this.onShowPasswords}
            />
            <label className="password-show-text" htmlFor="checkbox">
              Show Passwords
            </label>
          </div>
          {searchResultsLen === 0 ? (
            <div className="no-password-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password-image"
              />
              <p className="no-passwords-heading">No Passwords</p>
            </div>
          ) : (
            <ul className="passwords-items-container">
              {filteredResults.map(each => (
                <ShowPassword
                  key={each.id}
                  usersDetails={each}
                  isPasswordEncrypted={isEncryptedPassword}
                  deleteItemFromList={this.deleteItemFromList}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default PasswordManager
