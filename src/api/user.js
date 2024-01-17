import useRequest from "@/hooks/useRequest.js";

const BaseUrl = '/user'

export const UserUrl = {
    Login: BaseUrl+'/oauth2/github/callback',
    Friends: BaseUrl + '/'
}