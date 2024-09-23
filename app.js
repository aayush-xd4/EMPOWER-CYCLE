// Product Recommendation Logic
function getRecommendation() {
    const flow = document.getElementById('flow').value;
    const comfort = document.getElementById('comfort').value;
    const accessibility = document.getElementById('accessibility').value;

    let recommendation = "We recommend: ";

    if (flow === "heavy") {
        recommendation += "high-absorbency pads or period underwear. ";
    } else if (flow === "medium") {
        recommendation += "regular tampons , pads or menstrual cups. ";
    } else {
        recommendation += "light pantyliners or menstrual cups. ";
    }

    if (comfort === "eco") {
        recommendation += "Also, eco-friendly reusable products like cloth pads or menstrual cups would be great for you! 🌿";
    } else if (comfort === "soft") {
        recommendation += "Soft and gentle products like organic cotton pads might be a good fit. 😊";
    }

    if (accessibility === "dexterity") {
        recommendation += "Try using products with applicators or period underwear for easier handling.";
    } else if (accessibility === "visual") {
        recommendation += "You might find voice-assist apps helpful for tracking your cycle.";
    }

    document.getElementById('recommendation').textContent = recommendation;
}

// Accessibility Focused Reviews
const reviews = [
    {
        name: "Khushi Verma",
        review: "I have dexterity issues, and period underwear was a game changer! No more fiddling with tampons or pads.",
        accessibility: "dexterity"
    },
    {
        name: "Sapna Chaudhary",
        review: "As someone visually impaired, the simple design of these menstrual cups made them super easy to use!",
        accessibility: "visual"
    },
    {
        name: "Priya Sharma",
        review: "Eco-friendly products like reusable pads make me feel good about reducing waste 🌍. Plus, they're soft and comfy!",
        accessibility: "none"
    },
    {
        name: "Anshika Jha",
        review: "Using pads with wings was difficult because of my limited hand strength. Now I use menstrual cups with a longer stem, and it's much easier. I only need to change it once or twice a day, which saves me a lot of hassle.",
        accessibility: "dexterity"
    },
    {
        name: "Anjali Kumari",
        review: "period underwear has been a game-changer. I don't have to fumble with pads or tampons anymore, just put them on like regular underwear and I'm good for the day. Perfect for those with hand mobility issues!",
        accessibility:"dexterity"
    },
    {
        name: "Kajal Sharma",
        review: "I switched to organic cotton pads, and they are incredibly soft and comfortable! I feel less irritated compared to regular pads, and they last through the night without any leaks.",
        accessibility: "none"
    }
    
];

function loadReviews() {
    const container = document.getElementById('reviews-container');
    reviews.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');

        reviewItem.innerHTML = `
            <h3>${review.name}</h3>
            <p>${review.review}</p>
            <small>Accessibility: ${review.accessibility === 'none' ? 'None' : review.accessibility}</small>
        `;

        container.appendChild(reviewItem);
    });
}

// Load reviews on page load
window.onload = loadReviews;