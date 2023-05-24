import { Router } from "express";
import * as UserController from '../controllers/UserController'
import * as UserValidator from '../validators/UserValidator'

import * as PublicationValidator from '../validators/PublicationValidator'

import * as BlogController from '../controllers/BlogController'

import { AuthToken } from '../validators/Auth'

const router = Router();


// teste rotas;
router.get('/ping', UserController.ping);

router.post('/user/register',                       UserValidator.signup,             UserController.register            )
router.post('/user/login',                          UserValidator.signin,             UserController.login               )
router.put('/user/:id',       AuthToken,            UserValidator.edit,               UserController.edit                )

router.get('/blog/all',       AuthToken,                                              BlogController.AllPublication      )
router.post('/blog/add',      AuthToken,            PublicationValidator.add,         BlogController.addPublication      )
router.delete('/blog/:id',    AuthToken,                                              BlogController.deletePublication   )
router.put('/blog/:id',       AuthToken,            PublicationValidator.edit,        BlogController.editPublication     )


export default router;