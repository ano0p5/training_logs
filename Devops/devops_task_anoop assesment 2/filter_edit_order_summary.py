import json
import csv
from datetime import datetime

def filter_orders(orders_file, summary_file):
    filtered_orders = []
    order_summaries = {}

    with open(summary_file, 'r') as csvfile:
        reader = csv.reader(csvfile)
        header = next(reader)
        for row in reader:
            order_id, total_value, processed = row
            order_summaries[int(order_id)] = {
                'total_value': float(total_value),
                'processed': processed
            }
    
    with open(orders_file, 'r') as jsonlfile:
        for line in jsonlfile:
            order = json.loads(line)
            order_id = order['order_id']
            order_date = datetime.strptime(order['order_date'], '%Y-%m-%d').date()
            items = order['items']

            is_laptop = any(item['product'] == 'Laptop' for item in items)
            is_april_2025 = 2025 == order_date.year and 4 == order_date.month
            total_value = sum(item['price'] * item['quantity'] for item in items)
            is_high_value = total_value >= 500

            if is_laptop and is_april_2025 and is_high_value:
                filtered_orders.append(order)

                order_summaries[order_id] = {
                    'total_value': total_value,
                    'processed': 'yes'
                }

    return filtered_orders, order_summaries

def filtered_orders_csv(filtered_orders, filename="laptop_april_high_value.csv"):
    
    with open(filename, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['order_id', 'customer_name', 'order_date', 'total_value', 'item_count'])
        for order in filtered_orders:
            order_id = order['order_id']
            customer_name = order['customer']['name']
            order_date = order['order_date']
            total_value = sum(item['price'] * item['quantity'] for item in order['items'])
            item_count = len(order['items'])
            writer.writerow([order_id, customer_name, order_date, total_value, item_count])

def filtered_orders_jsonl(filtered_orders, filename="laptop_april_high_value.jsonl"):

    with open(filename, 'w') as jsonlfile:
        for order in filtered_orders:
            jsonlfile.write(json.dumps(order) + '\n')

def update_order_summary_csv(order_summaries, filename="order_summary.csv"):
    with open(filename, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['order_id', 'total_value', 'processed'])
        for order_id, summary in order_summaries.items():
            writer.writerow([order_id, summary['total_value'], summary['processed']])

def main():
    orders_file = "/home/anoop/Downloads/Training/orders.jsonl"
    summary_file = "/home/anoop/Downloads/Training/order_summary.csv"
    filtered_orders, order_summaries = filter_orders(orders_file, summary_file)
    filtered_orders_csv(filtered_orders)
    filtered_orders_jsonl(filtered_orders)
    update_order_summary_csv(order_summaries)

if __name__ == "__main__":
    main()
