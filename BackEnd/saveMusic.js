import connectDb from "./connectDb.js"
import Music from "./Models/musicSchema.js"
const fetchData = async () => {
    let response = await fetch(`https://v1.nocodeapi.com/indiangamer/spotify/WqXUvcbvmwFtILiI/search?q=kk&type=track`)
    let data = await response.json();
    return data;
}

const saveMusic = async() => {
    await connectDb();
    let datas = await fetchData();
    datas = datas.tracks.items;
    for(let data of datas) {
        if(data.preview_url==null) continue;
        let m = new Music({
            image: data.album.images[0].url,
            song_name: data.name,
            artist: data.artists[0].name,
            url: data.preview_url,
        })
        console.log(m);
        await m.save();
    }
}

saveMusic()