const collectionController = {
    // POST para criar uma arrecadação
    createCollection: (req, res) => {
        const { idGroup, validity, foods, quantityKG, proof } = req.body;

        const collection = {
            idGroup: idGroup,
            validity: validity,
            foods: foods,
            quantityKG: quantityKG,
            proof: proof
        }

        
    }
}