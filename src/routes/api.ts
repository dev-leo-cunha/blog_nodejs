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
router.post('/user/edit',     AuthToken,            UserValidator.edit,               UserController.edit                )

router.post('/blog/all',      AuthToken,                                              BlogController.AllPublication      )
router.post('/blog/add',      AuthToken,            PublicationValidator.add,         BlogController.addPublication      )
router.post('/blog/del',      AuthToken,            PublicationValidator.del,         BlogController.deletePublication   )
router.post('/blog/edit',     AuthToken,            PublicationValidator.edit,        BlogController.editPublication     )


export default router;