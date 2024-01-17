import useRequest from "@/hooks/useRequest.js";

const Type = {
    Friend: 1,
    Group: 2,
}

const BaseUrl = '/relationship'

const RelationshipUrl = {
    Friends: BaseUrl + '/list'
}

// 获取好友列表
export const getFriends = (data) => {
    return useRequest({
        url: RelationshipUrl.Friends,
        method: 'get',
        params: {type: Type.Friend,...data}
    })
}