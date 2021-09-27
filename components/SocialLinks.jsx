import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import HoverIconButton from './HoverIconButton';
import { facebookUrl, instagramUrl, linkedInUrl, gitHubUrl } from '../util/config';

// list of social links
const socialLinks = [
    { label: 'Facebook', href: facebookUrl, Icon: FacebookRoundedIcon },
    { label: 'Instagram', href: instagramUrl, Icon: InstagramIcon },
    { label: 'LinkedIn', href: linkedInUrl, Icon: LinkedInIcon },
    { label: 'GitHub', href: gitHubUrl, Icon: GitHubIcon }
];

/**
 * Render social links as icon buttons.
 */
function SocialLinks({ sx, className }) {
    return (
        <Box className={className} sx={sx}>
            {
                socialLinks.map(({ href, label, Icon }) => (
                    <HoverIconButton
                        key={href}
                        hoverColor="primary"
                        component="a"
                        size="medium"
                        aria-label={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        sx={{
                            mx: 2,
                            width: 36,
                            height: 36
                        }}
                    >
                        <Icon sx={{ fontSize: 30 }} />
                    </HoverIconButton>
                ))
            }
        </Box>
    );
}

SocialLinks.propTypes = {
    sx: PropTypes.objectOf(PropTypes.any),
    className: PropTypes.string
};

export default SocialLinks;
