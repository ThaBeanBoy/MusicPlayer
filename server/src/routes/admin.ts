import { Router } from 'express';
import YTMusic, { ArtistFull } from 'ytmusic-api';
import httpStatus from 'http-status';
import Url from 'url-parse';
import isURL from 'validator/lib/isURL';
import download from 'image-downloader';

const artistChannelUrlPattern = /^\/channel\/[0-9a-zA-Z_-]+$/;

const adminRoutes = Router();

adminRoutes.post('/artist', async (req, res) => {
  try {
    // getting artist id
    let artistId = req.body.artist as string;

    if (isURL(artistId)) {
      const url = new Url(artistId);

      // checking hostname
      if (url.hostname !== 'music.youtube.com') {
        res.status(httpStatus.NOT_ACCEPTABLE);
        res.json({ message: "URL's hostname is not music.youtube.com" });
        return;
      }

      // getting channel id
      if (!artistChannelUrlPattern.test(url.pathname)) {
        res.status(httpStatus.NOT_ACCEPTABLE);
        res.json({
          message: "Path name should follow this pattern '/channel/artist_id'",
        });
        return;
      }

      const pathNameSplit = url.pathname.split('/');
      artistId = pathNameSplit[pathNameSplit.length - 1];
    }

    // getting artist
    const ytmusic = await new YTMusic().initialize();

    if (!ytmusic) throw Error;

    let artist: ArtistFull;

    try {
      artist = await ytmusic.getArtist(artistId);
    } catch {
      res.status(httpStatus.NOT_FOUND);
      res.send({ messaga: 'something wrong with the artist id' });
      return;
    }

    try {
      await uploadArtist(artist);
    } catch (error) {
      console.log(error);

      res.status(httpStatus.INTERNAL_SERVER_ERROR);
      res.send({ message: "Couldn't upload artist" });
      return;
    }

    res.status(httpStatus.NO_CONTENT);
    res.send();
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    res.send(error);
  }
});

adminRoutes.get('/artist/search', async (req, res) => {
  const ytmusic = await new YTMusic().initialize();
  if (!ytmusic) throw Error;

  console.log(req.query);

  const query = req.query.q as string;

  res.send(await ytmusic.searchArtists(query));
});

async function uploadArtist({ thumbnails }: ArtistFull) {
  // downloading image
  console.log(thumbnails[0].url);

  const result = await download.image({
    url: thumbnails[0].url,
    dest: `${process.cwd()}/images`,
  });

  console.log(result);

  // uploading to s3

  // uploading to database
}
export default adminRoutes;
