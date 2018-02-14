import HelloWorld from "./HelloWorld";
import Component from "./component/Component";
import Button from "./component/Button";
import RoundedRedButton from "./component/RoundedRedButton";

const helloWorld = new HelloWorld();
var component = new Component( 'div', { style: "border: 1px solid black" }, [
    new Component( 'h3', {}, [
        'Test du ',
        new Component( 'strong', { style: 'color: blue' }, [ 'framework' ] ),
        ' ui'
    ] ),
    new Component( 'input', { type: 'text', value: 'Ca a l\'air de fonctionner correctement', style: 'width: 500px' } )
] );
document.getElementById( 'component-container' ).innerHTML = component.render();

var button = new Button( 'Ceci est un bouton' );
document.getElementById( 'button-container' ).innerHTML = button.render();

var roundedRedButton = new RoundedRedButton( 'Ceci est un bouton rouge arrondi',{style:'font-size: 15px'});
document.getElementById( 'rounded-red-button-container' ).innerHTML = roundedRedButton.render();