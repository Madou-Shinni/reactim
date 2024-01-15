import ChatInput from "@/view/components/ChatInput.jsx";

const ConversationList = (props) => {
    // 假设这是会话数据
    const dummyConversations = [
        { id: 1, name: 'Alice',avatar:'https://pic2.zhimg.com/v2-d7c21575f6d9e229a65cc0889567d71b_r.jpg?source=1940ef5c', lastMessage: 'Hello', unreadCount: 2 },
        { id: 2, name: 'Bob', avatar:"https://th.bing.com/th/id/OIP.tu4WgcUxdQ8sPS6M4oMJOAHaHa?rs=1&pid=ImgDetMain", lastMessage: 'How are you?', unreadCount: 100 },
        // 其他会话数据...
    ];

    // const handlerOnSendMessage = (content) => {
    //     console.log('content',content)
    // }

    return (
        <div className={`conversation-list p-4 ${props.className}`}>
            <h2 className="text-2xl font-bold mb-4">会话列表</h2>
            {/* Search Bar */}
            {/*<ChatInput onSendMessage={handlerOnSendMessage}/>*/}

            {/* Conversation List */}
            <div className="conversation-list-container">
                {dummyConversations.map(conversation => (
                    <Conversation key={conversation.id} conversation={conversation}
                                  className={'w-full'}
                    />
                ))}
            </div>
        </div>
    );
};

export {ConversationList};

const Conversation = ({ conversation,...props }) => {
    const { id, name, lastMessage, unreadCount } = conversation;

    return (
        <div className={`conversation-item flex items-center mb-2 ${props.className}`}>
            <div className="avatar mr-[10px]">
                <img className={'w-10 h-10 rounded-full'} src="https://pic2.zhimg.com/v2-d7c21575f6d9e229a65cc0889567d71b_r.jpg?source=1940ef5c" alt=""/>
            </div>
            <div className="info flex-grow">
                <div className="name">{name}</div>
                <div className="last-message text-[13px] text-gray-400">{lastMessage}</div>
            </div>
            {unreadCount > 0 && <div className="unread-count flex items-center justify-center w-[40px] h-[40px] ml-[10px] rounded-[50%] bg-red-600 text-white text-center p-1">
                {unreadCount > 99 ? '99+' : unreadCount}
            </div>
            }
        </div>
    );
};

export {Conversation};