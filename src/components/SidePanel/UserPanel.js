import React from 'react';
import firebase from '../../firebase';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';


class UserPanel extends React.Component{    

    state={
        user: this.props.currentUser
    }

    
    dropDownOptions = () => [
        {
            key: "user",
            text: <span>Signed In as 
                        <strong> {this.state.user.displayName.toUpperCase()}</strong>
                </span>,
            disabled: true
        },
        {
            key: "avatar",
            text: <span>change Avatar</span>
        },
        {
            key: "signout",
            text: <span onClick={this.handleSignOut}>Sign Out</span>
        }
    ];

    handleSignOut = () => {
        firebase
        .auth()
        .signOut();
    }

    render(){
        const { user } = this.state;
        return (
            <Grid style={{ background: '#4c3c4c'}}>
                <Grid.Column>
                    <Grid.Row style={{padding: "1.2em", margin:"0"}}>
                    {/* {App  Header} */}
                        <Header inverted floated="left" as="h2">
                            <Icon name="code"/> 
                            <Header.Content>DevChat</Header.Content>
                        </Header>
                    </Grid.Row>

                    {/* {User DropDown} */}
                    <Header style={{ padding: "2em"}} as ="h4" inverted>
                        <Dropdown trigger={
                            <span>
                                <Image src={user.photoURL} spaced="right" avatar/>
                                {user.displayName.toUpperCase()}
                            </span>
                        }
                        options={this.dropDownOptions()}
                        />
                    </Header>

                </Grid.Column>
            </Grid>
        )
    }
}


export default UserPanel;
