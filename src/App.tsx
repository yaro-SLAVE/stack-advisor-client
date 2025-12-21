// src/App.tsx
import React, { useState, useCallback } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Alert,
  CircularProgress,
  Grid,
  Paper
} from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { ProjectForm } from './components/ProjectForm';
import { ResultsPanel } from './components/ResultsPanel';
import { ExplanationPanel } from './components/ExplanationPanel';
import { apiService } from './api/api';
import { ProjectFormData, ExpertSystemResponse } from './api/types';
import './App.css';

const App: React.FC = () => {
  const [results, setResults] = useState<ExpertSystemResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const handleSubmit = useCallback(async (formData: ProjectFormData) => {
    setLoading(true);
    setError(null);
    setResults(null);
    setShowExplanation(false);
    
    try {
      const response = await apiService.analyzeProject(formData);
      setResults(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка при анализе проекта');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleToggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <PsychologyIcon 
          sx={{ 
            fontSize: 64, 
            color: 'primary.main', 
            mb: 2,
            animation: 'pulse 2s infinite'
          }} 
        />
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          🧠 Экспертная система подбора технологий
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
          Фреймовая модель знаний с подсистемой объяснений на основе Drools
        </Typography>
        <Typography variant="body2" color="text.secondary">
          AgendaListener + AuditLog | 40+ правил | Spring Boot + React TypeScript
        </Typography>
      </Box>

      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <ProjectForm onSubmit={handleSubmit} loading={loading} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          {loading ? (
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center', height: '100%' }}>
              <CircularProgress size={60} sx={{ mb: 3 }} />
              <Typography variant="h6" gutterBottom>
                Анализируем проект...
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Экспертная система обрабатывает данные с помощью Drools правил
              </Typography>
              <Box sx={{ mt: 3 }}>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                <CircularProgress size={20} sx={{ mr: 1 }} />
                <CircularProgress size={20} />
              </Box>
            </Paper>
          ) : results ? (
            <Box>
              <ResultsPanel 
                results={results}
                onShowExplanation={handleToggleExplanation}
                showExplanation={showExplanation}
              />
              {showExplanation && (
                <Box sx={{ mt: 3 }}>
                  <ExplanationPanel 
                    explanation={results.explanationChain}
                    auditLog={results.auditLog}
                  />
                </Box>
              )}
            </Box>
          ) : (
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center', height: '100%' }}>
              <PsychologyIcon sx={{ fontSize: 64, color: 'grey.400', mb: 3 }} />
              <Typography variant="h5" gutterBottom color="text.secondary">
                Готов к анализу
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Заполните форму параметров проекта для получения рекомендаций по технологиям
              </Typography>
              <Alert severity="info">
                Система проанализирует проект с использованием 40+ правил экспертной системы
              </Alert>
            </Paper>
          )}
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="body2" color="text.secondary" align="center">
          Экспертная система для курсовой работы | Фреймовая модель знаний | Подсистема объяснений
        </Typography>
      </Box>
    </Container>
  );
};

export default App;