import React from 'react';
import firebase from '../../firebase';
import 
    { 
     Grid,
     Form,
     Segment, 
     Button, 
     Header, 
     Message, 
     Icon 
    } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            errors: [],
            loading: false
        }
    }   

  

    displayErrors = errors => 
        errors.map((error, i) => <p key={i}>{error.message}</p> );

    handleUserNameChange(e) {
        this.setState({username: e.target.value});
    }
    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }
    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }
    handlePasswordConfirmatioinChange(e) {
        this.setState({passwordConfirmation: e.target.value});
    }


    handleSubmit = event => {
        event.preventDefault();
        if(this.isFormValid(this.state)){
        this.setState({ errors: [], loading: true});
        firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedInUser => {
            console.log(signedInUser);
        })
        .catch( err => {
            console.log(err);
            this.setState({ errors: this.state.errors.concat(err), loading: false})
        })

        }
    }

    isFormValid = ({ email, password}) => email && password;




    render() {
        const { email, password, errors, loading } = this.state;
        return(
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{maxWidth:450}}>
                    <Header as="h1" icon color="violet" textAlign="center">
                        <Icon name="code branch" color="violet"/>
                            Login to DevChat
                    </Header>
                    <Form onSubmit = {this.handleSubmit} size="large">
                        <Segment stacked>


                            <Form.Input 
                                fluid 
                                name = "email" 
                                icon="mail" 
                                iconPosition="left" 
                                placeholder="Email Address" 
                                onChange={this.handleEmailChange.bind(this)}
                                className={errors.some(error => error.message.toLowerCase().includes('email')) ? 'error' : ''}
                                value={email} 
                                type="email"
                             />

                            <Form.Input 
                                fluid 
                                name = "password" 
                                icon="lock" 
                                iconPosition="left" 
                                placeholder="Password" 
                                onChange={this.handlePasswordChange.bind(this)}
                                className={errors.some(error => error.message.toLowerCase().includes('password')) ? 'error' : ''}
                                value={password} 
                                type="password"
                             />

                            

                             <Button disabled={loading} className={loading ? 'loading' : ''} color="violet" fluid size="large">Login</Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Errors</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>Don't have an account? <Link to="/Register">Register</Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Login