# Qantas REST API test

Assumptions: node and npm are already installed.

Instructions:  
1. Clone the repository  
2. Run 'npm install' to install all dependencies  
3. Run 'npm install -g mocha' to enable mocha command line for tests  
4. To start the app, use 'node app.js' at the root. This will start the server on port 3000 (http://localhost:3000)  
5. To run the tests, use 'mocha test.js' at the root  

Routes:

http://localhost:3000                                 ---> To get list of all the airports  
http://localhost:3000/code/:code                      ---> To get airport by code  
http://localhost:3000/country/:country                ---> To get airports by country code  
http://localhost:3000/international                   ---> To filter all the international airports  
http://localhost:3000/regional                        ---> To filter all the regional airports  
http://localhost:3000/country/:country/international  ---> To filter all international airports in country  
http://localhost:3000/country/:country/regional       ---> To filter all regional airports in country  
