/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
//This used to be way bigger until i started using okta
module.exports = {
    attributes: {
      UserName: { type: "string", required: true, unique: true},
      Notes:{
        collection: 'Notes',
        via: "User"
      }
    },
  };
  