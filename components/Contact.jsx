import { useCallback, useEffect, useRef, useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import EmailIcon from '@mui/icons-material/Email';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';

const contactText = 'If you\'d like to get in touch please feel free to drop me an email or use the contact details below.';
const errorMsg = 'Oops! There was an error whilst trying to deliver your message.';
const successMsg = 'Your massage has been sent.';

const Notification = styled(Alert)(({ theme }) => ({
    marginRight: theme.spacing(2)
}));

/**
 * Contact section of the website.
 */
export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState();

    const mounted = useRef(false);
    const formEl = useRef();

    /**
     * Keep track of whether the component is mounted to protect against
     * state updates on an unmounted component after async call is complete.
     */
    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    },
    []);

    // handlers for form input fields
    const handleNameChange = useCallback(({ target }) => setName(target.value), [setName]);
    const handleEmailChange = useCallback(({ target }) => setEmail(target.value), [setEmail]);
    const handleSubjectChange = useCallback(({ target }) => setSubject(target.value), [setSubject]);
    const handleMessageChange = useCallback(({ target }) => setMessage(target.value), [setMessage]);

    /**
     * Send the submitted form data to the '/contact' API endpoint.
     *
     * @param {Object} event The DOM event which triggered the submit.
     */
    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        setSending(true);
        setError(false);
        setSuccess(false);

        fetch('/api/contact', {
            method: 'POST',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                subject,
                message
            })
        })
        .then((response) => {
            if (mounted.current) {
                if (response.status === 200) {
                    setSuccess(true);
                    setName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                } else {
                    setError(true);
                }
            }
        },
        () => {
            if (mounted.current) {
                setError(true);
            }
        })
        .finally(() => {
            setSending(false);
        });
    },
    [name, email, subject, message, setName, setEmail, setSubject, setMessage, setError, setSuccess, setSending]);

    return (
        <Container sx={{ pt: 5, pb: 11 }}>
            <Stack spacing={2} direction="row" mb={3}>
                <EmailIcon fontSize="large" />
                <Typography pt={{ xs: '4px' }}>{contactText}</Typography>
            </Stack>
            <Grid container spacing={{ xs: 4, md: 10 }}>
                <Grid
                    ref={formEl}
                    component="form"
                    item
                    xs={12}
                    md={8}
                    sx={{ flex: 1, justifyContent: 'flex-end' }}
                >
                    <TextField
                        id="contact-name-field"
                        disabled={sending}
                        variant="filled"
                        fullWidth
                        label="Name"
                        name="name"
                        required
                        margin="normal"
                        value={name}
                        onChange={handleNameChange}
                    />
                    <TextField
                        id="contact-email-field"
                        disabled={sending}
                        type="email"
                        variant="filled"
                        fullWidth
                        label="Email"
                        name="email"
                        required
                        margin="normal"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <TextField
                        id="contact-subject-field"
                        disabled={sending}
                        variant="filled"
                        fullWidth
                        label="Subject"
                        name="subject"
                        margin="normal"
                        value={subject}
                        onChange={handleSubjectChange}
                    />
                    <TextField
                        id="contact-message-field"
                        disabled={sending}
                        variant="filled"
                        fullWidth
                        label="Message"
                        name="message"
                        multiline
                        minRows="5"
                        required
                        margin="normal"
                        value={message}
                        onChange={handleMessageChange}
                    />
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mt={2}>
                        {success && <Notification severity="success" color="primary" variant="filled">{successMsg}</Notification>}
                        {error && <Notification severity="error" color="secondary" variant="filled">{errorMsg}</Notification>}
                        <Button
                            variant="containedHover"
                            onClick={handleSubmit}
                            disabled={sending || !name || !email || !message}
                            sx={{ ml: 'auto' }}
                        >
                            Submit
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h2" paragraph>Address and Phone</Typography>
                    <Typography>Ricky McGeehan</Typography>
                    <Typography>10 Bower Walk</Typography>
                    <Typography>Bristol</Typography>
                    <Typography>BS3 5AN</Typography>
                    <Typography>+447771 594 076</Typography>
                </Grid>
            </Grid>
        </Container>
    );
}
