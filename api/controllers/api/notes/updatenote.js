/**
 * NewNote
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
    friendlyName: 'Update Note',

    description: 'Update a note',

    inputs: {
        user: {
            description: "The User for a given note",
            type: "number",
            requied: true
        },
        noteID:{
            type: 'string', required: true
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

    fn: async function ({ user, noteID, newNoteTitle, newNoteBody }) {
        // console.log(user);
        let NoteRecord = await Notes.findOne({id: noteID});
        let UserRecord = await User.findOne({
            where: {id: user}
        });
        console.log(NoteRecord.User);
        console.log(UserRecord.id);

        if(NoteRecord.User != UserRecord.id){
            console.log("FAILED TO UPDATE NOTE");
            return {
                updatedNote: false
            };
        }else{
            await Notes.updateOne({id: noteID}).set({Title: newNoteTitle});
            await Notes.updateOne({id: noteID}).set({Body: newNoteBody});
            return {
                updatedNote: true
            };
        }
    }
};

