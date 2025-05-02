const getHomepage = (req, res) => {
    res.render('main.ejs', { title: 'Test Page' });
};

export {
    getHomepage
};