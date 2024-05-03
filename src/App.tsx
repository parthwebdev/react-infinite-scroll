import { useCallback, useRef, useState } from "react";
import Post from "./components/Post";
import usePosts from "./lib/usePosts";

function App() {
  const [pageParam, setPageParam] = useState<number>(1);
  const intObserver = useRef<IntersectionObserver | null>(null);
  const { results: posts, isLoading, error, hasMore } = usePosts({ pageParam });

  const lastPostRef = useCallback(
    (post: HTMLDivElement | null) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("Reached Last Post");
          setPageParam((prev) => prev + 1);
        }
      });

      if (post) {
        intObserver.current.observe(post);
      }
    },
    [isLoading, hasMore]
  );

  return (
    <div id="container">
      <h1>Infinite Scroll in React</h1>

      {error && <h2>{error}</h2>}

      <div className="posts-container">
        {posts.map((post, index) => {
          return posts.length === index + 1 ? (
            <Post key={post.id} post={post} ref={lastPostRef} />
          ) : (
            <Post key={post.id} post={post} />
          );
        })}
      </div>

      {isLoading && <h2>Loading...</h2>}
    </div>
  );
}

export default App;
