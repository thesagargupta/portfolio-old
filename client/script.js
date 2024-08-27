document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('myForm').addEventListener('submit', handleSubmit);
});

async function handleSubmit(event) {
    event.preventDefault();
    
    const form = document.getElementById('myForm');
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
    };

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
