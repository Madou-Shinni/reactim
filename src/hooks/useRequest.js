import useSWR from 'swr';
import AxiosInstance from '@/hooks/axiosInstance.js';

function useRequest(request, config) {
    const {
        data: response,
        error,
        mutate,
        isValidating,
    } = useSWR(request.url, () => AxiosInstance.request(request), config);

    return {
        data: response?.data,
        response,
        error,
        mutate,
        isValidating,
    };
}

export default useRequest;