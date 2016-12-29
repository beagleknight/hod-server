import FB              from 'fb';
import sinon           from 'sinon';

require('jasmine-sinon');

import { internet, name, random } from 'faker/locale/en';

import { facebookApi } from './facebook_api.js';

describe("facebookApi", () => {
  const userData = {
    id: random.uuid(),
    name: name.findName(),
    email: internet.email()
  };

  describe("#getUserData", () => {
    beforeEach(() => {
      sinon.stub(FB, 'setAccessToken');
      sinon.stub(FB, 'api').yields(userData);
    });

    afterEach(() => {
      FB.setAccessToken.restore();
      FB.api.restore();
    });

    it("should call FB setAccessToken with the given token", (done) => {
      facebookApi.getUserData("1234").then(() => {
        expect(FB.setAccessToken).toHaveBeenCalledWith("1234");
        done();
      });
    });

    it("should return user data given a token", (done) => {
      facebookApi.getUserData("1234").then((result) => {
        expect(FB.api).toHaveBeenCalledWith("me");
        expect(result).toEqual(userData);
        done();
      });
    });
  })
});
