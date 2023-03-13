const express = require('express');
const router = express.Router({ mergeParams: true });
const parser = require("body-parser");
const connection = require('../config/database');
const auth = require('../middleware/auth');

router.use(parser.json());
router.use(parser.urlencoded({
  extended: true
}));

/**
 * Route pour les recettes
 */

//GET recettes ok
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM recette';
  connection.query(sql, (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get recettes");
    } else {
      res.json(results);
      res.status(200);
      console.log("Get des recettes à afficher avec succés");
    }
  });
});


// Filtre map categorie table recette ok
router.get('/filtre', (req, res) => {
  connection.query('SELECT distinct categories FROM recette ',
    (err, results) => {
      if (err) {
        res.status(501).send("couldn't get filter categorie recette");
        console.log('Erreur requete Get filter categorie recette');
      } else {
        console.log('Table recette filter categorie recupéré avec succées');
        res.status(200);
        res.json(results);
      }
    });
});

// PUT recette ok
router.put("/:id", (req, res) => {
  const idSuivi = req.params.id;
  const changementValue = req.body;
  connection.query(
    "UPDATE recette SET ? WHERE id_recette=?",
    [changementValue, idSuivi],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't put recette" + error);
        console.log("Dommage update d un recette!");
      } else {
        res.json(req.body);
        console.log("update d'un recette avec succés");
      }
    }
  );
});


//DELETE recette ok
router.delete('/:id', (req, res) => {
  connection.query("DELETE FROM recette WHERE id_recette=?",
    [req.params.id],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't retrieve recette" + error);
      } else {
        res.json(req.body);
        res.status(200);
        console.log("suppression de la recette avec l'id N° " + req.params.id + " avec succés");
      }
    }
  );
});

module.exports = router;
