import useRequest from "@/hooks/useRequest.js";

const BaseUrl = '/conversation'

const RelationshipUrl = {
    Friends: BaseUrl + '/list'
}

// 获取好友列表
export const getConversations = (data) => {
    return useRequest({
        url: RelationshipUrl.Friends,
        method: 'get',
        params: {...data}
    })
}