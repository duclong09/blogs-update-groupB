import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Comment.css";
import "bootstrap/dist/css/bootstrap.min.css";
function Comment() {
  const [comments, setComments] = useState([]);
  // Tương tự như componentDidMount và componentDidUpdate:
  useEffect(() => {
    // Cập nhập document title sử dụng browser API
    fetch("/get-comment")
      .then((res) => res.json())
      .then((res) => setComments(res.data))
      .catch(() => setComments([]));
  });
  const addComment = (e) => {
    e.preventDefault();
    const commentUser = e.target.elements.commentUser.value.trim();
    const commentContent = e.target.elements.commentContent.value.trim();
    if (commentUser && commentContent) {
      const commentObject = { commentUser, commentContent };
      // Them comment vao db
      axios
        .post("/create-comment", commentObject)
        .then((res) => {
          console.log("them thanh cong!" + res.data);
        })
        .catch((err) => {
          console.log("them that bai!" + err);
        });
      // Xóa trắng mục sau khi input nhận xtes
      e.target.elements.commentUser.value = "";
      e.target.elements.commentContent.value = "";
    }
  };
  const deleteComment = (id) => {
    axios.delete('/delete-comment/'+ id).then(res => {
      console.log(res);
      console.log(res.data);

      const cms = comments.filter(item => item._id !== id);
      setComments(cms);
    })
    alert("Comment has been deleted! " + id);
  }
  return (
    <section className="section-comment">
      <h1>Your comment</h1>
      <form onSubmit={addComment}>
        <input
          type="text"
          className="Comment"
          name="commentUser"
          placeholder="Your name"
        />
        <textarea
          className="Comment"
          name="commentContent"
          placeholder="Add a comment"
        ></textarea>

        <button className="btn btn-primary" type="submit">
          Add Comment
        </button>
      </form>

      {comments.length > 0
        ? comments.map((el, index) => (
            <article className="showComment" key={index}>
              <img className="show avatar" src="" alt="Avatar" />
              <div className="show content">
                <p>
                  <strong>{el.commentUser}</strong> <br /> {el.commentContent}
                </p>
              </div>
              <button className="btn btn-primary btn-delete-comment" onClick={() => deleteComment(el._id)}>Delete</button>
            </article>
          ))
        : null}
    </section>
  );
}
export default Comment;
