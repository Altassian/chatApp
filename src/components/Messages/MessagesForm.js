import React from 'react';
import firebase from '../../firebase';
import { Segment, Button, Input } from 'semantic-ui-react';

class MessagesForm extends React.Component{
    state= {
        message:'',
        loading:false,
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        errors: []
    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    createMessage = () => {
        const message = {
            timeStamp: firebase.database.ServerValue.TIMESTAMP,
            user : {
                id: this.state.user.uid,
                name: this.state.user.displayName,
                avatar: this.state.user.photoURL
            },
            content: this.state.message
        };
        return message;
    }

    sendMessage = () => {
        const { messagesRef } = this.props;
        const { message, channel } = this.state;
        console.log(channel);
        if(message){
            this.setState({loading:true});
            messagesRef
                .child(channel.id)
                .push()
                .set(this.createMessage())
                .then(() => {
                    this.setState({ loading: false, message: '', errors: []})
                })
                .catch(err => {
                    console.log(err);
                    this.setState({
                        loading: false,
                        errors: this.state.errors.concat(err)
                    })
                })
        }
        else{
            this.setState({
                errors: this.state.errors.concat({ message: 'Add a message' })
            })
        }
    }
    render(){
        const { errors, message, loading } = this.state;
        return(
            <Segment className="message__form">
                <Input
                    fluid
                    name="message"
                    onChange={this.handleChange}
                    value={message}
                    style={{marginBottom: "0.7em"}}
                    label={<Button icon="add" />}
                    labelPosition="left"
                    placeholder="Write your message"
                    className={errors.some(error => error.message.includes('message'))? 'error': ''}
                />

                <Button.Group icon widths="2">
                <Button
                    onClick={this.sendMessage}
                    disabled={loading}
                    color="orange"
                    content="Add Reply"
                    labelPosition="left"
                    icon="edit"
                />
                <Button 
                    color="teal"
                    content="Upload Media"
                    labelPosition="right"
                    icon="cloud upload"
                />
                

                </Button.Group>

            </Segment>
        )
    }
}

export default MessagesForm;