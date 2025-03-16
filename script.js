document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded Successfully!");

    // Like button functionality
    document.querySelectorAll(".like-button").forEach(button => {
        button.addEventListener("click", function () {
            console.log("Like button clicked!");
            const likeCountElement = this.querySelector(".like-count");
            if (likeCountElement) {
                let likeCount = parseInt(likeCountElement.textContent) || 0;
                likeCountElement.textContent = likeCount + 1;
            }
        });
    });

    // Love button functionality
    document.querySelectorAll(".love-button").forEach(button => {
        button.addEventListener("click", function () {
            console.log("Love button clicked!");
            const loveCountElement = this.querySelector(".love-count");
            if (loveCountElement) {
                let loveCount = parseInt(loveCountElement.textContent) || 0;
                loveCountElement.textContent = loveCount + 1;
            }
        });
    });

    // Comment button functionality (for all products)
    document.querySelectorAll(".comment-button").forEach(button => {
        button.addEventListener("click", function () {
            console.log("Comment button clicked!");
            const comment = prompt("Leave a comment about this product:");
            if (comment) {
                const productItem = this.closest(".product-item");
                const commentsSection = productItem.querySelector(".comments-section");

                // Create a new comment element
                const commentElement = document.createElement("p");
                commentElement.textContent = comment;
                commentElement.classList.add("comment");

                // Append the comment under the product
                commentsSection.appendChild(commentElement);
            }
        });
    });
                // whatsapp button functionality
    document.querySelectorAll(".whatsapp-button").forEach(button => {
        button.addEventListener("click", function () {
            console.log("WhatsApp button clicked!");
            const phoneNumber = "+233247806555";
            const productItem = this.closest(".product-item");
            const productImage = productItem.querySelector("img");
    
            let imageUrl = productImage ? productImage.src : "";
            let message = "Hello! I saw this product and I'm interested.";
    
            if (imageUrl) {
                message += `\nCheck out the image: ${imageUrl}`;
            }
    
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, "_blank");
        });
    });
    

    // Share button functionality
    document.querySelectorAll(".share-button").forEach(button => {
        button.addEventListener("click", function () {
            console.log("Share button clicked!");
            const productUrl = window.location.href;
            if (navigator.share) {
                navigator.share({
                    title: "Agnes' Weaving Center",
                    text: "Check out this amazing product!",
                    url: productUrl,
                }).catch(err => console.error("Error sharing:", err));
            } else {
                navigator.clipboard.writeText(productUrl)
                    .then(() => alert("Link copied to clipboard!"))
                    .catch(err => console.error("Could not copy link:", err));
            }
        });
    });
});
