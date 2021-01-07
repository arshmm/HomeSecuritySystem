import Axios from "axios";
import { useSelector } from "react-redux";
const useRequest = () => {
  const auth = useSelector((state) => state.auth);

  const makeRequest = async (url, type, body = null) => {
    const resD = await Axios.request({
      method: type,
      url: `/api/${url}`,
      headers: {
        authenticationToken: auth.token,
      },
      body,
    });
    return resD;
  };

  return {
    token: auth.token,
    id: auth.id,
    makeRequest,
  };
};

export default useRequest;
