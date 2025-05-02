import mongoose from 'mongoose';

const DATABASE_NAME = 'rynkrax-spotify';

const MONGODB_URI = `mongodb+srv://rynkrax:YYCeeMLQHAOQ1HSg@cluster-rynkrax.eablju8.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority&appName=Cluster-Rynkrax`;

const CONNECT_DB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        // console.log("MongoDB kết nối thành công trong mongodb.js.");
    } catch (error) {
        console.error("MongoDB lỗi kết nối:", error);
        process.exit(1);
    }
};

const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true }, 
    seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

const trackSchema = new mongoose.Schema({
    track_id: String,
    title: String,
    artist: String,
    image_url: String,
    src_url: String,
    dateAdded: { type: Date, default: Date.now },
}, { collection: 'tracks' });

// Tự tăng track_id
trackSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'track_id' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.track_id = counter.seq;
    }
    next();
});

const Track = mongoose.model('Track', trackSchema);

// Thêm một bài nhạc mới
const newTrack = new Track({
    title: 'Một đời',
    artist: '14 Casper _ Bon Nghiêm (feat. buitruonglinh)',
    image_url: 'https://res.cloudinary.com/dmcewgkd6/image/upload/v1746173748/1671530957863_640_yauvlp.jpg',
    src_url: 'https://res.cloudinary.com/dmcewgkd6/video/upload/v1746173770/m%E1%BB%99t_%C4%91%E1%BB%9Di_-_14_Casper___Bon_Nghi%C3%AAm_feat._buitruonglinh_Track_03_-_Album_S%E1%BB%90_KH%C3%94NG_c7nzhv.mp3'
});

// await newTrack.save();
console.log('Track ID:', newTrack.track_id);

export { CONNECT_DB, Track};