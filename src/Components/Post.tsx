import { useEffect, useState } from "react";
import { IPost } from "../App";
import './Post.css';

export interface IComments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface IPropsPost {
  selectedPost: IPost;
  setSelectedPost: React.Dispatch<React.SetStateAction<IPost | null>>;
}

export default function Post (props: IPropsPost) {
  
  const [comments, setComments] = useState<IComments[]>([]);
  let counter = 0;

  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${props.selectedPost.id}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response.status);
      })
      .then((json) => {
        setComments(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.selectedPost.id]);

  return (
    <div className="selectedPost">
      <h1 className="title">Пост № {props.selectedPost.id}</h1>
      <p>{props.selectedPost.body}</p>
      <h2 className="title">Комментарии</h2>
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <h3> Комментарий № {++counter}</h3>
          {comment.body}</div>
      ))}
      <h3 className="btnBack" onClick={()=> props.setSelectedPost(null)}>Назад</h3>
    </div>
  );
}
