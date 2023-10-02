const CredView = ({chageToList}) => {

  const listUpdater =() => {
    chageToList(false)
  };
    return (
      <div className="cred-container">
            <div className="back-section" onClick={listUpdater}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.27206 7.29402C1.90931 7.6845 1.90931 8.31863 2.27206 8.7091L6.91517 13.7071C7.27792 14.0976 7.86701 14.0976 8.22976 13.7071C8.5925 13.3167 8.5925 12.6825 8.22976 12.2921L5.1682 8.99961H14.0714C14.585 8.99961 15 8.55291 15 8C15 7.44709 14.585 7.00039 14.0714 7.00039H5.1711L8.22685 3.70793C8.5896 3.31745 8.5896 2.68333 8.22685 2.29285C7.86411 1.90238 7.27502 1.90238 6.91227 2.29285L2.26916 7.2909L2.27206 7.29402Z" fill="#828CAE"/>
                </svg>
            </div>
            <div className="cred-section">
                    <h3>Username</h3>
                    <div className="username">
                       <p>example@gmail.com</p> 
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z" stroke="#828CAE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5" stroke="#828CAE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <h3>Password</h3>
                    <div className="password">
                      <p> ********************** </p>
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z" stroke="#828CAE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5" stroke="#828CAE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    </div>
            </div>
            <div className="button-section ">
                    <button >Fill Credentials</button>
            </div>
      </div>
    )
  }
  
  export default CredView
  