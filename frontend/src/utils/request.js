import { useSelector } from "react-redux";
const useRequest = () => {
  const login = useSelector((state) => state.auth);
  return login["token"];
};

export default useRequest;
