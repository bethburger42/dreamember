var $ = require('cheerio')
var request = require('request')
var express = require('express');
var Item = require('../models/item');
var router = express.Router();    

router.get("/", function(req, res) {
    var searchURL = "http://www.dreamdictionary.org/a/";
    request(searchURL, function (err, resp, html){
        if(!err && resp.statusCode == 200) {
            var parsedHTML = $.load(html);
            var symbols = parsedHTML("body").find(".entry");
            if (symbols.length) {
                var symbol;
                for (var i=0;i<symbols.length;i++) {
                    symbol = $(symbols[i]);
                    var term = symbol.find("p strong").text();
                    var description = recipe.find("p").text();
                    if (term && description) {
                        Term.create({
                            term: term,
                            description: description
                        });
                    };
                };
                res.send({
                    term: term,
                    description: description
                })
            }
        }
    })
});

module.exports = router;