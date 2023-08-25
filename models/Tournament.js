const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  player: {
    type: [String], // Array of strings
    default: [],
  },
  date: Date,
  result: Boolean,
});


const TournamentSchema = new mongoose.Schema({
  players: {
    type:[{
      userName: {
        type: String,
        required: true,
        unique:true
      },
      gameID: {
        type: String,
        required: true,
        unique: true
      },
      wallet: {
        type: String,
        required: true,
      }
    }],
    default:[]
  },
  matches:{
    type:[MatchSchema],
    default:[]
  },
  start_date:{
    type: Date
  },
  end_date:{
    type: Date
  },
  img:String,
  rule:String,
  description:String
});

const Tournament = mongoose.model('Tournament', TournamentSchema);

module.exports = Tournament;