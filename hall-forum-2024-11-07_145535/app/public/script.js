// Wait for the DOM to fully load
$(document).ready(() => {
  // Handle form submission
  $('#reviewForm').on('submit', function (event) {
    event.preventDefault(); // Prevent form refresh

    const company = $('#company').val();
    const industry = $('#industry').val();
    const rating = $('#rating').val();
    const review = $('#review').val();
    const logoFile = $('#logo')[0].files[0]; // Access the uploaded logo

    // Create a FileReader to read the image file
    const reader = new FileReader();
    reader.onload = function (e) {
      const logoUrl = e.target.result;

      // Build the review card
      const reviewCard = `
        <div class="reviewCard">
          <img src="${logoUrl}" alt="${company} Logo">
          <div class="reviewContent">
            <h3>${company} (${industry})</h3>
            <p><strong>Rating:</strong> ${rating}/5</p>
            <p>${review}</p>
          </div>
        </div>
      `;

      // Append the review card to the reviews list
      $('#reviewsList').append(reviewCard);

      // Reset the form after submission
      $('#reviewForm')[0].reset();
    };

    // Read the image file if provided
    if (logoFile) {
      reader.readAsDataURL(logoFile);
    } else {
      alert('Please upload a logo.');
    }
  });

  // Search functionality
  $('#searchBar').on('input', function () {
    const searchTerm = $(this).val().toLowerCase();
    $('.reviewCard').each(function () {
      const companyName = $(this).find('h3').text().toLowerCase();
      $(this).toggle(companyName.includes(searchTerm));
    });
  });
});
