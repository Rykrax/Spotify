import fetch from 'node-fetch'; // Ensure you have node-fetch installed

// const getHomepage = (req, res) => {
//     fetch("http://localhost:8080/api/get-tracks")
//         .then(response => response.json())
//         .then(data => {
//             console.log("Data from API:", data);
//             res.render('main.ejs', { title: 'Test Page', tracks: data });
//         })
//         .catch(error => {
//             console.error("Error fetching data:", error);
//             res.status(500).send("Error fetching data");
//         });
// };

const getHomepage = (req, res) => {
    res.render('main.ejs');
};

export {
    getHomepage
};