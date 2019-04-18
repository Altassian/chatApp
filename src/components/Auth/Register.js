import React from 'react';
import md5 from 'md5';
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

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email:'',
            password:'',
            passwordConfirmation:'',
            errors: [],
            loading: false,
            userRef: firebase.database().ref('users')
        }
    }   

    isFormValid = event =>{
        let errors = [];
        let error;
        if(this.isFormEmpty(this.state))
        {
            error = { message: 'Fill in all Fields.' };
            this.setState({ errors: errors.concat(error) });
            return false;
        }
        else if(!this.isPasswordValid(this.state))
        {
            error = { message : 'Password is invalid.' } ;
            this.setState({ errors: errors.concat(error) });
            return false;
        }
        else{
            return true;
        }
    }

    isPasswordValid = ({ password, passwordConfirmation}) => {
        if(password.length < 6 || passwordConfirmation <6 ){
            return false;
        }
        else if(password !== passwordConfirmation){
            return false;
        }
        else{
            return true;
        }
    }

    displayErrors = errors => 
        errors.map((error, i) => <p key={i}>{error.message}</p> );


    isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
        return !username.length || !email.length || !password.length || !passwordConfirmation.length;
    }
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
        if(this.isFormValid()){
        this.setState({ errors: [], loading: true});
        event.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(createdUser => {
                console.log('qer' + createdUser);
                createdUser.user.updateProfile({
                    displayName: this.state.username,
                    photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                })
                .then(() => {
                    this.saveUser(createdUser).then(() => {
                        console.log('User Saved');
                    })
                    this.setState({ loading: false});
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ 
                        errors: this.state.errors.concat(err), 
                        loading: false
                    });
                });
                
            })
            .catch(err => {
                console.error('gbgf' + err);
                this.setState({ 
                    errors: this.state.errors.concat(err), 
                    loading: false
                });
        });
            
    }
}

saveUser = createdUser => {
    return this.state.userRef.child(createdUser.user.uid).set({
        name: createdUser.user.displayName,
        avatar: createdUser.user.photoURL
    });
}



    render() {
        const { username, email, password, passwordConfirmation, errors, loading } = this.state;
        return(
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{maxWidth:450}}>
                    <Header as="h1" icon color="orange" textAlign="center">
                        <Icon name="puzzle piece" color="orange"/>
                            Register for DevChat
                    </Header>
                    <Form onSubmit = {this.handleSubmit} size="large">
                        <Segment stacked>
                            <Form.Input 
                                fluid 
                                name = "username" 
                                icon="user" 
                                iconPosition="left" 
                                placeholder="UserName" 
                                onChange={this.handleUserNameChange.bind(this)} 
                                value={username}
                                type="text"
                            />

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

                            <Form.Input 
                                fluid 
                                name = "passwordConfirmation" 
                                icon="repeat" 
                                iconPosition="left" 
                                placeholder="Password Confirmation" 
                                onChange={this.handlePasswordConfirmatioinChange.bind(this)}
                                value={passwordConfirmation}
                                className={errors.some(error => error.message.toLowerCase().includes('password')) ? 'error' : ''}
                                type="password"
                             />

                             <Button disabled={loading} className={loading ? 'loading' : ''} color="orange" fluid size="large">Register</Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Errors</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>Already a user? <Link to="/Login">Login</Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Register