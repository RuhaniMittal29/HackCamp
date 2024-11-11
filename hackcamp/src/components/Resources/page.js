'use client'

import { useState, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
})

export default function HealthArticles() {
  const [articles, setArticles] = useState([])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const fetchArticles = async () => {
    const apiKey = "104e3b299801468c8df6fdf1ce6659e4"
    setIsLoading(true)
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=${inputText}&language=en&sortBy=relevancy&searchIn=title&pagesize=6&apiKey=${apiKey}`)
      const data = await response.json()

      if (data.status === 'ok') {
        const filteredArticles = data.articles.filter(article => 
          article.url && article.description && article.title && article.publishedAt
        ).map(article => ({
          title: article.title,
          summary: article.description,
          url: article.url,
        }))

        setArticles(filteredArticles)
      } else {
        console.error("Error fetching articles:", data.message)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (inputText) {
      const timer = setTimeout(() => {
        fetchArticles()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [inputText])

  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{ 
          background: 'linear-gradient(#faffe8, rgb(214, 239, 244))',
          minHeight: '100vh',
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          overflowY: 'auto',
          paddingY: 4
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ my: 4 }}>
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom 
              align="center" 
              sx={{
                fontFamily: '"Pacifico", cursive',
                fontWeight: 100,
                fontStyle: 'normal',
                fontSize: '3rem',
              }}
            >
              Health & Wellness Articles
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <TextField
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Search articles"
                variant="outlined"
                sx={{ width: '100%', maxWidth: 400 }}
              />
            </Box>
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            ) : (
              <Grid container spacing={3}>
                {articles.map((article, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="div">
                          {article.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {article.summary}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button 
                          size="small" 
                          color="primary" 
                          onClick={() => window.open(article.url, '_blank')}
                          aria-label={`Read more about ${article.title}`}
                        >
                          Read More
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}