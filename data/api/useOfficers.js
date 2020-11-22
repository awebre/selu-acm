import useSWR from "swr";
import axios from "axios";

function fetcher(url) {
  return axios.get(url).then((res) => res.data);
}

function useOfficers() {
  const { data, error, ...rest } = useSWR("api/officers", fetcher);
  return {
    officers: data,
    isLoading: !error && !data,
    hasError: error,
    ...rest,
  };
}

export default useOfficers;
