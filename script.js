// ===== ДАННЫЕ ПРОДУКТОВ =====
const products = {
    1: {
        name: 'Мужские оксфорды',
        price: '€150',
        description: 'Классические черные туфли оксфорды из натуральной итальянской кожи. Ручная работа мастеров с более чем 15-летним опытом. Идеальны для деловых встреч и официальных мероприятий.',
        details: [
            'Материал: 100% натуральная кожа',
            'Подошва: Кожаная, прошитая вручную',
            'Размеры: 36-46',
            'Цвет: Классический черный',
            'Происхождение: Сделано в Италии'
        ]
    },
    2: {
        name: 'Женские лоферы',
        price: '€140',
        description: 'Элегантные коричневые лоферы для современной женщины. Сочетают в себе комфорт и стиль. Подходят как для офиса, так и для повседневной носки.',
        details: [
            'Материал: Замша премиум-класса',
            'Подошва: Гибкая резина',
            'Размеры: 35-42',
            'Цвет: Коричневый',
            'Происхождение: Сделано в Италии'
        ]
    },
    3: {
        name: 'Минималистичные кроссовки',
        price: '€130',
        description: 'Белые кроссовки в стиле минимализма. Изготовлены из натуральных материалов с учетом принципов долговечности. Максимальный комфорт при минимальном дизайне.',
        details: [
            'Материал: Натуральный текстиль и кожа',
            'Подошва: Резина высокого качества',
            'Размеры: 36-46',
            'Цвет: Белый',
            'Происхождение: Сделано в Италии'
        ]
    },
    4: {
        name: 'Демисезонные ботинки',
        price: '€180',
        description: 'Универсальные ботинки для любой погоды. Надежная защита и максимальный комфорт. Идеальны для осени и весны.',
        details: [
            'Материал: Натуральная кожа',
            'Подошва: Противоскользящая резина',
            'Размеры: 36-46',
            'Цвет: Черный',
            'Происхождение: Сделано в Италии'
        ]
    },
    5: {
        name: 'Летние сандалии',
        price: '€95',
        description: 'Легкие и удобные сандалии для жаркого времени года. Естественные материалы обеспечивают циркуляцию воздуха.',
        details: [
            'Материал: Натуральная кожа и ткань',
            'Подошва: Пробка',
            'Размеры: 36-45',
            'Цвет: Светло-коричневый',
            'Происхождение: Сделано в Италии'
        ]
    },
    6: {
        name: 'Деловые туфли',
        price: '€165',
        description: 'Профессиональные туфли для деловых людей. Сочетают строгость и элегантность. Подходят для офиса и важных встреч.',
        details: [
            'Материал: Премиум-кожа',
            'Подошва: Кожаная',
            'Размеры: 36-46',
            'Цвет: Черный классический',
            'Происхождение: Сделано в Италии'
        ]
    }
};

// ===== ФУНКЦИЯ ПРОКРУТКИ К КАТАЛОГУ =====
function scrollToCatalog() {
    const catalogSection = document.getElementById('catalog');
    catalogSection.scrollIntoView({ behavior: 'smooth' });
}

// ===== ФУНКЦИЯ ОТКРЫТИЯ МОДАЛЬНОГО ОКНА С ПРОДУКТОМ =====
function openProduct(productId) {
    const product = products[productId];
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');

    let detailsHTML = '<ul style="list-style: none; padding-left: 0;">';
    product.details.forEach(detail => {
        detailsHTML += `<li style="padding: 8px 0; border-bottom: 1px solid #ddd;">• ${detail}</li>`;
    });
    detailsHTML += '</ul>';

    modalBody.innerHTML = `
        <div class="modal-product">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <div class="price">${product.price}</div>
            <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0;">
                <h4 style="margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;">Характеристики:</h4>
                ${detailsHTML}
            </div>
            <button class="modal-button" onclick="addToCart('${product.name}')">Добавить в корзину</button>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===== ФУНКЦИЯ ЗАКРЫТИЯ МОДАЛЬНОГО ОКНА =====
function closeModal(event) {
    if (event && event.target.id !== 'productModal') {
        return;
    }
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ===== Ф��НКЦИЯ ДОБАВЛЕНИЯ В КОРЗИНУ =====
function addToCart(productName) {
    showNotification(`"${productName}" добавлена в корзину!`);
    closeModal();
}

// ===== ФУНКЦИЯ ОТПРАВКИ ФОРМЫ =====
function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.elements[0].value;
    const email = form.elements[1].value;
    const message = form.elements[2].value;

    if (name && email && message) {
        showNotification(`Спасибо, ${name}! Ваше сообщение отправлено. Мы свяжемся с вами на ${email}`);
        form.reset();
    }
}

// ===== ФУНКЦИЯ УВЕДОМЛЕНИЯ =====
function showNotification(text) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #000;
        color: #fff;
        padding: 20px 30px;
        border-left: 4px solid #d4a574;
        border-radius: 4px;
        z-index: 2000;
        font-size: 14px;
        letter-spacing: 1px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = text;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== АНИМАЦИЯ СКРОЛЛА =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }

    .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ===== INTERSECTION OBSERVER ДЛЯ АНИМАЦИИ ПРИ СКРОЛЛЕ =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// ===== ДОБАВЛЕНИЕ КЛАССА ДЛЯ АНИМАЦИИ К ЭЛЕМЕНТАМ =====
document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product-card');
    const stats = document.querySelectorAll('.stat');
    const sections = document.querySelectorAll('.section-title');

    [...products, ...stats, ...sections].forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Обработчик закрытия модального окна по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

// ===== ЛОГИРОВАНИЕ (для отладки) =====
console.log('🎨 Italian Shoes Website v1.0 - Loaded successfully!');
console.log('📌 Available functions:');
console.log('  - scrollToCatalog()');
console.log('  - openProduct(productId)');
console.log('  - closeModal()');
console.log('  - addToCart(productName)');
console.log('  - submitForm(event)');
console.log('✅ All systems operational');
