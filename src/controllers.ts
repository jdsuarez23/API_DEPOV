import { Request, Response } from 'express';
import { pool } from './db';
import jwt from 'jsonwebtoken'; // Para generar el token JWT

// Método login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Buscar el usuario por el nombre de usuario
    const [users]: any = await pool.query('SELECT * FROM register WHERE username = ?', [username]);

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];

    // Comparar la contraseña ingresada con la almacenada (sin usar bcrypt)
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });

    // Devolver el token al cliente
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login user' });
  }
};


// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM register');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Create a user
export const createUser = async (req: Request, res: Response) => {
    try {
      const { username, password, email, celular, documento } = req.body;
      const [result]: any = await pool.query(
        'INSERT INTO register (username, password, email, celular, documento) VALUES (?, ?, ?, ?, ?)',
        [username, password, email, celular, documento]
      );
      res.status(201).json({ id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  };  

// Update a user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, password, email, celular, documento } = req.body;
    await pool.query('UPDATE register SET username = ?, password = ?, email = ?, celular = ?, documento = ? WHERE id = ?', [username, password, email, celular, documento, id]);
    res.json({ message: 'User updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM register WHERE id = ?', [id]);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
