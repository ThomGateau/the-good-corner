PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS ad 
(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	title VARCHAR(100) NOT NULL,
	description TEXT,
	owner VARCHAR(100) NOT NULL,
	price INT,
    picture VARCHAR(100),
    location VARCHAR(100),
	createdAt DATE,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

SELECT * FROM ad
LEFT JOIN category ON category.id = ad.category_id;


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

-- INSERT INTO category (name) VALUES ('autre');
-- INSERT INTO category (name) VALUES ('vetement');
-- INSERT INTO category (name) VALUES ('voiture');