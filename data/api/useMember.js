import useSWR from "swr";
import axios from "axios";

function fetcher(url) {
  return axios.get(url).then((res) => res.data);
}

function useMember({
  memberId,
  revalidateOnFocus = false,
  revalidateOnReconnect = false,
}) {
  const { data, error, ...rest } = useSWR(
    memberId ? `api/members/${memberId}` : null,
    fetcher,
    {
      revalidateOnFocus,
      revalidateOnReconnect,
    }
  );
  return {
    member: data,
    isLoading: !error && !data,
    hasError: error,
    ...rest,
  };
}

export default useMember;
