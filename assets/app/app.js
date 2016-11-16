    (function(){

    angular
        .module('pokemons', [])
        .controller('pokemonController', pokemonController)
        .constant('API_URL', '/api/')
        .factory('PokemonAPI', PokemonAPI)
        .directive('drVon', drVon)
        .directive('drPokemon', drPokemon)
        .config(csrf)
    ;

    function drVon(){
        return {
            restrict: 'ECA',
            scope: {
                name: '@'
            },
            templateUrl: 'static/app/templates/dr-hello.html'
        };
    }

    function drPokemon(){
        return {
            restrict: 'ECA',
            scope: {
              pokemon: '=info'
            },
            templateUrl: 'static/app/templates/dr-pokemon-info.html'
        };
    }

    ////////////////

    function csrf($httpProvider) {
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    }

    function pokemonController($scope, PokemonAPI) {
        /* @desc display list of pokemons
        */     
        var self = this;
        $scope.createPokemon = createPokemon;
        $scope.editPokemon = editPokemon;
        $scope.isEdit = false;

        $scope.deletePokemon = function(pokemon){
            var index = $scope.pokemons.indexOf(pokemon)
            $scope.pokemons.splice(index, 1)
            PokemonAPI.delete(pokemon.id);  

            PokemonAPI.noti('Pokemon has been deleted', 'danger');

        };

        PokemonAPI.list().then(function(response){
            $scope.pokemons = response.data;
        });

        function createPokemon(form){
            PokemonAPI.create(form).then(function(response){
                $scope.pokemons.push(response.data);
            });
        }

        function editPokemon(pokemon){
            $scope.isEdit = true;
            $scope.form = {
                id: pokemon.id,
                name: pokemon.name,
                latitude: pokemon.latitude,
                longitude: pokemon.longitude
            }
        }

        $scope.updatePokemon = function(form){
            PokemonAPI.edit(form).then(function(response){
                $scope.pokemons.map(function(obj){
                    if(obj.id == form.id ) {
                        obj.name = response.data.name;
                    }
                });
            });
        }
    }

    function PokemonAPI($http, API_URL){
        /* @desc Pokemon API factory
           @returns list of pokemon services
        */
        var services = {
            list: pokemonList,
            create: pokemonCreate,
            edit: pokemonEdit,
            delete: pokemonDelete,
        };
        return services;

        ////////////////
        function pokemonList(){
            /* @desc return list of pokemons from endpoint
            */
            return $http.get(API_URL + 'pokemons/');  
        }

        function pokemonCreate(form){
            return $http.post(API_URL + 'pokemons/', form);  
        }

        function pokemonEdit(form, id) {
            return $http.put(API_URL + 'pokemons/' + form.id + '/', form)
        }

        function pokemonDelete(id) {
            console.log('delete');
            return $http.post(API_URL + 'pokemons/' + id + '/');
        }


    }

})();