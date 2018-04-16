
CREATE TABLE "signInSessions" (
  "key" VARCHAR(64) NOT NULL UNIQUE,
  "challenge" VARCHAR(256) NOT NULL,
  "createdTime" BIGINT NOT NULL,
  PRIMARY KEY("key")
);

CREATE TABLE "profiles" (
  "pivotHashId" VARCHAR(64) NOT NULL,
  "authHashIds" VARCHAR(64)[] NOT NULL,
  "data" text NOT NULL,
  PRIMARY KEY("pivotHashId")
);

CREATE INDEX "indx_profiles_authHashIds" ON "profiles" USING GIN("authHashIds");
