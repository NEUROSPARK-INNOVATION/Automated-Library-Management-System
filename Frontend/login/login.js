const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
    });
 
loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
    });
    
    const cameFromDashboard = document.referrer.includes('/admin/dashboard-admin/dashboard.html');

    if (cameFromDashboard) {
        window.onload = function() {
            document.getElementById('registerButton').click();
        }; 
    }

        document.getElementById('registerButton').addEventListener('click', function(e) {
        if (!cameFromDashboard) {
            e.preventDefault(); 
            alert('Register new user can only done by admin.');
            window.location.href = "login.html";
            return ;
        }
    });