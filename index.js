var request = require("request");
var cheerio = require('cheerio');
var init = function() {
    return {getNews: getNews(), more: more()};
};
var more = function() {
    return function(query, cb) {
        var postData = {
            news_offset: query.id,
            category: query.category
        };
        if (typeof cb === 'function') {
            request.post({
                url: "https://www.inshorts.com/en/ajax/more_news",
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                body: require('querystring').stringify(postData)
            }, function(err, response, body) {
                if (err) {
                    console.log("err");
                    cb(err);
                } else if (!response) {
                    cb("No response recieved (check internet connection)");
                } else if (response.statusCode == 400) {
                    cb("Error: Bad request. ");
                } else if (response.statusCode == 401) {
                    cb("Error: Unauthorized. Authentication info not sent or invalid ");
                } else if (response.statusCode == 403) {
                    cb("Authenticated user is not allowed access	");
                } else if (response.statusCode == 404) {
                    cb("Error: Not found");
                } else if (response.statusCode == 410) {
                    cb("Error: URL expired");
                } else if (response.statusCode == 500) {
                    cb("Error: Internal server error");
                } else if (response.statusCode == 503) {
                    cb("Error: Service unavailable");
                } else if (response.statusCode == 599) {
                    cb("Error: Connection timed out");
                } else if (response.statusCode == 422) {
                    cb("Error: Domain name error.");
                } else if (response.statusCode == 200) {
                    var $ = cheerio.load((JSON.parse(body)).html);
                    var articleBody = [];
                    var image = [];
                    var headline = [];
                    var read_more = [];
                    var length = $("[itemprop='articleBody']").length;
                    var a = length;
                    $("[itemprop='articleBody']").each(function(i, elem) {
                        articleBody[i] = $(this).text();
                        a--;
                        if (a == 0)
                            sendResponse();
                        }
                    );
                    var b = length;
                    $("[class='news-card-image']").each(function(i, elem) {
                        var bg = $(this).css("background-image")
                        image[i] = bg.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '')
                        b--;
                        if (b == 0)
                            sendResponse();
                        }
                    );
                    var c = length;
                    $("[itemprop='headline']").each(function(i, elem) {
                        headline[i] = $(this).text();
                        c--;
                        if (c == 0)
                            sendResponse();
                        }
                    );
                    var d = length;
                    $("[class='source']").each(function(i, elem) {
                        read_more[i] = $(this).attr('href');
                        d--;
                        if (d == 0)
                            sendResponse();
                        }
                    );

                    function sendResponse() {
                        if (a == 0 && b == 0 && c == 0 && d == 0) {
                            cb(null, {
                                body: articleBody,
                                image: image,
                                headline: headline,
                                read_more: read_more,
                                id: (JSON.parse(body)).min_news_id,
                                category: query.category
                            });
                        }

                    }
                }
            });
        }
    }
}
var getNews = function() {
    return function(name, cb) {
        if (typeof cb === 'function') {
            request.get({
                url: 'https://www.inshorts.com/en/read/' + name,
                method: 'GET',
                headers: {}
            }, function(err, response, body) {
                if (err) {
                    console.log("err");
                    cb(err);
                } else if (!response) {
                    cb("No response recieved (check internet connection)");
                } else if (response.statusCode == 400) {
                    cb("Error: Bad request. ");
                } else if (response.statusCode == 401) {
                    cb("Error: Unauthorized. Authentication info not sent or invalid ");
                } else if (response.statusCode == 403) {
                    cb("Authenticated user is not allowed access	");
                } else if (response.statusCode == 404) {
                    cb("Error: Not found");
                } else if (response.statusCode == 410) {
                    cb("Error: URL expired");
                } else if (response.statusCode == 500) {
                    cb("Error: Internal server error");
                } else if (response.statusCode == 503) {
                    cb("Error: Service unavailable");
                } else if (response.statusCode == 599) {
                    cb("Error: Connection timed out");
                } else if (response.statusCode == 422) {
                    cb("Error: Domain name error.");
                } else if (response.statusCode == 200) {
                    var $ = cheerio.load(body);
                    var articleBody = [];
                    var image = [];
                    var headline = [];
                    var read_more = [];
                    var length = $("[itemprop='articleBody']").length;
                    var a = length;
                    $("[itemprop='articleBody']").each(function(i, elem) {
                        articleBody[i] = $(this).text();
                        a--;
                        if (a == 0)
                            sendResponse();
                        }
                    );
                    var b = length;
                    $("[class='news-card-image']").each(function(i, elem) {
                        var bg = $(this).css("background-image")
                        image[i] = bg.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '')
                        b--;
                        if (b == 0)
                            sendResponse();
                        }
                    );
                    var c = length;
                    $("[itemprop='headline']").each(function(i, elem) {
                        headline[i] = $(this).text();
                        c--;
                        if (c == 0)
                            sendResponse();
                        }
                    );
                    var d = length;
                    $("[class='source']").each(function(i, elem) {
                        read_more[i] = $(this).attr('href');
                        d--;
                        if (d == 0)
                            sendResponse();
                        }
                    );

                    function sendResponse() {
                        var id;
                        if (a == 0 && b == 0 && c == 0 && d == 0) {
                            $("[type='text/javascript']").each(function(i, elem) {
                                id = $(this).text().split('"')[1];
                            });
                            cb(null, {
                                body: articleBody,
                                image: image,
                                headline: headline,
                                read_more: read_more,
                                id: id,
                                category: name
                            });
                        }
                    }
                } else {
                    cb(response);
                }
            });
        }
    }
}
exports.init = init;
