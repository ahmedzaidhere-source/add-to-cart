    // --- 1. CART STATE / DATA ---
        let cartItems = [
            {
                id: 1,
                title: "Wireless Bluetooth Earbuds Noise Cancelling",
                price: 2500,
                qty: 1,
                image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=120&auto=format&fit=crop&q=80"
            },
            {
                id: 2,
                title: "Smart Watch Sports Strap Fitness Tracker",
                price: 4500,
                qty: 1,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&auto=format&fit=crop&q=80"
            }
        ];

        let shippingFee = 150;
        let discount = 0;

        // --- 2. RENDER CART ITEMS ---
        function renderCart() {
            const listContainer = document.getElementById('cart-list');
            listContainer.innerHTML = '';

            if (cartItems.length === 0) {
                listContainer.innerHTML = '<p style="text-align: center; color: var(--text-gray); padding: 20px 0; font-size: 13px;">Your cart is empty!</p>';
            } else {
                cartItems.forEach(item => {
                    listContainer.innerHTML += `
                        <div class="cart-item">
                            <div class="product-info">
                                <img src="${item.image}" alt="${item.title}" class="product-img">
                                <div>
                                    <div class="product-title">${item.title}</div>
                                    <div class="product-price">Rs. ${item.price}</div>
                                </div>
                            </div>
                            
                            <div class="qty-controls">
                                <div class="qty-box">
                                    <button onclick="changeQty(${item.id}, -1)" class="qty-btn">-</button>
                                    <span class="qty-val">${item.qty}</span>
                                    <button onclick="changeQty(${item.id}, 1)" class="qty-btn">+</button>
                                </div>
                                <button onclick="removeItem(${item.id})" class="delete-btn">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `;
                });
            }

            calculateTotals();
        }

        // --- 3. QUANTITY & ITEM MANAGEMENT ---
        function changeQty(id, amount) {
            const item = cartItems.find(i => i.id === id);
            if (item) {
                item.qty += amount;
                if (item.qty <= 0) {
                    cartItems = cartItems.filter(i => i.id !== id);
                }
            }
            renderCart();
        }

        function removeItem(id) {
            cartItems = cartItems.filter(i => i.id !== id);
            renderCart();
        }

        // --- 4. CALCULATE TOTALS ---
        function calculateTotals() {
            const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
            const total = cartItems.length > 0 ? Math.max(0, subtotal + shippingFee - discount) : 0;

            document.getElementById('summary-subtotal').innerText = subtotal;
            document.getElementById('summary-shipping').innerText = cartItems.length > 0 ? shippingFee : 0;
            document.getElementById('summary-discount').innerText = discount;
            document.getElementById('summary-total').innerText = total;
        }

        // --- 5. APPLY PROMO VOUCHER ---
               


        // --- 6. SWITCH BETWEEN STEPS ---
        function goToStep(stepNumber) {
            if (stepNumber > 1 && cartItems.length === 0) {
                alert("Your cart is empty! Please add items first.");
                return;
            }

            // Hide all 4 sections
            document.getElementById('step-1').classList.add('hidden');
            document.getElementById('step-2').classList.add('hidden');
            document.getElementById('step-3').classList.add('hidden');
            document.getElementById('step-4').classList.add('hidden');

            // Reset step tab active styles
            for (let i = 1; i <= 4; i++) {
                document.getElementById(`step-btn-${i}`).classList.remove('active');
            }

            // Show selected section and highlight tab
            document.getElementById(`step-${stepNumber}`).classList.remove('hidden');
            document.getElementById(`step-btn-${stepNumber}`).classList.add('active');
        }

        // --- 7. PLACE ORDER ---
        function placeOrder() {
            const name = document.getElementById('cust-name').value;
            const address = document.getElementById('cust-address').value;
            const city = document.getElementById('cust-city').value;
            const payment = document.querySelector('input[name="payment"]:checked').value;

            const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
            const total = subtotal + shippingFee - discount;

            // Fill Confirmation Box
            document.getElementById('final-order-id').innerText = "#PK-" + Math.floor(100000 + Math.random() * 900000);
            document.getElementById('final-name').innerText = name;
            document.getElementById('final-address').innerText = `${address}, ${city}`;
            document.getElementById('final-payment').innerText = payment;
            document.getElementById('final-total').innerText = total;

            goToStep(4);
        }

        // --- 8. RESET CART ---
        function resetCart() {
            cartItems = [
                {
                    id: 1,
                    title: "Wireless Bluetooth Earbuds Noise Cancelling",
                    price: 2500,
                    qty: 1,
                    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=120&auto=format&fit=crop&q=80"
                }
            ];
            discount = 0;
            document.getElementById('voucher-input').value = '';
            document.getElementById('voucher-msg').classList.add('hidden');
            renderCart();
            goToStep(1);
        }

        // Load cart on page startup
        renderCart();
    