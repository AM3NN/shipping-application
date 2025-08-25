import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:8080/',
    realm: 'stage-shipping-realm',
    clientId: 'shipping-frontend'  // use the new frontend client
});

export default keycloak;
