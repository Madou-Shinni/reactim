import {useEffect, useRef, useState} from "react";
import {FriendList} from "../components/Friend.jsx";
import Header from "../components/Header.jsx";

import friendsData  from "../../data/friends.json";
import ChatInput from "../components/ChatInput.jsx";
import ChatPreview from "../components/ChatPreview.jsx";
import useWebSocket from "react-use-websocket";
import {useParams} from "react-router-dom";
import {ConversationList} from "@/view/components/Conversation.jsx";
import TabSwitcher from "@/view/components/TabSwitcher.jsx";

const MessageType = {
    Private: 2
}

const Home = () => {
    const params = useParams()
    const userId = parseInt(params.id, 10)

    const [title, setTitle] = useState('')
    const [friends, setFriends] = useState(friendsData)
    const [messageHistory, setMessageHistory] = useState([]);
    const [message,setMessage] = useState({from:userId})

    const socketUrl = `ws://localhost:9999/ws/conn?userId=${userId}`;
    const {sendJsonMessage,lastJsonMessage} = useWebSocket(socketUrl);

    useEffect(() => {
        if (lastJsonMessage !== null) {
            // 是否是自己发送的消息
            lastJsonMessage.sender = lastJsonMessage.from === userId;
            setMessageHistory((prev) => prev.concat(lastJsonMessage));
        }
    }, [lastJsonMessage, setMessageHistory]);

    const handleClick = (content) => {
        message.content = content
        setMessage(message)
        sendJsonMessage(message)
    };

    const handleFriendClick = (friend) => {
        setTitle(friend.name+friend.id)
        setMessage({...message, type:MessageType.Private, to:friend.id})
    };

    return <div className={'w-full h-full'}>
        <div className="w-full min-h-screen bg-gray-100 flex">
            <div className="w-1/4 bg-gray-200 p-4">
                <TabSwitcher>
                    <FriendList className={'w-full'} tabLabel="Friends" friends={friends} onFriendClick={handleFriendClick}/>
                    <ConversationList className={'w-full'} tabLabel="Conversations"/>
                </TabSwitcher>
            </div>
            <div className="flex-1 p-4 h-100vh relative bg-gradient-to-bl">
                <Header title={title}/>
                <ChatPreview messages={messageHistory} styles={{height:'90vh'}}/>
                <div className={'absolute bottom-[-10px] left-0 right-0'}>
                    <ChatInput onSendMessage={(content) => {handleClick(content)}} />
                </div>
            </div>
        </div>
    </div>
}

export default Home