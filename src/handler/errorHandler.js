module.exports = {
    handleCryptocurrencyInsertError: (res, error) => {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: 'Cryptocurrency with the same code or name already exists.' });
        } else if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map(err => err.message);
            res.status(400).json({ error: 'Validation failed.', validationErrors });
        } else {
            console.error('Error:', error.name);
            res.status(500).json({ error: 'Internal server error.' });
        }
    },
    handleCryptocurrencyInternalError: (res, error) => {
        res.status(500).json({ error: 'Internal server error.' });
    }
};
