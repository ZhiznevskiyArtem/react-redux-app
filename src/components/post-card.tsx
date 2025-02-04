import { Card } from '@mui/material';

type CardProps = {
    id: number,
    title: string,
    description: string,
}

const PostCard = ({id, title, description}: CardProps) => {

        return (
            <Card>
                {id}
                {title}
                {description}
            </Card>
        )
};

export default PostCard