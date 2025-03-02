from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

accounts = [
    {"id": 1, "title": "Premium Roblox Account", "description": "Level 50, Rare Skins", "stock": 3},
    {"id": 2, "title": "Starter Roblox Account", "description": "Fresh account with 100 Robux", "stock": 5}
]

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

if __name__ == '__main__':
    app.run(debug=True)
