CREATE TABLE "Final_CSV" (
    "Index" int,
    "YearStart" int,
    "YearEnd" int,
    "LocationAbbr" varchar,
    "LocationDesc" varchar,
    "Topic" varchar,
    "Question" varchar,
    "DataValueType" varchar,
    "DataValue" float,
    "DataValueAlt" float,
    "LowConfidenceLimit" float,
    "HighConfidenceLimit" float,
    "StratificationCategory1" varchar,
    "Stratification1" varchar,
    "LocationID" int,
    "Latitude" float,
    "Longitude" float,
    CONSTRAINT "pk_Final_CSV" PRIMARY KEY (
        "Index"
     )
);



