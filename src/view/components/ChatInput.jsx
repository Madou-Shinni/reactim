import { useState } from 'react';
const ChatInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            onSendMessage(message);
            setMessage('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    return <div className="flex items-end p-4">
        <div className={'flex-1'}>
            <input
                type="text"
                placeholder=""
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                className="p-2 outline-none border border-gray-300 rounded w-full"
            />
        </div>
    </div>
};

export default ChatInput;