
// Tests de la configuration par défaut
test("Default configuration", function() {
    // default value
    var restClient = new HyperRest();
    var defaultUrl = "http://localhost:8080/";
    equal(defaultUrl, restClient.getBaseUrl(), "Base url shoud be " + defaultUrl + "by default");
    
    // change
    var withoutSlash = "http://localhost:8989";
    restClient.setBaseUrl(withoutSlash);
    equal(withoutSlash+"/",restClient.getBaseUrl(), "The baseUrl should terminate by '/' ");
});


