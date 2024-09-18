import { Router } from 'express';
import { getUsers, createUser, updateUser, deleteUser, loginUser } from './controllers';

const router = Router();

router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Nueva ruta para el login
router.post('/login', loginUser);

export default router;
