# TODOS for sunday 8/12/2024

## Shalev

<!-- 1. add error handling -->

2. code cleanup (logs and notes)
   <!-- 3. add followers -->
   <!-- 4. add likes to comments -->
   <!-- 4. manage jwt data (better) -->
3. **super/** QA for creation (user/posts/comments) ON SUNDAY
<!-- 6. manage "morgan" better -->
4. update doc
   <!-- 7. remove unnecessary lib -->
   <!-- 8. fix login bug -->
5. **extra/** api to send msg to mail on login
   <!-- 11. **super/** make route for user by id -->
   <!-- 10. cleanup db -->
   <!-- 11. deploy NO -->
   <!-- 12. auth with domain -->
   <!-- 13. add better dummy data NO -->
   <!-- 14. remove mongodb errors -->
   <!-- 15. better encrypt jwt -->
6. **super/** add jwt to sign up
7. Add proper error handling middleware
8. Add pagination for posts and comments endpoints
<!-- 19. Implement proper MongoDB indexing NO -->
9. **extra/** Add proper database backup system
<!-- 21. add input validation (Reference: Backend/middleware/validator.js, lines 1-56) happens on frontend -->
10. **extra/** backup system
11. **extra/**data encryption
    <!-- 24. add get post by userid -->
    <!-- 25. add find user by username (img and name and id) -->
    <!-- 26. get follower posts by uid -->
12. edit profile route
13. filter all posts so current user dont see his own post

##TODOS frontend

<!-- 1.make reels button unclickable -->
<!-- 2.use redux global state to insert details to profile page -->

<!-- 3.make component for viewing posts in a grid -->

4. implement editing profile **sasha**
   <!-- 5.fix add post dialog to open on button press without loading page -->
   <!-- 6.implement search -->
5. add 404 page that redirect the user to homepage/login **ron**

<!-- 8.fix sign up to take email and phone number -->
<!-- 9.fix sign up so the user cant click next without filling the inputs -->

<!-- 10.input verification (on email and phone number and password) -->

11. code cleanup (logs, notes)

<!-- 12.add throbber where ever needed -->

13. implement likes in post **ron**
14. implement likes in comments **ron**
15. limit components width (450px -500px) **ron**
16. fix protected routes **ron**

<!-- 17.fix global state on refresh -->
<!-- 18.bug : making comment send wrong id in the authorId -->

19. img are not displaying in the same size (15) **ron**
    <!-- 20.bug : homepage have a gap -->
    --new--
    <!-- 21.use only global states for auth token -->

<!-- 22.handle refreshes to get token from session storage (the only time session storage is allowed) -->
<!-- 23.handle unauthorize 401 (to logout) immediately (before the refresh) -->
<!-- 24.fix comments not updating -->
<!-- 25.fix bgc -->

26. search result need to be clickable **ron + sasha**
27. username need to be clickable^ **ron + sasha**
28. after followed post show all post (no duplication) **ron**
29. profile page can show different users and make following posable (use prop for id) **Ron + sasha**
30. implement followers **ron + sasha**
