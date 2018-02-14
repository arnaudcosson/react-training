import Component from "./Component";
export default class Button extends Component {
	constructor( text = '', attributes = {} ) {
		// dans une classe enfant, on peut faire appel à la méthode super()
		super( 'button', attributes, [ text ] );
	}
}