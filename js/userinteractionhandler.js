let userInteractionContainer = document.querySelector(`.user_interaction`);

let testimonialAdd = document.querySelector(`.user_interaction`);
let testimonialInput = document.querySelector(`#testimonial_add`);
let submitTestimonial = document.querySelector(`.submit_testimonial`);

let like = document.querySelector(`.like`);
let likeImg = document.querySelector(`.like-img`);

if (!isLoggedIn) {
  userInteractionContainer.style.display = "none";
}

submitTestimonial.addEventListener("click", () => {
  let input = testimonialInput.value;

  let objModel = {
    commentID: new Date().getTime(),
    commentLikes: 0,
    commentText: input,
    userID: currentUser._id,
    userName: currentUser.userName,
    userPic: currentUser.userProfilePic,
  };
  console.log(objModel);

  let updateObj = { $push: { comments: objModel } };

  updateData(`recipes/${contextData._id}`, updateObj, "comment");
});

like.addEventListener("click", () => {
  let likes = (contextData.recipeLikes += 1);

  let updateObj = { recipeLikes: likes };

  updateData(`recipes/${contextData._id}`, updateObj, "comment");
});
