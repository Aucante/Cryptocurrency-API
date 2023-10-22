const { Cryptocurrency: CryptocurrencyRoutes } = require('../db/sequelize')
const errorHandler = require('../Handler/errorHandler')

module.exports = (app) => {
    app.get('/api/cryptocurrencies', async (req, res) => {
        let cryptocurrencies;
        try {
            const filter = {};
            if (req.query.name) {
                filter.name = req.query.name;
            }

            if (req.query.code) {
                filter.code = req.query.code;
            }

            if (req.query.type) {
                filter.type = req.query.type;
            }
            cryptocurrencies = await CryptocurrencyRoutes.findAll({
                where: filter
            });
            const message = 'Cryptocurrencies list is retrieved.';
            res.json({message, data: cryptocurrencies});
        } catch (error) {
            errorHandler.handleCryptocurrencyInternalError(res, error);
        }
    });

    app.get('/api/cryptocurrencies/:id', async (req, res) => {
        try {
            const cryptocurrency = await CryptocurrencyRoutes.findByPk(req.params.id);
            if (cryptocurrency) {
                const message = 'Cryptocurrency found.';
                res.json({ message, data: cryptocurrency });
            } else {
                res.status(404).json({ error: 'Cryptocurrency not found. Try with another cryptocurrency.' });
            }
        } catch (error) {
            errorHandler.handleCryptocurrencyInternalError(res, error);
        }
    });

    app.post('/api/cryptocurrencies', async (req, res) => {
        try {
            const { name, code, picture, type } = req.query;
            const newCrypto = await CryptocurrencyRoutes.create({ name, code, picture, type });
            const message = 'Cryptocurrency created successfully.';
            res.json({ message, data: newCrypto });
        } catch (error) {
            errorHandler.handleCryptocurrencyInsertError(res, error);
        }
    });

    app.put('/api/cryptocurrencies/:id', async (req, res) => {
        try {
            const { name, code, picture } = req.query;
            const cryptocurrency = await CryptocurrencyRoutes.findByPk(req.params.id);
            if (cryptocurrency) {
                cryptocurrency.name = name ?? cryptocurrency.name;
                cryptocurrency.code = code ?? cryptocurrency.code;
                cryptocurrency.picture = picture ?? cryptocurrency.picture;
                cryptocurrency.type = type ?? cryptocurrency.type;
                await cryptocurrency.save();
                const message = 'Cryptocurrency updated successfully.';
                res.json({ message, data: cryptocurrency });
            } else {
                res.status(404).json({ error: 'Cryptocurrency not found. Try with another cryptocurrency.' });
            }
        } catch (error) {
            errorHandler.handleCryptocurrencyInsertError(res, error);
        }
    });

    app.delete('/api/cryptocurrencies/:id', async (req, res) => {
        try {
            const cryptocurrency = await CryptocurrencyRoutes.findByPk(req.params.id);
            if (cryptocurrency) {
                await cryptocurrency.destroy();
                const message = 'Cryptocurrency deleted successfully.';
                res.json({ message });
            } else {
                res.status(404).json({ error: 'Cryptocurrency not found. Try with another cryptocurrency.' });
            }
        } catch (error) {
            errorHandler.handleCryptocurrencyInternalError(res, error);
        }
    });
};