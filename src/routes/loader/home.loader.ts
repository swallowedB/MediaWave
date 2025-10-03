import { movieService } from "../../services/movieService"
import { tvService } from "../../services/tvService";

export const fetchHomeData = async () => {
  try {
    const nowplaying = await movieService.getNowPlaying(1);
    const popular = await movieService.getPopular(1);
    const trending = await movieService.getTrending("week");
    const topRated = await movieService.getTopRated(1);

    const tvPopular = await tvService.getPopular(1);
    const tvOnAir = await tvService.getOnAir(1);
    const tvTopRated = await tvService.getTopRated(1);

    return {
      nowplaying,
      popular: popular.slice(0, 7),
      trending: trending.slice(0, 7),
      topRated: topRated.slice(0, 7),
      tvPopular: tvPopular.slice(0, 7),
      tvOnAir: tvOnAir.slice(0, 7),
      tvTopRated: tvTopRated.slice(0, 7),
    };
  } catch (err) {
    console.error("🚨 Home Data fetch error", err);
    return { nowplaying: [], popular: [], trending: [], topRated: [] };
  }
};