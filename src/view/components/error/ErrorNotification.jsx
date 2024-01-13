import './index.mdule.css'
const ErrorNotification = ({errorMessage,onClose}) => {
    return <div className="error-notification">
        <div className="error-message">{errorMessage}</div>
        <button className="close-button" onClick={onClose}>
            Close
        </button>
    </div>
}

export default ErrorNotification