import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

type Props = {
  title?: string;
  description?: string;
};

export default function EmptyState({
  title = '할 일이 없습니다',
  description = '상단 입력창에 새 할 일을 추가하세요.',
}: Props) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        textAlign: 'center',
        color: 'text.secondary',
        borderStyle: 'dashed',
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'grid', gap: 1, placeItems: 'center' }}>
        <HelpOutlineIcon color="disabled" />
        <Typography variant="subtitle1" fontWeight={700}>
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
    </Paper>
  );
}
