// src/components/ProjectForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Grid,
  Slider,
  SelectChangeEvent,
  Alert
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import { 
  ProjectFormData, 
  ProjectType, 
  TeamExperience, 
  BudgetLevel, 
  TimeToMarket, 
  TeamSize 
} from '../api/types';
import { 
  PROJECT_TYPES, 
  TEAM_EXPERIENCES, 
  BUDGET_LEVELS, 
  TIME_OPTIONS, 
  TEAM_SIZES,
  INITIAL_FORM_DATA 
} from '../utils/constants';

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
  loading: boolean;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<ProjectFormData>(INITIAL_FORM_DATA);

  const handleSelectChange = (e: SelectChangeEvent): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as keyof ProjectFormData]: value
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as keyof ProjectFormData]: checked
    }));
  };

  const handleSliderChange = (_event: Event, value: number | number[]): void => {
    setFormData(prev => ({
      ...prev,
      teamMembers: value as number
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = (): void => {
    setFormData(INITIAL_FORM_DATA);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <SettingsIcon /> Параметры проекта
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        Заполните параметры для анализа проекта экспертной системой
      </Alert>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Тип проекта *</InputLabel>
              <Select
                name="projectType"
                value={formData.projectType}
                label="Тип проекта *"
                onChange={handleSelectChange}
                disabled={loading}
                required
              >
                {PROJECT_TYPES.map(type => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Опыт команды *</InputLabel>
              <Select
                name="teamExperience"
                value={formData.teamExperience}
                label="Опыт команды *"
                onChange={handleSelectChange}
                disabled={loading}
                required
              >
                {TEAM_EXPERIENCES.map(exp => (
                  <MenuItem key={exp.value} value={exp.value}>
                    {exp.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Размер команды *</InputLabel>
              <Select
                name="teamSize"
                value={formData.teamSize}
                label="Размер команды *"
                onChange={handleSelectChange}
                disabled={loading}
                required
              >
                {TEAM_SIZES.map(size => (
                  <MenuItem key={size.value} value={size.value}>
                    {size.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Бюджет *</InputLabel>
              <Select
                name="budget"
                value={formData.budget}
                label="Бюджет *"
                onChange={handleSelectChange}
                disabled={loading}
                required
              >
                {BUDGET_LEVELS.map(budget => (
                  <MenuItem key={budget.value} value={budget.value}>
                    {budget.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Срок выхода на рынок *</InputLabel>
              <Select
                name="timeToMarket"
                value={formData.timeToMarket}
                label="Срок выхода на рынок *"
                onChange={handleSelectChange}
                disabled={loading}
                required
              >
                {TIME_OPTIONS.map(time => (
                  <MenuItem key={time.value} value={time.value}>
                    {time.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography gutterBottom>
              Количество членов команды: <strong>{formData.teamMembers}</strong>
            </Typography>
            <Slider
              value={formData.teamMembers}
              onChange={handleSliderChange}
              min={1}
              max={50}
              marks={[
                { value: 1, label: '1' },
                { value: 10, label: '10' },
                { value: 20, label: '20' },
                { value: 30, label: '30' },
                { value: 40, label: '40' },
                { value: 50, label: '50' }
              ]}
              valueLabelDisplay="auto"
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Дополнительные требования
            </Typography>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="needHighLoad"
                    checked={formData.needHighLoad}
                    onChange={handleCheckboxChange}
                    disabled={loading}
                  />
                }
                label="Высокая нагрузка"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="needRealTime"
                    checked={formData.needRealTime}
                    onChange={handleCheckboxChange}
                    disabled={loading}
                  />
                }
                label="Real-time функциональность"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="needHighSecurity"
                    checked={formData.needHighSecurity}
                    onChange={handleCheckboxChange}
                    disabled={loading}
                  />
                }
                label="Высокие требования безопасности"
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<SendIcon />}
                disabled={loading}
                sx={{ flex: 2 }}
              >
                {loading ? 'Анализ...' : 'Проанализировать проект'}
              </Button>
              
              <Button
                type="button"
                variant="outlined"
                size="large"
                onClick={handleReset}
                disabled={loading}
                sx={{ flex: 1 }}
              >
                Сбросить
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};