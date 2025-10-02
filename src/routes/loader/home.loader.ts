import { movieService } from "../../services/movieService"

export const fetchThumbnail = async () => {
  try{
    const nowplaying = await movieService.getNowPlaying();
    return {nowplaying}
  } catch(err){
    console.error(err instanceof Error)
  }
}