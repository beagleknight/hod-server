import Sequelize       from 'sequelize';
import uuid            from 'uuid';

import { facebookApi } from '../services/facebook_api.js';

const sequelize = new Sequelize(process.env.DB_URL, { logging: false });

export const User = sequelize.define('user', {
  id: { 
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  uid: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false    
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false    
  },
  provider: {
    type: Sequelize.STRING,
    allowNull: false    
  },
  apiKey: {
    type: Sequelize.TEXT,
    unique: true,
    allowNull: false,
    field: 'api_key'    
  }
}, {
  classMethods: {
    findOrCreateFromFacebook: (token) => {
      return User.sync()
        .then(() => {
          return facebookApi.getUserData(token);
        })
        .then(({ id, name, email }) => {
          return User.findOne({
            where: {
              uid: id,
              provider: 'facebook'
            }
          })
          .then(user => {
            if (user) {
              return user;
            }
            return User.create({
              uid: id,
              provider: 'facebook',
              name,
              email,
              apiKey: uuid.v4()
            });
          });
        });
    }
  }
})
