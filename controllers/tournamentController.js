const Tournament = require('../models/Tournament');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config()

exports.addUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const userID = jwt.verify(token, process.env.SECRETKEY)._id;
        const tournamentID = req.params.tournamentID;
        const {gameID, address} = req.body;
        Tournament.findOne({ _id: tournamentID,  'players.userName': userID })
            .then((tournament) => {
                if (!tournament) {
                    Tournament.updateOne(
                        { _id: tournamentID },
                        {
                            $addToSet: {
                                players: {
                                    userName: userID,
                                    gameID: gameID,
                                    wallet: address,
                                }
                            }
                        }
                    )
                        .then(() => console.log('Update successful'))
                        .catch(err => console.log(err))
                } else {
                    console.log('Player with this gameID or userName already exists')
                    return res.status(401).json({ message: 'Player with this gameID or userName already exists' });
                }
            })
            .catch((error) => {
                console.log(error);
                return res.status(401).json({ message: 'Error' });
            });
    } catch (err) {
        res.status(500).json({ message: req.body });
    }
}

exports.checkUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const userID = jwt.verify(token, process.env.SECRETKEY)._id;
        const tournamentID = req.params.tournamentID;
        Tournament.findOne({ _id: tournamentID,  'players.userName': userID })
            .then((tournament) => {
                if (!tournament) {
                    return res.status(200).json({message:'success'});
                } else {
                    return res.status(401).json({ message: 'Already registered' });
                }
            })
            .catch((error) => {
                console.log(error);
                return res.status(401).json({ message: 'Error' });
            });
    } catch (err) {
        res.status(500).json({ message: req.body });
    }
}
