import React, { Component } from 'react';
import ChatMessages from './ChatMessages';
import ChatForm from './ChatForm';
import UsersList from './UsersList';
import * as axiosHelper from './helpers/axiosHelper';
import Echo from 'laravel-echo';

class Chat extends Component {

  constructor(props){
    super(props);

    this.state = {
      messages: [],
      users: [],
    }

    this.onMessageSubmit = this.onMessageSubmit.bind(this);
  }

  //placeholder
    onMessageSubmit(newMessage){

    let newMsgData = { message: newMessage, user: this.props.currentUser }

    axios(axiosHelper.storeNewMessageConfig(this.props.token, newMsgData))
    .then(response => {

      //handle user message submit
      this.setState({messages: response.data.messages})
    })
    .catch(error => {
      console.log(error.response.data)
    })


  }

  async componentDidMount(){

    // console.log('da dashboard currentUser ', this.props.currentUser)
    // console.log('da dashboard token ', this.props.token)
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: process.env.MIX_PUSHER_APP_KEY,
        wsHost: window.location.hostname,
        wsPort: 6001,
        disableStats: true,
        auth: {
        headers: { Authorization: 'Bearer ' + this.props.token },
      },
    });

    window.Echo.join('chat')
        .here(users => {
            console.log('here there are', users);
            this.setState((prevState) => {
                return { users: [...prevState.users,...users]}
            });
        })
        .joining(user => {
            console.log('new join', user);
            this.setState((prevState) => ({ users: [ ...prevState.users, user ] }));
        })
        .leaving(user => {
            console.log('i am leaving... ', user);
            //to avoid problems change the state only if this is not you
            if (user.id !== this.props.currentUser.id){
              this.setState((prevState) => ({
                users: prevState.users.filter(u => u.id !== user.id)
              }))
            }


        })
        .listenForWhisper('typing', ({id, name}) => {
            console.log(name + ' typed ');

            this.setState((prevState) => {

              prevState.users.forEach((user, index) => {
                  if (user.id === id) {
                      user.typing = true;
                  }
              });
              // console.log(prevState.users);

              return { users: prevState.users }

        })
      })
        .listen('MessageSent', (event) => {


            this.setState((prevState) => {

              let newMessage = {
                  message: event.message.message,
                  user: event.user
              }

              prevState.users.forEach((user, index) => {
                  if (user.id === event.user.id) {
                      user.typing = false;

                  }
              });

              var newState = { messages: [...prevState.messages, newMessage],
                        users: prevState.users }

              console.log('state after message submit', newState);


              return newState;
            })

        });


    console.log('echo actions ok');

    try {
    const {data}  = await axios(axiosHelper.getMessagesConfig(this.props.token));

    console.log('done getMessages call',data );

    this.setState({ messages: data.messages})


  } catch(error){

    console.log(error.response.data)
  }

}

  render() {

    return (
      <div className="container chats py-5">
          <div className="row">
              <div className="col-md-8 col-md-offset-2">
                  <div className="card card-default">
                      <div className="card-header">Chats</div>
                      <div className="card-body">
                          <ChatMessages
                          messages={this.state.messages}
                          onMessageSent={this.onMessageSubmit}
                          />
                      </div>
                      <div className="card-footer">
                          <ChatForm
                           currentUser={this.props.currentUser}
                           onMessageSent={this.onMessageSubmit}
                           />
                      </div>
                  </div>
              </div>
              <div className="col-md-4">
                  <UsersList users={this.state.users}/>
              </div>
          </div>
      </div>
    );
  }
}

export default Chat;
