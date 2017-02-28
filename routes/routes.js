var airports = require('../service/airports.js');

var appRouter = function(app, express) {
    var countryRouter = express.Router();
    var codeRouter = express.Router();
    var internationalRouter = express.Router({mergeParams: true});
    var regionalRouter = express.Router({mergeParams: true});
    
    // Base routes for the app
    app.get("/", airports.all);
    app.use('/country', countryRouter);
    app.use('/code', codeRouter);
    app.use('/international', internationalRouter);
    app.use('/regional', regionalRouter);
    
    // Nested queries to filter international and regional airports on country query
    countryRouter.use('/:country/international', internationalRouter);
    countryRouter.use('/:country/regional', regionalRouter);
    
    // query by country code
    countryRouter.route('/:country')
        .get(airports.queryByCountry);
    
    // query by airport code
    codeRouter.route('/:code')
        .get(airports.queryByCode);
    
    // filter all the international airports
    internationalRouter.route('/')
        .get(airports.filterInternationalAirports);
    
    // filter all the regional airports
    regionalRouter.route('/')
        .get(airports.filterRegionalAirports);
    
}

module.exports = appRouter;