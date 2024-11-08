import {
  useQuery as useReactQuery,
  useInfiniteQuery as useReactInfiniteQuery,
} from "@tanstack/react-query";

const CustomHooks = {
  useQuery: (queryKey, queryFn, options = {}) => {
    return useReactQuery(queryKey, queryFn, {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 10,
      staleTime: 1000,
      ...options,
    });
  },
  useInfiniteQuery: (queryKey, queryFn, options = {}) => {
    return useReactInfiniteQuery(queryKey, queryFn, {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 10,
      staleTime: 1000,
      ...options,
    });
  },
};

export default CustomHooks;
