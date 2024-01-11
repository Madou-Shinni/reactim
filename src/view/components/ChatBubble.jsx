import './index.mdule.css'
const ChatBubble = ({ content, isSender }) => {
    return (
        <div className={`chat-bubble ${isSender ? 'sender' : 'receiver'} inline-block`}>
            <p>{content}</p>
        </div>
    );
};

export default ChatBubble