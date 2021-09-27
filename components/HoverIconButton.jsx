import IconButton from '@mui/material/IconButton';
import styled from '@emotion/styled';

const options = { shouldForwardProp: (prop) => (prop !== 'hoverColor') };

/**
 * Icon button which turns a specified color on hover.
 */
const HoverIconButton = styled(IconButton, options)(({ hoverColor, theme }) => ({
    ':hover': {
        color: theme.palette[hoverColor].main
    }
}));

export default HoverIconButton;
