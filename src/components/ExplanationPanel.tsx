import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  Tab,
  Tabs
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Rule as RuleIcon,
  Psychology as LogicIcon,
  Info as InfoIcon,
  Timeline as TimelineIcon,
  List as ListIcon
} from '@mui/icons-material';

interface ExplanationPanelProps {
  explanation: string[];
  auditLog?: string[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`explanation-tabpanel-${index}`}
      aria-labelledby={`explanation-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

export const ExplanationPanel: React.FC<ExplanationPanelProps> = ({ explanation, auditLog = [] }) => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [tabValue, setTabValue] = useState<number>(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const formatRuleText = (rule: string): { title: string; details: string } => {
    const lines = rule.split('\n');
    const title = lines[0] || 'Неизвестное правило';
    const details = lines.slice(1).join('\n');
    return { title, details };
  };

  const getRuleType = (rule: string): string => {
    if (rule.includes('Recommend')) return 'Рекомендация';
    if (rule.includes('for')) return 'Критерии';
    if (rule.includes('rule')) return 'Логическое правило';
    return 'Правило';
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LogicIcon />
            <Typography variant="h6">
              Подсистема объяснений
            </Typography>
            <Chip 
              label={`${explanation.length} шагов`} 
              size="small" 
              color="info"
              variant="outlined"
            />
          </Box>
        </AccordionSummary>
        
        <AccordionDetails>
          <Alert 
            severity="info" 
            icon={<InfoIcon />}
            sx={{ mb: 3 }}
          >
            Подсистема объяснений фиксирует цепочку рассуждений экспертной системы 
            с использованием AgendaListener и AuditLog в Drools
          </Alert>
          
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
            <Tab icon={<TimelineIcon />} label="Цепочка правил" />
            <Tab icon={<ListIcon />} label="Полный лог" />
          </Tabs>
          
          <TabPanel value={tabValue} index={0}>
            {explanation.length > 0 ? (
              <List>
                {explanation.map((rule, index) => {
                  const { title, details } = formatRuleText(rule);
                  return (
                    <React.Fragment key={index}>
                      <ListItem alignItems="flex-start">
                        <ListItemIcon>
                          <RuleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                              <Typography variant="subtitle2">
                                Шаг {index + 1}: {getRuleType(title)}
                              </Typography>
                              <Chip 
                                label={`${index + 1}`} 
                                size="small" 
                                sx={{ height: 20 }}
                              />
                            </Box>
                          }
                          secondary={
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="body2" color="text.primary">
                                {title}
                              </Typography>
                              {details && (
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                                  {details}
                                </Typography>
                              )}
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < explanation.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  );
                })}
              </List>
            ) : (
              <Alert severity="warning">
                Нет данных для отображения цепочки правил
              </Alert>
            )}
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            {auditLog.length > 0 ? (
              <Box sx={{ maxHeight: 400, overflow: 'auto', p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                {auditLog.map((log, index) => (
                  <Typography 
                    key={index} 
                    variant="caption" 
                    component="div" 
                    sx={{ 
                      fontFamily: 'monospace', 
                      whiteSpace: 'pre-wrap',
                      mb: 0.5,
                      p: 0.5,
                      bgcolor: index % 2 === 0 ? 'white' : 'transparent',
                      borderRadius: 0.5
                    }}
                  >
                    {log}
                  </Typography>
                ))}
              </Box>
            ) : (
              <Alert severity="info">
                Полный лог работы системы не доступен
              </Alert>
            )}
          </TabPanel>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Подсистема объяснений является ключевым требованием экспертной системы. 
              Она позволяет отслеживать логику принятия решений через цепочку сработавших правил.
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};