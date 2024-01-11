const Friend = ({friend}) => {
    return <li className="flex items-center mb-2">
        <img
            src={friend.avatar}
            alt={friend.name}
            className="w-10 h-10 rounded-full mr-2"
        />
        <div className={'border-b border-gray-300 w-full'}>
            <p className="w-full font-bold">{friend.name}</p>
            <p className="w-full text-gray-500">{friend.status}</p>
        </div>
    </li>
}

export default Friend


const FriendList = ({ friends }) => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">好友列表</h2>
            <ul>
                {friends.map((friend) => (
                    <Friend key={friend.id} friend={friend} />
                ))}
            </ul>
        </div>
    );
};

export {FriendList}