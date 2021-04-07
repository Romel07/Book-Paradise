import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';


const Home = () => {
    const useStyles = makeStyles({
        root: {
            width: 270,   
            height: 580,
            margin: 25, 
            backgroundColor: 'lightgray',                   
        },
    });
    const classes = useStyles();

    const [books, setBooks] = useState([])

    useEffect(() => {
        fetch('https://gentle-everglades-73994.herokuapp.com/books')
            .then(res => res.json())
            .then(data => setBooks(data))
    }, [])

    const history = useHistory();
    const handleBueBook = (bookId) => {
        history.push(`/book/${bookId}`)
    }

    return (
        <div>
        <Box display="flex" flexWrap="wrap">
        {books.length === 0 && <CircularProgress size="100px" color="secondary"/> }
            {                
                books.map(book =>                    
                    <div>                        
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="50%"
                                    image={book.imageURL}
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                    Book : {book.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                    Author : {book.author} <br/>
                                    Price US$ : {book.price}
                                                                        
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button onClick={()=>handleBueBook(`${book._id}`)} size="medium" color="primary" variant="contained">
                                    Buy Now
                                    </Button>
                            </CardActions>                           
                        </Card>                        
                        </div>
                    )                   
            } </Box>
        </div>
    );
};

export default Home;