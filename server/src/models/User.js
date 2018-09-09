import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

const schema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true
    },
    password: { type: String, required: true },
    confirmed: { type: Boolean, default: false },
    confirmationToken: { type: String, default: '' }
  },
  { timestamp: true }
);

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

schema.methods.isValidToken = function isValidToken(token) {
  return token === this.confirmationToken;
};

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    { username: this.username, isConfirmed: this.confirmed },
    process.env.JWT_SECRET
  );
};

schema.methods.setPassword = function setPassword(password) {
  this.password = bcrypt.hashSync(password, 10);
};

schema.methods.setConfirmationToken = function setConfirmationToken() {
  this.confirmationToken = this.generateJWT();
};

schema.methods.generateConfirmationURL = function generateConfirmationURL() {
  return `http://localhost:3000/confirmation/${this.confirmationToken}`;
};

schema.methods.setResetPasswordToken = function setResetPasswordToken() {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

schema.methods.generateResetPasswordURL = function generateResetPasswordURL() {
  return `http://localhost:3000/reset_password/${this.setResetPasswordToken()}`;
};

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    username: this.username,
    isConfirmed: this.confirmed,
    token: this.generateJWT()
  };
};

schema.plugin(uniqueValidator, { message: 'this email is already taken' });

export default mongoose.model('users', schema);
