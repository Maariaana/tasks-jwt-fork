const { Router } = require('express');
const { 
    list, 
    create, 
    update, 
    complete, 
    remove,
    createForm,
    editForm
} = require('../controllers/taskController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = Router();

router.get("/", authMiddleware, list);

router.get("/new", authMiddleware, createForm);
router.post("/new", authMiddleware, create);

router.get("/edit/:id", authMiddleware, editForm);
router.post("/edit/:id", authMiddleware, update);

router.post("/:id/complete", authMiddleware, complete);
router.post("/:id/delete", authMiddleware, remove);


module.exports = router;