function displayError() {
    $('#global-error').removeClass('hidden');
}

function customAlert(type, msg) {
    var custMsg = '<div class="alert fade in'+type+'">'+
                  'msg'+
                  '</div>';  
    $(custMsg).show();
}

(function(){
    var pokemon = pokemonServices();

    pokemon.list().then(function(response){
        for (i = 0; i < response.length; i++) { 
            var obj = pokemon.renderPokemonTemplate(response[i]);
            $('#pokemon-list').append(obj);
        };
    }).then(function(){
        // todo error;
    });

    $(document).on('click', '#pokemon-list td:first', function() {
        var id = $(this).data('id')
        pokemon.detail(id).then(function(response) {
            $('h1').html('Pokemon Detail');
            $('#pokemon-list').html('');
            var pokemonTemplate = pokemon.renderPokemonTemplate(response);
            $('#pokemon-list').append(pokemonTemplate);

        }).then(function(){
            // todo error;
        });
    });

    $(document).on('submit', '#pokemon-add-form', function(event) {
        event.preventDefault();
        var form = $(this);
        pokemon.add(form.serialize()).done(function(new_pokemon){
            pokemon.renderPokemonTemplate(new_pokemon);
            form[0].reset();
        }).error(function(){
            $('#pokemon-add-form').find('.alert').removeClass('hidden');
        });
        return false;
    });

    // delete a pokemon
    $(document).on('click', '.glyphicon-trash', function() {
        var get_poke = $(this).parents('tr');
        pokemon.delete(get_poke.data('id'));
        get_poke.remove();
    });

})();
