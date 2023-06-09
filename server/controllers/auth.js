import { db } from '../config/config.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = (req, res) => {
    const q = "SELECT * FROM usu_usuarios WHERE usu_email = ?"
    db.query(q, [req.body.email], (err, data) => {
        if (err) {
            return res.json(err)
        }
        if (data.length) {
            return res.status(409).json("E-mail já cadastrado")
        }
        var salt = bcrypt.genSaltSync(10)
        var hash = bcrypt.hashSync(req.body.senha, salt)

        const q = "INSERT INTO usu_usuarios (`usu_email`, `usu_senha`, `usu_nome`) VALUES (?)"
        const values = [
            req.body.email,
            hash,
            req.body.nome
        ]

        db.query(q, [values], (err, data) => {
            if (err) {
                return res.json(err)
            }
            return res.status(200).json("Usuário cadastrado com sucesso!")
        })
    })
}

export const login = (req, res) => { 
    const q = "SELECT * FROM usu_usuarios WHERE usu_email = ?"

    db.query(q, [req.body.email], (err, data) => {
        if (err) {
            return res.json(err)
        }
        if (data) {
            const senhaCorreta = bcrypt.compareSync(req.body.senha, data[0].usu_senha)

            if (!senhaCorreta) {
                return res.status(400).json("Email ou senha incorretos!")
            }else{
                const id = data[0].usu_id
                var token = jwt.sign({ id: id }, 'jwtSecurity');
                res.cookie("token", token,{
                    httpOnly: true
                })
                return res.status(200).json(token)
            }
        }
    })
}

export const logout = (req, res) => {
}
