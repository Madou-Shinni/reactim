import {useNavigate, useSearchParams} from "react-router-dom";
import {UserUrl} from "@/api/user.js";
import ErrorNotification from "@/view/components/error/ErrorNotification.jsx";
import Loading from "@/view/components/loading/Loading.jsx";
import useRequest from "@/hooks/useRequest.js";

const GithubLoginQuery = {
    clientId: import.meta.env.VITE_Github_ClientID,
    redirect_uri: import.meta.env.VITE_Github_Redirect_uri,
    scope: 'read:user'
}

const Login = () => {
    const navigate = useNavigate();
    const [query] = useSearchParams();
    const code = query.get('code');
    const {data,error} = useRequest({url: UserUrl.Login, params: {code: code}})
    if (error) {
        return <ErrorNotification errorMessage={error.message} onClose={()=>{navigate(`/login/github`);}} />;
    }
    if (code && !data) {
        return <Loading/>;
    }
    if (data) {
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate(`/home/${data.user.id}`);
        return
    }


    const handleAccessLogin = () => {
        // 重定向到 GitHub OAuth 授权页面
        const url = `https://github.com/login/oauth/authorize?client_id=${GithubLoginQuery.clientId}&redirect_uri=${GithubLoginQuery.redirect_uri}&scope=${GithubLoginQuery.scope}`
        window.location.href = url;
    };

    return <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">Login with GitHub</h2>
            <button
                className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                onClick={handleAccessLogin}
            >
                Login with GitHub
            </button>
        </div>
    </div>
}

export default Login