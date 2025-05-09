## Task
1. Write a Python script `filter_edit_order_summary.py` that:
   - Reads `orders.jsonl` .
   - Reads `order_summary.csv` to get order summaries.
   - Filters orders where:
     - At least one item in `items` has `product` equal to "Laptop".
     - The `order_date` is in April 2025 ("2025-04-01" to "2025-04-30").
     - The computed total order value (sum of `price * quantity` for all items) is at least $500.
   - Updates `order_summary.csv` by setting `total_value` to the computed total value and `processed` to "yes" for filtered orders (matched by `order_id`).
   - Writes the filtered orders to `laptop_april_high_value.csv` with columns: `order_id`, `customer_name`, `order_date`, `total_value`, `item_count`.
   - Writes the filtered orders to `laptop_april_high_value.jsonl`, preserving the original structure and adding a `filtered_reason` field (e.g., "Laptop, April 2025, total value >= $500").


## Deliverables
- `filter_edit_order_summary.py`
- Updated `order_summary.csv`
- `laptop_april_high_value.csv`
- `laptop_april_high_value.jsonl`

## Sample Output
**`laptop_april_high_value.csv`**:
```csv
order_id,customer_name,order_date,total_value,item_count
3,Charlie Brown,2025-04-03,2059.97,2
```

**`laptop_april_high_value.jsonl`**:
```
{"order_id": 3, "customer": {"name": "Charlie Brown", "email": "charlie.brown@example.com", "location": "TX"}, "items": [{"product": "Laptop", "price": 999.99, "quantity": 2}, {"product": "Keyboard", "price": 59.99, "quantity": 1}], "order_date": "2025-04-03", "filtered_reason": "Laptop, April 2025, total value >= $500"}
```

**Updated `order_summary.csv` (partial)**:
```csv
order_id,total_value,processed
1,0.0,no
2,0.0,no
3,2059.97,yes
4,0.0,no
5,0.0,no
```