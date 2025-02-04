import { Container, Typography, IconButton, Card, CardContent } from '@mui/material';
import { useParams } from 'react-router';
import { useGetPostQuery } from '../store/posts-api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addFavouritePost, removeFavouritePost } from '../store/favourite-posts-slice';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Spinner from '../components/spinner';

const DetailedPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const { data: post, error, isLoading } = useGetPostQuery(postId || '');
  const dispatch = useDispatch();
  const favouritePosts = useSelector((state: RootState) => state.favouritePosts.favouritePosts);

  const handleToggleFavourite = () => {
    if (!post) return;
    if (favouritePosts.some((fav) => fav.id === post.id)) {
      dispatch(removeFavouritePost(post.id));
    } else {
      dispatch(addFavouritePost(post));
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <Container>Error loading post</Container>;

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Card sx={{ maxWidth: 600, width: '100%', p: 2, position: 'relative' }}>
        <IconButton
          onClick={handleToggleFavourite}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
        >
          {favouritePosts.some((fav) => fav.id === post?.id) ? (
            <StarIcon color="primary" />
          ) : (
            <StarBorderIcon />
          )}
        </IconButton>

        <CardContent>
          <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
            {post?.title}
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
            {post?.body}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DetailedPage;
