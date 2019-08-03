const movieModel = function () {

    const add = function (params) {

        let data ={
            ...params,
            organizer: JSON.parse(storage.getData('userInfo')).username
        }
        let url = `/appdata/${storage.appKey}/movies`;
        let headers = {
            body: JSON.stringify(data),
            headers: {}
        };

        return requester.post(url, headers);
    };
    const getAllMovies = function ()
    {
        let url = `/appdata/${storage.appKey}/movies?query={}&sort={}`;
        let headers = {
            headers: {}
        };

        return requester.get(url, headers);
    }

    const getMovie = function (id)
    {
        let url = `/appdata/${storage.appKey}/movies/${id}`;
        let headers = {
            headers: {}
        };

        return requester.get(url, headers);
    }
    const editMovie = function (params) {

        let data ={
            title: params.title,
            imageUrl: params.imageUrl,
            description: params.description,
            tickets: Number(params.tickets),
            genres: params.genres
        };

        let url = `/appdata/${storage.appKey}/movies/${params.movieId}`;
        let headers = {
            body: JSON.stringify(data),
            headers: {}
        };

        return requester.put(url, headers);
    };
    const deleteMovie = function (id)
    {
        let url = `/appdata/${storage.appKey}/movies/${id}`;
        let headers = {
            headers: {}
        };

        requester.del(url, headers);
    }
    return {
        add,
        getAllMovies,
        getMovie,
        editMovie,
        deleteMovie
    }
}();