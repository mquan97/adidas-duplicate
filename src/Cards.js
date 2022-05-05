import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Stack from '@mui/material/Stack';
import { useState, useEffect, useRef } from 'react';
import Carousel from "react-elastic-carousel";

import 'animate.css';

const breakPoints = [
    { width: 1, itemsToShow: 1, itemsToScroll: 1 },
    { width: 450, itemsToShow: 2, itemsToScroll: 2 },
    { width: 650, itemsToShow: 3, itemsToScroll: 3},
    { width: 850, itemsToShow: 4, itemsToScroll: 4},
  ];

const ShoeCard = () => {
    const [shoes, setShoes] = useState([])

    const priceTagRef = useRef()

    useEffect(() => {
        fetch('http://localhost:8000/shoe')
        .then(res => res.json())
        .then(data => setShoes(data))
    }, ['http://localhost:8000/shoe'])

    const toggleFavorite = (shoe) => {

        setShoes (preShoe => (
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


    const [isHover, setIsHover] = useState(-1)

    const handleMouseEnter = (index) => {
        setIsHover(index)
    }

    return ( 
    <Stack  direction="row" 
            justifyContent="flex-start" 
            alignItems="flex-start"
            spacing={1}

    >
        <Carousel breakPoints={breakPoints}>
    {shoes.map((shoe, index) => (
    <Card key={index}   onMouseEnter={() => handleMouseEnter(index)} 
                        onMouseLeave={() => setIsHover(-1)}
                        sx={{ height: 300, width: 200 }}>
        
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
                    {/* shoe price */}
                    <div ref={priceTagRef} className={`shoe-price${isHover === index? "Up" : ""}`}>
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
    </Carousel>
    </Stack>
    );
}
 
export default ShoeCard;