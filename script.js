document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded Successfully!");

    function loadData() {
        const storedComments = JSON.parse(localStorage.getItem("comments")) || {};
        const storedLikes = JSON.parse(localStorage.getItem("likes")) || {};
        
        document.querySelectorAll(".product-item").forEach(productItem => {
            const productId = productItem.getAttribute("data-id");
            const commentsSection = productItem.querySelector(".comments-section");
            commentsSection.innerHTML = "";

            if (storedComments[productId]) {
                storedComments[productId].forEach((comment, index) => {
                    const commentElement = document.createElement("p");
                    commentElement.textContent = comment;
                    commentElement.classList.add("comment");

                    const deleteButton = document.createElement("button");
                    deleteButton.textContent = "Delete";
                    deleteButton.classList.add("delete-comment-button");
                    deleteButton.dataset.productId = productId;
                    deleteButton.dataset.commentIndex = index;

                    commentElement.appendChild(deleteButton);
                    commentsSection.appendChild(commentElement);
                });
            }

            const likeCountElement = productItem.querySelector(".like-count");
            if (likeCountElement) {
                likeCountElement.textContent = storedLikes[productId] || 0;
            }
        });
    }

    document.body.addEventListener("click", function (event) {
        if (event.target.closest(".like-button")) {
            const button = event.target.closest(".like-button");
            const productItem = button.closest(".product-item");
            const productId = productItem.getAttribute("data-id");
            const likeCountElement = button.querySelector(".like-count");

            if (likeCountElement) {
                let likeCount = parseInt(likeCountElement.textContent) || 0;
                likeCount += 1;
                likeCountElement.textContent = likeCount;
                const storedLikes = JSON.parse(localStorage.getItem("likes")) || {};
                storedLikes[productId] = likeCount;
                localStorage.setItem("likes", JSON.stringify(storedLikes));
            }
        }
    });

    document.body.addEventListener("click", function (event) {
        if (event.target.closest(".comment-button")) {
            const button = event.target.closest(".comment-button");
            const productItem = button.closest(".product-item");
            const productId = productItem.getAttribute("data-id");
            const commentsSection = productItem.querySelector(".comments-section");
            const storedComments = JSON.parse(localStorage.getItem("comments")) || {};
            if (!storedComments[productId]) {
                storedComments[productId] = [];
            }
            const comment = prompt("Leave a comment about this product:");
            if (comment) {
                storedComments[productId].push(comment);
                localStorage.setItem("comments", JSON.stringify(storedComments));
                loadData();
            }
        }
    });

    document.body.addEventListener("click", function (event) {
        if (event.target.closest(".delete-comment-button")) {
            const button = event.target.closest(".delete-comment-button");
            const productId = button.dataset.productId;
            const commentIndex = parseInt(button.dataset.commentIndex);
            const storedComments = JSON.parse(localStorage.getItem("comments")) || {};
            if (storedComments[productId]) {
                storedComments[productId].splice(commentIndex, 1);
                localStorage.setItem("comments", JSON.stringify(storedComments));
                loadData();
            }
        }
    });

    document.body.addEventListener("click", function (event) {
        if (event.target.closest(".whatsapp-button")) {
            const button = event.target.closest(".whatsapp-button");
            const productItem = button.closest(".product-item");
            const productImage = productItem.querySelector("img")?.src || "";
            const phoneNumber = "+233247806555";
            const message = `Hello! I saw this product and I'm interested. Here is the image: ${productImage}`;
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, "_blank");
        }
    });
    document.getElementById("category-filter").addEventListener("change", function() {
        let selectedCategory = this.value.toLowerCase(); // Convert to lowercase
        console.log("Selected Category:", selectedCategory);
        
        document.querySelectorAll(".product-category").forEach(categorySection => {
            let categoryHeading = categorySection.querySelector(".category-heading").innerText.toLowerCase(); // Convert to lowercase
            
            if (selectedCategory === "all" || categoryHeading === selectedCategory) {
                categorySection.style.display = "block";
            } else {
                categorySection.style.display = "none";
            }
        });
    });
    const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Check for saved theme in localStorage
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️ Light Mode";
}

// Toggle theme on button click
toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Update button text
    if (body.classList.contains("dark-mode")) {
        toggleBtn.textContent = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");
    } else {
        toggleBtn.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    }
});

    loadData();
});

document.addEventListener("DOMContentLoaded", function () {
    const products = document.querySelectorAll(".product-item");

    products.forEach(product => {
        const productId = product.dataset.id;
        const stars = product.querySelectorAll(".star");
        const submitButton = product.querySelector(".submit-review");
        const reviewText = product.querySelector(".review-text");
        const reviewsList = product.querySelector(".reviews-list");

        // Load existing reviews
        loadReviews(productId, reviewsList);

        let selectedRating = 0;

        // Star rating functionality
        stars.forEach(star => {
            star.addEventListener("click", function () {
                selectedRating = parseInt(this.dataset.value);
                updateStarSelection(stars, selectedRating);
            });
        });

        // Submit review
        submitButton.addEventListener("click", function () {
            const reviewContent = reviewText.value.trim();
            if (selectedRating === 0 || reviewContent === "") {
                alert("Please select a rating and enter a review.");
                return;
            }

            const review = { rating: selectedRating, text: reviewContent };
            saveReview(productId, review);
            displayReview(reviewsList, review);
            reviewText.value = ""; // Clear input
            updateStarSelection(stars, 0); // Reset stars
        });
    });

    function updateStarSelection(stars, rating) {
        stars.forEach(star => {
            star.classList.toggle("selected", parseInt(star.dataset.value) <= rating);
        });
    }

    function saveReview(productId, review) {
        let reviews = JSON.parse(localStorage.getItem(`reviews_${productId}`)) || [];
        reviews.push(review);
        localStorage.setItem(`reviews_${productId}`, JSON.stringify(reviews));
    }

    function loadReviews(productId, reviewsList) {
        const reviews = JSON.parse(localStorage.getItem(`reviews_${productId}`)) || [];
        reviews.forEach(review => displayReview(reviewsList, review));
    }

    function displayReview(reviewsList, review) {
        const reviewItem = document.createElement("div");
        reviewItem.classList.add("review-item");
        reviewItem.innerHTML = `<strong>${"⭐".repeat(review.rating)}</strong> - ${review.text}`;
        reviewsList.appendChild(reviewItem);
    }
});

