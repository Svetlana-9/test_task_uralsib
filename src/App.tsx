import React, { useEffect, useState } from "react";
import "./App.css";
import Post from "./Components/Post";
export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function App() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response.status);
      })
      .then((json) => {
        setPosts(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return selectedPost ? (
    <Post setSelectedPost={setSelectedPost} selectedPost={selectedPost} />
  ) : (
    <div className="app">
      <h1 className="title">Список постов</h1>
      <div className="posts">
        {posts.map((post: IPost) => (
          <div
            className="post"
            key={post.id}
            onClick={() => setSelectedPost(post)}
          >
            <h3>Пост № {post.id}</h3>
            <p>{post.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
