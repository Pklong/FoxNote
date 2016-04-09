var emailRegex = /^\w+@\w+\.\w{2,3}$/;

module.exports = {
  isValidEmail: function(email) {
    return Boolean((emailRegex.exec(email)));
  },

  isValidLength: function(input, minLength) {
    return input.length >= minLength;
  }
};
