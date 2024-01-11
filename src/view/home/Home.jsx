import {useEffect, useState} from "react";
import {FriendList} from "../components/Friend.jsx";
import Header from "../components/Header.jsx";

import friendsData  from "../../data/friends.json";
import ChatInput from "../components/ChatInput.jsx";
import ChatPreview from "../components/ChatPreview.jsx";
const Home = () => {
    const [friends, setFriends] = useState(friendsData)
    const [messages, setMessages] = useState([])
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // 创建 WebSocket 连接
        const newSocket = new WebSocket('ws://localhost:8080/ws/conn?userId=1'); // 替换为你的 WebSocket 服务器地址

        // 设置消息接收处理程序
        newSocket.onmessage = (event) => {
            const receivedMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        };

        newSocket.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

        // 设置关闭处理程序
        newSocket.onclose = () => {
            console.log('WebSocket Connection Closed');
        };

        // 将新的 WebSocket 对象存储在 state 中
        setSocket(newSocket);

        // 在组件卸载时关闭 WebSocket 连接
        return () => {
            newSocket.close();
        };
    }, []); // 空数组表示只在组件加载时运行一次

    const sendMessage = (content) => {
        if (socket && content.trim() !== '') {
            // 发送消息到服务器
            socket.send(JSON.stringify({ type: 2,from: 1,to: 1, content }));
        }
    };

    return <div className={'w-full h-full'}>
        <div className="w-full min-h-screen bg-gray-100 flex">
            <div className="w-1/4 bg-gray-200 p-4">
                <FriendList friends={friends}/>
            </div>
            <div className="flex-1 p-4 relative bg-gradient-to-bl">
                <Header/>
                <ChatPreview messages={messages}/>
                <div className={'absolute bottom-0 left-0 right-0'}>
                    <ChatInput onSendMessage={(content) => {sendMessage(content)}} />
                </div>
            </div>
        </div>
    </div>
}

export default Home