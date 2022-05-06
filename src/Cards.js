// React
import React, { useState, useEffect } from 'react';
// Material UI
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
// Carousel Library
import Carousel from 'react-elastic-carousel';


const ShoeCard = () => {
    // Declaring the states
    const [shoes, setShoes] = useState([])
    const [isHover, setIsHover] = useState(-1)

    // Fetching data
    useEffect(() => {
        fetch('http://localhost:8000/shoe')
        .then(res => res.json())
        .then(data => setShoes(data))
        .catch(error => {
            console.error('Error: ', error)
        })
    }, ['http://localhost:8000/shoe'])

    // Like button
    const toggleFavorite = (shoe) => {
        setShoes (preShoe => (
            preShoe.map( item => {
                if (item === shoe){
                    item.favorite = !item.favorite
                }
                    return ( {...item} )
            })
        ))
    }

    // Separate the carousel
    const breakPoints = [
        { width: 1, itemsToShow: 1, itemsToScroll: 1 },
        { width: 450, itemsToShow: 2, itemsToScroll: 2 },
        { width: 650, itemsToShow: 3, itemsToScroll: 3},
        { width: 850, itemsToShow: 4, itemsToScroll: 4}
    ];

    const handleMouseEnter = (index) => {
        setIsHover(index)
    }

    return ( 
    <Stack  
        direction='row' 
        justifyContent='flex-start' 
        alignItems='flex-start'
        spacing={1}
    >
    <Carousel breakPoints={breakPoints}>
        {shoes.map((shoe, index) => (
        <Card   
            key={index}   
            onMouseEnter={() => handleMouseEnter(index)} 
            onMouseLeave={() => setIsHover(-1)}
            sx={{ height: 300, width: 200 }}
        >
            <CardActionArea>
                <Typography className='cardContainer' component='div'>
                    {/* Like button */}
                    <Typography className='heartIcon' onClick={() => toggleFavorite(shoe)} component='div'>
                        { shoe.favorite? (
                            <FavoriteIcon fontSize='90%' />
                        ) : (
                            <FavoriteBorderIcon fontSize='90%' />
                        )}
                    </Typography>

                    {/* Hovering */}
                    <Typography className={`shoe-price${isHover === index? 'Up' : ''}`} component='div'>
                        {shoe.price}
                    </Typography>

                    <img 
                        src={shoe.image} 
                        height='100%'
                        width='100%'
                        alt={shoe.name}
                    />
                </Typography>

                <CardContent className='cardContent'>
                    <Typography gutterBottom variant='subtitle1' component='div' fontSize='80%'>
                        {shoe.name}
                    </Typography>
                    <Typography variant='body1' color='text.secondary' fontSize='80%'>
                        {shoe.variant}
                    </Typography>
                    <Typography variant='body2' color='text.primary' fontSize='80%'>
                        {shoe.condition}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        ))}
    </Carousel>
    </Stack>
    )
}
 
export default ShoeCard;