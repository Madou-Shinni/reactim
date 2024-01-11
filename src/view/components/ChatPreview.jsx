import { useRef, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ChatBubble from "./ChatBubble.jsx";

const ChatPreview = ({ messages }) => {
    const scrollbarRef = useRef(null);

    useEffect(() => {
        // 滚动到底部
        if (scrollbarRef.current) {
            const container = scrollbarRef.current;
            container.scrollTop = container.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="p-4">
            <PerfectScrollbar ref={scrollbarRef} options={{ suppressScrollY: false, useBothWheelAxes: true }}>
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