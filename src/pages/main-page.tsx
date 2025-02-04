import { useState, useDeferredValue } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, TextField, List, Paper } from '@mui/material';
import { useGetPostsQuery } from '../store/posts-api';
import { RootState } from '../store/store';
import { addFavouritePost, removeFavouritePost } from '../store/favourite-posts-slice';
import { Post } from '../types/post';
import Spinner from '../components/spinner';
import PostCard from '../components/post-card';

const MainPage = () => {
  const { data: posts, error, isLoading } = useGetPostsQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const dispatch = useDispatch();
  const favouritePosts = useSelector((state: RootState) => state.favouritePosts.favouritePosts);

  const handleToggleFavourite = (post: Post) => {
    if (favouritePosts.some((fav) => fav.id === post.id)) {
      dispatch(removeFavouritePost(post.id));
    } else {
      dispatch(addFavouritePost(post));
    }
  };

  const filteredPosts =
    posts?.filter((post) => post.title.toLowerCase().includes(deferredSearchTerm.toLowerCase())) ||
    [];

  if (isLoading) return <Spinner />;
  if (error) return <Container>Error loading posts</Container>;

  return (
    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', p: 2, gap: 3 }}>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <TextField
          label="Search by title"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Paper>
      <List sx={{ width: '100%' }}>
        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            isFavourite={favouritePosts.some((fav) => fav.id === post.id)}
            onToggleFavourite={handleToggleFavourite}
          />
        ))}
      </List>
    </Container>
  );
};

export default MainPage;
