import useSWR from "swr";
import axios from "axios";

function fetcher(url) {
  return axios.get(url).then((res) => res.data);
}

function useOfficer({
  officerId,
  revalidateOnFocus = false,
  revalidateOnReconnect = false,
}) {
  const { data, error, ...rest } = useSWR(
    officerId ? `api/officers/${officerId}` : null,
    fetcher,
    { revalidateOnFocus, revalidateOnReconnect }
  );
  return {
    officer: data,
    isLoading: !error && !data,
    hasError: error,
    ...rest,
  };
}

export default useOfficer;
