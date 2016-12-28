import axios           from 'axios';
import { parseString } from 'xml2js';

export const BGG_API_V1_URL = 'https://www.boardgamegeek.com/xmlapi';
export const BGG_API_V2_URL = 'https://www.boardgamegeek.com/xmlapi2';

const search = (query) => {
  const url = encodeURI(`${BGG_API_V2_URL}/search?query=${query}&type=boardgame`);
  return axios.get(url).then((res) => {
    const parsePromise = new Promise((resolve) => {
      parseString(res.data, (err, result) => {
        resolve(result.items.item.map(item => {
          return {
            id: item["$"].id,
            name: item.name[0]["$"].value
          };
        }));
      });
    });
    return parsePromise;
  });
}

const findBoardGameById = (id) => {
  const url = encodeURI(`${BGG_API_V1_URL}/boardgame/${id}`);
  return axios.get(url).then((res) => {
    const parsePromise = new Promise((resolve) => {
      parseString(res.data, (err, result) => {
        const boardGame = result.boardgames.boardgame[0];
        resolve({
          id: boardGame["$"].objectid,
          name: boardGame.name.find(name => name["$"].primary === "true")["_"],
          minPlayers: boardGame.minplayers[0],
          maxPlayers: boardGame.maxplayers[0],
          imageUrl: boardGame.image ? `https:${boardGame.image[0]}` : '',
          thumbUrl: boardGame.thumbnail ? `https:${boardGame.thumbnail[0]}` : ''
        });
      });
    });
    return parsePromise;
  });
};

export const BGGApi = {
  search,
  findBoardGameById
};
