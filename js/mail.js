const aappii = "/api/mailsend";

document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch(`${aappii}/emails/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    Swal.fire({
        title: 'Message',
        text: result.message || 'Something went wrong',
        icon: res.ok ? 'success' : 'error',
        confirmButtonText: 'OK'
    });
});