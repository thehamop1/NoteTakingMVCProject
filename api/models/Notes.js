/**
 * Notes.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    Title: { type: "string", required: true},
    Body: {type: "string", required: true},
    User:{
      model: 'User'
    }
  },
};

