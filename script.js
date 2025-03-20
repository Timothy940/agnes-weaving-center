document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded Successfully!");
    
    loadData(); // Load likes and comments properly

    // Function to load likes and comments from localStorage
    function loadData() {
        const storedComments = JSON.parse(localStorage.getItem("comments")) || {};
        const storedLikes = JSON.parse(localStorage.getItem("likes")) || {};
        
        document.querySelectorAll(".product-item").forEach(productItem => {
            const productId = productItem.getAttribute("data-id");
            const commentsSection = productItem.querySelector(".comments-section");
            commentsSection.innerHTML = ""; // Clear previous comments

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

    // Handle like button clicks
    document.body.addEventListener("click", function (event) {
        if (event.target.closest(".like-button")) {
            const button = event.target.closest(".like-button");
            const productItem = button.closest(".product-item");
            const productId = productItem.getAttribute("data-id");
            const likeCountElement = productItem.querySelector(".like-count");

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

    // Handle adding comments
    document.body.addEventListener("click", function (event) {
        if (event.target.closest(".comment-button")) {
            const button = event.target.closest(".comment-button");
            const productItem = button.closest(".product-item");
            const productId = productItem.getAttribute("data-id");
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

    // Handle deleting comments
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

    // Handle WhatsApp button click
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

    // Category filter function
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
});
