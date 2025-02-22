import Btn from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Button = ({ path = "/", label, isActive }) => {
    const styles = {
        backgroundColor: isActive ? 'black' : 'white',
        border: '1px solid black',
        color: isActive ? 'white' : 'black',
        width: '150px'
    }

    return (
        <Link to={path}>
            <Btn sx={styles} variant="contained" size="large">{label}</Btn>
        </Link>
    )
}

export default Button