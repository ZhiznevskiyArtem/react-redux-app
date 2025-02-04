import { Card, CardContent, Typography, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useNavigate } from 'react-router';
import { Post } from '../types/post';

type PostCardProps = {
  post: Post;
  isFavourite: boolean;
  onToggleFavourite: (post: Post) => void;
};

const PostCard = ({ post, isFavourite, onToggleFavourite }: PostCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      key={post.id}
      sx={{
        mb: 2,
        transition: '0.3s',
        '&:hover': { boxShadow: 6, cursor: 'pointer' },
      }}
      onClick={() => navigate(`/post/${post.id}`)}
    >
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">{post.title}</Typography>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavourite(post);
          }}
        >
          {isFavourite ? <StarIcon color="primary" /> : <StarBorderIcon />}
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default PostCard;
