# Back-End

Sections:
- [Authorized User Endpoints](#authorized-user-endpoints)
- [Accepted Stories Endpoints](#accepted-stories-endpoints)
- [Pending Stories Endpoints](#pending-stories-endpoints)


## Authorized User Endpoints

### /auth/ GET

Returns all registered users

### /auth/delete/id

Deletes user with given id. Returns id


### /auth/modify/id PUT
  Expects an object with format...
  ```
  {
    "firstName": "updated first name",
    "lastName": "updates last name",
    "username": "updated username",
    "password": "updated password"
  }

### /auth/register POST

  Expects an object with format...
  ```
  {
    "firstName": "ExampleName",
    "lastName": "Example",
    "username": "user",
    "password": "pass"
  }
  ```


### /auth/login POST 

  Expects an object with format...
  ```
  {
    "username": "user",
    "password": "pass"
  }
  ```

## Accepted Stories Endpoints

### /acceptedStories/ GET

Returns array of all currently approved stories

### /acceptedstories/id  GET

Returns single story matching ID

### /acceptedStories/delete/id DELETE

Deletes story with given ID. Returns id

### /acceptedstories/modify/id PUT

Requires object with format...
```
{
  "storyContent": "updated story",
  "storyImg": "updated image URL",
  "storyName":"updated name of story"
}
```

## Pending Stories Endpoints

### /pendingStories/add POST
  Expects and requiers an image with name: "image", and objeCt with format...
  ```
  {
    "storyName": "randoName",
    "storyContent": "story goes here"
  }
  ```

### /pendingStories/approve/:id
  Expects id in the URl. If a post is found, it will be added to the "acceptedStories" database and the story will be removed from "pendingStories". Upon successful approval, server will respond with {message: "Approved!"}

### /pendingStories/delete/:id DELETE
  Expects id to be passed in the url parameter. Upon successful delete, should return {message: "deleted"}

### /pendingStories GET
  Should return array of all stories pending approval

### /pendingStories/:id GET
  Expects id in URl, should return single story upon success.