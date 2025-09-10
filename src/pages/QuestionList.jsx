import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Grid,
  Chip,
  Toolbar,
  Paper,
  CircularProgress,
} from "@mui/material";
import { ExpandMore, Delete } from "@mui/icons-material";
import { db } from "./firebase";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  query,
} from "firebase/firestore";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch questions (live)
  useEffect(() => {
    const q = query(collection(db, "questions")); // no orderBy — safer
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched questions:", data); // Debug
      setQuestions(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "questions", id));
    } catch (err) {
      console.error("Failed to delete question:", err);
      alert("Failed to delete question.");
    }
  };

  const filteredQuestions = questions.filter((q) => {
    const matchTitle = filterTitle
      ? q.title?.toLowerCase().includes(filterTitle.toLowerCase())
      : true;

    const matchTag = filterTag
      ? q.tags?.some((t) =>
          t.toLowerCase().includes(filterTag.toLowerCase())
        )
      : true;

    const matchDate = filterDate
      ? q.createdAt?.toDate?.().toISOString().slice(0, 10) === filterDate
      : true;

    return matchTitle && matchTag && matchDate;
  });

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 3, borderRadius: 3, boxShadow: 2 }}>
        <Toolbar
          sx={{ flexDirection: "column", alignItems: "flex-start", gap: 2 }}
        >
          <Typography variant="h6">Filter Questions</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Filter by Title"
                value={filterTitle}
                onChange={(e) => setFilterTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Filter by Tag"
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="date"
                label="Filter by Date"
                InputLabelProps={{ shrink: true }}
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </Paper>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredQuestions.map((q) => (
            <Grid item xs={12} md={6} key={q.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {q.title || "Untitled"}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <CardContent>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {q.details || "No details provided."}
                      </Typography>
                      <Box
                        sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}
                      >
                        {q.tags?.length > 0
                          ? q.tags.map((tag, idx) => (
                              <Chip key={idx} label={tag} size="small" />
                            ))
                          : null}
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {q.createdAt?.toDate
                          ? q.createdAt.toDate().toLocaleString()
                          : "Saving..."}
                      </Typography>
                    </CardContent>
                  </AccordionDetails>
                </Accordion>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <IconButton
                    onClick={() => handleDelete(q.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && filteredQuestions.length === 0 && (
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 3 }}
        >
          No questions found.
        </Typography>
      )}
    </Box>
  );
};

export default QuestionList;
