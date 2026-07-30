import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Chip,
  Alert,
} from "@mui/material";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

import { askAI } from "../services/ai";

interface Source {
  fileId: string;
  fileName: string;
}

const AIChat = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || loading) return;

    try {
      setLoading(true);
      setError("");
      setAnswer("");
      setSources([]);

      const res = await askAI(trimmedQuestion);

      setAnswer(
        res.answer || "CloudVault AI couldn't generate an answer."
      );

      setSources(res.sources || []);
    } catch (err: any) {
      console.error("AI Chat Error:", err);

      setError(
        err?.response?.data?.message ||
          "CloudVault AI couldn't process your question."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleAsk();
    }
  };

  const exampleQuestions = [
    "Summarize the main topics in my documents",
    "What technologies are mentioned in my files?",
    "Find important points from my uploaded documents",
  ];

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: "1000px",
        mx: "auto",
      }}
    >
      {/* Header */}

      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 1,
          }}
        >
          <AutoAwesomeRoundedIcon
            sx={{
              fontSize: 38,
            }}
          />

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
            }}
          >
            CloudVault AI
          </Typography>
        </Box>

        <Typography color="text.secondary">
          Ask questions across your uploaded documents using AI-powered
          retrieval.
        </Typography>
      </Box>

      {/* Question box */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 600,
          }}
        >
          Ask your Vault
        </Typography>

        <TextField
          fullWidth
          multiline
          minRows={3}
          maxRows={7}
          value={question}
          placeholder="Ask something about your uploaded documents..."
          onChange={(event) =>
            setQuestion(event.target.value)
          }
          onKeyDown={handleKeyDown}
          disabled={loading}
        />

        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
          >
            Enter to ask • Shift + Enter for a new line
          </Typography>

          <Button
            variant="contained"
            onClick={handleAsk}
            disabled={loading || !question.trim()}
            endIcon={
              loading ? undefined : <SendRoundedIcon />
            }
          >
            {loading ? "Thinking..." : "Ask AI"}
          </Button>
        </Box>
      </Paper>

      {/* Suggestions */}

      {!answer && !loading && !error && (
        <Box sx={{ mt: 3 }}>
          <Typography
  variant="body2"
  color="text.secondary"
  sx={{ mb: 1.5 }}
>
            Try asking:
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            {exampleQuestions.map((example) => (
              <Chip
                key={example}
                label={example}
                variant="outlined"
                onClick={() => setQuestion(example)}
                sx={{
                  cursor: "pointer",
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Loading */}

      {loading && (
        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: 4,
            textAlign: "center",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <CircularProgress size={32} />

          <Typography
            sx={{
              mt: 2,
              fontWeight: 600,
            }}
          >
            Searching your CloudVault...
          </Typography>

          <Typography
  variant="body2"
  color="text.secondary"
  sx={{ mt: 0.5 }}
>
            Finding relevant information and generating an answer.
          </Typography>
        </Paper>
      )}

      {/* Error */}

      {error && (
        <Alert
          severity="error"
          sx={{
            mt: 3,
          }}
        >
          {error}
        </Alert>
      )}

      {/* Answer */}

      {answer && !loading && (
        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: { xs: 2.5, md: 3 },
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
            }}
          >
            <AutoAwesomeRoundedIcon />

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
              }}
            >
              AI Response
            </Typography>
          </Box>

          <Typography
            sx={{
              whiteSpace: "pre-wrap",
              lineHeight: 1.8,
            }}
          >
            {answer}
          </Typography>

          {sources.length > 0 && (
            <Box
              sx={{
                mt: 3,
                pt: 2.5,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  mb: 1.5,
                  fontWeight: 700,
                }}
              >
                Sources
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                {sources.map((source) => (
                  <Chip
                    key={source.fileId}
                    icon={<DescriptionRoundedIcon />}
                    label={source.fileName}
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default AIChat;