const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const Produit = require('./models/Produit')

const app = express()
const PORT = process.env.PORT || 3000
const authentifier = require('./middleware/auth')
app.use(cors())
app.use(express.json())
const authRoutes = require('./routes/auth')
const Utilisateur = require('./models/Utilisateur')
app.use('/api/auth', authRoutes)

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.log('Erreur de connexion :', err))

// GET — tous les produits
app.get('/api/produits', async (req, res) => {
    try {
        let produits = await Produit.find()
        res.json(produits)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// GET — un produit par id
app.get('/api/produits/:id', async (req, res) => {
    try {
        let produit = await Produit.findById(req.params.id)
        if (!produit) {
            return res.status(404).json({ message: 'Produit non trouvé' })
        }
        res.json(produit)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// POST — créer un produit
app.post('/api/produits', async (req, res) => {
    try {
        let produit = new Produit({
            nom: req.body.nom,
            prix: req.body.prix,
            categorie: req.body.categorie,
            image: req.body.image
        })
        let nouveauProduit = await produit.save()
        res.status(201).json(nouveauProduit)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// PUT — modifier un produit
app.put('/api/produits/:id', async (req, res) => {
    try {
        let produit = await Produit.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(produit)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// DELETE — supprimer un produit
app.delete('/api/produits/:id', async (req, res) => {
    try {
        await Produit.findByIdAndDelete(req.params.id)
        res.json({ message: 'Produit supprimé' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`)
})

// Route protégée — profil utilisateur
app.get('/api/profil', authentifier, async (req, res) => {
    try {
        let utilisateur = await Utilisateur.findById(req.utilisateur.id).select('-motDePasse')
        res.json(utilisateur)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})