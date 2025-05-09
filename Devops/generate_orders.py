import json
import csv
import random
from datetime import datetime, timedelta

# First and last names (50 each = 2500 combinations)
first_names = [
    "Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Henry", "Isabel", "Jack",
    "Karen", "Leo", "Mia", "Nathan", "Olivia", "Paul", "Quinn", "Rachel", "Steve", "Tina",
    "Uma", "Victor", "Wendy", "Xander", "Yara", "Zack", "Aaron", "Bianca", "Caleb", "Delia",
    "Elijah", "Fiona", "Gavin", "Hazel", "Iris", "Jason", "Kylie", "Liam", "Megan", "Noah",
    "Opal", "Peter", "Queen", "Ryder", "Sophie", "Trent", "Ursula", "Violet", "Will", "Zoe","Abin","Jithesh",
    "aneesh","prvairaj"
]

last_names = [
    "Smith", "Johnson", "Brown", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin",
    "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall",
    "Allen", "Young", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Green", "Adams",
    "Baker", "Nelson", "Carter", "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker",
    "Evans", "Edwards", "Collins", "Stewart", "Sanchez", "Morris", "Rogers", "Reed", "Cook", "Morgan"
]

# Sample locations and products
locations = ["NY", "CA", "TX", "FL", "WA", "IL", "GA", "MA", "CO", "AZ"]
products = [
    {"product": "Laptop", "price": 999.99}, {"product": "Phone", "price": 699.99},
    {"product": "Tablet", "price": 499.99}, {"product": "Monitor", "price": 199.99},
    {"product": "Keyboard", "price": 59.99}, {"product": "Mouse", "price": 29.99}
]
statuses = ["active", "inactive"]
start_date = datetime.strptime("2025-04-01", "%Y-%m-%d")

# Generate unique full names
all_combinations = list({f"{fn} {ln}" for fn in first_names for ln in last_names})
random.shuffle(all_combinations)
selected_names = all_combinations[:1000]  # Use up to 1000 synthetic customers

# Generate customers
customers = []
for name in selected_names:
    email = f"{name.lower().replace(' ', '.')}@example.com"
    customers.append({"name": name, "email": email, "status": random.choice(statuses)})

# Generate orders
orders = []
num_orders = 5000  # You can change this number
with open('orders.jsonl', 'w') as f:
    for i in range(1, num_orders + 1):
        order_date = (start_date + timedelta(days=random.randint(0, 59))).strftime("%Y-%m-%d")
        num_items = random.randint(1, 3)
        items = [
            {"product": p["product"], "price": p["price"], "quantity": random.randint(1, 3)}
            for p in random.sample(products, num_items)
        ]
        customer = random.choice(customers)
        order = {
            "order_id": i,
            "customer": {
                "name": customer["name"],
                "email": customer["email"],
                "location": random.choice(locations)
            },
            "items": items,
            "order_date": order_date
        }
        orders.append(order)
        f.write(json.dumps(order) + '\n')

# Write customer_status.csv
with open('customer_status.csv', 'w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['email', 'status'])
    writer.writeheader()
    for customer in customers:
        writer.writerow({'email': customer['email'], 'status': customer['status']})

# Write order_summary.csv
with open('order_summary.csv', 'w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['order_id', 'total_value', 'processed'])
    writer.writeheader()
    for order in orders:
        total = sum(item['price'] * item['quantity'] for item in order['items'])
        writer.writerow({
            'order_id': order['order_id'],
            'total_value': f"0.0",
            'processed': 'no'
        })
