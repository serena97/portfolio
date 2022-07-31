import axios from 'axios';
import express from 'express';

const { access_token } = process.env as any
const app = express()
const port = 3000
let photoUrls = []

async function getIds() {
    const ids = []
    let url = `https://graph.instagram.com/me/media?fields=id,children,username&access_token=${access_token}`
    try {
        while(Boolean(url)) {
            const res = await axios.get(url)
            ids.push(...res.data.data.flatMap(d => {
                 const children = d.children
                 if(children) {
                    return children.data.map(x => x.id)
                 }
                 return d.id;
            }))
            url = res.data.paging.next
        }
        console.log(ids)
        return ids
    } catch (error) {
        console.error(error)
    }
}

async function getPhotos() {
    const ids = await getIds();
    const urls = ids.map(id => `https://graph.instagram.com/${id}?fields=id,children,media_type,media_url,username,timestamp&access_token=${access_token}`)
    photoUrls = await Promise.all(urls.map(url => axios.get(url).then(x => x.data.media_url)))
}


app.get('/getUrls', async (req, res) => {
    res.send(photoUrls)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

(async () => {
    await getPhotos() // called once on app start to not run into rate limiting issues
})()