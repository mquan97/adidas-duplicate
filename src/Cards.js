import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import 'animate.css';

const ShoeCard = () => {
    const [shoe, setShoe] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/shoe')
        .then(res => res.json())
        .then(data => setShoe(data))
    }, ['http://localhost:8000/shoe'])

    const toggleFavorite = (shoe) => {

        setShoe (preShoe => (
            preShoe.map(item => {
                if (item === shoe){
                    item.favorite = !item.favorite
                }
                    return (
                        {...item}
                    )
                    
                }
            )
        ))
    }

    // let id = null;
    // const handleMouseEnter = () => {
    //     let elem = document.querySelector("#shoe-price");   
    //     let pos = 94
    //     clearInterval(id);
    //     id = setInterval(frame, 10);
    //     function frame() {
    //         if (pos == 80) {
    //         clearInterval(id);
    //         } else {
    //         pos--; 
    //         elem.style.bottom = pos + '%'; 
    //         }
    //     }
    // }


    return ( 
    <Stack  direction="row" 
            justifyContent="flex-start" 
            alignItems="flex-start"
            spacing={1}
            
    >
    {shoe.map((shoe, index) => (
    <Card sx={{ height: 300, width: 200 }}>
        
                <CardActionArea>
                    <div className='cardContainer'>
                    {/* Favorite icon */}
                    <span className='heartIcon' onClick={() => toggleFavorite(shoe)}>
                    { shoe.favorite? (
                        <FavoriteIcon fontSize='90%'/>
                    ) : (
                        <FavoriteBorderIcon fontSize='90%'/>
                    )}
                    </span>
                    <img src={shoe.image} 
                    height="100%"
                    width="100%"
                    alt={shoe.name}
                    />
                    <div className='shoe-price'>
                        {shoe.price}
                    </div>

                    </div>
                    <CardContent className='cardContent'>
                    <Typography gutterBottom variant="subtitle1" component="div" fontSize="80%">
                        {shoe.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" fontSize="80%">
                        {shoe.variant}
                    </Typography>
                    <Typography variant="body2" color="text.primary" fontSize="80%">
                        {shoe.condition}
                    </Typography>
                    </CardContent>
                </CardActionArea>
        
        
    </Card>
    ))}
    </Stack>
    );
}
 
export default ShoeCard;