import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import img2 from '../assets/img2.jpg'; 

const HeroSection = ({ scrollTargetRef }) => {
  const handleScroll = () => {
    scrollTargetRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      textAlign="center"
      p={5}
      sx={{
        backgroundImage: `url(${img2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '500px',
      }}
    >
      <Typography variant="h3" gutterBottom paddingTop={25}>
        Welcome to DEV@Deakin
      </Typography>
      <Typography variant="h6" paragraph>
        Explore tutorials, articles and resources for Full-Stack Developers
      </Typography>
      <Button variant="contained" color="primary" onClick={handleScroll}>
        Get Started
      </Button>
    </Box>
  );
};

export default HeroSection;
