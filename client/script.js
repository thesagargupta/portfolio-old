document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('myForm').addEventListener('submit', handleSubmit);
});

async function handleSubmit(event) {
    event.preventDefault();
    
    const form = document.getElementById('myForm');
    const formData = new FormData(form);
    
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const phone = formData.get('phone').trim();
    const message = formData.get('message').trim();
    
    // Validation
    if (!name || !email || !phone || !message) {
        Swal.fire({
            icon: "error",
            title: "Validation Error",
            text: "All fields are required!"
        });
        return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Email",
            text: "Please enter a valid email address!"
        });
        return;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Phone Number",
            text: "Phone number should be 10 digits long!"
        });
        return;
    }

    const data = { name, email, phone, message };

    try {
        const response = await fetch(window.config.API_URL + '/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.success) {
            Swal.fire({
                title: "Thanks for contacting me.",
                text: "Your message has been sent successfully!!",
                icon: "success"
            });
            form.reset(); // Optionally reset the form after successful submission
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!"
            });
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            title: "Server error",
            text: "Try after some time",
            icon: "question"
        });
    }
}
