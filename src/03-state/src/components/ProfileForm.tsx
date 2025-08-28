import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Snackbar from '@mui/material/Snackbar';

type Role = 'admin' | 'user' | 'guest';

type FormState = {
  name: string;
  age: number | ''; // 빈 문자열 허용
  role: Role;
  agree: boolean;
};

const initialForm: FormState = {
  name: '',
  age: '',
  role: 'user',
  agree: false,
};

export default function ProfileForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [open, setOpen] = useState(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'age'
          ? value === '' ? '' : Number(value)
          : value,
    }));
  }

  function handleSelectChange(e: SelectChangeEvent) {
    setForm((prev) => ({ ...prev, role: e.target.value as Role }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // 실제 환경에서는 여기서 서버로 제출
    setOpen(true);
  }

  const canSubmit =
    form.name.trim() !== '' &&
    typeof form.age === 'number' &&
    form.age > 0 &&
    form.agree;

  const reset = () => setForm(initialForm);

  return (
    <Paper variant="outlined" sx={{ p: 2, maxWidth: 520 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={700}>
            프로필
          </Typography>

          <TextField
            label="이름"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="홍길동"
            fullWidth
          />

          <TextField
            label="나이"
            name="age"
            type="number"
            value={form.age}
            onChange={handleInputChange}
            placeholder="0"
            inputProps={{ min: 0 }}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel id="role-label">역할(Role)</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={form.role}
              label="역할(Role)"
              onChange={handleSelectChange}
            >
              <MenuItem value="user">user</MenuItem>
              <MenuItem value="admin">admin</MenuItem>
              <MenuItem value="guest">guest</MenuItem>
            </Select>
            <FormHelperText>권한 레벨을 선택하세요.</FormHelperText>
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox
                name="agree"
                checked={form.agree}
                onChange={handleInputChange}
              />
            }
            label="개인정보 처리에 동의합니다."
          />

          <Stack direction="row" spacing={1}>
            <Button type="submit" variant="contained" disabled={!canSubmit}>
              제출
            </Button>
            <Button type="button" variant="outlined" onClick={reset}>
              초기화
            </Button>
          </Stack>

          <Box
            component="pre"
            sx={{
              bgcolor: 'grey.100',
              p: 2,
              borderRadius: 2,
              overflowX: 'auto',
              m: 0,
            }}
          >
            {JSON.stringify(form, null, 2)}
          </Box>
        </Stack>
      </Box>

      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        message={`제출 데이터: ${JSON.stringify(form)}`}
      />
    </Paper>
  );
}
