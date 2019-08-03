const movieController = function () {

    const getAddMovie = function (context) {

        const loggedIn = storage.getData('userInfo') !== null;
        
        if(loggedIn){
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/movies/createMovie.hbs')
        })
    };

    const postAddMovie = function (context) {
        movieModel.add(context.params)
            .then(helper.handler)
            .then(() => {
                homeController.getHome(context);
            })
    };
    const getCinema = async function (context) {

        const loggedIn = storage.getData('userInfo') !== null;
        
        if(loggedIn){
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        try{
            let response = await movieModel.getAllMovies();
            let resolved = await response.json();
            context.movies = resolved.sort((a, b) => b.tickets - a.tickets)
        } catch(e){
            console.log(e);
        }

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/movies/allMovies.hbs')
        })
    };
    const getMyMovies = async function (context) {

        const loggedIn = storage.getData('userInfo') !== null;
        
        if(loggedIn){
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        try{
            let response = await movieModel.getAllMovies();
            let resolved = await response.json();
            context.movies = resolved.filter((x) => x.organizer === JSON.parse(storage.getData('userInfo')).username);
        } catch(e){
            console.log(e);
        }

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/movies/myMovies.hbs')
        })
    };
    const getDeleteMovie = function (context) {

        const loggedIn = storage.getData('userInfo') !== null;
        
        if(loggedIn){
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        movieModel.getMovie(context.params.movieId)
        .then(helper.handler)
        .then((data) => {

            Object.keys(data).forEach((key) => {
                context[key] = data[key];
                })

            context.loadPartials({
                header: "../views/common/header.hbs",
                footer: "../views/common/footer.hbs"
            }).then(function () {
                this.partial('../views/movies/deleteMovie.hbs')
            })
        });
    };
    const postDeleteMovie = function (context) {
        movieModel.deleteMovie(context.params.movieId);
        homeController.getHome(context);
    };
    const getEditMovie = function (context) {

        const loggedIn = storage.getData('userInfo') !== null;
        
        if(loggedIn){
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        movieModel.getMovie(context.params.movieId)
        .then(helper.handler)
        .then((data) => {

            Object.keys(data).forEach((key) => {
                context[key] = data[key];
                })

            context.loadPartials({
                header: "../views/common/header.hbs",
                footer: "../views/common/footer.hbs"
            }).then(function () {
                this.partial('../views/movies/editMovie.hbs')
            })
        });
    };
    const postEditMovie = function (context) {
        movieModel.editMovie(context.params);
    };
    const getDetailsMovie = function (context) {
        const loggedIn = storage.getData('userInfo') !== null;
        
        if(loggedIn){
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        movieModel.getMovie(context.params.movieId)
        .then(helper.handler)
        .then((data) => {

            Object.keys(data).forEach((key) => {
                context[key] = data[key];
                })

            context.loadPartials({
                header: "../views/common/header.hbs",
                footer: "../views/common/footer.hbs"
            }).then(function () {
                this.partial('../views/movies/detailsMovie.hbs')
            })
        });
    };
    const buyTicket = function (context) {
        
        movieModel.getMovie(context.params.movieId)
        .then(helper.handler)
        .then((movie) => {

            movie.tickets -= 1;

            let url = `/appdata/${storage.appKey}/movies/${context.params.movieId}`;
            let headers = {
                body: JSON.stringify(movie),
                headers: {}
            };
        
            requester.put(url, headers);
        })
    };


    return {
        getAddMovie,
        postAddMovie,
        getCinema,
        getMyMovies,
        getDeleteMovie,
        postDeleteMovie,
        getEditMovie,
        postEditMovie,
        getDetailsMovie,
        buyTicket
    }
}();