
class Route {
    constructor () {
        this.services = {};
    }
    start () {

    }
    fire () {}
    get (url, callback) {
        this.services[url] = callback;
    }

    post (url, callback) {
        this.services[url] = callback;
    }
}
module.exports = new Route();