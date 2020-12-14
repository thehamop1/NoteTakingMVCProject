/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  friendlyName: 'Sign Up',

  description: 'If a new user is seen after Okta auth.',

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
  },


  fn: async function (email) {
    var id = email.email;
    var doesExist = await User.find({ UserName: id });
    console.log(doesExist);
    if(doesExist.length < 1 || !doesExist) 
      await User.create({UserName:id}).fetch();
    return {return: true};
  }
};

