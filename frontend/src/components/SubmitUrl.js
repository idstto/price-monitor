import React from 'react';
import { Container } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import axios from 'axios';

export default class SubmitUrl extends React.Component {

    state = {
        url: '',
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log('URL 2: ', this.state.url);
        axios.post(`http://backend/product`, { url: this.state.url })
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    }

    handleChange = event => {
        console.log('URL 1: ', event.target.value);
        this.setState({ url: event.target.value });
    }

    render() {
        const { classes } = this.props;

        return (
            <Container>
                <form className={classes.container} noValidate autoComplete="off">
                    <Input
                        placeholder="URL"
                        className={classes.input}
                        inputProps={{
                            'aria-label': 'URL',
                        }}
                        onChange={this.handleChange}
                    />
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </form>
            </Container>
        )
    }
}