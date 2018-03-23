
CREATE TABLE "signInSessions" (
  "key" VARCHAR(64) NOT NULL UNIQUE,
  "challenge" VARCHAR(256) NOT NULL,
  "createdTime" BIGINT NOT NULL,
  PRIMARY KEY("key")
);
