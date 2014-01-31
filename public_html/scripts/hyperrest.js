
// ##############################################################
// Main object for the API
// ##############################################################
HyperRest = function() {
    var baseUrl = "http://localhost:8080/";
    var discoverResult;
    
    /**
     * Discover the available resources (GET on root)
     * @returns {undefined}
     */
    this.discover = function(){
        var result;
        $.ajax({
                  url: baseUrl,
                  global: false,
                  type: "GET",
                  dataType: "json",
                  async:false,
                  success: function(data){result = data;},
                  error: function(data){throw new HyperRestException("Enabled to discover resources under " + baseUrl)}
               } 
            );//.responseText;
        return result;    
    };
    
    /**
     * Get the json schema for the given resourceName
     * @param {type} resourceName
     * @returns {data}
     */
    this.getSchema = function(resourceName) {
        if(typeof(resourceName)!== "string"){
            throw new HyperRestException("The parameter for getSchema must be a string");
        }
        var result;
        var schemaUrl = baseUrl+resourceName+"/schema";
        $.ajax({
                  url: schemaUrl,
                  global: false,
                  type: "GET",
                  dataType: "json",
                  async:false,
                  beforeSend : function(xhr) {
                    xhr.setRequestHeader('Accept','Application/schema+json');  
                  },
                  success: function(data){result = data;},
                  error: function(data){throw new HyperRestException("Enabled to get schema for " + resourceName + " under " + schemaUrl)}
               } 
            );//.responseText;
        return result; 
    };
    

    
    /**
     * Accesors for the baseUrl
     * @returns {String|url}
     */
    this.getBaseUrl = function(){return baseUrl;};
    this.setBaseUrl = function(url) {
        if(url.charAt(url.length - 1) !== "/") {
            url += "/";
        }
        baseUrl = url;
    };
};

var DiscoverHelper = function(rawObject){
    this.raw = rawObject;
    
};

// ##############################################################
// Exception
// ##############################################################
var HyperRestException = function(message) {
    this.message = message;
    this.name = "HyperRestException";
};