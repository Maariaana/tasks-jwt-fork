const db = require('../db');
const User = require('./User');

const Task = db.define('task', {
  titulo: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: db.Sequelize.TEXT,
    allowNull: true,
  },
  completada: {
    type: db.Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

Task.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Task;
