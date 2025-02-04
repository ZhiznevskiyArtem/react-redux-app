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
        if (favouritePosts.some(fav => fav.id === post.id)) {
            dispatch(removeFavouritePost(post.id));
        } else {
            dispatch(addFavouritePost(post));
        }
    };

    if (isLoading) return <Spinner/>
    if (error) return <Container>Error loading post</Container>;

    return (
        <Card sx={{ maxWidth: 600, width: '100%', p: 2, mt: 2 }}>
            <CardContent>
                <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>{post?.title}</Typography>
                <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>{post?.body}</Typography>
                <IconButton onClick={handleToggleFavourite} sx={{ display: 'block', mx: 'auto' }}>
                    {favouritePosts.some(fav => fav.id === post?.id) ? <StarIcon color="primary" /> : <StarBorderIcon />}
                </IconButton>
            </CardContent>
        </Card>
    );
};

export default DetailedPage;
