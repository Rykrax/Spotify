import { Track } from '../model/mongodb.js'

const getTrackList = async (req, res) => {
    try {
        const tracks = await Track.find();
        res.status(200).json(tracks);  
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy danh sách tracks' });
    }
}

export {
    getTrackList
}