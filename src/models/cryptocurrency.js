const validType = ['PoW', 'PoS', 'PoC', 'DPos', 'LPos', 'PoH', 'PoSe', 'PoA', 'PoHold', 'Pol', 'DAG'];

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Cryptocurrency', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: 'The name is a required property.'
                },
                len: {
                    args: [1, 15],
                    msg: 'The name must be between 1 and 15 characters.'
                }
            }
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: 'The code is a required property.'
                },
                len: {
                    args: [3, 3],
                    msg: 'The code must be exactly 3 characters long.'
                }
            }
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isTypeValid(value) {
                    if (!validType.includes(value)) {
                        throw new Error('Type is not in collection. Please insert another type.')
                    }
                },
                notNull: {
                    msg: 'Type must exist.'
                }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        updatedAt: false
    })
}

module.exports.validType = validType;