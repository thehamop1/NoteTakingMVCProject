/**
 * NewNote
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
    friendlyName: 'GetNotes',

    description: 'Get the notes for a user',

    inputs: {
        email: {
            description: "The login name for a user.",
            type: "string",
            requied: true
        },
    },
    exits: {
        success: {
            responseType: ''
        },
        notFound: {
            responseType: ''
        }
    },

    fn: async function ({email}) {
        let user = await User.findOne({UserName: email});
        let record = await Notes.find({
            where:{
                User: user.id
            }//If i want to selet really specific things i can use the select obj here
        });


        return record;
    }

};

