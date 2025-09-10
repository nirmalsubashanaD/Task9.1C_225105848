import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import StarIcon from "@mui/icons-material/Star";

// Generate more than 3 tutorials
const tutorials = Array.from({ length: 6 }).map(() => ({
  title: faker.lorem.words(4),
  description: faker.lorem.words(8),
  image: `https://picsum.photos/seed/${faker.string.uuid()}/300/200`,
  rating: 5,
  author: faker.name.firstName() + " " + faker.name.lastName(),
}));

const FeaturedTutorials = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleTutorials = showAll ? tutorials : tutorials.slice(0, 3);

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
        Featured Tutorials
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {visibleTutorials.map((tutorial, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={tutorial.image}
                alt={tutorial.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" fontWeight="bold">
                  {tutorial.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {tutorial.description}
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  borderTop="1px dashed grey"
                  pt={1}
                >
                  <StarIcon sx={{ color: "#FFA000", mr: 0.5 }} />
                  <Typography variant="body2" fontWeight="bold" sx={{ mr: 1 }}>
                    {tutorial.rating}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {tutorial.author}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* See all tutorials button */}
      {!showAll && tutorials.length > 3 && (
        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => setShowAll(true)}
            sx={{
              borderRadius: "20px",
              px: 4,
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor: "#e0e0e0",
              color: "black", 
              "&:hover": { backgroundColor: "#d5d5d5" },
            }}
          >
            See all tutorials
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FeaturedTutorials;
