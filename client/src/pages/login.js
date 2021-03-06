import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import Link from 'react-router-dom/Link';
import themeFile from '../util/theme';
//MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress'

//redux stuff
import {connect} from 'react-redux';
import { loginUser } from '../redux/actions/userAction'




const styles = (themeFile); 




class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            // loading: false,
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors});
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // this.setState({
        //     loading:true
        // });
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
        // axios.post('/login', userData)
        // .then(res => {
        //     console.log(res.data);
        //     localStorage.setItem('mashDBToken',`Bearer ${res.data.idToken}`);
        //     this.setState({
        //         loading: false
        //     });
        //     this.props.history.push('/');
        // })
        // .catch(err => {
        //     this.setState({
        //         errors: err.response.data,
        //         loading: false
        //     })
        // })
        

    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    render() {
        const {classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return(
            <Grid container className = {classes.form}>
                <Grid item sm />
                <Grid item sm >
                    <Typography variant = "h2" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit = {this.handleSubmit}>
                        <TextField id = "email" name= "email" type ="email" label = "Email" helperText={errors.email} error={errors.email ? true : false} className={classes.textField}
                            value = {this.state.email} onChange={this.handleChange} fullWidth />
                        <TextField id = "password" name= "password" type ="password" label = "Password" helperText={errors.password} error={errors.password ? true : false} className={classes.textField}
                            value = {this.state.password} onChange={this.handleChange} fullWidth />  
                            {errors.general && (
                                <Typography variant="body2" className={classes.customError}>
                                    {errors.general}
                                </Typography>
                            )}
                        <Button type = "submit" variant = "contained" color = "primary" className = { classes.button } disabled={loading}>
                            Login 
                            {loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}
                        </Button><br></br><br></br>
                        <small>dont have an account ? signup <Link to="/signup" >here</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI:state.UI
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));