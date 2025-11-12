import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    textAlign: 'center',
    padding: 5,
  },
  total: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

// Create the PDF document
const OrderPDF = ({ customerInfo, cart, totalPrice }) => (
  <Document>
    <Page style={styles.page}>
      {/* Title */}
      <Text style={styles.header}>Order Summary</Text>
      <h1>From Antique</h1>

      <h2>Delivery to</h2>

      {/* Customer Information */}
      <View style={styles.section}>
        <Text style={styles.text}>Customer Name: {customerInfo.name}</Text>
        <Text style={styles.text}>Phone: {customerInfo.phone}</Text>
        <Text style={styles.text}>Address: {customerInfo.address}</Text>
        <Text style={styles.text}>Pincode: {customerInfo.pincode}</Text>
      </View>

      {/* Order Details */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Product Name</Text>
          <Text style={styles.tableCol}>Quantity</Text>
          <Text style={styles.tableCol}>Price</Text>
          <Text style={styles.tableCol}>Total</Text>
        </View>
        {cart.map((item) => (
          <View style={styles.tableRow} key={item._id}>
            <Text style={styles.tableCol}>{item.pname}</Text>
            <Text style={styles.tableCol}>{item.quantity || 1}</Text>
            <Text style={styles.tableCol}>Rs. {item.price.toFixed(2)}</Text>
            <Text style={styles.tableCol}>
              Rs. {(item.price * (item.quantity || 1)).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Total Price */}
      <Text style={styles.total}>Total Price: Rs. {totalPrice.toFixed(2)}</Text>
    </Page>
  </Document>
);

export default OrderPDF;
