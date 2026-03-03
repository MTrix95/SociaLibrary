create or replace view books_map_v(book_id, title, author, location, thumbnail_url) as
SELECT b.id         AS book_id,
       b.title,
       b.author,
       b.location::geometry(Point, 4326) AS location,
       im.url_image AS thumbnail_url
FROM books b
         LEFT JOIN books_images im ON b.id = im.book_id
WHERE b.location IS NOT NULL AND im.type = 'COVER'::image_type
   OR im.type IS NULL;

comment on view books_map_v is 'La vista contenete i libri da visualizzare in mappa';