import {useEffect, useState} from "react";
import {FriendList} from "../components/Friend.jsx";
import Header from "../components/Header.jsx";

import friendsData  from "../../data/friends.json";
import ChatInput from "../components/ChatInput.jsx";
import ChatPreview from "../components/ChatPreview.jsx";
import useWebSocket from "react-use-websocket";
const Home = () => {
    const [friends, setFriends] = useState(friendsData)
    const [messageHistory, setMessageHistory] = useState([]);

    const socketUrl = 'ws://localhost:9999/ws/conn?userId=1';
    const { sendMessage,sendJsonMessage , lastMessage,lastJsonMessage,getWebSocket, readyState } = useWebSocket(socketUrl);

    useEffect(() => {
        if (lastJsonMessage !== null) {
            setMessageHistory((prev) => prev.concat(lastJsonMessage));
        }
    }, [lastJsonMessage, setMessageHistory]);

    const handleClick = (content) => {
        sendJsonMessage({ type: 2,from: 1,to: 1, content });
    };

    return <div className={'w-full h-full'}>
        <div className="w-full min-h-screen bg-gray-100 flex">
            <div className="w-1/4 bg-gray-200 p-4">
                <FriendList friends={friends}/>
            </div>
            <div className="flex-1 p-4 relative bg-gradient-to-bl">
                <Header/>
                <ChatPreview messages={messageHistory}/>
                <div className={'absolute bottom-0 left-0 right-0'}>
                    <ChatInput onSendMessage={(content) => {handleClick(content)}} />
                </div>
            </div>
        </div>
    </div>
}

export default Home