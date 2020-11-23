import useSWR from "swr";
import axios from "axios";

function fetcher(url) {
  return axios.get(url).then((res) => res.data);
}

function useMemberSearch(search) {
  const { data, error, ...rest } = useSWR(
    !!search ? `api/members/search/${search}` : null,
    fetcher
  );
  return {
    results: data,
    isLoading: !error && !data,
    hasError: error,
    ...rest,
  };
}

export default useMemberSearch;
