import useSWR from "swr";
import axios from "axios";

function fetcher(url) {
  return axios.get(url).then((res) => res.data);
}

function useOfficer(officerId) {
  const { data, error, ...rest } = useSWR(
    officerId ? `api/officers/${officerId}` : null,
    fetcher
  );
  return {
    officer: data,
    isLoading: !error && !data,
    hasError: error,
    ...rest,
  };
}

export default useOfficer;
