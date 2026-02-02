# Website Demo - Content Management System

A simple, modern content management website demo built with vanilla HTML/CSS/JS.

## Features

- **Homepage**: Displays a list of articles/posts
- **Admin Interface**: Easy-to-use interface for adding new content
- **JSON-based Storage**: All content stored in `data/posts.json`
- **Responsive Design**: Works on desktop and mobile devices
- **Clean UI**: Modern, minimalist design

## Project Structure

```
website-demo/
├── index.html          # Homepage
├── admin.html          # Admin interface for adding posts
├── css/
│   └── style.css       # Styles
├── js/
│   └── app.js          # Main JavaScript functionality
└── data/
    └── posts.json      # Content storage (JSON format)
```

## How to Use

### View the Website

Simply open `index.html` in your web browser to see the homepage with all articles.

### Add New Content

1. Open `admin.html` in your web browser
2. Fill in the article title, author name, and content
3. Click "Save Article" to add it to the website
4. The new article will appear on the homepage

### Update Content

To update existing content, edit the `data/posts.json` file directly:

```json
{
  "posts": [
    {
      "id": "1",
      "title": "Updated Title",
      "author": "Author Name",
      "content": "Updated content goes here...",
      "date": "2026-01-15T10:00:00.000Z"
    }
  ]
}
```

## Customization

### Styling

Edit `css/style.css` to customize the look and feel of the website.

### Functionality

Edit `js/app.js` to modify the website's behavior.

## Deployment

For production deployment:

1. Replace `js/app.js` with a server-side solution (Node.js, Python, PHP, etc.)
2. Use a proper database instead of JSON file storage
3. Add authentication to the admin interface
4. Configure your web server (Nginx, Apache, etc.)

## Notes

- This is a **demo** for local development and testing
- For production use, implement proper backend and security measures
- The admin interface does not have authentication (demo purpose only)
