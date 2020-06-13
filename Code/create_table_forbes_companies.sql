create table forbes_companies
(ID SERIAL PRIMARY KEY,
 "Company" VARCHAR,
 "MarketValue" INTEGER,
 "Revenue" FLOAT,
 "Profits" FLOAT,
 "Assets" FLOAT,
 "Rank" FLOAT,
 "Sector" VARCHAR,
 "Industry" VARCHAR,
 "Continent" VARCHAR,
 "Country" VARCHAR,
 "Headquarters" VARCHAR,
 "State" VARCHAR,
 "CEO" VARCHAR,
 "ForbesWebpage" VARCHAR,
 "ProfitsPerAsset" FLOAT,
 "ProfitPerRevenue" FLOAT,
 "CountryCode" VARCHAR,
 "Latitude" FLOAT,
 "Longitude" FLOAT
);

select * from forbes_companies;