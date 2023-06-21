CREATE TABLE "projects"
(
	"id"   			SERIAL 		PRIMARY KEY,
    "name"  		VARCHAR     NOT NULL,
    "description"	VARCHAR 	NOT NULL,
    "owner"         VARCHAR     NOT NULL,
	"created_at"    TIMESTAMP 	DEFAULT current_timestamp
);