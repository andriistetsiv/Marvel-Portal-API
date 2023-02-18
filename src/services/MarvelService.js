class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=dcd4a4957000efad9ab30bb1c9bf34ac';

  getResourse = async (url) => {
    let res = await fetch(url);

    if (!res) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };
  getAllCharacters = async () => {
    const res = await this.getResourse(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    return res.data.results.map(this._tranformCharachter);
  };
  getCharacters =  async (id) => {
    const res = await this.getResourse(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    return this._tranformCharachter(res.data.results[0])
  };

  _tranformCharachter = (char) => {
    return {
      name: char.name,
      description: char.description,
      thumbnail:
        char.thumbnail.path +
        '.' +
        char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url
    }
  }
}

export default MarvelService;