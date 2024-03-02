document.addEventListener('DOMContentLoaded', function() {
    const imageInput = document.getElementById('image');
    const currentImage = document.getElementById('currentImage');

    if (imageInput && currentImage) {
        imageInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                currentImage.src = e.target.result;
            }

            reader.readAsDataURL(file);
        });
    }
});