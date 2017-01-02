import { internet, name, random } from 'faker/locale/en';
import sinon                      from 'sinon';

import { facebookApi }            from '../services/facebook_api.js';
import { User }                   from './user.js';

describe('User', () => {
  let subject = null, userData = null;

  beforeEach((done) => {
    userData = {
      id: random.uuid(),
      name: name.findName(),
      email: internet.email()
    };
    sinon.stub(facebookApi, 'getUserData').returns(Promise.resolve(userData));

    User.sync({ force: true }).then(() => {
      subject = User.build({
        uid: random.uuid(),
        provider: 'facebook',
        name: name.findName(),
        email: internet.email(),
        apiKey: random.uuid()
      });
      done();
    }, (error) => {
      console.error(error);
      done();
    });
  });

  afterEach(() => {
    facebookApi.getUserData.restore();
  });

  it("should be valid", (done) => {
    subject.save()
      .then(() => {
        return User.count();
      })
      .then((count) => {
        expect(count).toBe(1);
        done();
      })
      .catch(done.fail);
  });
  
  describe("#findOrCreateFromFacebook", () => {
    it("should use facebookApi to get user data", (done) => {
      User.findOrCreateFromFacebook("1234")
        .then(() => {
          expect(facebookApi.getUserData).toHaveBeenCalledWith("1234");
          done();
        })
        .catch(done.fail);
    });

    it("should create a new user", (done) => {
      User.findOrCreateFromFacebook("1234")
        .then((user) => {
          expect(user.uid).toBe(userData.id);
          expect(user.name).toBe(userData.name);
          expect(user.email).toBe(userData.email);
          done();
        })
        .catch(done.fail);
    });

    it("should return the same user if called twice", (done) => {
      User.findOrCreateFromFacebook("1234")
        .then(() => {
          return User.findOrCreateFromFacebook("1234");
        })
        .then(() => {
          return User.count();          
        })
        .then((count) => {
          expect(count).toBe(1);
          done();
        })
        .catch(done.fail);
    });
  });
});
