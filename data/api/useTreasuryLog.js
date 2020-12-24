import useSWR from "swr";
import axios from "axios";

function fetcher(url) {
  return axios.get(url).then((res) => res.data);
}

function useTreasuryLog({ year }) {
  const { data, error, ...rest } = useSWR(
    year ? `api/treasury/${year}` : null,
    fetcher
  );
  return {
    log: data,
    isLoading: !error && !data,
    hasError: error,
    ...rest,
  };
}

export default useTreasuryLog;
