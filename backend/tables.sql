USE turfs;

CREATE TABLE users
(
    id       INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    email    VARCHAR(255) UNIQUE,
    number   INT UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE Turf
(
    turf_id         INT AUTO_INCREMENT PRIMARY KEY,
    turf_name       VARCHAR(255) NOT NULL UNIQUE,
    has_day_slots   BOOLEAN      NOT NULL,
    has_night_slots BOOLEAN      NOT NULL
);

CREATE TABLE DayTimes
(
    daytime_id INT AUTO_INCREMENT PRIMARY KEY,
    turf_id    INT,
    from_time  VARCHAR(255) NOT NULL,
    to_time    VARCHAR(255) NOT NULL,
    FOREIGN KEY (turf_id) REFERENCES Turf (turf_id)
);

CREATE TABLE NightTimes
(
    nighttime_id INT AUTO_INCREMENT PRIMARY KEY,
    turf_id      INT,
    from_time    VARCHAR(255) NOT NULL,
    to_time      VARCHAR(255) NOT NULL,
    FOREIGN KEY (turf_id) REFERENCES Turf (turf_id)
);