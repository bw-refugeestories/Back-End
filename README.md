# Back-End

Sections:
- [Authorized User Endpoints](#authorized-user-endpoints)
- [Accepted Stories Endpoints](#accepted-stories-endpoints)
- [Pending Stories Endpoints](#pending-stories-endpoints)


## Authorized User Endpoints

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

##Accepted Stories Endpoints

### /acceptedStories/

Returns array of all currently approved stories


## Pending Stories Endpoint

### /pendingStories/add 
  Expects and image with name: "image", and objeCt with format...
  ```
  {
    "storyName": "randoName",
    "storyContent": "story goes here"
  }
  ```