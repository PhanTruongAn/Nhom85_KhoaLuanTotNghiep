// CustomHooks.js
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

class CustomHooks {
  static useQuery(queryKey, queryFn, options = {}) {
    return useQuery(queryKey, queryFn, {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 10,
      staleTime: 1000,
      ...options,
    });
  }
  static useInfiniteQuery(queryKey, queryFn, options = {}) {
    return useInfiniteQuery(queryKey, queryFn, {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 10,
      staleTime: 1000,
      ...options,
    });
  }
}

export default CustomHooks;
