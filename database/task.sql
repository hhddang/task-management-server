CREATE TABLE "tasks"
(
	"id"   			    SERIAL 		PRIMARY KEY,
    
    "name"  		    VARCHAR     NOT NULL,
    "content"		    VARCHAR 	NOT NULL,
    "status"     	    VARCHAR		NOT NULL,
    "is_prioritized"    BOOLEAN     DEFAULT FALSE,
    "participant"		VARCHAR[]   ,
	"deadline"          TIMESTAMP   ,

	"project"           VARCHAR     NOT NULL,
    "creator"           VARCHAR     NOT NULL,      
    "created_at"        TIMESTAMP 	DEFAULT current_timestamp
);