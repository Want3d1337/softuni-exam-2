const app = Sammy("#rootElement", function () {

    this.use('Handlebars', 'hbs');

    // Home
    this.get('#/home', homeController.getHome);

    // User
    this.get('#/register', userController.getRegister);
    this.get('#/login', userController.getLogin);

    this.post('#/register', userController.postRegister);
    this.post('#/login', userController.postLogin);
    this.get('#/logout', userController.logout);
    
    //Movies
    this.get('#/addMovie', movieController.getAddMovie)
    this.post('#/addMovie', movieController.postAddMovie)
    this.get('#/cinema', movieController.getCinema)
    this.get('#/myMovies', movieController.getMyMovies)
    this.get('#/delete/:movieId', movieController.getDeleteMovie);
    this.post('#/delete/:movieId', movieController.postDeleteMovie);
    this.get('#/edit/:movieId', movieController.getEditMovie);
    this.post('#/edit/:movieId', movieController.postEditMovie);
    this.get('#/details/:movieId', movieController.getDetailsMovie);
    this.get('#/buy/:movieId', movieController.buyTicket);
});

(() => {
    app.run('#/home');
})();