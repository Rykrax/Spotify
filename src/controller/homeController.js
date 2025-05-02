const getHomepage = (req, res) => {
    res.render('test.ejs', { title: 'Test Page' });
};

export {
    getHomepage
};