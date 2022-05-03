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

    const toggleFavorite = () => {
        setShoe (preShoe => (
            preShoe.map(item => (
                {...item,
                    favorite: !item.favorite}
            ))
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
    <Card sx={{ maxWidth: 345 }}>
        {shoe.map(shoe => (
                <CardActionArea key={shoe.id}>
                    <div className='cardContainer'>
                    {/* Favorite icon */}
                    <span className='heartIcon' onClick={toggleFavorite}>
                    {shoe.favorite? (
                        <FavoriteIcon />
                    ) : (
                        <FavoriteBorderIcon />
                    )}
                    </span>
                    <img src={shoe.image} 
                    height="100%"
                    width="100%"
                    alt="NMD_R1"
                    />
                    <div className='shoe-price'>
                        {shoe.price}
                    </div>

                    </div>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {shoe.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {shoe.variant}
                    </Typography>
                    <Typography variant="body3" color="text.primary">
                        {shoe.condition}
                    </Typography>
                    </CardContent>
                </CardActionArea> 
        ))}
    </Card>
    );
}
 
export default ShoeCard;