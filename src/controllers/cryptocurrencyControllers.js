const {Cryptocurrency: CryptocurrencyRoutes} = require("../db/sequelize");
const {Op} = require("sequelize");
const CryptocurrencyModel = require('../models/cryptocurrency');
const validType = CryptocurrencyModel.validType;

async function getCryptocurrencies(query) {
    let cryptocurrencies;
    if (Object.keys(query).length === 0) {
        cryptocurrencies = await CryptocurrencyRoutes.findAll();
    } else {
        const name = query.name;
        const code = query.code;
        const type = query.type;
        const filter = {};
        const order = query.order || 'id';
        const limit = parseInt(query.limit) || 5;
        const page = query.page ? parseInt(query.page) : 1;
        const offset = (page - 1) * limit;

        if (name) {
            if (name.length <= 1 || name.length >= 25) {
                const message = 'The cryptocurency\'s name must be between 2 and 25 characters.';
                return res.status(400).json({message});
            }
            filter.name = {
                [Op.like]: `%${name}%`
            };
        }

        if (code) {
            if (code.length !== 3) {
                const message = 'The cryptocurency\'s code must be 3 characters.';
                return res.status(400).json({message});
            }
            filter.code = {
                [Op.like]: `%${code}%`
            };
        }

        if (type) {
            if (!validType.includes(type)) {
                const message = 'The cryptocurency\'s type isn\'t in the collection.';
                return res.status(400).json({message});                    }
            filter.type = {
                [Op.like]: `%${type}%`
            };
        }
        cryptocurrencies = await CryptocurrencyRoutes.findAndCountAll({
            where: filter,
            order: [ order ],
            limit: limit,
            offset: offset
        });
        console.log(cryptocurrencies)
    }

    return cryptocurrencies;
}

module.exports = {
    getCryptocurrencies
}