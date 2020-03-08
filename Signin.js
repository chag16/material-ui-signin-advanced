import React, { Component } from "react";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';


import Cookies from 'universal-cookie';

//import Copyright from './Copyright' ;
//import { server,site_name,site_type } from './environ';

function Copyright() {
return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href={window.location.origin}>
        {site_name}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const server    = 'www.example.com';
const site_name = 'Sample Site';
const site_type = 'nature'

 
const cookies = new Cookies();
 
const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/featured?'+ site_type +')',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    textTransform: "none"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
 
  const classes = useStyles();

  class SignInForm extends Component {

    constructor (props) {
      super(props);
      
      this.state = {  
                      name      : '',
                      email     : '',
                      password  : '',
                      signup    : 0,
                      forgotpass: 0,
                      error     : null
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSwapSignIn = this.handleSwapSignIn.bind(this);
      this.handleForgotPass = this.handleForgotPass.bind(this);
    }

    handleChange(event) {
       this.setState({
        name      : (event.target.id === 'name') ? event.target.value : this.state.name,
        email     : (event.target.id === 'email') ? event.target.value : this.state.email,
        password  : (event.target.id === 'password') ? event.target.value : this.state.password,
        error     : null
      });
    }

    handleSwapSignIn(event) {
       this.setState({
        signup : (this.state.signup) ? 0 : 1,
        error  : null
       });
       return false;
    }

    handleForgotPass(event) {
       this.setState({
        forgotpass  : (this.state.forgotpass) ? 0 : 1,
        error       : null
       });
       return false;
    }



    handleSubmit(event,state){

      event.preventDefault();

      var path = (state.signup) ? '/signup_form' : '/login_as_user_via_email';
          path = (state.forgotpass) ? '/forgot_pass' : path;

      var url = 'http://' + server + path ;
      let data = { name: state.name, email: state.email, password: state.password };

      var options = {
                      method: 'POST',
                      headers: {
                      'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(data)
      };

      fetch(url,options)
      .then(res=>res.json())
      .then(res => {
              if(res.status === 'success')    
              {
                 cookies.set('access_token',res.data.access_token, { path: '/' });
                 window.location.href = window.location.origin  + '/dashboard';
              }
              else {
                 this.setState({error : res.message});
              }
            }
        ).catch(error => {
          this.setState({error : "Some Error Occurred"})
          console.log(error);
          } 
      );
    };


    render(){
      return(
        <form className={classes.form} onSubmit={event => this.handleSubmit(event,this.state)} >
          {(this.state.signup) ? 
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            type="name"
            id="name"
            autoComplete="name"
            value={this.state.name}
            onChange={this.handleChange}
          /> : null}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={this.state.email}
            onChange={this.handleChange}
          />
          {(this.state.forgotpass) ? null :
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={this.state.password}
            onChange={this.handleChange}
          /> }
          {(this.state.signup || this.state.forgotpass) ? null : 
            <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            /> }
          <div align = "center"> <font color="red"> {this.state.error}</font> </div>
          <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
          {(this.state.signup) ? 'Sign Up' : ((this.state.forgotpass) ? 'Reset Password' : 'Sign In')}
          </Button>
          <Grid container>
            <Grid item xs>
              {(this.state.signup ) ? null : 
                <Button className={classes.button}
                      variant="text" 
                      color="primary" 
                      disableRipple 
                      size="medium" 
                      onClick={this.handleForgotPass} >
                      <u> {(this.state.forgotpass) ? "Back to Sign In" : "Forgot Password"}</u>
              </Button>}
            </Grid>
            <Grid item>
              {(this.state.forgotpass) ? null :
              <Button className={classes.button}
                      variant="text" 
                      color="primary" 
                      disableRipple 
                      size="medium" 
                      onClick={this.handleSwapSignIn} > 
                      <u> {(this.state.signup) ? "Already have an account? Sign In" : "Don't have an account? Sign Up"} </u>
              </Button> } 
            </Grid>
          </Grid>
        </form>
        )
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Welcome to {site_name} 
        </Typography>
        <SignInForm />
     </div> 
      <Box mt={8}>
        <Copyright />
      </Box>
    </Grid>
    </Grid>
  );
}
