//src/components/CounterRedux.tsx
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  Chip
} from '@mui/material';
import { Add, Remove, Refresh } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addBy, decrement, increment, reset } from '../store/counterSlice';

export default function CounterRedux() {
  const count = useAppSelector(s => s.counter.value);
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(1);

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          Redux Counter
        </Typography>
        
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Button 
            variant="contained" 
            onClick={() => dispatch(decrement())}
            startIcon={<Remove />}
            size="small"
          >
            -
          </Button>
          
          <Chip 
            label={count} 
            color="primary" 
            variant="outlined"
            sx={{ minWidth: 60, fontSize: '1.2rem' }}
          />
          
          <Button 
            variant="contained" 
            onClick={() => dispatch(increment())}
            startIcon={<Add />}
            size="small"
          >
            +
          </Button>
          
          <Button 
            variant="outlined" 
            onClick={() => dispatch(reset())}
            startIcon={<Refresh />}
            size="small"
          >
            Reset
          </Button>
        </Box>
        
        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            type="number"
            value={step}
            onChange={e => setStep(Number(e.target.value) || 0)}
            label="Step"
            variant="outlined"
            size="small"
            sx={{ width: 100 }}
          />
          <Button 
            variant="contained" 
            color="secondary"
            onClick={() => dispatch(addBy(step))}
          >
            +{step}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}