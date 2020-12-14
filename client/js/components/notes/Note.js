import React from 'react';
import { Button, Label, Form, FormGroup, FormText, Col, Input } from 'reactstrap';

class Note extends React.Component {
    state = {
        data: this.props.dataFromParent,
        noteID: this.props.dataFromParent[1].id,
        user: this.props.dataFromParent[1].User,
        body: this.props.dataFromParent[1].Body,
        title: this.props.dataFromParent[1].Title,
        deleted: false
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    deleteNote = () => {
        fetch('/api/notes/deletenotes', {
            method: 'POST',
            body: JSON.stringify({
                user: this.state.user,
                noteID: this.state.noteID
            })
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.deletedNote) {
                    this.setState({deleted: true});
                }
            });
    }
    updateNoteData = () => {
        fetch('/api/notes/updatenote', {
            method: 'POST',
            body: JSON.stringify({
                user: this.state.user,
                noteID: this.state.noteID,
                newNoteTitle: this.state.title,
                newNoteBody: this.state.body
            })
        })
            .then(response => response.json())
            .then(result => {
                return result;
            });
    }
    render() {
        if (this.state.deleted) {
            return null;
        } else {
            return (
                <Form className="bg-dark rounded p-auto py-3 my-1 text-light">
                    <Col >
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input className="" id="title" name="title" onChange={this.handleChange} aria-label="empty textarea" placeholder="Empty" defaultValue={this.state.title}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="body">Body</Label>
                            <Input className="" id="body" name="body" onChange={this.handleChange} aria-label="empty textarea" placeholder="Empty" defaultValue={this.state.body}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Button className="mr-2 bg-success" onClick={this.updateNoteData}>Save</Button>
                            <Button className="bg-danger" onClick={this.deleteNote}>Delete</Button>
                        </FormGroup>
                    </Col>
                </Form>
            )
        }
    }
}

export default Note;