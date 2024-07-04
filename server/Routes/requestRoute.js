const express = require('express');
const requestController = require('../Controllers/requestController');

const router = express.Router();

router.post('/add', requestController.addRequest);
router.get('/get-all', requestController.getAllRequest);
router.get('/get-ins/:id', requestController.getAllRequestByInstructor);
router.get('/get-owner/:id', requestController.getAllRequestByOwner);
router.get('/get-public-inactive', requestController.getAllPublicInstructoringRequest);
router.get('/get-public-active',requestController.getAllPublicSessionParticipationRequest);
router.get('/get-closed/:id',requestController.getClosedRequest);
router.put('/put-status/ins', requestController.updateRequestStatusAndInstructor);
router.put('/put/price', requestController.updateRequestPrice);
router.put('/closed/:id', requestController.updateRequestClosed);
router.delete('/delete/:id', requestController.deleteRequestbyId);
module.exports = router;