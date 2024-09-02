import express from "express";
import { 
<<<<<<< HEAD
   createChallenge, getChallanges, isPlayerHasPartner, 
=======
   createChallenge, getChallanges, 
>>>>>>> bd117058ee4d01e6fc9596bc87d402f7f452659e
   getChallangesByChallengedId, getChallangesByChallengerId,
   updateChallengeByChallanged, updateChallengeByChallanger,
   updateChallengeMatchStatusByChallanged
} from "../controllers/ChallengeController.js";


const router = express.Router();

router.post('/challenge', createChallenge);
<<<<<<< HEAD
router.post('/challenge-check-double', isPlayerHasPartner);
=======
>>>>>>> bd117058ee4d01e6fc9596bc87d402f7f452659e
router.get('/challenges', getChallanges);
router.get('/challenges-by-challenged-id/:id', getChallangesByChallengedId);
router.get('/challenges-by-challenger-id/:id', getChallangesByChallengerId);
router.patch('/challenges-by-challenged-id/:id', updateChallengeByChallanged);
router.patch('/challenges-by-challenger-id/:id', updateChallengeByChallanger);
router.patch('/challenges-match-status/:id', updateChallengeMatchStatusByChallanged);

export default router;