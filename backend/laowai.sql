DROP DATABASE IF EXISTS Laowai;
CREATE DATABASE laowai;
\connect laowai

\i laowai-schema.sql
\i laowai-seed.sql

\echo 'Delete and recreate laowai_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE IF EXISTS laowai_test;
CREATE DATABASE laowai_test;
\connect laowai_test

\i laowai-schema.sql
