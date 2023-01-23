import React, { useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import '../styles/Invoice.css';

function Invoice() {
  const [items, setItems] = useState([
    {
      srNo: 1,
      name: '',
      rate: 0,
      quantity: 0,
      basicCost: 0,
      discount: 0,
      finalBasicCost: 0,
      taxes: 0,
      taxAmount: 0,
      totalCost: 0
    }
  ]);

  // Function to calculate basic cost, discount amount, final basic cost, tax amount and total cost
  const calculateCosts = (index) => {
    const item = items[index];
    item.basicCost = item.rate * item.quantity;
    item.discountAmount = (item.basicCost * item.discount) / 100;
    item.finalBasicCost = item.basicCost - item.discountAmount;
    item.taxAmount = (item.finalBasicCost * item.taxes) / 100;
    item.totalCost = item.finalBasicCost + item.taxAmount;
    const newItems = [...items];
    newItems[index] = item;
    setItems(newItems);
  }

  // Function to handle input change
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const item = items[index];
    item[name] = value;
    calculateCosts(index);
  }

  // Function to handle add row
  const handleAddRow = () => {
    const newItem = {
      srNo: items.length + 1,
      name: '',
      rate: 0,
      quantity: 0,
      basicCost: 0,
      discount: 0,
      finalBasicCost: 0,
      taxes: 0,
      taxAmount: 0,
      totalCost: 0
    }
    setItems([...items, newItem]);
  }

  // Function to handle delete row
  const handleDeleteRow = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);

    // Update serial number of the remaining items
    newItems.forEach((item, i) => {
      item.srNo = i + 1;
    });

    setItems(newItems);
  }

  // Function to calculate totals
  const calculateTotals = () => {
    let totalBasicCost = 0;
    let totalDiscount = 0;
    let totalFinalBasicCost = 0;
    let totalTax = 0;
    let finalPrice = 0;

    items.forEach((item) => {
      totalBasicCost += item.basicCost;
      totalDiscount += item.discountAmount;
      totalFinalBasicCost += item.finalBasicCost;
      totalTax += item.taxAmount;
      finalPrice += item.totalCost;
    });

    return { totalBasicCost, totalDiscount, totalFinalBasicCost, totalTax, finalPrice };
  }

  const totals = calculateTotals();
  return (
    <div className="invoice-container">
      <Table>
        <thead>
          <tr>
            <th>SR.NO</th>
            <th>Name of Item</th>
            <th>Rate</th>
            <th>Quantity</th>
            <th>Basic Cost</th>
            <th>Discount(%)</th>
            <th>Final Basic Cost</th>
            <th>Taxes(%)</th>
            <th>Tax Amount</th>
            <th>Total Cost</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.srNo}>
              <td>{item.srNo}</td>
              <td>
                <Form.Control
                  className="invoice-input"
                  type="text"
                  name="name"
                  value={item.name}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
              </td>
              <td>
                <Form.Control
                  className="invoice-input"
                  type="number"
                  name="rate"
                  value={item.rate}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
              </td>
              <td>
                <Form.Control
                  className="invoice-input"
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
              </td>
              <td>{item.basicCost}</td>
              <td>
                <Form.Control
                  className="invoice-input"
                  type="number"
                  name="discount"
                  value={item.discount}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
              </td>
              <td>{item.finalBasicCost}</td>
              <td>
                <Form.Control
                  className="invoice-input"
                  type="number"
                  name="taxes"
                  value={item.taxes}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
              </td>
              <td>{item.taxAmount}</td>
              <td>{item.totalCost}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteRow(index)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>Totals</td>
            <td>{totals.totalBasicCost}</td>
            <td>{totals.totalDiscount}</td>
            <td>{totals.totalFinalBasicCost}</td>
            <td>{totals.totalTax}</td>
            <td>{totals.finalPrice}</td>
            <td>
              <Button variant="success" onClick={handleAddRow}>Add Row</Button>
            </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
export default Invoice;
