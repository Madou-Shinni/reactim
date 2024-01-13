import {useRef, useEffect, useState} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ChatBubble from "./ChatBubble.jsx";

const ChatPreview = ({ messages,styles }) => {
    const [container,setContainer] = useState(null);

    useEffect(() => {
        // 滚动到底部
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [messages]);

    return (
        <div>
            <PerfectScrollbar containerRef={(ref) => setContainer(ref)} style={styles} options={{ suppressScrollY: false, useBothWheelAxes: true }}>
                {messages.map((message, index) => (
                    <div key={index} className={'flex flex-col p-4'}>
                        <ChatBubble content={message.content} isSender={message.sender} />
                    </div>
                ))}
            </PerfectScrollbar>
        </div>
    );
};

export default ChatPreview;