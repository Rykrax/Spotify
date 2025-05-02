import mongoose from 'mongoose';

const DATABASE_NAME = 'rynkrax-spotify';

const MONGODB_URI = `mongodb+srv://rynkrax:YYCeeMLQHAOQ1HSg@cluster-rynkrax.eablju8.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority&appName=Cluster-Rynkrax`;

const CONNECT_DB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB đã kết nối.");
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

// Reset lại track_id counter về 0
const resetTrackIdCounter = async () => {
    await Counter.findByIdAndUpdate(
        { _id: 'track_id' },
        { seq: 0 },
        { upsert: true }
    );
    console.log("Đã reset track_id về 1 (seq = 0).");
};

const run = async () => {
    await CONNECT_DB();
    // await resetTrackIdCounter(); // ← Reset ngay sau khi kết nối DB

    // Thêm bài nhạc (tùy chọn)
    const newTrack = new Track({
        title: 'Mình cùng nhau đóng băng',
        artist: 'Thuỳ Chi (Cover)',
        image_url: 'https://res.cloudinary.com/dmcewgkd6/image/upload/v1746195092/artworks-4jhUDzhMFUg4ceeW-NmQxzg-t500x500_tqchjr.jpg',
        src_url: 'https://res.cloudinary.com/dmcewgkd6/video/upload/v1746195087/M%C3%ACnh_C%C3%B9ng_Nhau_%C4%90%C3%B3ng_B%C4%83ng___Th%C3%B9y_Chi___FPT_Polytechnic_mmntsq.mp3'
    });

    await newTrack.save();
    console.log('Track mới đã được lưu với ID:', newTrack.track_id);

    // Optional: process.exit(); nếu dùng script độc lập
};

// run();

export { CONNECT_DB, Track };