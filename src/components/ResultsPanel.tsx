
import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Tooltip,
  Alert
} from '@mui/material';
import {
  Code as CodeIcon,
  Storage as DatabaseIcon,
  Web as WebIcon,
  Cloud as CloudIcon,
  Psychology as PsychologyIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Info as InfoIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { 
  ExpertSystemResponse, 
  TechnologyCategory, 
  RecommendationStatus,
  TechnologyRecommendation
} from '../api/types';
import { 
  getCategoryLabel, 
  getStatusLabel, 
  getStatusColor,
  getConfidenceColor,
  formatConfidence
} from '../utils/helpers';

interface ResultsPanelProps {
  results: ExpertSystemResponse | null;
  onShowExplanation: () => void;
  showExplanation: boolean;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ 
  results, 
  onShowExplanation,
  showExplanation 
}) => {
  if (!results) {
    return (
      <Paper elevation={3} sx={{ p: 3 }}>
        <Alert severity="info">
          Результаты анализа пока не доступны. Заполните форму и запустите анализ.
        </Alert>
      </Paper>
    );
  }

  const { recommendations = [], rulesFired = 0, sessionId = 'Нет данных', requirements } = results;

  const recommendationsArray: TechnologyRecommendation[] = 
    Array.isArray(recommendations) ? recommendations : [];

  if (recommendationsArray.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <WarningIcon color="warning" />
          <Typography variant="h6">
            Рекомендации не найдены
          </Typography>
        </Box>
        <Alert severity="warning">
          Экспертная система не смогла подобрать технологии для указанных параметров проекта.
          Попробуйте изменить критерии поиска.
        </Alert>
        {sessionId && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            ID сессии: <code>{sessionId}</code>
          </Typography>
        )}
      </Paper>
    );
  }

  const getMuiIcon = (category: TechnologyCategory) => {
    switch (category) {
      case TechnologyCategory.BACKEND: return <CodeIcon />;
      case TechnologyCategory.FRONTEND: return <WebIcon />;
      case TechnologyCategory.DATABASE: return <DatabaseIcon />;
      default: return <PsychologyIcon />;
    }
  };

  const sortedRecommendations = [...recommendationsArray].sort((a, b) => {
    const statusOrder = {
      [RecommendationStatus.PRIMARY]: 1,
      [RecommendationStatus.ALTERNATIVE]: 2,
      [RecommendationStatus.NOT_RECOMMENDED]: 3
    };
    
    const statusDiff = statusOrder[a.status] - statusOrder[b.status];
    if (statusDiff !== 0) return statusDiff;
    
    return b.confidence - a.confidence;
  });

  const primaryRecommendations = sortedRecommendations.filter(
    r => r.status === RecommendationStatus.PRIMARY
  );
  const alternativeRecommendations = sortedRecommendations.filter(
    r => r.status === RecommendationStatus.ALTERNATIVE
  );
  const notRecommended = sortedRecommendations.filter(
    r => r.status === RecommendationStatus.NOT_RECOMMENDED
  );

  const categories = Array.from(
    new Set(sortedRecommendations.map(r => r.technology?.category).filter(Boolean))
  ) as TechnologyCategory[];

  const getAverageConfidence = (recs: TechnologyRecommendation[]) => {
    if (recs.length === 0) return 0;
    const sum = recs.reduce((acc, rec) => acc + (rec.confidence || 0), 0);
    return sum / recs.length;
  };

  const safeGet = <T,>(value: T | undefined, defaultValue: T): T => {
    return value !== undefined ? value : defaultValue;
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PsychologyIcon /> Рекомендации экспертной системы
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ID сессии: <code>{sessionId}</code>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Найдено технологий: {sortedRecommendations.length}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={`Выполнено ${rulesFired} правил экспертной системы`}>
            <Chip 
              icon={<PsychologyIcon />}
              label={`${rulesFired} правил`} 
              color="primary" 
              variant="outlined"
            />
          </Tooltip>
          
          <Button
            variant="outlined"
            size="small"
            startIcon={showExplanation ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            onClick={onShowExplanation}
          >
            {showExplanation ? 'Скрыть объяснения' : 'Показать объяснения'}
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom variant="body2">
                Всего
              </Typography>
              <Typography variant="h4">
                {sortedRecommendations.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom variant="body2">
                Основные
              </Typography>
              <Typography variant="h4" color="primary">
                {primaryRecommendations.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom variant="body2">
                Альтернативы
              </Typography>
              <Typography variant="h4" color="info.main">
                {alternativeRecommendations.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom variant="body2">
                Уверенность
              </Typography>
              <Typography variant="h4" color="success.main">
                {formatConfidence(getAverageConfidence(sortedRecommendations))}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {categories.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Категории технологий
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {categories.map(category => {
              const count = sortedRecommendations.filter(
                r => r.technology?.category === category
              ).length;
              return (
                <Chip 
                  key={category}
                  icon={getMuiIcon(category)}
                  label={`${getCategoryLabel(category)} (${count})`}
                  variant="outlined"
                  sx={{ mb: 1 }}
                />
              );
            })}
          </Box>
        </Box>
      )}

      {primaryRecommendations.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <InfoIcon color="primary" /> Основные рекомендации
          </Typography>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Технология</TableCell>
                  <TableCell>Категория</TableCell>
                  <TableCell>Уверенность</TableCell>
                  <TableCell>Обоснование</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {primaryRecommendations.map((rec, index) => {
                  const tech = rec.technology || { name: 'Неизвестно', category: TechnologyCategory.BACKEND };
                  return (
                    <TableRow key={index} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getMuiIcon(tech.category)}
                          <Box>
                            <Typography fontWeight="bold">
                              {safeGet(tech.name, 'Неизвестная технология')}
                            </Typography>
                            {tech.description && (
                              <Typography variant="caption" color="text.secondary">
                                {tech.description.substring(0, 50)}...
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={getCategoryLabel(tech.category)} 
                          size="small" 
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress 
                              variant="determinate" 
                              value={safeGet(rec.confidence, 0) * 100}
                              color={getConfidenceColor(safeGet(rec.confidence, 0))}
                            />
                          </Box>
                          <Typography variant="body2" fontWeight="bold">
                            {formatConfidence(safeGet(rec.confidence, 0))}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {safeGet(rec.reason, 'Обоснование не указано')}
                        </Typography>
                        {tech.bestFor && (
                          <Typography variant="caption" color="text.secondary" display="block">
                            Подходит для: {tech.bestFor}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {alternativeRecommendations.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Альтернативные варианты
          </Typography>
          
          <Grid container spacing={2}>
            {alternativeRecommendations.map((rec, index) => {
              const tech = rec.technology || { name: 'Неизвестно', category: TechnologyCategory.BACKEND };
              return (
                <Grid item xs={12} md={6} key={index}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {safeGet(tech.name, 'Неизвестная технология')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {getCategoryLabel(tech.category)}
                        </Typography>
                      </Box>
                      <Chip 
                        label={formatConfidence(safeGet(rec.confidence, 0))}
                        size="small"
                        color={getConfidenceColor(safeGet(rec.confidence, 0))}
                      />
                    </Box>
                    
                    <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
                      {safeGet(rec.reason, 'Обоснование не указано')}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                      {tech.cloudNative && (
                        <Chip label="Cloud Native" size="small" variant="outlined" />
                      )}
                      {tech.microservicesReady && (
                        <Chip label="Microservices" size="small" variant="outlined" />
                      )}
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}

      {notRecommended.length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom color="error">
            Не рекомендованные технологии
          </Typography>
          
          <Alert severity="warning" sx={{ mb: 2 }}>
            Следующие технологии не рекомендуются для вашего проекта
          </Alert>
          
          <Grid container spacing={1}>
            {notRecommended.map((rec, index) => {
              const tech = rec.technology || { name: 'Неизвестно' };
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper sx={{ p: 1.5, bgcolor: 'grey.50' }}>
                    <Typography variant="body2">
                      {safeGet(tech.name, 'Неизвестная технология')}
                    </Typography>
                    {rec.reason && (
                      <Typography variant="caption" color="text.secondary">
                        {rec.reason}
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}
    </Paper>
  );
};