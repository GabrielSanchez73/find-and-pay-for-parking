// Variables globales
let currentScreen = 'login-screen';
let currentParking = '';

// Función para cambiar entre pestañas de login/registro
function switchTab(tab) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginBtn = document.querySelector('.tab-btn[onclick="switchTab(\'login\')"]');
    const registerBtn = document.querySelector('.tab-btn[onclick="switchTab(\'register\')"]');
    
    if (tab === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        loginBtn.classList.add('active');
        registerBtn.classList.remove('active');
    } else {
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
        loginBtn.classList.remove('active');
        registerBtn.classList.add('active');
    }
}

// Función para cambiar de pantalla
function showScreen(screenId) {
    // Ocultar todas las pantallas
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostrar la pantalla solicitada
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenId;
    }
}

// Función para mostrar modal de reserva
function showReservationModal(parkingName) {
    currentParking = parkingName;
    document.getElementById('parking-name').textContent = parkingName;
    
    const modal = document.getElementById('reservation-modal');
    modal.classList.add('active');
    modal.style.display = 'flex';
}

// Función para cerrar modal
function closeModal() {
    const modal = document.getElementById('reservation-modal');
    modal.classList.remove('active');
    modal.style.display = 'none';
}

// Función para ir a pantalla de pago
function goToPayment() {
    closeModal();
    showScreen('payment-screen');
}

// Función para procesar pago
function processPayment() {
    // Simular procesamiento de pago
    const paymentBtn = document.querySelector('.btn-large');
    const originalText = paymentBtn.innerHTML;
    
    paymentBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
    paymentBtn.disabled = true;
    
    setTimeout(() => {
        showScreen('confirmation-screen');
        paymentBtn.innerHTML = originalText;
        paymentBtn.disabled = false;
    }, 2000);
}

// Función para volver atrás
function goBack() {
    if (currentScreen === 'payment-screen') {
        showScreen('main-screen');
    } else if (currentScreen === 'confirmation-screen') {
        showScreen('main-screen');
    }
}

// Función para descargar comprobante
function downloadTicket() {
    // Simular descarga
    const btn = event.target.closest('button');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Descargando...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Descargado';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500);
    }, 1500);
}

// Función para ver historial
function viewHistory() {
    alert('Funcionalidad de historial en desarrollo');
}

// Función para cambiar método de pago
function selectPaymentMethod(element) {
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
        option.classList.remove('active');
    });
    
    element.classList.add('active');
}

// Función para simular login
function simulateLogin() {
    const loginBtn = document.querySelector('#login-form .btn-primary');
    const originalText = loginBtn.textContent;
    
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Iniciando sesión...';
    loginBtn.disabled = true;
    
    setTimeout(() => {
        showScreen('main-screen');
        loginBtn.textContent = originalText;
        loginBtn.disabled = false;
    }, 1500);
}

// Función para simular registro
function simulateRegister() {
    const registerBtn = document.querySelector('#register-form .btn-primary');
    const originalText = registerBtn.textContent;
    
    registerBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creando cuenta...';
    registerBtn.disabled = true;
    
    setTimeout(() => {
        showScreen('main-screen');
        registerBtn.textContent = originalText;
        registerBtn.disabled = false;
    }, 2000);
}

// Función para mostrar panel administrativo
function showAdminPanel() {
    showScreen('admin-screen');
}

// Función para agregar interactividad a los elementos
function addInteractivity() {
    // Botones de login/registro
    const loginBtn = document.querySelector('#login-form .btn-primary');
    const registerBtn = document.querySelector('#register-form .btn-primary');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', simulateLogin);
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', simulateRegister);
    }
    
    // Opciones de pago
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
        option.addEventListener('click', () => selectPaymentMethod(option));
    });
    
    // Cerrar modal al hacer clic fuera
    const modal = document.getElementById('reservation-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Botón de administración en el menú de usuario
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        userMenu.addEventListener('click', () => {
            const menu = document.createElement('div');
            menu.className = 'user-dropdown';
            menu.innerHTML = `
                <div class="dropdown-item" onclick="showAdminPanel()">
                    <i class="fas fa-cog"></i>
                    Administración
                </div>
                <div class="dropdown-item" onclick="showScreen('login-screen')">
                    <i class="fas fa-sign-out-alt"></i>
                    Cerrar Sesión
                </div>
            `;
            
            // Estilos para el dropdown
            menu.style.cssText = `
                position: absolute;
                top: 100%;
                right: 0;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                padding: 8px 0;
                min-width: 150px;
                z-index: 1000;
            `;
            
            const dropdownItem = menu.querySelectorAll('.dropdown-item');
            dropdownItem.forEach(item => {
                item.style.cssText = `
                    padding: 8px 16px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 14px;
                    color: #333;
                    transition: background-color 0.3s ease;
                `;
                
                item.addEventListener('mouseenter', () => {
                    item.style.backgroundColor = '#f8f9fa';
                });
                
                item.addEventListener('mouseleave', () => {
                    item.style.backgroundColor = 'transparent';
                });
            });
            
            // Remover dropdown existente si existe
            const existingDropdown = document.querySelector('.user-dropdown');
            if (existingDropdown) {
                existingDropdown.remove();
            } else {
                userMenu.style.position = 'relative';
                userMenu.appendChild(menu);
            }
        });
    }
}

// Función para agregar animaciones y efectos
function addAnimations() {
    // Animación de entrada para las pantallas
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.addEventListener('transitionend', () => {
            if (screen.classList.contains('active')) {
                screen.style.opacity = '1';
                screen.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Efecto hover para los marcadores del mapa
    const markers = document.querySelectorAll('.parking-marker');
    markers.forEach(marker => {
        marker.addEventListener('mouseenter', () => {
            marker.style.transform = 'scale(1.1)';
        });
        
        marker.addEventListener('mouseleave', () => {
            marker.style.transform = 'scale(1)';
        });
    });
    
    // Efecto de carga para los botones
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
}

// Función para simular datos en tiempo real
function simulateRealTimeData() {
    // Actualizar disponibilidad de espacios cada 30 segundos
    setInterval(() => {
        const spotCounts = document.querySelectorAll('.spots');
        spotCounts.forEach(spots => {
            const currentCount = parseInt(spots.textContent);
            const newCount = Math.max(0, currentCount + Math.floor(Math.random() * 3) - 1);
            spots.textContent = `${newCount} disponibles`;
        });
    }, 30000);
    
    // Actualizar precios dinámicamente
    setInterval(() => {
        const prices = document.querySelectorAll('.price');
        prices.forEach(price => {
            if (price.textContent.includes('$')) {
                const currentPrice = parseInt(price.textContent.replace(/[$,]/g, ''));
                const variation = Math.floor(Math.random() * 500) - 250;
                const newPrice = Math.max(1000, currentPrice + variation);
                price.textContent = `$${newPrice.toLocaleString()}`;
            }
        });
    }, 60000);
}

// Función para agregar validaciones de formulario
function addFormValidations() {
    // Validación de email
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (input.value && !emailRegex.test(input.value)) {
                input.style.borderColor = '#dc3545';
                input.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
            } else {
                input.style.borderColor = '#e9ecef';
                input.style.boxShadow = 'none';
            }
        });
    });
    
    // Validación de teléfono
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', () => {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (input.value && !phoneRegex.test(input.value)) {
                input.style.borderColor = '#dc3545';
                input.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
            } else {
                input.style.borderColor = '#e9ecef';
                input.style.boxShadow = 'none';
            }
        });
    });
}

// Función para agregar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Agregar estilos para las animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .screen {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    }
    
    .screen.active {
        opacity: 1;
        transform: translateY(0);
    }
    
    .notification button {
        background: none;
        border: none;
        cursor: pointer;
        color: inherit;
        padding: 4px;
        border-radius: 4px;
        transition: background-color 0.3s ease;
    }
    
    .notification button:hover {
        background: rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(style);

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    addInteractivity();
    addAnimations();
    addFormValidations();
    simulateRealTimeData();
    
    // Mostrar notificación de bienvenida
    setTimeout(() => {
        showNotification('¡Bienvenido a ParkEasy! Encuentra y reserva tu espacio de parqueo fácilmente.', 'success');
    }, 1000);
    
    // Simular notificaciones de reservas
    setTimeout(() => {
        showNotification('Nuevo parqueadero disponible cerca de tu ubicación', 'info');
    }, 5000);
});

// Funciones globales para uso en HTML
window.switchTab = switchTab;
window.showReservationModal = showReservationModal;
window.closeModal = closeModal;
window.goToPayment = goToPayment;
window.processPayment = processPayment;
window.goBack = goBack;
window.downloadTicket = downloadTicket;
window.viewHistory = viewHistory;
window.showAdminPanel = showAdminPanel;
window.showScreen = showScreen;
