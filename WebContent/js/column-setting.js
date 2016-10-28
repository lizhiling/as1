/**
 * Created by li_zhil on 10/10/2016.
 */
var themes = alasql('SELECT * FROM theme');

for(var i = 0; i<themes.length; i++){
    var theme = themes[i];
    $('<option>').attr('value', theme.id).text(theme.name);
}