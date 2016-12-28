import axios from 'axios';
import sinon from 'sinon';

require('jasmine-sinon');

import { BGGApi, BGG_API_V1_URL, BGG_API_V2_URL } from './bgg_api.js';

describe("BGGApi", () => {
  describe("#search", () => {
    beforeEach(() => {
      sinon.stub(axios, 'get').returns(Promise.resolve({
        data: `
          <items total="1" termsofuse="http://boardgamegeek.com/xmlapi/termsofuse">
            <item type="boardgame" id="68448">
              <name type="primary" value="7 Wonders"/>
              <yearpublished value="2010"/>
            </item>
            <item type="boardgame" id="173346">
              <name type="primary" value="7 Wonders Duel"/>
              <yearpublished value="2015"/>
            </item>
          </items>
        `
      }));
    });

    afterEach(() => {
      axios.get.restore();
    });

    it("should make a request to /search endpoint", (done) => {
      BGGApi.search("7 Wonders").then(() => {
        expect(axios.get).toHaveBeenCalledWith(`${BGG_API_V2_URL}/search?query=7%20Wonders&type=boardgame`);
        done();
      })
    });

    it("should return parsed search result", (done) => {
      BGGApi.search("7 Wonders").then((result) => {
        expect(result).toEqual([
          { id: "68448", name: "7 Wonders" },
          { id: "173346", name: "7 Wonders Duel" }
        ]);
        done();
      })
    });
  });

  describe("#findBoardGameById", () => {
    beforeEach(() => {
      sinon.stub(axios, 'get').returns(Promise.resolve({
        data: `
          <boardgames termsofuse="http://boardgamegeek.com/xmlapi/termsofuse">
            <boardgame objectid="70323">
              <minplayers>2</minplayers>
              <maxplayers>6</maxplayers>
              <playingtime>30</playingtime>
              <minplaytime>30</minplaytime>
              <maxplaytime>30</maxplaytime>
              <age>8</age>
              <name sortindex="1">King of Tokyo: La Furia dei Mostri</name>
              <name primary="true" sortindex="1">King of Tokyo</name>              
              <description>
              In King of Tokyo, you play mutant monsters, gigantic robots, and strange aliens&mdash;all of whom are destroying Tokyo and whacking each other in order to become the one and only King of Tokyo.<br/><br/>At the start of each turn, you roll six dice, which show the following six symbols: 1, 2, or 3 Victory Points, Energy, Heal, and Attack. Over three successive throws, choose whether to keep or discard each die in order to win victory points, gain energy, restore health, or attack other players into understanding that Tokyo is YOUR territory.<br/><br/>The fiercest player will occupy Tokyo, and earn extra victory points, but that player can't heal and must face all the other monsters alone!<br/><br/>Top this off with special cards purchased with energy that have a permanent or temporary effect, such as the growing of a second head which grants you an additional die, body armor, nova death ray, and more.... and it's one of the most explosive games of the year!<br/><br/>In order to win the game, one must either destroy Tokyo by accumulating 20 victory points, or be the only surviving monster once the fighting has ended.<br/><br/>
              </description>
              <thumbnail>//cf.geekdo-images.com/images/pic3043734_t.jpg</thumbnail>
              <image>//cf.geekdo-images.com/images/pic3043734.jpg</image>
            </boardgame>
          </boardgames>
        `
      }));
    });

    afterEach(() => {
      axios.get.restore();
    });

    it("should make a request to /boardgame/:id endpoint", (done) => {
      BGGApi.findBoardGameById("70323").then(() => {
        expect(axios.get).toHaveBeenCalledWith(`${BGG_API_V1_URL}/boardgame/70323`);
        done();
      })
    });

    it("should return parsed boardgame info", (done) => {
      BGGApi.findBoardGameById("70323").then((result) => {
        expect(result).toEqual({
          id: "70323",
          name: "King of Tokyo",
          minPlayers: "2",
          maxPlayers: "6",
          imageUrl: "https://cf.geekdo-images.com/images/pic3043734.jpg",
          thumbUrl: "https://cf.geekdo-images.com/images/pic3043734_t.jpg"
        });
        done();
      })
    });
  });
});
