// exercise 1 - format.js
export default {
  formatDate(date) {
    return new Intl.DateTimeFormat('vi-VN').format(date);
  },
  formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }
};
