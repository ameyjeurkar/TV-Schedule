import { Typography } from '@mui/material';
import "../../styles.css";

const ErrorMessage = (props) => {
    const { message, variant } = props;

    return (
        <>
            <div className="container-center">
                <Typography variant={variant} gutterBottom component="div">
                    {message}
                </Typography>
            </div>
        </>
    )
}
export default ErrorMessage;