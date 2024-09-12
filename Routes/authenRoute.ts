import { Router } from 'express';
import { loginValidator, signupValidator } from '../utils/validators/authenValidator';
import { login, signup } from '../controllers/authen';
const authenRoute:Router=Router()
authenRoute.post('/signup',signupValidator,signup)
authenRoute.post('/login',loginValidator,login)
export default authenRoute