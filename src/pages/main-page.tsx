import { useState, useDeferredValue } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Container, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useGetPostsQuery } from '../store/posts-api';
import { RootState } from '../store/store';
import { addFavouritePost, removeFavouritePost } from '../store/favourite-posts-slice';
import { Post } from '../types/post';
import Spinner from '../components/spinner';

const MainPage = () => {
    const { data: posts, error, isLoading } = useGetPostsQuery();
    const [searchTerm, setSearchTerm] = useState('');
    const deferredSearchTerm = useDeferredValue(searchTerm);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const favouritePosts = useSelector((state: RootState) => state.favouritePosts.favouritePosts);

    const handleToggleFavourite = (post: Post) => {
        if (favouritePosts.some(fav => fav.id === post.id)) {
            dispatch(removeFavouritePost(post.id));
        } else {
            dispatch(addFavouritePost(post));
        }
    };

    const filteredPosts = posts?.filter(post => 
        post.title.toLowerCase().includes(deferredSearchTerm.toLowerCase())
    ) || [];

    if (isLoading) return <Spinner/>
    if (error) return <Container>Error loading posts</Container>;

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', p: 2, gap: 2 }}>
            <TextField 
                label="Search by title"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <List>
                {filteredPosts.map(post => (
                    <ListItem 
                        key={post.id} 
                        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <ListItemText 
                            primary={post.title}
                            onClick={() => navigate(`/post/${post.id}`)}
                            sx={{ cursor: 'pointer' }}
                        />
                        <IconButton onClick={() => handleToggleFavourite(post)}>
                            {favouritePosts.some(fav => fav.id === post.id) ? <StarIcon color="primary" /> : <StarBorderIcon />}
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default MainPage;
