import { Box } from '@mui/joy';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useField } from 'formik';

type InputProps = {
    textarea?: boolean;
    label?: string;
    type: string;
    placeholder?: string;
    disable?: boolean;
    name: string;
};

const InputField = ({ textarea, disable, ...props }: InputProps) => {
    const [field, { error }] = useField(props);
    return (
        <FormControl sx={{ width: '100%', mt: 1 }}>
            {textarea ? (
                <Textarea
                    {...props}
                    {...field}
                    error={!!error}
                    id={field.name}
                    placeholder={props.placeholder}
                    minRows={2}
                    maxRows={4}
                    startDecorator={<Box sx={{ display: 'flex', gap: 0.5 }}></Box>}
                    endDecorator={<Typography sx={{ ml: 'auto' }}>{field?.value?.length} character(s)</Typography>}
                    sx={{ minWidth: 300 }}
                />
            ) : (
                <TextField
                    id={field.name}
                    error={!!error}
                    label={props.label}
                    {...field}
                    {...props}
                    variant="outlined"
                    helperText={error}
                    disabled={disable}
                />
            )}
        </FormControl>
    );
};

export default InputField;
