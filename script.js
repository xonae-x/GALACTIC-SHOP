const PAYPAL_LINK = "https://www.paypal.com/paypalme/yourpaypallink"; // Replace with your actual PayPal link

const accounts = [
    { id: 1, title: "Blox Fruits Account Tier 4", description: "Level 2600 | All Fighting Styles, Race v4", stock: 0 },
    { id: 2, title: "Blox Fruits Account Tier 3", description: "Level 2000 | Mythical Fruit", stock: 0 },
    { id: 3, title: "Blox Fruits Account Tier 2", description: "Level 1500 | 2 Legendary Fruits", stock: 0 },
    { id: 4, title: "Blox Fruits Account Tier 1", description: "Level 1000 | 1 Legendary Fruit", stock: 1 }
];

function displayAccounts(accountList) {
    const container = document.getElementById("accounts");
    container.innerHTML = "";

    accountList.forEach(account => {
        const card = document.createElement("div");
        card.classList.add("account-card");
        card.innerHTML = `
            <h3>${account.title}</h3>
            <p>${account.description}</p>
            <p><strong>Stock:</strong> ${account.stock}</p>
            <button ${account.stock === 0 ? "disabled" : ""} onclick="buyAccount('${account.title}')">
                ${account.stock === 0 ? "Out of Stock" : "Buy"}
            </button>
        `;
        container.appendChild(card);
    });
}

function buyAccount(accountTitle) {
    const email = prompt(`PLEASE ENTER YOUR EMAIL (TO SEND ACCOUNT INFORMATION)\n\nPay here: ${PAYPAL_LINK}`);
    if (email) {
        sendEmail(accountTitle, email);
        alert(`Thank you! Your purchase request for "${accountTitle}" has been sent.\nWe will contact you at ${email}.`);
    }
}

function sendEmail(accountTitle, userEmail) {
    const subject = encodeURIComponent(`Purchase Request: ${accountTitle}`);
    const body = encodeURIComponent(`A user has requested to buy: ${accountTitle}\nUser Email: ${userEmail}\n\nPayment link: ${PAYPAL_LINK}`);

    window.location.href = `mailto:rywyatt1203@gmail.com?subject=${subject}&body=${body}`;
}

document.getElementById("search").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const filteredAccounts = accounts.filter(account =>
        account.title.toLowerCase().includes(query) || account.description.toLowerCase().includes(query)
    );
    displayAccounts(filteredAccounts);
});

window.onload = function () {
    displayAccounts(accounts);
};
