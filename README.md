
# MERNflix 🎬

MERNflix is a full-stack **video-sharing platform** built with the **MERN stack** (MongoDB, Express, React, Node.js). It is inspired by YouTube and allows users to create channels, upload videos, interact with content, manage subscriptions, and track their personal watch history and preferences.



## Features

- **User Authentication**  
  - Users can **register** and **sign in** securely.  
  - Passwords are hashed and authentication is handled via JWT.  
  - Users can **update their password**.

- **Channel Management**  
  - Users can create their own **channel**.  
  - Upload and update **avatar** and **cover images** for their channel.  
  - **Subscribe** to other channels.  
  - View a **list of subscribed channels**.

- **Video Upload & Management**  
  - Upload videos to your channel.  
  - Update **video details** (title, description).  
  - Update **video thumbnail**.  
  - Delete videos from your channel.  
  - Videos are stored securely on Cloudinary .  
  - Automatic **views count** tracking.

- **Video Interaction**  
  - **Like**  videos.  
  - Add videos to **Watch Later** list.  
  - View **Watch History**.
  - Comment on videos and can edit comment.

- **Search Functionality**  
  - Search for videos by **title** .  
- **Pages**
   - Home
   - Liked videos
   - History
   - Watch later
   - channel subscribed
   - Profile
- **Responsive UI**  
  - Works on desktop and mobile devices.  
  - Designed for seamless navigation and interaction.

---

## Tech Stack

- **Frontend:** React.js, Redux, Tailwind CSS 
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB, Mongoose , MongoDB aggregation pipeline
- **Authentication:** JWT, Cookies  
- **File Storage:** Cloudinary (for video & image uploads)  
- **API Handling:** Axios ,
- **file upload:** Multer.

---

