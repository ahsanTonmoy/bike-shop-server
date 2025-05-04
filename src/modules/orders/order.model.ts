import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';


const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      // required: [true, 'User reference is required'],
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Bike',
          // required: true,
        },
        quantity: {
          type: Number,
          // required: true,
        },
      },
    ],

    totalPrice: {
      type: Number,
      min: [1, 'Total price cannot be less than 1'],
      // required: [true, 'Total price is required'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    transaction: {
              id: String,
              transactionStatus: String,
              bank_status: String,
              sp_code: String,
              sp_message: String,
              method: String,
              date_time: String,
            },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
      },
    },
  },
);

const Order = model<IOrder>('Order', orderSchema);
export default Order;

