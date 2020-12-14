/**
 * NewNote
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
    friendlyName: 'NewNote',

    description: 'Create a new note.',

    inputs: {
        email: {
            description: "The login name for a user.",
            type: "string",
            requied: true
        },
        newNoteTitle: {
            type: 'string', required: true
        },
        newNoteBody: {
            type: 'string', required: true
        }
    },

    exits: {
        success: {
            responseType: ''
        }
    },

    fn: async function ({ email, newNoteTitle, newNoteBody }) {
        let id = email;
        let title = newNoteTitle;
        let body = newNoteBody;

        let user = await User.findOne({UserName: id});
        let record = await Notes.create({User: user.id , Title: title, Body: body}).fetch();

        console.log(record);

        return {
            createdNote: true
        };
    }


};

