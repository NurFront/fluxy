import React, { useState, useEffect } from 'react';
import { db, collection, addDoc, getDocs, doc, updateDoc, getDoc, deleteDoc } from '../firebase';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

type Post = {
  id: string;
  text: string;
  email: string;
  likedBy: string[];
  createdAt: { seconds: number; nanoseconds: number };
};

type PostData = {
  text: string;
  email: string;
  likedBy: string[];
  createdAt: { seconds: number; nanoseconds: number };
};

const Posts = ({ userEmail }: { userEmail: string }) => {
  const [text, setText] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [likes, setLikes] = useState<number[]>([]);
  const [userLikes, setUserLikes] = useState<boolean[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const postsData: Post[] = querySnapshot.docs.map((doc) => {
          const data = doc.data() as PostData;
          return {
            id: doc.id,
            text: data.text,
            email: data.email,
            likedBy: data.likedBy || [],
            createdAt: data.createdAt,
          };
        });

        const sortedPosts = postsData.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds); // Сортировка по времени (старые сверху)
        setPosts(sortedPosts);
        setLikes(sortedPosts.map((post) => post.likedBy.length));
        setUserLikes(sortedPosts.map((post) => post.likedBy.includes(userEmail)));
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке постов:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userEmail]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const sendPost = async () => {
    if (text.trim() === '') return;

    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        text: text,
        email: userEmail,
        createdAt: new Date(),
        likedBy: [],
      });

      setPosts([...posts, { // Добавляем новое сообщение в конец массива
        id: docRef.id,
        text,
        email: userEmail,
        likedBy: [],
        createdAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
      }]);
      setLikes([...likes, 0]); // Добавляем лайки для нового сообщения
      setText('');
    } catch (error) {
      console.error('Ошибка при добавлении поста:', error);
    }
  };

  const countLike = async (index: number, postId: string, postEmail: string) => {
    if (postEmail === userEmail) {
      return;
    }

    try {
      const postRef = doc(db, 'posts', postId);
      const postSnap = await getDoc(postRef);

      if (postSnap.exists()) {
        const postData = postSnap.data() as PostData;
        let likedBy = postData.likedBy || [];

        if (likedBy.includes(userEmail)) {
          likedBy = likedBy.filter(email => email !== userEmail);
        } else {
          likedBy.push(userEmail);
        }

        await updateDoc(postRef, { likedBy });

        const newLikes = [...likes];
        newLikes[index] = likedBy.length;
        setLikes(newLikes);

        const newUserLikes = [...userLikes];
        newUserLikes[index] = likedBy.includes(userEmail);
        setUserLikes(newUserLikes);
      }
    } catch (error) {
      console.error('Ошибка при обновлении лайков:', error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await deleteDoc(doc(db, 'posts', postId));
      setPosts(posts.filter((post) => post.id !== postId));
      setLikes(likes.filter((_, index) => posts[index].id !== postId));
    } catch (error) {
      console.error('Ошибка при удалении поста:', error);
    }
  };

  return (
    <div>
      <div className="post-input-container">
        <textarea className="inputPost" value={text} onChange={handleChange} placeholder="Введите сообщение..." maxLength={100} />
        <button className="sendPost" onClick={sendPost}>
          <SendIcon className="sendPostIcon" />
        </button>
      </div>
      {loading ? (
        <div className="loading">Загрузка...</div>
      ) : (
        posts.length > 0 && (
          <div className="posted-texts">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className="posted-text"
                style={{
                  backgroundColor: post.email === userEmail ? 'lightgreen' : 'white',
                  marginLeft: post.email === userEmail ? (isMobile ? '100px' : '200px') : '0',
                  padding: isMobile ? '10px' : '15px',
                  width: isMobile ? '100%' : '300px',
                }}
              >
                <h3 style={{ color: post.email === userEmail ? 'gray' : 'black' }}>{post.email}</h3>
                <p>{post.text}</p>
                <button className={`like-btn ${userLikes[index] ? 'liked' : ''}`} onClick={() => countLike(index, post.id, post.email)}>
                  {userLikes[index] ? '🤍' : '🤍'} {likes[index]}
                </button>

                {post.email === userEmail && (
                  <button
                    className="delete-btn"
                    style={{
                      left: isMobile ? '-90px' : '10px',
                    }}
                    onClick={() => handleDeletePost(post.id)}
                  >
                    <DeleteIcon className="delete-icon" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Posts;
