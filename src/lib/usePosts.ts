import { useEffect, useState } from "react";
import axios from "axios";
import getPosts, { Post } from "./getPosts";

interface Props {
  pageParam?: number;
}

const usePosts = ({ pageParam = 1 }: Props) => {
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const controller = new AbortController();
    const { signal } = controller;

    getPosts({ pageParam, options: { signal } })
      .then((data) => {
        setHasMore(data.length > 0);
        setResults((prev) => [...prev, ...data]);
      })
      .catch((error) => {
        if (signal.aborted) {
          return;
        }
        if (axios.isAxiosError(error)) {
          console.log(error.name);
          setError(error.message);
        } else {
          console.error(error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [pageParam]);

  return { results, isLoading, error, hasMore, pageParam };
};

export default usePosts;
