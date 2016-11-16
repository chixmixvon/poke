/*
 * @namespace pokemon
 * @desc return pokemon services
 */ 

var pokemonServices = function() {
    var api_url = '/api/pokemons/';

    var service = {
        'list': pokemonList,
        'delete': deletePokemon,
        'detail': pokemonDetail,
        'add': addPokemon,
        'renderPokemonTemplate': renderPokemonTemplate,
    }

    return service;
    ////////////////////

    /*
     * @desc return pokemon list
     */ 
    function pokemonList() {
        return $.get(api_url);
    }

    /*
     * @desc return pokemon template
     * @params pokemon {object}
     */  
    function renderPokemonTemplate(pokemon) {
        var template = '<tr data-id="'+pokemon.id+'">'+
                        '<td data-id="'+pokemon.id+'"><a href="#/detail">'+pokemon.name+'</a></td>' + 
                        '<td>'+pokemon.longitude+'</td>'+
                        '<td>'+pokemon.latitude+'</td>' +
                        '<td>'+pokemon.author.username+'</td>'+
                        '<td><span class="glyphicon glyphicon-pencil" data-toggle="modal" href="#modal-id"></span>'+
                        '<span class="glyphicon glyphicon-trash"></span></td>'+
                        '</td>'+
                        '</tr>';
        return template;
    }

    /*
     * @desc pokemon detail
     * @params pokemon id {int}
     */    
    function pokemonDetail(id) {
        return $.get(api_url+id+'/');
    }


    /*
     * @desc add pokemon
     * @params data {dict} serialize form data
     * @param url {api_url}  
     */
    function addPokemon(data) {
        return $.post(api_url, data);
    }


    /*
     * @desc delete pokemon
     * @params id {int}
     */
    function deletePokemon(id){
        var csrf = $('input[name=csrfmiddlewaretoken]').val(); 
        $.post(api_url+id+'/', {'csrfmiddlewaretoken': csrf })
        .done(function(){
            customAlert('success', 'Pokemon has been deleted');
        }).error(function() {
            displayError();
        });
    }

    /*
     * @desc edit pokemon
     * @params pokemon {objects}
     */
    function editPokemon() {

    }
}