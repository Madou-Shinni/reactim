import {useNavigate, useSearchParams} from "react-router-dom";
import {UserUrl} from "@/api/user.js";
import ErrorNotification from "@/view/components/error/ErrorNotification.jsx";
import Loading from "@/view/components/loading/Loading.jsx";
import useRequest from "@/hooks/useRequest.js";
import {useEffect, useState} from "react";
import AxiosInstance from "@/hooks/axiosInstance.js";

const GithubLoginQuery = {
    clientId: import.meta.env.VITE_Github_ClientID,
    redirect_uri: import.meta.env.VITE_Github_Redirect_uri,
    scope: 'read:user'
}

const Login = () => {
    const navigate = useNavigate();
    const [query] = useSearchParams();
    const [error, setError] = useState()
    const [user, setUser] = useState()
    const code = query.get('code');
    const handleLogin = async (code) => {
        const {data,err} = await AxiosInstance({url: UserUrl.Login,params: {code: code}});
        if (err) {
            setError(err)
        }
        if (data) {
            setUser(data.user)
        }
    }

    useEffect(() => {
        if (user) {
            navigate(`/home/${user.id}`);
        }
        if (code) {
            handleLogin(code);
        }
    }, [user, navigate]);

    if (error) {
        return <ErrorNotification errorMessage={error} />;
    }
    if (code && !user) {
        return <Loading />;
    }





    const handleAccessLogin = () => {
        // 重定向到 GitHub OAuth 授权页面
        const url= `https://github.com/login/oauth/authorize?client_id=${GithubLoginQuery.clientId}&redirect_uri=${GithubLoginQuery.redirect_uri}&scope=${GithubLoginQuery.scope}`
        window.location.href = url;
    };

    return <div>
        <h2>Login with GitHub</h2>
        <button onClick={handleAccessLogin}>授权登录</button>
    </div>
}

export default Login