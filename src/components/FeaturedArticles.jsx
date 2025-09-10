import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import StarIcon from '@mui/icons-material/Star';

// Generate more than 3 articles
const articles = Array.from({ length: 6 }).map(() => ({
  title: faker.lorem.words(4),
  description: faker.lorem.words(8),
  image: `https://picsum.photos/seed/${faker.string.uuid()}/300/200`,
  rating: 5,
  author: faker.name.firstName() + " " + faker.name.lastName(),
}));

const FeaturedArticles = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleArticles = showAll ? articles : articles.slice(0, 3);

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
        Featured Articles
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {visibleArticles.map((article, index) => (
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
                image={article.image}
                alt={article.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" fontWeight="bold">
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {article.description}
                </Typography>
                <Box display="flex" alignItems="center" borderTop="1px dashed grey" pt={1}>
                  <StarIcon sx={{ color: "#FFA000", mr: 0.5 }} />
                  <Typography variant="body2" fontWeight="bold" sx={{ mr: 1 }}>
                    {article.rating}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {article.author}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* See all articles button */}
      {!showAll && articles.length > 3 && (
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
              "&:hover": { backgroundColor: "#d5d5d5" }
            }}
          >
            See all articles
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FeaturedArticles;
