//function to create a delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//function that simulates random failures (20% chance of failure here)
const randomFailure = () => Math.random() < 0.2;

//function to get user profile data using a delay
const fetchUserProfile = async (userId) => {
    //1 second delay before returning profile data or an error 
    await delay(1000); 
    //if there is a failure, an error message will display
    if (randomFailure()) {
        throw new Error("Failed to fetch user profile"); 
    }
    //profiles for multiple users
    const profiles = {
        1: { id: 1, name: "Navi" },
        2: { id: 2, name: "Bill" }
    };
    //return the profile if it exists, if not display an error message
    return profiles[userId] || { error: "User not found" };
};

//function to get posts for a user using a delay
const fetchPosts = async (userId) => {
    //1.5 second delay before returning posts or an error
    await delay(1500);
    //if there is a failure, an error message will display
    if (randomFailure()) {
        throw new Error("Failed to fetch posts");
    }
    //posts for multiple users
    const posts = {
        1: [{ id: 101, content: "My favorite joke is, !false" }],
        2: [{ id: 102, content: "Why don't bachelors like Git?" }]
    };
    //return post for the user if they exist, if not return an empty array
    return posts[userId] || [];
};

//function to get comments for a post using a delay
const fetchComments = async (postId) => {
    //2 second delay before returning comment or an error
    await delay(2000);
    //if there is a failure, an error message will display
    if (randomFailure()) {
        throw new Error("Failed to fetch comments");
    }
    //comments for multiple posts
    const comments = {
        101: [{ id: 201, text: "It's funny because it's true haha" }],
        102: [{ id: 202, text: "Because they're scared to commit!" }]
    };
    //return comments for the post if they exist, if not return an empty array
    return comments[postId] || [];
};

//function to get data one step at a time (sequentially) with async
const fetchDataSequentially = async (userId) => {
    console.log("\nSequential Fetch:");
    try {
        //first get the user profile
        const profile = await fetchUserProfile(userId);
        console.log("User profile:", profile);
        //next get the user's posts
        const posts = await fetchPosts(userId);
        console.log("Posts:", posts);
        //then get comments for the first post if there is a post
        const comments = await fetchComments(posts[0]?.id);
        console.log("Comments:", comments);
        //display message after getting data
        console.log("All data retrieved successfully");
    } catch (error) {
        console.error("Error:", error.message); //error message if anything fails
    }
};

//function to get data all at once (in parallel) with async
const fetchDataInParallel = async (userId) => {
    console.log("\nParallel Fetch:");
    try {
        //get the users profile and posts at the same time
        const [profile, posts] = await Promise.all([fetchUserProfile(userId), fetchPosts(userId)]);
        console.log("User profile:", profile);
        console.log("Posts:", posts);
        //get comments for the first post after both profile and posts are done
        const comments = await fetchComments(posts[0]?.id);
        console.log("Comments:", comments);
        //display message after getting data
        console.log("All data retrieved successfully");
    } catch (error) {
        console.error("Error:", error.message); //error message if anything fails
    }
};

//function to get data step by step using promise chaining
const fetchDataWithChaining = (userId) => {
    console.log("\nFetch with Promise Chaining:");
    fetchUserProfile(userId)
        //log the user profile and fetch user's post
        .then(profile => {
            console.log("User profile:", profile);
            return fetchPosts(userId);
        })
        //log the posts and fetch comments for the first post
        .then(posts => {
            console.log("Posts:", posts);
            return fetchComments(posts[0]?.id);
        })
        //log the comments and print message after getting all the data
        .then(comments => {
            console.log("Comments:", comments);
            console.log("All data retrieved successfully");
        })
        .catch(error => {
            console.error("Error:", error.message); //error message if anything fails
        });
};

//executing the functions
(async () => {
    await fetchDataSequentially(1); 
    await fetchDataInParallel(2);   
    fetchDataWithChaining(1);       
})();