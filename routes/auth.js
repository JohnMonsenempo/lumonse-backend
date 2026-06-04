const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Utilisateur = require('../models/Utilisateur')

const router = express.Router()

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        let { nom, email, motDePasse } = req.body

        // Vérifier si l'email existe déjà
        let utilisateurExistant = await Utilisateur.findOne({ email })
        if (utilisateurExistant) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' })
        }

        // Hasher le mot de passe
        let salt = await bcrypt.genSalt(10)
        let motDePasseHashe = await bcrypt.hash(motDePasse, salt)

        // Créer l'utilisateur
        let utilisateur = new Utilisateur({
            nom,
            email,
            motDePasse: motDePasseHashe
        })

        await utilisateur.save()

        // Générer le token JWT
        let token = jwt.sign(
            { id: utilisateur._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.status(201).json({
            token,
            utilisateur: {
                id: utilisateur._id,
                nom: utilisateur.nom,
                email: utilisateur.email
            }
        })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        let { email, motDePasse } = req.body

        // Vérifier si l'utilisateur existe
        let utilisateur = await Utilisateur.findOne({ email })
        if (!utilisateur) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect' })
        }

        // Vérifier le mot de passe
        let motDePasseValide = await bcrypt.compare(motDePasse, utilisateur.motDePasse)
        if (!motDePasseValide) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect' })
        }

        // Générer le token JWT
        let token = jwt.sign(
            { id: utilisateur._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.json({
            token,
            utilisateur: {
                id: utilisateur._id,
                nom: utilisateur.nom,
                email: utilisateur.email
            }
        })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router