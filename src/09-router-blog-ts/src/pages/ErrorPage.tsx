// src/pages/ErrorPage.tsx
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function ErrorPage() {
  const error = useRouteError();
  let message = '알 수 없는 오류가 발생했습니다.';
  if (isRouteErrorResponse(error)) {
    message = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    message = error.message;
  }
  
  return (
    <Box sx={{ width: '100%', maxWidth: '100%' }}>
      <Stack spacing={1} role="alert" sx={{ maxWidth: '100%' }}>
        <Typography 
          variant="h5" 
          fontWeight={800}
          sx={{ 
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}
        >
          오류
        </Typography>
        <Alert 
          severity="error"
          sx={{
            width: '100%',
            maxWidth: '100%',
            '& .MuiAlert-message': {
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              width: '100%'
            }
          }}
        >
          {message}
        </Alert>
      </Stack>
    </Box>
  );
}