from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Sample data storage (Replace with a database later)
accounts = [
    {"id": 1, "title": "Premium Roblox Account", "description": "Level 50, Rare Skins", "stock": 3, "featured": True},
    {"id": 2, "title": "Starter Roblox Account", "description": "Fresh account with 100 Robux", "stock": 5, "featured": False}
]

@app.route('/')
def admin_panel():
    featured_accounts = [acc for acc in accounts if acc["featured"]]
    available_accounts = [acc for acc in accounts if not acc["featured"]]
    return render_template('admin.html', featured_accounts=featured_accounts, available_accounts=available_accounts)

@app.route('/api/accounts', methods=['GET'])
def get_accounts():
    return jsonify(accounts)

@app.route('/api/buy/<int:account_id>', methods=['POST'])
def buy_account(account_id):
    for account in accounts:
        if account["id"] == account_id and account["stock"] > 0:
            account["stock"] -= 1
            return jsonify({"message": "Purchase successful!", "remaining_stock": account["stock"]})
    return jsonify({"error": "Out of stock or invalid account."}), 400

@app.route('/api/update_stock', methods=['POST'])
def update_stock():
    data = request.json
    for account in accounts:
        if account["id"] == data["id"]:
            account["stock"] = data["stock"]
            return jsonify({"message": "Stock updated successfully!"})
    return jsonify({"error": "Account not found."}), 400

if __name__ == '__main__':
    app.run(debug=True)
