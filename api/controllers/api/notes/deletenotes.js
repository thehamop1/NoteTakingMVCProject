/**
 * NewNote
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
    friendlyName: 'DeleteNote',

    description: 'Delete a note',

    inputs: {
        user: {
            description: "The User for a given note",
            type: "number",
            requied: true
        },
        noteID: {
            type: 'string', required: true
        }
    },

    exits: {
        success: {
            responseType: ''
        }
    },

    fn: async function ({ user, noteID }) {
        let NoteRecord = await Notes.findOne({ id: noteID });
        let UserRecord = await User.findOne({
            where: { id: user }
        });

        if (NoteRecord.User != UserRecord.id) {
            console.log("FAILED TO DELETE NOTE");
            return {
                deletedNote: false
            };
        } else {
            await Notes.destroy({ id: noteID });
            return {
                deletedNote: true
            };
        }
    }
};

