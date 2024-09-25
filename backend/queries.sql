PRAGMA foreign_key = ON;

CREATE TABLE IF NOT EXISTS ad 
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    owner VARCHAR(100) NOT NULL,
    price INT,
    picture VARCHAR(255), 
    location VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE IF NOT EXISTS category
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100)
);


-- INSERT INTO ad (title, description, owner, price, picture, location, createdAt)
--     VALUES (
--         'blouson',
--         'Ceci est un blouson',
--         'blouson.owner@gmail.com',
--         100,
--         'imagedeblouson.com',
--         'Bordeaux',
--         datetime('now')
--     ),
--     (
--         'blouson',
--         'Ceci est un blouson',
--         'blouson.owner@gmail.com',
--         100,
--         'imagedeblouson.com',
--         'Lyon',
--         datetime('now')
--     ),
--     (
--         'blouson',
--         'Ceci est un blouson',
--         'blouson.owner@gmail.com',
--         100,
--         'imagedeblouson.com',
--         'Paris',
--         datetime('now')
--     );