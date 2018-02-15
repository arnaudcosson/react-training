// Créer un action creator fetchVideos() dans le fichier actions/index.js. Cet action creator devra :


// lancer un appel ajax avec superagent vers le webservice api/videos
// notifier le store (à l'aide de la fonction dispatch()) de la réception des données une fois l'appel ajax terminé.
// l'action générée (dispatchée) aura 2 propriétés :
// une propriété type qui vaudra 'VIDEO_LIST_COMPLETE' (préférez l'utilisation d'une constante, qui aura l'avantage de pouvoir être réutilisée dans le reducer)
// une propriété videos qui aura comme valeur le tableau retourné par le webservice.

import request from 'superagent';

export const VIDEO_LIST_COMPLETE = 'VIDEO_LIST_COMPLETE';

export default function fetchVideos(){
    return function( dispatch, getState ) {
        request
        .get(`${config.apiPath}/videos`)
        .then((res) => {
            dispatch( {type: VIDEO_LIST_COMPLETE, videos: res.body} );
            // res.body, res.headers, res.status
        })
        .catch(function(err) {
            // err.message, err.response
        });
    }
}