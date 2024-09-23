import express from "express";
import Challenge from "../models/ChallengeModel.js";
import Match from "../models/MatchModel.js";
import User from "../models/UserModel.js";


const router = express.Router();

router.post('/challenge', async (req, res) => {
      const matchDateInput = new Date(req.body["matchDate"]).toISOString();
      const startOfDay = new Date(new Date(matchDateInput).setUTCHours(0, 0, 0, 0));
      const endOfDay = new Date(new Date(matchDateInput).setUTCHours(23, 59, 59, 999));

      // Cari matches berdasarkan tanggal
      const result = await Match.find({
         matchDate: {
            $gte: startOfDay,
            $lt: endOfDay
         }
      });

      const filteredMatch = result.map(match => {
         if (
               match.matchOne.teamOne.playerOneId === req.body["challenger"] ||
               match.matchOne.teamOne.playerTwoId === req.body["challenger"] ||
               match.matchOne.teamTwo.playerOneId === req.body["challenger"] ||
               match.matchOne.teamTwo.playerTwoId === req.body["challenger"] ||

               match.matchOne.teamOne.playerOneId === req.body["challengerPartner"] ||
               match.matchOne.teamOne.playerTwoId === req.body["challengerPartner"] ||
               match.matchOne.teamTwo.playerOneId === req.body["challengerPartner"] ||
               match.matchOne.teamTwo.playerTwoId === req.body["challengerPartner"] ||

               match.matchOne.teamOne.playerOneId === req.body["challenged"] ||
               match.matchOne.teamOne.playerTwoId === req.body["challenged"] ||
               match.matchOne.teamTwo.playerOneId === req.body["challenged"] ||
               match.matchOne.teamTwo.playerTwoId === req.body["challenged"] ||

               match.matchOne.teamOne.playerOneId === req.body["challengedPartner"] ||
               match.matchOne.teamOne.playerTwoId === req.body["challengedPartner"] ||
               match.matchOne.teamTwo.playerOneId === req.body["challengedPartner"] ||
               match.matchOne.teamTwo.playerTwoId === req.body["challengedPartner"] 
            ) {
               return match
         }
      }).filter(match => match != null);

      const errorResults = filteredMatch.map(match => {
         const matchDate = new Date(match.matchDate);

         const compareDate = new Date(req.body["matchDate"]) - matchDate;

         return { match, compareDate }
      }).filter(match => match != null).sort((a, b) => a.compareDate - b.compareDate)[0];

      const errorDate =  new Intl.DateTimeFormat('id-ID', {
         dateStyle: 'full',
         timeStyle: 'long',
         timeZone: 'Asia/Jakarta',
      }).format(errorResults.match.matchDate)
      
      const results = filteredMatch.map(match => {
         const matchDate = new Date(match.matchDate);

         const compareDate = new Date(req.body["matchDate"]) - matchDate;
         const threeHours = 2 * 60 * 60 * 1000;

         if (compareDate > threeHours) {
            return { match, compareDate };
         }
      }).filter(match => match != null).sort((a, b) => a.compareDate - b.compareDate)[0];

      // mengecek tanggal
      if (results) {
            const challenger = await User.findById(req.body["challenger"]);
            const challenged = await User.findById(req.body["challenged"]);

            if (req.body["matchType"] === "double") {
               if (challenger.partnerId !== "" && challenged.partnerId !== "" ) {
                  await Challenge.create({
                     challenger: {
                        id: req.body["challenger"],
                        partnerId: req.body["challengerPartner"]
                     },
                     challenged: {
                        id: req.body["challenged"],
                        partnerId: req.body["challengedPartner"]
                     },
                     matchReferee: req.body["matchReferee"],
                     matchType: req.body["matchType"],
                     matchDate: req.body["matchDate"]
                  })
                  .then((result) => {
                     res.status(201).json(result)
                  })
                  .catch((error) => {
                     res.status(404).json({message: error.message});
                  })
               } else {
                  return res.status(400).json({ messageError: "Player ini atau Kamu belum punya partner, tidak bisa pertandingan ganda" });
               }
            } else if (req.body["matchType"] === "single") {
                  await Challenge.create({
                     challenger: {
                        id: req.body["challenger"]
                     },
                     challenged: {
                        id: req.body["challenged"]
                     },
                     matchReferee: req.body["matchReferee"],
                     matchType: req.body["matchType"],
                     matchDate: req.body["matchDate"]
                  })
                  .then((result) => {
                     res.status(201).json(result)
                  })
                  .catch((error) => {
                     res.status(404).json({message: error.message});
                  })
            }
      } else {
         return res.status(404).json({messageError: `Pemain tersebut ada tanding, input jam harus lebih dari 3 jam. ${errorDate}`});
      }
});

router.get('/challenges', async (req, res) => {
   await Challenge.find()
   .then((result) => {
      res.json(result);
   })
   .catch((error) => {
      res.status(500).json({message: error.message});
   });
});

router.get('/challenges-by-challenged-id/:id', async (req, res) => {
   await Challenge.find({"challenged.id": req.params.id})
   .then((result) => {
      res.json(result);
   })
   .catch((error) => {
      res.status(500).json({message: error.message});
   });
});

router.get('/challenges-by-challenger-id/:id', async (req, res) => {
   await Challenge.find({"challenger.id": req.params.id})
   .then((result) => {
      res.json(result);
   })
   .catch((error) => {
      res.status(500).json({message: error.message});
   });
});

router.patch('/challenges-by-challenged-id/:id', async (req, res) => {
   await Challenge.updateOne({_id: req.params.id}, 
      {
         $set: {
            "challenged.notificationStatus": req.body["notification-status"]
         }
      }
   )
   .then((result) => {
      res.status(200).json(result)
   })
   .catch((error) => {
      res.status(404).json({message: error.message});
   })
});

router.patch('/challenges-by-challenger-id/:id', async (req, res) => {
   await Challenge.updateOne({_id: req.params.id}, 
      {
         $set: {
            "challenger.notificationStatus": req.body["notification-status"]
         }
      }
   )
   .then((result) => {
      res.status(200).json(result)
   })
   .catch((error) => {
      res.status(404).json({message: error.message});
   })
});

router.patch('/challenges-match-status/:id', async (req, res) => {
   await Challenge.updateOne({_id: req.params.id}, 
      {
         $set: {
            "challenger.notificationStatus": req.body["notification-status"],
            "challenged.notificationStatus": req.body["notification-status"],
            matchStatus: req.body["match-status"]
         }
      }
   )
   .then((result) => {
      res.status(200).json(result)
   })
   .catch((error) => {
      res.status(404).json({message: error.message});
   })
});

export default router;
