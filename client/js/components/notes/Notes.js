import React from 'react';
import { Redirect } from 'react-router-dom';
import Note from "./Note";
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { withOktaAuth } from "@okta/okta-react";

async function checkUser() {
  if (this.props.authState.isAuthenticated && !this.state.userInfo) {
    const userInfo = this.props.authState.idToken.claims;
    if (this._isMounted) {
      this.setState({ userInfo });
    }
  }
}

export default withOktaAuth(class Notes extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      newNoteBody: "",
      newNoteTitle: "",
      UserID: "",
      loggedIn: false,
      notes: null,
    };
    this.checkUser = checkUser.bind(this);
  }

  async componentDidMount() {
    this._isMounted = true;
    await this.checkUser();
    await fetch('/api/user/signup', {
      method: 'POST',
      body: JSON.stringify(this.state.userInfo)
    });
    this.getNotes();
  }

  async componentDidUpdate() {
    this._isMounted = true;
    this.checkUser();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  newNote = (event) => {
    var newNote = {
      'email': this.state.userInfo.email,
      'newNoteTitle': this.state.newNoteTitle,
      'newNoteBody': this.state.newNoteBody
    };
    fetch('/api/notes/newnote', {
      method: 'POST',
      body: JSON.stringify(newNote)
    })
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .then(result => {
        this.setState({newNoteBody: ""});
        this.setState({newNoteTitle: ""});
        this.getNotes();
      });
  }

  getNotes = (event) => {
    this.setState({ notes: null });
    fetch('/api/notes/getnotes', {
      method: 'POST',
      body: JSON.stringify(this.state.userInfo)
    })
      .then(response => response.json())
      .then(result => {
        this.setState({ notes: result });
      });
  }

  render() {
    const noteElems = [];
    if (this.state.notes) {
      for (const note of this.state.notes.entries()) {
        noteElems.push(<Note key={note[1].id} dataFromParent={note}></Note>);
      }
    }
    return (
      <Container className="flex-content-center">
        {this.state.userInfo &&
          (
            <Container className="flex-content-center">
              <h1>Welcome back, {this.state.userInfo.name}!</h1>
              <Container className="bg-secondary text-white rounded py-3 p-auto flex-content-center">
                <Form>
                  <p>Create a new Note</p>
                  <FormGroup>
                    <Label htmlFor="newNoteTitle">Title</Label>
                    <Input placeholder="New Note" id="newNoteTitle" label="Title: " name="newNoteTitle" value={this.state.newNoteTitle} onChange={this.handleChange}></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="newNoteBody">Body</Label>
                    <Input placeholder="New Note" id="newNoteBody" label="Body: " name="newNoteBody" value={this.state.newNoteBody} onChange={this.handleChange}></Input>
                  </FormGroup>
                  <FormGroup>
                    <Button className="bg-primary" onClick={this.newNote}>New +</Button>
                    <Button className="bg-info" onClick={this.getNotes}>Get Notes</Button>
                  </FormGroup>
                </Form>
                <br />
                <br />
                {noteElems}
              </Container>
            </Container>
          )
        }
      </Container>
    );
  }
});