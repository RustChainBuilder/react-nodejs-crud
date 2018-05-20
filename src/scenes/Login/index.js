import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';

import { login } from '../../services/users/actions';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  fill: {
    flexBasis: '100%',
  },
});


class Login extends Component {
  state = {
    email: '',
    password: '',
    showPassword: false,
  };

  componentDidUpdate() {
    const { user, history } = this.props;

    if(user.auth){
      history.push('/');
    }
  }

  handleLogin = e => {
    const { email, password } = e.target;
    const data = {
      email: email.value,
      password: password.value,
    }

    this.props.login(data);
    
    e.preventDefault();
  }

  handleChange = prop => e => {
    this.setState({ [prop]: e.target.value });
  }

  handleClickShowPassword = () => {
    this.setState(prevState => {
      return ({
        showPassword: !prevState.showPassword,
      });
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.handleLogin} className={classes.root}>
        {/* EMAIL */}
        <FormControl className={[classes.margin, classes.fill].join(' ')}>
          <InputLabel htmlFor="input-email">Email</InputLabel>
          <Input
            name="email"
            id="input-email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange('email')}
          />
        </FormControl>
        {/* PASSWORD */}
        <FormControl className={[classes.margin, classes.fill].join(' ')}>
          <InputLabel htmlFor="adornment-password">Password</InputLabel>
          <Input
            id="adornment-password"
            name="password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button type="submit" variant="raised" color="primary" className={classes.margin}>
          Entrar
        </Button>
        <Button component={Link} to="/register" variant="flat" className={classes.margin}>
          Cadastre-se
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { login }),
)(Login);