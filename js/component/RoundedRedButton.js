import Button from "./Button";
export default class RoundedRedButton extends Button {
	constructor( text = '', attributes = {} ) {
		super(
			text,
			{
				...attributes,
				style: 'border-radius: 5px; color: white; background-color: red'
			}
			// ici on utilise l'opérateur rest
			// nécessite le preset stage-2 (à installer via npm et ajouter au .babelrc)
			// @see https://babeljs.io/docs/plugins/
			// @see https://github.com/sebmarkbage/ecmascript-rest-spread
		);
	}
}